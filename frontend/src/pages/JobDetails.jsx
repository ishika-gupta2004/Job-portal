import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [error, setError] = useState("");

  const handleApply = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this job.");
      navigate("/login");
      return;
    }

    navigate(`/jobs/${id}/apply`);
  };

  useEffect(() => {
    api
      .get(`/api/jobs/${id}`)
      .then(({ data }) => {
        setJob(data.job);
      })
      .catch(() => {
        setError("This job could not be found.");
      });
  }, [id]);

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </p>
      </main>
    );
  }

  // Loading
  if (!job) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 text-slate-600">
        Loading job details…
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">

      {/* Back Button */}
      <Link
        to="/jobs"
        className="text-sm font-semibold text-brand-700 hover:underline"
      >
        ← Back to jobs
      </Link>

      {/* Job Card */}
      <article className="mt-6 rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">

        {/* Company */}
        <p className="text-sm font-semibold text-brand-700">
          {job.company}
        </p>

        {/* Job Title */}
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          {job.title}
        </h1>

        {/* Job Information */}
        <div className="mt-6 flex flex-wrap gap-3 text-sm">

          <span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">
            Location: {job.location}
          </span>

          <span className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-700">
            Salary: {job.salary}
          </span>

        </div>

        {/* Description */}
        <div className="mt-9 border-t border-slate-200 pt-7">

          <h2 className="text-lg font-semibold">
            About this role
          </h2>

          <p className="mt-3 whitespace-pre-line leading-7 text-slate-600">
            {job.description}
          </p>

        </div>

        {/* Apply Button */}
        <div className="mt-8 border-t border-slate-200 pt-7">

          {/* <Link
            to={`/jobs/${job._id}/apply`}
            className="inline-block rounded-lg bg-brand-700 px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Apply Now
          </Link> */}
          <button
            onClick={handleApply}
            className="rounded-lg bg-brand-700 px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Apply Now
          </button>

        </div>

      </article>
    </main>
  );
}