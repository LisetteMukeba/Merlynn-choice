import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await axios.get(`https://api.up2tom.com/v3/models/${id}`, {
      headers: { Authorization: `Bearer ${process.env.TOM_API_KEY}` },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching model details:", error);
    res.status(500).json({ error: "Failed to load model details." });
  }
}
