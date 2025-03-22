import React, { useEffect, useState } from "react";
import { FaKey, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserThunk } from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const buttonLoading = useSelector((state)=>state.user.buttonLoading)
 const {isAuthenticated} = useSelector((state)=>state.user)
  

    const [signupData,setSignUpData] = useState({
      fullName:"",
      username:"",
      password:"",
      confirmPassword:"",
      gender:"male",
      avatar:null
    })
   
    const handleChange=(e)=>{
      setSignUpData({...signupData,[e.target.name]:e.target.value})
    }

    const handleFileChange=(e)=>{
      setSignUpData({...signupData,avatar:e.target.files[0]})

    }
  
    const handleSubmit = (e) =>{
      e.preventDefault()
    }

    const handleRegister = async () =>{

      if(signupData.password !== signupData.confirmPassword){
        return toast.error("Password and confirm password do not match");
      }

      const result = await dispatch(registerUserThunk(signupData))
      if (result?.payload?.data) { 
        toast.success("Account created  successfully")
        navigate('/')
      
      } 

      if (registerUserThunk.fulfilled.match(result)) {
        setSignUpData({
          fullName: "",
          username: "",
          password: "",
          gender:"male",
          avatar: null,
        });
      }
    
    }

    useEffect(()=>{
      if(isAuthenticated){
        navigate("/")
      }
    },[isAuthenticated])
    
  
  
  return (
    <div className="max-w-[30rem] flex  items-center  mx-auto min-h-screen ">
      <form  onSubmit={handleSubmit} className=" w-full bg-base-300 px-5 py-2 rounded-2xl    ">
        <h2 className="my-5 text-xl text-gray-400 ">Please Singup ..!</h2>
        <label className="input validator w-full ">
          <FaUser className="text-gray-400" />
          <input
            type="input"
            required
            placeholder="Fullname"
            autoComplete="fullName"
            pattern="[A-Za-z]{3,25}"
            minLength="3"
            maxLength="30"
            title="Must be 3-30 characters, only letters and spaces allowed"
            name="fullName"
            value={signupData.fullName}
            onChange={handleChange}
          />
        </label>
        <p className="validator-hint text-xs text-gray-500 h-10 ">
          Must be 3 to 30 characters
          containing only letters, numbers or dash
        </p>

        <label className="input validator w-full">
          <FaUser className="text-gray-400" />
          <input
            type="input"
            required
            placeholder="Username"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            autoComplete="username"

            name="username"
            value={signupData.username}
            onChange={handleChange}

          />
        </label>
        <p className="validator-hint ">
          Must be 3 to 30 characters
         
          containing only letters, numbers or dash
        </p>

        <label className="input validator w-full mt-6  ">
          <FaKey className="text-gray-400" />
          <input
            type="password"
            required
            placeholder="Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            autoComplete="password"

            name="password"
            value={signupData.password}
            onChange={handleChange}

          />
        </label>
        <p className="validator-hint  text-xs text-gray-500 h-10  opacity-100">
          Must be more than 8 characters, including
         
          ,At least one number
          
          ,At least one lowercase letter
          
          At least one uppercase letter
        </p>

        <label className="input validator w-full mt-2 ">
          <FaKey className="text-gray-400" />
          <input
            type="password"
            required
            placeholder="Confirm Password"
            minLength="8"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            autoComplete="confirmPassword"

            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleChange}

          />
        </label>
        <p className="validator-hint  ">
          Must be more than 8 characters, including
         
          ,At least one number
         
          ,At least one lowercase letter
         
          At least one uppercase letter
        </p>
        <label className="input validator w-full mt-2 mb-10 flex items-center gap-4">
  <input 
    type="radio" 
    name="gender" 
    value="male" 
    className="radio" 
    checked={signupData.gender === "male"}
    onChange={handleChange}
  /> Male

  <input 
    type="radio" 
    name="gender" 
    value="female" 
    className="radio" 
    checked={signupData.gender === "female"}
    onChange={handleChange}
  /> Female
</label>
        <input 
        type="file"
        className="file-input file-input-sm w-full"
        name="avatar" 
        onChange={handleFileChange} 
        />

        <button className="btn btn-primary my-5 w-full text-lg bg-cyan-800 border-none outline-none" onClick={handleRegister} type="button">
        {buttonLoading ? <> <span className="loading loading-spinner loading-xs">Please wait</span> Please wait...</>: "Signup"}
        </button>
        <p>
          Already signup go to &nbsp;{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
