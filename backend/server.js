require("dotenv").config();
const express = require ("express");
const cors = require ("cors");

const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/authMiddleware");
const jobRoutes = require("./routes/jobRoutes");

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);

app.get("/",(req,resp)=>{
    resp.send("Job portal server running")
})

app.get("/api/protected", protect, (req,resp) => {
    resp.json({message: "You can access this protected routes", user: req.user})
})

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});