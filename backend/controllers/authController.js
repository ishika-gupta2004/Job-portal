const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, resp) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return resp.status(400).json({ message: "please provide name , email and password" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return resp.status(400).json({ message: "User already exists" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
        })

        resp.status(201).json({
            message: "User Register Successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });

    } catch (error) {
        resp.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

     
        if (!email || !password) {
            return res.status(400).json({
                message: "Please provide email and password",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Compare password
        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
};

module.exports = {registerUser , loginUser};