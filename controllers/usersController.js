import { db } from "../database/db.js";

export const getUsers = (req, res) => {
    const queryUser = "SELECT * FROM users";

    db.query(queryUser, (err, data) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        return res.status(200).json(data);
    });
}

export const createUser = (req, res) => {
    const queryUser = "INSERT INTO tasks(`name`, `email`, `password`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ];
    db.query(queryUser, [values], (err) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }
        return res.status(201).json("Usuário criado com sucesso!");
    });
}

