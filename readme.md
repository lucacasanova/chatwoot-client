# Chatwoot Client for Node.js

This project is a library to integrate the Chatwoot API with your backend in Node.js and TypeScript. It provides methods to manage accounts, users, agents, contacts, conversations, and more.

# API Support
This library fully supports the Chatwoot API v1.0.0 (Platform and Application).

## Installation

You can install the library using npm:

```bash
npm install --save chatwoot-client
```

## Configuration

To use the library, you need to provide the host URL and an API access token (platformAppApiKey or userApiKey).

```ts
import ChatwootClient from 'chatwoot-client';

const config = {
    host: 'https://app.chatwoot.com',
    userToken: 'your-user-api-key',
    platformToken: 'your-platform-app-api-key'
};

const client = new ChatwootClient(config);
```

# Usage

## Example Usage

### Create Account

```ts
const createAccountResponse = await client.createAccount({ name: 'Nova Conta' });
if (createAccountResponse.success) {
    console.log('Conta criada:', createAccountResponse.data);
} else {
    console.error('Erro ao criar conta:', createAccountResponse.error);
}
```

# Official Documentation
For more information, follow the [official documentation](https://www.chatwoot.com/developers/api/).

# Contribution
Contributions are welcome! Feel free to open an issue or submit a pull request.

# License
This project is licensed under the MIT License. See the LICENSE file for more details.