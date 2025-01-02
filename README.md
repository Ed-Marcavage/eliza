# @elizaos/plugin-near Documentation

## Overview
### Purpose
The @elizaos/plugin-near package is designed to provide functionalities related to the NEAR Protocol and token management. It includes classes, interfaces, types, and functions to facilitate token transfers, portfolio management, and other blockchain-related operations.

### Key Features
- **WalletProvider Class**: Represents a wallet provider implementing the Provider interface.
- **TransferContent Interface**: Defines properties for transferring content with optional token address.
- **NearToken Interface**: Represents a token on the NEAR Protocol with various properties.
- **WalletPortfolio Interface**: Represents a wallet portfolio with total USD value, total NEAR value, and token array.
- **NearConfig Type**: Defines the NearConfig type inferred from nearEnvSchema.
- **checkStorageBalance Function**: Check the storage balance of a specified account asynchronously.
- **swapToken Function**: Perform a token swap transaction on the blockchain.
- **isTransferContent Function**: Check if the content is of type TransferContent.
- **transferNEAR Function**: Transfer NEAR tokens from the current account to a specified recipient.
- **getConfig Function**: Get configuration based on the environment.
- **validateNearConfig Function**: Validate the Near config based on the provided runtime.

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
- Navigate to the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

### 2. Importing and using the plugin:
- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add the plugin to the AgentRuntime plugins array.

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
- Ensure that you see ["✓ Registering action: <plugin actions>"] in the console for successful integration.

**Note:** This is a workspace package that needs to be added to agent/package.json and then built.

## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`: Used to specify the environment for NEAR.
2. `REACT_APP_REF_SDK_ENV`: Used to specify the environment for the React app.
3. `NEAR_WALLET_SECRET_KEY`: Contains the secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Contains the public key for the NEAR wallet.
5. `NEAR_ADDRESS`: Contains the NEAR address for the application.
6. `SLIPPAGE`: Contains the slippage setting for the application.
7. `RPC_URL`: Contains the RPC URL for the application.
8. `NEAR_NETWORK`: Contains the NEAR network ID for the application.

## Example .env File

```dotenv
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=abc123def456
NEAR_WALLET_PUBLIC_KEY=xyz789uvw101
NEAR_ADDRESS=nearaddress123
SLIPPAGE=0.5
RPC_URL=https://example-rpc-url.com
NEAR_NETWORK=testnet
```

## Note
Please ensure that the `.env` file is set in the `.gitignore` to prevent it from being committed to the repository. Configuration should be done in the `.env` file.

## Features

### Actions
### executeSwap
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
The handler function initializes the Ref SDK with the testnet environment, composes the state, retrieves wallet information, generates the swap context, and executes the token swap using the specified input token ID, output token ID, and amount. It then signs and sends transactions to complete the swap.

#### Examples
- User 1:
  - Input token ID: wrap.testnet
  - Output token ID: ref.fakes.testnet
  - Amount: 1.0 NEAR
- Agent:
  - Text: Swapping 1.0 NEAR for REF...
  - Action: TOKEN_SWAP
- Agent:
  - Text: Swap completed successfully! Transaction hash: ...

### SEND_NEAR
Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
The handler function for SEND_NEAR action initializes or updates the state, composes a transfer context, generates transfer content, validates the transfer content, transfers the NEAR tokens to the recipient account, and sends a success or error message accordingly.

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



### Providers
### WalletProvider
This provider connects to a NEAR wallet and fetches the portfolio value, including token balances and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const runtime: IAgentRuntime = {...};
const message: Memory = {...};
const state: State = {...};

const result = await walletProvider.get(runtime, message, state);
console.log(result);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. The code in providers/wallet.ts can be used to connect to a NEAR protocol wallet and fetch portfolio data, including the total value in USD, total NEAR balance, and details of NEAR token holdings.
```typescript
const walletProvider = new WalletProvider("myAccountId");
walletProvider.connect(runtime)
  .then(() => {
    return walletProvider.fetchPortfolioValue(runtime);
  })
  .then((portfolio) => {
    const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
    console.log(formattedPortfolio);
  })
  .catch((error) => {
    console.error(error);
  });
```

