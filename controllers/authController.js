import { db } from "../database/db.js";
import Crypto from "../utils/crypto.js"
import jwt from "jsonwebtoken";

export const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const crypto = new Crypto();

    const queryEmail = "SELECT * FROM users WHERE email = ?";
    db.query(queryEmail, [email], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        const user = result.find(user => user && user.email === email);

        if (!user) {
            return res.status(404).json({
                error: "Usuário não encontrado"
            });
        }

        crypto.checkPassWord(password, user.password);
        const token = crypto.createToken(user, 900);
        res.status(200).json({ user, message: "Login feito com suceso!", token });
    });
}

export const logout = (req, res) => {

}