# @elizaos/plugin-near Documentation

## Overview
### Purpose
@elizaos/plugin-near is a package designed to provide functionalities related to NEAR Protocol tokens and wallet interactions. It includes classes, interfaces, types, and functions to facilitate tasks like token swapping, transfer, and portfolio management within the NEAR ecosystem.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- **WalletProvider Class**: Represents a WalletProvider that implements the Provider interface.
- **TransferContent Interface**: Defines the content to be transferred, including recipient, amount, and optional token address.
- **NearToken Interface**: Represents a NEAR Protocol token with properties like name, symbol, balance, and value in USD and NEAR tokens.
- **WalletPortfolio Interface**: Defines a wallet portfolio with total amounts in USD and optional NEAR, along with an array of token objects.
- **NearConfig Type**: Type definition for the configuration object representing the Near environment.
- **checkStorageBalance Function**: Checks the storage balance of a specified account within a contract.
- **swapToken Function**: Swaps tokens asynchronously with specified input and output tokens, amount, and slippage tolerance.
- **isTransferContent Function**: Checks if the given content is a TransferContent object.
- **transferNEAR Function**: Transfers a specified amount of NEAR tokens to a recipient.
- **getConfig Function**: Retrieves configuration properties based on the provided environment or fallback to predefined variables.
- **validateNearConfig Function**: Validates the NEAR configuration based on the provided runtime settings and environment variables.

### Key Features

- **NEAR Wallet Interaction**: Includes classes and functions for managing NEAR Protocol wallet interactions.
- **Token Management**: Supports token transfers, portfolio tracking, and storage balance checks.
- **Configuration Handling**: Provides functions for retrieving and validating NEAR configurations.
- **Token Swapping**: Allows for token swapping operations with defined slippage tolerance.

## Installation
## Installation Instructions:

### 1. Add the plugin to your ElizaOS project:
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

### 2. Import and use the plugin:
- Import the plugin using:
    ```typescript
    import { nearPlugin } from "@elizaos/plugin-near";
    ```
- Add it to the AgentRuntime plugins array.

### 3. Integration example:
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

### 4. Verification steps:
Ensure you see ["✓ Registering action: <plugin actions>"] in the console after successful integration.

Remember to check the peer dependencies and ensure they are properly installed in your project environment.

## Configuration
# Configuration Documentation

To configure the application, you need to set the following environment variables in a .env file. Ensure that the .env file is included in the .gitignore file so it is not committed to the repository.

## Required Environment Variables

1. `NEAR_ENV`
   - Purpose: Specifies the environment for NEAR.
   
2. `REACT_APP_REF_SDK_ENV`
   - Purpose: Environment variable for the React SDK.
   
3. `NEAR_WALLET_SECRET_KEY`
   - Purpose: Secret key for the NEAR wallet.
   
4. `NEAR_WALLET_PUBLIC_KEY`
   - Purpose: Public key for the NEAR wallet.
   
5. `NEAR_ADDRESS`
   - Purpose: NEAR address.
   
6. `SLIPPAGE`
   - Purpose: Slippage setting.
   
7. `RPC_URL`
   - Purpose: RPC URL setting.
   
8. `NEAR_NETWORK`
   - Purpose: Network ID for NEAR.

