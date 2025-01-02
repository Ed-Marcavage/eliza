# @elizaos/plugin-near Documentation

## Overview

### Purpose
The `@elizaos/plugin-near` package is a comprehensive toolkit designed to connect to the NEAR protocol wallet, fetch portfolio values, and format portfolio reports. It includes various classes, interfaces, types, and functions that provide functionalities for transferring tokens, checking storage balances, performing token swaps, and validating NEAR configuration settings.

### Key Features
- **WalletProvider Class**: Represents a WalletProvider that allows for connecting to a NEAR wallet and handling portfolio values and reports.
- **TransferContent Interface**: Interface for transferring content with recipient, amount, and token address properties.
- **NearToken Interface**: Represents a token on the NEAR protocol with basic token information.
- **WalletPortfolio Interface**: Represents a wallet portfolio with total value in USD, tokens array, and optional total value in NEAR.
- **NearConfig Type**: Type definition for NearConfig inferred from nearEnvSchema.
- **checkStorageBalance Function**: Asynchronously checks the storage balance for a specific account within a contract.
- **swapToken Function**: Perform a token swap using input and output tokens, amount, and slippage tolerance.
- **isTransferContent Function**: Checks if the given content object is of TransferContent type.
- **transferNEAR Function**: Transfer NEAR tokens to a recipient.
- **getConfig Function**: Get the configuration based on the specified or default environment.
- **validateNearConfig Function**: Validates the Near configuration settings provided by the runtime and environment variables.

## Installation
# ElizaOS @elizaos/plugin-near Plugin Installation and Integration Instructions

### 1. Add the plugin to your ElizaOS project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- CD into the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

### 2. Import and use the plugin after installation:
- Use the import syntax: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add the plugin to the AgentRuntime plugins array

### 3. Integration example showing the complete setup:
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

### 4. Verification steps to ensure successful integration:
- Ensure you see `["✓ Registering action: <plugin actions>"]` in the console

**Note:** This plugin requires peer dependencies "whatwg-url@7.1.0" and "form-data@4.0.1" to be installed separately.

## Configuration
# Configuration Documentation

### Required Environment Variables:
1. `NEAR_ENV`: Used as a fallback in case a specific environment variable is not provided.
2. `REACT_APP_REF_SDK_ENV`: Used in a React app to specify the environment for the reference SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet authentication.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet authentication.
5. `NEAR_ADDRESS`: Address for NEAR blockchain operations.
6. `SLIPPAGE`: Slippage value for transactions.
7. `RPC_URL`: RPC URL for blockchain interaction.
8. `NEAR_NETWORK`: Network ID for NEAR blockchain operations.

### Sample .env File:
```bash
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=staging
NEAR_WALLET_SECRET_KEY=some_secret_key
NEAR_WALLET_PUBLIC_KEY=some_public_key
NEAR_ADDRESS=example_address
SLIPPAGE=0.5
RPC_URL=https://example_rpc_url.com
NEAR_NETWORK=testnet
```

Please ensure that you set up these environment variables in a `.env` file in your project. Also, make sure to add the `.env` file to your `.gitignore` to prevent it from being committed to the repository.

## Features

### Actions
No actions documentation available.

### Providers
### WalletProvider
This provider allows users to fetch wallet information such as account balance, token balances, and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const exampleGet = async () => {
    const runtime: IAgentRuntime = ...; // Initialize runtime
    const message: Memory = ...; // Initialize message
    const state: State = ...; // Initialize state

    const result = await walletProvider.get(runtime, message, state);
    console.log(result);
}

exampleGet();
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. **Connecting to a NEAR wallet and fetching portfolio value:**
```typescript
const walletProvider = new WalletProvider("exampleAccount");
walletProvider.connect(runtime)
  .then((account) => {
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

2. **Fetching NEAR price and formatting portfolio data:**
```typescript
const walletProvider = new WalletProvider("exampleAccount");
walletProvider.fetchNearPrice()
  .then((nearPrice) => {
    console.log("Current NEAR price: $", nearPrice);
  })
  .catch((error) => {
    console.error(error);
  });

