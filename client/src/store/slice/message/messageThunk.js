import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { axiosInstance } from "../../../components/utilities/axiosInstance";

export const sendMessageThunk = createAsyncThunk(
  "message/send",
  async ({receiverId ,message},{rejectWithValue}) => {
    try {
      const response = await axiosInstance.post(`/message/send/${receiverId}`,{
       message
      })
      return response.data
    } catch (error) {
      console.log(error?.response?.data?.message)
      toast.error(error?.response?.data?.message)
      return  rejectWithValue(error.response?.data?.message || "Something went wrong");

    }
  }
);


export const getMessageThunk = createAsyncThunk(
    "message/get",
    async ({otherParticipentId},{rejectWithValue}) => {
      try {
        const response = await axiosInstance.get(`/message/get-messages/${otherParticipentId}`)
        return response.data
      } catch (error) {
        console.log(error?.response?.data?.message)
        toast.error(error?.response?.data?.message)
        return rejectWithValue(error.response?.data?.message || "Something went wrong");
      }
    }
  );
  
  