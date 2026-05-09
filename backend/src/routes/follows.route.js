const express = require("express");
const router = express.Router();
const FollowsController = require("../controllers/follows.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")

router.post("/:id", AuthMiddleware.authUser, FollowsController.followUser);
router.delete("/:id", AuthMiddleware.authUser, FollowsController.unfollowUser);
router.get("/:id/followers", FollowsController.getFollowers);
router.get("/:id/following", FollowsController.getFollowing);

module.exports = router;