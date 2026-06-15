const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const AuthMiddleware = require("../middlewares/auth.middleware")
const MulterMiddleware = require("../middlewares/multer.middleware")


router.patch("/me", AuthMiddleware.authUser, MulterMiddleware.upload.single("avatar_image"), AuthController.updateProfile);
router.get("/:id", AuthController.getUserProfile);


module.exports = router;