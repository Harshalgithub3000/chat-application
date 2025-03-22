import React, { useEffect } from "react";
import User from "./User";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { getMessageThunk } from "../../store/slice/message/messageThunk";
import SendMessage from "./SendMessage";
import Loader from "./Loader"
import { setMessages } from "../../store/slice/message/messageSlice";

const MessageContainer = () => {
  const dispatch = useDispatch()
 const {selectedUser} = useSelector((state)=>state.user)
 
   const {messages} = useSelector((state)=>state.message)

   
 
 
 useEffect(()=>{
  if (!selectedUser?._id) {
    dispatch(setMessages([])); // Reset messages when no user is selected
    return;
  }

  dispatch(setMessages([])); // Clear messages when switching users
   dispatch(getMessageThunk({otherParticipentId:selectedUser?._id}))
   const sendSound = new Audio("./send.mp3");
   sendSound.play();
  },[selectedUser])
  


  return (
    <>
    {
      !selectedUser ?
       <div className="flex justify-center items-center w-full px-5 ">
        <Loader alert={"Please select a user"} />
      </div> :(
        <div className="h-screen w-full flex flex-col ">
        <div className="border-b border-b-white/20 ">
          <User otherUserDetails={selectedUser} />
         

        </div>
        <div className="h-full overflow-y-auto p-6">
          { 
           Array.isArray(messages) && 
           messages.map((message)=>(
              <Message key={message?._id} id={message?._id}  message={message}/>
            ))

          }
          
          
         
        </div>
        <SendMessage/>
      </div>
  
      )
    }
    </>
  );
};

export default MessageContainer;
