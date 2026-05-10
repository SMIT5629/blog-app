const mongoose = require("mongoose")

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post", 
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true
    }
}, { timestamps: true })

likeSchema.methods.getLikesCount = async function () {
    const likesCount = await mongoose.model("likes").countDocuments({ post: this.post });
    return likesCount;
}

likeSchema.index({ post: 1, user: 1 }, { unique: true })

module.exports = mongoose.model("likes", likeSchema)


