import {app,server} from "./socket/socket.js"
import express from "express";
import { connectDb } from './db/connection1.db.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import fs from 'fs';
import path from 'path';


app.use(express.json());
app.use(cookieParser());

const tempDir = path.join(process.cwd(), 'public/temp');


// Check if the directory exists
if (!fs.existsSync(tempDir)) {
  // Create the directory (including parent folders if needed)
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Temp directory created:", tempDir);
}

const allowedOrigins = [
  "https://chat-application-eta-six.vercel.app",
  "https://chat-application-30qktasjc-harshals-projects-eff9b42d.vercel.app",
  "https://chat-application-gyejbkvna-harshals-projects-eff9b42d.vercel.app"
];

 app.use(cors());
 
//  {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//        console.log("Blocked by CORS:", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
// }


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