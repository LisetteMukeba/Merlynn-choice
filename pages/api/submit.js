
import connectMongo from "../../lib/mongodb";
import Decision from "../../models/Decision";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    await connectMongo();
    const newEntry = await Decision.create({ inputs: req.body });
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(500).json({ error: "Error saving to database" });
  }
}
