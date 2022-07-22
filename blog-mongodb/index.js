import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import blogRouter from "./routes/blogs.router.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/blogs", blogRouter);

app.listen(8000, async () => {
  console.log("Server has started 🚀");
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);
    console.log("Database connected successfully. 🚀");
  } catch (err) {
    console.log(err);
  }
});