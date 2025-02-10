const Quiz = require("../models/Quiz");
const ApiError = require("../utils/apiError");

const addQuiz = async (req, res, next) => {
  const { questions, score } = req.body;
  try {
    const quiz = await Quiz.create({
      questions,
      score,
      courseId: req.params.courseId,
    });

    res.status(201).json(quiz);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
module.exports = {
  addQuiz,
};
