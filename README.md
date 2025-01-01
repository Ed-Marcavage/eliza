# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package serves as a comprehensive toolkit for interacting with NEAR Protocol wallets. It includes classes, interfaces, types, and functions to facilitate operations such as portfolio management, token transfers, and configuration handling.

### Key Features
- `WalletProvider`: Implements the Provider interface for interacting with NEAR wallets.
- `TransferContent`: Represents a transfer of content with recipient, amount, and optional tokenAddress.
- `NearToken`: Represents a NEAR token with various properties like name, balance, and value.
- `WalletPortfolio`: Represents a wallet portfolio with total values and token array.
- `NearConfig`: Defines a type inferred from the `nearEnvSchema`.
- `checkStorageBalance`: Asynchronously checks the storage balance for a given account.
- `swapToken`: Performs a token swap transaction on the NEAR protocol.
- `isTransferContent`: Checks if given content is a TransferContent object.
- `transferNEAR`: Transfers NEAR tokens from the wallet to a recipient account.
- `getConfig`: Returns the configuration based on the provided environment variable.
- `validateNearConfig`: Validates the Near configuration based on runtime settings.

## Installation
### Installation and Integration Instructions for @elizaos/plugin-near

#### 1. Adding the plugin to your ElizaOS project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- In the terminal, navigate to the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

#### 2. Importing and Using the plugin:
- Import the plugin using: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add it to the AgentRuntime plugins array in your project

#### 3. Integration Example:
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

#### 4. Verification Steps:
- Ensure you see ["✓ Registering action: executeSwap"] and ["✓ Registering action: executeTransfer"] in the console for successful integration

**Note**: This plugin is designed for the ElizaOS agent system and needs to be added to the agent/package.json of your project to work properly.

## Configuration
# Configuration Documentation

In order to configure the application, you will need to set the following environment variables in a .env file. Make sure to add the .env file to your .gitignore to ensure sensitive information is not committed to the repository.

## Required Environment Variables

- **NEAR_ENV**: Used as a fallback if the process.env.NEAR_ENV is not set.
- **REACT_APP_REF_SDK_ENV**: Used to determine the React app reference SDK environment.
- **NEAR_WALLET_SECRET_KEY**: The secret key for the NEAR wallet.
- **NEAR_WALLET_PUBLIC_KEY**: The public key for the NEAR wallet.
- **NEAR_ADDRESS**: The NEAR address, using runtime settings as a fallback.
- **SLIPPAGE**: The slippage setting, using runtime settings or process.env as a fallback.
- **RPC_URL**: The RPC URL, using runtime settings or process.env as a fallback.
- **NEAR_NETWORK**: The NEAR network ID, defaulting to "testnet" if not set.

## Example .env File
```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=mysecretkey123
NEAR_WALLET_PUBLIC_KEY=mypublickey456
NEAR_ADDRESS=myaddress123
SLIPPAGE=0.5
RPC_URL=https://rpc.testnet.near.org
NEAR_NETWORK=testnet
```

This .env file provides a basic example of how to set the required environment variables for the application. Be sure to adjust the values to match your specific configuration needs.

## Features

### Actions
### [action name - found in the name: swap]

Perform a token swap using Ref Finance.

#### Properties
- Name: swap
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using Ref Finance by estimating the swap, checking storage balance, creating transactions, and executing the swap.

#### Examples
- user: "Example user request"
- agent: "Example agent response"

### [action name - found in the name: SEND_NEAR]

Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: [TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR]

#### Handler
This handler is responsible for transferring NEAR tokens between accounts.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- user: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
This provider allows you to fetch and display information about a NEAR Protocol wallet, including token balances and values.

#### Methods
The `get()` method is used to retrieve and format the portfolio information from the NEAR wallet.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

// Example of how to use the Wallet Provider
const accountId = "example.near";
const runtime: IAgentRuntime = {/* Agent Runtime object */};
const message: Memory = {/* Memory object */};
const state: State = {/* State object */};

walletProvider.get(runtime, message, state)
    .then((portfolioInfo) => {
        console.log(portfolioInfo);
    })
    .catch((error) => {
        console.error(error);
    });
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. **Fetching Portfolio Value**: Using the `fetchPortfolioValue` method to retrieve the current value of a wallet portfolio, including total USD value and total NEAR balance.
```typescript
const walletProvider = new WalletProvider("exampleAccount");
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
```

2. **Formatting Portfolio**: Utilizing the `getFormattedPortfolio` method to format the user's portfolio information for display.
```typescript
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

### Best Practices
- **Error Handling**: Ensure to catch any errors that may occur during data fetching or formatting to provide a smooth user experience.
- **Caching Strategy**: Implement a proper caching strategy for data that is frequently accessed to improve performance.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens from one account to another using the `transferNEAR` function:
```typescript
const recipient = "recipient.near";
const amount = "10";
const transactionHash = await transferNEAR(runtime, recipient, amount);
console.log(transactionHash);
```

2. Check if a given content is a `TransferContent` object using the `isTransferContent` function:
```typescript
const content = {
  recipient: "recipient.near",
  amount: "10",
  tokenAddress: "token.near"
};

