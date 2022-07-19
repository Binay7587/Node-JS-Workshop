import express from "express";
import connection from "./models/index.js";
import booksRoute from "./routes/books.route.js";
import "dotenv/config";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Backend is working");
});

app.use("/books", booksRoute);

app.listen(process.env.PORT || 8000, async() => {
    console.log("Server is running on port 8000");

    try{
        await connection.authenticate();
        connection.sync();
        console.log("Database is connected");
    }
    catch(err){
        console.log("Error during connecting to database: ", err);
    }
});