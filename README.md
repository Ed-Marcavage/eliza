# @elizaos/plugin-near Documentation

## Overview
### Purpose
The @elizaos/plugin-near package provides a set of classes, interfaces, types, and functions for interacting with the NEAR Protocol, enabling developers to perform various operations such as token transfers, storage balance checks, token swaps, and configuration validation within NEAR applications.

### Key Features
- WalletProvider: Represents a Wallet Provider implementing the Provider interface.
- TransferContent: Interface for transfer content including recipient, amount, and optional token address.
- NearToken: Interface for NEAR Protocol tokens with attributes like name, symbol, balance, etc.
- WalletPortfolio: Interface for representing a wallet portfolio with total values and an array of NearToken objects.
- NearConfig: Type definition for a NearConfig object inferred from the nearEnvSchema.
- Functions: checkStorageBalance, swapToken, isTransferContent, transferNEAR, getConfig, validateNearConfig.

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

- Run the following commands:
  1. Navigate to the agent/ directory
  2. Run `pnpm install` to install the new dependency
  3. Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:

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

Ensure successful integration by checking the console for ["✓ Registering action: <plugin actions>"] after adding the plugin and running the application.

Make sure to follow these steps carefully to successfully integrate the @elizaos/plugin-near plugin into your ElizaOS project.

## Configuration
# Environment Variable Configuration Documentation

The following environment variables are required for the configuration of the application:

1. `NEAR_ENV`: Used for specifying the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used for the REF SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Used for the NEAR wallet secret key.
4. `NEAR_WALLET_PUBLIC_KEY`: Used for the NEAR wallet public key.
5. `NEAR_ADDRESS`: Used for the NEAR address.
6. `SLIPPAGE`: Used for defining slippage.
7. `RPC_URL`: Used for specifying the RPC URL.
8. `NEAR_NETWORK`: Used for defining the NEAR network.

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

Please ensure to set these environment variables in a `.env` file for the application to function properly. Also, remember to add the `.env` file to the `.gitignore` to prevent it from being committed to the repository.

## Features

### Actions
### swap
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap using Ref Finance by estimating the swap, checking the storage balance for both tokens, and performing the swap transactions.

#### Examples
- user: "example user request"
- agent: "example agent response"

### [action name - found in the name: SEND_NEAR]

Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
This handler executes the transfer of NEAR tokens to the specified recipient account.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### WalletProvider
WalletProvider is a provider that allows users to fetch and display wallet information such as account balance, token balances, and market prices using the NEAR Protocol.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { WalletProvider } from "./providers/wallet";

const provider = new WalletProvider("example_account_id");
const walletInfo = provider.get();
console.log(walletInfo);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. **Connecting to a NEAR wallet and fetching portfolio data**
```typescript
const walletProvider = new WalletProvider();
const runtime = { /* runtime object */ };
walletProvider.connect(runtime)
    .then(() => walletProvider.fetchPortfolioValue(runtime))
    .then(portfolio => console.log(walletProvider.formatPortfolio(runtime, portfolio)))
    .catch(error => console.error(error));
```

2. **Retrieving the formatted portfolio for a given agent runtime**
```typescript
const walletProvider = new WalletProvider();
const runtime = { /* agent runtime object */ };
walletProvider.getFormattedPortfolio(runtime)
    .then(formattedPortfolio => console.log(formattedPortfolio))
    .catch(error => console.error(error));
```

### Best Practices
- **Ensure proper error handling**: It's important to handle errors gracefully when using the `WalletProvider` methods to connect to a wallet or fetch portfolio data. This can help prevent unexpected behavior in the application.
- **Use caching for fetching NEAR price**: When fetching the NEAR price using the `fetchNearPrice` method, consider implementing caching to reduce redundant network requests and improve performance.

### actions/transfer.ts

### Common Use Cases
1. Transferring NEAR tokens to another user:
```typescript
import { transferNEAR } from './actions/transfer';

const recipient = 'bob.near';
const amount = '10'; // 10 NEAR tokens
transferNEAR(runtime, recipient, amount)
  .then((txHash) => {
    console.log(`Transfer successful. Transaction hash: ${txHash}`);
  })
  .catch((error) => {
    console.error(`Transfer failed: ${error.message}`);
  });
```