const isTransfer = isTransferContent(runtime, content);
console.log(isTransfer); // Output: true
```

### Best Practices
- Ensure that you have configured NEAR wallet credentials before using the `transferNEAR` function.
- Use the `isTransferContent` function to validate content before processing it as a `TransferContent` object.

### environment.ts

### Common Use Cases
1. Create a NearConfig object and retrieve configuration based on environment variables.
```typescript
import { NearConfig, getConfig } from './environment';

const nearConfig: NearConfig = getConfig(process.env.NODE_ENV);
console.log(nearConfig);
```

2. Validate the Near configuration based on provided runtime settings.
```typescript
import { validateNearConfig } from './environment';

async function validateConfig() {
  const runtimeSettings = {} // Assume runtime settings object here
  const nearConfig = await validateNearConfig(runtimeSettings);
  console.log(nearConfig);
}

validateConfig();
```

### Best Practices
- Always provide a valid environment variable to the `getConfig` function for accurate configuration retrieval.
- Ensure that the runtime settings object passed to `validateNearConfig` contains all the necessary information for validation.

### actions/swap.ts

- Perform a token swap transaction by calling the `swapToken` function with the necessary parameters:
```typescript
const runtime: IAgentRuntime = getAgentRuntime(); // Assuming getAgentRuntime() function is defined
const inputTokenId: string = "token1";
const outputTokenId: string = "token2";
const amount: string = "10";
const slippageTolerance: number = 0.01;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
    .then((transactions) => {
        console.log("Swap transaction successful:", transactions);
    })
    .catch((error) => {
        console.error("Error performing swap transaction:", error);
    });
```

- Check the storage balance for a specific account by calling the `checkStorageBalance` function with the account and contract ID:
```typescript
const account: any = {
    accountId: "user123",
    balance: "1000" // Example balance
};
const contractId: string = "contract1";

checkStorageBalance(account, contractId)
    .then((isValid) => {
        if (isValid) {
            console.log("Storage balance is valid for account:", account.accountId);
        } else {
            console.log("Insufficient storage balance for account:", account.accountId);
        }
    })
    .catch((error) => {
        console.error("Error checking storage balance:", error);
    });
``` 

### Best Practices
- Use proper error handling when calling async functions like `swapToken` and `checkStorageBalance` to handle any potential errors that may occur during the execution.
- Ensure that the necessary parameters are passed correctly to the functions to avoid any unexpected behavior or errors.

## API Reference
### providers/wallet.ts

### Classes

#### WalletProvider
/**
 * WalletProvider class that implements the Provider interface for interacting
 * with a NEAR wallet. This class handles fetching portfolio value, connecting
 * to the wallet, and formatting the portfolio for display.
 * @implements {Provider}
 */

- constructor: 
```typescript
/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The account ID associated with the instance.
 */
```

- get:
```typescript
/**
 * Retrieves the formatted portfolio using the given runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime used to retrieve the portfolio.
 * @param {Memory} _message - The memory object.
 * @param {State} [_state] - The state object (optional).
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */
```

- connect:
```typescript
/**
 * Connects to NEAR blockchain using the provided IAgentRuntime.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime instance used to retrieve NEAR wallet settings.
 * @returns {Promise} A Promise that resolves with the NEAR account after successful connection.
 * @throws {Error} If NEAR wallet credentials are not configured or if connection fails.
 */
```

- fetchWithRetry:
```typescript
/**
 * Fetches data from a specified URL with retry logic in case of errors.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
```

- fetchPortfolioValue:
```typescript
/**
 * Asynchronously fetches the current value of the portfolio, including total USD value, total NEAR balance,
 * and information on the NEAR Protocol token. If the portfolio value is found in the cache, it will be
 * returned from the cache. Otherwise, it will fetch the account balance, convert the NEAR balance to NEAR,
 * fetch the NEAR price in USD, calculate the total value in USD, and construct a WalletPortfolio object
 * containing the necessary information. The resulting portfolio value is also stored in the cache. 
 * 
 * @param {IAgentRuntime} runtime - The runtime in which the portfolio value is being fetched
 * @returns {Promise<WalletPortfolio>} The resulting portfolio value including total USD value, total NEAR balance,
 * and information on NEAR Protocol token
 */
```

- fetchNearPrice:
```typescript
/**
 * Fetches the near price from the Coingecko API.
 * If the price is cached, it will return the cached value.
 * If not, it will make a request to the API and cache the result.
 * If an error occurs during the process, it will return 0.
 * 
 * @returns {Promise<number>} The near price in USD.
 */