2. The code in providers/wallet.ts can be used to fetch the NEAR price in USD from an API and format the wallet portfolio data into a human-readable string representation.
```typescript
const walletProvider = new WalletProvider("myAccountId");
walletProvider.fetchNearPrice()
  .then((price) => {
    console.log(`NEAR Price in USD: ${price}`);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Best Practices
- Ensure to handle errors properly by using `.catch()` in promises to catch and handle any errors that occur during fetching or formatting portfolio data.
- Use the interfaces provided (NearToken and WalletPortfolio) to ensure consistency and type safety when working with token and portfolio data.

### actions/transfer.ts

### Common Use Cases
1. Transferring NEAR tokens to another account:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = // Initialize the runtime
const recipient = 'example.near';
const amount = '10'; // Amount to transfer

const transferContent: TransferContent = {
  recipient,
  amount
};

const isTransfer = isTransferContent(runtime, transferContent);
if (isTransfer) {
  try {
    const txHash = transferNEAR(runtime, transferContent.recipient, transferContent.amount);
    console.log(`Transfer successful. Transaction Hash: ${txHash}`);
  } catch (error) {
    console.error(`Error transferring NEAR tokens: ${error.message}`);
  }
}
```

2. Checking if the provided content is a transfer content:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, isTransferContent } from './actions/transfer';

const runtime: IAgentRuntime = // Initialize the runtime
const content: any = // Content to check

const isTransfer = isTransferContent(runtime, content);
console.log(`Is transfer content? ${isTransfer}`);
```

### Best Practices
- Ensure that NEAR wallet credentials are configured before using the `transferNEAR` function.
- Validate the recipient's NEAR account ID before initiating a transfer to avoid any mistakes.

### environment.ts

### Common Use Cases
1. **Use Case 1: Retrieving configuration based on environment**
   
   ```typescript
   import { getConfig } from 'environment';
   
   // Get configuration based on the environment
   const config = getConfig(process.env.NODE_ENV);
   console.log(config);
   ```

2. **Use Case 2: Validating Near config**
   
   ```typescript
   import { validateNearConfig } from 'environment';
   
   // Validate Near config based on the runtime
   const runtime = {
       // runtime settings
   };
   
   validateNearConfig(runtime).then((nearConfig) => {
       console.log(nearConfig);
   });
   ```

### Best Practices
- **Ensure Environment Variables are Set**: Make sure the environment variable is set before calling `getConfig` to retrieve the configuration.
- **Handle Promise Rejection**: When using `validateNearConfig`, handle the Promise rejection appropriately to avoid uncaught errors.

### actions/swap.ts

### Common Use Cases
1. Checking storage balance of a specified account:
```typescript
const account = "exampleAccount";
const contractId = "exampleContractId";

const hasBalance = await checkStorageBalance(account, contractId);
console.log(`Account ${account} has storage balance: ${hasBalance}`);
```

2. Performing a token swap transaction on the blockchain:
```typescript
const runtime = { /* mock agent runtime object */ };
const inputTokenId = "exampleInputTokenId";
const outputTokenId = "exampleOutputTokenId";
const amount = "100";
const slippageTolerance = 0.01;

const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log("Token swap transactions:", transactions);
```

### Best Practices
- Always handle the promises returned by the functions using `.then()` or `async/await`.
- Make sure to provide the required parameters for the functions to ensure proper execution.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * A class representing a wallet provider that implements the Provider interface.
 * @implements Provider
 */
*/
```

#### Interfaces

##### NearToken

```
/**
 * Interface representing a token on the NEAR Protocol.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol native token (optional).
 */
```
```

##### WalletPortfolio

```
/**
 * Interface for a wallet portfolio, containing the total USD value, total NEAR value, and an array of NearToken objects.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total USD value of the portfolio.
 * @property {string=} totalNear - The optional total NEAR value of the portfolio.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the portfolio.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId The unique identifier for the account.
 */
```

##### get

```
/**
 * Asynchronously fetches the formatted portfolio data using the provided IAgentRuntime.
 * 
 * @param {IAgentRuntime} runtime - The runtime context for the agent
 * @param {Memory} _message - Unused parameter representing the message data
 * @param {State} [_state] - Optional parameter for storing the state data
 * @returns {Promise<string | null>} A Promise that resolves to the formatted portfolio data or null if an error occurs
 */
