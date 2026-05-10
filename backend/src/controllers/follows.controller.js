const followsModel = require("../models/follows.model")

const followUser = async (req, res) => {
    const followeeId = req.params.id;
    const followerId = req.user._id;

    if (followerId.toString() === followeeId) {
        return res.status(400).json({ message: "You cannot follow yourself." });
    }

    try {
        const follow = new followsModel({
            follower: followerId,
            followee: followeeId
        });
        if (!follow) {
            return res.status(404).json({ message: "User to follow not found." });
        }
        await follow.save();
        res.status(201).json({ message: "User followed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error following user." });
    }
}

const unfollowUser = async (req, res) => {
    const followeeId = req.params.id;
    const followerId = req.user._id;

    if (followerId.toString() === followeeId) {
        return res.status(400).json({ message: "You cannot unfollow yourself." });
    }
    try {
        const unfollow = await followsModel.findOneAndDelete({
            follower: followerId,
            followee: followeeId
        });

        if (!unfollow) {
            return res.status(404).json({ message: "Follow relationship not found." });
        }

        res.status(200).json({ message: "User unfollowed successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error unfollowing user." });
    }
}

//it will retrive all followee who followed you 
const getFollowers = async (req, res) => {
    const userId = req.params.id;
    try {
        const followers = await followsModel.find({
            followee: userId
        }).populate("follower", "username");
        res.status(200).json({
            followers,
            followersCount: followers.length
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//it will retrive all follow whom you followed 
const getFollowing = async (req, res) => {
    const userId = req.params.id;
    try {
        const following = await followsModel.find({
            follower: userId
        }).populate("followee", "username");
        res.status(200).json({
            following,
            followingCount: following.length
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching following." });
    }
}

module.exports = {
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing
}
