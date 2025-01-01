# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package is designed to provide a set of useful tools and interfaces for interacting with the NEAR Protocol ecosystem. It includes classes like `WalletProvider` for managing wallet functionality, interfaces like `TransferContent` and `NearToken` for defining transfer data and token information, and functions like `checkStorageBalance` and `transferNEAR` for performing storage balance checks and token transfers.

### Key Features
- Manages wallet functionality with the `WalletProvider` class
- Defines transfer content and token information with the `TransferContent` and `NearToken` interfaces
- Performs storage balance checks with the `checkStorageBalance` function
- Facilitates token swaps with the `swapToken` function
- Validates NEAR configuration settings with the `validateNearConfig` function
- Allows for NEAR token transfers with the `transferNEAR` function

## Installation
## Installation Instructions for @elizaos/plugin-near

### Adding the Plugin to Your ElizaOS Project

1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```

2. cd into the agent/ directory.

3. Run `pnpm install` to install the new dependency.

4. Run `pnpm build` to build the project with the new plugin.

### Importing and Using the Plugin

1. Import the plugin using:
   ```typescript
   import { nearPlugin } from "@elizaos/plugin-near";
   ```

2. Add it to the AgentRuntime plugins array:
   ```typescript
   return new AgentRuntime({
       // other configuration...
       plugins: [
           nearPlugin,
           // other plugins...
       ],
   });
   ```

### Integration Example

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

### Verification Steps

Ensure successful integration by checking the console for ["✓ Registering action: <plugin actions>"].

By following these steps, you should be able to successfully install and integrate the @elizaos/plugin-near plugin into your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose:

- `NEAR_ENV`: Specifies the environment for Near protocol.
- `REACT_APP_REF_SDK_ENV`: Specifies the environment for a specific SDK.
- `NEAR_WALLET_SECRET_KEY`: Secret key for Near wallet.
- `NEAR_WALLET_PUBLIC_KEY`: Public key for Near wallet.
- `NEAR_ADDRESS`: Near address for runtime.
- `SLIPPAGE`: Specifies slippage percentage.
- `RPC_URL`: Specifies the RPC URL.
- `NEAR_NETWORK`: Specifies the Near network.
  
## Example .env File:

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

*Please ensure to set the values for each environment variable in the .env file and add the .env file to the .gitignore to prevent it from being committed to the repository.*

## Features

### Actions
### [action name - found in the name: swap]

Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using Ref Finance by fetching token metadata, estimating the swap, setting up the transaction details, and executing the swap.

#### Examples
- user: "{{user1}}"
- agent: "Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined. Example response: ```json { "inputTokenId": "wrap.testnet", "outputTokenId": "ref.fakes.testnet", "amount": "1.5" } ``` Given the recent messages and wallet information below: {{walletInfo}} Extract the following information about the requested token swap: - Input token ID (the token being sold) - Output token ID (the token being bought) - Amount to swap Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined. The result should be a valid JSON object with the following schema: ```json { "inputTokenId": string | null, "outputTokenId": string | null, "amount": string | null } ```"

- user: "{{user2}}"
- agent: "Swap completed successfully! Transaction hashes: ..."

### [action name - found in the name: transfer]
Transfer NEAR tokens to another account

#### Properties
- Name: transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
This handler executes the transfer of NEAR tokens to another account by connecting to the NEAR network, creating a key store, and sending the specified amount to the recipient.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- user: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### WalletProvider
The WalletProvider is a provider that connects to a NEAR Protocol wallet to fetch and display wallet information such as account balance, token balances, and market prices.

#### Methods
Focus on the get() method and its functionality. The get() method retrieves the formatted portfolio information of the connected NEAR wallet account.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "your_near_account_id_here"; // Replace with your NEAR account ID
const runtime: IAgentRuntime = {}; // Create an instance of the IAgentRuntime interface

const result = await walletProvider.get(runtime, {}, {}); // Retrieve the formatted portfolio information
console.log(result); // Output the formatted portfolio information
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching and formatting wallet portfolio information.
```typescript
const walletProvider = new WalletProvider();
const formattedPortfolio = await walletProvider.getFormattedPortfolio(agentRuntime);
console.log(formattedPortfolio);
```

2. Connecting to NEAR protocol using wallet provider.
```typescript
const walletProvider = new WalletProvider();
const connectedAccount = await walletProvider.connect(agentRuntime);
console.log("Connected account:", connectedAccount);
```

### Best Practices
- Ensure to handle errors by catching exceptions thrown by the methods.
- Implement proper caching mechanisms for frequently requested data to optimize performance.

### actions/transfer.ts

### Common Use Cases
1. **Transfer NEAR tokens to another account**: 
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, isTransferContent, transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = // Initialize runtime object;
const transferData: TransferContent = {
  recipient: "example.recipient",
  amount: "10",
  tokenAddress: "near"
};

if (isTransferContent(runtime, transferData)) {
  transferNEAR(runtime, transferData.recipient, transferData.amount);
} else {
  console.log("Invalid transfer content");
}
```

