const express = require("express");
const { addQuiz } = require("../controller/quiz");
const { protect, allowTo } = require("../middlewares/auth");
const router = express.Router();
router.post("/:courseId", protect, allowTo, addQuiz);
module.exports = router;
