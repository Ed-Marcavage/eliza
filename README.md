# @elizaos/plugin-near Documentation

## Overview
### Purpose
The @elizaos/plugin-near package provides functionalities for interacting with NEAR Protocol wallets, retrieving and formatting portfolio information, and performing token swaps on the NEAR Protocol blockchain.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- **WalletProvider**: Represents a wallet provider that interacts with a NEAR wallet.
- **TransferContent Interface**: Represents the content of a transfer.
- **NearToken Interface**: Represents a Near Protocol token.
- **WalletPortfolio Interface**: Represents a wallet portfolio.
- **NearConfig Type**: Represents the configuration for connecting to a NEAR Protocol environment.
- **checkStorageBalance Function**: Checks the storage balance of a given account.
- **swapToken Function**: Performs a token swap on the NEAR Protocol blockchain.
- **isTransferContent Function**: Checks if the given content matches the TransferContent structure.
- **transferNEAR Function**: Transfers NEAR tokens to a specified recipient.
- **getConfig Function**: Retrieves configuration based on the environment provided.
- **validateNearConfig Function**: Validates the Near configuration.

The plugin provides various features such as checking storage balance, performing token swaps, transferring NEAR tokens, retrieving configuration, and validating Near configurations.

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
- Navigate to the agent/ directory in your project.
- Run `pnpm install` to install the new plugin dependency.
- Run `pnpm build` to build the project with the new plugin.

### 2. Importing and Using the Plugin:
- Import the plugin using: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add the plugin to the AgentRuntime plugins array with other plugins.

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
- After integration, ensure you see ["✓ Registering action: <plugin actions>"] in the console to verify successful integration.

**Remember to review the plugin's dependencies and make sure they are installed in your project.**

Enjoy using the NEAR Protocol Plugin for Eliza on your project!

## Configuration
# Configuration Documentation

### Required Environment Variables and Their Purpose:
1. `NEAR_ENV` or `REACT_APP_REF_SDK_ENV`: Used to specify the environment (e.g. development, production, etc.).
2. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
3. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
4. `NEAR_ADDRESS`: NEAR address for the wallet.
5. `SLIPPAGE`: Slippage value for transactions.
6. `RPC_URL`: URL for the RPC server.
7. `NEAR_NETWORK`: Network identifier for NEAR blockchain.

### Sample .env File:
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

Please make sure to set these environment variables in the .env file and add the .env file to the .gitignore to prevent it from being committed to the repository.

## Features

### Actions
### [action name - found in the name: swap]

Perform a token swap using Ref Finance.

#### Properties
- Name: swap
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using the Ref Finance API. It generates the necessary transactions for swapping tokens based on the provided input token ID, output token ID, and amount to swap.

#### Examples
- user: "Swapping 1.0 NEAR for REF..."
- agent: "Swap completed successfully! Transaction hash: ..."

### [action name - found in the name: transfer]

Transfer NEAR tokens to another account

#### Properties
- Name: transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
The handler for this action transfers NEAR tokens to another account. It extracts recipient address, amount to transfer, and token contract address (null for native NEAR transfers) from the user request. It then initiates the transfer process using the NEAR blockchain.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
The Wallet Provider allows users to fetch their wallet balance and token information from the NEAR Protocol blockchain.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "your NEAR account ID";
const runtime: IAgentRuntime = // Set up the runtime with required settings

