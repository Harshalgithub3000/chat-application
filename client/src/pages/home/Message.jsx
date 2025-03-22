import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { format, isToday, isYesterday} from "date-fns";
import { logoutUserThunk } from '../../store/slice/user/userThunk';

const Message = ({id,message}) => {
  const dispatch = useDispatch()
  const {userProfile,screenLoading,selectedUser} = useSelector((state)=>state.user)

  const messageRef = useRef()
  
  useEffect(()=>{
    if(!userProfile && !screenLoading) {
      dispatch(logoutUserThunk())
   }
  },[userProfile,dispatch])


  const messageDate = new Date(message.createdAt);

  // Format date like WhatsApp (Today, Yesterday, or DD/MM/YYYY)
  let formattedDate = format(messageDate, "dd/MM/yyyy");
  if (isToday(messageDate)) formattedDate = "Today";
  if (isYesterday(messageDate)) formattedDate = "Yesterday";

  // Format time like "12:45 PM"
  const formattedTime = format(messageDate, "hh:mm a");

  useEffect(()=>{
    if(messageRef.current){
      messageRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[])

  return (
    <div  key={id}  ref={messageRef}>
        <div className={`chat ${userProfile?._id === message?.senderId ? "chat-end" : "chat-start"}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={`${userProfile?._id === message?.senderId ? userProfile?.avatar : selectedUser?.avatar}`} />
    </div>
  </div>
  <div className="chat-header">
   
    <time className="text-xs opacity-50">{formattedTime}</time>
  </div>
  <div className="chat-bubble">{message?.message}</div>
  <div className="chat-footer opacity-50">Delivered</div>
</div>

    </div>
  )
}

export default Message