```

- formatPortfolio:
```typescript
/**
 * Format the user's portfolio information into a string for display.
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {WalletPortfolio} portfolio - The user's wallet portfolio.
 * @return {string} - The formatted string containing portfolio information.
 */
```

- getFormattedPortfolio:
```typescript
/**
 * Asynchronously retrieves the formatted portfolio value using the provided agent runtime.
 * @param {IAgentRuntime} runtime - The agent runtime object to use for fetching portfolio information.
 * @returns {Promise<string>} A Promise that resolves to a string representing the formatted portfolio value.
 */
```

### Interfaces

#### NearToken
/**
 * Interface representing a NearToken.
 *
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The decimals of the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR.
 */

#### WalletPortfolio
/**
 * Interface representing a wallet portfolio.
 *
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total USD value in the portfolio.
 * @property {string} [totalNear] - The optional total NEAR value in the portfolio.
 * @property {Array<NearToken>} tokens - An array of NearToken objects in the portfolio.
 */

### actions/transfer.ts

### Classes

[ No classes in this file ]

### Interfaces

#### TransferContent
/**
 * Interface representing a transfer of content, extending the base Content interface.
 * @interface
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string|number} amount - The amount of the transfer.
 * @property {string} [tokenAddress] - Optional parameter for native NEAR transfers.
 */

### Types

[ No custom types in this file ]

### Functions

#### isTransferContent
```typescript
/**
 * Checks if the given content is a TransferContent object.
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {*} content - The content to be checked.
 * @returns {boolean} - Returns true if the content is a TransferContent object, false otherwise.
 */
 ```

#### transferNEAR
```typescript
/**
 * Transfer NEAR tokens from the wallet to a recipient account.
 *
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {string} recipient - The account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - The transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
 ```


This is a comprehensive API reference for the file "actions/transfer.ts" including interface definitions and function descriptions with method signatures and parameters.

### environment.ts

### Classes

### Interfaces

### Types

- NearConfig: 
```typescript
/**
 * Define a type `NearConfig` that is inferred from the `nearEnvSchema`.
 */
type NearConfig = {
    // define properties here
};
```

### Functions

- getConfig: 
```typescript
/**
 * Returns the configuration based on the provided environment variable or defaults to ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV.
 * @param {string | undefined | null} [env=ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV] - The environment variable to determine the configuration.
 * @returns {object} - The configuration object based on the environment variable.
 */
function getConfig(env?: string | undefined | null): object {
    // implementation here
}
```

- validateNearConfig: 
```typescript
/**
 * Validates the Near configuration based on the provided runtime settings.
 * @param {IAgentRuntime} runtime - The agent runtime object to retrieve settings from.
 * @returns {Promise<NearConfig>} The validated Near configuration object.
 */
async function validateNearConfig(runtime: IAgentRuntime): Promise<NearConfig> {
    // implementation here
}
``` 

In this API, `NearConfig` is a type that represents the configuration settings for Near. The `getConfig` function retrieves the configuration based on the provided environment variable, and the `validateNearConfig` function validates the Near configuration based on the provided runtime settings.

### actions/swap.ts

### Classes

N/A

### Interfaces

N/A

### Types

N/A

### Functions

```typescript
/**
 * Asynchronously checks the storage balance for a given account.
 * 
 * @param {any} account - The account object to check the storage balance for.
 * @param {string} contractId - The contract ID where the storage balance should be checked.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating whether the storage balance is valid.
 */
function checkStorageBalance(account: any, contractId: string): Promise<boolean> {
    // Implementation goes here
}

/**
 * Performs a token swap transaction on the NEAR protocol.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} inputTokenId - The token ID of the input token.
 * @param {string} outputTokenId - The token ID of the output token.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} slippageTolerance - The slippage tolerance for the swap transaction (default: 0.01).
 * @returns {Promise<any>} - A promise that resolves with an array of transaction objects representing the swap operations.
 */
function swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number = 0.01): Promise<any> {
    // Implementation goes here
}
``` 

The `checkStorageBalance` function asynchronously checks the storage balance for a given account. It takes an account object and a contract ID as parameters and returns a Promise that resolves to a boolean indicating whether the storage balance is valid.

The `swapToken` function performs a token swap transaction on the NEAR protocol. It takes the agent runtime interface, input token ID, output token ID, amount of input token to swap, and optional slippage tolerance as parameters. It returns a Promise that resolves with an array of transaction objects representing the swap operations.

## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: To enable swapping on various networks
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Wallet not connecting
   - Cause: NEAR wallet credentials are not configured.
   - Solution: Make sure to set the NEAR wallet credentials (NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY) in the runtime settings.

### Debugging Tips
- Check if the NEAR wallet credentials are correctly configured.
- Monitor the console for any error messages when connecting to the NEAR blockchain.

### FAQ
Q: How do I validate the Near configuration?
A: You can validate the Near configuration by using the `validateNearConfig` function provided in the environment module. This function retrieves the necessary settings from the runtime and ensures that the Near configuration is valid.