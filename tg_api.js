const axios = require('axios');
const { Driver, getLogger, Ydb } = require('ydb-sdk');

async function sendMessage(telegramToken, chatId, text) {
  const TELEGRAM_URL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
  try {
    const response = await axios.post(TELEGRAM_URL, {
      chat_id: chatId,
      text: text,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function getBdaysFromYDB(endpoint, database, tableName) {
  const authService = new Ydb.Auth({
    anonymous: true,
  });

  const driver = new Driver({
    endpoint: endpoint,
    database: database,
    authService,
  });

  await driver.ready(10000); // Подключение к базе данных с таймаутом 10 секунд

  const session = await driver.tableClient.session();
  const query = `SELECT * FROM ${tableName}`;
  const { resultSets } = await session.executeQuery(query);

  const rows = [];
  for (const resultSet of resultSets) {
    for (const row of resultSet.rows) {
      rows.push(row.items.map(item => item.textValue));
    }
  }

  await session.release();

  return rows;
}

module.exports = { sendMessage, getBdaysFromYDB };
