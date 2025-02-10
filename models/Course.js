const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  category: {
    type: String,
    required: [true, "category is required"],
  },
  rate: {
    type: Number,
    default: 0,
  },
  reviews: [],
  language: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  learn: [],
  course_content: [
    {
      title: String,
      video: String,
    },
  ],
  quizId: {
    type: mongoose.Types.ObjectId,
    ref: "quiz",
    required: true,
  },
});
module.exports = mongoose.model("course", courseSchema);
