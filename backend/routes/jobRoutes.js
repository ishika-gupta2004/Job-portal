const express = require("express");

const {createJob, getJobs, getJobById} = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const router = express.Router();

router.post("/", protect, adminOnly , createJob);

router.get("/", getJobs);

router.get("/:id",getJobById)

module.exports = router;