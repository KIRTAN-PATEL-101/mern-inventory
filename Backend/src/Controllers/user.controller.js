import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { User } from "../models/users.models.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import validator from "validator";

const generateAccessandRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshtoken = user.generateRefreshToken();
    const accesstoken = user.generateAccessToken();

    user.refreshToken = refreshtoken;
    await user.save({ validateBeforeSave: false });

    return { accesstoken, refreshtoken }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { userName, email, password, mobileNo } = req.body;

  // Basic field validation
  if (!userName || !email || !password || !mobileNo) {
    throw new ApiError(400, "All fields are required (userName, email, password, mobileNo)");
  }

  // Validate email
  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Invalid email format");
  }

  // Validate mobile number
  if (!validator.isMobilePhone(mobileNo, "any")) {
    throw new ApiError(400, "Invalid mobile number format");
  }

  // Check for existing user by username or email
  const existingUser = await User.findOne({
    $or: [{ userName: userName.toLowerCase() }, { email: email }]
  });
  if (existingUser) {
    const field = existingUser.userName === userName.toLowerCase() ? "username" : "email";
    // throw new ApiError(409, `User with this ${field} already exists.`);
    return res.status(409).json(new ApiResponse(409, null, `User with this ${field} already exists.`));
  }

  // Handle profile picture upload
  const profilePicLocalPath = req.files?.profilepic?.[0]?.path || null;
  let profileUrl = null;
  if (profilePicLocalPath) {
    try {
      profileUrl = await uploadOnCloudinary(profilePicLocalPath);
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw new ApiError(500, "Failed to upload profile picture.");
    }
  }

  // Create user
  const user = await User.create({
    userName: userName.toLowerCase(),
    email: email,
    password: password,
    mobileNo: mobileNo,
    Imageurl: profileUrl,
  });

  // Fetch the created user excluding sensitive data
  const createdUser = await User.findById(user._id).select("-password -refreshToken");
  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while creating the user.");
  }

  // Successful response
  res.status(201).json(new ApiResponse(201, createdUser, "User Registered Successfully."));
});


const validateuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required.");
  }
  const user = await User.findOne({ email }).select("password");
  if (!user) {
    return res.status(409).json(new ApiResponse(409, null, `Email not Register .`));
  }
  const isPasswordMatch = await user.isPasswordCorrect(password);
  if (!isPasswordMatch) {
    return res.status(409).json(new ApiResponse(409, null, `Invalid password.`));  }

  const {accesstoken,refreshtoken}=await generateAccessandRefreshToken(user._id)

  const loggedinuser = await User.findById(user._id).
  select( "-password -refreshToken")

  const options={
    httpOnly: true,
    secure: true
  }

  return res
    .status(200)
    .cookie("AccessToken",accesstoken,options)
    .cookie("RefreshToken",refreshtoken,options)
    .json(new ApiResponse(
      200, 
      {user : loggedinuser,accesstoken,refreshtoken},
      "User Logged in Successfully."
    ));
});

const logoutUser = asyncHandler(asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(req.user._id,
    {
      $set:{
        refreshToken: undefined
      }
    },
    {
      new: true
    }
   )
   const options={
    httpOnly: true,
    secured: true
  }

  return res
  .status(200)
  .clearCookie("AccessToken",options)
  .clearCookie("RefreshToken",options)
  .json(new ApiResponse(200,{},"User Logged Out Successfully."))

}))

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

  if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request")
  }

  try {
      const decodedToken = jwt.verify(
          incomingRefreshToken,
          process.env.REFRESH_TOKEN_SECRET
      )
  
      const user = await User.findById(decodedToken?._id)
  
      if (!user) {
          throw new ApiError(401, "Invalid refresh token")
      }
  
      if (incomingRefreshToken !== user?.refreshToken) {
          throw new ApiError(401, "Refresh token is expired or used")
          
      }
  
      const options = {
          httpOnly: true,
          secure: true
      }
  
      const {accessToken, newRefreshToken} = await generateAccessAndRefereshTokens(user._id)
  
      return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
          new ApiResponse(
              200, 
              {accessToken, refreshToken: newRefreshToken},
              "Access token refreshed"
          )
      )
  } catch (error) {
      throw new ApiError(401, error?.message || "Invalid refresh token")
  }

})

export { registerUser, validateuser, logoutUser, refreshAccessToken };