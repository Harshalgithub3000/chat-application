import {app,server} from "./socket/socket.js"
import express from "express";
import { connectDb } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

app.use(express.json());
app.use(cookieParser());


const allowedOrigins = [
    "http://localhost:5173",
   "https://chat-application-inky-alpha.vercel.app", // Main production domain
   "https://chat-application-n9lvb6u7y-harshals-projects-eff9b42d.vercel.app" // Preview deployment
 ];
 
 app.use(cors({
   origin: function (origin, callback) {
     if (!origin || allowedOrigins.includes(origin)) {
       callback(null, true);
     } else {
        console.log("Blocked by CORS:", origin);
       callback(new Error("Not allowed by CORS"));
     }
   },
   credentials: true,
 }));
 


const PORT = process.env.PORT || 4000



//api
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js"
app.use('/api/v1/user',userRoute)
app.use('/api/v1/message',messageRoute)

// custome middleware
import errorMiddleware from "./middlewares/error.middleware.js";

app.use(errorMiddleware); // Global error handler


server.listen(PORT,()=>{
   connectDb()
   console.log(`server is running on port ${PORT}`);
})