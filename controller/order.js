const Order = require("../models/Order");
const ApiError = require("../utils/apiError");

const addOrder = async (req, res, next) => {
  const { totalPrice, address } = req.body;
  try {
    const order = await Order.create({
      totalPrice,
      address,
      score,
      userId: req.user._id,
      courseId: req.params.courseId,
    });

    res.status(201).json(order);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const deletedOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate("userId")
      .populate("courses.courseId");

    res.status(200).json(orders);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById({ _id: req.params.id })
      .populate("userId")
      .populate("courses.courseId");

    res.status(200).json(order);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
const updateOrderById = async (req, res, next) => {
  try {
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return next(new ApiError("order not found...", 404));
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    return next(new ApiError(error.message, 500));
  }
};
module.exports = {
  addOrder,
  deletedOrder,
  getOrderById,
  getOrders,
  updateOrderById,
};
