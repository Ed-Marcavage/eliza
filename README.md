# @elizaos/plugin-near Documentation

## Overview
### Purpose
The main purpose of @elizaos/plugin-near is to provide functionality for interacting with the Near Protocol blockchain, allowing users to transfer tokens, check balances, and perform token swaps.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- **WalletProvider**: A class representing a wallet provider that implements the Provider interface, utilizing an in-memory cache, key store, and account details.
- **Interfaces**: TransferContent, NearToken, WalletPortfolio defining structures for transferring content, token information, and wallet portfolios.
- **Functions**: checkStorageBalance, swapToken, isTransferContent, transferNEAR, getConfig, validateNearConfig providing functionalities like checking storage balance, token swaps, transfer of NEAR tokens, getting configuration, and validating Near configuration.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-near

### 1. Add the Plugin to Your ElizaOS Project
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

### 2. Import and Use the Plugin
- Import syntax: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add the plugin to the AgentRuntime plugins array

### 3. Integration Example
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

### 4. Verification Steps
Ensure successful integration by checking for the following in the console:
```plaintext
✓ Registering action: executeSwap
✓ Registering action: executeTransfer
``` 

These steps should guide you through installing, importing, integrating, and verifying the @elizaos/plugin-near plugin in your ElizaOS project.

## Configuration
# Configuration Documentation

### Required Environment Variables and Their Purpose:

1. `NEAR_ENV`: Used to specify the environment for NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Used to specify the environment for the React Reference SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the runtime.
6. `SLIPPAGE`: Slippage setting for the runtime.
7. `RPC_URL`: URL for the RPC connection.
8. `NEAR_NETWORK`: Network ID for NEAR protocol.

### Full .env Example File:

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=YOUR_SECRET_KEY
NEAR_WALLET_PUBLIC_KEY=YOUR_PUBLIC_KEY
NEAR_ADDRESS=YOUR_NEAR_ADDRESS
SLIPPAGE=1
RPC_URL=https://your_rpc_url.com
NEAR_NETWORK=testnet
```

---
**Note**:  
Please ensure that the .env file is configured according to the above example.  
Also, make sure to add the .env file to the .gitignore to avoid committing sensitive information to the repository.

## Features

### Actions
### EXECUTE_SWAP_NEAR
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
The handler for this action initiates a token swap using Ref Finance. It validates the message, composes the necessary context, generates an object based on the context, and executes the token swap by signing and sending transactions.

#### Examples
- User1:
  - Input Token ID: wrap.testnet
  - Output Token ID: ref.fakes.testnet
  - Amount: 1.0
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
The handler function for SEND_NEAR action composes a transfer context, generates transfer content, validates the transfer content, and then executes the NEAR token transfer. If the transfer is successful, it returns a success message with the transaction details. If there is an error during the transfer, it logs the error and returns an error message.

#### Examples
- User 1: "Send 1.5 NEAR to bob.testnet"
- Agent: "I'll send 1.5 NEAR now..."
- Agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
This provider allows users to fetch wallet information, including token balances and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "exampleAccountId";

const result = await walletProvider.get(runtime, message, state);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching and displaying formatted portfolio information for a user's wallet.
```typescript
import { WalletProvider } from './providers/wallet';

