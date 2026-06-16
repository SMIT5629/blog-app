const userModel = require("../models/user.model");
const followModel = require("../models/follows.model");
const postModel = require("../models/post.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require("../models/blacklist.model");
const emailService = require("../services/email.service");
const uploadFile = require("../services/storage.service");

const isDeployedClient = process.env.CLIENT_URL?.startsWith("https://");
const authCookieOptions = {
    httpOnly: true,
    sameSite: isDeployedClient ? "none" : "lax",
    secure: Boolean(isDeployedClient),
    maxAge: 7 * 24 * 60 * 60 * 1000,
};

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

        res.cookie("token", token, authCookieOptions);

        res.status(201).json({
            message: "User registered successfully",
            user: { _id: newUser._id, id: newUser._id, name, username, email },
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

        res.cookie("token", token, authCookieOptions);

        res.status(200).json({
            message: "User signed in successfully",
            user: { _id: user._id, id: user._id, name: user.name, username: user.username, email: user.email },
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
        res.clearCookie("token", {
            httpOnly: authCookieOptions.httpOnly,
            sameSite: authCookieOptions.sameSite,
            secure: authCookieOptions.secure,
        });
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

const updateProfile = async (req, res) => {
    try {
        const { name, username, email, bio } = req.body;
        const updateData = {};

        if (name !== undefined) updateData.name = name;
        if (username !== undefined) updateData.username = username;
        if (email !== undefined) updateData.email = email;
        if (bio !== undefined) updateData.bio = bio;

        if (req.file) {
            const uploadedAvatar = await uploadFile(req.file.buffer);

            updateData.avatar_image = uploadedAvatar.url;
        }

        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({
                message: "No valid fields provided for update",
            });
        }

        const conflictQuery = {
            _id: { $ne: req.user.id },
            $or: [],
        };

        if (email) conflictQuery.$or.push({ email });
        if (username) conflictQuery.$or.push({ username });

        if (conflictQuery.$or.length > 0) {
            const existingUser = await userModel.findOne(conflictQuery);

            if (existingUser) {
                return res.status(409).json({
                    message: "Email or username already in use",
                });
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            req.user.id,
            { $set: updateData },
            {
                returnDocument: "after",
                runValidators: true,
            }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: updatedUser,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: error.message,
        });
    }
};

const getUserProfile = async (req, res) => {
    try {
        const userId = req.params.id || req.user?._id;
        const user = await userModel.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const followersCount = await followModel.countDocuments({ followee: userId });
        const followingCount = await followModel.countDocuments({ follower: userId });
        const postsCount = await postModel.countDocuments({ author: userId });
        const posts = await postModel.find({ author: userId }).sort({ createdAt: -1 }).populate("author", "username avatar_image");
        res.status(200).json({
            user,
            followersCount,
            followingCount,
            posts,
            postsCount
        });
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

    module.exports = {
        signUp,
        signIn,
        signOut,
        getMe,
        updateProfile,
        getUserProfile,
    };
