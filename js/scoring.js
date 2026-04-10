// Scoring logic for the 2026 Masters Pool

/**
 * Parse a score string like "-5", "E", "+3" into a numeric value.
 * Returns null if the score can't be parsed.
 */
function parseScore(scoreStr) {
  if (scoreStr === null || scoreStr === undefined || scoreStr === "") return null;
  const s = String(scoreStr).trim();
  if (s === "E" || s === "0") return 0;
  if (s === "WD" || s === "DQ" || s === "CUT" || s === "--") return null;
  const num = parseInt(s, 10);
  return isNaN(num) ? null : num;
}

/**
 * Group priority for drop tiebreaking (lower = higher priority = dropped last).
 * D gets dropped first in a tie, then C, B, A.
 */
const GROUP_PRIORITY = { A: 1, B: 2, C: 3, D: 4 };

/**
 * Determine if the cut has happened based on the tournament round.
 */
function hasCutHappened(round) {
  return round >= 3;
}

/**
 * Build a lookup of golfer scores from the ESPN API response.
 * Returns a Map: espnName -> { score, today, thru, position, status, rounds }
 */
function buildGolferScoreMap(apiGolfers) {
  const map = new Map();
  for (const g of apiGolfers) {
    map.set(g.name, {
      score: parseScore(g.score),
      scoreDisplay: String(g.score ?? "E"),
      today: g.today || "",
      thru: g.thru || "",
      position: g.position || 0,
      status: g.status || "active",
      rounds: g.rounds || [],
    });
  }
  return map;
}

/**
 * Resolve a pick name to its ESPN display name using the name map.
 */
function resolveGolferName(pickName) {
  return GOLFER_NAME_MAP[pickName] || pickName;
}

/**
 * Compute standings for all participants.
 * Returns a sorted array of participant standings.
 */
function computeStandings(participants, golferScoreMap, round, actualWinningScore) {
  const cutHappened = hasCutHappened(round);

  const standings = participants.map((p) => {
    // Resolve each pick to ESPN data
    const golfers = p.picks.map((pick) => {
      const espnName = resolveGolferName(pick.name);
      const scoreData = golferScoreMap.get(espnName);

      return {
        name: pick.name,
        espnName: espnName,
        group: pick.group,
        score: scoreData ? scoreData.score : null,
        scoreDisplay: scoreData ? scoreData.scoreDisplay : "--",
        today: scoreData ? scoreData.today : "",
        thru: scoreData ? scoreData.thru : "",
        position: scoreData ? scoreData.position : 0,
        status: scoreData ? scoreData.status : "unknown",
        rounds: scoreData ? scoreData.rounds : [],
        found: !!scoreData,
        dropped: false,
      };
    });

    // Find the worst-scoring golfer to drop (always active)
    let droppedIndex = -1;
    if (golfers.length > 0) {
      let worstScore = -Infinity;
      let worstGroupPriority = -1;

      golfers.forEach((g, i) => {
        const score = g.score !== null ? g.score : 999; // Treat unknown as very bad
        const gp = GROUP_PRIORITY[g.group] || 0;

        if (
          score > worstScore ||
          (score === worstScore && gp > worstGroupPriority)
        ) {
          worstScore = score;
          worstGroupPriority = gp;
          droppedIndex = i;
        }
      });

      if (droppedIndex >= 0) {
        golfers[droppedIndex].dropped = true;
      }
    }

    // Calculate total score (sum of non-dropped golfers with valid scores)
    let totalScore = 0;
    let validCount = 0;
    for (const g of golfers) {
      if (!g.dropped && g.score !== null) {
        totalScore += g.score;
        validCount++;
      }
    }

    // Tiebreaker distance from actual winning score
    const tiebreakerDist =
      p.tiebreaker !== null && actualWinningScore !== null
        ? Math.abs(p.tiebreaker - actualWinningScore)
        : Infinity;

    return {
      name: p.name,
      golfers: golfers,
      totalScore: totalScore,
      validCount: validCount,
      tiebreaker: p.tiebreaker,
      tiebreakerDist: tiebreakerDist,
      droppedGolfer:
        droppedIndex >= 0 ? golfers[droppedIndex].name : null,
    };
  });

  // Sort: lowest total first, then by tiebreaker distance
  standings.sort((a, b) => {
    if (a.totalScore !== b.totalScore) return a.totalScore - b.totalScore;
    return a.tiebreakerDist - b.tiebreakerDist;
  });

  // Assign ranks (handle ties)
  let rank = 1;
  for (let i = 0; i < standings.length; i++) {
    if (
      i > 0 &&
      standings[i].totalScore === standings[i - 1].totalScore &&
      standings[i].tiebreakerDist === standings[i - 1].tiebreakerDist
    ) {
      standings[i].rank = standings[i - 1].rank;
    } else {
      standings[i].rank = rank;
    }
    rank++;
  }

  return standings;
}

/**
 * Format a numeric score for display.
 */
function formatScore(score) {
  if (score === null || score === undefined) return "--";
  if (score === 0) return "E";
  if (score > 0) return "+" + score;
  return String(score);
}