const walletData = await walletProvider.get(runtime, {}, {}); // Fetch wallet information
```




### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. **Fetch and Display Wallet Portfolio Information:**
```typescript
const walletProvider = new WalletProvider('exampleAccountId');
const formattedPortfolio = await walletProvider.getFormattedPortfolio(agentRuntime);
console.log(formattedPortfolio);
```

2. **Connect to NEAR Blockchain:**
```typescript
const walletProvider = new WalletProvider('exampleAccountId');
await walletProvider.connect(agentRuntime);
```

### Best Practices
- **Handle Errors Appropriately:** Ensure to handle any errors that may occur during fetching or formatting of portfolio information.
- **Use Caching for Improved Performance:** Utilize the cache for storing and retrieving data to reduce the number of API calls.

### actions/transfer.ts

- **Common Use Cases**:
1. Transfer NEAR tokens from one account to another using the `transferNEAR` function. For example:
```typescript
import { IAgentRuntime } from '...path/to/IAgentRuntime';
import { transferNEAR } from '...path/to/actions/transfer';

const runtime: IAgentRuntime = // initialize the runtime
const recipient = 'example.near';
const amount = '10';
transferNEAR(runtime, recipient, amount)
  .then((txHash) => {
    console.log(`Transfer successful. Transaction hash: ${txHash}`);
  })
  .catch((error) => {
    console.error(`Error transferring NEAR tokens: ${error.message}`);
  });
```

2. Check if a given content matches the `TransferContent` structure using the `isTransferContent` function. For example:
```typescript
import { IAgentRuntime } from '...path/to/IAgentRuntime';
import { isTransferContent } from '...path/to/actions/transfer';

const runtime: IAgentRuntime = // initialize the runtime
const content = {
  recipient: 'example.near',
  amount: '10',
  tokenAddress: '...',
};

if (isTransferContent(runtime, content)) {
  console.log('Content matches TransferContent structure.');
} else {
  console.log('Content does not match TransferContent structure.');
}
```

- **Best Practices**:
- Make sure to handle errors thrown by the `transferNEAR` function to provide a better user experience.
- Validate user input before calling the `transferNEAR` function to prevent unexpected behavior or errors.

### environment.ts

### Common Use Cases
1. **Use Case 1**: Retrieving configuration for the mainnet environment.
```typescript
import { getConfig } from './environment';

const mainnetConfig = getConfig('mainnet');
console.log(mainnetConfig);
```

2. **Use Case 2**: Validating a Near configuration based on the provided runtime settings.
```typescript
import { validateNearConfig } from './environment';

const runtimeSettings = {
  accountId: 'example.near',
  networkId: 'default'
};

validateNearConfig(runtimeSettings).then((validatedConfig) => {
  console.log(validatedConfig);
});
```

### Best Practices
- **Best practice 1**: Always provide an environment when calling `getConfig` to ensure the correct configuration is retrieved.
- **Best practice 2**: Handle the promise returned by `validateNearConfig` to access the validated Near configuration.

### actions/swap.ts

### Common Use Cases
1. Checking the storage balance of a specific account:
```typescript
const account = 'example.near';
const contractId = 'example-contract.near';
const hasStorageBalance = await checkStorageBalance(account, contractId);
if (hasStorageBalance) {
    console.log(`${account} has storage balance in ${contractId}`);
} else {
    console.log(`${account} does not have storage balance in ${contractId}`);
}
```

2. Performing a token swap on NEAR Protocol blockchain:
```typescript
const runtime = getRuntime(); // assuming getRuntime() function is defined
const inputTokenId = 'USDC';
const outputTokenId = 'DAI';
const amount = '100';
const slippageTolerance = 0.02;
const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log('Token swap transactions:', swapTransactions);
```

### Best Practices
- Always handle errors when using the `checkStorageBalance` function to ensure proper error handling.
- Make sure to provide necessary input parameters when using the `swapToken` function for a successful token swap.

## API Reference
### providers/wallet.ts

### Classes

#### WalletProvider:
```typescript
/**
 * Represents a wallet provider that interacts with a NEAR wallet to retrieve and format portfolio information.
 * @implements {Provider}
 */
 ```
  
**Methods:**
- constructor: 
```typescript
/**
 * Constructor for creating instance of a class with the provided accountId.
 * Initializes and sets up a new NodeCache with a cache time-to-live (TTL) of 300 seconds (5 mins).
 * Also initializes a new InMemoryKeyStore.
 * @param {string} accountId - The unique identifier for the account.
 */
