# @elizaos/plugin-near Documentation

## Overview
### Purpose
The **@elizaos/plugin-near** package aims to provide a comprehensive toolkit for managing wallet operations related to the NEAR Protocol. The package includes classes, interfaces, types, and functions to facilitate tasks such as connecting to NEAR, fetching portfolio value, transferring NEAR tokens, and swapping tokens on the NEAR protocol.

### Key Features
- **WalletProvider:** Manages wallet operations like connecting to NEAR, fetching portfolio value, and formatting portfolio data.
- **TransferContent Interface:** Represents the content of a transfer.
- **NearToken Interface:** Represents a Near token with properties like name, symbol, balance, and value.
- **WalletPortfolio Type:** Represents a wallet portfolio with total amounts in USD and Near tokens.
- **checkStorageBalance Function:** Asynchronously checks the storage balance of a specific account within a smart contract.
- **swapToken Function:** Swaps tokens on the NEAR protocol with specified input and output tokens.
- **isTransferContent Function:** Checks if the provided content is TransferContent based on specific criteria.
- **transferNEAR Function:** Transfers NEAR tokens from the current account to a recipient.
- **getConfig Function:** Retrieves configuration based on specified environment or default values.
- **validateNearConfig Function:** Validates Near configuration settings for the NEAR Protocol.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the plugin to your ElizaOS project:

- Add the following to your agent/package.json dependencies:
```json
{
  "dependencies": {
    "@elizaos/plugin-near": "workspace:*"
  }
}
```

- Perform the following steps:
1. cd into the agent/ directory
2. Run `pnpm install` to install the new dependency
3. Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:

- Import the plugin using:
```typescript
import { nearPlugin } from "@elizaos/plugin-near";
```

- Add it to the AgentRuntime plugins array in your code.

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

### 4. Verification steps:

Upon successful integration, you should see ["✓ Registering action: <plugin actions>"] in the console.

Please ensure that all dependencies and peer dependencies specified in the plugin documentation are installed in your project before proceeding with the installation and integration steps.

## Configuration
# Configuration Documentation

## Required Environment Variables and their Purpose

1. **NEAR_ENV**
   - Purpose: Used as a fallback value in the process.

2. **REACT_APP_REF_SDK_ENV**
   - Purpose: Represents the environment variable for the React application.

3. **NEAR_WALLET_SECRET_KEY**
   - Purpose: Represents the secret key used in the NEAR Wallet.

4. **NEAR_WALLET_PUBLIC_KEY**
   - Purpose: Represents the public key used in the NEAR Wallet.

5. **NEAR_ADDRESS**
   - Purpose: Represents the NEAR network address.

6. **SLIPPAGE**
   - Purpose: Represents the slippage value.

7. **RPC_URL**
   - Purpose: Represents the RPC URL.

8. **NEAR_NETWORK**
   - Purpose: Represents the NEAR network ID. Default value is "testnet".

## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key
NEAR_WALLET_PUBLIC_KEY=your_public_key
NEAR_ADDRESS=your_near_address
SLIPPAGE=0.5
RPC_URL=https://rpc.testnet.near.org
NEAR_NETWORK=testnet
```

**Note:** Ensure the .env file is set in the .gitignore file to prevent it from being committed to the repository. Configuration should be managed in the .env file.

## Features

### Actions
### [action name - found in the name: swap]
Perform a token swap using Ref Finance.

#### Properties
- Name: swap
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using Ref Finance by estimating the swap route, checking storage balances, and executing the swap transactions accordingly.

#### Examples
- user: "{{user1}}"
- agent: "Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined. Example response: { "inputTokenId": "wrap.testnet", "outputTokenId": "ref.fakes.testnet", "amount": "1.5" } Given the recent messages and wallet information below: {{walletInfo}} Extract the following information about the requested token swap: - Input token ID (the token being sold) - Output token ID (the token being bought) - Amount to swap Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined. The result should be a valid JSON object with the following schema: { "inputTokenId": string | null, "outputTokenId": string | null, "amount": string | null }"
- user: "{{user2}}"
- agent: "Swap completed successfully! Transaction hashes: ..."

```json
{
    "inputTokenId": "wrap.testnet",
    "outputTokenId": "ref.fakes.testnet",
    "amount": "1.0"
}
```

### Transfer NEAR Tokens

#### Properties
- Name: SEND_NEAR
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
Allows the user to transfer NEAR tokens to another account.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
This provider allows you to fetch wallet information including token balances and total portfolio value.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const exampleGetUsage = async () => {
    const runtime: IAgentRuntime = {} as IAgentRuntime;
    const message: Memory = {} as Memory;
    const state: State = {} as State;

    const walletInfo = await walletProvider.get(runtime, message, state);
    console.log(walletInfo);
};

exampleGetUsage();
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching portfolio value for a user:
```typescript
const walletProvider = new WalletProvider('exampleAccountId');
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. Connecting to NEAR blockchain and fetching wallet portfolio value:
```typescript
const walletProvider = new WalletProvider('exampleAccountId');
const nearAccount = await walletProvider.connect(runtime);
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

### Best Practices
- Use `fetchWithRetry` method for fetching resources to handle potential network failures.
- Utilize the `fetchNearPrice` method to fetch the current price of NEAR token in USD from the Coingecko API efficiently.

### actions/transfer.ts

- **Common Use Cases**
1. Check if the provided content is TransferContent:
```typescript
const isTransferContent = (runtime: IAgentRuntime, content: any): boolean => {
  // Implementation goes here
}
```

2. Transfer NEAR tokens to a recipient:
```typescript
const transferNEAR = async (runtime: IAgentRuntime, recipient: string, amount: string): Promise<string> => {
  // Implementation goes here
}
```

- **Best Practices**
- Ensure to handle errors gracefully in the `transferNEAR` function to provide clear feedback to the user in case of any issues.
- Validate the `content` parameter thoroughly in the `isTransferContent` function to prevent any unexpected behavior.

### environment.ts

### Common Use Cases
1. Accessing configuration based on specified environment:
```typescript
import { getConfig } from './environment';

