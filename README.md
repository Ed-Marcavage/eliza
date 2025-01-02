# @elizaos/plugin-near Documentation

## Overview
### Purpose
The '@elizaos/plugin-near' package is designed to provide a set of classes, interfaces, types, and functions for interacting with NEAR Protocol within a wallet provider context. It enables developers to perform various actions such as transferring tokens, checking storage balances, swapping tokens, and validating NEAR configurations.

### Key Features
- **WalletProvider Class**: Represents a Wallet Provider implementing the Provider interface for NEAR Protocol.
- **TransferContent Interface**: Represents the content required for initiating a transfer with properties like recipient, amount, and token address.
- **NearToken Interface**: Describes a NEAR Protocol token with properties like name, symbol, balance, and price.
- **WalletPortfolio Interface**: Represents a wallet portfolio containing total USD value, NEAR value, and an array of NearToken objects.
- **NearConfig Type**: Type alias for the configuration object parsed from 'NEAR_ENV' environment variable.
- **Functions**:
  - **checkStorageBalance**: Checks the storage balance of an account for a specific contract.
  - **swapToken**: Swaps tokens on NEAR Protocol with slippage tolerance.
  - **isTransferContent**: Validates if content meets TransferContent criteria.
  - **transferNEAR**: Transfers NEAR tokens to a recipient with a given amount.
  - **getConfig**: Retrieves configuration based on environment variables.
  - **validateNearConfig**: Validates the NEAR configuration based on the provided runtime.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the plugin to your ElizaOS project:
1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. CD into the agent/ directory
3. Run `pnpm install` to install the new dependency
4. Run `pnpm build` to build the project with the new plugin

### 2. Importing and using the plugin:
- Import syntax: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add it to the AgentRuntime plugins array in your project

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
Ensure you see ["✓ Registering action: <plugin actions>"] in the console to verify successful integration

### Dependencies:
- "@elizaos/core": "workspace:*"
- "@ref-finance/ref-sdk": "^1.4.6"
- "tsup": "8.3.5"
- "near-api-js": "5.0.1"
- "bignumber.js": "9.1.2"
- "node-cache": "5.1.2"

### Peer Dependencies:
- "whatwg-url": "7.1.0"
- "form-data": "4.0.1"

## Configuration
# Environment Variable Configuration Documentation

To configure the application, you will need to set the following environment variables in a .env file. Make sure to include the required variables listed below along with their purpose:

1. **NEAR_ENV**: Specifies the environment for NEAR.
2. **REACT_APP_REF_SDK_ENV**: Specifies the environment for the React app reference SDK.
3. **NEAR_WALLET_SECRET_KEY**: Secret key for the NEAR wallet.
4. **NEAR_WALLET_PUBLIC_KEY**: Public key for the NEAR wallet.
5. **NEAR_ADDRESS**: NEAR address used by the runtime.
6. **SLIPPAGE**: Slippage setting for the runtime.
7. **RPC_URL**: RPC URL for the runtime.
8. **NEAR_NETWORK**: NEAR network identifier.
   
Below is an example of how the .env file should look like:

```plaintext
NEAR_ENV= 
REACT_APP_REF_SDK_ENV=
NEAR_WALLET_SECRET_KEY=
NEAR_WALLET_PUBLIC_KEY=
NEAR_ADDRESS=
SLIPPAGE=
RPC_URL=
NEAR_NETWORK=testnet
```

Please ensure that the .env file is included in the .gitignore file to prevent it from being committed to the repository. The application will read these environment variables during runtime to customize its behavior accordingly.

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
The handler for this action executes a token swap using Ref Finance. It validates the message, composes the state, gets wallet information, generates the swap context, and executes the token swap based on the input parameters.

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
The handler for this action executes the transfer of NEAR tokens to another account. It validates the transfer content, composes the transfer context, generates the transfer content, and then initiates the transfer. If successful, it returns a message confirming the transfer and the transaction hash. If there is an error during the transfer, it returns an error message.

#### Examples
- User1: "Send 1.5 NEAR to bob.testnet"
- Agent: "I'll send 1.5 NEAR now..."
- Agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### WalletProvider
The WalletProvider is a provider that allows users to fetch and display their wallet portfolio information, including token balances and market prices.

#### Methods
The `get()` method in the WalletProvider class is responsible for fetching the user's wallet portfolio information and formatting it for display.

#### Usage
```typescript
import { WalletProvider } from "./providers/wallet";

const accountId = "example_account_id";
const provider = new WalletProvider(accountId);
const portfolio = await provider.getFormattedPortfolio(runtime);
console.log(portfolio);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching portfolio information and formatting it for display:
```typescript
const walletProvider = new WalletProvider();
const runtime = {} as IAgentRuntime;