```

- get: 
```typescript
/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {Memory} _message - The message from the memory.
 * @param {State} [_state] - The optional state.
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */
```

- connect: 
```typescript
/**
 * Connect to NEAR blockchain using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime to use for the connection.
 * @returns {Promise<void>} The NEAR account associated with the account ID.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */
```

- fetchWithRetry: 
```typescript
/**
 * Attempts to fetch data from a specified URL with retries in case of failure.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options for the fetch request.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

- fetchPortfolioValue: 
```typescript
/**
 * Asynchronously fetches the portfolio value of the wallet.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @returns {Promise<WalletPortfolio>} The portfolio value of the wallet.
 * @throws {Error} If an error occurs while fetching the portfolio value.
 */
```

- fetchNearPrice: 
```typescript
/**
 * Fetches the price of NEAR cryptocurrency in USD from the API.
 * If a cached price is available, it returns that. Otherwise, it makes
 * a request to the external API to fetch the price, stores it in the cache,
 * and returns the price.
 * @returns {Promise<number>} The price of NEAR in USD.
 */
```

- formatPortfolio: 
```typescript
/**
 * Formats the wallet portfolio information into a human-readable string.
 *
 * @param {IAgentRuntime} runtime - The runtime of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio of the wallet containing token balances and market prices.
 * @returns {string} The formatted portfolio information.
 */
```

- getFormattedPortfolio: 
```typescript
/**
 * Asynchronously fetches the portfolio value using the given runtime and returns a formatted string representing the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used to fetch the portfolio value.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio string or an error message if fetching the portfolio fails.
 */
```

#### Interfaces

- NearToken: 
```typescript
/**
 * Interface for representing a Near Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for UI display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol.
 */
```

- WalletPortfolio: 
```typescript
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value of the portfolio in USD.
 * @property {string} [totalNear] - The total value of the portfolio in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the portfolio.
 */
```

#### Types
None

### Functions
None

### actions/transfer.ts

### Classes

N/A

### Interfaces

#### TransferContent
```typescript
/**
 * Interface representing the content of a transfer.
 * Extends the Content interface.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### Types

N/A

### Functions

#### isTransferContent
```typescript
/**
 * Checks if the given content is TransferContent structure.
 * 
 * @param {IAgentRuntime} runtime - The runtime associated with the agent.
 * @param {any} content - The content to be checked.
 * @returns {boolean} - True if the content matches the TransferContent structure, false otherwise.
 */
```

#### transferNEAR
```typescript
/**
 * Transfer NEAR tokens from the current account to a specified recipient.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer (in NEAR).
 * @returns {Promise<string>} A Promise that resolves to the hash of the transaction upon successful transfer.
 * @throws {Error} Throws an error if NEAR wallet credentials are not configured.
 */
```

### environment.ts

### Classes

No classes defined in this file.

### Interfaces

No interfaces defined in this file.

### Types

- NearConfig: 
```typescript
/**
 * Represents the configuration for connecting to a NEAR Protocol environment.
 */
type NearConfig = {
  // Add properties here that define the configuration for connecting to a NEAR Protocol environment
}
```

### Functions

- getConfig: 
```typescript
/**
 * Retrieves configuration based on the environment provided.
 * If no environment is provided, uses the default values from ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV.
 * Possible environments and their corresponding configurations:
 * - mainnet: Returns configuration for the mainnet network.
 * - testnet: Returns configuration for the testnet network.
 * - default: Returns default configuration for the mainnet network if environment does not match mainnet or testnet.
 *
 * @param {string|null|undefined} env - The environment for which to retrieve configuration.
 * @returns {object} - The configuration object based on the provided or default environment.
 */
