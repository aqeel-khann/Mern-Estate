import { ErrorResponse } from "../helper/apiResponse.js";
import { User } from "../model/user.js";
import { errorHandler } from "../utils/errorHandler.js";
import { passwordGenrate } from "../utils/genratePassword.js";
import { hashingPassword } from "../utils/hashPassword.js";
import bcrypt from "bcrypt"

export const registerService = async (data) => {
    const { username, email, password } = data;
    try {
     
    //password hashing
    const hashPassword = hashingPassword(password);
        
    const newUser = await User.create({
      username,
      email,
      password: hashPassword,
    });
    return newUser;
        
} catch (error) {
        console.log("Error While Registering User");
   throw new Error(`Error while logging in: ${error.message}`);        
  }
};

export const loginService = async(data) => {
   try {
     const { email, password } = data;
     const validUser = await User.findOne({ email });
     if (!validUser) {
    throw new Error("Wrong Credentials");
     }
     const validPassword = bcrypt.compareSync(password, validUser.password);
     if (!validPassword) {
          throw new Error("Wrong Credentials");
     }
     return validUser
   } catch (error) {
    throw new Error(`Error while logging in: ${error.message}`);
   }
}

export const googleAuthService = async (data) => {
  const { name, email, avatar } = data;
  try {
    console.log("avatar is",avatar);
    
    const validUser = await User.findOne({ email });
    if (!validUser) {
      //random password genrate
      const genratedPassword = passwordGenrate()
      //console.log("genrated password is", genratedPassword);
      //password hashing
      const hashPassword = hashingPassword(genratedPassword);
      const newUser = await User.create({
        username:name.split(" ").join("").toLowerCase() +Math.random().toString(36).slice(-4),
        email,
        avatar:avatar,
        password: hashPassword,
      });
      await newUser.save()

      return newUser;
    }
    else
    {
      return validUser
    }

    
  } catch (error) {
    throw new Error(`Error while logging in: ${error.message}`); 
  }
}