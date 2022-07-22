import { Router } from "express";
import BlogController from "../controllers/blog.controller.js";

const router = Router();
const blogController = new BlogController();

// Gets all blogs from the database
router.get("/", blogController.index);

//Stores a blog in the database
router.post("/", blogController.store);

// shows a specific blog
router.get("/:id", blogController.show);

// Update a specific blog
router.put("/:id", blogController.update);

// Delete a specific blog
router.delete("/:id", blogController.destroy);

export default router;
