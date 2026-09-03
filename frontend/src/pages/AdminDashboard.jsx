import { useState, useEffect } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
    const [jobs, setJobs] = useState([]);
    const [editingJobId, setEditingJobId] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingJobId) {

                await api.put(`/api/jobs/${editingJobId}`, formData);

                alert("Job updated successfully!");

                setEditingJobId(null);
            } else {

                await api.post("/api/jobs", formData);

                alert("Job added successfully!");
            }

            setFormData({
                title: "",
                company: "",
                location: "",
                salary: "",
                description: "",
            });

            getJobs();

        } catch (error) {
            alert(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };
    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {
        try {
            const response = await api.get("/api/jobs");
            setJobs(response.data.jobs);
        } catch (error) {
            console.log("Error fetching jobs:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/api/jobs/${id}`);

            alert("Job deleted successfully!");

            getJobs();
        } catch (error) {
            alert(
                error.response?.data?.message || "Failed to delete job"
            );
        }
    };

    const handleEdit = (job) => {
        setEditingJobId(job._id);

        setFormData({
            title: job.title,
            company: job.company,
            location: job.location,
            salary: job.salary,
            description: job.description,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 p-10">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-6">
                    {/* Admin Dashboard */}
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name="title"
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                    />

                    <input
                        type="text"
                        name="company"
                        placeholder="Company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                    />

                    <input
                        type="text"
                        name="salary"
                        placeholder="Salary"
                        value={formData.salary}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-4 py-3 mb-4"
                    />

                    <textarea
                        name="description"
                        placeholder="Job Description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full border rounded-lg px-4 py-3 mb-6"
                    />

                    <button type="submit" className="mt-4 mr-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                        {editingJobId ? "Update Job" : "Add Job"}
                    </button>

                </form>
                <div className="mt-10">
                    <h2 className="text-2xl font-bold mb-5">
                        Manage Jobs
                    </h2>

                    <div className="grid md:grid-cols-2 gap-5">
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="border rounded-lg p-5 shadow-sm"
                            >
                                <h3 className="text-xl font-bold">
                                    {job.title}
                                </h3>

                                <p className="mt-2">{job.company}</p>

                                <p className="text-gray-600">
                                    {job.location}
                                </p>

                                <p className="mt-2 font-semibold">
                                    {job.salary}
                                </p>
                                <button
                                    onClick={() => handleEdit(job)}
                                    className="mt-4 mr-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Edit Job
                                </button>

                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                                >
                                    Delete Job
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}