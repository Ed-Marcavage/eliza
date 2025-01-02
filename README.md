# @elizaos/plugin-near Documentation

## Overview
### Purpose
The **@elizaos/plugin-near** package is designed to facilitate interactions with the NEAR Protocol network by providing a set of classes, interfaces, types, and functions for managing wallet portfolios, performing token swaps, transferring NEAR tokens, and validating NEAR configuration settings.

### Key Features

**Classes:**
- `WalletProvider`: Represents a Wallet Provider that implements the Provider interface.

**Interfaces:**
- `TransferContent`: An interface for transfer content with recipient, amount, and optional token address.
- `NearToken`: An interface representing a NEAR token with various properties.
- `WalletPortfolio`: Interface for a wallet portfolio.

**Types:**
- `NearConfig`: Represents the configuration for connecting to a NEAR Protocol network.

**Functions:**
- `checkStorageBalance`: Asynchronously checks the storage balance of a specified account for a given contract.
- `swapToken`: Performs token swap on NEAR protocol using input and output tokens with specified amount and slippage tolerance.
- `isTransferContent`: Checks if the provided content is of type TransferContent.
- `transferNEAR`: Transfer NEAR tokens to a recipient.
- `getConfig`: Function to get the configuration object based on the environment specified.
- `validateNearConfig`: Validates the Near configuration based on the runtime environment settings and environment-specific config.

The key features and capabilities of this plugin include:
- Interactive wallet portfolio management
- Efficient token swap functionality
- Seamless NEAR token transfers
- Flexible configuration validation

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Add the plugin to your ElizaOS project:
   
   - Add the following to your agent/package.json dependencies:
     ```json
     {
       "dependencies": {
         "@elizaos/plugin-near": "workspace:*"
       }
     }
     ```
   - cd into the agent/ directory
   - Run `pnpm install` to install the new dependency
   - Run `pnpm build` to build the project with the new plugin

### 2. Import and Use the Plugin:

   - Import the plugin using: `import { nearPlugin } from "@elizaos/plugin-near";`
   - Add it to AgentRuntime plugins array:
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

   - Ensure you see ["✓ Registering action: <plugin actions>"] in the console after integration.
   - This confirms that the plugin has been successfully integrated into your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables and their Purpose

1. `NEAR_ENV`: Used for setting the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used for setting the React app reference SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the runtime.
6. `SLIPPAGE`: Slippage setting for the runtime.
7. `RPC_URL`: RPC URL for the runtime.
8. `NEAR_NETWORK`: Network ID for NEAR, defaults to "testnet".

## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key
NEAR_WALLET_PUBLIC_KEY=your_public_key
NEAR_ADDRESS=your_near_address
SLIPPAGE=1
RPC_URL=your_rpc_url
NEAR_NETWORK=testnet
```

**Note:** Ensure that the `.env` file is added to the `.gitignore` to prevent it from being committed to the repository. Configuration settings should only be visible to authorized individuals for security purposes.

Configuration is done in the `.env` file.

## Features

### Actions
### swap
Perform a token swap using Ref Finance.

#### Properties
- Name: swap
- Similes: SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

#### Handler
The handler executes a token swap by fetching token metadata, estimating the swap route, checking storage balances, and executing the swap transactions.

#### Examples
- user: "{{user1}}"
- agent: "{{agent1}}"
- user: "{{user2}}"
- agent: "{{agent2}}"
- user: "{{user2}}"
- agent: "{{agent3}}"

### transfer
Transfer NEAR tokens to another account

#### Properties
- Name: transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
This handler is responsible for transferring NEAR tokens to another account. It extracts the recipient address, amount to transfer, and token contract address (if applicable) from the user request and executes the token transfer accordingly.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "Successfully sent 1.5 NEAR to bob.testnet \nTransaction: ABC123XYZ"



### Providers
### Wallet Provider
The Wallet Provider is responsible for fetching and formatting wallet information, including token balances and values.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "your_account_id";
const result = await walletProvider.get({ getSetting: () => accountId }, {} as Memory, {} as State);
console.log(result);
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases

1. Fetching and formatting portfolio data:
```typescript
const walletProvider = new WalletProvider('myAccountId');
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedPortfolio);
```

2. Connecting to the NEAR blockchain network:
```typescript
const walletProvider = new WalletProvider('myAccountId');
const nearAccount = await walletProvider.connect(runtime);
console.log(nearAccount);
```

### Best Practices

- Always use proper error handling when calling asynchronous methods to handle potential errors.
- Cache the portfolio value and NEAR price whenever possible to reduce unnecessary API calls and improve performance.

### actions/transfer.ts

### Common Use Cases
1. Transfer NEAR tokens to another account:
```typescript
const recipient = "alice.near";
const amount = "10";
const transferHash = await transferNEAR(runtime, recipient, amount);
console.log(`Transfer of ${amount} NEAR tokens to ${recipient} was successful. Transaction hash: ${transferHash}`);
```

2. Check if a content object is of type TransferContent:
```typescript
const content = {
  recipient: "bob.near",
  amount: "5",
  tokenAddress: "near"
};
const isTransfer = isTransferContent(runtime, content);
console.log(`Is content of type TransferContent? ${isTransfer}`);
```

### Best Practices
- Always verify the recipient address and amount before initiating a transfer.
- Handle the promise rejection from `transferNEAR` function to gracefully handle any errors during the transfer process.

### environment.ts

### Common Use Cases
1. Utilizing the `getConfig` function to retrieve the configuration object for connecting to a NEAR Protocol network.
```typescript
import { getConfig } from 'environment';

const config = getConfig('testnet');
console.log(config);
```

2. Validating the Near configuration using the `validateNearConfig` function.
```typescript
import { validateNearConfig } from 'environment';

