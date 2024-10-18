import { successResponseWithData } from "../helper/apiResponse.js";
import { User } from "../model/user.js";
import { deleteUserService, updateUserService } from "../services/userService.js";
import { errorHandler } from "../utils/errorHandler.js"




export const updateUser = async(req, res, next) => {
    const { id } = req.params;
    if (req.user.id !== id) return next(errorHandler(403, "you must have to be Authorized"));
    try {
        const updated = await updateUserService(id, req.body);
        const { password, ...rest } = updated.toObject();
        successResponseWithData(res,"User update successfully",rest,204)
    } catch (error) {
        next(error)
    }
    
}


export const deleteUser = async (req, res, next) => {
    const { id } = req.params;
    if (req.user.id!==id) return next(errorHandler('401',"You must have to be Authorize"))
    try {
        const user = deleteUserService(id)
        successResponseWithData(res,"User Successfully Deleted",200)

    } catch (error) {
        next(error)
    }
}

export const getUser = async(req, res, next) => {
    const { id } = req.params;
    try {
        const isUser = await User.findById(id);
        if (!isUser) return next(errorHandler(401, "User not Found"))
        const { password, ...rest } = isUser.toObject();
        successResponseWithData(res,"User Successfully fetch",rest,200)
    } catch (error) {
        next(error)
    }
}