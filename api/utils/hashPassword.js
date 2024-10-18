import bcrypt from "bcrypt"
export const hashingPassword = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}
