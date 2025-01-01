# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package is designed to provide functionality for interacting with the NEAR Protocol blockchain. It includes classes, interfaces, types, and functions for managing NEAR tokens, wallets, and transactions. Developers can use this plugin to facilitate token swaps, transfers, portfolio management, and configuration validation within their NEAR Protocol applications.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: N/A

### Key Features

- **WalletProvider Class:** Represents a Wallet Provider that implements the Provider interface.
- **TransferContent Interface:** Defines the content for a transfer operation, including recipient, amount, and optional token address.
- **NearToken Interface:** Represents a NEAR Protocol token with properties like name, symbol, balance, and price information.
- **WalletPortfolio Interface:** Describes a wallet portfolio with total values and a list of token objects.
- **NearConfig Type:** Definition for NearConfig object inferred from nearEnvSchema.
- **checkStorageBalance Function:** Checks the storage balance of an account in a contract.
- **swapToken Function:** Swaps tokens on NEAR protocol based on input and output token IDs, amount, and slippage tolerance.
- **isTransferContent Function:** Checks if the content is a TransferContent object.
- **transferNEAR Function:** Transfers NEAR tokens from the current account to a specified recipient.
- **getConfig Function:** Returns the configuration object based on the provided environment.
- **validateNearConfig Function:** Validates the Near configuration based on the provided runtime and environment settings.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

## 1. Adding the Plugin to Your ElizaOS Project

- Add the following to your `agent/package.json` dependencies:
  
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```

- Run the following commands:
  1. cd agent/
  2. pnpm install
  3. pnpm build

## 2. Importing and Using the Plugin

- Import the plugin using:
  
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```

- Add it to the AgentRuntime plugins array:

  ```typescript
  return new AgentRuntime({
      // other configuration...
      plugins: [
          nearPlugin,
          // other plugins...
      ],
  });
  ```

## 3. Integration Example

Here is an example showing the complete setup:

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

## 4. Verification

Ensure successful integration by checking the console for the message: ["✓ Registering action: <plugin actions>"]

---

Be sure to follow the steps carefully to successfully integrate the NEAR Protocol Plugin for Eliza into your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables and Purpose

1. `NEAR_ENV`: This environment variable is used to set the environment for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: This environment variable is used in the React application for the reference SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: This environment variable stores the secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: This environment variable stores the public key for the NEAR wallet.
5. `NEAR_ADDRESS`: This environment variable is used to set the NEAR address.
6. `SLIPPAGE`: This environment variable is used to set the slippage value.
7. `RPC_URL`: This environment variable is used to set the RPC URL.
8. `NEAR_NETWORK`: This environment variable sets the network ID for NEAR protocol.

## Example .env File

```
NEAR_ENV=
REACT_APP_REF_SDK_ENV=
NEAR_WALLET_SECRET_KEY=
NEAR_WALLET_PUBLIC_KEY=
NEAR_ADDRESS=
SLIPPAGE=
RPC_URL=
NEAR_NETWORK=
``` 

Please ensure this .env file is set in the .gitignore file to avoid committing sensitive information to the repository. Configuration can be done in the .env file according to the purpose of each environment variable.

## Features

### Actions
### [action name - found in the name: EXECUTE_SWAP_NEAR]

Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using Ref Finance by connecting to the NEAR blockchain, validating parameters, and executing the swap transactions.

#### Examples
- user: "example user request"
- agent: "example agent response"

### [action name - found in the name: transfer]

Transfers NEAR tokens to another account

#### Properties
- Name: transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
The handler for this action transfers NEAR tokens to another account based on the provided recipient and amount.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### WalletProvider
This provider allows fetching and formatting wallet information including token balances and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "near_account_id";

const result = await walletProvider.get({
  getSetting: (setting: string) => {
    if (setting === "NEAR_ADDRESS") {
      return accountId;
    }
    throw new Error("Setting not found");
  }
}, {}, {});

console.log(result);
```  



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Creating a WalletProvider instance and connecting to a NEAR protocol:
```typescript
import { WalletProvider } from './providers/wallet';

const walletProvider = new WalletProvider();
const nearAccount = await walletProvider.connect(runtime);
```

2. Fetching and formatting the portfolio value:
```typescript
import { WalletProvider } from './providers/wallet';

const walletProvider = new WalletProvider();
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

### Best Practices
- Ensure that NEAR wallet credentials are properly configured before connecting to the NEAR protocol.
- Implement caching mechanisms to improve performance when fetching portfolio data.

### actions/transfer.ts

### Common Use Cases
1. Performing a NEAR token transfer to another account:
```typescript
import { IAgentRuntime } from 'path/to/runtime';
import { transferNEAR } from 'path/to/transfer';

const runtime: IAgentRuntime;
const recipient = 'receiver.near';
const amount = '10';
transferNEAR(runtime, recipient, amount)
    .then((txHash) => {
        console.log(`Transfer successful. Transaction hash: ${txHash}`);
    })
    .catch((err) => {
        console.error(`Error transferring NEAR tokens: ${err.message}`);
    });
```

