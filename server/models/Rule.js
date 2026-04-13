import mongoose from 'mongoose';

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  condition: { type: String, required: true }, // e.g., "Temp > 35°C"
  action: { type: String, required: true },    // e.g., "Suggest Drought-Resistant Crops"
  active: { type: Boolean, default: true }
}, { timestamps: true });

const Rule = mongoose.model('Rule', ruleSchema);
export default Rule;
