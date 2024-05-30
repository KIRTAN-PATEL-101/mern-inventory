import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { User } from "../models/users.models.js";

export const checkAdmin = asyncHandler(async(req,_,next)=>{
    if(req.user.role !== "admin"){
        return next(new ApiError(403, "You are not authorized to access this route"))
    }else{
        next()
    }
})

