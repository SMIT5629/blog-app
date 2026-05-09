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

// Ensure that a user cannot follow the same user more than once
followSchema.index({ follower: 1, followee: 1 }, { unique: true })

module.exports = mongoose.model("follows", followSchema)