const config = getConfig('testnet');
console.log(config); // Output: { networkId: 'testnet', nodeUrl: 'https://rpc.testnet.near.org', helperUrl: 'https://helper.testnet.near.org' }
```

2. Validating Near configuration settings:
```typescript
import { validateNearConfig } from './environment';

validateNearConfig(runtime)
  .then((config) => {
    console.log(config); // Output: { networkId: 'mainnet', nodeUrl: 'https://rpc.mainnet.near.org', helperUrl: 'https://helper.mainnet.near.org' }
  })
  .catch((err) => {
    console.error(err);
  });
```

### Best Practices
- Document the available environments and their corresponding network details for easy reference.
- Use the `validateNearConfig` function before using the configuration to ensure all settings are correct.

### actions/swap.ts

### Common Use Cases
1. Checking the storage balance of a specific account within a smart contract:
```typescript
const account = { id: "example_account_id", balance: 100 };
const contractId = "example_contract_id";
checkStorageBalance(account, contractId).then((isNonZero) => {
  if (isNonZero) {
    console.log("Storage balance is non-zero");
  } else {
    console.log("Storage balance is zero");
  }
});
```

2. Swapping tokens on the NEAR protocol:
```typescript
const runtime = { /* agent runtime object properties */ };
const inputTokenId = "near_token";
const outputTokenId = "example_token";
const amount = "100";
const slippageTolerance = 0.01;
swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance).then((transactions) => {
  console.log("Swap successful, transactions:", transactions);
});
```

### Best Practices
- Use descriptive variable names to improve code readability.
- Error handling should be implemented when using the Promise returned by the functions to handle any potential issues.

## API Reference
### providers/wallet.ts

### Classes

#### WalletProvider
```typescript
/**
 * WalletProvider class that implements the Provider interface.
 * Manages wallet operations like connecting to NEAR, fetching portfolio value, and formatting portfolio data.
 */

/**
 * Constructor for creating an instance of the class.
 * @param {string} accountId - The account ID associated with the instance.
 */
constructor(accountId: string)

/**
 * Retrieves the formatted portfolio for the user.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The incoming message.
 * @param {State} [_state] - The state of the agent (optional).
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */
get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>

/**
 * Establishes a connection to the NEAR blockchain using the provided runtime and account details. 
 * If the account is already connected, it returns the account without reconnecting.
 * Retrieves NEAR wallet secret key and public key from the runtime settings.
 * Throws an error if either the secret key or public key are missing.
 * Creates a KeyPair from the secret key and sets the key in the keystore for the specified network and account ID.
 * Establishes a connection to NEAR using the specified network settings and keystore.
 * Returns the connected account.
 * @param {IAgentRuntime} runtime - The runtime interface for the agent.
 * @returns {Promise<import("near-api-js").Account>} The connected NEAR blockchain account.
 */
connect(runtime: IAgentRuntime): Promise<import("near-api-js").Account>

/**
 * Fetches a resource from the specified URL with retries in case of failures.
 * @param {string} url - The URL to fetch the resource from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched resource.
 */
fetchWithRetry(url: string, options?: RequestInit): Promise<any>

/**
 * Fetches the current value of the portfolio associated with the account ID.
 * If the value is already cached, retrieves it from the cache.
 * If not, fetches the account balance, converts yoctoNEAR to NEAR, fetches NEAR price in USD,
 * calculates the total value in USD, and constructs a WalletPortfolio object.
 * Finally, caches the portfolio value and returns it.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used for fetching account data
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the WalletPortfolio object representing the portfolio value
 * @throws {Error} If an error occurs during the fetching process
 */
fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>

