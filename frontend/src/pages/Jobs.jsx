import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

export default function Jobs() {
    const [Jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await api.get(
                "/api/jobs"
            );
            // console.log("API RESPONSE:", response.data);
            setJobs(response.data.jobs);
        } catch (error) {
            console.log("Error fetching jobs:", error);
        }
    };

    return (
        <div className="p-10">
            <h1 className="text-3xl font-bold mb-6">
                Available Jobs
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Jobs.map((job) => (
                    <div
                        key={job._id}
                        className="border rounded-lg p-6 shadow-sm"
                    >
                        <h2 className="text-xl font-bold">
                            {job.title}
                        </h2>

                        <p className="mt-2">
                            {job.company}
                        </p>

                        <p className="text-gray-600">
                            {job.location}
                        </p>

                        <p className="mt-2 font-semibold">
                            {job.salary}
                        </p>

                        <p className="mt-3 text-gray-600">
                            {job.description}
                        </p>

                        <Link
                            to={`/jobs/${job._id}`}
                            className="text-blue-600 mt-4 inline-block"
                        >
                            View Details →
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}