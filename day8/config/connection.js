import mysql from "mysql2/promise";

// create the connection to database
export default await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodejs_example'
});