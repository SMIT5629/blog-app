const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            maxlength: 200,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        cover_image: {
            type: String,
            default: "",
        },
        views: {
            type: Number,
            default: 0,
        },
        type:{
            type: String,
            enum: ["TECH", "LIFESTYLE", "TRAVEL", "FOOD", "OTHER"],
            default: "OTHER",
        }
    },
    { timestamps: true }
);

postSchema.pre("save", async function () {
    if (this.title && !this.slug) {
        this.slug = this.title.toLowerCase().split(" ").join("-");
    }
});


module.exports = mongoose.model("post", postSchema);