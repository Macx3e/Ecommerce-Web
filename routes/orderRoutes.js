const express = require("express");
const { updateOrderStatus } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/status", protect, updateOrderStatus);

module.exports = router;
