import express from "express";
const app = express();
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js"
import ListingRouter from "./routes/listingRoute.js"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path"
dotenv.config();

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.json())
//database connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Error in DB Connection:", error));

const __dirname = path.resolve();

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/listing",ListingRouter)


app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
 

app.listen(process.env.PORT,()=>console.log(`server is Runing on Port ${process.env.PORT}`)
);

//middleware for error handiling
app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  return res.status(statusCode).json({success:false, statusCode,message})

})