walletProvider.fetchPortfolioValue(runtime)
  .then((portfolio: WalletPortfolio) => {
    const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
    console.log(formattedPortfolio);
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
```

2. Connecting to the NEAR blockchain and retrieving the NEAR account:
```typescript
const walletProvider = new WalletProvider();
const runtime = {} as IAgentRuntime;

walletProvider.connect(runtime)
  .then((nearAccount: Promise<nearAPI.Account>) => {
    console.log("Connected to NEAR account:", nearAccount);
  })
  .catch((error: Error) => {
    console.error(error.message);
  });
```

### Best Practices
- Ensure that NEAR wallet credentials are properly configured before calling the connect method.
- Handle errors gracefully in promise chains to provide better user feedback.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens to another account:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, isTransferContent, transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = ...; // Initialize the runtime

const transferData: TransferContent = {
  recipient: 'example.near',
  amount: '1000000000000000000000000', // 1 NEAR in yoctoNEAR
};

if (isTransferContent(runtime, transferData)) {
  transferNEAR(runtime, transferData.recipient, transferData.amount)
    .then((txHash: string) => {
      console.log(`Transfer successful. Transaction hash: ${txHash}`);
    })
    .catch((error: Error) => {
      console.error(`Error transferring NEAR: ${error.message}`);
    });
}
```

2. Verify if content is of type TransferContent:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { TransferContent, isTransferContent } from './actions/transfer';

const runtime: IAgentRuntime = ...; // Initialize the runtime

const contentToCheck: TransferContent = {
  recipient: 'example.near',
  amount: '1000000000000000000000000', // 1 NEAR in yoctoNEAR
};

if (isTransferContent(runtime, contentToCheck)) {
  console.log('Content is of type TransferContent');
} else {
  console.log('Content is not of type TransferContent');
}
```

### Best Practices
- Ensure to properly configure NEAR wallet credentials before using `transferNEAR` function.
- Always check if the content meets the criteria to be considered as `TransferContent` using `isTransferContent` function before performing any transfer actions.

### environment.ts

### Common Use Cases
1. **Retrieving Configuration Object:** Users can use the `getConfig` function to retrieve a configuration object based on the provided environment variable. If the environment variable is not provided, it falls back to predefined values or defaults to 'testnet'.
```typescript
import { getConfig } from './environment';

const config = getConfig('mainnet');
console.log(config);
```

2. **Validating Near Configuration:** Developers can use the `validateNearConfig` function to validate a Near configuration object based on the provided runtime.
```typescript
import { validateNearConfig } from './environment';

const runtime = { networkId: 'mainnet', nodeUrl: 'https://example.com' };
validateNearConfig(runtime)
  .then((validatedConfig) => {
    console.log(validatedConfig);
  });
```

### Best Practices
- **Ensure Environment Variables:** It is recommended to ensure that the required environment variables are set before using the functions in `environment.ts`.
- **Handle Errors Gracefully:** Implement error handling mechanisms to gracefully handle any errors that may occur during the configuration retrieval or validation process.

### actions/swap.ts

### Common Use Cases
1. Check the storage balance of an account for a specific contract:
```typescript
const account = "alice.testnet";
const contractId = "contract.testnet";
checkStorageBalance(account, contractId)
  .then((result) => {
    console.log(`Storage balance for ${account} on ${contractId}: ${result}`);
  });
```

2. Swap tokens on NEAR Protocol:
```typescript
const runtime = new AgentRuntime();
const inputTokenId = "token1";
const outputTokenId = "token2";
const amount = "10";
const slippageTolerance = 0.01;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
  .then((transactions) => {
    console.log("Swap transactions: ", transactions);
  });
```

### Best Practices
- Always handle the Promise rejections by catching errors using `.catch()` to avoid unhandled promise rejections.
- Use appropriate error handling and logging techniques to debug any issues that may arise during execution.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * A class representing a Wallet Provider that implements the Provider interface.
 */
 */
```

#### Interfaces

##### NearToken

```
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for display purposes.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The total value of the token in USD.
 * @property {string} [valueNear] - The total value of the token in NEAR Protocol's native currency (NEAR).
 */
```

##### WalletPortfolio

```
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total USD value in the wallet.
 * @property {string} [totalNear] - The total NEAR value in the wallet (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the wallet.
 */
```

#### Methods

##### constructor

```
/**
* Constructor for creating a new instance of the class.
* @param {string} accountId - The account ID associated with the instance.
*/
```

##### get

```
/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The message to process (not used in this method).
 * @param {State} [_state] - The optional state to pass for processing (not used in this method).
 * @returns {Promise<string | null>} The formatted portfolio string or null if an error occurs.
 */
```

##### connect

```
/**
 * Connect to NEAR blockchain by setting up the account and keypair in the keystore.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment.
 * @returns {Promise<Promise<nearAPI.Account>>} - A promise that resolves to the NEAR account.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a given URL with optional request options, and retries a specified number of times before giving up.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The request options passed to the fetch function (default is an empty object).
 * @returns {Promise<any>} - A promise that resolves with the fetched data or rejects with an error if all retry attempts fail.
 */
```

##### fetchPortfolioValue

```
/**
 * Fetches the current portfolio value of the account.
 *
 * @param {IAgentRuntime} runtime - The runtime object for executing the fetch operation.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to a WalletPortfolio object representing the current portfolio value.
 * @throws {Error} If there is an error fetching the portfolio value.
 */
```

##### fetchNearPrice

```
/**
 * Fetches the current NEAR price in USD from a remote API. 
 * If the price is already cached, it will return the cached value. 
 * If not, it will call the remote API and store the fetched price in the cache for future use.
 * 
 * @returns {Promise<number>} The NEAR price in USD.
 */
```

##### formatPortfolio

```
/**
 * Formats the portfolio information into a readable string format.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The portfolio object containing the wallet data.
 * @returns {string} The formatted portfolio information as a string.
 */
```

##### getFormattedPortfolio

```
/**
 * Asynchronously retrieves the formatted portfolio value using the given agent runtime.
 *
 * @param {IAgentRuntime} runtime The agent runtime used to fetch the portfolio value.
 * @returns {Promise<string>} A promise that resolves to the formatted portfolio value.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Represents the content needed to initiate a transfer.
 * Extends the basic Content interface.
 *
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient's account or address.
 * @property {string|number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for non-native transfers.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Checks if the provided content is of type TransferContent.
 * @param {IAgentRuntime} runtime - The runtime context.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content meets the criteria to be considered TransferContent.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens to a recipient using the given runtime and amount.
 * @param {IAgentRuntime} runtime - The runtime object containing settings and methods for the execution environment.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer in the smallest unit (yoctoNEAR).
 * @returns {Promise<string>} - A promise that resolves to the transaction hash of the transfer.
 * @throws {Error} Will throw an error if the NEAR wallet credentials are not properly configured.
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Type alias for the configuration object parsed from the 'NEAR_ENV' environment variable.
 */
```

#### Functions

##### getConfig

```
/**
 * Retrieves configuration based on the provided environment variable.
 * If the environment variable is not provided, it falls back to predefined values or defaults to 'testnet'.
 * 
 * @param {string | undefined | null} env - The environment variable to determine the configuration. Defaults to ENV, process.env.NEAR_ENV, or process.env.REACT_APP_REF_SDK_ENV.
 * @returns {Object} Configuration object based on the provided environment variable:
 *   - networkId: The network identifier.
 *   - nodeUrl: The URL of the node.
 *   - walletUrl: The URL of the wallet.
 *   - WRAP_NEAR_CONTRACT_ID: The contract ID for wrapping NEAR tokens.
 *   - REF_FI_CONTRACT_ID: The contract ID for REF finance.
 *   - REF_TOKEN_ID: The token ID for REF finance.
 *   - indexerUrl: The URL of the indexer.
 *   - explorerUrl: The URL of the explorer.
 *   - REF_DCL_SWAP_CONTRACT_ID: The contract ID for DCL swap.
 */
```

##### validateNearConfig

```
/**
 * Validates the Near configuration based on the provided runtime
 * @param {IAgentRuntime} runtime The runtime from which to extract settings
 * @returns {Promise<NearConfig>} The validated Near configuration object
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Check the storage balance of an account for a specific contract.
 *
 * @param {any} account - The account to check the storage balance for.
 * @param {string} contractId - The ID of the contract to check against.
 * @returns {Promise<boolean>} A Promise that resolves to true if the storage balance is not 0, false otherwise.
 */
```

##### swapToken

```
/**
 * Function to swap tokens on NEAR Protocol
 * @param {IAgentRuntime} runtime - The runtime environment
 * @param {string} inputTokenId - The ID of the input token
 * @param {string} outputTokenId - The ID of the output token
 * @param {string} amount - The amount of tokens to swap
 * @param {number} slippageTolerance - The allowed slippage tolerance (default is 0.01)
 * @returns {Promise<any>} - A promise that resolves to an array of transactions for the swap
 */
```


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Implement the ability to specify multiple networks for token swapping
   - Type: feature

### Troubleshooting
### Common Issues
1. Failure to connect to NEAR blockchain
   - Cause: NEAR wallet credentials not configured
   - Solution: Ensure that NEAR wallet credentials are properly configured before attempting to connect to the blockchain

### Debugging Tips
- Check that the NEAR wallet secret key and public key are correctly set in the runtime settings
- Verify that the NEAR address is provided in the runtime settings for proper authentication

### FAQ
Q: How do I fetch the current portfolio value of the account?
A: You can use the `fetchPortfolioValue` method in the `WalletProvider` class to retrieve the current portfolio value. For example:
   ```typescript
   const portfolio = await walletProvider.fetchPortfolioValue(runtime);
   ```

Q: How to connect to NEAR blockchain and set up the account and keypair?
A: You can use the `connect` method in the `WalletProvider` class for establishing a connection to the NEAR blockchain and setting up the account and keypair. Here is an example:
   ```typescript
   const account = await walletProvider.connect(runtime);
   ```