# @elizaos/plugin-near Documentation

## Overview
### Purpose
The @elizaos/plugin-near package is designed to provide a range of functionalities related to NEAR Protocol integration within applications. Through classes, interfaces, types, and functions, this plugin offers tools for handling NEAR wallets, token transactions, storage balance checks, and configuration validation.

#### Key Features

- **WalletProvider:** Represents a provider for fetching and formatting wallet information.
- **TransferContent Interface:** Defines the content needed for a transfer operation.
- **NearToken Interface:** Represents a NEAR Protocol token with various properties.
- **WalletPortfolio Interface:** Describes a wallet portfolio containing token information.
- **NearConfig Type:** Type definition based on the inferred type from the nearEnvSchema.
- **checkStorageBalance Function:** Checks the storage balance of an account within a contract.
- **swapToken Function:** Performs a token swap transaction with specified tokens and amount.
- **isTransferContent Function:** Checks if provided content is a TransferContent object.
- **transferNEAR Function:** Transfers NEAR cryptocurrency between accounts.
- **getConfig Function:** Retrieves configuration based on the provided environment.
- **validateNearConfig Function:** Validates NEAR configuration settings in the runtime environment.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

## Adding the Plugin to Your ElizaOS Project

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

## Importing and Using the Plugin

1. Import the plugin using:
   ```typescript
   import { nearPlugin } from "@elizaos/plugin-near";
   ```

2. Add `nearPlugin` to the AgentRuntime plugins array in your project setup.

## Complete Integration Example

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

## Verification Steps

To ensure successful integration, check for ["✓ Registering action: <plugin actions>"] in the console after adding and setting up the plugin.

Remember to also install the plugin's dependencies listed in the plugin file for proper functionality.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose:
1. **NEAR_ENV:** This variable specifies the environment for NEAR protocol.
2. **REACT_APP_REF_SDK_ENV:** This variable specifies the environment for REACT app using reference SDK.
3. **NEAR_WALLET_SECRET_KEY:** This variable contains the secret key for NEAR wallet.
4. **NEAR_WALLET_PUBLIC_KEY:** This variable contains the public key for NEAR wallet.
5. **NEAR_ADDRESS:** This variable contains the NEAR address.
6. **SLIPPAGE:** This variable specifies the slippage for runtime settings.
7. **RPC_URL:** This variable contains the RPC URL for the runtime settings.
8. **NEAR_NETWORK:** This variable specifies the NEAR network ID.
9. **RPC_URL:** This variable contains the RPC URL.
10. **NEAR_NETWORK:** This variable specifies the NEAR network ID for URLs.
11. **SLIPPAGE:** This variable specifies the slippage amount for transactions.

## Example .env File:
```
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=test
NEAR_WALLET_SECRET_KEY=****************
NEAR_WALLET_PUBLIC_KEY=****************
NEAR_ADDRESS=your_near_address
SLIPPAGE=1
RPC_URL=https://your_rpc_url
NEAR_NETWORK=testnet
RPC_URL=https://rpc.testnet.near.org
walletUrl=https://testnet.mynearwallet.com/
helperUrl=https://helper.testnet.near.org
explorerUrl=https://testnet.nearblocks.io
SLIPPAGE=1
SLIPPAGE=1
```

Please ensure that the .env file is configured with all the required environment variables and is added to the .gitignore file to prevent it from being committed to the repository.

## Features

### Actions
## Name
executeSwap

## Description
Perform a token swap using Ref Finance.

## Similes
- SWAP_TOKENS_NEAR
- TOKEN_SWAP_NEAR
- TRADE_TOKENS_NEAR
- EXCHANGE_TOKENS_NEAR

## Example usage
1. User {{user1}} requests to swap 1.0 WRAP for REF tokens.
2. Agent responds with "Swapping 1.0 NEAR for REF..." and initiates the token swap.
3. Agent confirms with "Swap completed successfully! Transaction hash: ..."

## Implementation details
- Initializes Ref SDK with the specified network environment.
- Retrieves wallet information using the walletProvider.
- Validates and composes the swap response object.
- Executes the token swap using the swapToken function with specified input token ID, output token ID, amount, and slippage tolerance.
- Signs and sends transactions using NEAR account credentials.
- Handles successful completion or errors during the swap process and sends appropriate messages to the user.

## Name
executeTransfer

## Description
This action allows for the transfer of NEAR tokens to another account.

## Similes
- TRANSFER_NEAR
- SEND_TOKENS
- TRANSFER_TOKENS
- PAY_NEAR

## Example usage
1. User sends 1.5 NEAR to bob.testnet:
   ```
   User: "Send 1.5 NEAR to bob.testnet"
   Agent: "I'll send 1.5 NEAR now..."
   Agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"
   ```