2. **Check if content is a valid transfer object**:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, isTransferContent, transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = // Initialize runtime object;
const invalidTransferData = {
  recipient: "example.recipient",
  amount: 10
};

if (isTransferContent(runtime, invalidTransferData)) {
  transferNEAR(runtime, invalidTransferData.recipient, invalidTransferData.amount);
} else {
  console.log("Invalid transfer content");
}
```

### Best Practices
- **Ensure proper validation**: Always use the `isTransferContent` function to verify if the content is a valid transfer object before calling `transferNEAR`.
- **Handle errors gracefully**: Catch and handle any errors that may occur during the transfer process to provide a better user experience.

### environment.ts

### Common Use Cases
1. Retrieving the Near configuration based on the environment:
```typescript
import { getConfig } from './environment';

const config = getConfig('development');
console.log(config); // Output: { networkId: 'default', nodeUrl: 'http://localhost:3030', walletUrl: 'http://localhost:4000/wallet' }
```

2. Validating Near configuration settings using Agent runtime:
```typescript
import { validateNearConfig } from './environment';

const runtime = new AgentRuntime();
validateNearConfig(runtime).then((nearConfig) => {
  console.log(nearConfig); // Output: { networkId: 'default', nodeUrl: 'http://localhost:3030', walletUrl: 'http://localhost:4000/wallet' }
});
```

### Best Practices
- Encapsulate environment configuration in a separate file like `environment.ts` to keep it organized and easy to manage.
- Utilize the functions like `getConfig` and `validateNearConfig` provided in the `environment.ts` file for consistent handling of Near configuration settings.

### actions/swap.ts

### Common Use Cases

1. Perform a token swap between two different tokens with a specified amount and slippage tolerance.
```typescript
const inputTokenId = "token1";
const outputTokenId = "token2";
const amount = "100";
const slippageTolerance = 0.01;

const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log(transactions);
```

2. Check the storage balance of a specified account within a contract.
```typescript
const account = { address: "0x1234567890", balance: "100" };
const contractId = "contract1";

const isValidBalance = await checkStorageBalance(account, contractId);
console.log(isValidBalance);
```

### Best Practices

- Always handle the promise returned by the `swapToken` function to catch any errors that may occur during the token swap process.
- Ensure that the input parameters passed to the `checkStorageBalance` function are valid and correctly formatted to avoid unexpected errors.

## API Reference
### providers/wallet.ts

```markdown
### Classes

#### WalletProvider
/**
 * Represents a WalletProvider that implements the Provider interface.
 * @implements {Provider}
 */

- constructor(accountId: string)
- get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>
- connect(runtime: IAgentRuntime): Promise<any>
- fetchWithRetry(url: string, options: RequestInit = {}): Promise<any>
- fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>
- fetchNearPrice(): Promise<number>
- formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string
- getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>