2. Checking if a given content object is a valid TransferContent:
```typescript
import { isTransferContent } from './actions/transfer';

const content = {
  recipient: 'alice.near',
  amount: '5',
  tokenAddress: 'near'
};

const isValidTransferContent = isTransferContent(runtime, content);
console.log(`Is valid TransferContent: ${isValidTransferContent}`);
```

### Best Practices
- Make sure to handle the promise returned by `transferNEAR` function appropriately, including error handling and success callbacks.
- Validate the content object before passing it to the `isTransferContent` function to ensure it meets the criteria for TransferContent.

### environment.ts

- **First use case with code example:**
  - Use case: Get the configuration object based on the specified environment or fallback to default values.
  
  ```typescript
  import { getConfig } from './environment';
  
  // Get the configuration object based on the specified environment
  const config = getConfig('development');
  
  console.log(config);
  ```

- **Second use case with code example:**
  - Use case: Validate the Near configuration by retrieving settings from the runtime and environment variables.
  
  ```typescript
  import { validateNearConfig } from './environment';
  
  // Validate the Near configuration
  const validatedConfig = await validateNearConfig(runtime);
  
  console.log(validatedConfig);
  ```

- **Best Practices:**
  - When using the `getConfig` function, always specify the environment parameter to get the configuration for a specific environment.
  - When using the `validateNearConfig` function, make sure to handle any errors thrown during the validation process properly.

### actions/swap.ts

### Common Use Cases
1. Checking Storage Balance: 
```typescript
const account = { /* account object */ };
const contractId = "exampleContractId";
checkStorageBalance(account, contractId).then((result) => {
    if (result) {
        console.log("Storage balance is not zero");
    } else {
        console.log("Storage balance is zero");
    }
});
```

2. Performing Token Swap:
```typescript
const runtime = { /* agent runtime interface */ };
const inputTokenId = "inputTokenId";
const outputTokenId = "outputTokenId";
const amount = "10"; // input token amount to swap
const slippageTolerance = 0.02;
swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance).then((transactions) => {
    console.log("Token swap transactions:", transactions);
});
```

### Best Practices
- Ensure to handle the Promise rejections appropriately in error handling for both use cases.
- Use proper type checking and validation for the input parameters to avoid unexpected behavior.

## API Reference
### providers/wallet.ts

### Classes

#### WalletProvider
/**
 * A class representing a Wallet Provider that implements the Provider interface.
 */

##### Methods

- constructor
/**
 * Constructor for creating an instance of a class.
 * 
 * @param {string} accountId - The account ID associated with the instance.
 */

- get
/**
 * Retrieves the formatted portfolio data from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @param {Memory} _message - The message object received by the agent.
 * @param {State} _state - Optional state object for the agent.
 * @returns {Promise<string | null>} The formatted portfolio data or null if an error occurs.
 */

- connect
/**
 * Connect to the NEAR wallet using the provided runtime object.
 * If the account is already set, return the existing account.
 * Otherwise, retrieve the NEAR wallet secret key and public key from the runtime settings.
 * Throw an error if the credentials are not configured.
 * Create a KeyPair object from the secret key and set it in the keystore.
 * Connect to the NEAR wallet using network settings and return the account.
 * @param {IAgentRuntime} runtime - The runtime object provided by the agent.
 * @returns {Promise} A promise that resolves with the NEAR account object after successful connection.
 */

- fetchWithRetry
/**
 * Fetches data from a given URL with the option to retry if unsuccessful.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} The fetched data from the URL.
 */

- fetchPortfolioValue
/**
 * Asynchronously fetches the current value of the portfolio for the connected account.
 *
 * @param {IAgentRuntime} runtime - The Agent runtime to be used for fetching data.
 * @returns {Promise<WalletPortfolio>} The wallet portfolio object containing total USD value, total NEAR balance, and tokens information.
 * @throws {Error} If there is an error during the fetching process.
 */

