const express = require("express");

const {createJob, getJobs, getJobById , deleteJob , updateJob} = require("../controllers/jobController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");


const router = express.Router();

router.post("/", protect, adminOnly , createJob);

router.get("/", getJobs);

router.get("/:id",getJobById)

router.delete("/:id", protect, adminOnly, deleteJob);

router.put("/:id", protect, adminOnly, updateJob);


module.exports = router;