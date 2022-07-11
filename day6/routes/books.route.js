import express from 'express';
import validateToken from '../middlewares/validateToken.middleware.js';

const router = express.Router();

// Middleware for books route
// router.use((req, res, next) => {
//     validateToken(req, res, next);
// })

router.get('/', (req, res) => {
    //DB findall
    // res.status(200).send("Book List");
    // res.status(200).send(true);
    res.status(200).send({ name: "Binaya", age: "23" });
});

// Middleware for specific book route
router.post('/add', validateToken, (req, res) => {
    // res.status(200).send("Book Added.");
    console.log("********************");
    // console.log(req);
    console.log(req.body, req.query);
    console.log(req.params);
    console.log("********************");
    res.status(200).json({ added: true });
});

router.delete('/delete/:id', (req, res) => {
    // res.status(200).send("Book Deleted.");
    res.status(200).json({ deleted: true });
    
    // console.log(req.query);
    // Destructuring the req.query
    // const { id, author } = req.query;
    // console.log(id, author);

    console.log(req.params);
    // Destructuring the req.params
     const { id, author } = req.params;
    console.log(id, author);
});

export default router;