## Sample .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=testing
NEAR_WALLET_SECRET_KEY=mysecretkey
NEAR_WALLET_PUBLIC_KEY=mypublickey
NEAR_ADDRESS=myaddress
SLIPPAGE=0.5
RPC_URL=https://rpc.testnet.near.org
NEAR_NETWORK=testnet
```

For additional configurations, you can refer to the provided full context of environment variable usage in the application.

## Features

### Actions
### EXECUTE_SWAP_NEAR
Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
The handler function for this action initializes the Ref SDK with the testnet environment, composes the state, retrieves wallet information, generates the swap context, and executes the token swap using Ref Finance. It also handles signing and sending transactions, providing feedback on the success or failure of the swap.

#### Examples
- User 1:
  - InputTokenId: wrap.testnet
  - OutputTokenId: ref.fakes.testnet
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
The handler for this action validates the transfer content, composes the transfer context, generates the transfer content, and performs the NEAR token transfer. It then returns a success message with the transaction hash if the transfer is successful, or an error message if there is an issue with the transfer.

#### Examples
- User1: "Send 1.5 NEAR to bob.testnet"
- Agent: "I'll send 1.5 NEAR now..."
- Agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { KeyPair, keyStores, connect, Account, utils } from "near-api-js";
import BigNumber from "bignumber.js";
import { KeyPairString } from "near-api-js/lib/utils";
import NodeCache from "node-cache";

const PROVIDER_CONFIG = {
    networkId: process.env.NEAR_NETWORK || "testnet",
    nodeUrl: process.env.NEAR_NODE_URL || "https://rpc.testnet.near.org",
    walletUrl: process.env.WALLET_URL || "https://wallet.testnet.near.org",
    helperUrl: process.env.HELPER_URL || "https://helper.testnet.near.org",
    contractName: process.env.CONTRACT_NAME || "your_contract_name",
};

export class WalletProvider extends Provider {
    account: Account | null = null;
    keyPair: KeyPair | null = null;

    constructor(private runtime: IAgentRuntime) {
        super();
        
        this.connect();
    }

    async connect(): Promise<void> {
        const keyStore = new keyStores.InMemoryKeyStore();
        this.keyPair = KeyPair.fromString(<KeyPairString>process.env.SECRET_KEY);
        keyStore.setKey(PROVIDER_CONFIG.networkId, PROVIDER_CONFIG.contractName, this.keyPair);

        const near = await connect({
            deps: {
                keyStore,
            },
            ...PROVIDER_CONFIG,
        });

        this.account = new Account(near, PROVIDER_CONFIG.contractName);

        this.emit("connected");
    }

    async get(key: string): Promise<any> {
        const state = await this.account.viewFunction(PROVIDER_CONFIG.contractName, "get", { key });
        
        return JSON.parse(state);
    }

    // Other methods can be implemented here

}

```

#### Methods

Focus on the `get()` method and its functionality.

#### Usage
```typescript

import { WalletProvider } from "./providers/wallet";

const runtime: IAgentRuntime = {}; // Instantiate with your runtime object
const walletProvider = new WalletProvider(runtime);

walletProvider.on("connected", async () => {
    const key = "example_key";
    const value = await walletProvider.get(key);
    console.log("Value retrieved:", value);
});

```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Creating a WalletProvider instance and fetching the formatted portfolio information:
```typescript
import { WalletProvider } from 'providers/wallet';

const accountId = 'exampleAccountId';
const walletProvider = new WalletProvider(accountId);

walletProvider.getFormattedPortfolio(runtime).then((formattedPortfolio) => {
    console.log(formattedPortfolio);
}).catch((error) => {
    console.error(error);
});
```

2. Connecting to NEAR Wallet and fetching the current account:
```typescript
import { WalletProvider } from 'providers/wallet';

const walletProvider = new WalletProvider();

walletProvider.connect(runtime).then((account) => {
    console.log(account);
}).catch((error) => {
    console.error(error);
});
```

### Best Practices
- Ensure to handle errors appropriately when using the fetchWithRetry method to prevent unexpected behavior in case of failures.
- Use the fetchPortfolioValue method to fetch and cache the portfolio value for efficient data retrieval in subsequent requests.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens to a recipient:
```typescript
const recipient = "example.near";
const amount = "10";
const transferHash = await transferNEAR(runtime, recipient, amount);
console.log("Transfer successful. Transaction hash: " + transferHash);
```

2. Check if content is a TransferContent object:
```typescript
const content = {
  recipient: "example.near",
  amount: "5"
};
const isTransfer = isTransferContent(runtime, content);
console.log("Is content a TransferContent object: " + isTransfer);
```

### Best Practices
- Always validate the recipient address and amount before making a transfer.
- Ensure that NEAR wallet credentials are properly configured before executing any transfers.

### environment.ts

- **Use Case 1: Retrieving Near environment configuration**

```typescript
import { getConfig } from './environment';

const config = getConfig('testnet');

console.log(config);
```

- **Use Case 2: Validating Near environment configuration**

