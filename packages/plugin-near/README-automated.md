# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package is designed to facilitate interactions with the NEAR Protocol for managing wallet functionality, including transferring tokens, checking storage balances, and swapping tokens. It provides a set of classes, interfaces, types, and functions to enable seamless integration with the NEAR Protocol network.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- **WalletProvider Class**: Manages wallet functionality for fetching and formatting portfolio information.
- **TransferContent Interface**: Defines a transfer object with recipient, amount, and optional token address.
- **NearToken Interface**: Represents a NEAR Protocol token with various properties like name, symbol, balance, and USD value.
- **WalletPortfolio Interface**: Represents a wallet portfolio with total USD value and an array of token objects.
- **NearConfig Type**: Configuration for connecting to a NEAR Protocol network.
- **checkStorageBalance Function**: Checks the storage balance of a specified account within a contract.
- **swapToken Function**: Swaps tokens on NEAR Protocol by estimating routes and executing swaps.
- **isTransferContent Function**: Checks if the content is of type TransferContent.
- **transferNEAR Function**: Transfers NEAR tokens from the current account to a recipient account.
- **getConfig Function**: Retrieves configuration based on the environment provided or default values.
- **validateNearConfig Function**: Validates the NEAR configuration using the provided runtime.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### Step 1: Add the plugin to your ElizaOS project
```json
{
  "dependencies": {
    "@elizaos/plugin-near": "workspace:*"
  }
}
```
1. cd into the agent/ directory
2. Run `pnpm install` to install the new dependency
3. Run `pnpm build` to build the project with the new plugin

### Step 2: Import and use the plugin
- Import syntax: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add it to the AgentRuntime plugins array

### Step 3: Integration example
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

### Step 4: Verification steps
Ensure you see `✓ Registering action: <plugin actions>` in the console after integrating the plugin.

---

Make sure to follow the steps carefully to successfully integrate the @elizaos/plugin-near plugin into your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables and Purpose:

1. `NEAR_ENV`: to specify the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: to specify the SDK environment for a React app.
3. `NEAR_WALLET_SECRET_KEY`: to store the secret key of the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: to store the public key of the NEAR wallet.
5. `NEAR_ADDRESS`: to specify the NEAR address.
6. `SLIPPAGE`: to set the slippage percentage.
7. `RPC_URL`: to specify the RPC URL.
8. `NEAR_NETWORK`: to define the NEAR network.

## Sample .env File:

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=YOUR_SECRET_KEY_HERE
NEAR_WALLET_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
NEAR_ADDRESS=YOUR_NEAR_ADDRESS_HERE
SLIPPAGE=1
RPC_URL=https://your_rpc_url_here.com
NEAR_NETWORK=testnet
```

> Please note that the configuration is done in the .env file. Ensure to set the .env file in the .gitignore so it is not committed to the repository.

## Features

### Actions
### executeSwap
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
The handler for this action performs a token swap using Ref Finance. It first validates the message and then proceeds to compose the state, fetch wallet information, and generate the swap context. It then checks for required parameters, connects to the NEAR blockchain, executes the token swap, and signs and sends transactions. If successful, it returns a message confirming the completion of the swap. If an error occurs during the swap, it returns an error message.

#### Examples
- User 1:
  - Input Token: wrap.testnet
  - Output Token: ref.fakes.testnet
  - Amount: 1.0
- User 2:
  - Text: "Swapping 1.0 NEAR for REF..."
  - Action: TOKEN_SWAP
- User 2:
  - Text: "Swap completed successfully! Transaction hash: ..."

```markdown
### SEND_NEAR
Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
The handler function for the SEND_NEAR action transfers NEAR tokens from the user to the specified recipient account. It composes a transfer context, generates transfer content, validates the content, and then initiates the NEAR transfer. If the transfer is successful, it returns a success message with the transaction hash. If an error occurs during the transfer, it returns an error message.

#### Examples
[
    [
        {
            user: "User",
            content: {
                text: "Send 1.5 NEAR to bob.testnet",
            },
        },
        {
            user: "Agent",
            content: {
                text: "I'll send 1.5 NEAR now...",
                action: "SEND_NEAR",
            },
        },
        {
            user: "Agent",
            content: {
                text: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ",
            },
        },
    ],
]
```



### Providers
### WalletProvider
Provider for fetching wallet information including token balances and total portfolio value.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const myWalletInfo = await walletProvider.get(runtime, message, state);
console.log(myWalletInfo);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching and formatting portfolio information:
```typescript
const walletProvider = new WalletProvider(accountId);
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. Connecting to the NEAR blockchain:
```typescript
const walletProvider = new WalletProvider(accountId);
await walletProvider.connect(runtime);
console.log("Connected to NEAR blockchain");
```

