# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package serves as a plugin for interacting with the NEAR Protocol blockchain. It provides essential functionalities such as transferring NEAR tokens, checking storage balances, and swapping tokens. The package includes various classes, interfaces, types, and functions to facilitate seamless integration with NEAR Protocol applications.

### Key Features

- **WalletProvider Class**: Represents a WalletProvider that implements the Provider interface.
- **TransferContent Interface**: Represents the content of a transfer with recipient, amount, and optional token address.
- **NearToken Interface**: Represents a NEAR Protocol token with essential properties.
- **WalletPortfolio Type**: Represents a wallet portfolio with total USD and NEAR balance, and an array of NearToken objects.
- **NearConfig Type**: Alias for the configuration object for NEAR Protocol.
- **checkStorageBalance Function**: Asynchronously checks the storage balance of a specified account within a contract.
- **swapToken Function**: Performs token swaps with input and output tokens, amount, and slippage tolerance.
- **isTransferContent Function**: Checks if the content is a TransferContent object.
- **transferNEAR Function**: Transfers NEAR tokens to a specific recipient.
- **getConfig Function**: Retrieves configuration based on the provided environment.
- **validateNearConfig Function**: Validates the NEAR configuration based on the provided runtime settings.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the plugin to your ElizaOS project:

1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```

2. CD into the agent/ directory.
3. Run `pnpm install` to install the new dependency.
4. Run `pnpm build` to build the project with the new plugin.

### 2. Importing and Using the plugin:

- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```

- Add the plugin to the AgentRuntime plugins array:
  ```typescript
  return new AgentRuntime({
      // other configuration...
      plugins: [
          nearPlugin,
          // other plugins...
      ],
  });
  ```

### 3. Integration Example:

```typescript
import { nearPlugin } from "@elizaos/plugin-near";

return new AgentRuntime({
    // other configuration...
    plugins: [
        nearPlugin,
        // other plugins...
    ],
});
```

### 4. Verification Steps:

Ensure that you see ["✓ Registering action: <plugin actions>"] in the console to verify successful integration.

Remember to also ensure that the plugin dependencies and peer dependencies are installed correctly to avoid any issues during integration.

## Configuration
# Configuration Documentation

To configure the application, you will need to set the following environment variables in a `.env` file. Make sure to add the `.env` file to your `.gitignore` to prevent it from being committed to the repository.

## Required Environment Variables

1. `NEAR_ENV`: Used to specify the environment for NEAR.
2. `REACT_APP_REF_SDK_ENV`: Used for REACT_APP_REF_SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Used for NEAR wallet secret key.
4. `NEAR_WALLET_PUBLIC_KEY`: Used for NEAR wallet public key.
5. `NEAR_ADDRESS`: Used for NEAR address.
6. `SLIPPAGE`: Used to set the slippage.
7. `RPC_URL`: Used for RPC URL.
8. `NEAR_NETWORK`: Used to specify the NEAR network.

## Example .env File

```plaintext
NEAR_ENV=
REACT_APP_REF_SDK_ENV=
NEAR_WALLET_SECRET_KEY=
NEAR_WALLET_PUBLIC_KEY=
NEAR_ADDRESS=
SLIPPAGE=
RPC_URL=
NEAR_NETWORK=
```

## Note

For some variables, default values are used if the environment variable is not set. Make sure to customize these values according to your setup.

## Features

### Actions
#### Action
- Name: swap
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler for this action performs a token swap using Ref Finance. It checks the input token ID, output token ID, and amount to perform the swap. It then connects to the NEAR blockchain, executes the swap, signs and sends transactions, and returns the result.

#### Examples
- user: ["{{user1}}"]
- agent: ["Example response:\n```json\n{\n    \"inputTokenId\": \"wrap.testnet\",\n    \"outputTokenId\": \"ref.fakes.testnet\",\n    \"amount\": \"1.0\"\n}\n```"]

#### Action
- Name: transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
The handler for the transfer action facilitates the transfer of NEAR tokens to another account. It retrieves the recipient address, amount to transfer, and token contract address (if applicable) from the user's request, validates the content, and executes the transfer using the NEAR protocol. It provides feedback to the user upon successful or failed transfer attempts.

#### Examples
- user: ["Send 1.5 NEAR to bob.testnet"]
- agent: ["Successfully sent 1.5 NEAR to bob.testnet\\nTransaction: ABC123XYZ"]



### Providers
### Wallet Provider
This provider allows you to fetch and format wallet information including account balance and token details.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, State } from "@elizaos/core";
import { Provider } from "providers/wallet";

const accountId = "your_account_id";
const provider = new WalletProvider(accountId);
const result = await provider.get(runtime, memory, state);
console.log(result);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
# WalletProvider Class

Represents a WalletProvider class that implements the Provider interface.

## Methods

### constructor

Constructor for creating a new instance of a class.