## Important implementation details
- The handler function initializes or updates the state, composes transfer context, generates transfer content, and validates the transfer content.
- If the content is invalid, an error message is displayed, and the transfer request is unable to be processed.
- Upon successful NEAR transfer, the transaction hash is returned in the callback response.



### Providers
### Wallet Provider
The Wallet Provider allows for fetching and formatting wallet information including account balances and token values.

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
1. Fetching and formatting wallet information:
```typescript
const walletProvider = new WalletProvider();
const runtime = getAgentRuntime();
const formattedPortfolio = await walletProvider.get(runtime, memory);
console.log(formattedPortfolio);
```

2. Connecting to NEAR wallet and retrieving account object:
```typescript
const walletProvider = new WalletProvider();
const runtime = getAgentRuntime();
const account = await walletProvider.connect(runtime);
console.log(account);
```

### Best Practices
- Ensure the NEAR wallet credentials are properly configured before attempting to connect.
- Utilize caching for fetching portfolio value and NEAR price to optimize performance.

### actions/transfer.ts

### Common Use Cases
1. Sending NEAR cryptocurrency to another account:
```typescript
import { IAgentRuntime } from 'somewhere';

// Assuming transferNEAR function is imported
const runtime: IAgentRuntime = getRuntime();
const recipient = 'alice.near';
const amount = '10';
transferNEAR(runtime, recipient, amount)
  .then((txHash) => {
    console.log(`Transfer successful. Transaction hash: ${txHash}`);
  })
  .catch((error) => {
    console.error(`Error transferring NEAR: ${error.message}`);
  });
```

2. Checking if a given content object is a TransferContent:
```typescript
import { IAgentRuntime } from 'somewhere';

// Assuming isTransferContent function and TransferContent interface are imported
const runtime: IAgentRuntime = getRuntime();
const content = {
  recipient: 'bob.near',
  amount: '5',
  tokenAddress: 'near'
};
const isTransfer = isTransferContent(runtime, content);
console.log(`Is content a transfer: ${isTransfer}`); // Output: Is content a transfer: true
```

### Best Practices
- Make sure to handle errors gracefully when using the transferNEAR function to handle any potential issues with the transfer.
- Ensure to validate the input content before using the isTransferContent function to avoid unexpected behavior.

### environment.ts

- **Common Use Cases**
1. Getting configuration based on environment:
```typescript
import { getConfig } from './environment';

const env = 'development';
const config = getConfig(env);

console.log(config);
```

2. Validating Near configuration settings:
```typescript
import { validateNearConfig } from './environment';

const runtime = {
  nodeUrl: 'https://rpc.testnet.near.org',
  networkId: 'testnet',
  walletUrl: 'https://wallet.testnet.near.org',
  helperUrl: 'https://helper.testnet.near.org'
};

validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log(nearConfig);
  })
  .catch((error) => {
    console.error(error);
  });
```

- **Best Practices**
- Always pass the correct environment value when using `getConfig()` function to fetch appropriate configuration.
- Ensure to handle any errors that may occur during the validation process when using `validateNearConfig()` function.

### actions/swap.ts

### Common Use Cases
1. Checking storage balance before performing a token swap transaction:
```typescript
import { checkStorageBalance, swapToken } from './actions/swap';

const account = { address: '0x1234567890', privateKey: 'abcdef1234567890' };
const contractId = 'contract123';
const runtime = { api: 'runtime' };
const inputTokenId = 'token1';
const outputTokenId = 'token2';
const amount = '100';
const slippageTolerance = 0.01;

checkStorageBalance(account, contractId)
    .then((isValid) => {
        if (isValid) {
            swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
                .then((transactions) => {
                    console.log(transactions);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            console.log('Storage balance is not valid for token swap.');
        }
        
    })
    .catch((error) => {
        console.error(error);
    });
```

2. Performing a token swap transaction with default slippage tolerance:
```typescript
import { swapToken } from './actions/swap';

const runtime = { api: 'runtime' };
const inputTokenId = 'token1';
const outputTokenId = 'token2';
const amount = '100';

swapToken(runtime, inputTokenId, outputTokenId, amount)
    .then((transactions) => {
        console.log(transactions);
    })
    .catch((error) => {
        console.error(error);
    });
```

### Best Practices
- Ensure to handle errors and exceptions using try-catch blocks or .catch() in promises to prevent unexpected behavior in the code.
- Use meaningful variable names and comments to improve the readability and maintainability of the code.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

/**
 * Represents a provider for fetching and formatting wallet information.
 * @implements {Provider}
 */
 */

#### Interfaces

##### NearToken

/**
 * Interface for representing a NEAR Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places used for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI representation of the token amount.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol token (optional).
 */

##### WalletPortfolio

