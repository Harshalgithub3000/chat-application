import React, { useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessageThunk } from '../../store/slice/message/messageThunk'


const SendMessage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector((state)=>state.user)

    const [message,setMessage] = useState("")

    
    const handleSendMessage =(e)=>{
      if (message.trim()){
       dispatch(sendMessageThunk({receiverId:selectedUser?._id,message}));
       const sendSound = new Audio("./send.mp3");
        sendSound.play();
       setMessage("")
      }
    }
    const handleSendWithKey = (e) =>{
      if (e.key === "Enter") {
        e.preventDefault(); // Prevents adding a new line
        if(message.trim()){
        dispatch(sendMessageThunk({receiverId:selectedUser?._id,message}));
        const sendSound = new Audio("./send.mp3");
        sendSound.play();
        setMessage("")
        }
      }
    }

  return (
   <>
           <div className="p-3 flex justify-between ">
          <input
            type="text"
            placeholder="Type here..."
            className="input input-primary w-full"
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            onKeyDown={handleSendWithKey}
          />
          <button onClick={handleSendMessage}  className="btn btn-square btn-outline btn-primary">
          <IoSend />
          </button>
        </div>

   </>
  )
}

export default SendMessage