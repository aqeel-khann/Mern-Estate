import { errorHandler } from "./errorHandler.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken"


export const verifyToken = (req, res, next) => {
    
    const token = req.cookies.access_token;
   // console.log("token is",token);
    
    if (!token) return next(errorHandler(401, "Unauthorize"));
        
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(errorHandler(401, "Forbidden"));
                
        req.user = user;
        console.log("we are in verify token",user);
        
        next();
    });
}