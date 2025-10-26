const express = require("express");
const authController = require("../controllers/auth.controller");
const { authUser } = require("../middlewares/auth.middleware");
const router = express.Router();

// user registration route
router.post("/user/register", authController.registerUser);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);

// logged in user details route
router.get("/me", authUser, authController.getLoggedInUser);

module.exports = router;
