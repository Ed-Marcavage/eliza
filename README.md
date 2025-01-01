
# Plugin Documentation
## Overview and Purpose
## Plugin Overview: @elizaos/plugin-near

### 1. Purpose
The purpose of the @elizaos/plugin-near package is to provide functionalities related to NEAR Protocol token management and transfers. It offers classes and interfaces to interact with wallets, transfer tokens, and manage token portfolios within the NEAR Protocol ecosystem.

### 2. Main Features
- **WalletProvider Class:** Represents a Wallet Provider that interacts with NEAR wallets.
- **Interfaces:**
  - **TransferContent:** Interface for the content of a transfer, including recipient, amount, and optional token address.
  - **NearToken:** Interface for Near Protocol tokens, including name, symbol, decimals, balance, UI amount, price in USD, and value in USD. It also includes an optional value in Near Protocol.
  - **WalletPortfolio:** Interface for a wallet portfolio, including total USD value, optional total NEAR value, and an array of NearToken objects representing tokens in the portfolio.
## Installation
## ElizaOS Plugin Installation and Integration Guide: @elizaos/plugin-near

### 1. Add the plugin to your ElizaOS project:

- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Next steps:
  1. cd into the agent/ directory
  2. Run `pnpm install` to install the new dependency
  3. Run `pnpm build` to build the project with the new plugin

### 2. Import and use the plugin:

- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add it to the AgentRuntime plugins array.

### 3. Integration example showing the complete setup:

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

### 4. Verification steps:

Ensure successful integration by checking for the following message in the console:
["✓ Registering action: <plugin actions>"]

Make sure to follow these steps carefully to successfully integrate the @elizaos/plugin-near into your ElizaOS project.
## Configuration
# Configuration Documentation

## Required Environment Variables and their Purpose

1. `NEAR_ENV`: Used as a flag to determine the environment for NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Used for referencing the environment of the React SDK.
3. `NEAR_WALLET_SECRET_KEY`: Contains the secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Contains the public key for the NEAR wallet.
5. `NEAR_ADDRESS`: Used as the NEAR address for the runtime system.
6. `SLIPPAGE`: Used to set slippage value for runtime operations.
7. `RPC_URL`: Contains the RPC URL for the runtime.
8. `NEAR_NETWORK`: Specifies the network ID for NEAR protocol.

## Full .env Example File

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

Please ensure that you configure these environment variables in the .env file. Make sure to add the .env file to the .gitignore to prevent it from being committed to the repository.
## Actions
# `EXECUTE_SWAP_NEAR` Action

- **Description**: Perform a token swap using Ref Finance.

- **Similes**:
    - `SWAP_TOKENS_NEAR`
    - `TOKEN_SWAP_NEAR`
    - `TRADE_TOKENS_NEAR`
    - `EXCHANGE_TOKENS_NEAR`

## Validate Function
```typescript
async validate(runtime: IAgentRuntime, message: Memory): Promise<boolean> {
    console.log("Message:", message);
    return true;
}
```

## Handler Function
```typescript
async handler(
    runtime: IAgentRuntime,
    message: Memory,
    state: State,
    _options: { [key: string]: unknown },
    callback?: HandlerCallback
): Promise<boolean> {
    // Implementation code for token swap...
}
```

## Examples
### Usage
- **User1**
    - **Input:** User1 provides input token ID, output token ID, and amount.
        ```
        {
            "user": "{{user1}}",
            "content": {
                "inputTokenId": "wrap.testnet",
                "outputTokenId": "ref.fakes.testnet",
                "amount": "1.0",
            }
        }
        ```
    - **Agent Action:** 
        ```
        {
            "user": "{{user2}}",
            "content": {
                "text": "Swapping 1.0 NEAR for REF...",
                "action": "TOKEN_SWAP",
            }
        }
        ```
    - **Agent Response:** Swap completed successfully.
        ```
        {
            "user": "{{user2}}",
            "content": {
                "text": "Swap completed successfully! Transaction hash: ...",
            }
        }
        ```

