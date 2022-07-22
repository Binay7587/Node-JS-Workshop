import blogModel from "../models/blogs.model.js";
import textConstant from "../constants/text.constant.js";

export default class BlogController {

    /**
     * Display a listing of the blogs.
     */
     async index(req, res) {
        let { limit } = req.query;
        if(!limit) limit = 100;

        try{
            const data = await blogModel.find({
                limit: parseInt(limit),
                raw: true
            });
            if(data){    
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.NO_BLOGS });
            }
        }catch(err){
            res.json({ success: false, message: err });
        }
    }

    /**
     * Store a blog in the database.
     * @param {*} req 
     * @param {*} res 
     */
    async store(req, res) {
        try{
            // console.log("debugger", req.body);
            const data = await blogModel.create({
                title: req.body.title,
                description: req.body.description
            });
            if(data){
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.ERROR_DURING_CREATING_BLOG });
            }
        }catch(err){
            return res.json({ success: false, message: textConstant.ERROR_WHILE_QUERING_DATABASE });
        }
    }

    /**
     * Display the specified blog.
     * @param {*} req 
     * @param {*} res 
     */
     async show(req, res) {
        const { id } = req.params;

        try{
            const data = await blogModel.findById(id);
            if(data){
                res.json(data)
            }else{
                res.json({ success: false, message: textConstant.NO_BLOGS });
            }
        }catch(err){
            res.json({ success: false, message: err.message });
        }
    }

    /**
     * Update the specified blog.
     * @param {*} req 
     * @param {*} res 
     */
     async update(req, res) {
        const { id } = req.params;
        try{
            const blog = await blogModel.findOne({
                _id: id,
              });
        
            blog.title = req.body.title;
            blog.description = req.body.description;
            await blog.save();
            res.json(blog);
        }catch(err){
            res.json({ success: false, message: err.message });
        }
    }
    
    /**
     * Delete the specified blog.
     * @param {*} req 
     * @param {*} res 
     */
    async destroy(req, res) {
        const { id } = req.params;
        try{
            const blog = await blogModel.deleteOne({
                _id: id,
              });
            
              res.json(blog);
        }catch(err){
            res.json({ success: false, message: err.message });
        }
    }
}