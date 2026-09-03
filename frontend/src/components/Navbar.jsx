import { Link, NavLink, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const navClass = ({ isActive }) => `text-sm font-medium transition ${isActive ? "text-brand-700" : "text-slate-600 hover:text-brand-700"}`;

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let user = null;
  try { user = token ? jwtDecode(token) : null; } catch { localStorage.removeItem("token"); }
  const handleLogout = () => { localStorage.removeItem("token"); navigate("/login"); };

  return <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-5 px-5 sm:px-6">
      <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">Career<span className="text-brand-600">Hub</span></Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <NavLink to="/" className={navClass}>Home</NavLink><NavLink to="/jobs" className={navClass}>Jobs</NavLink>
        {user?.role === "admin" && <NavLink to="/admin" className={navClass}>Dashboard</NavLink>}
        {user ? <button onClick={handleLogout} className="text-sm font-medium text-slate-600 transition hover:text-red-600">Logout</button> : <><NavLink to="/login" className={navClass}>Login</NavLink><NavLink to="/register" className="rounded-lg bg-brand-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700">Register</NavLink></>}
      </div>
    </div>
  </nav>;
}
