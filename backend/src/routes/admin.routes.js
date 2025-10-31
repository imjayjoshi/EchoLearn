const express = require("express");
const { authAdmin } = require("../middlewares/auth.middleware");
const adminController = require("../controllers/admin.controller");
const router = express.Router();

// User Management
router.get("/users", authAdmin, adminController.getAllUsers);
router.get("/users/:userId", authAdmin, adminController.getUserDetails);
router.put("/users/:userId", authAdmin, adminController.updateUser);
router.delete("/users/:userId", authAdmin, adminController.deleteUser);

// System Statistics
router.get("/statistics", authAdmin, adminController.getSystemStatistics);

module.exports = router;
