const likeModel = require("../models/like.model")
const commentModel = require("../models/comment.model")

const likePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    try {
        await likeModel.create({
            post: postId,
            user: userId
        })
        res.status(201).json({ message: "Post liked successfully." })
    } catch (error) {
        res.status(500).json({ message: "Error liking post.", error })
    }
}

const unlikePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    try {
        const unlike = await likeModel.findOneAndDelete({
            post: postId,
            user: userId
        })
        res.status(200).json({ message: "Post unliked successfully." })
    } catch (error) {
        res.status(500).json({ message: "Error unliking post.", error })
    }
}

const getLikes = async (req, res) => {
    const postId = req.params.id;
    try {
        const likes = await likeModel.find({ post: postId }).populate("user", "username");
        res.status(200).json({
            likesCount: likes.length,
            likes

        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving likes.", error })
    }
}

//comments

const makeComment = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user._id;
    const { comment } = req.body;
    try {
        const newComment = await commentModel.create({
            post: postId,
            user: userId,
            comment: comment
        });
        res.status(201).json({ message: "Comment added successfully.", comment: newComment });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getComments = async (req, res) => {
    const postId = req.params.id;
    try {
        const comments = await commentModel.find({ post: postId }).populate("user", "username avatar_image");
        res.status(200).json({ comments });
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving comments.", error })
    }
}

const deleteComment = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    try {
        const comment = await commentModel.findOneAndDelete({ _id: commentId, user: userId });
        if (!comment) {
            return res.status(404).json({ message: "Comment not found or unauthorized." });
        }
        res.status(200).json({ message: "Comment deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment.", error })
    }
}

const editComment = async (req, res) => {
    const commentId = req.params.commentId;
    const userId = req.user._id;
    const { comment } = req.body;
    try {
        const updatedComment = await commentModel.findOneAndUpdate(
            { _id: commentId, user: userId },
            { comment: comment },
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found or unauthorized." });
        }

        res.status(200).json({ message: "Comment updated successfully.", comment: updatedComment });
    } catch (error) {
        res.status(500).json({ message: "Error updating comment.", error })
    }
}

    module.exports = {
        likePost, unlikePost, getLikes, makeComment, getComments, deleteComment, editComment
    }