### Interfaces

#### NearToken
/**
 * Interface representing a token in the NEAR Protocol ecosystem.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The decimal precision of the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token displayed in the UI.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The total value of the token in USD.
 * @property {string} [valueNear] - The total value of the token in NEAR Protocol's native token, NEAR.
 */

#### WalletPortfolio
/**
 * Interface representing a wallet portfolio.
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the portfolio.
 */

### Types
[No types defined in this file]

### Functions
[No standalone functions in this file]
```

### actions/transfer.ts

### Interfaces

#### TransferContent
```typescript
/**
 * Interface for transferring content with recipient, amount, and an optional token address.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer (can be a string or number).
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### Functions

#### isTransferContent
```typescript
/**
 * Checks if the provided content is a TransferContent object by verifying if it has a recipient property of type string
 * and an amount property of type string or number.
 * 
 * @param {IAgentRuntime} runtime - The runtime object
 * @param {any} content - The content to be checked
 * @returns {boolean} Returns true if the content is a TransferContent object, otherwise false
 */
```

#### transferNEAR
```typescript
/**
 * Transfer NEAR tokens from the connected account to a specified recipient.
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - A Promise that resolves to the transaction hash of the transfer.
 */
```

### environment.ts

### Classes

No classes found in the given file.

### Interfaces

No interfaces found in the given file.

### Types

- NearConfig: 
  ```typescript
  /**
   * Type definition for NearConfig based on the inferred type from nearEnvSchema
   */
  ```

### Functions

- getConfig:
  ```typescript
  /**
   * Retrieves the configuration based on the provided environment.
   * If the environment is not provided, it falls back to ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV.
   * @param {string | undefined | null} env - The environment to retrieve the configuration for.
   * @returns {object} The configuration object based on the environment provided.
   */
  ```
- validateNearConfig:
  ```typescript
  /**
   * Validates the Near configuration settings based on the provided runtime and environment variables.
   * @param {IAgentRuntime} runtime - The Agent runtime instance.
   * @returns {Promise<NearConfig>} - A Promise that resolves to a validated NearConfig object.
   */
  ```

Example of usage for getConfig function:

```typescript
const config = getConfig('dev');
console.log(config);
```

Example of usage for validateNearConfig function:

```typescript
const runtime = new AgentRuntime();
validateNearConfig(runtime).then((nearConfig) => {
  console.log(nearConfig);
});
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
```javascript
/**
 * Asynchronously checks the storage balance of a specified account within a contract.
 * @param {any} account - The account object representing the account for which the storage balance is being checked.
 * @param {string} contractId - The ID of the contract where the storage balance is being checked.
 * @returns {Promise<boolean>} - A promise that resolves to a boolean value indicating whether the storage balance is valid.
 */
```

#### swapToken
```javascript
/**
 * Perform a token swap using the provided input and output tokens, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} [slippageTolerance=0.01] - The acceptable slippage tolerance for the swap.
 * @returns {Promise<any>} The list of transactions for the swap.
 */
``` 

This file does not contain any classes, interfaces, or types. The provided functions `checkStorageBalance` and `swapToken` are documented with their descriptions, parameters, and return types. These functions allow for checking storage balance of an account within a contract and performing token swaps respectively.

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
)
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Plugin not connecting to NEAR protocol
   - Cause: NEAR wallet credentials not configured.
   - Solution: Ensure that NEAR wallet credentials (NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY) are properly configured.

### Debugging Tips
- Check if NEAR wallet credentials are correctly set in the runtime settings.
- Verify the network ID, node URL, and wallet URL for NEAR protocol connectivity.

### FAQ
Q: How to fetch the current value of the portfolio in the Wallet?
A: You can use the `fetchPortfolioValue` method in the WalletProvider class, which asynchronously fetches the portfolio value using the provided agent runtime.