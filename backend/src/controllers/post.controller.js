const postModel = require("../models/post.model");
const uploadFile = require("../services/storage.service");

const createPost = async (req, res) => {
    try {
        const { title, content, type } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        let coverImage = "";

        if (req.file) {
            const uploadedCover = await uploadFile(req.file.buffer);
            coverImage = uploadedCover.url;
        }

        const post = await postModel.create({
            author: req.user._id,
            title,
            content,
            cover_image: coverImage,
            type
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author', 'name username avatar_image');
        res.status(200).json({ posts });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate('author', 'name username avatar_image');

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ post });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, type } = req.body;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (title) post.title = title;
        if (content) post.content = content;
        if (type) post.type = type;

        if (req.file) {
            const uploadedCover = await uploadFile(req.file.buffer);
            post.cover_image = uploadedCover.url;
        }

        await post.save();
        res.status(200).json({
            message: "Post updated successfully",
            post
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await postModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Post deleted successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const incrementViews = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } }, // increment by 1
            { new: true }
        );
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({ views: post.views });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    incrementViews
};

