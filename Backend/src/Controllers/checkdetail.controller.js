import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";

export const checkDetails = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "")
        let isUser = false;
        // console.log("Cookies: ", req.cookies);
        if (!token) {
            throw new ApiError(401, "Pls Login to website.")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")

        if (!user) {
            throw new ApiError(401, "Invalid Access Token pls login again.")
        }
        else {
            isUser = true;
        }
        return new ApiResponse(200, { user: user, isUser }, "User is already logged in")
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})