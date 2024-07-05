require('dotenv').config();
const { fetchBdaysAndSendMessage } = require('./tg_api');

// Убедитесь, что переменные окружения заданы
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const YDB_ENDPOINT = process.env.YDB_ENDPOINT;
const YDB_DATABASE = process.env.YDB_DATABASE;
const YDB_TABLE = process.env.YDB_TABLE;
const CHAT_ID = process.env.CHAT_ID; // Используйте свой чат ID для тестирования

async function runTest() {
  try {
    const result = await fetchBdaysAndSendMessage(TELEGRAM_TOKEN, YDB_ENDPOINT, YDB_DATABASE, YDB_TABLE, CHAT_ID);
    console.log('Test result:', result);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

runTest();