function getConfig(env?: string | null | undefined): object {
  // Implementation logic for retrieving configuration based on the provided environment
}
```

- validateNearConfig: 
```typescript
/**
 * Validates the Near configuration based on the provided runtime settings and environment variables.
 * @param {IAgentRuntime} runtime - The agent runtime object containing the settings.
 * @returns {Promise<NearConfig>} - A promise that resolves with the validated Near configuration.
 */
function validateNearConfig(runtime: IAgentRuntime): Promise<NearConfig> {
  // Implementation logic for validating the Near configuration based on the provided runtime settings and environment variables
}
```

### actions/swap.ts

### Classes

None

### Interfaces

None

### Types

None

### Functions

#### checkStorageBalance
```typescript
/**
 * Checks the storage balance of a given account by calling a specific view function on the specified contract.
 * @param {any} account - The account whose storage balance needs to be checked.
 * @param {string} contractId - The contract ID where the storage balance is stored.
 * @returns {Promise<boolean>} - A boolean indicating whether the storage balance is not null and the total value is not "0". Returns false if there is an error in checking the storage balance.
 */
```

#### swapToken
```typescript
/**
 * Performs a token swap on NEAR Protocol blockchain
 * @param {IAgentRuntime} runtime - The agent runtime
 * @param {string} inputTokenId - The ID of the input token
 * @param {string} outputTokenId - The ID of the output token
 * @param {string} amount - The amount of tokens to swap
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap
 * @returns {Promise<any>} The transactions for the token swap
 */
```  

Remember to replace `IAgentRuntime` with the appropriate type definition for the runtime in your code base.

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
         if (!accountId) {
             throw new Error("NEAR_ADDRESS not configured");
         }

         const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
         const keyStore = new keyStores.InMemoryKeyStore();
         const keyPair = utils.KeyPair.fromString(secretKey as KeyPairString);
         await keyStore.setKey(networkId, accountId, keyPair);

         const nearConnection = await connect({
             networkId,
             keyStore,
             nodeUrl,
         });

         const account = await nearConnection.account(accountId);

         // Check storage balance for both tokens
         const hasStorageIn = await checkStorageBalance(account, inputTokenId);
         const hasStorageOut = await checkStorageBalance(account, outputTokenId);

         const transactions = await instantSwap({
             tokenIn,
             tokenOut,
             amountIn: amount,
             swapTodos,
             slippageTolerance,
             AccountId: accountId,
         });

         // If storage deposit is needed, add it to transactions
         if (!hasStorageIn) {
             transactions.unshift({
                 receiverId: inputTokenId,
                 functionCalls: [
                     {
                         methodName: "storage_deposit",
                         args: {
                             account_id: accountId,
                             registration_only: true,
                         },
                         gas: "30000000000000",
                         amount: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                     },
                 ],
             });
         }

         if (!hasStorageOut) {
             transactions.unshift({
                 receiverId: outputTokenId,
                 functionCalls: [
                     {
                         methodName: "storage_deposit",
                         args: {
                             account_id: accountId,
                             registration_only: true,
                         },
                         gas: "30000000000000",
                         amount: FT_MINIMUM_STORAGE_BALANCE_LARGE,
                     },
                 ],
             });
         }

         return transactions;
     } catch (error) {
         console.error("Error in swapToken:", error);
         throw error;
     }
 }
   - Type: feature

### Troubleshooting
### Common Issues
1. Unable to fetch portfolio information
   - Cause: NEAR wallet credentials not configured
   - Solution: Make sure NEAR wallet credentials are properly configured in the settings.

### Debugging Tips
- Check if NEAR wallet credentials are correctly set.
- Verify that the network ID, node URL, and wallet URL are correctly configured.

### FAQ
Q: How to connect to the NEAR blockchain using the WalletProvider?
A: Use the `connect` method with the agent runtime to establish a connection and retrieve the NEAR blockchain account associated with the provided account ID. For example:
```typescript
const account = await walletProvider.connect(runtime);
```