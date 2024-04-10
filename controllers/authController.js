import { db } from "../database/db.js";
import Crypto from "../utils/crypto.js"

export const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const crypto = new Crypto();

    const queryEmail = "SELECT * FROM users WHERE email = ?";
    db.query(queryEmail, [email], (error, result) => {
        if (error) {
            return res.status(500).json({
                error: error.message
            });
        }

        const user = result.find(user => user && user.email === email);
        const passVerify = crypto.checkPassWord(password, user.password);
        
        if (!user || !passVerify) {
            return res.status(401).json({
                error: "Usuário ou Senha inválido!"
            });
        }

        
        const token = crypto.createToken(user, 1800);
        res.status(200).json({ user, message: "Login feito com suceso!", token });
    });
}

