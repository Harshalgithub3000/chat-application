import jwt from "jsonwebtoken";
import { asyncHandler } from "../utilities/asyncHandler.utitlity.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";

export const isAuthenticated = asyncHandler(async(req,res,next)=>{

    const token = req.cookies.token || req.headers["authorization"]?.replace("Bearer ", "");

    if(!token){
        throw new errorHandler(400,"Invalid token")
    }

    const decodedToken = jwt.verify(token,process.env.JWT_SECRET)

    if(decodedToken){
        req.user = decodedToken._id
    }

    next()

})