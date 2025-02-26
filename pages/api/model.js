import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get(
      "https://api.up2tom.com/v3/models/5a8e7a36c627fb0007dd7249",
      {
        headers: {
          Authorization: "Bearer 9307bfd5fa011428ff198bb37547f979",
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching model:", error);
    res.status(500).json({ error: "Failed to fetch model" });
  }
}
