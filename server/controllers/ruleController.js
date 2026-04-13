import Rule from '../models/Rule.js';

// @desc    Get all rules
// @route   GET /api/rules
// @access  Private/Admin
export const getRules = async (req, res) => {
  try {
    const rules = await Rule.find({});
    res.json(rules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a new rule
// @route   POST /api/rules
// @access  Private/Admin
export const addRule = async (req, res) => {
  const { name, condition, action } = req.body;

  try {
    const rule = new Rule({
      name,
      condition,
      action
    });

    const createdRule = await rule.save();
    res.status(201).json(createdRule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a rule
// @route   DELETE /api/rules/:id
// @access  Private/Admin
export const deleteRule = async (req, res) => {
  try {
    const rule = await Rule.findById(req.params.id);

    if (rule) {
      await rule.deleteOne();
      res.json({ message: 'Rule removed' });
    } else {
      res.status(404).json({ message: 'Rule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
