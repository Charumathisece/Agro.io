import Recommendation from '../models/Recommendation.js';
import Crop from '../models/Crop.js';

// @desc    Get agricultural recommendation
// @route   POST /api/recommendations/predict
// @access  Private
export const getRecommendation = async (req, res) => {
  const { soilType, temp, humidity, rainfall, location } = req.body;
  const targetTemp = Number(temp);

  try {
    // 1. Normalize Soil Type for fuzzy matching
    // Extract base soil name (e.g. "Red" from "Red Soil")
    const soilBase = soilType.split(' ')[0].replace(/[^a-zA-Z]/g, '');
    const soilRegex = new RegExp(soilBase, 'i');

    // 2. Tiered Search Logic
    
    // Tier 1: Exact Soil match + Temperature within range
    let crops = await Crop.find({
      idealSoil: { $regex: soilRegex },
      minTemp: { $lte: targetTemp },
      maxTemp: { $gte: targetTemp }
    });

    let matchType = "Exact Match";
    let confidence = "95%";

    // Tier 2: Fuzzy Temperature (Buffer of 5 degrees)
    if (crops.length === 0) {
      crops = await Crop.find({
        idealSoil: { $regex: soilRegex },
        minTemp: { $lte: targetTemp + 5 },
        maxTemp: { $gte: targetTemp - 5 }
      });
      matchType = "Closest Temperature Match";
      confidence = "80% (Moderate Deviation)";
    }

    // Tier 3: Soil Only Match
    if (crops.length === 0) {
      crops = await Crop.find({
        idealSoil: { $regex: soilRegex }
      });
      matchType = "Soil match only";
      confidence = "60% (Check local climate conditions)";
    }

    const bestCrop = crops.length > 0 ? crops[0] : null;
    
    // 3. Construct Final Details
    const recommendedCrop = bestCrop ? bestCrop.name : "No specific match found for these conditions";
    const recommendedFertilizer = bestCrop?.fertilizerName 
      ? `${bestCrop.fertilizerName} (${bestCrop.fertilizerRange || 'Optimal dosage'})`
      : "General purpose NPK recommended";
    
    const irrigationAdvice = bestCrop?.irrigationSuggestion || "Moderate irrigation recommended.";
    const cropDuration = bestCrop?.duration || "N/A";

    // 4. Construct Result Object
    const result = {
      farmer: req.user._id,
      soilType,
      temp,
      humidity,
      rainfall,
      location,
      recommendedCrop: bestCrop ? `${bestCrop.name} (${matchType})` : recommendedCrop,
      recommendedFertilizer,
      irrigationAdvice,
      duration: cropDuration,
      confidence
    };

    const recommendation = await Recommendation.create(result);
    res.status(201).json(recommendation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get farmer recommendation history
// @route   GET /api/recommendations/history
// @access  Private
export const getHistory = async (req, res) => {
  try {
    const history = await Recommendation.find({ farmer: req.user._id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
