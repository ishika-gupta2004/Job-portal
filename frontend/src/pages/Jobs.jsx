import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
  useEffect(() => { api.get("/api/jobs").then(({ data }) => setJobs(data.jobs)).catch(() => setError("Unable to load jobs. Please try again shortly.")).finally(() => setLoading(false)); }, []);
  return <main className="mx-auto max-w-7xl px-6 py-12 sm:py-16"><p className="text-sm font-semibold text-brand-700">Open positions</p><div className="mt-2 flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Find your next role</h1><p className="mt-2 text-slate-600">Browse opportunities posted by our employers.</p></div><span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-700">{jobs.length} roles</span></div>
    {loading && <p className="mt-10 text-slate-600">Loading available jobs…</p>}{error && <p className="mt-10 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>}
    <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{jobs.map((job) => <article key={job._id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><h2 className="text-xl font-semibold text-slate-900">{job.title}</h2><p className="mt-3 font-medium text-slate-700">{job.company}</p><p className="mt-1 text-sm text-slate-500">{job.location}</p><p className="mt-5 text-sm font-semibold text-brand-700">{job.salary}</p><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{job.description}</p><Link to={`/jobs/${job._id}`} className="mt-6 text-sm font-semibold text-brand-700 hover:text-brand-600">View job details →</Link></article>)}</div>
    {!loading && !error && jobs.length === 0 && <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">No jobs have been posted yet.</div>}
  </main>;
}
