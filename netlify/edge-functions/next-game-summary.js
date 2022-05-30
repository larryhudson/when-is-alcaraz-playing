function getMatchSummary(match) {
  const verbByStatus = {
    finished: "played",
    inprogress: "is playing",
    notstarted: "will play",
    canceled: "was going to play",
    postponed: "was going to play",
    delayed: "was going to play",
    interrupted: "was playing",
  };

  const verb = verbByStatus[match.status];

  const otherPlayer =
    match.home_team_id === ALCARAZ_TEAM_ID ? match.away_team : match.home_team;

  return `Carlos Alcaraz ${verb} against ${otherPlayer.name} on ${match.start_at}`;
}

export default async (request, context) => {
  const nextGameUrl = `https://when-is-alcaraz-playing.netlify.app/next-game-serverless`;

  const nextGame = await fetch(nextGameUrl).then((r) => r.json());

  console.log(nextGame);

  return new Response(nextGame, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
