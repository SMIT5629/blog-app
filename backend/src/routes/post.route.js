const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")
const { upload } = require("../middlewares/multer.middleware")
const { readPostLimiter, createPostLimiter } = require("../middlewares/rateLimit.middleware");


router.post("/create-post", createPostLimiter, AuthMiddleware.authUser, upload.single("cover_image"), PostController.createPost);

router.get("/", readPostLimiter, PostController.getAllPosts);

router.get("/:id", readPostLimiter, PostController.getPostById);

router.patch("/:id", createPostLimiter, AuthMiddleware.authUser, upload.single("cover_image"), PostController.updatePost);

router.delete("/:id", createPostLimiter, AuthMiddleware.authUser, PostController.deletePost);

router.patch("/:id/views", createPostLimiter, PostController.incrementViews);




module.exports = router;