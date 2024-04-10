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
        
        
        if (result.length === 0) {
            return res.status(401).json({
                error: "Unauthorized!"
            });
        }
        if ( !email || !password) return res.status(422).json({error: 'missing_fields'});
        const user = result.find(user => user && user.email === email);
        const checkPass = crypto.checkPassWord(password, user.password);
        console.log(checkPass);
        if (!checkPass) {
            return res.status(401).json({
                error: "Unauthorized!"
            });
        }
       
        const token = crypto.createToken(user, 1800);
        res.status(200).json({ user, message: "Login feito com sucesso!", token });
    });
}