```typescript
import { validateNearConfig } from './environment';
import { IAgentRuntime } from './types'; // Assuming this import is necessary

const runtime: IAgentRuntime = {
    NEAR_WALLET_SECRET_KEY: 'abc123',
    NEAR_WALLET_PUBLIC_KEY: 'def456',
    NEAR_ADDRESS: 'test.near',
    SLIPPAGE: 0.01,
    RPC_URL: 'https://rpc.testnet.near.org'
};

validateNearConfig(runtime)
    .then((validatedConfig) => {
        console.log(validatedConfig);
    })
    .catch((error) => {
        console.error(error);
    });
```

- **Best Practice 1: Encapsulate Near environment configuration logic in a separate file like `environment.ts` to keep it organized and easily reusable in different parts of the application.**

- **Best Practice 2: Use the `validateNearConfig` function to ensure that the NEAR configuration meets the required schema before using it in the application, avoiding potential runtime errors.**

### actions/swap.ts

### Common Use Cases
1. Checking storage balance before performing a swap:
```typescript
const account = {
  address: '0x123abc...',
  balance: 100 // Assume storage balance is 100
};
const contractId = 'contract123';

const hasStorageBalance = await checkStorageBalance(account, contractId);
console.log(hasStorageBalance); // Output: true
```

2. Swapping tokens with slippage tolerance:
```typescript
const runtime = {
  network: 'mainnet',
  wallet: 'myWallet'
};
const inputTokenId = 'token123';
const outputTokenId = 'token456';
const amount = '10';
const slippageTolerance = 0.02;

const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log(swapTransactions); // Output: Array of transactions for the swap
```

### Best Practices
- Always handle the Promise returned by the functions with `await` or `.then()` to ensure proper asynchronous operation.
- Provide accurate input parameters to avoid errors and ensure successful execution of the functions.

## API Reference
### File: `providers/wallet.ts`
#### Classes

##### `WalletProvider`

```typescript
/**
 * A class representing a WalletProvider that implements the Provider interface.
 */
 */
```

#### Interfaces

##### `NearToken`

```typescript
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The current balance of the token.
 * @property {string} uiAmount - The amount of the token for user interface display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol tokens (optional).
 */
```

##### `WalletPortfolio`

```typescript
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total amount in USD.
 * @property {string} [totalNear] - The total amount in NEAR, optional.
 * @property {Array<NearToken>} tokens - An array of NearToken objects.
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for creating a new instance of a class with an accountId.
 *
 * @param {string} accountId - The unique identifier for the account.
 */
```

##### `get`

```typescript
/**
 * Asynchronously retrieves the formatted portfolio using the specified runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime used to retrieve the formatted portfolio.
 * @param {Memory} _message - The memory object.
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs.
 */
```

##### `connect`

```typescript
/**
 * Connects to NEAR Wallet using the provided runtime and returns the connected account.
 * 
 * @param {IAgentRuntime} runtime - The runtime used to get NEAR wallet settings.
 * @returns {Promise<any>} - The connected NEAR wallet account.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

##### `fetchWithRetry`

```typescript
/**
 * Fetches data from a URL with retries in case of failure.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options for the fetch request.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

##### `fetchPortfolioValue`

```typescript
/**
 * Fetches the value of the portfolio for the current account by getting the account balance,
 * converting it to NEAR and USD, and caching the resulting portfolio.
 * 
 * @param {IAgentRuntime} runtime - The runtime context for the agent
 * @returns {Promise<WalletPortfolio>} The portfolio value including total USD, total NEAR, and token details
 */
```

##### `fetchNearPrice`

```typescript
/**
 * Fetches the current price of NEAR token in USD from an API.
 * Caches the price and retrieves it if available to avoid unnecessary API calls.
 * 
 * @returns {Promise<number>} The current price of NEAR token in USD.
 */
```

##### `formatPortfolio`

```typescript
/**
 * Formats the portfolio data into a human-readable string format.
 * 
 * @param {IAgentRuntime} runtime - The runtime object associated with the agent.
 * @param {WalletPortfolio} portfolio - The portfolio object containing token and wallet information.
 * @returns {string} A formatted string representation of the portfolio data.
 */
```

##### `getFormattedPortfolio`

```typescript
/**
 * Asynchronously retrieves the formatted portfolio information.
 *
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @returns {Promise<string>} The formatted portfolio information.
 */
