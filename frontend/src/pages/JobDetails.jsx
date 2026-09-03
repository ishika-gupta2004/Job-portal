import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api/axios";

export default function JobDetails() {
  const { id } = useParams(); 
  const [job, setJob] = useState(null); 
  const [error, setError] = useState("");
  
  useEffect(() => { api.get(`/api/jobs/${id}`).then(({ data }) => setJob(data.job)).catch(() => setError("This job could not be found.")); }, [id]);
  if (error) return <main className="mx-auto max-w-3xl px-6 py-16"><p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</p></main>;
  if (!job) return <main className="mx-auto max-w-3xl px-6 py-16 text-slate-600">Loading job details…</main>;
  return <main className="mx-auto max-w-3xl px-6 py-12"><Link to="/jobs" className="text-sm font-semibold text-brand-700 hover:underline">← Back to jobs</Link><article className="mt-6 rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10"><p className="text-sm font-semibold text-brand-700">{job.company}</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</h1><div className="mt-6 flex flex-wrap gap-3 text-sm"><span className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-700">Location: {job.location}</span><span className="rounded-full bg-brand-50 px-3 py-1.5 font-medium text-brand-700">Salary: {job.salary}</span></div><div className="mt-9 border-t border-slate-200 pt-7"><h2 className="text-lg font-semibold">About this role</h2><p className="mt-3 whitespace-pre-line leading-7 text-slate-600">{job.description}</p></div></article></main>;
}
