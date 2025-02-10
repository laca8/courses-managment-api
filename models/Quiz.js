const mongoose = require("mongoose");
const quizSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    required: true,
  },
  questions: [
    {
      question: { type: String, required: true, trim: true },
      options: [
        {
          option: { type: String, required: true, trim: true },
        },
      ],
      correctAnswer: { type: Number, required: true },
    },
  ],
  score: {
    type: Number,
  },
});
module.exports = mongoose.model("quiz", quizSchema);
