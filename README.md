
# Plugin Documentation
## Overview and Purpose
## Plugin Overview: @elizaos/plugin-near

### 1. Purpose:
The @elizaos/plugin-near package is designed to provide functionality for interacting with a Near Protocol wallet. It allows users to connect to a wallet, fetch portfolio values, and format the portfolio for improved usability.

### 2. Main Features:
- **WalletProvider Class:** Implements the Provider interface and facilitates connecting to a wallet, fetching portfolio values, and formatting the portfolio.
- **Key Interfaces:**
  - **TransferContent:** Represents the content required for a transfer, including recipient, amount, and optional token address.
  - **NearToken:** Describes a Near Protocol token with attributes like name, symbol, balance, price, and value in USD.
  - **WalletPortfolio:** Defines a wallet portfolio with total USD value, optional total NEAR value, and an array of NearToken objects representing different tokens.
## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Add the plugin to your ElizaOS project:

- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Navigate into the agent/ directory.
- Run `pnpm install` to install the new dependency.
- Run `pnpm build` to build the project with the new plugin.

### 2. Import and Use the Plugin:

- Import the plugin using:  
  `import { nearPlugin } from "@elizaos/plugin-near";`
- Add it to the AgentRuntime plugins array.

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

Ensure successful integration by looking for the following message in the console:
```
✓ Registering action: <plugin actions>
```

By following these steps, you should be able to successfully install and integrate the NEAR Protocol Plugin for Eliza into your ElizaOS project.
## Configuration
# Configuration Documentation

## Required Environment Variables and Purpose

1. `NEAR_ENV`: Used as a fallback value for environment variable `process.env.NEAR_ENV`
2. `REACT_APP_REF_SDK_ENV`: Represents the environment variable `process.env.REACT_APP_REF_SDK_ENV`
3. `NEAR_WALLET_SECRET_KEY`: Holds the secret key for the NEAR wallet
4. `NEAR_WALLET_PUBLIC_KEY`: Contains the public key for the NEAR wallet
5. `NEAR_ADDRESS`: Fallback value for `runtime.getSetting("NEAR_ADDRESS")` or `process.env.NEAR_ADDRESS`
6. `SLIPPAGE`: Fallback value for `runtime.getSetting("SLIPPAGE")` or `process.env.SLIPPAGE`
7. `RPC_URL`: Fallback value for `runtime.getSetting("RPC_URL")` or `process.env.RPC_URL`
8. `NEAR_NETWORK`: Represents the NEAR network ID or defaults to "testnet"

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

## Important Note

Please ensure your `.env` file is properly configured with the necessary environment variables listed above. Also, remember to include the `.env` file in your `.gitignore` to avoid committing sensitive information to your repository.
## Actions
# Action: EXECUTE_SWAP_NEAR

### Description:
Perform a token swap using Ref Finance.

### Similes:
- SWAP_TOKENS_NEAR
- TOKEN_SWAP_NEAR
- TRADE_TOKENS_NEAR
- EXCHANGE_TOKENS_NEAR

### Validate:
- Validates the input message parameters.

### Handler:
- Handles the execution of the token swap.
- Initializes the Ref SDK with the testnet environment.
- Composes the state.
- Generates a response based on the extracted information from the message.
- Checks for missing required parameters before proceeding with the swap.
- Executes the token swap by calling the `swapToken` function.
- Signs and sends transactions to complete the swap.
- Handles successful and error scenarios with error messages.

### Examples:
#### # Usage
- User {{user1}} requests to swap 1.0 NEAR for REF token.
- Agent:
    ```
    inputTokenId: "wrap.testnet",
    outputTokenId: "ref.fakes.testnet",
    amount: "1.0"
    ```
- User {{user2}} initiates the token swap action.
- Agent responds with a success message including the transaction hash.

#### Example:
```json
[
    {
        user: "{{user1}}",
        content: {
            inputTokenId: "wrap.testnet",
            outputTokenId: "ref.fakes.testnet",
            amount: "1.0",
        },
    },
    {
        user: "{{user2}}",
        content: {
            text: "Swapping 1.0 NEAR for REF...",
            action: "TOKEN_SWAP",
        },
    },
    {
        user: "{{user2}}",
        content: {
            text: "Swap completed successfully! Transaction hash: ...",
        },
    },
]
```

## Transfer NEAR Action

### Description
Transfer NEAR tokens to another account.

### Properties
- **Name:** SEND_NEAR
- **Similes:** TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

### Validate
This action does not have specific validation logic implemented.

### Handler
1. **State Initialization:** Initializes or updates the state with the recent message.
2. **Action Execution:**
   - Composes the transfer context using the specified template.
   - Generates transfer content using the small model class.
   - Validates the transfer content.
   - Transfers NEAR tokens to the recipient account.
   - Sends a success or error response based on the transaction status.

