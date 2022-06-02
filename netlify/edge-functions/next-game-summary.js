import dayjs from "https://esm.sh/dayjs@v1.11.2";
import cityTimezones from "https://esm.sh/city-timezones@v1.2.0";

const ALCARAZ_TEAM_ID = 13353;

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
  const requestUrl = new URL(request.url);

  const nextGamePath = `/next-game-serverless`;
  const nextGameUrl = requestUrl.origin + nextGamePath;

  const nextGame = await fetch(nextGameUrl).then((r) => r.json());

  return context.json(context.geo);

  console.log(context.geo);

  return new Response(getMatchSummary(nextGame));
};
