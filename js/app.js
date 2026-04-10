// Main application logic for 2026 Masters Pool Tracker

let currentStandings = [];
let lastData = null;
let refreshInterval = null;

async function fetchScores() {
  try {
    const res = await fetch("/api/scores");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Failed to fetch scores:", err);
    return null;
  }
}

function updateUI(data) {
  if (!data) {
    document.getElementById("status-text").textContent =
      "Unable to fetch scores. Retrying...";
    return;
  }

  lastData = data;

  // Update header (keep our pool title, don't overwrite with ESPN name)
  document.getElementById("status-text").textContent =
    data.status || "Scheduled";
  document.getElementById("last-updated").textContent =
    "Updated: " + new Date().toLocaleTimeString();

  const round = data.round || 0;
  const cutHappened = hasCutHappened(round);

  // Show/hide cut indicator
  const cutBadge = document.getElementById("cut-badge");
  if (cutBadge) {
    cutBadge.style.display = cutHappened ? "inline-block" : "none";
  }

  // Build golfer score map
  const golferScoreMap = buildGolferScoreMap(data.golfers || []);

  // Determine actual winning score (leader's score) for tiebreaker calc
  let actualWinningScore = null;
  if (data.completed && data.golfers && data.golfers.length > 0) {
    const leader = data.golfers.reduce((best, g) => {
      const s = parseScore(g.score);
      return s !== null && (best === null || s < best) ? s : best;
    }, null);
    actualWinningScore = leader;
  }

  // Compute standings
  currentStandings = computeStandings(
    PARTICIPANTS,
    golferScoreMap,
    round,
    actualWinningScore
  );

  renderLeaderboard(currentStandings, cutHappened);
}

function renderLeaderboard(standings, cutHappened) {
  const tbody = document.getElementById("leaderboard-body");
  tbody.innerHTML = "";

  standings.forEach((p, idx) => {
    // Main row
    const row = document.createElement("tr");
    row.className = "participant-row";
    row.setAttribute("data-index", idx);
    row.addEventListener("click", () => toggleDetail(idx));

    const rankClass = p.rank === 1 ? "rank-leader" : "";

    // Build compact golfer scores
    const golferChips = p.golfers
      .map((g) => {
        const scoreClass = getScoreClass(g.score);
        const droppedClass = g.dropped ? "dropped" : "";
        const lastName = g.name.split(" ").pop();
        return `<span class="golfer-chip ${scoreClass} ${droppedClass}" title="${g.name}: ${g.scoreDisplay}">${lastName} ${g.scoreDisplay}</span>`;
      })
      .join("");

    row.innerHTML = `
      <td class="rank-cell ${rankClass}">${p.rank}</td>
      <td class="name-cell">
        <span class="participant-name">${p.name}</span>
        <span class="expand-icon">&#9662;</span>
      </td>
      <td class="score-cell ${getScoreClass(p.totalScore)}">${formatScore(p.totalScore)}</td>
      <td class="golfers-cell">${golferChips}</td>
      <td class="tiebreaker-cell">${p.tiebreaker !== null ? p.tiebreaker : "--"}</td>
    `;

    tbody.appendChild(row);

    // Detail row (hidden by default)
    const detailRow = document.createElement("tr");
    detailRow.className = "detail-row";
    detailRow.id = `detail-${idx}`;
    detailRow.style.display = "none";

    const detailContent = renderGolferDetail(p.golfers, cutHappened);
    detailRow.innerHTML = `<td colspan="5">${detailContent}</td>`;
    tbody.appendChild(detailRow);
  });
}

function renderGolferDetail(golfers, cutHappened) {
  const groups = { A: [], B: [], C: [], D: [] };
  golfers.forEach((g) => {
    if (groups[g.group]) groups[g.group].push(g);
  });

  let html = '<div class="golfer-detail-grid">';

  for (const [group, players] of Object.entries(groups)) {
    if (players.length === 0) continue;
    html += `<div class="golfer-group">
      <div class="group-label">Group ${group}</div>`;

    players.forEach((g) => {
      const scoreClass = getScoreClass(g.score);
      const droppedClass = g.dropped ? "golfer-dropped" : "";
      const droppedBadge = g.dropped
        ? '<span class="dropped-badge">DROPPED</span>'
        : "";
      const statusBadge =
        !g.found
          ? '<span class="status-badge unknown">N/A</span>'
          : "";

      html += `
        <div class="golfer-card ${droppedClass}">
          <div class="golfer-name-row">
            <span class="golfer-full-name">${g.name}</span>
            ${droppedBadge}${statusBadge}
          </div>
          <div class="golfer-stats">
            <span class="golfer-score ${scoreClass}">${g.scoreDisplay}</span>
            ${g.today ? `<span class="golfer-today">Today: ${g.today}</span>` : ""}
            ${g.thru ? `<span class="golfer-thru">Thru ${g.thru}</span>` : ""}
            ${g.position ? `<span class="golfer-pos">Pos: ${g.position}</span>` : ""}
          </div>
          ${g.rounds.length > 0 ? renderRounds(g.rounds) : ""}
        </div>`;
    });

    html += "</div>";
  }

  html += "</div>";
  return html;
}

function renderRounds(rounds) {
  if (!rounds || rounds.length === 0) return "";
  const roundStrs = rounds
    .filter((r) => r.score && r.score !== "")
    .map((r) => `R${r.round}: ${r.score}`)
    .join(" | ");
  if (!roundStrs) return "";
  return `<div class="golfer-rounds">${roundStrs}</div>`;
}

function toggleDetail(idx) {
  const detail = document.getElementById(`detail-${idx}`);
  const row = document.querySelector(`[data-index="${idx}"]`);
  if (detail.style.display === "none") {
    detail.style.display = "table-row";
    row.classList.add("expanded");
  } else {
    detail.style.display = "none";
    row.classList.remove("expanded");
  }
}

function getScoreClass(score) {
  if (score === null || score === undefined) return "score-even";
  if (score < 0) return "score-under";
  if (score > 0) return "score-over";
  return "score-even";
}

// Auto-refresh
function startPolling() {
  if (refreshInterval) clearInterval(refreshInterval);
  refreshInterval = setInterval(async () => {
    const data = await fetchScores();
    if (data) updateUI(data);
  }, 60000); // 60 seconds
}

// Manual refresh
function manualRefresh() {
  const btn = document.getElementById("refresh-btn");
  btn.disabled = true;
  btn.textContent = "Refreshing...";
  fetchScores().then((data) => {
    if (data) updateUI(data);
    btn.disabled = false;
    btn.textContent = "Refresh";
  });
}

// Initialize
async function init() {
  document.getElementById("refresh-btn").addEventListener("click", manualRefresh);
  const data = await fetchScores();
  updateUI(data);
  startPolling();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
