import matches from "../data/matches.json" assert { type: "json" };

export default async function handler(req, res) {
  if (req.method === "GET") return res.status(200).json(matches);
  return res.status(405).json({ error: "Method not allowed" });
}
