const express = require("express");
const router = express.Router();
const ReactionController = require("../controllers/reaction.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")

router.post("/:id", AuthMiddleware.authUser, ReactionController.likePost)
router.delete("/:id", AuthMiddleware.authUser, ReactionController.unlikePost)
router.get("/:id", ReactionController.getLikes)



module.exports = router;