import { User } from "../models/user.model.js";
import { apiResponse } from "../utilities/apiResponse.utility.js";
import { asyncHandler } from "../utilities/asyncHandler.utitlity.js";
import { uploadOnCloudinary } from "../utilities/cloudinary.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utilities/token.utility.js";

export const register = asyncHandler(async (req, res) => {
  const { fullName, username, password, gender } = req.body;
  console.log(fullName, username, password, gender);
  if (!fullName || !username || !password || !gender) {
    throw new errorHandler(400, "All fields are Required");
  }
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new errorHandler(400, "user already exist");
  }

  //password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new errorHandler(400, " Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new errorHandler(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    username,
    password: hashedPassword,
    gender,
    avatar: avatar.url || "",
  });

  const token = generateTokenAndSetCookie(res, user);

  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    throw new errorHandler(
      500,
      "Something went wrong while registering the user"
    );
  }
  return res
    .status(201)
    .json(
      new apiResponse(
        200,
        { user: createdUser, token },
        "User Registered Successfully"
      )
    );
});

export const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new errorHandler(400, "Please enter a valid username or password");
  }

  const user = await User.findOne({ username });

  if (!user) {
    throw new errorHandler(404, "user does not exist");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new errorHandler(404, "Please enter a valid username or password");
  }
  const loggedInUser = await User.findById(user._id).select("-password ");

  const token = generateTokenAndSetCookie(res, user);

  res
    .status(200)

    .json(
      new apiResponse(
        200,
        {
          user: loggedInUser,
          token,
        },
        "User logged in successfully"
      )
    );
});

export const logout= asyncHandler(async(req,res)=>{
  res.status(200)
  .cookie("token","", { expires: new Date(0), httpOnly: true })
  .json(
    new apiResponse(200,"User logged out successfully")
  )
})

export const getProfile = asyncHandler(async(req,res)=>{
    
  const user = req.user

  res.status(200).json(
    new apiResponse(200,user,"getting user id ")
  )
})

export const getOtherUsers = asyncHandler(async (req,res)=>{
   const otherUsers = await User.find({_id:{ $ne:req.user}})
    
   res.status(200).json(
    new apiResponse(200,otherUsers,"")
   )
})



export const updateProfile = async (req, res) => {
  try {
    const { fullName, username } = req.body;

    const avatar = req.file?.path; 

    // Find user by ID
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if username already exists for another user
    const existingUser = await User.findOne({ username });
    if (existingUser && existingUser.id.toString() !== userId.toString()) {
      return res.status(400).json({ message: "Username is already taken" });
    }
  


    // Prevent users from updating others' profiles
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }
    let  newAvatar;
    if(avatar){
       newAvatar = await uploadOnCloudinary(avatar)
       newAvatar = newAvatar.url
    }



    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      { fullName, username, ...(newAvatar && { avatar:newAvatar }) },
      { new: true }
    ).select("-password")

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
