const postModel = require("../models/post.model");
const uploadFile = require("../services/storage.service");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const uploadedCover = await uploadFile(req.file.buffer);

        const post = await postModel.create({
            author: req.user._id,
            title,
            content,
            cover_image: uploadedCover.url,
        });

        res.status(201).json({
            message: "Post created successfully",
            post
        });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('author', 'username');
        res.status(200).json({ posts });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate('author', 'username');

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
        const { title, content } = req.body;

        const post = await postModel.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (post.author.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        if (title) post.title = title;
        if (content) post.content = content;

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

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};