const runtime = {}; // provide the agent runtime interface
validateNearConfig(runtime)
  .then((validatedConfig) => {
    console.log(validatedConfig);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Best Practices
- When using the `getConfig` function, make sure to specify the environment parameter to retrieve the appropriate configuration.
- Handle any errors that may arise during the validation of the Near configuration using `validateNearConfig`.

### actions/swap.ts

### Common Use Cases
1. Swap tokens using the `swapToken` function:
```typescript
import { swapToken } from 'actions/swap';

const runtime = new AgentRuntime(); // Initialize AgentRuntime
const inputToken = 'token1';
const outputToken = 'token2';
const amount = '10';
const slippageTolerance = 0.05; // Optional, default is 0.01

swapToken(runtime, inputToken, outputToken, amount, slippageTolerance)
    .then((swapTransactions) => {
        console.log('Swap transactions:', swapTransactions);
    })
    .catch((error) => {
        console.error('Error swapping tokens:', error);
    });
```

2. Check storage balance using the `checkStorageBalance` function:
```typescript
import { checkStorageBalance } from 'actions/swap';

const account = { accountId: 'example.near', balance: '100' }; // Example account object
const contractId = 'contract1';

checkStorageBalance(account, contractId)
    .then((isStorageAvailable) => {
        if (isStorageAvailable) {
            console.log('Storage balance is available.');
        } else {
            console.log('Storage balance is not available.');
        }
    })
    .catch((error) => {
        console.error('Error checking storage balance:', error);
    });
```

### Best Practices
- Ensure to handle errors appropriately within the `swapToken` and `checkStorageBalance` functions to provide a better user experience.
- Use the optional parameter `slippageTolerance` in the `swapToken` function to adjust the allowed slippage for the token swap.

## API Reference
### providers/wallet.ts


### Classes
```typescript
class WalletProvider {
    /**
     * Constructor for creating an instance of a class.
     * @param {string} accountId - The unique identifier for the account.
     */
    constructor(accountId: string);

    /**
     * Asynchronously gets the formatted portfolio by calling the 'getFormattedPortfolio' method.
     * 
     * @param {IAgentRuntime} runtime - The runtime environment for the agent.
     * @param {Memory} _message - The message from the memory (not used in this method).
     * @param {State} [_state] - The optional state information (not used in this method).
     * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio string, or null if an error occurs.
     */
    get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>;

    /**
     * Connects to NEAR blockchain network using the provided runtime and sets up the account.
     * If the account already exists, returns the existing account.
     *
     * @param {IAgentRuntime} runtime - The runtime used to fetch NEAR wallet settings
     * @returns {Promise<any>} The connected NEAR account
     * @throws {Error} Throws an error if NEAR wallet credentials are not configured
     */
    connect(runtime: IAgentRuntime): Promise<any>;

    /**
     * Makes a request to the specified URL with optional request options and handles retries in case of failure.
     * @param {string} url - The URL to make the request to.
     * @param {RequestInit} options - Optional request options.
     * @returns {Promise<any>} - A Promise that resolves with the response data if successful, otherwise rejects with an error after the maximum number of retries is reached.
     */
    fetchWithRetry(url: string, options: RequestInit): Promise<any>;

    /**
     * Fetches the current value of the portfolio in USD, including the balance of NEAR tokens.
     * If the portfolio value has been previously cached, it returns the cached value.
     * Otherwise, it fetches the account balance, converts NEAR balance to NEAR tokens, 
     * fetches the NEAR price in USD, calculates the value in USD, and constructs the portfolio object.
     * Finally, it caches the portfolio value and returns it.
     * 
     * @param {IAgentRuntime} runtime - The runtime environment for executing the fetch request.
     * @returns {Promise<WalletPortfolio>} The current portfolio value in USD.
     */
    fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>;

    /**
     * Fetches the NEAR price from the Coingecko API.
     * If the price is already cached, it will return the cached value.
     * If the price is not cached, it will fetch the price from the API and cache it for future use.
     * 
     * @returns {Promise<number>} The NEAR price in USD.
     */
    fetchNearPrice(): Promise<number>;

    /**
     * Format the portfolio data into a string with specific structure.
     * @param {IAgentRuntime} runtime - The runtime object containing system information.
     * @param {WalletPortfolio} portfolio - The portfolio object containing token information.
     * @returns {string} Formatted string representing the portfolio data.
     */
    formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string;

    /**
     * Asynchronously retrieves the portfolio value and formats it using the provided agent runtime.
     * 
     * @param {IAgentRuntime} runtime - The runtime instance to use for fetching portfolio data.
     * @returns {Promise<string>} A Promise that resolves with the formatted portfolio string, or an error message if fetching fails.
     */
    getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>;
}
```

### Interfaces
```typescript
interface NearToken {
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: string;
    priceUsd: string;
    valueUsd: string;
    valueNear?: string;
}

interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}
```

### Types
```typescript
type IAgentRuntime = {
    // Define type based on actual implementation
};

type Memory = {
    // Define type based on actual implementation
};

type State = {
    // Define type based on actual implementation
};
```

### Functions
```typescript
// Provide examples of how to interact with the WalletProvider class
const walletProvider = new WalletProvider("myAccountId");
walletProvider.get(runtime, message, state)
    .then((formattedPortfolio) => console.log(formattedPortfolio))
    .catch((error) => console.error(error));

walletProvider.connect(runtime)
    .then((connectedAccount) => console.log(connectedAccount))
    .catch((error) => console.error(error));

walletProvider.fetchWithRetry("https://example.com/api", { method: "GET" })
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

walletProvider.fetchPortfolioValue(runtime)
    .then((portfolioValue) => console.log(portfolioValue))
    .catch((error) => console.error(error));

walletProvider.fetchNearPrice()
    .then((nearPrice) => console.log(nearPrice))
    .catch((error) => console.error(error));

const examplePortfolio: WalletPortfolio = {
    totalUsd: "1000",
    totalNear: "10",
    tokens: [
        {
            name: "Token1",
            symbol: "T1",
            decimals: 18,
            balance: "100",
            uiAmount: "100",
            priceUsd: "10",
            valueUsd: "1000"
        }
    ]
};

console.log(walletProvider.formatPortfolio(runtime, examplePortfolio));

walletProvider.getFormattedPortfolio(runtime)
    .then((formattedPortfolio) => console.log(formattedPortfolio))
    .catch((error) => console.error(error));
```

### actions/transfer.ts

### Classes
```typescript
// No classes defined in this file
```

### Interfaces
```typescript
interface TransferContent {
    recipient: string;
    amount: string | number;
    tokenAddress?: string;
}
```

### Types
```typescript
// No types defined in this file
```

### Functions
```typescript
/**
 * Checks if the provided content is of type TransferContent.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {any} content - The content to check.
 * @returns {boolean} Whether the content is of type TransferContent.
 */
function isTransferContent(runtime: IAgentRuntime, content: any): boolean {
    // Implementation
}

/**
 * Transfer NEAR tokens to a recipient.
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @param {string} recipient - The recipient's NEAR address.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} - A Promise that resolves to the transaction hash of the transfer.
 */
async function transferNEAR(runtime: IAgentRuntime, recipient: string, amount: string): Promise<string> {
    // Implementation
}
```

### environment.ts

### Classes
```typescript

```

### Interfaces
```typescript

```

### Types
```typescript
type NearConfig = {
    // Represents the configuration for connecting to a NEAR Protocol network.
};
```

### Functions
```typescript
/**
 * Function to get the configuration object based on the environment specified.
 * If no environment is provided, it falls back to checking ENV, process.env.NEAR_ENV, and process.env.REACT_APP_REF_SDK_ENV.
 *
 * @param {string | undefined | null} env - environment string to determine the configuration (optional)
 * @returns {object} - configuration object based on the environment
 */
function getConfig(env?: string | undefined | null): object

/**
 * Validates the Near configuration based on the runtime environment settings and environment-specific config.
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @returns {Promise<NearConfig>} - A Promise with the validated Near configuration.
 * @throws {Error} if the Near configuration validation fails.
 */
async function validateNearConfig(runtime: IAgentRuntime): Promise<NearConfig>
```

### actions/swap.ts

### Classes

```typescript
class Swap {
    checkStorageBalance(account: any, contractId: string): Promise<boolean>
    swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance = 0.01): Promise<any>
}
```

### Interfaces

```typescript
interface IAgentRuntime {
    // Definition of IAgentRuntime interface properties
}
```

### Types

```typescript
// No custom types defined in this file
```

### Functions

```typescript
/**
 * Asynchronously checks the storage balance of a specified account for a given contract.
 * @param {any} account - The account object from near-api-js.
 * @param {string} contractId - The contract ID to check the storage balance for.
 * @returns {Promise<boolean>} A boolean value indicating if the storage balance is not null and total balance is not "0".
 */
function checkStorageBalance(account: any, contractId: string): Promise<boolean>

/**
 * Performs token swap on NEAR protocol using input and output tokens with specified amount and slippage tolerance.
 * Retrieves token metadata, estimates swap route, checks storage balance, and executes swap transaction.
 * @param {IAgentRuntime} runtime - The agent runtime instance.
 * @param {string} inputTokenId - The token ID for the input token.
 * @param {string} outputTokenId - The token ID for the output token.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap.
 * @returns {Promise<any>} - The array of swap transactions to be executed.
 */
function swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance = 0.01): Promise<any>
```

## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: 
     ```typescript
     async function swapToken(
        runtime: IAgentRuntime,
        inputTokenId: string,
        outputTokenId: string,
        amount: string,
        slippageTolerance: number = Number(
            runtime.getSetting("SLIPPAGE_TOLERANCE")
        ) || 0.01
     ): Promise<any> {
        try {
            // Function implementation
        } catch (error) {
            console.error("Error in swapToken:", error);
            throw error;
        }
     }
     ```
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Plugin not connecting to NEAR blockchain network
   - Cause: NEAR wallet credentials not configured or incorrect.
   - Solution: Configure NEAR wallet secret key and public key in the runtime settings.

### Debugging Tips
- Check NEAR wallet credentials in the runtime settings.
- Use console logs to debug NEAR connection and account setup.

### FAQ
Q: How to format the portfolio data into a string?
A: You can use the `formatPortfolio` method in the `WalletProvider` class to format the portfolio data into a string with specific structure.