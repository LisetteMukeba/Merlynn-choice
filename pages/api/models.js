import axios from 'axios';

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://api.up2tom.com/v3/models", {
      headers: { Authorization: `Bearer ${process.env.TOM_API_KEY}` },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching models:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to fetch models" });
  }
}
