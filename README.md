# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package is designed to provide a set of functionalities and utilities for interacting with the NEAR blockchain protocol. From transferring NEAR tokens to checking storage balances, this plugin offers a comprehensive toolkit for developers working with NEAR-based applications.

### Key Features
- **WalletProvider Class**: Represents a WalletProvider implementing the Provider interface.
- **Interfaces**: TransferContent, NearToken, WalletPortfolio for defining transfer content, NEAR tokens, and wallet portfolios.
- **Types**: NearConfig type definition for NEAR protocol configuration.
- **Functions**: checkStorageBalance, swapToken, isTransferContent, transferNEAR, getConfig, validateNearConfig for diverse blockchain operations.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the Plugin to Your ElizaOS Project:
1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. Navigate to the agent/ directory in your project.
3. Run `pnpm install` to install the new dependency.
4. Run `pnpm build` to build the project with the new plugin.

### 2. Importing and Using the Plugin:
- Import the plugin using:
   ```typescript
   import { nearPlugin } from "@elizaos/plugin-near";
   ```
- Add the plugin to the AgentRuntime plugins array in your project.

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
- Ensure that when the project is running, you see `✓ Registering action: <plugin actions>` in the console to confirm successful integration.

### Dependencies:
```json
{
  "@elizaos/core": "workspace:*",
  "@ref-finance/ref-sdk": "^1.4.6",
  "tsup": "8.3.5",
  "near-api-js": "5.0.1",
  "bignumber.js": "9.1.2",
  "node-cache": "5.1.2"
}
```

### Peer Dependencies:
```json
{
  "whatwg-url": "7.1.0",
  "form-data": "4.0.1"
}
``` 

By following these steps, you should have successfully installed and integrated the @elizaos/plugin-near plugin into your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose
1. `NEAR_ENV`: Specifies the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Specifies the environment for the React SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the runtime.
6. `SLIPPAGE`: Specifies the slippage setting for the runtime.
7. `RPC_URL`: URL for the RPC endpoint.
8. `NEAR_NETWORK`: Specifies the NEAR network.
9. `SLIPPAGE`: Specifies the slippage setting.
10. `SLIPPAGE`: Specifies the slippage setting.
11. `RPC_URL`: URL for the RPC endpoint.
12. `SLIPPAGE`: Specifies the slippage setting.

## Sample .env File
```dotenv
NEAR_ENV=
REACT_APP_REF_SDK_ENV=
NEAR_WALLET_SECRET_KEY=
NEAR_WALLET_PUBLIC_KEY=
NEAR_ADDRESS=
SLIPPAGE=
RPC_URL=
NEAR_NETWORK=
```

Please ensure to set these environment variables in the .env file and add the .env file to the .gitignore so it is not committed to the repository.

## Features

### Actions
### swap
Perform a token swap using Ref Finance.

#### Properties
- Name: swap
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
This action executes a token swap using Ref Finance by estimating the swap route and sending the swap transactions.

#### Examples
- user: "{{user1}}"
- agent: "{{agent1}}"
- user: "{{user2}}"
- agent: "{{agent2}}"
- user: "{{user2}}"
- agent: "{{agent3}}"

### transfer
Transfer NEAR tokens to another account

#### Properties
- Name: transfer
- Similes: ['TRANSFER_NEAR', 'SEND_TOKENS', 'TRANSFER_TOKENS', 'PAY_NEAR']

#### Handler
The handler function for this action executes a NEAR token transfer to the specified recipient account. It extracts the recipient address, amount to transfer, and optional token contract address (for non-native NEAR transfers) from the user request and initiates the transfer. It then provides a response with the transfer details or an error message if the transfer fails.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- user: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
This provider interacts with the NEAR Protocol blockchain to fetch wallet information and generate a formatted portfolio report.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "your_near_address_here";
const runtime: IAgentRuntime = // initialize your runtime object

