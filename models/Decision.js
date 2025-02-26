
import mongoose from "mongoose";

const DrinkChoiceSchema = new mongoose.Schema({
  inputs: Object,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.DrinkChoice ||
  mongoose.model("DrinkChoice", DrinkChoiceSchema);