### Best Practices
- Ensure to handle errors properly when using the asynchronous methods to fetch data.
- Use the provided interfaces (NearToken, WalletPortfolio) for type safety when working with token and portfolio data.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens from one account to another:
```typescript
import { IAgentRuntime } from 'runtime';
import { TransferContent, isTransferContent, transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = initializeAgentRuntime();
const transfer: TransferContent = {
  recipient: 'receiver.near',
  amount: '10',
};

if(isTransferContent(runtime, transfer)) {
  transferNEAR(runtime, transfer.recipient, transfer.amount)
    .then((txHash) => {
      console.log(`Transfer successful. Transaction hash: ${txHash}`);
    })
    .catch((error) => {
      console.error('Error transferring NEAR tokens:', error);
    });
}
```

2. Check if content is a TransferContent type:
```typescript
import { isTransferContent } from './actions/transfer';

// Assuming content is defined elsewhere
const content = {
  recipient: 'receiver.near',
  amount: '10',
};

if(isTransferContent(runtime, content)) {
  console.log('Content is of type TransferContent');
} else {
  console.log('Content is not of type TransferContent');
}
```

### Best Practices
- Ensure to handle any errors thrown by the `transferNEAR` function to provide proper feedback to users.
- Validate user input for recipient and amount fields to prevent potential errors during the transfer process.

### environment.ts

- First use case with code example:
```typescript
import { getConfig } from './environment';

const env = 'testnet';
const config = getConfig(env);
console.log(config);
```

- Second use case with code example:
```typescript
import { validateNearConfig } from './environment';
import { IAgentRuntime } from 'some-library';

const runtime: IAgentRuntime = {/* provide some implementation */};
validateNearConfig(runtime)
  .then((config) => {
    console.log(config);
  })
  .catch((error) => {
    console.error(error);
  });
```

- Best practice 1:
Make sure to set the `env` variable to the appropriate value before calling `getConfig` to retrieve the desired configuration for the specified environment.

- Best practice 2:
Handle any potential errors or exceptions when calling `validateNearConfig` by using `.then` and `.catch` to properly handle the promise resolution or rejection.

### actions/swap.ts

### Common Use Cases
1. Check storage balance of a specific account within a contract:
```typescript
const account = "example-account";
const contractId = "example-contract";
const hasBalance = await checkStorageBalance(account, contractId);
console.log(`Storage balance for ${account} in ${contractId}: ${hasBalance}`);
```

2. Swap tokens on NEAR Protocol:
```typescript
const runtime = getRuntimeObject();
const inputTokenId = "NEAR";
const outputTokenId = "USDC";
const amount = "100";
const slippageTolerance = 0.01;
const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log("Swap transactions:", swapTransactions);
```

### Best Practices
- Always handle Promise rejections and errors in a try-catch block when using asynchronous functions.
- Use meaningful variable names to improve code readability and maintainability.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * WalletProvider class that implements Provider interface.
 * Manages wallet functionality for fetching and formatting portfolio information.
 * @class
 */
```

#### Interfaces

##### NearToken

```
/**
 * Interface representing a Near Protocol token.
 * @interface NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places the token supports.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The user interface amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near Protocol (optional).
 */
```

##### WalletPortfolio

```
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the portfolio.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for initializing an account with a given accountId.
 * @param {string} accountId - The unique identifier for the account.
 */
```

##### get

```
/**
 * Asynchronously retrieves the formatted portfolio using the provided runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime needed to retrieve the portfolio.
 * @param {Memory} _message - The memory object, not used in this method.
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string | null>} The formatted portfolio if successful, otherwise null.
 */
```

##### connect

```
/**
 * Connect to the NEAR blockchain using the provided runtime and credentials.
 * If the account is already connected, it is returned without re-establishing the connection.
 * Throws an error if NEAR wallet credentials are not configured.
 * 
 * @param {IAgentRuntime} runtime - The runtime to be used for connecting
 * @returns {Promise<void>} - The NEAR account that has been connected
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a specified URL with retry logic in case of failure.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - (optional) Additional options to include in the request.
 * @returns {Promise<any>} A Promise that resolves to the fetched data, or rejects with an error after all retries are exhausted.
 */
```

##### fetchPortfolioValue

```
/**
 * Fetches the current value of the user's portfolio in USD.
 * 
 * @param {IAgentRuntime} runtime - The runtime object for making API requests.
 * @returns {Promise<WalletPortfolio>} - Promise that resolves to the user's portfolio value.
 */
```

##### fetchNearPrice

```
/**
 * Fetches the current NEAR price from the Coingecko API, 
 * either from cache or by making a retrieval request.
 * @returns {Promise<number>} The current NEAR price in USD. 
 */
```

##### formatPortfolio

```
/**
 * Formats the provided WalletPortfolio data into a human-readable string.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @param {WalletPortfolio} portfolio - The WalletPortfolio data to format.
 * @returns {string} The formatted portfolio data as a string.
 */ 