---
This `EXECUTE_SWAP_NEAR` Action performs a token swap using Ref Finance. It validates the input message and executes the swap transaction with the provided input token ID, output token ID, and amount. The natural language examples demonstrate how a user can interact with this Action to initiate a token swap transaction.

```markdown
# Action: SEND_NEAR

### Name
- Name: SEND_NEAR

### Similes
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

### Validate
- Validate: Always returns true, add custom validation logic if needed

### Handler
- Description: Transfer NEAR tokens to another account
- Handler:
    - Initializes or updates state based on recent messages
    - Composes transfer context using a predefined template
    - Generates transfer content based on the context
    - Validates the transfer content
    - Executes the NEAR token transfer using the provided recipient and amount
    - Handles success or error responses and invokes the callback with appropriate messages

### Examples
- Usage:
    - {{user1}}: Send 1.5 NEAR to bob.testnet
    - {{user2}}: I'll send 1.5 NEAR now...
    - {{user2}}: Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ

### Examples
- Examples:
    - User 1 requests to send 1.5 NEAR tokens to "bob.testnet"
    - Agent processes the request and confirms the successful transfer with the transaction hash "ABC123XYZ"
```


## Providers
## Wallet Provider

The **WalletProvider** class implements the **Provider** interface and provides functionality to retrieve and format a wallet portfolio for a specified NEAR account. 

### Constructor
- **Parameters**
  - `accountId`: string - The NEAR account ID for which the wallet portfolio is to be fetched.

### Methods
#### `get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>`
- **Description**: Retrieves the formatted wallet portfolio for the specified NEAR account.
- **Parameters**
  - `runtime`: IAgentRuntime - The runtime environment for the agent.
  - `_message`: Memory - Not used.
  - `_state`: State - Not used.
- **Returns**
  - `Promise<string | null>`: A promise that resolves to the formatted wallet portfolio as a string or null if an error occurs.

#### `connect(runtime: IAgentRuntime): Promise<Account>`
- **Description**: Establishes a connection to the NEAR network using the specified account ID and secret key.
- **Parameters**
  - `runtime`: IAgentRuntime - The runtime environment for the agent.
- **Returns**
  - `Promise<Account>`: A promise that resolves to the NEAR account object once the connection is established.

#### `fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>`
- **Description**: Fetches the wallet portfolio value by querying the NEAR account balance and fetching the NEAR price in USD.
- **Parameters**
  - `runtime`: IAgentRuntime - The runtime environment for the agent.
- **Returns**
  - `Promise<WalletPortfolio>`: A promise that resolves to the wallet portfolio containing total USD value, total NEAR balance, token details, and market prices.

#### `formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string`
- **Description**: Formats the wallet portfolio data into a human-readable string for display.
- **Parameters**
  - `runtime`: IAgentRuntime - The runtime environment for the agent.
  - `portfolio`: WalletPortfolio - The wallet portfolio data containing total values, token balances, and market prices.
- **Returns**
  - `string`: The formatted wallet portfolio as a string.

#### `getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>`
- **Description**: Fetches the wallet portfolio data and formats it for display.
- **Parameters**
  - `runtime`: IAgentRuntime - The runtime environment for the agent.
- **Returns**
  - `Promise<string>`: A promise that resolves to the formatted wallet portfolio as a string.

### Wallet Provider Initialization
To use the **WalletProvider** class as a provider, you can import the **walletProvider** object provided in the code snippet. The **walletProvider** object contains a `get` method that can be used to fetch and format the wallet portfolio information for a specified NEAR account.


## Evaluators

## Usage Examples
# @elizaos/plugin-near Documentation

Welcome to the usage documentation for the @elizaos/plugin-near package! This package is designed to provide seamless integration with the NEAR Protocol, allowing you to easily interact with NEAR smart contracts from your JavaScript application.

In this documentation, we will cover the general concepts of the plugin, including how to set up your environment, authenticate with NEAR, and interact with smart contracts using the provided API. Whether you are a seasoned NEAR developer or new to the world of blockchain development, this documentation will guide you through the process of using @elizaos/plugin-near to enhance your application.

Let's get started!

### providers/wallet.ts

# providers/wallet.ts Usage Documentation

