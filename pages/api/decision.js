import axios from 'axios';
import dbConnect from '../../lib/mongodb';
import Decision from '../../models/Decision';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  await dbConnect();
  const { modelId, input } = req.body;

  if (!modelId || !input) {
    return res.status(400).json({ error: "Missing modelId or input data." });
  }

  try {
    console.log("Submitting to TOM API:", { modelId, input });

    const response = await axios.post(
      `https://api.up2tom.com/v3/decision/${modelId}`,
      { data: { type: "scenario", attributes: { model: modelId, input } } },
      { headers: { Authorization: `Bearer ${process.env.TOM_API_KEY}`, "Content-Type": "application/vnd.api+json" } }
    );

    console.log("TOM API Decision Response:", response.data);

    const decisionData = response.data.data.attributes.decision;
    await Decision.create({ modelId, input, decision: decisionData });

    res.status(201).json({ decision: decisionData });
  } catch (error) {
    console.error("Error fetching decision:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch decision" });
  }
}