```

##### connect

```
/**
 * Connect to NEAR protocol using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime object to use for connecting.
 * @returns {Promise} - A promise that resolves to the connected NEAR account.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a specified URL with retries in case of failure.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - Additional options for the fetch request (default: {}).
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

##### fetchPortfolioValue

```
/**
 * Asynchronously fetches the value of the portfolio for the current account by getting the account balance,
 * converting NEAR balance from yoctoNEAR to NEAR, fetching NEAR price in USD, and calculating the total value in USD.
 * 
 * @param {IAgentRuntime} runtime - The runtime instance for the agent.
 * @returns {Promise<WalletPortfolio>} A promise that resolves with the wallet portfolio information, including total USD value,
 * total NEAR balance, and details of NEAR token holdings.
 * @throws {Error} If there is an error fetching the portfolio.
 */
        **/
```

##### fetchNearPrice

```
/**
 * Fetches the NEAR price from the API, will return a cached price if available.
 * 
 * @returns {Promise<number>} The NEAR price in USD.
 */
```

##### formatPortfolio

```
/**
 * Formats the provided wallet portfolio data into a human-readable string representation.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {WalletPortfolio} portfolio - The portfolio data to format.
 * @returns {string} A formatted string representation of the wallet portfolio data.
 */
```

##### getFormattedPortfolio

```
/**
 * Asynchronously retrieves the portfolio value using the provided IAgentRuntime instance, formats it, and returns a string representation of the formatted portfolio.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime instance containing necessary runtime information.
 * @returns {Promise<string>} A promise that resolves to a string representation of the formatted portfolio.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface for transferring content, extends base Content interface.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient's address.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Check if the provided content is of type TransferContent.
 * @param {IAgentRuntime} runtime - The runtime environment.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is TransferContent, false otherwise.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens from the current account to a specified recipient.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - The transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Defines the type `NearConfig` by inferring the schema of `nearEnvSchema`.
 */
```

#### Functions

##### getConfig

```
/**
 * Function to get configuration based on the environment.
 *
 * @param {string | undefined | null} env - Environment variable to determine the configuration.
 * @returns {Object} Object containing configuration based on the provided environment.
 */
```

##### validateNearConfig

```
/**
 * Validates the Near config based on the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime object containing settings.
 * @returns {Promise<NearConfig>} - The validated Near config object.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Asynchronously checks the storage balance of a specified account.
 * 
 * @param {any} account - The account to check the storage balance of.
 * @param {string} contractId - The ID of the contract to query.
 * @returns {Promise<boolean>} A boolean value indicating whether the storage balance is greater than zero.
 */
```

##### swapToken

```
/**
 * Perform a token swap transaction on the blockchain.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} inputTokenId - The token id of the input token.
 * @param {string} outputTokenId - The token id of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} [slippageTolerance=0.01] - The allowable slippage tolerance for the swap.
 * @returns {Promise<any>} - A promise that resolves to an array of transactions for the swap.
 */
```


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Implement the ability to support multiple networks for swapping tokens.
   - Type: feature

### Troubleshooting
### Common Issues
1. Dependency error
   - Cause: Missing dependencies in the project.
   - Solution: Run `npm install` in the project directory to install all dependencies.

### Debugging Tips
- Check if all necessary environment variables are set.
- Verify if the NEAR wallet credentials are correctly configured.
- Ask your questions at https://eliza.gg/ 🚀 or in our discord

### FAQ
Q: How to connect to NEAR protocol using the provided runtime?
A: You can use the `connect` method in the `WalletProvider` class to establish a connection to the NEAR protocol using the provided runtime. Here's an example code snippet:

```typescript
public async connect(runtime: IAgentRuntime) {
    // Check if this account is already connected
    if (this.account) return this.account;

    // Get NEAR wallet credentials from runtime settings
    const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
    const publicKey = runtime.getSetting("NEAR_WALLET_PUBLIC_KEY");

    if (!secretKey || !publicKey) {
        throw new Error("NEAR wallet credentials not configured");
    }

    // Create KeyPair from secret key
    const keyPair = KeyPair.fromString(secretKey as KeyPairString);

    // Set the key in the keystore
    await this.keyStore.setKey(PROVIDER_CONFIG.networkId, this.accountId, keyPair);

    // Connect to NEAR protocol
    const nearConnection = await connect({
        networkId: PROVIDER_CONFIG.networkId,
        keyStore: this.keyStore,
        nodeUrl: PROVIDER_CONFIG.nodeUrl,
        walletUrl: PROVIDER_CONFIG.walletUrl,
        helperUrl: PROVIDER_CONFIG.helperUrl,
    });

    // Get the account for the specified account ID
    this.account = await nearConnection.account(this.accountId);
    return this.account;
}
```
If you encounter any issues, feel free to ask for assistance.
