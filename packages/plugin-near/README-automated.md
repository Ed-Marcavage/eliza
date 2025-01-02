# @elizaos/plugin-near Documentation

## Overview
### Purpose
The **@elizaos/plugin-near** package serves as a comprehensive toolkit for interacting with NEAR Protocol wallets. It provides classes, interfaces, types, and functions that allow developers to seamlessly integrate NEAR wallet functionality into their applications. With features like transferring NEAR tokens, checking storage balances, and performing token swaps, this plugin simplifies the process of working with NEAR wallets.

### Key Features
- WalletProvider: Represents a WalletProvider implementation that interacts with a NEAR wallet.
- TransferContent Interface: Interface for transferring content with recipient, amount, and optional token address.
- NearToken Interface: Interface representing a Near Protocol token.
- WalletPortfolio Interface: Interface representing a wallet portfolio.
- NearConfig Type: Represents the configuration settings for connecting to a NEAR Protocol node.
- checkStorageBalance Function: Asynchronously checks the storage balance of a given account within a specified contract.
- swapToken Function: Perform a token swap operation with the provided input token, output token, amount, and slippage tolerance.
- isTransferContent Function: Check if the provided content is a TransferContent object.
- transferNEAR Function: Transfer NEAR tokens to a recipient.
- getConfig Function: Function to get the configuration based on the environment provided or default values.
- validateNearConfig Function: Validates the Near configuration using the provided runtime and returns a NearConfig object.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the Plugin to Your ElizaOS Project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Make sure you are in the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:
- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add `nearPlugin` to the `AgentRuntime` plugins array

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
- To ensure successful integration, look for ["✓ Registering action: <plugin actions>"] in the console after adding the plugin.

Remember to check and confirm all steps to ensure correct integration of the @elizaos/plugin-near plugin into your ElizaOS project.

## Configuration
# Environment Variable Configuration Documentation

## Required Environment Variables:
1. **NEAR_ENV:** Used for determining the NEAR environment.
2. **REACT_APP_REF_SDK_ENV:** Used for setting the REACT app reference SDK environment.
3. **NEAR_WALLET_SECRET_KEY:** Used for storing the NEAR wallet secret key.
4. **NEAR_WALLET_PUBLIC_KEY:** Used for storing the NEAR wallet public key.
5. **NEAR_ADDRESS:** Used for setting the NEAR address.
6. **SLIPPAGE:** Used for setting the slippage value.
7. **RPC_URL:** Used for setting the RPC URL.
8. **NEAR_NETWORK:** Used for setting the NEAR network.
  
## Example .env File:
```
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=XXXXXXXXXXXXX
NEAR_WALLET_PUBLIC_KEY=XXXXXXXXXXXXX
NEAR_ADDRESS=example.near
SLIPPAGE=0.5
RPC_URL=https://example.rpc.near.org
NEAR_NETWORK=testnet
```

**Note:** Make sure to configure the required environment variables in the .env file and add the .env file to the .gitignore to prevent it from being committed to the repository.

## Features

### Actions
### EXECUTE_SWAP_NEAR
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
This handler executes a token swap using Ref Finance. It initializes the Ref SDK with the specified environment, gets the wallet information, composes the swap context, generates the swap object, checks for required parameters, gets account credentials, connects to NEAR, executes the swap, signs and sends transactions, and returns a success message or an error message.

#### Examples
- User 1:
    - inputTokenId: wrap.testnet
    - outputTokenId: ref.fakes.testnet
    - amount: 1.0
- Agent:
    - text: "Swapping 1.0 NEAR for REF..."
    - action: TOKEN_SWAP
- Agent:
    - text: "Swap completed successfully! Transaction hash: ..."

### SEND_NEAR
Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: [TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR]

#### Handler
The handler for SEND_NEAR action validates the message content, composes a transfer context, generates transfer content, and validates it before finally transferring NEAR tokens to the recipient account. If successful, it returns a confirmation message with the transaction details.

#### Examples
- User {{user1}}: "Send 1.5 NEAR to bob.testnet"
- Agent {{user2}}: "I'll send 1.5 NEAR now..."
- Agent {{user2}}: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
The Wallet Provider allows users to fetch their portfolio information, including token balances and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "example-accountId";

