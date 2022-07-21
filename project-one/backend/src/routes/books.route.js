import express from "express";
import BookController from "../controllers/book.controller.js";
import upload from "../middlewares/multer.js"

const router = express.Router();
const bookController = new BookController();

// Gets all books from the database
router.get("/", bookController.index);

//Stores a book in the database
router.post("/", upload.single("image"), bookController.store);

// Searchs a book
router.get("/search", bookController.search);

// shows a specific book
router.get("/:id", bookController.show);

// Update a specific book
router.put("/:id", bookController.update);

// Delete a specific book
router.delete("/:id", bookController.destroy);

// Edit view for a book
// router.get("/:id/edit", bookController.edit);

export default router;
