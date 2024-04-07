import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.DBPASS;
export const db = mysql.createConnection({
    host: "localhost",
    port: 3306, 
    user: "root",
    password: password,
    database: "todolist"
});
