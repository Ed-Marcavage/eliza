# @elizaos/plugin-near Documentation

## Overview
### Purpose
The @elizaos/plugin-near package is designed to provide a set of code components for interacting with NEAR Protocol functionality. It includes classes, interfaces, types, and functions for wallet management, token transfers, configuration handling, and storage balance checks.

**Key Features:**
- **WalletProvider Class:** Represents a Wallet Provider for fetching and formatting wallet portfolio information.
- **TransferContent Interface:** Interface for transferring content, including recipient, amount, and optional token address.
- **NearToken Interface:** Represents a NEAR Protocol token with various properties like name, symbol, balance, and value.
- **WalletPortfolio Type:** Represents a wallet portfolio with total USD value, total NEAR value, and an array of NearToken objects.
- **NearConfig Type:** Represents the configuration for NEAR environment settings.
- **Functions:** Includes functions like `checkStorageBalance`, `swapToken`, `isTransferContent`, `transferNEAR`, `getConfig`, and `validateNearConfig`.

The plugin provides essential functionality for managing wallets, handling token transfers, and validating NEAR configuration within NEAR Protocol applications.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Add the Plugin to Your ElizaOS Project:
- Add the following to your agent/package.json dependencies:
```json
{
  "dependencies": {
    "@elizaos/plugin-near": "workspace:*"
  }
}
```
- Run the following commands:
  1. cd agent/
  2. pnpm install
  3. pnpm build

### 2. Import and Use the Plugin:
- Import the plugin:
```typescript
import { nearPlugin } from "@elizaos/plugin-near";
```
- Add it to the AgentRuntime plugins array

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
Ensure successful integration by checking the console for: ["✓ Registering action: <plugin actions>"]

**Note:** Make sure to have the listed dependencies and peer dependencies installed in your project for smooth integration.

## Configuration
# Configuration Documentation

### Required Environment Variables and Purpose
1. `NEAR_ENV`: Used as a fallback environment variable if not set elsewhere.
2. `REACT_APP_REF_SDK_ENV`: Used to set the environment for the REACT_APP_REF_SDK.
3. `NEAR_WALLET_SECRET_KEY`: Used for the secret key of the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Used for the public key of the NEAR wallet.
5. `NEAR_ADDRESS`: Used to get the NEAR address.
6. `SLIPPAGE`: Used to set the slippage.
7. `RPC_URL`: Used to set the RPC URL.
8. `NEAR_NETWORK`: Used to set the NEAR network.
9. `RPC_URL`: Used as a fallback for the RPC URL.
  
### Example .env File
```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key
NEAR_WALLET_PUBLIC_KEY=your_public_key
NEAR_ADDRESS=your_near_address
SLIPPAGE=1
RPC_URL=https://your_rpc_url.com
NEAR_NETWORK=testnet
``` 

Please ensure that the .env file contains the necessary environment variables listed above. Make sure to add the .env file to the .gitignore to prevent sensitive information from being committed to the repository. Full configuration can be done in the .env file.

Thank you!

## Features

### Actions
### Action Name
Swap Token

#### Properties
- Name: swapToken
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
Perform a token swap using Ref Finance.

#### Examples
- User 1:
    {
        inputTokenId: "wrap.testnet",
        outputTokenId: "ref.fakes.testnet",
        amount: "1.0",
    }
- User 2:
    {
        text: "Swapping 1.0 NEAR for REF...",
        action: "TOKEN_SWAP",
    }
- User 2:
    {
        text: "Swap completed successfully! Transaction hash: ...",
    }

### Transfer NEAR Tokens
Transfer NEAR tokens to another account

#### Properties
- Name: SEND_NEAR
- Similes: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR

#### Handler
The handler for this action processes a request to transfer NEAR tokens to another account. It extracts the recipient address, the amount to transfer, and the optional token contract address if the transfer is not native NEAR tokens. It then validates the content and executes the transfer using the specified NEAR wallet credentials.

#### Examples
- User 1: "Send 1.5 NEAR to bob.testnet"
- Agent: "I'll send 1.5 NEAR now..."
- Agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
This provider allows users to fetch and format wallet information, including token balances, total value, and market prices.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "exampleAccountId";
const runtime: IAgentRuntime = {
    getSetting: (key: string) => "exampleSetting",
    character: { system: "exampleSystem" },
};

const message: Memory = { content: "exampleContent" };
const state: State = { data: "exampleData" };

walletProvider.get(runtime, message, state);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Components

Classes:

- WalletProvider: 
  *Class representing a Wallet Provider for fetching and formatting wallet portfolio information.*

Methods:

- constructor: 
  *Constructor for creating a new instance of the class.*

