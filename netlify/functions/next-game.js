const fetch = require("node-fetch");
const { builder } = require("@netlify/functions");

const ALCARAZ_TEAM_ID = 13353;

async function getNextMatch() {
  // In the SportScore API, tennis players are technically 'teams'

  const matches = await fetch(
    `https://sportscore1.p.rapidapi.com/teams/${ALCARAZ_TEAM_ID}/events`,
    {
      headers: {
        "X-RapidAPI-Host": "sportscore1.p.rapidapi.com",
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
      },
    }
  )
    .then((r) => r.json())
    .then((json) => json.data);

  return matches[0];
}

async function handler(event, context) {
  const nextMatch = await getNextMatch();

  // logic to generate the required content
  return {
    statusCode: 200,
    body: JSON.stringify({ ...nextMatch, fetched: new Date() }),
    headers: {
      "Content-Type": "application/json",
    },
    ttl: 3600,
  };
}

exports.handler = builder(handler);
