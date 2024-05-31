import { compare } from "bcrypt";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import twilio from "twilio";

const sendWp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { triggerAmount } = req.body;
  try {
    const accountSid = 'AC09585b781f76496b65605b7b02c0c3e9';
    const authToken = 'f6f67f3d941aa19ce45f1aa661b3862f';
    const client = twilio(accountSid, authToken);

    await client.messages.create({
      body: `Stock of Cheese is below ${triggerAmount}`,
      from: "whatsapp:+14155238886",
      to: "whatsapp:+919624670574",
    });

    res.status(200).json({ message: "Message sent." });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ error: "Bad Request." });
  }
});

export { sendWp };

