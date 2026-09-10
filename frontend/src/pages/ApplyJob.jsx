import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

export default function ApplyJob() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        skills: "",
        coverMessage: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            await api.post("/api/applications", {
                jobId: id,
                ...formData,
            });

            alert("Application submitted successfully!");

            navigate("/jobs");

        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to submit application"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow">

                <h1 className="text-3xl font-bold mb-2">
                    Apply for Job
                </h1>

                <p className="text-gray-500 mb-6">
                    Fill in your details to apply for this position.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Name */}
                    <div>
                        <label className="block font-medium mb-1">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Enter your name"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block font-medium mb-1">
                            Phone
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Enter your phone number"
                        />
                    </div>

                    {/* Experience */}
                    <div>
                        <label className="block font-medium mb-1">
                            Experience
                        </label>

                        <input
                            type="text"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="e.g. Fresher / 1 Year / 2 Years"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block font-medium mb-1">
                            Skills
                        </label>

                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="React, Node.js, MongoDB"
                        />
                    </div>

                    {/* Cover Message */}
                    <div>
                        <label className="block font-medium mb-1">
                            Cover Message
                        </label>

                        <textarea
                            name="coverMessage"
                            value={formData.coverMessage}
                            onChange={handleChange}
                            required
                            rows="5"
                            className="w-full border rounded-lg px-4 py-3"
                            placeholder="Write a short message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                    >
                        {loading
                            ? "Submitting..."
                            : "Submit Application"}
                    </button>

                </form>
            </div>
        </div>
    );
}