## Purpose
The file `providers/wallet.ts` contains classes and interfaces related to managing a wallet provider. This includes connecting to a NEAR wallet, fetching portfolio information, and formatting portfolio data for display.

## Components
### Classes
- `WalletProvider`: Represents a Wallet Provider that implements the `Provider` interface.

### Methods
- `constructor`: Creates an instance of the `WalletProvider` class.
- `get`: Retrieves the formatted portfolio from the wallet provider.
- `connect`: Connects to the NEAR wallet and sets up authentication.
- `fetchWithRetry`: Fetches data from a URL with retries in case of errors.
- `fetchPortfolioValue`: Fetches the portfolio value for the account associated.
- `fetchNearPrice`: Fetches and returns the near price from the API endpoint.
- `formatPortfolio`: Formats the portfolio information into a readable string.
- `getFormattedPortfolio`: Fetches the portfolio value and formats it into a string.

### Interfaces
- `NearToken`: Represents a Near Protocol token with specific properties.
- `WalletPortfolio`: Represents a wallet portfolio with total values and token information.

## Common Use Cases
1. **Connecting to the NEAR wallet and fetching portfolio information:**
```typescript
const walletProvider = new WalletProvider(accountId);
const runtime = { secret: 'my-secret-key', publicKey: 'my-public-key' };
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. **Fetching portfolio value utilizing caching mechanism:**
```typescript
const walletProvider = new WalletProvider(accountId);
const runtime = { secret: 'my-secret-key', publicKey: 'my-public-key' };
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
console.log(portfolioValue);
```

## Best Practices
- Ensure NEAR wallet credentials are properly configured before connecting.
- Handle errors in fetch calls gracefully and consider using retry logic.
- Utilize caching mechanisms for efficient data retrieval.
- Follow the interface definitions for NearToken and WalletPortfolio when working with token and portfolio data.

### actions/transfer.ts

# File: actions/transfer.ts

## Purpose
This file contains interfaces and functions related to transferring tokens, specifically NEAR tokens. The `TransferContent` interface defines the content structure of a transfer, and the `isTransferContent` function checks if the provided content is a valid TransferContent object. The `transferNEAR` function allows for the transfer of NEAR tokens to a specified recipient.

## Common Use Cases
### Checking TransferContent
```typescript
import { isTransferContent } from './actions/transfer';
import { TransferContent } from './interfaces';

const content: TransferContent = {
  recipient: 'recipient.near',
  amount: '10',
  tokenAddress: null
};

const isTransfer = isTransferContent(runtime, content);
console.log(isTransfer); // Output: true
```

### Transferring NEAR Tokens
```typescript
import { transferNEAR } from './actions/transfer';
import { IAgentRuntime } from './runtime/interfaces';

const runtime: IAgentRuntime = new Runtime();
const recipient = 'recipient.near';
const amount = '10';

try {
  const txHash = await transferNEAR(runtime, recipient, amount);
  console.log(`Transfer successful. Transaction hash: ${txHash}`);
} catch (error) {
  console.error(error.message);
}
```

## Best Practices
- Ensure the `content` object passed to `isTransferContent` matches the `TransferContent` interface to avoid errors.
- Always handle errors thrown by the `transferNEAR` function to provide appropriate feedback to users.
- Securely manage NEAR wallet credentials to prevent unauthorized transfers.
- Verify recipient and amount values before initiating a transfer to prevent mistakes.

### environment.ts

# environment.ts

## Purpose
The `environment.ts` file contains type definitions and functions related to the configuration of the NEAR Environment. It provides a way to retrieve and validate the NEAR configuration for different environments.

## Components

### Types
#### NearConfig
Type definition for the configuration of NEAR Environment. It includes properties like `networkId`, `nodeUrl`, `walletUrl`, `WRAP_NEAR_CONTRACT_ID`, `REF_FI_CONTRACT_ID`, `REF_TOKEN_ID`, `indexerUrl`, `explorerUrl`, and `REF_DCL_SWAP_CONTRACT_ID`.

### Functions
#### getConfig
Retrieves the configuration based on the specified environment or uses default values if not provided.
```typescript
/**
* Retrieves the configuration based on the specified environment or uses default values if not provided.
* 
* @param {string | undefined | null} env - The environment to retrieve the configuration for.
* @returns {Object} The configuration object containing networkId, nodeUrl, walletUrl, WRAP_NEAR_CONTRACT_ID, REF_FI_CONTRACT_ID,
* REF_TOKEN_ID, indexerUrl, explorerUrl, and REF_DCL_SWAP_CONTRACT_ID based on the specified environment. If no valid environment is provided,
* default values for the mainnet environment are returned.
*/
```

#### validateNearConfig
Validates the NEAR configuration based on the provided runtime and environment variables.
```typescript
/**
* Validates the NEAR configuration based on the provided runtime and environment variables.
* @param {IAgentRuntime} runtime - The Agent Runtime interface.
* @returns {Promise<NearConfig>} - A Promise that resolves to a valid NearConfig object.
*/
```

## Common Use Cases
1. Retrieve configuration for the mainnet environment:
```typescript
const config = getConfig();
console.log(config);
```

2. Validate NEAR configuration using Agent Runtime:
```typescript
const runtime = getAgentRuntime();
validateNearConfig(runtime)
    .then((config) => {
        console.log("Valid NEAR configuration:", config);
    })
    .catch((error) => {
        console.error("Error validating NEAR configuration:", error);
    });
