require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connectDB")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const followsRoutes = require("./routes/follows.route")
const reactionRoutes = require("./routes/reactions.route")
const userRoutes = require("./routes/users.route")

const  app = express();

app.set("trust proxy", 1);
connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


//auth routes
app.use("/api/auth", authRoutes)

//post routes
app.use("/api/posts", postRoutes)

//follows routes
app.use("/api/follows", followsRoutes)

//reactions routes
app.use("/api/reactions", reactionRoutes)

//users routes
app.use("/api/users", userRoutes)

app.get("/",(req,res)=>{
    res.send("To kaise ho app log")
})

module.exports = app;
