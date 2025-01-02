# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package serves as a comprehensive plugin for managing NEAR Protocol related functionalities and transactions within applications. It offers various classes, interfaces, types, and functions to facilitate tasks like transferring NEAR tokens, checking balances, performing token swaps, and validating NEAR configurations.

### Key Features
- **WalletProvider Class**: Represents a wallet provider implementing the Provider interface.
- **TransferContent Interface**: Data structure for transfer transaction details.
- **NearToken Interface**: Represents NEAR token properties.
- **WalletPortfolio Interface**: Represents a wallet's portfolio with token details.
- **NearConfig Type**: Configuration type for NEAR environment variables.
- **checkStorageBalance Function**: Checks the storage balance of an account.
- **swapToken Function**: Performs token swap transactions.
- **isTransferContent Function**: Checks if content is a TransferContent object.
- **transferNEAR Function**: Transfers NEAR tokens to a recipient.
- **getConfig Function**: Retrieves configuration based on the environment.
- **validateNearConfig Function**: Validates NEAR configuration parameters.

## Installation
## Installation Instructions

### 1. Add the plugin to your ElizaOS project:

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

### 2. Import and Use the Plugin:

- Import the plugin using:
  ```javascript
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

### 4. Verification Steps:

Ensure successful integration by checking for the following message in the console:
```
✓ Registering action: <plugin actions>
```

Make sure to have the required peer dependencies installed in your project as well.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose

1. `NEAR_ENV`: Used as a fallback value if `NEAR_ENV` is not provided in the environment.
2. `REACT_APP_REF_SDK_ENV`: Environment variable for setting the reference SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for Near wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for Near wallet.
5. `NEAR_ADDRESS`: NEAR address used for runtime settings.
6. `SLIPPAGE`: Slippage setting for runtime or from environment variable `SLIPPAGE`.
7. `RPC_URL`: RPC URL setting for blockchain interactions.
8. `NEAR_NETWORK`: Network ID for NEAR network, defaults to "testnet".
  
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

Please make sure to configure these environment variables in the .env file. Ensure that the .env file is added to the .gitignore to prevent it from being committed to the repository.

## Features

### Actions
No actions documentation available.

### Providers
### Wallet Provider
This provider allows users to fetch and display NEAR wallet information.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const runtime: IAgentRuntime;
const message: Memory;
const state: State;

const result = await walletProvider.get(runtime, message, state);
console.log(result);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Create a new instance of the WalletProvider class and connect to a NEAR wallet using the provided runtime.
```javascript
const walletProvider = new WalletProvider("myAccountId");
const account = await walletProvider.connect(runtime);
```

2. Fetch the current portfolio value and retrieve the formatted portfolio information.
```javascript
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

### Best Practices
- Ensure to handle errors gracefully when fetching data from external APIs to avoid application crashes.
- Utilize caching mechanisms to store and retrieve data efficiently for improved performance.

### actions/transfer.ts

### Common Use Cases
1. **Transfer NEAR tokens:** Transfer NEAR tokens from one NEAR account to another.
   ```typescript
   import { transferNEAR } from './actions/transfer';

   const recipient = 'recipient.near';
   const amount = '10';
   transferNEAR(runtime, recipient, amount)
     .then((transactionHash) => {
       console.log(`Transfer successful. Transaction Hash: ${transactionHash}`);
     })
     .catch((error) => {
       console.error(error.message);
     });
   ```

2. **Check if content is TransferContent:** Validate if the provided content is a TransferContent object.
   ```typescript
   import { isTransferContent } from './actions/transfer';

   const content = {
     recipient: 'recipient.near',
     amount: '10',
     tokenAddress: 'token.near'
   };

   const isTransfer = isTransferContent(runtime, content);
   if (isTransfer) {
     console.log('Content is a valid TransferContent object');
   } else {
     console.log('Content is not a TransferContent object');
   }
   ```

### Best Practices
- **Validate Content:** Always validate the content using `isTransferContent` function before performing a transfer to ensure data integrity.
- **Handle Errors:** Use `.catch` block to handle any errors that may occur during the transfer process to provide appropriate feedback to the user.

### environment.ts

- First use case with code example:
```typescript
import { getConfig } from 'environment';

const config = getConfig('production');
console.log(config);
```

- Second use case with code example:
```typescript
import { validateNearConfig } from 'environment';
import { IAgentRuntime } from 'types';

const runtime: IAgentRuntime = {
  env: 'production',
  app_id: 'myapp',
  api_key: 'myapikey'
};
const validatedConfig = await validateNearConfig(runtime);
console.log(validatedConfig);
```

- Best practice 1:
Make sure to provide a valid environment parameter when using the getConfig function to retrieve the configuration object.

- Best practice 2:
Ensure that the runtime object passed to validateNearConfig includes all the necessary properties for validating the Near configuration.

### actions/swap.ts

### Common Use Cases
1. Checking the storage balance of a specific account:
```typescript
const account = { address: "0x1234567890" };
const contractId = "0xabcdef";
const hasBalance = await checkStorageBalance(account, contractId);
console.log(hasBalance); // true or false
```

2. Performing a token swap transaction:
```typescript
const runtime = { /* agent runtime object */ };
const inputTokenId = "0x123456";
const outputTokenId = "0xabcdef";
const amount = "100";
const slippageTolerance = 0.01;
const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log(transactions); // array of transactions
```

### Best Practices
- When calling `checkStorageBalance`, ensure that the `account` object contains a valid address and the `contractId` is the correct contract ID.
- When calling `swapToken`, make sure to provide the necessary parameters such as `runtime`, `inputTokenId`, `outputTokenId`, `amount`, and optionally `slippageTolerance` for a smooth token swap transaction.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

