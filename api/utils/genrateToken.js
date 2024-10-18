import jwt from "jsonwebtoken"
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

export const generateToken = ({ id }) => {
    const token = jwt.sign({id}, process.env.JWT_SECRET)
    return token;
}