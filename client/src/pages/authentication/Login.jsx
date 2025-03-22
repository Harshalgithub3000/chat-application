import React, { useEffect, useState } from "react";
import { FaUser ,FaKey  } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getOtherUserThunk, loginUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";

const Login = () => {
  const {isAuthenticated} = useSelector((state)=>state.user)
  // console.log(state);
  const buttonLoading = useSelector((state)=>state.user.buttonLoading)
  const navigate = useNavigate()


  const dispatch = useDispatch()


  const [loginData,setLoginData] = useState({
    username:"",
    password:""
  })

  const handleChange=(e)=>{
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(loginData);

    
  }
  const handleLogin = async () =>{
   const result = await dispatch(loginUserThunk(loginData))
   if (result?.payload?.data) { // Adjust this based on your backend response
    toast.success("Logged in successfully");
    navigate('/')

  } 



  if (loginUserThunk.fulfilled.match(result)){
  
      setLoginData({
        username: "",
        password: "",
    
      })
      

  }


}

useEffect(()=>{
  if(isAuthenticated){
    navigate("/")
    dispatch(getOtherUserThunk()); 
  }
},[isAuthenticated])

  return (
    <div className="max-w-[30rem] flex items-center  mx-auto min-h-screen " >
      <form className=" w-full bg-base-300 p-10 rounded-2xl  " onSubmit={handleSubmit}>
        <h2 className="mb-5 text-xl text-gray-400 ">Please login ..!</h2>
      <label className="input validator w-full">
      <FaUser className="text-gray-400" />
        <input
          type="input"
          name="username"
          required
          placeholder="Username"
          pattern="[A-Za-z][A-Za-z0-9\-]*"
          minLength="3"
          maxLength="30"
          autoComplete="username" 
          title="Only letters, numbers or dash"
          value={loginData.username}
          onChange={handleChange}
        />
      </label>
      <p className="validator-hint mb-6">
        Must be 3 to 30 characters
       
        containing only letters, numbers or dash
      </p>

<label className="input validator w-full">
<FaKey className="text-gray-400" />
  <input  onChange={handleChange} name="password" value={loginData.password} autoComplete="password" 
 type="password" required placeholder="Password" minLength="8" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
</label>
<p className="validator-hint ">
  Must be more than 8 characters, including
  ,At least one number
  ,At least one lowercase letter
   At least one uppercase letter
</p>
<button className="btn btn-primary my-2 w-full text-lg bg-cyan-800 border-none outline-none" onClick={handleLogin} disabled={buttonLoading} > {buttonLoading ? <> <span className="loading loading-spinner loading-xs"></span> Please wait...</>: "Login"}</button>
<p>Don't have an account &nbsp; <Link to="/signup" className="text-blue-600">Signup</Link></p>
</form>
    </div>
  );
};

export default Login;