/**
 * Interface representing a wallet portfolio.
 *
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in Near currency (optional).
 * @property {Array<NearToken>} tokens - An array of Near tokens.
 */

#### Methods

##### constructor

/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The account ID associated with the instance.
 */

##### get

/**
 * Asynchronously retrieves and returns a formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime information from the agent.
 * @param {Memory} _message - The memory data associated with the request.
 * @param {State} [_state] - Optional state information.
 * @returns {Promise<string | null>} The formatted portfolio string if successful, null if an error occurs.
 */

##### connect

/**
 * Connects to NEAR wallet using the provided runtime and returns the account object.
 *
 * @param {IAgentRuntime} runtime - The runtime object used to access NEAR wallet settings.
 * @returns {Promise<any>} - Returns the NEAR account object.
 * @throws {Error} - Throws an error if NEAR wallet credentials are not configured.
 */

##### fetchWithRetry

/**
 * Fetches data from a URL with retries in case of failure.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to include in the request.
 * @returns {Promise<any>} The fetched data as a Promise.
 */

##### fetchPortfolioValue

/**
 * Fetches the current value of the portfolio by querying the account balance and NEAR price,
 * and returns a WalletPortfolio object containing the total USD value, total NEAR value,
 * and token details. It also utilizes caching to store and retrieve the portfolio value.
 * 
 * @param {IAgentRuntime} runtime - The Agent runtime to use for connecting to the account
 * @returns {Promise<WalletPortfolio>} The portfolio object containing total USD value, total NEAR value,
 * and token details
 */

##### fetchNearPrice

/**
 * Fetches the current NEAR price from the Coingecko API.
 * If the price is already cached, return it, otherwise make a request to the API and cache the result.
 * @returns {Promise<number>} The current NEAR price in USD.
 */

##### formatPortfolio

/**
 * Formats the provided portfolio data into a readable string format.
 *
 * @param {IAgentRuntime} runtime - The runtime information of the current agent.
 * @param {WalletPortfolio} portfolio - The portfolio data containing information about the wallet.
 * @returns {string} The formatted portfolio data as a string.
 */

##### getFormattedPortfolio

/**
 * Asynchronously retrieves the formatted portfolio value using the given Agent Runtime.
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value.
 */


### actions/transfer.ts

#### Interfaces

##### TransferContent

/**
 * An interface representing the content needed for a transfer. Extends the Content interface.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient's address for the transfer.
 * @property {string|number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional. The token address for native NEAR transfers.
 */

#### Functions

##### isTransferContent

/**
 * Check if the provided content is a TransferContent object.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Whether the content is a TransferContent object or not.
 */

##### transferNEAR

/**
 * Transfer NEAR cryptocurrency from one account to another.
 * @param {IAgentRuntime} runtime - The runtime object for the agent.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount to be transferred in NEAR.
 * @returns {Promise<string>} - A Promise that resolves to the transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */


### environment.ts

#### Types

##### NearConfig

/**
 * Type definition for NearConfig based on the inferred type from the nearEnvSchema.
 */

#### Functions

##### getConfig

/**
 * Function to get configuration based on the environment provided.
 * 
 * @param {string | undefined | null} env - Environment to fetch configuration for.
 * @returns {object} Configuration object based on environment.
 */

##### validateNearConfig

/**
 * Validates the Near configuration settings based on the provided runtime.
 *
 * @param {IAgentRuntime} runtime The runtime object containing settings.
 * @returns {Promise<NearConfig>} A promise that resolves to the validated Near config.
 * @throws {Error} If there is an error during validation, including Zod validation errors.
 */


### actions/swap.ts

#### Functions

##### checkStorageBalance

/**
 * Asynchronously checks the storage balance of a specific account within a contract.
 * 
 * @param {any} account - The account object used to interact with the contract.
 * @param {string} contractId - The ID of the contract to check the storage balance for.
 * @returns {Promise<boolean>} - A boolean indicating if the storage balance is not null and total is not "0".
 */

##### swapToken

/**
 * Perform a token swap transaction using the given input and output tokens, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap transaction.
 * @returns {Promise<any>} - A promise that resolves to an array of transaction objects for the token swap.
 */


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: To implement support for multiple networks in the swapToken function
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Wallet credentials not configured
   - Cause: NEAR wallet credentials (NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY) are not configured.
   - Solution: Make sure to set the NEAR wallet credentials in the agent's settings.

### Debugging Tips
- Check if the NEAR wallet credentials are correctly configured.
- Verify if the NEAR network settings (NEAR_NETWORK, RPC_URL) are set accordingly.

### FAQ
Q: How can I fetch the formatted portfolio using the WalletProvider?
A: You can use the `getFormattedPortfolio` method of the WalletProvider to asynchronously retrieve and format the portfolio based on the runtime information.