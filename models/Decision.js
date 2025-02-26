import mongoose from 'mongoose';

const DecisionSchema = new mongoose.Schema({
  modelId: { type: String, required: true },
  input: { type: Map, of: String, required: true },
  decision: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Decision = mongoose.models.Decision || mongoose.model('Decision', DecisionSchema);

export default Decision;