```
### File: `actions/transfer.ts`
#### Interfaces

##### `TransferContent`

```typescript
/**
 * Interface representing the content to be transferred.
 * @interface
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - The optional token address for native NEAR transfers.
 */
```

#### Functions

##### `isTransferContent`

```typescript
/**
 * Checks if the given content is a TransferContent object.
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content to check.
 * @returns {boolean} Returns true if the content is a TransferContent object, false otherwise.
 */
```

##### `transferNEAR`

```typescript
/**
 * Transfers a specified amount of NEAR tokens to a recipient.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} recipient - The NEAR address of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} A Promise that resolves to the transaction hash upon successful transfer.
 * @throws {Error} Throws an error if NEAR wallet credentials are not configured.
 */
```
### File: `environment.ts`
#### Types

##### `NearConfig`

```typescript
/**
 * Type definition for the configuration object representing the Near environment.
 */
```

#### Functions

##### `getConfig`

```typescript
/**
 * Retrieves the configuration based on the provided environment.
 * If no environment is specified, it falls back to checking the ENV variable,
 * process.env.NEAR_ENV, and process.env.REACT_APP_REF_SDK_ENV in that order.
 *
 * @param {string | undefined | null} env - The environment to retrieve configuration for.
 * @returns {object} - An object containing the configuration properties based on the provided environment:
 * - networkId: string
 * - nodeUrl: string
 * - walletUrl: string
 * - WRAP_NEAR_CONTRACT_ID: string
 * - REF_FI_CONTRACT_ID: string
 * - REF_TOKEN_ID: string
 * - indexerUrl: string
 * - explorerUrl: string
 * - REF_DCL_SWAP_CONTRACT_ID: string
 */
```

##### `validateNearConfig`

```typescript
/**
 * Validates the NEAR configuration based on the provided runtime settings and environment variables.
 * Retrieves the NEAR_ENV setting from the runtime and constructs the NEAR configuration object using the NEAR_WALLET_SECRET_KEY,
 * NEAR_WALLET_PUBLIC_KEY, NEAR_ADDRESS, SLIPPAGE, and RPC_URL settings along with the environment-specific configuration.
 * Validates the constructed NEAR configuration using the nearEnvSchema and returns the parsed config if successful.
 * Throws an error with detailed validation failure messages if the config does not meet the schema requirements.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime instance to retrieve settings from.
 * @returns {Promise<NearConfig>} - A Promise that resolves to the validated NEAR configuration object.
 */
```
### File: `actions/swap.ts`
#### Functions

##### `checkStorageBalance`

```typescript
/**
 * Checks the storage balance of a specified account within a contract.
 * @param {any} account - The account object to check the storage balance for.
 * @param {string} contractId - The contract ID where the storage balance is being checked.
 * @returns {Promise<boolean>} A Promise that resolves to true if the storage balance is greater than zero, false otherwise.
 */
```

##### `swapToken`

```typescript
/**
 * Function to swap tokens asynchronously.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} slippageTolerance - The slippage tolerance for the swap (default: 0.01).
 * 
 * @returns {Promise<any>} The promise that resolves to an array of transactions for the swap.
 */
```

## Development

### TODO Items
No TODO items found.

### Troubleshooting
### Common Issues
1. Memory Limit Exceeded:
   - Cause: Fetching large amounts of data or processing heavy computations can result in memory limit exceeded errors.
   - Solution: Optimize your code to reduce memory usage, break down tasks into smaller chunks, or consider upgrading your system's memory capacity.

2. NEAR Wallet Credentials Not Configured:
   - Cause: Missing or incorrect NEAR wallet credentials setup in the environment.
   - Solution: Make sure to set the correct NEAR_WALLET_SECRET_KEY and NEAR_WALLET_PUBLIC_KEY values in your environment variables.

### Debugging Tips
- Check for any console error messages to identify possible issues in the code.
- Use debugger tools to step through the code and pinpoint the exact location of potential errors.

### FAQ
Q: How can I fetch the NEAR price in USD?
A: The plugin uses Coingecko API to fetch the NEAR price in USD. You can find the implementation in the `fetchNearPrice` method in the `WalletProvider` class.