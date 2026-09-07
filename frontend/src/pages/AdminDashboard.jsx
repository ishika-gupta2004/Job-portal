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

    const getJobs = async () => {
        try {
            const response = await api.get("/api/jobs");
            setJobs(response.data.jobs);
        } catch (error) {
            console.log("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        getJobs();
    }, []);

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

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const cancelEdit = () => {
        setEditingJobId(null);

        setFormData({
            title: "",
            company: "",
            location: "",
            salary: "",
            description: "",
        });
    };

    return (
        <div className="min-h-screen bg-slate-100">

            {/* Header */}
            <header className="bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div>
                        <h1 className="text-2xl font-bold">
                            JobPortal Admin
                        </h1>

                        <p className="text-slate-400 text-sm mt-1">
                            Manage your job postings
                        </p>
                    </div>

                    <div className="bg-slate-800 px-4 py-2 rounded-lg">
                        <span className="text-sm text-slate-300">
                            Administrator
                        </span>
                    </div>

                </div>
            </header>


            {/* Main */}
            <main className="max-w-7xl mx-auto px-6 py-8">

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">
                            Total Jobs
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-2">
                            {jobs.length}
                        </h2>
                    </div>


                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">
                            Active Listings
                        </p>

                        <h2 className="text-3xl font-bold text-slate-900 mt-2">
                            {jobs.length}
                        </h2>
                    </div>


                    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                        <p className="text-sm text-slate-500">
                            Dashboard
                        </p>

                        <h2 className="text-xl font-bold text-green-600 mt-3">
                            Active
                        </h2>
                    </div>

                </div>


                {/* Add / Edit Job */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-10">

                    <div className="px-6 py-5 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-900">
                            {editingJobId
                                ? "Edit Job"
                                : "Add New Job"}
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            {editingJobId
                                ? "Update the selected job posting"
                                : "Create a new job posting"}
                        </p>
                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6"
                    >

                        <div className="grid md:grid-cols-2 gap-5">

                            {/* Job Title */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Job Title
                                </label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. MERN Stack Developer"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                />
                            </div>


                            {/* Company */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Company
                                </label>

                                <input
                                    type="text"
                                    name="company"
                                    placeholder="e.g. Tech Solutions"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                />
                            </div>


                            {/* Location */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Location
                                </label>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="e.g. Noida"
                                    value={formData.location}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                />
                            </div>


                            {/* Salary */}
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Salary
                                </label>

                                <input
                                    type="text"
                                    name="salary"
                                    placeholder="e.g. 5-8 LPA"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    required
                                    className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                                />
                            </div>

                        </div>


                        {/* Description */}
                        <div className="mt-5">

                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Job Description
                            </label>

                            <textarea
                                name="description"
                                placeholder="Enter job description..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full border border-slate-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
                            />

                        </div>


                        {/* Buttons */}
                        <div className="flex gap-3 mt-6">

                            <button
                                type="submit"
                                className="bg-slate-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-800 transition"
                            >
                                {editingJobId
                                    ? "Update Job"
                                    : "Add Job"}
                            </button>


                            {editingJobId && (
                                <button
                                    type="button"
                                    onClick={cancelEdit}
                                    className="border border-slate-300 px-6 py-3 rounded-lg font-medium text-slate-700 hover:bg-slate-100 transition"
                                >
                                    Cancel
                                </button>
                            )}

                        </div>

                    </form>

                </div>


                {/* Manage Jobs */}
                <div>

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h2 className="text-2xl font-bold text-slate-900">
                                Manage Jobs
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                View and manage all job postings
                            </p>
                        </div>

                        <span className="bg-slate-900 text-white px-3 py-1.5 rounded-full text-sm">
                            {jobs.length} Jobs
                        </span>

                    </div>


                    {/* Jobs */}
                    {jobs.length === 0 ? (

                        <div className="bg-white border border-slate-200 rounded-xl p-10 text-center">
                            <h3 className="text-lg font-semibold text-slate-800">
                                No jobs available
                            </h3>

                            <p className="text-slate-500 mt-2">
                                Add your first job posting above.
                            </p>
                        </div>

                    ) : (

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {jobs.map((job) => (

                                <div
                                    key={job._id}
                                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition"
                                >

                                    <div className="p-6">

                                        {/* Job */}
                                        <div className="flex justify-between items-start gap-3">

                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {job.title}
                                                </h3>

                                                <p className="text-slate-600 mt-1">
                                                    {job.company}
                                                </p>
                                            </div>

                                            <span className="text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                                                Active
                                            </span>

                                        </div>


                                        {/* Details */}
                                        <div className="mt-5 space-y-2 text-sm">

                                            <p className="text-slate-600">
                                                📍 {job.location}
                                            </p>

                                            <p className="font-semibold text-slate-900">
                                                💰 {job.salary}
                                            </p>

                                        </div>


                                        {/* Description */}
                                        <p className="text-sm text-slate-500 mt-4 line-clamp-3">
                                            {job.description}
                                        </p>


                                        {/* Actions */}
                                        <div className="flex gap-2 mt-6">

                                            <button
                                                onClick={() =>
                                                    handleEdit(job)
                                                }
                                                className="flex-1 bg-slate-900 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(job._id)
                                                }
                                                className="flex-1 border border-red-200 text-red-600 py-2.5 rounded-lg text-sm font-medium hover:bg-red-50 transition"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}