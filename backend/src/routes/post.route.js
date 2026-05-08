const express = require("express");
const router = express.Router();
const PostController = require("../controllers/post.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")
const { upload } = require("../middlewares/multer.middleware")

router.post("/create-post", AuthMiddleware.authUser, upload.single("cover_image"), PostController.createPost);

router.get("/", PostController.getAllPosts);

router.get("/:id", PostController.getPostById);

router.put("/:id", AuthMiddleware.authUser, upload.single("cover_image"), PostController.updatePost);

router.delete("/:id", AuthMiddleware.authUser, PostController.deletePost);


module.exports = router;