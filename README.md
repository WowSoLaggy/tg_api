# TG API

Welcome to TG API! This project aims to provide a simple and efficient API for interacting with the TG platform.
It provides only a single 'send_message' function at this moment.

## Installation

To install TG API, follow these steps:

1. Clone the repository: `git clone https://github.com/WowSoLaggy/tg_api.git`
2. Navigate to the project directory: `cd tg_api`
3. Install the dependencies: `npm install`

## Usage

To use TG API, follow these steps:

1. Import the function: `const { send_message } = require('tg_api');`
2. Call function: `await send_message(token, chat_id, text);`

## API Reference

### `send_message(token, chat_id, text)`

Sends a message using the Telegram Bot API

- `token` (string): The Telegram Bot API token
- `chat_id` (string): The ID of the chat where the message will be sent
- `text` (string): The text of the message

Returns a Promise that resolves to the response data from the API.

## Contributing

Contributions are welcome! If you would like to contribute to TG API, please follow the common sense in code styling and feel free to create PR.

## License

TG API is licensed under the [MIT License](LICENSE).

## Credits

WowSoLaggy, 2024
<br>wowsolaggy@gmail.com
