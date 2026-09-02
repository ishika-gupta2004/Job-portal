import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobDetails from "./pages/JobDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/jobs" element={<Jobs />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/jobs/:id" element={<JobDetails />}></Route>
    
          <Route path="/admin" element={<AdminRoute><AdminDashboard /> </AdminRoute>}></Route>

        </Routes>


      </BrowserRouter>
    </>
  );
}

export default App;