const result = await walletProvider.get(runtime, { accountId });
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Fetching portfolio value and displaying it:
```typescript
const walletProvider = new WalletProvider(accountId);
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. Fetching NEAR price in USD:
```typescript
const walletProvider = new WalletProvider(accountId);
const nearPrice = await walletProvider.fetchNearPrice();
console.log(`Current NEAR price in USD: ${nearPrice}`);
```

### Best Practices
- Ensure to handle errors appropriately when using `fetchWithRetry` method to fetch data from a URL.
- Use the `WalletPortfolio` interface to maintain a structured representation of wallet portfolios.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens to a recipient:
```typescript
import { transferNEAR } from 'actions/transfer';

// Transfer 10 NEAR tokens to recipient 'alice'
const recipient = 'alice';
const amount = '10';
transferNEAR(runtime, recipient, amount)
    .then(txHash => console.log(`Transfer successful! Transaction hash: ${txHash}`))
    .catch(err => console.error(`Error transferring tokens: ${err.message}`));
```

2. Check if content is a TransferContent object:
```typescript
import { isTransferContent } from 'actions/transfer';

const content = {
    recipient: 'bob',
    amount: '5',
    tokenAddress: 'token.near'
};

if (isTransferContent(runtime, content)) {
    console.log('Content is a TransferContent object.');
} else {
    console.log('Content is not a TransferContent object.');
}
```

### Best Practices
- Ensure NEAR wallet credentials are properly configured before making transfers using `transferNEAR`.
- Use `isTransferContent` function to validate content object before performing any transfer operations.

### environment.ts

- **First use case with code example:**

This code can be used to easily get the configuration settings for connecting to a NEAR Protocol node. 

Example:
```typescript
import { getConfig } from './environment';

const env = 'development';
const config = getConfig(env);
console.log(config);

// Output: { ... } // Configuration object based on the provided environment or default values
```

- **Second use case with code example:**

This code can be used to validate the NEAR configuration using the provided runtime.

Example:
```typescript
import { validateNearConfig } from './environment';
import { IAgentRuntime } from 'some-lib';

const runtime: IAgentRuntime = // some runtime object;
const nearConfig = await validateNearConfig(runtime);
console.log(nearConfig);

// Output: { ... } // Validated Near configuration object
```

- **Best practice 1:**

Ensure that the environment values are properly set before calling `getConfig` or `validateNearConfig` functions to avoid unexpected results.

- **Best practice 2:**

Handle any potential errors or exceptions that may occur when using the configuration settings or validating the NEAR configuration to provide a better user experience.

### actions/swap.ts

### Common Use Cases
1. Perform a token swap operation with the provided input token, output token, amount, and slippage tolerance.
```typescript
import { swapToken } from './actions/swap';

const inputTokenId = 'token1';
const outputTokenId = 'token2';
const amount = '100';
const slippageTolerance = 0.01;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
    .then((transactions) => {
        console.log('Swap transactions:', transactions);
    })
    .catch((error) => {
        console.error('Error performing token swap:', error);
    });
```

2. Check the storage balance of a given account within a specified contract.
```typescript
import { checkStorageBalance } from './actions/swap';

const account = '0x1234567890abcdef';
const contractId = 'contract123';

checkStorageBalance(account, contractId)
    .then((hasBalance) => {
        if (hasBalance) {
            console.log('Account has storage balance');
        } else {
            console.log('Account has no storage balance');
        }
    })
    .catch((error) => {
        console.error('Error checking storage balance:', error);
    });
```

### Best Practices
- Ensure to handle the promises returned by the functions appropriately, by using `.then()` and `.catch()` to handle success and error cases respectively.
- Make sure to provide all required parameters when calling the functions to avoid any unexpected behavior.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

```
/**
 * Represents a WalletProvider implementation that interacts with a NEAR wallet.
 * @implements {Provider}
 */
 */
```

#### Interfaces

##### NearToken

```
/**
 * Interface representing a Near Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals of the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price in USD of the token.
 * @property {string} valueUsd - The value in USD of the token.
 * @property {string} [valueNear] - The value in NEAR token, optional.
 */
```

##### WalletPortfolio

```
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - Total value in USD.
 * @property {string} [totalNear] - Optional total value in Near.
 * @property {Array<NearToken>} tokens - Array of Near tokens.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for a new instance of the class.
 * 
 * @param {string} accountId - The account ID for the instance.
 */
```

##### get

```
/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime context of the agent.
 * @param {Memory} _message - The memory object containing relevant information.
 * @param {State} [_state] - Optional state information.
 * @returns {Promise<string | null>} The formatted portfolio as a string, or null if an error occurs.
 */
