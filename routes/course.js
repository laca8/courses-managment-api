const express = require("express");
const {
  addCourse,
  getCourseById,
  getCourseByIdAndUpdate,
  getCourseByIdAndDelete,
  getCourses,
} = require("../controller/course");
const { upload } = require("../utils/upload");
const { protect, allowTo } = require("./../middlewares/auth");
const router = express.Router();
router.post(
  "/",
  protect,
  allowTo,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "videos", maxCount: 10 },
  ]),
  addCourse
);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", allowTo, getCourseByIdAndUpdate);
router.delete("/:id", allowTo, getCourseByIdAndDelete);
module.exports = router;
