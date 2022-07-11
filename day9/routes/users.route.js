import express from "express";
import connection from "../models/index.js";
import userModel from "../models/user.model.js";
import { Op } from "sequelize";

const router = express.Router();


// Add user
router.post("/add", async (req, res) => {
    const { username, password } = req.body;

    try{
        // const [rows, fields] = await connection.query(
        //     `INSERT INTO users(username, password) VALUES(?,?)`,
        //     [username, password]
        // );
        const data = await userModel.create({ username:username, password:password });
        // Helps to create in bulk
        // const data = await userModel.bulkCreate(req.body);
    
        console.log(data);
        res.status(200).json(data);
    }catch(err){
        console.log(err);
    }
});

// Retrieve user
router.get("/:id", async(req, res) => {
    const { id } = req.params;
    if (id) {
        // const[rows, fields] = await connection.query(
        //     `SELECT * FROM users WHERE id = ?`,
        //     [id],
        //     );
        //     res.status(200).json(rows);

        const data = await userModel.findByPk(id);
        if(data){
            res.status(200).json(data);
        }else{
            res.status(404).json({ success: false, message: "User not found" });
        }
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

// Update user
router.put("/:id", async(req, res) => {
    const { id } = req.params;
    if (id) {
        const { username, password } = req.body;

        // connection.query(
        //     `UPDATE users SET username=?, password=? WHERE id = ?`,
        //     [username, password, id],
        //     (err, results, fields) => {
        //         if (err) throw err;
        //         if (results.affectedRows === 1) {
        //             res.status(200).json({ success: true, message: "User updated successfully." });
        //         } else {
        //             res.status(200).json({ success: false, message: "Unable to update user." });
        //         }
        //     });

        const data = await userModel.update(
            { username, password },
            { 
                where: { 
                    id,
                 },
            }
        );
        console.log(data);
        if(data[0] === 1){
            res.status(200).json({ success: true, message: "User updated successfully." });
        }else{
            res.status(404).json({ success: false, message: "Unable to update the user." });
        }
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

// Delete user
router.delete("/:id", async(req, res) => {
    const { id } = req.params;
    if (id) {
        // connection.query(
        //     `DELETE FROM users WHERE id = ?`,
        //     [id],
        //     (err, results, fields) => {
        //         if (err) throw err;
        //         if (results.affectedRows === 1) {
        //             res.status(200).json({ success: true, message: "User deleted successfully." });
        //         } else {
        //             res.status(200).json({ success: false, message: "Unable to delete user." });
        //         }
        //     });

        const data = await userModel.destroy({
            where: { id, }
        });

        if(data === 1){
            res.status(200).json({ success: true, message: "User deleted successfully." });
        }else{
            res.status(404).json({ success: false, message: "Unable to delete the user." });
        }
    } else {
        res.status(200).json({ success: false, message: "User ID not provided." });
    }
});

// Search By username
router.get("/search/:username", async(req, res) => {
    
    const { username } = req.params;

    const data = await userModel.findAll({
        where: {
            username: {
                [Op.like]: `%${username}%`,
            },
        },
    });
    if(data[0]){
        res.status(200).json({ success: true, message: data });
    }else{
        res.status(404).json({ success: false, message: "User not found." });
    }
});

export default router;