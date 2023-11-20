const asyncHandler = require("express-async-handler");

// @description Get Goals
// @Route GET /api/goals
// @access private
const getGoals = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// @description Set Goals
// @Route POST /api/goals
// @access private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please provide a text");
  }
});

// @description Update Goals
// @Route PUT /api/goals/:id
// @access private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// @description Delete Goals
// @Route DELETE /api/goals/:id
// @access private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
