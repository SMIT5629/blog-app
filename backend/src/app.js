require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connectDB")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const helmet = require("helmet")

const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const followsRoutes = require("./routes/follows.route")
const reactionRoutes = require("./routes/reactions.route")
const userRoutes = require("./routes/users.route")

const { generalLimiter, authLimiter, reactionLimiter, followLimiter } = require("./middlewares/rateLimit.middleware");

const app = express();

app.set("trust proxy", 1);
connectDB();

//security middlewares
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

//rate limiters
app.use(generalLimiter)


app.get("/", (req, res) => {
    res.send("To kaise ho app log")
})

//routes
app.use("/api/auth", authLimiter, authRoutes)

app.use("/api/posts", postRoutes)              // post limiter applied per route in post.route.js

app.use("/api/follows", followLimiter, followsRoutes)

app.use("/api/reactions", reactionLimiter, reactionRoutes)

app.use("/api/users", userRoutes)


// global error handler 
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
    });
});

module.exports = app;