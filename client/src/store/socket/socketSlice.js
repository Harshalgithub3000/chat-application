import { createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client"

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    onlineUsers:null
  },
  reducers: {
    //actions here
    initializeSocket(state,action){
       const socket = io(import.meta.env.VITE_DB_ORIGIN,{
        transports: ["websocket"],
        query : {
            userId : action.payload
        }
       })

       state.socket = socket

      

    },
    setOnlineUsers(state,action){
        state.onlineUsers = action.payload
    }
  },
});

export const { initializeSocket , setOnlineUsers} = socketSlice.actions;

export default socketSlice.reducer;
