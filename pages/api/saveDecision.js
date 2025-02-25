import dbConnect from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    return res.status(201).json({ message: "User saved!" });
  }

  if (req.method === "GET") {
    const users = await User.find({});
    return res.status(200).json(users);
  }

  res.status(405).json({ message: "Method not allowed" });
}
