import Crop from '../models/Crop.js';

// @desc    Get all crops
// @route   GET /api/crops
// @access  Private
export const getCrops = async (req, res) => {
  try {
    const crops = await Crop.find({});
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new crop
// @route   POST /api/crops
// @access  Private/Admin
export const addCrop = async (req, res) => {
  const { name, idealSoil, minTemp, maxTemp, humidityRange, duration, fertilizerName, fertilizerRange, irrigationSuggestion, description } = req.body;

  try {
    const crop = new Crop({
      name,
      idealSoil,
      minTemp,
      maxTemp,
      humidityRange,
      duration,
      fertilizerName,
      fertilizerRange,
      irrigationSuggestion,
      description
    });

    const createdCrop = await crop.save();
    res.status(201).json(createdCrop);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a crop
// @route   DELETE /api/crops/:id
// @access  Private/Admin
export const deleteCrop = async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (crop) {
      await crop.deleteOne();
      res.json({ message: 'Crop removed' });
    } else {
      res.status(404).json({ message: 'Crop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a crop
// @route   PUT /api/crops/:id
// @access  Private/Admin
export const updateCrop = async (req, res) => {
  const { name, idealSoil, minTemp, maxTemp, humidityRange, duration, fertilizerName, fertilizerRange, irrigationSuggestion, description } = req.body;

  try {
    const crop = await Crop.findById(req.params.id);

    if (crop) {
      crop.name = name || crop.name;
      crop.idealSoil = idealSoil || crop.idealSoil;
      crop.minTemp = minTemp || crop.minTemp;
      crop.maxTemp = maxTemp || crop.maxTemp;
      crop.humidityRange = humidityRange || crop.humidityRange;
      crop.duration = duration || crop.duration;
      crop.fertilizerName = fertilizerName || crop.fertilizerName;
      crop.fertilizerRange = fertilizerRange || crop.fertilizerRange;
      crop.irrigationSuggestion = irrigationSuggestion || crop.irrigationSuggestion;
      crop.description = description || crop.description;

      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404).json({ message: 'Crop not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
