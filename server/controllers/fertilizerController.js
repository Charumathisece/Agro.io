import Fertilizer from '../models/Fertilizer.js';

// @desc    Get all fertilizers
// @route   GET /api/fertilizers
// @access  Private
export const getFertilizers = async (req, res) => {
  try {
    const fertilizers = await Fertilizer.find({});
    res.json(fertilizers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new fertilizer
// @route   POST /api/fertilizers
// @access  Private/Admin
export const addFertilizer = async (req, res) => {
  const { name, soilType, nutrientFocus, benefits, usageGuide } = req.body;

  try {
    const fertilizer = new Fertilizer({
      name,
      soilType,
      nutrientFocus,
      benefits,
      usageGuide
    });

    const createdFertilizer = await fertilizer.save();
    res.status(201).json(createdFertilizer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a fertilizer
// @route   DELETE /api/fertilizers/:id
// @access  Private/Admin
export const deleteFertilizer = async (req, res) => {
  try {
    const fertilizer = await Fertilizer.findById(req.params.id);

    if (fertilizer) {
      await fertilizer.deleteOne();
      res.json({ message: 'Fertilizer removed' });
    } else {
      res.status(404).json({ message: 'Fertilizer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
