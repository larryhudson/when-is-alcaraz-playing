const fetch = require("node-fetch");

async function fetchMatches() {
  // In the SportScore API, tennis players are technically 'teams'
  const ALCARAZ_TEAM_ID = 13353;

  const url = `https://sportscore1.p.rapidapi.com/teams/${ALCARAZ_TEAM_ID}/events?page=1`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
      "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
    },
  };

  const matches = await fetch(url, options).then((r) => r.json());

  const matchesInFuture = matches.data.filter((m) => m.status === "notstarted");

  matchesInFuture.reverse();

  return matchesInFuture;
}

module.exports = fetchMatches;