walletProvider.get(runtime, null, null)
    .then((portfolioReport) => {
        console.log(portfolioReport);
    })
    .catch((error) => {
        console.error("Error fetching wallet information:", error);
    });
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching the current value of a wallet portfolio and formatting it for display:
```typescript
const walletProvider = new WalletProvider();
const runtime = getAgentRuntime();
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. Connecting to NEAR Protocol using the wallet provider:
```typescript
const walletProvider = new WalletProvider();
const runtime = getAgentRuntime();
const account = await walletProvider.connect(runtime);
console.log(account);
```

### Best Practices
- Ensure NEAR wallet credentials are correctly configured before connecting to NEAR Protocol.
- Handle errors appropriately when fetching data from external APIs to prevent application crashes.

### actions/transfer.ts

### Common Use Cases
1. **Transfer NEAR tokens to a recipient:** This code can be used to transfer a specified amount of NEAR tokens to a recipient.
    ```javascript
    const recipient = "example.recipient";
    const amount = "10";
    const transactionHash = await transferNEAR(runtime, recipient, amount);
    console.log(transactionHash);
    ```

2. **Check if content is of type TransferContent:** This code can be used to determine if the provided content is of type TransferContent.
    ```javascript
    const content = {
        recipient: "example.recipient",
        amount: "20"
    };
    const isTransfer = isTransferContent(runtime, content);
    console.log(isTransfer);
    ```

### Best Practices
- **Validate content before transfer:** Always ensure that the content passed to the transfer function is of the proper type (TransferContent) to avoid errors during the transfer process.
- **Handle errors appropriately:** In case of errors such as missing NEAR wallet credentials, handle them gracefully by catching and handling the exceptions appropriately to provide a better user experience.

### environment.ts

### Common Use Cases
1. Retrieving configuration object based on environment:
```typescript
import { getConfig } from './environment';

const environment = 'production';
const config = getConfig(environment);
console.log(config); // Output: Configuration object for production environment
```

2. Validating NEAR configuration:
```typescript
import { validateNearConfig } from './environment';
import { IAgentRuntime } from 'runtime';

const runtime: IAgentRuntime = // Define runtime
validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log(nearConfig); // Output: Validated NearConfig object
  });
```

### Best Practices
- Use the `getConfig` function to easily retrieve the configuration object based on different environments.
- Ensure to pass the correct runtime object when validating NEAR configuration using the `validateNearConfig` function.

### actions/swap.ts

### Common Use Cases
1. Checking storage balance before performing a token swap:
```typescript
const account = "alice";
const contractId = "tokenContract";
const hasStorageBalance = await checkStorageBalance(account, contractId);
if (hasStorageBalance) {
    console.log("Account has non-zero storage balance.");
} else {
    console.log("Account has zero storage balance.");
}
```

2. Performing a token swap transaction with specified input and output tokens:
```typescript
const runtime = new AgentRuntime();
const inputTokenId = "tokenA";
const outputTokenId = "tokenB";
const amount = "10";
const slippageTolerance = 0.02;
const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log("Token swap transactions:", swapTransactions);
```

### Best Practices
- Always handle the asynchronous nature of the functions by using `await` with `Promise` returns.
- Ensure that the input parameters provided to the functions are valid and of the correct type to avoid errors.

## API Reference
### providers/wallet.ts

### Classes

- WalletProvider: 
  /**
   * Class representing a WalletProvider that implements the Provider interface.
   * @implements {Provider}
   */

  - constructor: 
    /**
    * Constructor for creating a new instance of the class.
    * @param {string} accountId - The unique identifier for the account.
    */
  
  - get: 
    /**
     * Asynchronously retrieves a formatted portfolio from the wallet provider.
     * 
     * @param {IAgentRuntime} runtime - The agent runtime environment.
     * @param {Memory} _message - The memory message object.
     * @param {State} [_state] - Optional state object.
     * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
     */
  
  - connect: 
    /**
     * Connects to NEAR Protocol using the provided runtime.
     * 
     * @param {IAgentRuntime} runtime - The agent runtime to use.
     * @returns {Promise<Account>} The NEAR Protocol account.
     * @throws {Error} If NEAR wallet credentials are not configured.
     */
  
  - fetchWithRetry: 
    /**
     * Fetches data from a URL with retry mechanism.
     * @param {string} url - The URL to fetch data from.
     * @param {RequestInit} [options={}] - Optional fetch options.
     * @returns {Promise<any>} A promise that resolves with the fetched data or rejects with an error.
     */
  
  - fetchPortfolioValue: 
    /**
     * Fetches the current value of the portfolio for the wallet.
     * 
     * @param {IAgentRuntime} runtime - The runtime interface for interacting with the agent.
     * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio value.
     */
  
  - fetchNearPrice: 
    /**
     * Fetches the current NEAR price from the Coingecko API.
     * If the price is available in the cache, it is returned from there.
     * Otherwise, the price is fetched from the API, saved in the cache, and returned.
     * @returns {Promise<number>} The NEAR price in USD.
     */
  
  - formatPortfolio: 
    /**
     * Formats the given portfolio data into a readable string format.
     * 
     * @param {IAgentRuntime} runtime - The runtime information for the agent.
     * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
     * @returns {string} - The formatted string representing the portfolio data.
     */
  
  - getFormattedPortfolio: 
    /**
     * Asynchronously retrieves the portfolio value, formats it, and returns the formatted portfolio.
     * 
     * @param {IAgentRuntime} runtime - The runtime object that provides access to agent-related resources.
     * @returns {Promise<string>} The formatted portfolio value as a string.
     */

### Interfaces

- NearToken: 
  /**
   * Represents a token that is near the Near blockchain.
   * @typedef {Object} NearToken
   * @property {string} name - The name of the token.
   * @property {string} symbol - The symbol of the token.
   * @property {number} decimals - The number of decimal places for the token.
   * @property {string} balance - The balance of the token.
   * @property {string} uiAmount - The amount of the token for display purposes.
   * @property {string} priceUsd - The price of the token in USD.
   * @property {string} valueUsd - The value of the token in USD.
   * @property {string} [valueNear] - The value of the token in Near cryptocurrency.
   */
  
- WalletPortfolio: 
  /**
   * Interface representing a wallet portfolio.
   * @typedef {Object} WalletPortfolio
   * @property {string} totalUsd - Total value in USD.
   * @property {string} [totalNear] - Total value in NEAR tokens (optional).
   * @property {Array<NearToken>} tokens - Array of NearToken objects.
   */

### Types

- None at the moment

### Functions

- None at the moment

### actions/transfer.ts

### Classes

No classes in this file.

### Interfaces

- TransferContent: 
```typescript
/**
 * Interface representing the content needed for a transfer.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### Types

No types in this file.

### Functions

- isTransferContent:
```typescript
/**
 * Check if the provided content is of type TransferContent.
 * Content is considered TransferContent if it has a recipient of type string and an amount of type number or string.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content is TransferContent, false otherwise.
 */
