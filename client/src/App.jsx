import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import { useDispatch, useSelector } from 'react-redux'
import { getOtherUserThunk, getProfileUserThunk } from './store/slice/user/userThunk'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(()=>{
     dispatch(getProfileUserThunk())
  },[dispatch])
  return (
    <div>
     <Toaster position="top-center" reverseOrder={true} />
     <Outlet/>
    </div>
  )
}

export default App