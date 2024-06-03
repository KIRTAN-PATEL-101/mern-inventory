// whatsapp.controller.js
import twilio from 'twilio';

const accountSid = 'AC09585b781f76496b65605b7b02c0c3e9';
const authToken = '32cfe972d4945708d6d2f6cab49b218a';
const client = twilio(accountSid, authToken);

export const sendWp = async (message, recipient = 'whatsapp:+919624670574') => {
  try {
    const response = await client.messages.create({
      body: message,
      from: 'whatsapp:+14155238886',
      to: recipient
    });
    console.log(`WhatsApp message sent: ${response.sid}`);
  } catch (error) {
    console.error('Failed to send WhatsApp message:', error);
  }
};