### Usage
{{user1}}
- Sends a message: "Send 1.5 NEAR to bob.testnet"

{{user2}}
- Responds with: "I'll send 1.5 NEAR now..." to initiate the transfer.
- Receives a message: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ" confirming the transfer.

### Examples
```typescript
[
    [
        {
            user: "{{user1}}",
            content: {
                text: "Send 1.5 NEAR to bob.testnet",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "I'll send 1.5 NEAR now...",
                action: "SEND_NEAR",
            },
        },
        {
            user: "{{user2}}",
            content: {
                text: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ",
            },
        },
    ],
] as ActionExample[][]
```


## Providers
### `get()` Method Documentation

The `get()` method in the `WalletProvider` class is responsible for retrieving the formatted portfolio information for a specified NEAR wallet account. The method takes in three parameters:

1. `runtime`: An instance of the `IAgentRuntime` interface, which provides access to settings and configurations required for interacting with the NEAR blockchain.
2. `_message`: A `Memory` object that contains any additional data or context relevant to the execution of the method (not used in this specific implementation).
3. `_state`: An optional `State` object that represents the state of the conversation or application (not used in this specific implementation).

#### Return Value:
- A `Promise` that resolves to a string containing the formatted portfolio information of the NEAR wallet account.
- If successful, the method returns the formatted portfolio information as a string.
- If an error occurs during the execution of the method, it will log the error and return `null`.

#### Usage:
```typescript
const accountId = "example.near"; // Replace with the NEAR wallet account ID
const provider = new WalletProvider(accountId);
const portfolioInfo = await provider.getFormattedPortfolio(runtime);
console.log(portfolioInfo);
```

#### Error Handling:
If the NEAR_ADDRESS setting is not configured or if any errors occur during the execution of the method (such as fetching portfolio data or formatting the information), the method will log the error and return `null`.

#### Example:
```typescript
// Inside an async function
try {
    const accountId = runtime.getSetting("NEAR_ADDRESS");
    if (!accountId) {
        throw new Error("NEAR_ADDRESS not configured");
    }

    const provider = new WalletProvider(accountId);
    const portfolioInfo = await provider.get(runtime, new Memory(), new State());
    console.log(portfolioInfo);
} catch (error) {
    console.error("Error in wallet provider:", error);
}
```


## Evaluators

## Usage Examples
# AccountService Class

A class that implements the Provider interface and represents a wallet provider.
Provides functionality to connect to a wallet, fetch portfolio value, and format the portfolio.

## Methods

### constructor
Constructor for the AccountService class.

#### Parameters
- `accountId` {string} - The ID of the account.

### get
Asynchronously retrieves a formatted portfolio from the wallet provider.

#### Parameters
- `runtime` {IAgentRuntime} - The runtime environment to use for retrieval
- `_message` {Memory} - The message object (not used in this method)
- `_state` {State} - Optional state object

#### Returns
- Promise<string | null> - The formatted portfolio or null if an error occurs

### connect
Connects to the NEAR blockchain using the provided runtime and stores the account information.

#### Parameters
- `runtime` {IAgentRuntime} - The runtime object to use for settings and key generation

#### Returns
- Promise<object> - The NEAR blockchain account information.

### fetchWithRetry
Fetches data from a URL with retry mechanism.

#### Parameters
- `url` {string} - The URL to fetch data from
- `options` {RequestInit} - The options for the fetch request. Default is an empty object

#### Returns
- Promise<any> - A promise that resolves with the fetched data.

### fetchPortfolioValue
Fetches the current value of the portfolio by retrieving account balance and fetching NEAR price in USD.

#### Parameters
- `runtime` {IAgentRuntime} - The runtime context for the agent

#### Returns
- Promise<WalletPortfolio> - A promise that resolves with the wallet portfolio containing total USD value, total NEAR balance, and token details.

### fetchNearPrice
Fetches the current NEAR price from an API endpoint, saves it in cache, and returns it.

#### Returns
- Promise<number> - The current NEAR price in USD.

### formatPortfolio
Format the wallet portfolio data into a human-readable string for display.

#### Parameters
- `runtime` {IAgentRuntime} - The runtime environment for the agent
- `portfolio` {WalletPortfolio} - The wallet portfolio data to be formatted

#### Returns
- string - The formatted string representation of the portfolio data.

### getFormattedPortfolio
Asynchronously fetches and formats the portfolio value based on the given runtime.

#### Parameters
- `runtime` {IAgentRuntime} - The runtime to use for fetching data

#### Returns
- Promise<string> - A promise that resolves with the formatted portfolio value or an error message.

## Common Use Cases

### Example 1: Fetch and Format Portfolio
```javascript
const runtime = new IAgentRuntime();
const accountService = new AccountService();

accountService.getFormattedPortfolio(runtime)
  .then((formattedPortfolio) => {
    console.log(formattedPortfolio);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Example 2: Connect to NEAR Blockchain
```javascript
const runtime = new IAgentRuntime();
const accountService = new AccountService();