/**
 * Fetches the current price of NEAR token in USD from the Coingecko API.
 * If the price is available in the cache, returns it directly.
 * If not, makes an asynchronous call to fetch the price, stores it in the cache,
 * and returns the fetched price.
 * 
 * @returns {Promise<number>} The current price of NEAR token in USD
 */
fetchNearPrice(): Promise<number>

/**
 * Formats the given wallet portfolio data into a readable string format.
 *
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The wallet portfolio data to be formatted.
 * @returns {string} The formatted string output containing portfolio details.
 */
formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string

/**
 * Asynchronously fetches the portfolio value using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime The agent runtime to use for fetching portfolio value.
 * @returns {Promise<string>} A Promise that resolves with the formatted portfolio value as a string, or an error message if fetching fails.
 */
getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>
```

### Interfaces

#### NearToken
```typescript
/**
 * Represents a Near token with the following properties:
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR (optional).
 */
```

#### WalletPortfolio
```typescript
/**
 * Represents a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total amount in USD.
 * @property {string} [totalNear] - The total amount in Near token.
 * @property {Array<NearToken>} tokens - An array of Near tokens.
 */
```

This is the API reference documentation for the `WalletProvider` class in the `providers/wallet.ts` file. The class provides methods for managing wallet operations and fetching portfolio data.

### actions/transfer.ts

### Classes
[No classes in this file]

### Interfaces
- TransferContent: 
```typescript
/**
 * Interface representing the content of a transfer.
 * @interface
 * @extends {Content}
 */
```

### Types
[No types in this file]

### Functions
- isTransferContent: 
```typescript
/**
 * Checks if the provided content is TransferContent based on specific criteria.
 *
 * @param {IAgentRuntime} runtime - The agent runtime being used.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is TransferContent, otherwise false.
 */
```

- transferNEAR: 
```typescript
/**
 * Transfer NEAR tokens from the current account to a recipient.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime environment.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - The transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
``` 

This API includes an interface `TransferContent` for representing the content of a transfer. 
There are two functions:
1. `isTransferContent` which checks if the provided content is of type `TransferContent`.
2. `transferNEAR` which transfers NEAR tokens from the current account to a specified recipient. It returns a Promise containing the transaction hash of the transfer and throws an Error if NEAR wallet credentials are not configured.

These functions can be used to handle transfer operations within a NEAR protocol environment.

### environment.ts

### Classes

### Interfaces

### Types
- NearConfig: 
```typescript
/**
 * Type definition for the configuration options extracted from the NEAR environment variable schema.
 */
```

### Functions
- getConfig: 
```typescript
/**
 * Get configuration based on specified environment or default values if not provided.
 * 
 * @param {string | undefined | null} env - The environment to get configuration for.
 * @returns {object} - Configuration object with network details based on the specified environment.
 */
```

- validateNearConfig: 
```typescript
/**
 * Validates Near configuration settings.
 *
 * @param {IAgentRuntime} runtime - The runtime object used to access settings.
 * @returns {Promise<NearConfig>} - The validated Near configuration object.
 * @throws {Error} - If the validation fails, an error is thrown with error messages.
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
 * Asynchronously checks the storage balance of a specific account within a smart contract.
 * 
 * @param {any} account - The account object to check the storage balance for.
 * @param {string} contractId - The ID of the contract to query for the storage balance.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean value indicating if the storage balance is non-zero.
 */
checkStorageBalance(account: any, contractId: string): Promise<boolean>
```

#### swapToken
```typescript
/**
 * Function to swap tokens on NEAR protocol
 * @param {IAgentRuntime} runtime - The agent runtime object
 * @param {string} inputTokenId - The token ID of the input token
 * @param {string} outputTokenId - The token ID of the output token
 * @param {string} amount - The amount of tokens to swap
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap
 * @returns {Promise<any>} - Promise that resolves to an array of transactions for the swap
 */
swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number = 0.01): Promise<any>
```

Please note: 
- `IAgentRuntime` is not defined in the given information, please replace it with the actual type definition.
- The return type of the `swapToken` function is specified as `Promise<any>`, this may need to be changed to a more specific type depending on the actual return value of the function.

## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: This TODO is related to adding the ability to support multiple networks for the swapToken function.
   - Type: Enhancement

### Troubleshooting
### Common Issues
1. Issue: NEAR wallet credentials not configured
   - Cause: Secret key or public key not set in the runtime settings
   - Solution: Set the NEAR wallet secret key and public key in the runtime settings

### Debugging Tips
- Make sure the NEAR wallet secret key and public key are correctly set in the runtime settings.
- Ensure that the NEAR network configuration is correct for the environment.

### FAQ
Q: How to establish a connection to the NEAR blockchain using the `WalletProvider` class?
A: Use the `connect` method provided by the `WalletProvider` class to establish a connection. Here's an example:
   ```typescript
   const walletProvider = new WalletProvider("YOUR_ACCOUNT_ID");
   await walletProvider.connect(runtime);
   ```