```

## Best Practices
- Always provide a valid environment parameter when calling `getConfig` to get the specific configuration.
- Use `validateNearConfig` to ensure the NEAR configuration is valid before using it in your application.
- Handle promise rejections when using `validateNearConfig` to catch any validation errors.

### actions/swap.ts

# actions/swap.ts

## Purpose
The `actions/swap.ts` file contains functions related to swapping tokens. The `checkStorageBalance` function is used to check the storage balance for a specific account within a contract, while the `swapToken` function is used to perform token swaps with the provided input and output tokens, amount, and slippage tolerance.

## Common Use Cases

### 1. Checking Storage Balance
```typescript
const account = '0x123abc';
const contractId = 'contract123';

const hasBalance = await checkStorageBalance(account, contractId);
if (hasBalance) {
    console.log('Storage balance is not null and total is not "0"');
} else {
    console.log('Storage balance is either null or total is "0"');
}
```

### 2. Token Swap
```typescript
const runtime = new AgentRuntime();
const inputTokenId = 'token1';
const outputTokenId = 'token2';
const amount = '100';
const slippageTolerance = 0.02;

const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log('Swap transactions:', transactions);
```

## Best Practices

- Ensure that the account and contract ID are valid when using the `checkStorageBalance` function.
- Before performing a token swap, make sure to provide accurate input token ID, output token ID, amount, and slippage tolerance to the `swapToken` function.
- Handle the Promise returned by `swapToken` function appropriately, as it resolves to an array of transactions representing the swap process.
- Consider adjusting the slippage tolerance parameter based on the specific requirements of the swap operation.
## API Reference
# API Reference Documentation

Welcome to the API reference documentation for our platform. This guide will provide you with detailed information on how to integrate with our API, including endpoints, request parameters, response formats, and authentication requirements.

## Organization

The API documentation is organized into sections based on the different capabilities and functionalities of the API. Each section will focus on a specific aspect of the API, such as user management, data retrieval, or report generation. 

Within each section, you will find detailed descriptions of each endpoint, including the HTTP method, URL, request parameters, response format, and example responses. 

## How to Read

To effectively navigate the API documentation, start by selecting the section that corresponds to the functionality you are interested in. From there, you can explore the individual endpoints to understand how to make requests and interpret the responses.

If you are new to using APIs, we recommend starting with the Getting Started section, which provides an overview of the API and step-by-step instructions on how to authenticate and make your first request.

We hope this documentation will help you successfully integrate with our API and leverage its capabilities in your applications. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.

### providers/wallet.ts

# Wallet Provider API Reference

## Classes

### WalletProvider

Class representing a Wallet Provider.

#### Properties
- None

#### Methods

1. **constructor**
   - Constructor for creating an instance of the class.
   - Parameters:
     - `accountId` {string} - The unique identifier for the account.
   - Returns: None

2. **get**
   - Retrieves the formatted portfolio from the wallet provider.
   - Parameters:
     - `runtime` {IAgentRuntime} - The agent runtime.
     - `_message` {Memory} - The message object.
     - `_state` {State} (optional) - Optional state object.
   - Returns: {Promise<string | null>} - A Promise that resolves with the formatted portfolio string, or null if an error occurs.

3. **connect**
   - Connects to the NEAR wallet using the provided runtime and sets up authentication.
   - Parameters:
     - `runtime` {IAgentRuntime} - The runtime object that contains the NEAR wallet secret and public key settings.
   - Returns: {Promise<Account>} - The NEAR account that is connected to the wallet.
   - Throws: {Error} - If NEAR wallet credentials are not properly configured.

4. **fetchWithRetry**
   - Fetches data from a URL with retries in case of errors.
   - Parameters:
     - `url` {string} - The URL to fetch data from.
     - `options` {RequestInit} (optional) - The options to be passed to the fetch call.
   - Returns: {Promise<any>} - The data fetched from the URL.

5. **fetchPortfolioValue**
   - Fetches the portfolio value for the account associated with the current instance.
   - Parameters:
     - `runtime` {IAgentRuntime} - The runtime environment used to execute the fetchPortfolioValue method.
   - Returns: {Promise<WalletPortfolio>} - A promise that resolves to the portfolio value information.
   - Throws: {Error} - If an error occurs while fetching or processing the portfolio value.

6. **fetchNearPrice**
   - Fetches and returns the NEAR price from the API endpoint.
   - Returns: {Promise<number>} - The NEAR price in USD.

7. **formatPortfolio**
   - Format the portfolio information into a readable string.
   - Parameters:
     - `runtime` {IAgentRuntime} - The agent runtime object.
     - `portfolio` {WalletPortfolio} - The portfolio object containing wallet information.
   - Returns: {string} - The formatted portfolio information.

8. **getFormattedPortfolio**
   - Asynchronously fetches the portfolio value using the provided runtime and formats it into a readable string.
   - Parameters:
     - `runtime` {IAgentRuntime} - The runtime information needed for the function to execute correctly.
   - Returns: {Promise<string>} - A promise that resolves with the formatted portfolio information as a string or an error message if fetching fails.

## Interfaces

### NearToken

Interface representing a Near Protocol token.

#### Properties
- `name` {string} - The name of the token
- `symbol` {string} - The symbol of the token
- `decimals` {number} - The number of decimals for the token
- `balance` {string} - The balance of the token
- `uiAmount` {string} - The UI amount of the token
- `priceUsd` {string} - The price of the token in USD
- `valueUsd` {string} - The value of the token in USD
- `valueNear` {string} (optional) - Optional value of the token in Near Protocol

### WalletPortfolio

Interface representing a wallet portfolio.

#### Properties
- `totalUsd` {string} - The total USD value in the portfolio.
- `totalNear` {string} (optional) - The total NEAR value in the portfolio (optional).
- `tokens` {Array<NearToken>} - An array of NearToken objects representing tokens in the portfolio.

## Code Examples

```typescript
// Example of creating a WalletProvider instance
const walletProvider = new WalletProvider("myAccountId");

