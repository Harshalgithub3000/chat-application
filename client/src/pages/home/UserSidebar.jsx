import React, { useState } from "react";
import { FaPen, FaSearch } from "react-icons/fa";
import User from "./User";
import Logo from "../../assets/logo.jpg"
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logoutUserThunk, updateUserThunk } from "../../store/slice/user/userThunk";
import { persistor } from "../../store/store";
import PopupForm from "./PopupForm";
import { useNavigate } from "react-router-dom";


const UserSidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  const {otherUsers,userProfile} = useSelector((state)=>state.user)
 

  const handleLogout=()=>{
    dispatch(logoutUserThunk())
    persistor.purge(); 
    toast.success("Logged out successfully")
    navigate("/login")

  }

  
  useEffect(() => {
    if (!document.cookie.includes("token")) {
        navigate("/login");
    }
}, []);

  const handleUpdateClick = (e) =>{
    e.preventDefault()
    e.stopPropagation()
    if (!userProfile) {
      return toast.error("User profile not found!");
    }
    setIsOpen(true);
  
}

const handleUpdate = (updatedData) =>{
  dispatch(updateUserThunk({ 
    userId: userProfile?.id, 
    ...updatedData 
  }));
}

const filteredData = (otherUsers ?? []).filter((otherUser) => 
  otherUser.fullName.toLowerCase().includes(query.toLowerCase()) ||  
  otherUser.username.toLowerCase().includes(query.toLowerCase())
);
  return (
    <div className="max-w-[20rem]  w-full h-screen flex flex-col">
      <div className="text-center bg-gray-900 p-2.5  font-semibold text-cyan-500 font-logo">
       <span className="uppercase"  >😉 chit~chat ✌️</span>
       <hr className="text-gray-600" />
       <h2 className="text-cyan-600">username : {userProfile?.username}</h2>
      </div>

      <div className="">
        <label className="input">
          <input type="search" required placeholder="Search..." onChange={(e)=>setQuery(e.target.value)} />
          <FaSearch />
        </label>
      </div>
      <div className=" h-full overflow-y-auto">
        {
          filteredData?.map((otherUserDetails)=>{
           
            return (
            <User key={otherUserDetails._id} otherUserDetails={otherUserDetails} />
          )
        })
        }
        </div>
      <div className=" flex justify-between px-6 items-center ">
        <div className="avatar ">
          <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-3">
            <img src={userProfile?.avatar} />
          </div>
        </div>
        <div onClick={handleUpdateClick} className='hover:bg-gray-600 px-2 py-1 rounded-2xl flex gap-1 items-center bg-blue-800 cursor-pointer'>
     <h2 >update profile</h2>
    <FaPen />
    </div>
 
          <button className="btn btn-primary bg-cyan-800 border-none btn-sm px-4" onClick={handleLogout}>Logout</button>
      </div>
     
          {/* Popup Form */}
          <PopupForm
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        userDetails={userProfile}
        onUpdate={handleUpdate}
      />


    </div>
  );
};

export default UserSidebar;
