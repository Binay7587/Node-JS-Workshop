import { Op } from "sequelize";
import bookModel from "../models/book.model.js";

export default class BookController {

    /**
     * Display a listing of the books.
     */
    async index(req, res) {
        let { limit } = req.query;
        if(!limit) limit = 20;

        const data = await bookModel.findAll({
            limit: parseInt(limit),
        });
        if(data){
            for(let d of data){
                d.dataValues.image = "http://localhost:8000/uploads/books/" + d.dataValues.image
            }
            res.json(data)
        }else{
            res.json({ success: false, message: "There is no any book." });
        }
    }

    /**
     * Store a book in the database.
     * @param {*} req 
     * @param {*} res 
     * @param {*} imagename 
     */
    async store(req, res, imagename) {
        const data = await bookModel.create({ ...req.body, image: imagename });
        console.log(data);
        if(data){
            res.json(data)
        }else{
            res.json({ success: false, message: "Error during creating book" });
        }
    }

    /**
     * Search a book.
     * @param {*} req 
     * @param {*} res 
     */
    async search(req, res) {
        const { q } = req.query;
        if(q){
            const data = await bookModel.findAll({
                where: {
                    [Op.or]: {
                        name: {
                            [Op.like]: `%${q}%`
                        },
                        author: {
                            [Op.like]: `%${q}%`
                        }
                    },
                },
            });
            if(data[0]){
                res.json(data)
            }else{
                res.json({ success: false, message: "There is no any book." });
            }
        }else{
            res.json({ success:false, message: "Please enter a search query." });
        }
    }

    /**
     * Display the specified book.
     * @param {*} req 
     * @param {*} res 
     */
     async show(req, res) {
        const { id } = req.params;

        const data = await bookModel.findByPk(id);
        if(data){
            res.json(data)
        }else{
            res.json({ success: false, message: "There is no such book." });
        }
    }

    /**
     * Update the specified book.
     * @param {*} req 
     * @param {*} res 
     */
     async update(req, res) {
        const { id } = req.params;
        const book = await bookModel.findByPk(id);
        
        if(book){
            const data = await book.update(req.body);
            // using ternary operators to check if the data is updated or not
            data ? res.json(data): res.json({ success: false, message: "Error during updating book" });
        }else{
            res.json({ success: false, message: "There is no such book." });
        }
    }
    
    /**
     * Delete the specified book.
     * @param {*} req 
     * @param {*} res 
     */
    async destroy(req, res) {
        const { id } = req.params;
        const book = await bookModel.findByPk(id);
        
        if(book){
            const data = await book.destroy();
            // using ternary operators to check if the data is deleted or not
            data ? res.json({ success: true, message: "Book deleted successfully." }) : res.json({ success: false, message: "Error during deleting book" });
        }else{
            res.json({ success: false, message: "There is no such book." });
        }
    }
}