/**
 * Represents a Wallet Provider that implements the Provider interface.
 */
 */

#### Interfaces

##### NearToken

/**
 * Represents a near token with its properties.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near protocol.
 */

##### WalletPortfolio

/**
 * Interface representing a Wallet Portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects.
 */

#### Methods

##### constructor

/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The account ID to associate with the instance
 */

##### get

/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @param {Memory} _message - The message object from memory.
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */

##### connect

/**
 * Connect to NEAR wallet using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime to use for connecting to NEAR wallet.
 * @returns {Promise<Account>} - The NEAR wallet account.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */

##### fetchWithRetry

/**
 * Fetch data from a URL with retry mechanism.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - The options for the fetch request.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */

##### fetchPortfolioValue

/**
 * Fetches the current portfolio value by connecting to the account and retrieving the balance.
 * If a cached value is found, it returns the cached value instead of fetching again.
 * Converts the balance from yoctoNEAR to NEAR and fetches the NEAR price in USD.
 * Calculates the total portfolio value in USD and constructs a `WalletPortfolio` object with the details.
 * Caches the portfolio value for future use.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to connect to the account.
 * @returns {Promise<WalletPortfolio>} The wallet portfolio object with total USD value, total NEAR balance,
 * tokens information including name, symbol, decimals, balance, price in USD, and value in USD.
 * @throws {Error} If there is an error while fetching the portfolio value.
 */

##### fetchNearPrice

/**
 * Fetches the NEAR token price from the CoinGecko API.
 * Checks the cache for a cached price first and returns that if available.
 * If not cached, makes a request to the CoinGecko API to fetch the price,
 * stores it in the cache, and returns the price.
 * If an error occurs during the process, logs the error and returns 0.
 * @returns {Promise<number>} The NEAR token price in USD.
 */

##### formatPortfolio

/**
 * Formats the portfolio information into a human-readable string.
 * 
 * @param {IAgentRuntime} runtime - The runtime information for the agent.
 * @param {WalletPortfolio} portfolio - The portfolio containing wallet details.
 * @returns {string} - The formatted portfolio information.
 */

##### getFormattedPortfolio

/**
 * Asynchronously retrieves the portfolio value and formats it into a string.
 * 
 * @param {IAgentRuntime} runtime - The runtime object that contains necessary information for fetching the portfolio.
 * @returns {Promise<string>} A promise that resolves to a formatted string representing the portfolio value.
 */


### actions/transfer.ts

#### Interfaces

##### TransferContent

/**
 * Interface representing the data needed for a transfer transaction.
 * Extends Content interface.
 * @typedef {object} TransferContent
 * @property {string} recipient - The recipient address for the transfer.
 * @property {string|number} amount - The amount to transfer, can be either a string or a number.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */

#### Functions

##### isTransferContent

/**
 * Check if the provided content is a TransferContent object.
 *
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {any} content - The content to check.
 * @returns {boolean} - Returns true if the content is a TransferContent object.
 */

##### transferNEAR

/**
 * Transfer NEAR tokens from the current NEAR account to a recipient.
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} recipient - The recipient's NEAR account ID.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - A Promise that resolves with the transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */


### environment.ts

#### Types

##### NearConfig

/**
 * Type definition for the configuration of NEAR environment variables.
 */

#### Functions

##### getConfig

/**
 * Function to get the configuration object based on the environment provided or default values from ENV or process environment variables.
 * @param {string | undefined | null} env - The environment to retrieve the configuration for. Defaults to ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV if not provided.
 * @returns {object} - The configuration object based on the provided environment or defaults if not found.
 */

##### validateNearConfig

/**
 * Validates the Near configuration parameters based on the provided runtime.
 * Retrieves the configuration values from the provided runtime and environment variables,
 * and then applies schema validation to ensure the correctness of the NearConfig.
 *
 * @param {IAgentRuntime} runtime - The runtime object containing configuration settings.
 * @returns {Promise<NearConfig>} The validated Near configuration object.
 * @throws {Error} If the Near configuration validation fails.
 */


### actions/swap.ts

#### Functions

##### checkStorageBalance

/**
 * Checks the storage balance of a specified account by calling the view function "storage_balance_of" on the given contract ID.
 * @param {any} account - The account object used to make the view function call.
 * @param {string} contractId - The contract ID where the view function is called to check the storage balance.
 * @returns {Promise<boolean>} A Promise that resolves to true if the storage balance is not null and the total balance is not "0", otherwise resolves to false.
 */

##### swapToken

/**
 * Perform a token swap transaction.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} [slippageTolerance=0.01] - The allowable slippage tolerance for the swap.
 * @returns {Promise<any>} A promise that resolves to an array of transactions for the token swap.
 */


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Function `swapToken` needs to be updated to support multiple networks for swapping tokens.
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Issue: NEAR wallet credentials not configured
   - Cause: The NEAR wallet credentials are missing or not properly configured in the runtime settings.
   - Solution: Ensure that the NEAR wallet secret key and public key are set correctly in the runtime settings.

### Debugging Tips
- Check the NEAR wallet credentials configuration in the runtime settings.
- Verify that the NEAR wallet secret key and public key are correctly set before executing any wallet-related functions.

### FAQ
Q: How can I check if the NEAR wallet credentials are configured properly?
A: You can verify the NEAR wallet credentials by checking the runtime settings for the NEAR wallet secret key and public key. Make sure they are set correctly to connect to the NEAR wallet successfully.