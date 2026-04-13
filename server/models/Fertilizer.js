import mongoose from 'mongoose';

const fertilizerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  soilType: { type: String, required: true },
  nutrientFocus: { type: String }, // e.g. "Nitrogen", "Phosphorus"
  benefits: { type: String },
  usageGuide: { type: String }
}, { timestamps: true });

const Fertilizer = mongoose.model('Fertilizer', fertilizerSchema);
export default Fertilizer;
