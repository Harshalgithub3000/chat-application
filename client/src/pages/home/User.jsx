import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser } from '../../store/slice/user/userSlice'

const User = ({otherUserDetails}) => { 
  const dispatch = useDispatch()
  const {selectedUser} = useSelector((state)=>state.user)
  const {onlineUsers} = useSelector((state)=>state.socket)
 
 const isUserOnline = onlineUsers?.includes(otherUserDetails?._id)

  const handleUser = ()=>{
    dispatch(setSelectedUser(otherUserDetails))
  }
  


  return (
    <>
    <div onClick={handleUser} className={`flex gap-5 items-center p-3 hover:bg-gray-800 ${otherUserDetails === selectedUser && "bg-gray-800"}`}>
    <div className={`avatar ${isUserOnline ? "avatar-online":"avatar-offline"}`}>
    <div className="w-15 rounded-full">
      <img src={otherUserDetails?.avatar ? otherUserDetails?.avatar : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} />
    </div>
  </div>
  <div className='flex justify-between w-full items-center pr-4 '>

   <div>
   <h2 className='line-clamp-1'>{otherUserDetails?.fullName}</h2>
   <p className='text-xs'>{otherUserDetails?.username}</p>
   </div>

   </div>
    </div>

   </>
  )
}

export default User