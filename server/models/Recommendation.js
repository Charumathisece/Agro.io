import mongoose from 'mongoose';

const recommendationSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  soilType: { type: String, required: true },
  temp: { type: Number },
  humidity: { type: Number },
  rainfall: { type: Number },
  location: { type: String },
  recommendedCrop: { type: String },
  recommendedFertilizer: { type: String },
  irrigationAdvice: { type: String },
  confidence: { type: String }
}, { timestamps: true });

const Recommendation = mongoose.model('Recommendation', recommendationSchema);
export default Recommendation;
