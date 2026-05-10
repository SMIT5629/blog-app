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

module.exports = {
    likePost, unlikePost, getLikes

}