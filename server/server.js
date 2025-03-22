import {app,server} from "./socket/socket.js"
import express from "express";
import { connectDb } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"

app.use(express.json());
app.use(cookieParser());

console.log(process.env.CLIENT_URL);

app.use(cors({
   origin: process.env.CLIENT_URL, // Allow frontend to access backend
   credentials: true, // Allow cookies if used
 }));
const PORT = process.env.PORT || 4000


app.get('/', (req, res) => {
   res.send('Hello World!')
 })

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