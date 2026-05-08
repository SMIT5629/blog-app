const  mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true,"Name is required"],
            trim: true,
            minlength: 2,
            maxlength: 50,
        },

        username: {
            type: String,
            required: [true,"Username is required"],
            unique: [true,"Username must be unique"],
            trim: true,
            minlength: 3,
            maxlength: 30,
            index: true,
        },

        email: {
            type: String,
            required: [true,"Email is required"],
            unique: [true,"Email must be unique"],
            lowercase: true,
            trim: true,
            index: true,
        },

        password: {
            type: String,
            required: [true,"Password is required"],
            select:false
        },

        avatar_url: {
            type: String,
            default: "https://unsplash.com/photos/a-cartoon-character-wearing-a-blue-shirt-and-a-blue-hat-gEf9bOMTZtk",
        },

        bio: {
            type: String,
            maxlength: 500,
            default: "It's wonderFul day to be alive! :)",
        },

        role: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER",
        },
    },{timestamps: true}
);


module.exports = mongoose.model("user", userSchema);
