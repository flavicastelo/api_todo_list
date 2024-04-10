import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class Crypto {

    async cryptPass(password) {
        try {
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);
            return passwordHash;
        } catch (error) {
            console.error("Error during password hashing:", error);
        }
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

    async checkPassWord(password, hashedPassword) {
        try {
          const isMatch = await bcrypt.compare(password, hashedPassword);
          return isMatch;
        } catch (error) {
          console.error("Erro durante a comparação de senhas:", error);
          return false; // Retorna false em caso de erro
        }
      }

  
}
export default Crypto;