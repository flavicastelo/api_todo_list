class Regex {
    regexPass(password){
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&?]).{8,}$/;
        const isValid = passwordRegex.test(password);
        return isValid;
    }
    regexEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValidEmail = emailRegex.test(email);
        return isValidEmail;
    }
}
export default Regex;