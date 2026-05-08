const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")

router.post("/sign-up", AuthController.signUp);
router.post("/sign-in", AuthController.signIn);
router.post("/sign-out", AuthController.signOut);
router.get("/me", AuthMiddleware.authUser, AuthController.getMe);

module.exports = router;