const axios = require('axios');
const { Driver, Ydb } = require('ydb-sdk');

async function fetchBdaysAndSendMessage(telegramToken, ydbEndpoint, ydbDatabase, ydbTable, chatId) {
  const TELEGRAM_URL = `https://api.telegram.org/bot${telegramToken}/sendMessage`;

  async function sendMessage(chatId, text) {
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

  async function getBdaysFromYDB() {
    const authService = new Ydb.Auth({
      anonymous: true,
    });

    const driver = new Driver({
      endpoint: ydbEndpoint,
      database: ydbDatabase,
      authService,
    });

    await driver.ready(10000);

    const session = await driver.tableClient.session();
    const query = `SELECT * FROM ${ydbTable}`;
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

  const bdays = await getBdaysFromYDB();
  let responseMessage = 'Данные из таблицы bdays_tbl:\n';
  responseMessage += bdays.map(row => row.join(', ')).join('\n');

  return await sendMessage(chatId, responseMessage);
}

module.exports = { fetchBdaysAndSendMessage };