accountService.connect(runtime)
  .then((accountInfo) => {
    console.log(accountInfo);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Modifying and Extending Functionality

To modify or extend the functionality of AccountService class methods, you can create subclasses that inherit from AccountService and override the methods. For example:

```javascript
class CustomAccountService extends AccountService {
  async fetchPortfolioValueCustom(runtime) {
    // Custom implementation to fetch portfolio value
  }
}
```

By extending the AccountService class, you can customize the behavior of methods or add new functionality as needed.
## API Reference
# WalletProvider Class

A class that implements the Provider interface and represents a wallet provider. Provides functionality to connect to a wallet, fetch portfolio value, and format the portfolio.

### Methods

#### constructor
```javascript
/**
 * Constructor for the WalletProvider class.
 * 
 * @param {string} accountId - The ID of the account.
 */
```

#### get
```javascript
/**
 * Asynchronously retrieves a formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment to use for retrieval
 * @param {Memory} _message - The message object (not used in this method)
 * @param {State} [_state] - Optional state object
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs
 */
```

#### connect
```javascript
/**
 * Connects to the NEAR blockchain using the provided runtime and stores the account information.
 * @param {IAgentRuntime} runtime - The runtime object to use for settings and key generation.
 * @returns {Promise<object>} - The NEAR blockchain account information.
 */
```

#### fetchWithRetry
```javascript
/**
 * Fetches data from a URL with a retry mechanism.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - The options for the fetch request. Default is an empty object.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

#### fetchPortfolioValue
```javascript
/**
 * Fetches the current value of the portfolio by retrieving account balance and fetching NEAR price in USD.
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @returns {Promise<WalletPortfolio>} A promise that resolves with the wallet portfolio containing total USD value, total NEAR balance, and token details.
 */
```

#### fetchNearPrice
```javascript
/**
 * Fetches the current NEAR price from an API endpoint, saves it in cache, and returns it.
 * If the price is already cached, it returns the cached value.
 * 
 * @returns {Promise<number>} The current NEAR price in USD.
 */
```

#### formatPortfolio
```javascript
/**
 * Format the wallet portfolio data into a human-readable string for display.
 *
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {WalletPortfolio} portfolio - The wallet portfolio data to be formatted.
 * @returns {string} The formatted string representation of the portfolio data.
 */
```

#### getFormattedPortfolio
```javascript
/**
 * Asynchronously fetches and formats the portfolio value based on the given runtime.
 * 
 * @param {IAgentRuntime} runtime The runtime to use for fetching data.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value or an error message.
 */
```

# Interfaces

### TransferContent
```javascript
/**
 * Interface representing the content needed for a transfer.
 * Extends the Content interface.
 * Includes recipient, amount, and an optional tokenAddress.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
```javascript
/**
 * Interface for representing a Near Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places in the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near Protocol.
 */
```

### WalletPortfolio
```javascript
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR cryptocurrency (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the wallet portfolio.
 */
```

# Types

### NearConfig
```javascript
/**
 * Type definition for NearConfig based on the schema inferred from nearEnvSchema.
 */
```
## TODO Items
**TODO Comment:** 
TODO: add functionality to support multiple networks

**Context:**
The code currently only supports one network specified by the NEAR_NETWORK setting. The functionality needs to be expanded to allow for multiple networks to be supported, with the ability to specify different network configurations such as RPC URL and network ID.

**Tag:** 
Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

## 1. Common Issues and Solutions
- **Issue:** Missing package dependencies
  - **Solution:** Make sure all required packages are installed by running `npm install`

## 2. Error Messages and Their Meaning
- **Error Message:** `Cannot find module 'bignumber.js'`
  - **Meaning:** The `bignumber.js` package is not installed or correctly imported.
- **Error Message:** `Error retrieving portfolio data`
  - **Meaning:** There was an error while fetching the portfolio data.

## 3. Debugging Tips
- Check console logs for any error messages
- Use tools like `console.log` to track function outputs

## 4. Configuration Problems
- Double-check the configuration settings in the code and ensure they are correct

## 5. Compatibility Issues
- Ensure that all package versions are compatible with each other

## 6. Performance Optimization
- Use async/await to improve performance when fetching data
- Optimize code for better performance by avoiding unnecessary loops or function calls

## 7. FAQ Section
- **Q:** How to fix a `Cannot find module` error?
  - **A:** Run `npm install` to install missing packages.

- **Q:** What does the error message `Error retrieving portfolio data` mean?
  - **A:** It indicates that there was an issue while fetching the portfolio data.

```javascript
// Example of using async/await for fetching portfolio data
async function getPortfolioData() {
  try {
    const data = await fetchPortfolioData();
    return data;
  } catch (error) {
    console.error(`Error retrieving portfolio data: ${error.message}`);
    return null;
  }
}
```
