import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

// Add user
router.post("/add", userController.addUser);

// Retrieve user
router.get("/:id", userController.getUserByID);

// Update user
router.put("/:id", userController.updateUser);

// Delete user
router.delete("/:id", );

// Search By username
router.get("/search/:username", userController.searchByUsername);

export default router;