2. Checking if a given content is a TransferContent object:
```typescript
import { IAgentRuntime } from 'path/to/runtime';
import { isTransferContent } from 'path/to/transfer';

const runtime: IAgentRuntime;
const content = {
    recipient: 'receiver.near',
    amount: '10',
    tokenAddress: 'token.address'
};

if (isTransferContent(runtime, content)) {
    console.log('Content is a TransferContent object.');
} else {
    console.log('Content is not a TransferContent object.');
}
```

### Best Practices
- Ensure to handle errors appropriately in the promise chain when using `transferNEAR` to catch any exceptions that might occur during the token transfer operation.
- Validate the content before using the `isTransferContent` function to ensure that it contains the necessary properties defined in the TransferContent interface.

### environment.ts

### Common Use Cases
1. **Get Configuration Object**: You can use the `getConfig` function to get the configuration object based on the provided environment or fallback to environment variables.
   
   ```typescript
   import { getConfig } from './environment';

   const configuration = getConfig('production');
   console.log(configuration);
   ```

2. **Validate Near Configuration**: Use the `validateNearConfig` function to validate the Near configuration based on the provided runtime and environment settings.

   ```typescript
   import { validateNearConfig } from './environment';

   const runtime = { /* your runtime settings */ };
   validateNearConfig(runtime)
     .then((validatedConfig) => {
       console.log('Validation successful:', validatedConfig);
     })
     .catch((error) => {
       console.error('Validation failed:', error);
     });
   ```

### Best Practices
- **Document your configuration settings**: Ensure you document all the required environment variables and configurations to avoid confusion for other developers using your codebase.
- **Handle fallback gracefully**: When using the `getConfig` function, make sure to handle cases where no environment is provided or no environment variables are set by gracefully falling back to default values or providing clear error messages for configuration.

### actions/swap.ts

### Common Use Cases
1. Using `checkStorageBalance` to check the storage balance of an account in a contract before performing any storage-related operations.
```typescript
const account = new Account();
const contractId = "exampleContract";
checkStorageBalance(account, contractId)
    .then((hasBalance) => {
        if (hasBalance) {
            // Proceed with storage operation
        } else {
            // Handle case where storage balance is insufficient
        }
    });
```

2. Using `swapToken` to swap tokens on the NEAR protocol based on specified input and output tokens, amount, and slippage tolerance.
```typescript
const runtime = new AgentRuntime();
const inputTokenId = "near";
const outputTokenId = "dai";
const amount = "10";
const slippageTolerance = 0.05; // Higher slippage tolerance of 5%
swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
    .then((transactions) => {
        // Execute the transactions for the token swap
    });
```

### Best Practices
- Always handle the promises returned by the functions to properly manage the asynchronous behavior and errors.
- Provide meaningful error handling and user feedback when using these functions to ensure smooth interaction with the NEAR protocol.

## API Reference
### providers/wallet.ts

### Classes

- WalletProvider: 
/**
 * A class representing a Wallet Provider that implements the Provider interface.
 */

#### Methods

- constructor: 
/**
 * Constructor for creating a new instance of the Account class.
 * @param {string} accountId - The unique identifier for the account.
 */

- get: 
/**
 * Asynchronously retrieves the formatted portfolio using the provided agent runtime.
 *
 * @param {IAgentRuntime} runtime - The agent runtime used to retrieve the portfolio.
 * @param {Memory} _message - The memory parameter (unused).
 * @param {State} [_state] - Optional state parameter.
 * @returns {Promise<string | null>} The formatted portfolio string, or null if an error occurs.
 */
  
- connect: 
/**
 * Connects to NEAR protocol using the given agent runtime and sets up the account if not already set.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to connect with.
 * @returns {Promise} Returns the NEAR account object.
 * @throws Error if NEAR wallet credentials are not configured.
 */

- fetchWithRetry: 
/**
 * Fetches data from a specified URL with retry mechanism in case of failure.
 * 
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} options - The options for the fetch request, default is an empty object.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */

- fetchPortfolioValue: 
/**
 * Fetches the current value of the portfolio for the account associated with this wallet.
 * Retrieves the balance of NEAR tokens, converts it to USD, fetches the NEAR price in USD,
 * and constructs a WalletPortfolio object containing the total USD value, total NEAR balance,
 * and token details for NEAR Protocol.
 * Uses caching to improve performance by storing and retrieving previously fetched portfolio data.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime instance used for connecting to the NEAR blockchain.
 * @returns {Promise<WalletPortfolio>} A Promise that resolves to a WalletPortfolio object representing the current portfolio value.
 * @throws {Error} If an error occurs during the fetching process, it is caught and rethrown with an appropriate error message.
 */

