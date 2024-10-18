import { User } from "../model/user.js"
import { hashingPassword } from "../utils/hashPassword.js";



export const updateUserService = async (id, data) => {
    const { username, email, password, avatar } = data;
    
    try {
        const updateUser = await User.findByIdAndUpdate(id, {
            username,
            email,
            avatar
        }, {
            new: true,
        });
        if (password) {
            const hashPassword = hashingPassword(password);
            updateUser.password = hashPassword;
            return updateUser;
        }
        else {
            return updateUser;
        }

    } catch (error) {
    throw new Error(`Error while logging in: ${error.message}`);   
    }
    
}


export const deleteUserService = async(id) => {
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        return deleteUser;
    } catch (error) {
    throw new Error(`Error while logging in: ${error.message}`);     
    }
}