- get: 
  *Asynchronously retrieves the formatted portfolio using the specified agent runtime.*

- connect: 
  *Connect to NEAR blockchain using wallet credentials and return the connected account.*

- fetchWithRetry: 
  *Fetches data from a specified URL with retries in case of failure.*

- fetchPortfolioValue: 
  *Fetches the current portfolio value by fetching the account balance, converting yoctoNEAR to NEAR, fetching the NEAR price in USD, and calculating the total portfolio value in USD.*

- fetchNearPrice: 
  *Fetches the NEAR token price from the Coingecko API.*

- formatPortfolio: 
  *Formats the wallet portfolio information into a human-readable string.*

- getFormattedPortfolio: 
  *Asynchronously gets the formatted portfolio for a given agent runtime.*

Interfaces:

- NearToken: 
  *Interface representing a NEAR Protocol token.*

- WalletPortfolio: 
  *Represents a wallet portfolio containing total USD value, total NEAR value, and an array of NearToken objects.*

### Common Use Cases

1. Asynchronously fetch and format wallet portfolio using a specified agent runtime:
```
const wallet = new WalletProvider(accountId);
const runtime = new IAgentRuntime();
const formattedPortfolio = await wallet.get(runtime, _message, _state);
```

2. Connect to NEAR blockchain using wallet credentials:
```
const wallet = new WalletProvider(accountId);
const runtime = new IAgentRuntime();
const connectedAccount = await wallet.connect(runtime);
```

### Best Practices

- Ensure NEAR wallet credentials are configured before attempting to connect to the NEAR blockchain.
- Implement proper error handling for fetching portfolio data and NEAR token price.

### actions/transfer.ts

### Components
- Interfaces:
  - TransferContent: Interface for transferring content.

### Common Use Cases
1. Checking if content is TransferContent:
```typescript
const isTransfer = isTransferContent(runtime, content);
console.log(isTransfer);
```

2. Transferring NEAR tokens:
```typescript
const txHash = await transferNEAR(runtime, 'recipient_account', '10');
console.log(txHash);
```

### Best Practices
- Always check if the content is of type TransferContent before performing any transfer actions.
- Make sure NEAR wallet credentials are properly configured before initiating any transfers.

### environment.ts

### Components
Types:

- NearConfig: Represents the configuration for near environment.

Functions:

- getConfig: Get configuration based on provided environment or default environment variables.
- validateNearConfig: Validate the NEAR configuration based on the provided runtime settings and environment variables.

### Common Use Cases
1. Retrieving configuration based on environment:
```javascript
const config = getConfig('development');
console.log(config);
```

2. Validating NEAR configuration:
```javascript
const runtime = { getSetting: () => 'near.testnet' };
validateNearConfig(runtime).then(config => {
  console.log(config);
});
```

### Best Practices
- Always provide a valid environment when using `getConfig` function.
- Ensure to pass the correct runtime settings when validating NEAR configuration.

### actions/swap.ts

### Components
Functions:

- checkStorageBalance: Asynchronously checks the storage balance of a specific account within a specified contract.

- swapToken: Swap tokens between input and output token IDs with a specified amount and slippage tolerance.

### Common Use Cases
1. Checking storage balance:
```typescript
const isValid = await checkStorageBalance(account, contractId);
console.log(isValid ? "Storage balance is valid" : "Storage balance is not valid");
```

2. Swapping tokens:
```typescript
const transactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log("Token swap transactions:", transactions);
```

### Best Practices
- Always handle the promise returned by the functions to capture the result or handle any errors.
- Ensure that the inputs provided to the functions are valid and within the allowed limits to avoid unexpected behavior.

## API Reference
### providers/wallet.ts

- WalletProvider: /**
 * Class representing a Wallet Provider for fetching and formatting wallet portfolio information.
 */

- constructor: /**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The account ID associated with the instance.
 */

- get: /**
 * Asynchronously retrieves the formatted portfolio using the specified agent runtime.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {Memory} _message - The memory object (unused in this method).
 * @param {State} [_state] - The optional state object.
 * @returns {Promise<string | null>} The formatted portfolio string or null if an error occurs.
 */

- connect: /**
 * Connect to NEAR blockchain using wallet credentials and return the connected account. 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @returns {Promise<Account>} The connected NEAR account.
 * @throws {Error} If NEAR wallet credentials are not configured.
 */

- fetchWithRetry: /**
 * Fetches data from a specified URL with retries in case of failure.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to be used for the fetch request.
 * @returns {Promise<any>} The data fetched from the URL.
 */

