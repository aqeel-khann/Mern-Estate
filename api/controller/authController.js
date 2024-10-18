import {ErrorResponse, successResponseWithData } from "../helper/apiResponse.js";
import { User } from "../model/user.js";
import { googleAuthService, loginService, registerService } from "../services/AuthService.js";
import { generateToken } from "../utils/genrateToken.js";



export const Register = async (req, res, next) => {
        const {email}=req.body
  try {  
    const isUser = await User.findOne({ email });
    if (isUser) {
          ErrorResponse(res, "Email Already Exist ");
        } 
    const newUser =  await registerService(req.body)    
    successResponseWithData(res,"New User Register", newUser,201)
  } catch (error) {
    console.error("Error in Register function:", error); // Detailed error log
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const validUser = await loginService(req.body)
    //token genration
    const token = generateToken({ id: validUser._id });
    const { password, ...rest } = validUser.toObject();

    res.cookie("access_token", token, {
      httpOnly: true,
      //sameSite: "None",
    });
    successResponseWithData(res,"User Login Successfully",rest)
  } catch (error) {
    console.log("Error in Login ",error);
    next(error)
  }
}

//Google auth

export const googleAuth = async (req, res,next) => {
  try {
    const googleData = await googleAuthService(req.body)
    const token = generateToken({ id: googleData._id });
    const { password, ...rest } = googleData.toObject();

    res.cookie("access_token", token, {
      httpOnly: true,
    });
    successResponseWithData(res, "User Login Successfully", rest);
  } catch (error) {
    next(error)
  }
}

//logOut

export const logOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    successResponseWithData(res,"User Logout successfully",200)
  } catch (error) {
    next(error)
  }
}