```

- transferNEAR:
```typescript
/**
 * Transfers a specified amount of NEAR tokens to a recipient.
 *
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @param {string} recipient - The account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - A Promise that resolves to the transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

### environment.ts

### Classes
No classes in this file.

### Interfaces
No interfaces in this file.

### Types
- NearConfig:
```typescript
/**
 * Type definition representing the configuration for the NEAR protocol,
 * as inferred by the `nearEnvSchema` schema.
 */
```

### Functions
- getConfig:
```typescript
/**
 * Get configuration object based on the specified environment or default values.
 * @param {string | undefined | null} env - The environment to retrieve configuration for.
 * @returns {object} The configuration object based on the environment.
 */
```

- validateNearConfig:
```typescript
/**
 * Validates the NEAR configuration based on the provided runtime and environment variables.
 * @param {IAgentRuntime} runtime The Agent Runtime instance used to retrieve settings and environment variables.
 * @returns {Promise<NearConfig>} The validated NearConfig object.
 */
```

### actions/swap.ts

### Classes
N/A

### Interfaces
N/A

### Types
N/A

### Functions

#### checkStorageBalance
```typescript
/**
 * Asynchronously checks the storage balance of a given account in a specified contract.
 * @param {any} account - The account for which to check the storage balance.
 * @param {string} contractId - The contract ID where the storage balance is checked.
 * @returns {Promise<boolean>} A promise that resolves to true if the storage balance is not zero, false otherwise.
 */
async function checkStorageBalance(account, contractId) {
    // Implementation here
}
```

#### swapToken
```typescript
/**
 * Perform a token swap transaction using the given input and output tokens,
 * amount, and optional slippage tolerance.
 * @param {IAgentRuntime} runtime - The Agent runtime for interacting with the blockchain.
 * @param {string} inputTokenId - The token ID of the token to swap from.
 * @param {string} outputTokenId - The token ID of the token to swap to.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap transaction.
 * @returns {Promise<any>} A Promise that resolves with an array of transactions representing the swap.
 */
async function swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance = 0.01) {
    // Implementation here
}
```

## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: async function swapToken(
    runtime: IAgentRuntime,
    inputTokenId: string,
    outputTokenId: string,
    amount: string,
    slippageTolerance: number = Number(
        runtime.getSetting("SLIPPAGE_TOLERANCE")
    ) || 0.01
): Promise<any> {
    // Implementation logic for supporting multiple networks
   - Type: feature

### Troubleshooting
### Common Issues
1. Wallet credentials not configured
   - Cause: NEAR wallet credentials (NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY) are not set in the runtime.
   - Solution: Set the NEAR wallet credentials in the agent's settings.

### Debugging Tips
- Make sure NEAR wallet credentials are correctly set in the agent's settings.
- Check network configuration and ensure that the NEAR network settings are correct.

### FAQ
Q: How to fetch the current NEAR price from the Coingecko API?
A: You can use the `fetchNearPrice()` method to fetch the current NEAR price, which will handle the API request and caching of the price for future use.