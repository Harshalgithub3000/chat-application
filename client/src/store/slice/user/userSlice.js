import { createSlice } from '@reduxjs/toolkit'
import { getOtherUserThunk, getProfileUserThunk, loginUserThunk, logoutUserThunk, registerUserThunk, updateUserThunk } from './userThunk'


export const userSlice = createSlice({
  name: 'user',
  initialState :{
    isAuthenticated : false,
    otherUsers:null,
    screenLoading:true,
    userProfile:null,
    buttonLoading:false,
    selectedUser:null
   
  },
  reducers: {
   //actions here
   setSelectedUser(state,action){
     state.selectedUser = action.payload
   }
  },
  //login
    extraReducers: (builder) => {
      builder.addCase(loginUserThunk.pending, (state, action) => {
      })
      builder.addCase(loginUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = true; 
        state.userProfile = action.payload?.data.user
      })
      builder.addCase(loginUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        console.log("rejected", action.error.message);
       
      })
  
      
     
    //for register user
      builder.addCase(registerUserThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      builder.addCase(registerUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = true; 
        state.userProfile = action.payload?.data.user
      })
      builder.addCase(registerUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        console.log("rejected", action.error.message);
       
      })

    //for logout
      builder.addCase(logoutUserThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      builder.addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.userProfile = null
        state.selectedUser = null
        state.otherUsers = null
        state.isAuthenticated = false; 
      })
      builder.addCase(logoutUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        console.log("rejected", action.error.message);
       
      })

      //for get profile 
      builder.addCase(getProfileUserThunk.pending, (state, action) => {
        state.screenLoading = true;
      })
      builder.addCase(getProfileUserThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.isAuthenticated = true;
 
      })
      builder.addCase(getProfileUserThunk.rejected, (state, action) => {
        state.screenLoading = false;
        console.log("rejected", action.error.message);
       
      })
   
      //to get other users
      builder.addCase(getOtherUserThunk.pending, (state, action) => {
        state.screenLoading = true;
      })
      builder.addCase(getOtherUserThunk.fulfilled, (state, action) => {
        state.screenLoading = false;
        state.isAuthenticated = true; 
        state.otherUsers = action.payload?.data
      })
      builder.addCase(getOtherUserThunk.rejected, (state, action) => {
        state.screenLoading = false;
        console.log("rejected", action.error.message);
       
      })

      //update user
      builder.addCase(updateUserThunk.pending, (state, action) => {
        state.buttonLoading = true;
      })
      builder.addCase(updateUserThunk.fulfilled, (state, action) => {
        state.buttonLoading = false;
        state.isAuthenticated = true; 
        state.userProfile = action.payload
      })
      builder.addCase(updateUserThunk.rejected, (state, action) => {
        state.buttonLoading = false;
        console.log("rejected", action.error.message);
       
      })




    }


    
   
  
})

export const { setSelectedUser } = userSlice.actions

export default userSlice.reducer