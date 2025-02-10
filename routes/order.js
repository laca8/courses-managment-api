const express = require("express");
const { protect, allowTo } = require("./../middlewares/auth");

const {
  addOrder,
  deletedOrder,
  getOrderById,
  getOrders,
  updateOrderById,
} = require("../controller/order");

const router = express.Router();
router.post("/:courseId", protect, addOrder);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrderById);
router.delete("/:id", protect, allowTo, deletedOrder);
router.put("/:id", protect, allowTo, updateOrderById);
module.exports = router;