```javascript
const walletProvider = new WalletProvider("123456789");
```

### get

Asynchronously retrieves a formatted portfolio string from the wallet provider.

```javascript
const portfolioString = await walletProvider.get(runtime, _message, _state);
```

### connect

Connect to NEAR protocol using the provided account credentials.

```javascript
const nearAccount = await walletProvider.connect(runtime);
```

### fetchWithRetry

Fetches data from a specified URL with retry logic.

```javascript
const data = await walletProvider.fetchWithRetry("https://api.example.com/data");
```

### fetchPortfolioValue

Fetches the current value of the portfolio in the wallet.

```javascript
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
```

### fetchNearPrice

Fetches the current price of NEAR token in USD from an API endpoint.

```javascript
const nearPrice = await walletProvider.fetchNearPrice();
```

### formatPortfolio

Formats the given portfolio data into a string for display.

```javascript
const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
```

### getFormattedPortfolio

Asynchronously retrieves the portfolio value from the given runtime and formats it into a string representation.

```javascript
const formattedPortfolioValue = await walletProvider.getFormattedPortfolio(runtime);
```

## API Reference
# API Reference Documentation

## Classes

### WalletProvider
Represents a WalletProvider class that implements the Provider interface.

#### Methods

##### constructor
Constructor for creating a new instance of a class.
```javascript
/**
 * @param {string} accountId - The account ID associated with the instance.
 */
```

##### get
Asynchronously retrieves a formatted portfolio string from the wallet provider.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @param {Memory} _message - The message data from memory.
 * @param {State} [_state] - Optional state data for the agent.
 * @returns {Promise<string | null>} - The formatted portfolio string, or null if an error occurs.
 */
```

##### connect
Connect to NEAR protocol using the provided account credentials.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime interface
 * @returns {Promise<Account>} - The connected NEAR account
 */
```

##### fetchWithRetry
Fetches data from a specified URL with retry logic.
```javascript
/**
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched data.
 */
```

##### fetchPortfolioValue
Fetches the current value of the portfolio in the wallet.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime to connect to the account
 * @returns {Promise<WalletPortfolio>} - The portfolio value including total USD, total NEAR, and token details
 */
```

##### fetchNearPrice
Fetches the current price of NEAR token in USD.
```javascript
/**
 * @returns {Promise<number>} - The current price of NEAR token in USD.
 */
```

##### formatPortfolio
Formats the given portfolio data into a string for display.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The portfolio data to format.
 * @returns {string} - The formatted string containing account ID, total value, token balances, and market prices.
 */
```

##### getFormattedPortfolio
Asynchronously retrieves the portfolio value from the given runtime and formats it into a string representation.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime from which to fetch portfolio information
 * @returns {Promise<string>} - A promise that resolves with the formatted portfolio value as a string
 */
```

## Interfaces

### TransferContent
Interface representing the content of a transfer.
```javascript
/**
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
Interface representing a NEAR Protocol token.
```javascript
/**
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token in the user interface.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol tokens (optional).
 */
```

### WalletPortfolio
Represents a wallet portfolio that contains total USD balance, total NEAR balance, and an array of NearToken objects.
```javascript
/**
 * @property {string} totalUsd - The total USD balance in the wallet
 * @property {string} [totalNear] - The total NEAR balance in the wallet (optional)
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the wallet
 */
```

## Types

### NearConfig
Define a type alias for the inferred type of the 'nearEnvSchema' schema, representing the configuration object for NEAR Protocol.

## Examples

```javascript
// Example of fetching and formatting portfolio value
const runtime = { /* mock runtime object */ };
const wallet = new WalletProvider('testAccountId');
wallet.connect(runtime)
  .then((account) => {
    return wallet.fetchPortfolioValue(runtime)
      .then((portfolio) => {
        const formattedPortfolio = wallet.formatPortfolio(runtime, portfolio);
        console.log(formattedPortfolio);
      });
  })
  .catch((error) => {
    console.error(error.message);
  });
```

## Development

### TODO Items
1. TODO: add functionality to support multiple networks
2. The code currently only supports one network (NEAR testnet) for swapping tokens. To add support for multiple networks, the code needs to be refactored to allow for dynamic network selection based on runtime settings.
3. Feature

### Troubleshooting
### Common Issues
1. WalletProvider not connecting to NEAR protocol
   - Cause: Missing NEAR wallet credentials in runtime settings
   - Solution: Ensure NEAR wallet secret key and public key are properly configured in runtime settings

### Debugging Tips
- Check if NEAR wallet credentials are correctly provided in the runtime settings
- Verify that the network ID, node URL, and wallet URL are appropriately set for NEAR connection

### FAQ
Q: How can I validate NEAR configuration in the runtime settings?
A: You can use the `validateNearConfig` function with the `IAgentRuntime` object to validate the NEAR configuration based on the provided settings. Make sure to handle any `z.ZodError` exceptions that may occur.