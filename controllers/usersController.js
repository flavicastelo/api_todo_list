import { db } from "../database/db.js";
import Crypto from "../utils/crypto.js"

export const getUsers = (req, res) => {
    const queryUser = "SELECT * FROM users";

    db.query(queryUser, (error, data) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        return res.status(200).json(data);
    });
}

export const createUser = (req, res) => {
    const password = req.body.password;
    const name =  req.body.name;
    const email =  req.body.email;
    const crypto = new Crypto();
    const passwordHash = crypto.cryptPass(password);

    const queryUser = "INSERT INTO users(`name`, `email`, `password`) VALUES(?)";

    if (!name || !email || !password) return res.status(422).json({error: "Preencha todos os campos!"});
    const values = [
        name,
        email,
        passwordHash
    ];
    db.query(queryUser, [values], (error) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }
        return res.status(201).json("Usuário criado com sucesso!");
    });
}
