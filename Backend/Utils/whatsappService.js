
// Example: Twilio WhatsApp API wrapper (pseudo)
const axios = require('axios');
require('dotenv').config();

exports.sendMessage = async (phone, text) => {
  // Implement with Twilio / 360dialog / other provider
  console.log('WHATSAPP SEND =>', phone, text);
  return { ok:true };
};

exports.sendDocument = async (phone, docBuffer, filename) => {
  // Upload and send doc via provider
  console.log('WHATSAPP DOC =>', phone, filename);
  return { ok:true };
};