```

##### getFormattedPortfolio

```
/**
 * Asynchronously fetches the portfolio value using the provided IAgentRuntime and returns a formatted string representing the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime instance used to fetch the portfolio value.
 * @returns {Promise<string>} A Promise that resolves with a formatted string representing the portfolio.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface for defining a TransferContent object.
 * Extends the Content interface.
 * @interface
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional parameter for the token address in case of native NEAR transfers.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Check if the given content is of type TransferContent.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment.
 * @param {any} content - The content to check.
 * @returns {boolean} True if the content is of type TransferContent, false otherwise.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens from current account to recipient account
 * @param {IAgentRuntime} runtime - The agent runtime
 * @param {string} recipient - The recipient's NEAR account ID
 * @param {string} amount - The amount of NEAR tokens to transfer
 * @returns {Promise<string>} - The transaction hash of the transfer
 * @throws {Error} - If NEAR wallet credentials are not configured
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Represents the configuration for connecting to a NEAR Protocol network.
 */
```

#### Functions

##### getConfig

```
/**
 * Retrieve configuration based on the environment provided or default values.
 * @param {string | undefined | null} env - The environment to retrieve configuration for.
 * @returns {Object} - The configuration object based on the environment:
 * - networkId: The network ID.
 * - nodeUrl: The node URL.
 * - walletUrl: The wallet URL.
 * - WRAP_NEAR_CONTRACT_ID: The WRAP NEAR contract ID.
 * - REF_FI_CONTRACT_ID: The REF FI contract ID.
 * - REF_TOKEN_ID: The REF Token ID.
 * - indexerUrl: The indexer URL.
 * - explorerUrl: The explorer URL.
 * - REF_DCL_SWAP_CONTRACT_ID: The REF DCL swap contract ID.
 */
```

##### validateNearConfig

```
/**
 * Validates the Near configuration using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime to use for configuration settings.
 * @returns {Promise<NearConfig>} The validated Near configuration.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Check the storage balance of a specified account within a contract.
 * 
 * @param {any} account - The account to check the storage balance for.
 * @param {string} contractId - The ID of the contract to check against.
 * @returns {Promise<boolean>} - A boolean indicating whether the storage balance is not null and not equal to "0".
 */
```

##### swapToken

```
/**
 * Function to swap tokens on NEAR Protocol by estimating swap routes and executing swaps.
 * 
 * @param {IAgentRuntime} runtime - The runtime object provided by NEAR Protocol
 * @param {string} inputTokenId - The token ID of the token to be swapped
 * @param {string} outputTokenId - The token ID of the token to receive in the swap
 * @param {string} amount - The amount of tokens to swap
 * @param {number} slippageTolerance - The allowed slippage tolerance for the swap (default to 0.01)
 * 
 * @returns {Promise<any>} The transactions involved in the swap process
 */
```


## Development

### TODO Items
### Items
1. Comment: TODO: add functionality to support multiple networks
   - Context: async function swapToken(
    runtime: IAgentRuntime,
    inputTokenId: string,
    outputTokenId: string,
    amount: string,
    slippageTolerance: number = Number(
        runtime.getSetting("SLIPPAGE_TOLERANCE")
    ) || 0.01
): Promise<any> {
    try {
        // Get token metadata
        const tokenIn = await ftGetTokenMetadata(inputTokenId);
        const tokenOut = await ftGetTokenMetadata(outputTokenId);
        const networkId = runtime.getSetting("NEAR_NETWORK") || "testnet";
        const nodeUrl =
            runtime.getSetting("RPC_URL") || "https://rpc.testnet.near.org";

        // Get all pools for estimation
        // ratedPools, unRatedPools,
        const { simplePools } = await fetchAllPools();
        const swapTodos = await estimateSwap({
            tokenIn,
            tokenOut,
            amountIn: amount,
            simplePools,
            options: {
                enableSmartRouting: true,
            },
        });

        if (!swapTodos || swapTodos.length === 0) {
            throw new Error("No valid swap route found");
        }

        // Get account ID from runtime settings
        const accountId = runtime.getSetting("NEAR_ADDRESS");
   - Type: feature

### Troubleshooting
### Common Issues
1. Wallet credentials not configured
   - Cause: Missing NEAR wallet credentials such as secret key or public key.
   - Solution: Ensure that the NEAR wallet credentials are properly configured.

### Debugging Tips
- Make sure to check the NEAR wallet credentials in the runtime settings.
- Verify that the NEAR network and node URLs are correct.
- Ask for help and share your code at [our support platform](https://eliza.gg/) or on our discord.

### FAQ
Q: How to connect to the NEAR blockchain using the WalletProvider?
A: You can use the `connect` method of the `WalletProvider` class with the provided runtime to establish a connection to the NEAR blockchain.