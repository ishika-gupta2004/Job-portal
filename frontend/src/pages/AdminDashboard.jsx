import { useState } from "react";
import api from "../api/axios";

export default function AdminDashboard() {
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
            const response = await api.post("/api/jobs", formData);

            // console.log("Job Created:", response.data);

            alert("Job added successfully!");

            setFormData({
                title: "",
                company: "",
                location: "",
                salary: "",
                description: "",
            });
        } catch (error) {
            console.log("Error:", error);

            alert(
                error.response?.data?.message || "Failed to add job"
            );
        }
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

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                    >
                        Add Job
                    </button>

                </form>
            </div>
        </div>
    );
}