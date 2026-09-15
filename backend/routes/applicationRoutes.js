const express = require("express");
const router = express.Router();

const { createApplication , getApplication } = require("../controllers/applicationController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


router.post("/", protect, createApplication);
router.get("/", protect, adminOnly , getApplication);

module.exports = router;