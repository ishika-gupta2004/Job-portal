const Application = require("../models/Application");
const Job = require("../models/Job");

const createApplication = async (req, res) => {
    try {
        const {
            jobId,
            name,
            email,
            phone,
            experience,
            skills,
            coverMessage,
        } = req.body;

        // 1. Check required fields
        if (
            !jobId ||
            !name ||
            !email ||
            !phone ||
            !experience ||
            !skills ||
            !coverMessage
        ) {
            return res.status(400).json({
                message: "Please provide all required fields",
            });
        }

        // 2. Check whether job exists
        const job = await Job.findById(jobId);

        if (!job) {
            return res.status(404).json({
                message: "Job not found",
            });
        }

        // 3. Check duplicate application
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: req.user.userId,
        });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
            });
        }

        // 4. Create application
        const application = await Application.create({
            job: jobId,
            applicant: req.user.userId,
            name,
            email,
            phone,
            experience,
            skills,
            coverMessage,
        });

        // 5. Send success response
        res.status(201).json({
            message: "Application submitted successfully",
            application,
        });
    } catch (error) {
        console.error("CREATE APPLICATION ERROR:", error);

        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {
    createApplication,
};