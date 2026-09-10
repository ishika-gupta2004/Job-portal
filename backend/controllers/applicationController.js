const Application = require("../models/Application");
const job = require("../models/Job");

const createApplication = async (req, resp) => {
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
        if (
            !jobId ||
            !name ||
            !email ||
            !phone ||
            !experience ||
            !skills ||
            !coverMessage
        ) {
            return resp.status(400).json({ message: "Please required all fields" })
        }
        const job = await job.findById(jobId);
        if (!job) {
            return resp.status(404).json({ message: "Job Not Found" });
        }

        const existingApplication = await Application.findOne({ job: jobId, application: req.user.userId });

        if (existingApplication) {
            return resp.status(400).json({
                message: "You have already applied for this job",
            });

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


            resp.status(201).json({
                message: "Application submitted successfully",
                application,
            });
        }

    } catch (error) {
          console.error("CREATE APPLICATION ERROR:", error);

        resp.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

module.exports = { createApplication, }