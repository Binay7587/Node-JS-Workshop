import express from "express";
import connection from "../config/connection.js";
const router = express.Router();


// Add user
router.post("/add", async (req, res) => {
    const { username, password } = req.body;

    try{
        const [rows, fields] = await connection.query(
            `INSERT INTO users(username, password) VALUES(?,?)`,
            [username, password]
        );
    
        res.status(200).json(rows);
    }catch(err){
        console.log(err);
    }
});

// Retrieve user
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    if (id) {
        const[rows, fields] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id],
            );
            res.status(200).json(rows);
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

// Update user
router.put("/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
        const { username, password } = req.body;

        connection.query(
            `UPDATE users SET username=?, password=? WHERE id = ?`,
            [username, password, id],
            (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows === 1) {
                    res.status(200).json({ success: true, message: "User updated successfully." });
                } else {
                    res.status(200).json({ success: false, message: "Unable to update user." });
                }
            });
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

// Delete user
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    if (id) {
        connection.query(
            `DELETE FROM users WHERE id = ?`,
            [id],
            (err, results, fields) => {
                if (err) throw err;
                if (results.affectedRows === 1) {
                    res.status(200).json({ success: true, message: "User deleted successfully." });
                } else {
                    res.status(200).json({ success: false, message: "Unable to delete user." });
                }
            });
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

export default router;