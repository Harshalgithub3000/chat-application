import dotenv from 'dotenv'
dotenv.config()

import {Server} from "socket.io"
import http from "http"
import express from "express"

const app = express()
const server = http.createServer(app)

console.log("process.env.CLIENT_URL",process.env.CLIENT_URL);

const io = new Server (server,{
    cors :{
        origin:process.env.CLIENT_URL || "http://localhost:5173",
    }
})

const userSocketMap = {
    //userId : socket.id
}

io.on("connection",(socket)=> {
    // console.log(socket.id);
    const userId = socket.handshake.query.userId
    if(!userId)return
    userSocketMap[userId] = socket.id
    
    // console.log(Object.keys(userSocketMap));
    io.emit("onlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId];
        io.emit("onlineUsers",Object.keys(userSocketMap))
    })

    
})

function getSocketId (userId) {
  return userSocketMap[userId]
}


export {
    io,
    app,
    server,
    getSocketId
}