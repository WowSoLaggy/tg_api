const axios = require('axios');


async function send_message(token, chat_id, text) {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const params = {
    chat_id: chat_id,
    text: text
  };
  
  try {
    const response = await axios.post(url, params);
    return response.data;
  } catch (error) {
    console.error(`Failed to send message: "${error}"`);
    throw error;
  }
}

module.exports = { send_message };
