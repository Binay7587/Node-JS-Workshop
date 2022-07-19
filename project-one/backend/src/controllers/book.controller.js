import { Op } from "sequelize";
import bookModel from "../models/book.model.js";
import textConstant from "../constants/text.constant.js";
import urlConstant from "../constants/url.constant.js";

export default class BookController {

    /**
     * Display a listing of the books.
     */
    async index(req, res) {
        let { limit } = req.query;
        if(!limit) limit = 20;

        try{
            const data = await bookModel.findAll({
                limit: parseInt(limit),
                raw: true
            });
            if(data){
                for(let d of data){
                    d.image = d.image ? urlConstant.BOOK_IMG_PATH_URL + d.image : urlConstant.ASSETS_PATH_URL + "/img/no_image.png";
                }
    
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.NO_BOOKS });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }

    /**
     * Store a book in the database.
     * @param {*} req 
     * @param {*} res 
     * @param {*} imagename 
     */
    async store(req, res, imagename) {
        try{
            const data = await bookModel.create({ ...req.body, image: imagename });
            // console.log(data);
            if(data){
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.ERROR_DURING_CREATING_BOOK });
            }
        }catch(err){
            return res.json({ success: false, message: textConstant.ERROR_WHILE_QUERING_DATABASE });
        }
    }

    /**
     * Search a book.
     * @param {*} req 
     * @param {*} res 
     */
    async search(req, res) {
        const { q } = req.query;
        try{
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
                    raw: true,
                });
                if(data[0]){
                    for(let d of data){
                        d.image = d.image ? urlConstant.BOOK_IMG_PATH_URL + d.image : urlConstant.ASSETS_PATH_URL + "/img/no_image.png";
                    }
                    res.json(data)
                }else{
                    res.json({ success: false, message: textConstant.NO_BOOKS });
                }
            }else{
                res.json({ success:false, message: textConstant.PLEASE_ENTER_SEARCH_QUERY });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }

    /**
     * Display the specified book.
     * @param {*} req 
     * @param {*} res 
     */
     async show(req, res) {
        const { id } = req.params;

        try{
            const data = await bookModel.findByPk(id);
            if(data){
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.NO_BOOKS });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }

    /**
     * Update the specified book.
     * @param {*} req 
     * @param {*} res 
     */
     async update(req, res) {
        const { id } = req.params;
        try{
            const book = await bookModel.findByPk(id);
        
            if(book){
                const data = await book.update(req.body);
                // using ternary operators to check if the data is updated or not
                data ? res.json(data): res.json({ success: false, message: textConstant.ERROR_DURING_UPDATING_BOOK });
            }else{
                res.json({ success: false, message: textConstant.NO_BOOKS });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }
    
    /**
     * Delete the specified book.
     * @param {*} req 
     * @param {*} res 
     */
    async destroy(req, res) {
        const { id } = req.params;
        try{
            const book = await bookModel.findByPk(id);
        
            if(book){
                const data = await book.destroy();
                // using ternary operators to check if the data is deleted or not
                data ? res.json({ success: true, message: textConstant.BOOK_DELETED_SUCCESSFULLY }) : res.json({ success: false, message: textConstant.ERROR_DURING_DELETING_BOOK });
            }else{
                res.json({ success: false, message: textConstant.NO_BOOKS });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }
}