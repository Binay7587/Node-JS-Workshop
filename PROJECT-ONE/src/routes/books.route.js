import express from "express";
import BookController from "../controllers/book.controller.js";
import multer from "multer";

const router = express.Router();

let imagename;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/books')
    },
    filename: function (req, file, cb) {
        imagename = Date.now() + '-' + Math.round(Math.random() * 1E9)+"-"+file.originalname.trim();
        cb(null, imagename)
    }
  })
  
  const upload = multer({ storage });
  const bookController = new BookController();

// Gets all books from the database
router.get("/", bookController.index);

//Stores a book in the database
router.post("/", upload.single("image"), (req, res) => {
    bookController.store(req, res, imagename);
});

// Create view for a book
// router.get("/create", bookController.create);

// shows a specific book
router.get("/:id", bookController.show);

// Update a specific book
router.put("/:id", bookController.update);

// Delete a specific book
router.delete("/:id", bookController.destroy);

// Edit view for a book
// router.get("/:id/edit", bookController.edit);

export default router;
