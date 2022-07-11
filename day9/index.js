import express from "express";
import usersRouter from "./routes/users.route.js";
import connection from "./models/index.js"

const app = express();
app.use(express.json());

app.use("/users", usersRouter);

app.listen(8000, async () => {
    console.log("Server is running on port 8000");
    try {
        await connection.authenticate();
        // Helps to migrate the database everytime the server is restarted
        // connection.sync({ force:true });
        connection.sync();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }   
})