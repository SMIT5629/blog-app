const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    }
}, { timestamps: true })

module.exports = mongoose.model("comments", commentSchema)
