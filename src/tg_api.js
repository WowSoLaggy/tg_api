const axios = require('axios');


/**
 * Sends a message using the Telegram Bot API
 * @param {string} token - The Telegram Bot API token
 * @param {number} chat_id - The ID of the chat where the message will be sent
 * @param {string} text - The text of the message
 * @returns {Promise<Object>} - A promise that resolves to the response data from the API
 * @throws {Error} - If there was an error sending the message
 */
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
