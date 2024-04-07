import { db } from "../database/db.js";
import Crypto from "../utils/crypto.js"

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
    const password = req.body.password;
    const crypto = new Crypto();
    const passwordHash =  crypto.cryptPass(password);

    const queryUser = "INSERT INTO users(`name`, `email`, `password`) VALUES(?)";

    const values = [
        req.body.name,
        req.body.email,
        passwordHash
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

