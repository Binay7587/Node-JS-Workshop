import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    //DB findall
    // res.status(200).send("Book List");
    // res.status(200).send(true);
    res.status(200).send({ name: "Binaya", age: "23" });
});

router.get('/add', (req, res) => {
    // res.status(200).send("Book Added.");
    res.status(200).json({ added: true });
});

router.get('/delete/:id/:author', (req, res) => {
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