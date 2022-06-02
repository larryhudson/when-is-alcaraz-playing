import cityTimezones from "https://esm.sh/city-timezones@v1.2.0";

const ALCARAZ_TEAM_ID = 13353;

function getMatchSummary(match, timezone) {
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

  const utcDate = new Date(match.start_at);
  const localDateString = timezone
    ? utcDate.toLocaleString("en-AU", { timeZone: timezone })
    : match.start_at;

  const otherPlayer =
    match.home_team_id === ALCARAZ_TEAM_ID ? match.away_team : match.home_team;

  return `Carlos Alcaraz ${verb} against ${otherPlayer.name} on ${localDateString}`;
}

function getTimezoneFromGeo(geoObject) {
  const locationKeys = ["city", "subdivision", "country"];

  // context object might not have all the info
  const locationKeysInObject = locationKeys.filter(
    (locationKey) => locationKey in geoObject
  );
  const locationString = locationKeysInObject.join(" ");

  const timezones = cityTimezones.findFromCityStateProvince(locationString);
  if (timezones.length > 0) {
    return timezones[0].timezone;
  } else {
    return null;
  }
}

export default async (request, context) => {
  const requestUrl = new URL(request.url);

  const nextGamePath = `/next-game-serverless`;
  const nextGameUrl = requestUrl.origin + nextGamePath;

  const nextGame = await fetch(nextGameUrl).then((r) => r.json());

  const timezone = getTimezoneFromGeo(context.geo);

  const gameSummary = getMatchSummary(nextGame, timezone);

  return context.json({
    summary: gameSummary,
    timezone,
    geo: context.geo,
  });

  return new Response(gameSummary);
};
