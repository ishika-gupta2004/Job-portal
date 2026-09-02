import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-10 py-4 bg-white shadow">
      
      <Link to="/" className="text-2xl font-bold">
        JobPortal
      </Link>

      <div className="flex items-center gap-4 md:gap-6">
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>

        <Link to="/jobs" className="hover:text-blue-600">
          Jobs
        </Link>

        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>

        <Link to="/register" className="hover:text-blue-600">
          Register
        </Link>
      </div>

    </nav>
  );
}