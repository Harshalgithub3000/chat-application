import { createSlice } from '@reduxjs/toolkit'
import { getMessageThunk, sendMessageThunk } from './messageThunk'


export const messageSlice = createSlice({
  name: 'message',
  initialState :{
    buttonLoading:false,
    messages:null
   
  },
  reducers: {
   //actions here
   setMessages: (state, action) => {
    state.messages = action.payload; // Allow resetting messages
  },
  setNewMessage: (state, action) => {
    const oldMessages = state.messages ?? [];
    state.messages = [...oldMessages, action.payload];
  },
   
  },
  extraReducers: (builder) => {
        //send message
      builder.addCase(sendMessageThunk.pending, (state, action) => {
        state.buttonLoading = true;

      })
      builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        const oldMessages = state.messages ?? []
        state.messages = [...oldMessages,action.payload?.data]
      })
      builder.addCase(sendMessageThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        console.log("rejected", action.error.message);
       
      })

  //to get message 
  builder.addCase(getMessageThunk.pending, (state, action) => {
})
builder.addCase(getMessageThunk.fulfilled, (state, action) => {
  state.buttonLoading = false;
  state.messages = action.payload.data?.messages
})
builder.addCase(getMessageThunk.rejected, (state, action) => {
  state.buttonLoading = false;
  console.log("rejected", action.error.message);
 
})

     
    }    
   
  
})

export const {setMessages  ,setNewMessage} = messageSlice.actions

export default messageSlice.reducer