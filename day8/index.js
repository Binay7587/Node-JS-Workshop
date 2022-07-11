import express from "express";
import usersRouter from "./routes/users.route.js";

const app = express();
app.use(express.json());

app.use("/users", usersRouter);

app.listen(8000, async () => {
    console.log("Server is running on port 8000");    
})