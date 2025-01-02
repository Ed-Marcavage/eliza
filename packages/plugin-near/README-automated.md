# @elizaos/plugin-near Documentation

## Overview
### Purpose
The **@elizaos/plugin-near** package serves as a comprehensive tool for handling Near Protocol functionality within various applications. It provides classes, interfaces, types, and functions necessary for managing Near Protocol tokens, wallets, transfers, and configurations.

### Key Features

- **WalletProvider Class:** Represents a WalletProvider class that implements the Provider interface.
- **TransferContent Interface:** Interface representing the data needed for transferring content.
- **NearToken Interface:** Interface representing a Near Protocol token.
- **WalletPortfolio Interface:** Interface for wallet portfolio information.
- **NearConfig Type:** Type definition for NearConfig, inferred from nearEnvSchema.
- **checkStorageBalance Function:** Asynchronously checks the storage balance of a specific account within a smart contract.
- **swapToken Function:** Perform a token swap using provided input/output token IDs, amount, and slippage tolerance.
- **isTransferContent Function:** Check if the given content is transfer content.
- **transferNEAR Function:** Transfer NEAR tokens from one account to another.
- **getConfig Function:** Retrieve the configuration based on the environment provided.
- **validateNearConfig Function:** Asynchronously validates the NEAR configuration based on provided runtime settings and environment variables.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

## 1. Add the plugin to your ElizaOS project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Run the following commands in your terminal:
  1. ```cd agent/``` to navigate to the agent directory
  2. ```pnpm install``` to install the new dependency
  3. ```pnpm build``` to build the project with the new plugin

## 2. Import and use the plugin:
- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add the plugin to the AgentRuntime plugins array in your code.

## 3. Integration Example:
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

## 4. Verification Steps:
Ensure successful integration by checking the console for the message:
```
"✓ Registering action: <plugin actions>"
```

**Note:** This plugin requires the specified dependencies and peer dependencies listed. Make sure to have these installed beforehand for proper functionality.

## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`: Used to determine the environment for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Used for the React application.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the application.
6. `SLIPPAGE`: Slippage setting for transactions.
7. `RPC_URL`: URL for the RPC server.
8. `NEAR_NETWORK`: Network ID for the NEAR protocol.

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
Please ensure all required environment variables are set in the `.env` file and make sure the `.env` file is added to the `.gitignore` to prevent it from being committed to the repository.

## Features

### Actions
### EXECUTE_SWAP_NEAR
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: 
  - SWAP_TOKENS_NEAR
  - TOKEN_SWAP_NEAR
  - TRADE_TOKENS_NEAR
  - EXCHANGE_TOKENS_NEAR

#### Handler
The handler function executes a token swap using Ref Finance. It validates the required parameters, connects to the NEAR wallet, executes the swap, signs and sends transactions, and returns the transaction hashes upon successful completion.

#### Examples
- User 1:
  - Input Token ID: wrap.testnet
  - Output Token ID: ref.fakes.testnet
  - Amount: 1.0
- Agent:
  - Text: "Swapping 1.0 NEAR for REF..."
  - Action: TOKEN_SWAP
- Agent:
  - Text: "Swap completed successfully! Transaction hash: ..."

### SEND_NEAR
Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
The handler for SEND_NEAR action validates the content for NEAR token transfer, composes the transfer context, generates the transfer content, validates the transfer content, and then initiates the transfer. It also handles errors and provides feedback to the user through the callback function.

#### Examples
- User1: "Send 1.5 NEAR to bob.testnet"
- User2: "I'll send 1.5 NEAR now..."
- User2: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
The Wallet Provider is responsible for fetching and formatting wallet information, including account balance and token values.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "your_near_account_id";

const runtime: IAgentRuntime = {
  // Implementation of IAgentRuntime
};

const message: Memory = {
  // Implementation of Memory
};

const state: State = {
  // Implementation of State
};

const result = await walletProvider.get(runtime, message, state);

console.log(result);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases

1. Fetching the user's portfolio value:
```typescript
const runtime: IAgentRuntime = { /* runtime object */ };
const wallet = new WalletProvider("accountId");

wallet.fetchPortfolioValue(runtime)
    .then((portfolio) => console.log(portfolio))
    .catch((error) => console.error(error));
```

2. Formatting and retrieving the formatted portfolio:
```typescript
const runtime: IAgentRuntime = { /* runtime object */ };
const portfolio: WalletPortfolio = { /* portfolio object */ };
const formattedPortfolio = wallet.formatPortfolio(runtime, portfolio);

console.log(formattedPortfolio);
```