```

##### connect

```
/**
 * Connects to NEAR wallet using the provided runtime and configures the account credentials.
 * @param {IAgentRuntime} runtime - The runtime used to get NEAR wallet secret and public key settings.
 * @returns {Promise<Promise<IAccount>>} The connected NEAR wallet account.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a given URL with retry mechanism.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options for the request.
 * @returns {Promise<any>} - A Promise that resolves with the fetched data or rejects with an error.
 */
```

##### fetchPortfolioValue

```
/**
 * Fetches the portfolio value for the current account.
 * If the value is already cached, it returns the cached value.
 * Otherwise, it connects to the account, retrieves the account balance, 
 * converts the balance from yoctoNEAR to NEAR, fetches the NEAR price in USD,
 * calculates the total portfolio value in USD, and constructs a WalletPortfolio object.
 * The constructed portfolio object is then cached and returned.
 * 
 * @param {IAgentRuntime} runtime - The runtime instance used to interact with the account.
 * @returns {Promise<WalletPortfolio>} The portfolio value for the current account.
 */
```

##### fetchNearPrice

```
/**
 * Fetches the current NEAR price in USD, either from cache or by making an API request.
 * @returns {Promise<number>} The current NEAR price in USD
 */
```

##### formatPortfolio

```
/**
 * Formats the portfolio information for display.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment data.
 * @param {WalletPortfolio} portfolio - The portfolio data to format.
 * @returns {string} The formatted portfolio information as a string.
 */
```

##### getFormattedPortfolio

```
/**
 * Asynchronously retrieves the portfolio value, formats it using the specified runtime, and returns the formatted portfolio as a string.
 *
 * @param {IAgentRuntime} runtime - The runtime interface used to fetch portfolio value and format the portfolio.
 * @returns {Promise<string>} A promise that resolves to the formatted portfolio value.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface for transferring content with recipient, amount, and optional token address.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient address for the transfer.
 * @property {string | number} amount - The amount to transfer, can be a string or number.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Check if the provided content is a TransferContent object.
 * 
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content to check.
 * @return {boolean} Returns true if the content is a TransferContent object, false otherwise.
 */
```

##### transferNEAR

```
/**
 * Transfer NEAR tokens to a recipient.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} recipient - The recipient's NEAR account ID.
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
 * Represents the configuration settings for connecting to a NEAR Protocol node.
 */
```

#### Functions

##### getConfig

```
/**
 * Function to get the configuration based on the environment provided or default values.
 * @param {string | undefined | null} env - The environment value to get configuration for, defaults to ENV or process.env.NEAR_ENV or process.env.REACT_APP_REF_SDK_ENV.
 * @returns {object} - The configuration object based on the provided environment or default values.
 */
```

##### validateNearConfig

```
/**
 * Validates the Near configuration using the provided runtime and returns a NearConfig object.
 * @param {IAgentRuntime} runtime - The agent runtime used to retrieve settings.
 * @returns {Promise<NearConfig>} The validated Near configuration.
 */
```


### actions/swap.ts

#### Functions

##### checkStorageBalance

```
/**
 * Asynchronously checks the storage balance of a given account within a specified contract.
 * 
 * @param {any} account - The account for which the storage balance needs to be checked.
 * @param {string} contractId - The ID of the contract where the storage balance is checked.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the storage balance is greater than zero.
 */
```

##### swapToken

```
/**
 * Perform a token swap operation with the provided input token, output token, amount, and slippage tolerance.
 *
 * @param {IAgentRuntime} runtime - The agent runtime instance.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap operation.
 * @returns {Promise<any>} An array of transactions representing the swap operations.
 */
```


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Function `swapToken` needs to support multiple network configurations
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Issue: NEAR wallet credentials not configured
   - Cause: The NEAR wallet secret key or public key is missing in the configuration.
   - Solution: Make sure to configure the NEAR wallet secret key and public key in the settings.

### Debugging Tips
- Check if the NEAR wallet secret key and public key are correctly set.
- Verify the network settings and node URL for connecting to NEAR wallet.
- Ensure that the required dependencies are installed and up to date.

Ask your questions at https://eliza.gg/ 🚀 or in our discord

### FAQ
Q: How to format the portfolio information for display?
A: You can use the `formatPortfolio` method provided in the WalletProvider class to format the portfolio information and get a formatted string output.