- fetchPortfolioValue: /**
 * Fetches the current portfolio value by fetching the account balance, converting yoctoNEAR to NEAR,
 * fetching the NEAR price in USD, and calculating the total portfolio value in USD.
 * Caches the portfolio value to avoid repetitive fetching.
 * @param {IAgentRuntime} runtime - The Agent Runtime instance.
 * @returns {Promise<WalletPortfolio>} - A Promise that resolves to the WalletPortfolio object containing totalUsd, totalNear, and tokens array.
 * @throws {Error} - If there is an error fetching the portfolio value.
 */

- fetchNearPrice: /**
 * Fetches the NEAR token price from the Coingecko API.
 * Uses a cache to prevent multiple API calls for the same data.
 * @returns {Promise<number>} The NEAR token price in USD.
 */

- formatPortfolio: /**
 * Formats the wallet portfolio information into a human-readable string.
 * @param {IAgentRuntime} runtime - The agent runtime being used.
 * @param {WalletPortfolio} portfolio - The wallet portfolio to format.
 * @returns {string} The formatted string containing portfolio information.
 */

- getFormattedPortfolio: /**
 * Asynchronously gets the formatted portfolio for a given agent runtime.
 * @param {IAgentRuntime} runtime - The agent runtime to fetch the portfolio value for.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio, or an error message if unable to fetch wallet information.
 */

- NearToken: /**
 * Interface representing a NEAR Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for user interface.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol.
 */

- WalletPortfolio: /**
 * Represents a wallet portfolio containing total USD value, total NEAR value (optional), and an array of NearToken objects.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD
 * @property {string} [totalNear] - The total value in NEAR (optional)
 * @property {Array<NearToken>} tokens - An array of NearToken objects
 */

### actions/transfer.ts

### Classes

N/A

### Interfaces

- TransferContent: 
  * Interface for transferring content.
  * @interface
  * @extends Content
  * @property {string} recipient - The recipient of the transfer.
  * @property {string | number} amount - The amount to transfer.
  * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.

### Types

N/A

### Functions

- isTransferContent: 
  * Checks if the given content is TransferContent based on the structure of the content object.
  * @param {IAgentRuntime} runtime - The agent runtime object.
  * @param {any} content - The content object to check.
  * @returns {boolean} Returns true if the content is TransferContent, false otherwise.

- transferNEAR: 
  * Transfer NEAR tokens from the current user's account to the specified recipient.
  * @param {IAgentRuntime} runtime - The Agent Runtime instance.
  * @param {string} recipient - The NEAR account ID of the recipient.
  * @param {string} amount - The amount of NEAR tokens to transfer in NEAR tokens.
  * @returns {Promise<string>} - A Promise that resolves with the transaction hash upon successful transfer.
  * @throws {Error} - If NEAR wallet credentials are not configured.

### environment.ts

### Types

- NearConfig: 
/**
 * Represents the configuration for near environment.
 */

### Functions

- getConfig: 
/**
 * Get configuration based on provided environment or default environment variables.
 * @param {string | undefined | null} [env=ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV] - The environment to get configuration for.
 * @returns {object} - The configuration object based on provided environment.
 */

- validateNearConfig: 
/**
 * Validate the NEAR configuration based on the provided runtime settings and environment variables.
 * @param {IAgentRuntime} runtime - The runtime interface for retrieving settings.
 * @returns {Promise<NearConfig>} - A Promise that resolves to a validated NearConfig object.
 */

### actions/swap.ts

### Functions

#### checkStorageBalance
/**
 * Asynchronously checks the storage balance of a specific account within a specified contract.
 * 
 * @param {any} account - The account for which the storage balance will be checked.
 * @param {string} contractId - The identifier of the contract where the storage balance is to be checked.
 * @returns {Promise<boolean>} - A promise that resolves with a boolean indicating whether the storage balance is valid (true) or not (false).
 */

#### swapToken
/**
 * Swap tokens between input and output token IDs with a specified amount and slippage tolerance.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} slippageTolerance - The slippage tolerance for the swap, defaults to the SLIPPAGE_TOLERANCE setting or 0.01.
 * 
 * @returns {Promise<Array>} An array of transactions required for the token swap.
 */

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
    - Type: feature

### Troubleshooting
### Common Issues
1. Wallet not connecting
   - Cause: NEAR wallet credentials not configured
   - Solution: Make sure NEAR wallet credentials (NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY) are correctly configured.

### Debugging Tips
- Ensure that NEAR wallet credentials are set correctly in the runtime settings.
- Check for any errors in the wallet provider methods and debug accordingly.

### FAQ
Q: What is the purpose of the WalletProvider class?
A: The WalletProvider class is used for fetching and formatting wallet portfolio information. It connects to the NEAR blockchain using wallet credentials and retrieves the account's portfolio value.