- fetchNearPrice
/**
 * Fetches the NEAR price from an API with caching and error handling.
 * @returns {Promise<number>} The NEAR price in USD
 */

- formatPortfolio
/**
 * Formats the portfolio data into a readable string format.
 * 
 * @param {IAgentRuntime} runtime - The runtime context of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted portfolio data as a string.
 */

- getFormattedPortfolio
/**
 * Asynchronously retrieves the formatted portfolio for a given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime for which to retrieve the portfolio.
 * @returns {Promise<string>} A Promise that resolves to the formatted portfolio value.
 */

### Interfaces

#### NearToken
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The user interface amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol's native token, if available.
 */

#### WalletPortfolio
/**
 * interface for representing a wallet portfolio
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - the total value in USD
 * @property {string} [totalNear] - the total value in NEAR token (optional)
 * @property {Array<NearToken>} tokens - an array of NearToken objects
 */

### Types
N/A

### Functions
N/A

### actions/transfer.ts

### Classes

[No classes defined]

### Interfaces

#### TransferContent
/**
 * Interface representing the content of a transfer.
 * Extends the Content interface.
 * @interface
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional. The token address for native NEAR transfers.
 */

### Types

[No types defined]

### Functions

#### isTransferContent
/**
 * Checks if the given content object is a valid TransferContent based on specific criteria.
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @param {any} content - The content object to be checked.
 * @returns {boolean} Returns true if the content object is a valid TransferContent, otherwise false.
 */

#### transferNEAR
/**
 * Transfers NEAR tokens to a recipient.
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} A promise that resolves to the transaction hash of the transfer.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */

### environment.ts

### Classes

### Interfaces

### Types

- NearConfig:
```typescript
/**
 * Type definition for a NearConfig object which is inferred from the nearEnvSchema.
 */
```

### Functions

- getConfig:
```typescript
/**
 * Get the configuration object based on the specified environment or fallback to ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV
 * 
 * @param {string | undefined | null} env The specified environment value
 * @returns {object} The configuration object based on the specified environment
 */
```

- validateNearConfig:
```typescript
/**
 * Validates the Near configuration by retrieving settings from the runtime and environment variables,
 * merging them with environment-specific config, and then parsing the configuration using the NearEnv schema.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used to retrieve settings
 * @returns {Promise<NearConfig>} The validated Near configuration
 * @throws {Error} Throws an error if the validation fails, including detailed error messages
 */
```

In this API reference, the `NearConfig` type is defined for a Near configuration object inferred from the `nearEnvSchema`. The `getConfig` function retrieves a configuration object based on a specified environment value or fallback to predefined values. The `validateNearConfig` function validates the Near configuration by retrieving settings, merging them, and parsing the configuration using the NearEnv schema, returning a Promise of the validated configuration or throwing an error if validation fails.

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
 * Asynchronously checks the storage balance of an account within a specified contract.
 * 
 * @param {any} account - The account object used to access the contract.
 * @param {string} contractId - The ID of the contract to check the storage balance in.
 * @returns {Promise<boolean>} A Promise that resolves to true if the storage balance is not zero, otherwise false.
 */
async function checkStorageBalance(account: any, contractId: string): Promise<boolean> {
    // Implementation goes here
}
```

#### swapToken
```typescript
/**
 * Perform a token swap operation using the given input and output token IDs, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of the input token to swap.
 * @param {number} [slippageTolerance=0.01] - The acceptable slippage tolerance for the swap.
 * @returns {Promise<any>} The array of transactions for the token swap operation.
 */
async function swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number = 0.01): Promise<any> {
    // Implementation goes here
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
1. Class 'WalletProvider' not connecting to NEAR wallet
   - Cause: NEAR wallet credentials not configured or incorrect.
   - Solution: Ensure NEAR wallet credentials are correctly set in the runtime settings.

### Debugging Tips
- Check if NEAR wallet secret key and public key are configured properly.
- Verify that the NEAR wallet connection is successful by logging connection details.

### FAQ
Q: How to format the portfolio data?
A: Use the 'formatPortfolio' method with the agent runtime and portfolio object as parameters to generate a formatted string output.