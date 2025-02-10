const Course = require("../models/Course");
const ApiError = require("../utils/apiError");

const addCourse = async (req, res, next) => {
  // console.log(req.files);

  const {
    title,
    description,
    category,
    language,
    price,
    learn,
    course_content,
  } = req.body;
  // الحصول على رابط الصورة
  const image = req.files
    ? `/uploads/images/${req.files?.image?.filename}`
    : null;

  // الحصول على روابط الفيديوهات
  const videos = req.files
    ? req.files?.videos?.map((file) => `/uploads/videos/${file.filename}`)
    : [];

  // إنشاء محتوى الدورة مع روابط الفيديوهات
  const courseContentWithVideos = course_content?.map((content, index) => ({
    title: content.title,
    video: videos[index] || "", // ربط الفيديو مع المحتوى
  }));
  // console.log(req.files?.image);
  // console.log(req.files?.videos);
  // console.log(course_content);

  console.log(courseContentWithVideos);

  try {
    const newCourse = await Course.create({
      image: image,
      title,
      description,
      category,
      language,
      price,
      learn,
      course_content: courseContentWithVideos,
      userId: req.user._id,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    console.log(error);
    return next(new ApiError(error.message, 500));
  }
};
const getCourses = async (req, res, next) => {
  try {
    const courses = await Course.aggregate([
      {
        $lookup: {
          from: "quizes", // MongoDB uses plural, lowercase collection name
          localField: "quizId",
          foreignField: "_id",
          as: "quizId",
        },
      },
      {
        $lookup: {
          from: "users", // MongoDB uses plural, lowercase collection name
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]);
    res.status(201).json(courses);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const getCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.aggregate([
      { $match: { _id: id } },
      {
        $lookup: {
          from: "quizes", // MongoDB uses plural, lowercase collection name
          localField: "quizId",
          foreignField: "_id",
          as: "quizId",
        },
      },
      {
        $lookup: {
          from: "users", // MongoDB uses plural, lowercase collection name
          localField: "userId",
          foreignField: "_id",
          as: "userId",
        },
      },
    ]);
    res.status(201).json(course);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const getCourseByIdAndDelete = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById({ _id: id });
    if (!course) {
      return next(new ApiError("course not found", 500));
    }
    await Course.findByIdAndDelete({
      _id: id,
      userId: req.user._id,
    });

    res.status(201).json("course deleted...");
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const getCourseByIdAndUpdate = async (req, res, next) => {
  const { id } = req.params;
  try {
    const course = await Course.findById({ _id: id });
    if (!course) {
      return next(new ApiError("course not found", 500));
    }
    const updateCourse = await Course.findByIdAndUpdate(
      {
        _id: id,
        userId: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json(updateCourse);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
module.exports = {
  addCourse,
  getCourses,
  getCourseById,
  getCourseByIdAndDelete,
  getCourseByIdAndUpdate,
};