### Best Practices

- Ensure to handle errors gracefully when using promises to fetch data from APIs.
- Use proper typings and interfaces to maintain code clarity and reduce errors.

### actions/transfer.ts

### Common Use Cases

1. Transferring NEAR tokens from one NEAR account to another using the `transferNEAR` function.
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = // initialize the runtime object
const recipient = "recipient.near";
const amount = "10"; // transfer 10 NEAR tokens
transferNEAR(runtime, recipient, amount)
    .then((txHash) => {
        console.log(`Transfer successful. Transaction Hash: ${txHash}`);
    });
```

2. Checking if a given content is a transfer content using the `isTransferContent` function.
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { isTransferContent } from './actions/transfer';

const runtime: IAgentRuntime = // initialize the runtime object
const content = {
    recipient: "recipient.near",
    amount: "10",
    tokenAddress: "token.near"
};

if (isTransferContent(runtime, content)) {
    console.log("Content is a transfer content");
} else {
    console.log("Content is not a transfer content");
}
```

### Best Practices
- Make sure to handle errors and exceptions when using the `transferNEAR` function to ensure the stability and reliability of the transfer process.
- Validate the content before calling the `isTransferContent` function to avoid any unexpected behavior.

### environment.ts

- **First use case with code example:**

You can use the `getConfig` function to retrieve the configuration based on the environment provided. If no environment is provided, it will fallback to the default values or environment variables.

```typescript
import { getConfig } from './environment';

const config = getConfig('production');
console.log(config);
```

- **Second use case with code example:**

You can use the `validateNearConfig` function to asynchronously validate the NEAR configuration based on the provided runtime settings and environment variables.

```typescript
import { validateNearConfig } from './environment';

const runtime = getAgentRuntime(); // Assuming function getAgentRuntime exists
validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log(nearConfig);
  })
  .catch((error) => {
    console.error(error);
  });
```

- **Best Practices:**

  - **Best practice 1:** It is recommended to always provide an environment when using the `getConfig` function to ensure you are getting the configuration specific to that environment.
  
  - **Best practice 2:** When using the `validateNearConfig` function, handle the Promise rejection by catching any errors that may occur during validation to gracefully handle any issues.

### actions/swap.ts

### Common Use Cases

1. **Checking Storage Balance**
```typescript
const myAccount = {
    address: '0x123abc...',
    privateKey: 'abcdef123...',
};
const contractId = 'myContractId';

const hasBalance = await checkStorageBalance(myAccount, contractId);
console.log(hasBalance); // true or false
```

2. **Performing Token Swap**
```typescript
const myRuntime = new AgentRuntime();
const inputTokenId = 'tokenA';
const outputTokenId = 'tokenB';
const amount = '10';
const slippage = 0.01;

const swapResult = await swapToken(myRuntime, inputTokenId, outputTokenId, amount, slippage);
console.log(swapResult); // transaction details of the token swap
```

### Best Practices

- **Input Validation:** Always ensure that the input parameters for the functions are valid and within the expected formats.
- **Error Handling:** Implement proper error handling mechanisms to catch any exceptions that may occur during the execution of the functions.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * Represents a WalletProvider class that implements the Provider interface.
 * @implements {Provider}
 */
 */
```

#### Interfaces

##### NearToken

```
/**
 * Interface representing a Near Protocol token.
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals used for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for UI display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - Optional value of the token in Near Protocol native tokens.
 */
```

##### WalletPortfolio

```
/**
 * Interface for wallet portfolio information.
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR cryptocurrency (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the wallet.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the class with the specified account ID.
 * Initializes a new NodeCache with a cache TTL of 5 minutes.
 * Initializes a new InMemoryKeyStore for key storage.
 * @param {string} accountId - The unique identifier for the account.
 */
```

##### get

```
/**
 * Retrieves the formatted portfolio for a given runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to retrieve the portfolio for.
 * @param {Memory} _message - The message memory (unused).
 * @param {State} [_state] - Optional state information to include in the portfolio.
 * @returns {Promise<string | null>} The formatted portfolio as a string, or null if an error occurs.
 */
```

##### connect

```
/**
 * Connects to the NEAR network using the provided runtime object.
 * Retrieves NEAR wallet secret key and public key from the runtime settings.
 * Creates a KeyPair from the secret key and sets it in the keystore.
 * Establishes connection to NEAR network using the keyStore and network configuration.
 * Returns the NEAR account associated with the provided accountId.
 * @param {IAgentRuntime} runtime - The runtime object that provides settings and functionalities.
 * @returns {Promise<Account>} The NEAR account associated with the provided accountId.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a specified URL with retries in case of failure.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options to pass to the fetch function.
 * @returns {Promise<any>} The response data from the fetch operation.
 */
