import type { Context, Config } from "@netlify/functions";

export default async (req: Request, context: Context) => {
  const espnUrl =
    "https://site.api.espn.com/apis/site/v2/sports/golf/pga/scoreboard";

  try {
    const response = await fetch(espnUrl);
    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "ESPN API error", status: response.status }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await response.json();
    const event = data.events?.[0];
    const competition = event?.competitions?.[0];
    const competitors = competition?.competitors || [];
    const status = event?.status || {};

    const simplified = {
      tournament: event?.name || "Masters Tournament",
      status: status.type?.description || "Scheduled",
      round: status.period || 0,
      completed: status.type?.completed || false,
      golfers: competitors.map((c: any) => {
        const score = c.score;
        const athlete = c.athlete || {};
        const stats = c.statistics || [];
        // Try to get "thru" and "today" from statistics
        let thru = "";
        let today = "";
        for (const stat of stats) {
          if (stat.name === "thru" || stat.abbreviation === "THRU") {
            thru = stat.displayValue || "";
          }
          if (stat.name === "scoreToPar" || stat.abbreviation === "TODAY") {
            today = stat.displayValue || "";
          }
        }

        return {
          name: athlete.displayName || "Unknown",
          score: score ?? "E",
          position: c.order || 0,
          status: c.status?.type?.description || "active",
          thru: thru,
          today: today,
          rounds: (c.linescores || []).map((ls: any) => ({
            round: ls.period,
            score: ls.displayValue || "",
          })),
        };
      }),
    };

    return new Response(JSON.stringify(simplified), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=30",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch scores", message: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const config: Config = {
  path: "/api/scores",
};
