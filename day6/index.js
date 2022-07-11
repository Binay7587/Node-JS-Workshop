import express from 'express';
import booksRouter from './routes/books.route.js';
import rateLimit from 'express-rate-limit'
import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static("public"));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter);
app.use(helmet())
// Middleware in application level
// app.use((req, res, next) => {
//     console.log("Hello");
//     next();
// })

app.get('/', (req, res) => {
    res.status(200).send("Backend is working");
});

app.use("/books", booksRouter);

app.listen(8000, () => {
    console.log("server is running on port 8000");
});