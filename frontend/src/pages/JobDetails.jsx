import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);

    useEffect(() => {
        getJob();
    }, [id]);

    const getJob = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/jobs/${id}`
            );

            setJob(response.data.job);
        } catch (error) {
            console.log("Error fetching job:", error);
        }
    };

    if (!job) {
        return <p className="p-10">Loading...</p>;
    }

    return (
        <div className="max-w-3xl mx-auto p-10">
            <div className="border rounded-xl p-8 shadow-sm">
                <h1 className="text-3xl font-bold">
                    {job.title}
                </h1>

                <p className="text-lg mt-3">
                    {job.company}
                </p>

                <p className="text-gray-600 mt-2">
                    📍 {job.location}
                </p>

                <p className="font-semibold mt-4">
                    Salary: {job.salary}
                </p>

                <div className="mt-6">
                    <h2 className="text-xl font-bold">
                        Job Description
                    </h2>

                    <p className="text-gray-700 mt-2">
                        {job.description}
                    </p>
                </div>
            </div>
        </div>
    );
}