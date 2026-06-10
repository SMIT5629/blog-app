const express = require("express");
const router = express.Router();
const ReactionController = require("../controllers/reaction.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")

router.post("/:id", AuthMiddleware.authUser, ReactionController.likePost)
router.delete("/:id", AuthMiddleware.authUser, ReactionController.unlikePost)
router.get("/:id", ReactionController.getLikes)

router.post("/:id/comment", AuthMiddleware.authUser, ReactionController.makeComment)
router.get("/:id/comments", ReactionController.getComments)
router.delete("/comment/:commentId", AuthMiddleware.authUser, ReactionController.deleteComment)
router.put("/comment/:commentId", AuthMiddleware.authUser, ReactionController.editComment)



module.exports = router;