const walletProvider = new WalletProvider('exampleAccountId');
walletProvider.getFormattedPortfolio({ /* runtime object */ })
  .then((formattedPortfolio) => {
    console.log(formattedPortfolio);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

2. Connecting to the NEAR blockchain and fetching current portfolio value.
```typescript
import { WalletProvider } from './providers/wallet';

const walletProvider = new WalletProvider('exampleAccountId');
walletProvider.connect({ /* runtime object */ })
  .then(async () => {
    const portfolio = await walletProvider.fetchPortfolioValue({ /* runtime object */ });
    console.log(portfolio);
  })
  .catch((error) => {
    console.error(error.message);
  });
```

### Best Practices
- Ensure to handle errors properly in promise chains to provide meaningful feedback to users.
- Use the provided interfaces (NearToken, WalletPortfolio) to maintain a consistent data structure for wallet information throughout the application.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens to another account:
```typescript
import { IAgentRuntime } from 'near-agent-js';
import { transferNEAR } from './actions/transfer';

const runtime: IAgentRuntime = {...}; // Initialize runtime
const recipient = 'receiver.near';
const amount = '10'; // Amount to transfer

transferNEAR(runtime, recipient, amount)
  .then((txHash) => console.log(`Transfer successful. Transaction hash: ${txHash}`))
  .catch((err) => console.error(`Error transferring NEAR tokens: ${err.message}`));
```

2. Verify if content is of type TransferContent:
```typescript
import { IAgentRuntime } from 'near-agent-js';
import { isTransferContent } from './actions/transfer';

const runtime: IAgentRuntime = {...}; // Initialize runtime
const content = { recipient: 'receiver.near', amount: '10' };

const isTransfer = isTransferContent(runtime, content);
console.log(`Content is of type TransferContent: ${isTransfer}`);
```

### Best Practices
- Ensure that the NEAR wallet credentials are properly configured before using `transferNEAR`.
- When checking if content is of type `TransferContent`, provide the required properties `recipient` and `amount` to accurately determine the type.

### environment.ts

### Common Use Cases

1. Get configuration based on the environment:
```typescript
import { getConfig } from './environment';

const config = getConfig('production');
console.log(config); // Output: { "apiUrl": "https://example.com/api", "apiKey": "123456" }
```

2. Validate and get Near configuration:
```typescript
import { validateNearConfig } from './environment';

const runtime = {
  networkId: 'default',
  nodeUrl: 'https://rpc.nearprotocol.com',
  walletUrl: 'https://wallet.nearprotocol.com',
  helperUrl: 'https://helper.nearprotocol.com',
};

validateNearConfig(runtime).then((nearConfig) => {
  console.log(nearConfig); // Output: { "networkId": "default", "nodeUrl": "https://rpc.nearprotocol.com", "walletUrl": "https://wallet.nearprotocol.com" }
});
```

### Best Practices
- Ensure to pass the correct environment parameter when calling `getConfig` to get the desired configuration.
- When using `validateNearConfig`, make sure to provide a valid runtime object to get the Near configuration.

### actions/swap.ts

- **Common Use Cases**
1. Checking storage balance of a specific account within a contract:
```typescript
const account = "example.near";
const contractId = "example_contract_id";
const hasBalance = await checkStorageBalance(account, contractId);
console.log(`Does ${account} have storage balance in ${contractId} contract: ${hasBalance}`);
```

2. Performing a token swap operation:
```typescript
const runtime = new AgentRuntime();
const inputTokenId = "tokenA";
const outputTokenId = "tokenB";
const amount = "10";
const slippageTolerance = 0.02;
const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log("Token swap transactions:", transactions);
```

- **Best Practices**
- Make sure to handle promise rejections in a proper way to avoid unhandled exceptions.
- Always provide valid input parameters to avoid errors and unexpected results.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * A class representing a wallet provider that implements the Provider interface.
 * Utilizes an in-memory cache, key store, and account details.
 */
 */
```

#### Interfaces

##### NearToken

```
/**
 * Represents a Near Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for user interface display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near Protocol tokens (optional).
 */
```

##### WalletPortfolio

```
/**
 * Interface representing a wallet portfolio.
 * @property {string} totalUsd - The total USD value in the wallet.
 * @property {string | undefined} totalNear - The total NEAR value in the wallet (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the wallet.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the class with provided accountId.
 *
 * @param {string} accountId - The unique identifier for the account.
 */
```

##### get

```
/**
 * Retrieves the formatted portfolio from the wallet provider. 
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The memory object for the agent.
 * @param {State} [_state] - Optional state information.
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */
```

##### connect

```
/**
 * Connects to the NEAR blockchain using the provided runtime object.
 * Retrieves NEAR wallet credentials from settings, creates a KeyPair from the secret key,
 * sets the key in the keystore, establishes connection to NEAR network, 
 * and returns the NEAR account.
 * 
 * @param {IAgentRuntime} runtime - The runtime object to use for connecting to NEAR blockchain.
 * @returns {Promise<any>} A promise that resolves to the NEAR account object.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from the specified URL with retry logic.
 * @param {string} url - The URL to fetch data from
 * @param {RequestInit} [options={}] - Optional request options
 * @returns {Promise<any>} - A promise that resolves with the fetched data
 */
```

##### fetchPortfolioValue

```
/**
 * Asynchronously fetches the current value of the portfolio for the account associated with the specified runtime.
 * Retrieves the portfolio value from the cache if available, otherwise fetches the value from the blockchain.
 * Converts the NEAR balance to NEAR tokens and fetches the corresponding USD price to calculate the total portfolio value in USD.
 * Caches the portfolio value for future use and returns the WalletPortfolio object representing the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The runtime object representing the associated account
 * @returns {Promise<WalletPortfolio>} The WalletPortfolio object representing the current value of the portfolio
 * @throws {Error} Throws an error if any issues occur while fetching the portfolio value
 */
```

##### fetchNearPrice

```
/**
 * Fetches the current NEAR price from the API and saves it to the cache for future use.
 * If the price is already cached, it returns the cached value.
 *
 * @returns {Promise<number>} The current NEAR price in USD
 */
```

##### formatPortfolio

```
/**
 * Formats the portfolio information for display.
 *
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The wallet portfolio to format.
 * @returns {string} The formatted portfolio information.
 */
```

##### getFormattedPortfolio

```
/**
 * Asynchronously retrieves and returns a formatted portfolio representing the user's wallet information.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment in which the function is executed.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio or an error message if unsuccessful.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface for transferring content to a recipient.
 * Extends the Content interface.
 * @interface TransferContent
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional for native NEAR transfers, specifies the token address.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Checks if the provided content is of type TransferContent.
 * 
 * @param {IAgentRuntime} runtime - The runtime information.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is TransferContent, false otherwise.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens to a specified recipient.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime environment.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - The transaction hash of the transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured properly.
 */
```


### environment.ts

#### Types

##### NearConfig

```
/**
 * Type definition for the NearConfig object, inferred from the nearEnvSchema schema.
 */
```

#### Functions

##### getConfig

```
/**
 * Function to get configuration based on the environment.
 * 
 * @param {string} [env=ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV] - The environment to get configuration for.
 * @returns {object} - The configuration object based on the environment.
 */
```

##### validateNearConfig

```
/**
 * Validates and returns the Near configuration based on the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime object containing configuration settings.
 * @returns {Promise<NearConfig>} - A Promise that resolves to the validated Near configuration.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Asynchronously checks the storage balance of a specified account within a contract.
 * 
 * @param {any} account - The account for which the storage balance is to be checked.
 * @param {string} contractId - The ID of the contract to check the storage balance in.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating if the storage balance is greater than zero.
 */
```

##### swapToken

```
/**
 * Performs a token swap operation using the given input and output token IDs, amount, and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @param {string} inputTokenId - The input token ID for the swap.
 * @param {string} outputTokenId - The output token ID for the swap.
 * @param {string} amount - The amount of the input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance percentage for the swap operation.
 * @returns {Promise<any>} - A promise that resolves with the list of transactions for the token swap operation.
 * @throws {Error} - If no valid swap route is found or if NEAR_ADDRESS is not configured.
 */
```


## Development

### TODO Items
### Items
1. Comment: TODO: add functionality to support multiple networks
   - Context: Add support for swapping tokens on multiple networks, including configuring network ID and node URL dynamically.
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Issue: NEAR wallet credentials not configured
   - Cause: Missing or incorrect NEAR wallet credentials configuration
   - Solution: Ensure NEAR wallet secret key and public key are properly configured in the runtime settings

### Debugging Tips
- Ensure the NEAR wallet credentials are correctly set in the runtime environment
- Check for any errors related to fetching portfolio information or NEAR price

### FAQ
Q: What is the purpose of the `WalletProvider` class in `@elizaos/plugin-near` package?
A: The `WalletProvider` class represents a wallet provider that implements the Provider interface and manages in-memory cache, key store, and account details for interacting with the NEAR blockchain.