// Example of fetching and formatting portfolio value
walletProvider.getFormattedPortfolio(myAgentRuntime)
  .then((formattedPortfolio) => {
    console.log(formattedPortfolio);
  })
  .catch((error) => {
    console.error(error);
  });

// Example of connecting to the NEAR wallet
walletProvider.connect(myAgentRuntime)
  .then((nearAccount) => {
    console.log("Connected to NEAR wallet:", nearAccount);
  })
  .catch((error) => {
    console.error("Error connecting to NEAR wallet:", error);
  });
```

### actions/transfer.ts

# actions/transfer.ts API Reference

## Interfaces

### TransferContent
Interface representing the content of a transfer.

Extends the Content interface.

- recipient: string - The recipient of the transfer.
- amount: string | number - The amount to transfer.
- tokenAddress: string (optional) - Optional field for native NEAR transfers.

## Functions

### isTransferContent
Check if the provided content is a TransferContent object.

- Parameters:
  - runtime: IAgentRuntime - The runtime object.
  - content: any - The content to be checked.
- Returns:
  - boolean - Returns true if the content is a TransferContent object, false otherwise.

### transferNEAR
Transfer NEAR tokens to a specified recipient.

- Parameters:
  - runtime: IAgentRuntime - The Agent Runtime instance.
  - recipient: string - The NEAR account ID of the recipient.
  - amount: string - The amount of NEAR tokens as a string.
- Returns:
  - Promise<string> - A Promise that resolves to the transaction hash of the transfer.
- Throws:
  - Error - If NEAR wallet credentials are not configured.

## Code Example

```typescript
import { IAgentRuntime } from 'runtime';

