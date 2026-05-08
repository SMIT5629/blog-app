const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");
const emailService = require("../services/email.service");

const signUp = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(409).json({ message: "Email or username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await userModel.create({
            name,
            username,
            email,
            password: hashedPassword
        });

        // Send registration email
        await emailService.sendRegistrationEmail(newUser.email, newUser.name);

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully",
            user: { id: newUser._id, name, username, email },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signIn = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        if (!identifier || !password) {
            return res.status(400).json({ message: "Email/Username and password are required" });
        }

        const user = await userModel.findOne({ $or: [{ email: identifier }, { username: identifier }] }).select("+password");

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        const isBlacklisted = await tokenBlackListModel.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({ message: "Token is blacklisted. Please sign in again." });
        }

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "User signed in successfully",
            user: { id: user._id, name: user.name, username: user.username, email: user.email },
            token
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const signOut = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        await tokenBlackListModel.create({ token });
        res.clearCookie("token");
        res.status(200).json({ message: "User signed out successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    signUp,
    signIn,
    signOut,
    getMe
};
