import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Crypto {

    async cryptPass(password){
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        return passwordHash;
    }
    createToken(user, timer) {
        const secret = process.env.SECRET;
        const token = jwt.sign({
            id: user.user_id.toString(),
        },
            secret,
            { expiresIn: timer },
        );
        return token;

    }

    checkPassWord(password, userPassword) {
        return bcrypt.compareSync(password, userPassword);
    }

  
}
export default Crypto;