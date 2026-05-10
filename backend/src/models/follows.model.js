const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    //logged in user is the follower and the user to be followed is the followee
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
},
    { timestamps: true })

followSchema.methods.getFollowersCount = async function () {
    const followersCount = await mongoose.model("follows").countDocuments({ followee: this.followee });
    return followersCount;
}

followSchema.methods.getFollowingCount = async function () {
    const followingCount = await mongoose.model("follows").countDocuments({ follower: this.follower });
    return followingCount;
}

// Ensure that a user cannot follow the same user more than once
followSchema.index({ follower: 1, followee: 1 }, { unique: true })

module.exports = mongoose.model("follows", followSchema)