```

##### fetchPortfolioValue

```
/**
 * Fetches the current portfolio value based on the account balance and NEAR price.
 * 
 * @param {IAgentRuntime} runtime - The runtime interface needed to make API calls.
 * @returns {Promise<WalletPortfolio>} The wallet portfolio object containing total USD value, total NEAR balance, and token details.
 */
```

##### fetchNearPrice

```
/**
 * Fetches the current NEAR price from the CoinGecko API.
 * If the price is already cached, it returns the cached price.
 * If the price is not cached, it makes an API call to fetch the price,
 * stores it in the cache, and returns the fetched price.
 * If an error occurs during the API call, it logs the error and returns 0.
 * @returns {Promise<number>} The current NEAR price in USD.
 */
```

##### formatPortfolio

```
/**
 * Formats the user's portfolio into a string with specific details including total value, token balances, and market prices.
 * 
 * @param {IAgentRuntime} runtime - The runtime information associated with the agent.
 * @param {WalletPortfolio} portfolio - The portfolio containing user's wallet information.
 * @returns {string} - A formatted string with portfolio details.
 */
```

##### getFormattedPortfolio

```
/**
 * Asynchronously retrieves the portfolio value using the provided Agent Runtime and returns
 * a formatted string representation of the portfolio. If an error occurs during the process,
 * it logs the error and returns a message indicating that the wallet information could not be fetched.
 *
 * @param {IAgentRuntime} runtime - The Agent Runtime object to use for fetching portfolio information.
 * @returns {Promise<string>} A Promise that resolves to a formatted portfolio string.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface representing the data needed for transferring content.
 *
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient's address for the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for non-native transfers.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Check if the given content is a transfer content.
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is transfer content, otherwise false.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens from one account to another
 * @param {IAgentRuntime} runtime - The Agent Runtime
 * @param {string} recipient - The recipient's NEAR account ID
 * @param {string} amount - The amount to transfer in NEAR tokens
 * @returns {Promise<string>} - The transaction hash of the transfer
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Type definition for NearConfig, which is inferred from nearEnvSchema
 */
```

#### Functions

##### getConfig

```
/**
 * Retrieve the configuration based on the environment provided.
 * If no environment is provided, it will fallback to the default values or environment variables.
 * @param {string | undefined | null} env - The environment to retrieve the configuration for.
 * @returns {object} The configuration object based on the provided environment or default values.
 */
```

##### validateNearConfig

```
/**
 * Asynchronously validates the NEAR configuration based on the provided runtime settings and environment variables.
 * Returns a Promise that resolves to a NearConfig object.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance containing the settings and environment variables.
 * @returns {Promise<NearConfig>} - A Promise that resolves to a validated NearConfig object.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Asynchronously checks the storage balance of a specific account within a smart contract.
 * 
 * @param {any} account - The account object to check the storage balance for.
 * @param {string} contractId - The ID of the smart contract to query.
 * @returns {Promise<boolean>} A boolean indicating whether the storage balance is greater than 0.
 */
```

##### swapToken

```
/**
 * Perform a token swap using the provided input and output token IDs, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} inputTokenId - The ID of the token to swap from.
 * @param {string} outputTokenId - The ID of the token to swap to.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} [slippageTolerance=0.01] - The acceptable slippage tolerance for the swap.
 * @returns {Promise<any>} The transactions involved in the token swap.
 */
```


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Function to swap tokens with multiple networks support
   - Type: feature

### Troubleshooting
### Common Issues
1. Initialization Error
   - Cause: Missing NEAR wallet secret key or public key in the runtime settings.
   - Solution: Ensure that the NEAR wallet secret key and public key are configured in the runtime settings.

### Debugging Tips
- Check the NEAR wallet credentials configuration in the runtime settings.
- Verify that the NEAR network ID, node URL, and wallet URL are correctly set.
- Ask your questions at https://eliza.gg/ 🚀 or in our discord

### FAQ
Q: How to connect to the NEAR network?
A: Use the `connect` method in the `WalletProvider` class to establish a connection to the NEAR network. Example usage:
```typescript
const nearConnection = await connect({
    networkId: PROVIDER_CONFIG.networkId,
    keyStore: this.keyStore,
    nodeUrl: PROVIDER_CONFIG.nodeUrl,
    walletUrl: PROVIDER_CONFIG.walletUrl,
    helperUrl: PROVIDER_CONFIG.helperUrl,
});
```