const isTransferContent = (runtime: IAgentRuntime, content: any): boolean => {
  // Check if content is TransferContent object
}

const transferNEAR = async (runtime: IAgentRuntime, recipient: string, amount: string): Promise<string> => {
  // Transfer NEAR tokens to recipient
}

// Usage
const runtime: IAgentRuntime = new AgentRuntime();
const recipient: string = 'example.near';
const amount: string = '10';

if (isTransferContent(runtime, { recipient, amount })) {
  const transactionHash = await transferNEAR(runtime, recipient, amount);
  console.log('Transfer successful. Transaction hash:', transactionHash);
} else {
  console.error('Content is not a TransferContent object.');
}
``` 

This is the API reference documentation for the actions/transfer.ts file.

### environment.ts

# Environment API Reference Documentation

## Types

### NearConfig

```typescript
/**
* Type definition for the configuration of NEAR Environment.
*/
interface NearConfig {
  networkId: string;
  nodeUrl: string;
  walletUrl: string;
  WRAP_NEAR_CONTRACT_ID: string;
  REF_FI_CONTRACT_ID: string;
  REF_TOKEN_ID: string;
  indexerUrl: string;
  explorerUrl: string;
  REF_DCL_SWAP_CONTRACT_ID: string;
}
```

## Functions

### getConfig

```typescript
/**
* Retrieves the configuration based on the specified environment or uses default values if not provided.
* @param {string | undefined | null} env - The environment to retrieve the configuration for.
* @returns {NearConfig} The configuration object containing networkId, nodeUrl, walletUrl, WRAP_NEAR_CONTRACT_ID, REF_FI_CONTRACT_ID,
* REF_TOKEN_ID, indexerUrl, explorerUrl, and REF_DCL_SWAP_CONTRACT_ID based on the specified environment. If no valid environment is provided,
* default values for the mainnet environment are returned.
*/
function getConfig(env: string | undefined | null): NearConfig;
```

### validateNearConfig

```typescript
/**
* Validates the NEAR configuration based on the provided runtime and environment variables.
* @param {IAgentRuntime} runtime - The Agent Runtime interface.
* @returns {Promise<NearConfig>} A Promise that resolves to a valid NearConfig object.
*/
function validateNearConfig(runtime: IAgentRuntime): Promise<NearConfig>;
```

## Usage Example

```typescript
const env = 'testnet';
const config = getConfig(env);
console.log(config);
// Output: 
// {
//   networkId: 'testnet',
//   nodeUrl: 'https://testnetnode.url',
//   walletUrl: 'https://testnetwallet.url',
//   WRAP_NEAR_CONTRACT_ID: 'wrap.near',
//   REF_FI_CONTRACT_ID: 'ref.fi',
//   REF_TOKEN_ID: 'token.id',
//   indexerUrl: 'https://testnetindexer.url',
//   explorerUrl: 'https://testnetexplorer.url',
//   REF_DCL_SWAP_CONTRACT_ID: 'dcl.swap'
// }
``` 

## Summary

The `environment.ts` file provides type definitions for NEAR Environment configurations and functions to retrieve and validate these configurations. The `NearConfig` interface defines the structure of a NEAR configuration object. The `getConfig` function retrieves the configuration based on the specified environment or defaults to mainnet values. The `validateNearConfig` function validates a NEAR configuration based on runtime and environment variables.

### actions/swap.ts

# actions/swap.ts API Reference

---

## Functions

### checkStorageBalance

Asynchronously checks the storage balance for a given account within a specified contract.

- Parameters:
  - `account: any` - The account for which the storage balance needs to be checked.
  - `contractId: string` - The ID of the contract to check the storage balance within.

- Returns:
  - `Promise<boolean>` - A Promise that resolves to `true` if the storage balance is not null and the total is not "0", `false` otherwise.

### swapToken

Perform a token swap using the provided input and output tokens, amount, and slippage tolerance.

- Parameters:
  - `runtime: IAgentRuntime` - The Agent Runtime instance.
  - `inputTokenId: string` - The ID of the input token.
  - `outputTokenId: string` - The ID of the output token.
  - `amount: string` - The amount of tokens to swap.
  - `slippageTolerance: number = 0.01` - The allowed slippage tolerance for the swap.

- Returns:
  - `Promise<any>` - An array of transactions representing the swap process.

---

## Interfaces and Types

### IAgentRuntime
```typescript
interface IAgentRuntime {
  // Interface properties and methods go here
}
```

---

## Code Examples

### Example 1: Using checkStorageBalance function
```typescript
const account = 'myAccount';
const contractId = 'myContract';
checkStorageBalance(account, contractId)
  .then((result) => {
    console.log(result); // true or false
  })
  .catch((error) => {
    console.error(error);
  });