walletProvider.connect(runtime)
  .then((account) => {
    return walletProvider.fetchPortfolioValue(runtime);
  })
  .then((portfolio) => {
    const formattedPortfolio = walletProvider.getFormattedPortfolio(runtime);
    console.log(formattedPortfolio);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Best Practices
- **Error Handling:** Ensure to handle errors properly in promises and catch any exceptions that may occur during wallet connection or fetching portfolio data.
- **Caching Mechanism:** Utilize the cache to store and retrieve data efficiently, especially for repetitive API calls like fetching NEAR price. This can help reduce network requests and improve performance.

### actions/transfer.ts

### Common Use Cases
1. **Transfer NEAR tokens to a recipient:** This use case involves transferring NEAR tokens from one account to another using the `transferNEAR` function. For example, transferring 10 NEAR tokens to the account with ID "recipient123":
```typescript
const recipient = "recipient123";
const amount = "10";
const transactionHash = await transferNEAR(runtime, recipient, amount);
```

2. **Check if content is of type TransferContent:** This use case involves checking if a given content object is of type TransferContent using the `isTransferContent` function. For example, checking if a content object `contentObj` is of type TransferContent:
```typescript
const isTransfer = isTransferContent(runtime, contentObj);
console.log(isTransfer); // Output: true or false
```

### Best Practices
- **Validate recipient and amount before transferring:** Before calling the `transferNEAR` function, it is recommended to validate the recipient account ID and the amount of tokens to be transferred to ensure the transaction is processed correctly.
- **Handle errors and exceptions:** Implement error handling mechanisms when using the `transferNEAR` function to handle any exceptions or failures that may occur during the transfer process, ensuring a smooth user experience.

### environment.ts

- **Common Use Cases**

1. **First use case with code example:**
   This code can be used to retrieve the configuration based on the environment specified or default to a predefined value. For example:
   ```typescript
   import { getConfig } from 'environment.ts';

   const config = getConfig('production');
   console.log(config);
   ```

2. **Second use case with code example:**
   The `validateNearConfig` function can be used to validate the Near configuration settings provided by the runtime and environment variables. For instance:
   ```typescript
   import { validateNearConfig } from 'environment.ts';

   const validatedConfig = validateNearConfig(runtime);
   console.log(validatedConfig);
   ```

- **Best Practices**

- **Best practice 1**
  When using the `getConfig` function, it is recommended to specify the environment explicitly for clarity and consistency in the codebase.

- **Best practice 2**
  Prior to using the `validateNearConfig` function, ensure that the runtime instance passed as an argument is properly initialized to avoid any runtime errors.

### actions/swap.ts

### Common Use Cases
1. Perform a token swap between two tokens using the `swapToken` function. This can be useful when users want to exchange one token for another with a specified amount and slippage tolerance.

```typescript
const inputTokenId = "token_id_1";
const outputTokenId = "token_id_2";
const amount = "100";
const slippageTolerance = 0.01;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance).then((transactions) => {
    console.log("Token swap successful with transactions: ", transactions);
}).catch((error) => {
    console.error("Token swap failed with error: ", error);
});
```

2. Check the storage balance for a specific account within a contract using the `checkStorageBalance` function. This can be useful for verifying the available storage balance for a user in a particular contract.

```typescript
const account = { 
    address: "user_address",
    balance: 100
};
const contractId = "contract_id";

checkStorageBalance(account, contractId).then((success) => {
    if(success) {
        console.log("Storage balance check successful for account: ", account.address);
    } else {
        console.log("Storage balance check failed for account: ", account.address);
    }
}).catch((error) => {
    console.error("Error checking storage balance: ", error);
});
```

### Best Practices
- Ensure to handle the promise rejections appropriately when using these functions to catch any errors that may occur during the token swap or storage balance check operations.
- Validate the input parameters such as token IDs, amount, and slippage tolerance before calling the `swapToken` function to prevent unexpected behavior or errors.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

/**
 * A class representing a WalletProvider that implements the Provider interface.
 * Allows for connecting to a NEAR wallet, fetching portfolio value, and formatting the portfolio report.
 */

#### Interfaces

##### NearToken

/**
 * Represents a token on the NEAR protocol with basic information.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places used for the token.
 * @property {string} balance - The token balance.
 * @property {string} uiAmount - The amount of token for user interface display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR protocol.
 */

##### WalletPortfolio

/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens.
 */

#### Methods

##### constructor

/**
 * Constructor for creating an instance of a class with the specified `accountId`.
 * Initializes `cache` with a NodeCache object with a standard Time-To-Live (TTL) of 300 seconds (5 minutes).
 * Initializes `keyStore` with an InMemoryKeyStore.
 * 
 * @param {string} accountId - The unique identifier for the account.
 */

##### get

/**
 * Asynchronously retrieves the formatted portfolio from a given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to retrieve the portfolio from.
 * @param {Memory} _message - The memory object associated with the request.
 * @param {State} [_state] - Optional state object to be passed along with the request.
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio or null if an error occurs.
 */

##### connect

/**
 * Connects the account to the NEAR wallet using the provided runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime used to retrieve wallet settings.
 * @returns {Promise<Account>} The connected NEAR account.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */

##### fetchWithRetry

/**
 * Fetches data from a specified URL with retries in case of failure.
 * 
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} options - (Optional) The options for the fetch request.
 * @returns {Promise<any>} - A promise that resolves with the fetched data.
 */

##### fetchPortfolioValue

/**
 * Fetches the value of the portfolio for the current account.
 * If the value is found in the cache, it will return the cached value.
 * Otherwise, it will connect to the runtime, retrieve the account balance, 
 * convert it to NEAR, fetch the NEAR price in USD, and calculate the total value in USD.
 * The portfolio object will include the total value in USD and NEAR, along with details of tokens.
 * 
 * @param {IAgentRuntime} runtime - The runtime to use for fetching data.
 * @returns {Promise<WalletPortfolio>} The portfolio value object containing total value, NEAR balance, and token details.
 * @throws {Error} Will throw an error if there is an issue fetching the portfolio data.
 */

##### fetchNearPrice

/**
 * Fetches the NEAR price from the Coingecko API and stores it in cache if not already cached.
 * @returns {Promise<number>} The NEAR price in USD.
 */

##### formatPortfolio

/**
 * Formats the given wallet portfolio data into a readable string format.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime information.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted portfolio information.
 */

##### getFormattedPortfolio

/**
 * Asynchronously gets the formatted portfolio based on the provided agent runtime.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @returns {Promise<string>} A Promise that resolves to a string containing the formatted portfolio.
 */


### actions/transfer.ts

#### Interfaces

##### TransferContent

/**
 * Interface for transferring content.
 * Extends Content interface.
 * 
 * @property {string} recipient - The recipient of the transfer.
 * @property {string|number} amount - The amount to transfer (can be a string or number).
 * @property {string} [tokenAddress] - Optional field for native NEAR transfers.
 */

#### Functions

##### isTransferContent

/**
 * Checks if the given content object is a TransferContent type.
 *
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content to check.
 * @returns {boolean} True if the content is of type TransferContent, false otherwise.
 */

##### transferNEAR

/**
 * Transfer NEAR tokens to a recipient.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used to interact with the agent.
 * @param {string} recipient - The account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - A promise that resolves to the transaction hash of the transfer.
 */



### environment.ts

#### Types

##### NearConfig

/**
 * Type definition for NearConfig, inferred from nearEnvSchema
 */

#### Functions

##### getConfig

/**
 * Function to get the configuration based on the environment provided.
 * If no environment is specified, it will default to the value of ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV.
 *
 * @param {string | undefined | null} env - The environment to get the configuration for.
 * @returns {object} - The configuration object based on the specified or default environment.
 */

##### validateNearConfig

/**
 * Validates the Near configuration settings provided by the runtime and environment variables
 * @param {IAgentRuntime} runtime - The runtime instance
 * @returns {Promise<NearConfig>} - The validated Near configuration object
 */


### actions/swap.ts

#### Functions

##### checkStorageBalance

/**
 * Asynchronously checks the storage balance for a specific account within a contract.
 * @param {any} account The account object representing the user's account.
 * @param {string} contractId The unique identifier of the contract to check the storage balance in.
 * @returns {Promise<boolean>} A boolean value indicating if the storage balance check was successful (true) or not (false).
 */

##### swapToken

/**
 * Perform a token swap using the provided input and output tokens, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance
 * @param {string} inputTokenId - The token ID for the input token
 * @param {string} outputTokenId - The token ID for the output token
 * @param {string} amount - The amount of the input token to swap
 * @param {number} slippageTolerance - The maximum acceptable slippage tolerance for the swap (default is 0.01)
 * @returns {Promise<any>} A promise that resolves with the list of transactions for the swap
 */


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Implement functionality to support swapping tokens on different networks
   - Type: feature

### Troubleshooting
### Common Issues
1. Technical Error
   - Cause: A technical error occurred due to an unexpected issue in the code execution.
   - Solution: Review the code implementation, check for any syntax errors, and ensure all dependencies are properly installed.

### Debugging Tips
- Check the console logs for detailed error messages.
- Use a debugger tool to step through the code and identify the source of the issue.

### FAQ
Q: Why am I getting a "NEAR wallet credentials not configured" error?
A: This error occurs when the NEAR wallet credentials (NEAR_WALLET_SECRET_KEY, NEAR_WALLET_PUBLIC_KEY) are not properly configured. Make sure to set these values in your runtime settings to connect to the NEAR wallet successfully.