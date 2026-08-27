// api/xbox.js (deploy this on Vercel, free tier)
export default async function handler(req, res) {
  const apiKey = process.env.da211102-d66f-47e4-b651-8ba6a040f6b1;
  const username = "Aruu079225";

  try {
    const searchRes = await fetch(`https://xbl.io/api/v2/search/${username}`, {
      headers: { "X-Authorization": apiKey, "Accept": "application/json" }
    });
    const searchData = await searchRes.json();
    const xuid = searchData.people[0].xuid;

    const historyRes = await fetch(`https://xbl.io/api/v2/player/titleHistory/${xuid}`, {
      headers: { "X-Authorization": apiKey, "Accept": "application/json" }
    });
    const historyData = await historyRes.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(historyData);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
