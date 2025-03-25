import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({username,password},{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("/user/login",{
        username,
        password
      })
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error)
    }
  }
);

//register
export const registerUserThunk = createAsyncThunk(
  "user/register",
  async ({ fullName, username, password, gender, avatar }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("gender", gender);
      formData.append("avatar", avatar); // Ensure this is a File object

      const response = await axiosInstance.post("/user/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
      return rejectWithValue(error);
    }
  }
);

// for logout
export const logoutUserThunk = createAsyncThunk(
  "user/logout",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post("/user/logout", {}, { withCredentials: true })
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error)
    }
  }
);

//to get-profile
export const getProfileUserThunk = createAsyncThunk(
  "user/getProfile",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/user/get-profile")
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      // toast.error(error?.response?.data?.message)
      return rejectWithValue(error)
    }
  }
);

//get otherUsers
export const getOtherUserThunk = createAsyncThunk(
  "user/get-otherusers",
  async (_,{rejectWithValue}) => {
    try {
      const response = await axiosInstance.get("/user/get-otherusers")
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      // toast.error(error?.response?.data?.message)
      return rejectWithValue(error)
    }
  }
);

export const updateUserThunk = createAsyncThunk(
  "user/update",
  async ({ userId, fullName, username, avatar },{rejectWithValue}) => {

    const formdata = new FormData()
    formdata.append("userID",userId)
    if(fullName)formdata.append("fullName",fullName)
    if(username) formdata.append("username",username)
    if(avatar) formdata.append("avatar",avatar)

    try {
      const response = await axiosInstance.put(`/user/update/${userId}`,formdata,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      console.log("response",response);
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return rejectWithValue(error)
    }
  }
);
