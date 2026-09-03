import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function Login() {
  const navigate = useNavigate();
   const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); 
    const [loading, setLoading] = useState(false);
    
  const submit = async (e) => { e.preventDefault(); setError(""); setLoading(true); try { const { data } = await api.post("/api/auth/login", formData); localStorage.setItem("token", data.token); navigate(data.user.role === "admin" ? "/admin" : "/jobs"); } catch (err) { setError(err.response?.data?.message || "Login failed. Please try again."); } finally { setLoading(false); } };
  return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-5 py-12"><form onSubmit={submit} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"><p className="text-sm font-semibold text-brand-700">Welcome back</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Sign in to your account</h1><p className="mt-2 text-sm text-slate-600">Access your CareerHub account.</p>{error && <p className="mt-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="mt-6 space-y-4"><label className="block text-sm font-medium">Email<input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-50" /></label><label className="block text-sm font-medium">Password<input required type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-50" /></label></div><button disabled={loading} className="mt-6 w-full rounded-lg bg-brand-600 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60">{loading ? "Signing in…" : "Sign in"}</button><p className="mt-5 text-center text-sm text-slate-600">New here? <Link to="/register" className="font-semibold text-brand-700 hover:underline">Create an account</Link></p></form></main>;
}
