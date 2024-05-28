import { compare } from "bcrypt";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import twilio from "twilio";
import { ApiResponse } from "../Utils/ApiResponse.js";

const sendWp = asyncHandler((req, res) => {
  console.log(req.body);
  const amount=req.body;
  try {
    const accountSid = 'AC09585b781f76496b65605b7b02c0c3e9';
    const authToken = '13cb44ce2f633a4821ecb319c05f1274';
    const client = twilio(accountSid, authToken);
    // const client = require('twilio')(accountSid, authToken);

    client.messages.create({
      body: `Stock of x is below ${amount}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919624670574",
    });
    return new ApiResponse(200, "Message sent.");
  } catch (error) {
    console.log("Error: ", error);
    throw new ApiError(500, "Bad Request.");
  }
});

export { sendWp };
