require("dotenv").config()
const express = require("express")
const connectDB = require("./config/connectDB")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")

const authRoutes = require("./routes/auth.route")
const postRoutes = require("./routes/post.route")
const followsRoutes = require("./routes/follows.route")

const  app = express();

connectDB();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan("dev"))


//auth routes
app.use("/api/auth", authRoutes)

//post routes
app.use("/api/posts", postRoutes)

//follows routes
app.use("/api/follows", followsRoutes)

app.get("/",(req,res)=>{
    res.send("To kaise ho app log")
})

module.exports = app;