- fetchNearPrice: 
/**
 * Asynchronously fetches the current NEAR token price in USD.
 * Utilizes a cache to store and retrieve the price efficiently.
 * If the price is found in the cache, it is returned.
 * If not, calls an API endpoint to fetch the price and stores it in the cache for future use.
 * @returns {Promise<number>} The current NEAR token price in USD, or 0 if an error occurs.
 */

- formatPortfolio: 
/**
 * Formats the portfolio data into a string for display.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime information.
 * @param {WalletPortfolio} portfolio - The portfolio data to format.
 * @returns {string} The formatted portfolio information.
 */

- getFormattedPortfolio: 
/**
 * Asynchronously retrieves the portfolio value using the provided IAgentRuntime.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime object used for fetching portfolio value.
 * @returns {Promise<string>} A Promise that resolves with a formatted string of the portfolio value,
 * or a message indicating failure to fetch wallet information.
 */


### Interfaces

- NearToken: 
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for UI display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string=} valueNear - The value of the token in NEAR Protocol cryptocurrency (optional).
 */

- WalletPortfolio: 
/**
 * Interface representing a wallet portfolio.
 *
 * @property {string} totalUsd - The total USD value in the portfolio.
 * @property {string} [totalNear] - The optional total NEAR value in the portfolio.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing tokens in the portfolio.
 */


### Types

No additional types defined.


### Functions

No additional functions defined.

### actions/transfer.ts

### Classes

N/A

### Interfaces

- TransferContent: 
```typescript
/**
 * Interface representing the content for a transfer operation.
 * Extends the base Content interface.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string|number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### Types

N/A

### Functions

- isTransferContent: 
```typescript
/**
 * Checks if the given content is a TransferContent object.
 *
 * @param {IAgentRuntime} runtime - The runtime instance.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is a TransferContent, false otherwise.
 */
```

- transferNEAR:
```typescript
/**
 * Transfers NEAR tokens from the current account to the specified recipient.
 *
 * @param {IAgentRuntime} runtime - The execution runtime providing access to settings.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer in NEAR format.
 * @returns {Promise<string>} - A Promise that resolves to the transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not properly configured.
 */
```

### environment.ts

## Classes

No classes defined in this file.

## Interfaces

No interfaces defined in this file.

## Types

- NearConfig: 
```typescript
/**
 * Type definition for NearConfig object inferred from nearEnvSchema
 */
```

## Functions

- getConfig: 
```typescript
/**
* Function that returns the configuration object based on the provided environment.
* If no environment is provided, it falls back to ENV variable or process environment variables.
* @param {string | undefined | null} env - The environment to get the configuration for.
* @returns {object} - The configuration object based on the provided environment.
*/
```

- validateNearConfig: 
```typescript
/**
 * Validates the Near configuration based on the provided runtime and environment settings.
 * 
 * @param {IAgentRuntime} runtime The runtime containing the settings needed for validation.
 * @returns {Promise<NearConfig>} A Promise that resolves to the validated Near configuration.
 * @throws {Error} Throws an error if the configuration validation fails.
 */
```

### actions/swap.ts

### Functions

#### checkStorageBalance
```typescript
/**
 * Asynchronously checks the storage balance of an account in a contract.
 * 
 * @param {Account} account - The account to check the storage balance for.
 * @param {string} contractId - The ID of the contract to check the balance in.
 * @returns {Promise<boolean>} A promise that resolves to true if the storage balance is not null and total is not "0", false otherwise.
 */
checkStorageBalance(account: Account, contractId: string): Promise<boolean>
```

#### swapToken
```typescript
/**
 * Swap tokens on NEAR protocol based on input and output token IDs, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} inputTokenId - The ID of the input token to swap.
 * @param {string} outputTokenId - The ID of the output token to swap to.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap (default: 0.01).
 * @returns {Promise<any>} A promise that resolves with an array of transactions to execute for the swap.
 */
swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number = 0.01): Promise<any>
```

## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Function `swapToken` for swapping tokens
   - Type: feature

### Troubleshooting
### Common Issues
1. Missing NEAR Wallet Credentials
   - Cause: NEAR wallet credentials are not configured or provided.
   - Solution: Ensure that the NEAR wallet secret key and public key are properly configured in the runtime settings.

### Debugging Tips
- Check the NEAR wallet credentials configuration in the runtime settings.
- Verify that the NEAR wallet secret key and public key are correctly provided.

### FAQ
Q: How to connect to NEAR protocol using the provided agent runtime?
A: You can connect to NEAR protocol by calling the `connect` method in the `WalletProvider` class with the desired network settings and key store setup. Here is an example:
   ```javascript
   const nearConnection = await connect({
            networkId: PROVIDER_CONFIG.networkId,
            keyStore: this.keyStore,
            nodeUrl: PROVIDER_CONFIG.nodeUrl,
            walletUrl: PROVIDER_CONFIG.walletUrl,
            helperUrl: PROVIDER_CONFIG.helperUrl,
        });
    ```