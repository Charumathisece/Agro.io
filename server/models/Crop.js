import mongoose from 'mongoose';

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  idealSoil: { type: String, required: true },
  minTemp: { type: Number, required: true },
  maxTemp: { type: Number, required: true },
  humidityRange: { type: String }, // e.g. "60-80%"
  duration: { type: String },      // e.g. "3 months"
  fertilizerName: { type: String },
  fertilizerRange: { type: String },
  irrigationSuggestion: { type: String },
  description: { type: String }
}, { timestamps: true });

const Crop = mongoose.model('Crop', cropSchema);
export default Crop;
