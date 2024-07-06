const dotenv = require('dotenv');

const { send_message } = require('./tg_api');


dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;


async function runTest() {
  try {
    const result = await send_message(TELEGRAM_TOKEN, CHAT_ID, 'Test message');
    console.log('Test result:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest();