```

### Example 2: Using swapToken function
```typescript
const runtime = // Initialize Agent Runtime instance
const inputTokenId = 'tokenA';
const outputTokenId = 'tokenB';
const amount = '100';
const slippageTolerance = 0.02;
swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
  .then((transactions) => {
    console.log(transactions); // Array of transaction objects
  })
  .catch((error) => {
    console.error(error);
  });
```
## TODO Items
1. TODO Comment: TODO: add functionality to support multiple networks
2. Context: The current implementation of the `swapToken` function only supports a single network specified in the `NEAR_NETWORK` runtime setting. To add support for multiple networks, the function needs to be modified to dynamically handle different network configurations based on user input or environment variables.
3. Tag: Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common issues and their solutions
1. **Issue**: Missing package dependencies causing module import errors.
   **Solution**: Check package.json for correct dependencies and run `npm install` to install missing packages.

2. **Issue**: Errors in error handling methods like `connect` or `fetchPortfolioValue`.
   **Solution**: Double-check the error handling logic in the methods and ensure proper error throwing and catching mechanisms are in place.

## Error messages and their meanings
1. **Error Message**: `Error: NEAR wallet credentials are not properly configured.`
   **Meaning**: The NEAR wallet credentials in the runtime object are incorrect or missing.
   
2. **Error Message**: `Error: Failed to fetch portfolio value.`
   **Meaning**: A problem occurred while fetching or processing the portfolio value.

## Debugging tips
- Use `console.log()` statements to track the flow of execution and identify where errors occur.
- Utilize `try/catch` blocks to catch and handle errors more effectively.

## Configuration problems
- Ensure that the NEAR wallet credentials are correctly configured in the runtime object.
- Check for any typos or syntax errors in the configuration settings.

## Compatibility issues
- Make sure that all package versions are compatible with each other and with the runtime environment.
- Check for any known compatibility issues between different libraries used in the project.

## Performance optimization
- Consider caching data where possible to reduce the number of fetch requests and improve performance.
- Optimize error handling methods to handle exceptions efficiently without impacting performance.

## FAQ section
**Q**: Why am I getting a 'NEAR wallet credentials not properly configured' error?
**A**: This error occurs when the NEAR wallet credentials in the runtime object are incorrect or missing. Double-check the credentials and try again.

**Q**: How can I improve the performance of my fetch operations?
**A**: Consider implementing caching and optimizing error handling methods to reduce the impact on performance.

**Q**: What should I do if I encounter compatibility issues with package dependencies?
**A**: Ensure that all package versions are compatible with each other and with the runtime environment. Check for any known compatibility issues and consider updating packages if necessary.

---
By following the troubleshooting guide provided above, you should be able to effectively tackle common issues, understand error messages, debug effectively, resolve configuration problems, deal with compatibility issues, optimize performance, and find answers to frequently asked questions related to the package dependencies and error handling in the methods.
