# @elizaos/plugin-near Documentation

## Overview
### Purpose
The `@elizaos/plugin-near` package provides a set of classes, interfaces, types, and functions to interact with the NEAR Protocol for managing wallets, transferring tokens, checking balances, and performing token swaps.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- WalletProvider: Manages interactions with a NEAR wallet to retrieve and format portfolio information.
- TransferContent: Interface for transferring content with specific recipient, amount, and optional token address.
- NearToken: Interface representing a Near Protocol token.
- WalletPortfolio: Interface representing a wallet portfolio with total USD balance and an array of NearToken objects.
- NearConfig: Type definition for NearConfig based on the inferred type from nearEnvSchema.
- checkStorageBalance: Checks the storage balance of a specified account within a given contract.
- swapToken: Performs token swap operation on NEAR Protocol.
- isTransferContent: Checks if the given content object is a TransferContent object.
- transferNEAR: Transfers a specified amount of NEAR tokens from the current wallet account to a recipient.
- getConfig: Retrieves configuration based on the provided environment or defaults to ENV.
- validateNearConfig: Validates the NEAR configuration based on the runtime settings and environment variables.

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
2. CD into the agent/ directory.
3. Run `pnpm install` to install the new dependency.
4. Run `pnpm build` to build the project with the new plugin.

## Importing and Using the Plugin
- Import the plugin using: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add the plugin to the AgentRuntime plugins array.

## Integration Example
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
Ensure successful integration by checking for the following message in the console:
["✓ Registering action: <plugin actions>"]

## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`: Used to specify the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used in the React application for SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet.
5. `NEAR_ADDRESS`: NEAR wallet address.
6. `SLIPPAGE`: Slippage value for transaction processing.
7. `RPC_URL`: URL for RPC communication.
8. `NEAR_NETWORK`: Specifies the NEAR network.
  
## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key
NEAR_WALLET_PUBLIC_KEY=your_public_key
NEAR_ADDRESS=your_wallet_address
SLIPPAGE=1
RPC_URL=https://your_rpc_url
NEAR_NETWORK=testnet
```

Please make sure to configure the environment variables in the `.env` file of your project. Also, ensure that the `.env` file is added to the `.gitignore` so that sensitive information is not committed to the repository.

## Features

### Actions
### Action Name: Swap

Perform a token swap using Ref Finance.

#### Properties
- Name: EXECUTE_SWAP_NEAR
- Similes: ["SWAP_TOKENS_NEAR", "TOKEN_SWAP_NEAR", "TRADE_TOKENS_NEAR", "EXCHANGE_TOKENS_NEAR"]

#### Handler
The handler executes a token swap by connecting to the NEAR blockchain, validating the token swap request, generating the swap context, extracting required information, and signing and sending the swap transactions.

#### Examples
- user: "{{user1}}"
- agent: "{{user2}}"
- user: "{{user2}}"

### Transfer
Transfer NEAR tokens to another account

#### Properties
- Name: Transfer
- Similes: ["TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"]

#### Handler
The handler for this action transfers NEAR tokens to the recipient account specified in the message content. It validates the content, composes the transfer context, generates the transfer content, and then executes the token transfer using the `transferNEAR` function.

#### Examples
- user: "Send 1.5 NEAR to bob.testnet"
- agent: "I'll send 1.5 NEAR now..."
- agent: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



### Providers
### WalletProvider
This provider connects to a NEAR wallet and fetches the user's portfolio information including token balances and total value in USD.

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
1. Fetching and formatting portfolio information for a NEAR wallet:
```typescript
const walletProvider = new WalletProvider("exampleAccount");
const portfolio = await walletProvider.getFormattedPortfolio(agentRuntime);
console.log(portfolio);
```

2. Connecting to NEAR blockchain and fetching portfolio value with retry mechanism:
```typescript
const walletProvider = new WalletProvider("exampleAccount");
const account = await walletProvider.connect(agentRuntime);
const portfolioValue = await walletProvider.fetchPortfolioValue(agentRuntime);
console.log("Portfolio Value:", portfolioValue);
```

### Best Practices
- Ensure to handle errors gracefully by catching and handling any exceptions in the promise chain.
- Use proper error handling mechanisms like try-catch blocks while working with asynchronous operations to prevent unexpected crashes.

### actions/transfer.ts

### Common Use Cases
1. Transferring NEAR tokens from one account to another:
```typescript
// Define transfer content
const transferContent: TransferContent = {
  recipient: "recipient.near",
  amount: "10",
  tokenAddress: "near"
};

// Check if transfer content is valid
const isValidTransfer = isTransferContent(runtime, transferContent);

if (isValidTransfer) {
  // Initiate transfer
  transferNEAR(runtime, transferContent.recipient, transferContent.amount)
    .then((txHash) => {
      console.log(`Transaction successful. Tx Hash: ${txHash}`);
    })
    .catch((error) => {
      console.error(error);
    });
} else {
  console.error("Invalid transfer content");
}
```

2. Validating if provided content is a transfer object:
```typescript
// Define content object
const content = {
  recipient: "recipient.near",
  amount: "10",
  tokenAddress: "near"
};

// Check if content is a transfer object
const isTransfer = isTransferContent(runtime, content);
console.log(isTransfer); // Output: true
```

### Best Practices
- Always validate the content object using `isTransferContent` before initiating a transfer to prevent any errors.
- Make sure to handle any errors thrown during the transfer process to provide meaningful feedback to the user.

### environment.ts

### Common Use Cases
1. Fetching NEAR configuration based on the provided environment:
    ```typescript
    const config = getConfig('production');
    console.log(config); // Output: { networkId: 'mainnet', nodeUrl: 'https://rpc.mainnet.near.org', contractName: 'example' }
    ```

2. Validating NEAR configuration based on runtime settings:
    ```typescript
    const runtimeSettings = {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: 'example-contract'
    };
    
    validateNearConfig(runtimeSettings)
        .then((validatedConfig) => {
            console.log(validatedConfig); // Output: { networkId: 'testnet', nodeUrl: 'https://rpc.testnet.near.org', contractName: 'example-contract' }
        });
    ```

### Best Practices
- Always provide the environment parameter to `getConfig` function to get configuration specific to that environment.
- Ensure to handle the resolved Promise from `validateNearConfig` function to access the validated NEAR configuration.

### actions/swap.ts

### Common Use Cases
1. Checking storage balance of an account within a contract:
```typescript
const account = "example.near";
const contractId = "example-contract";
const hasStorageBalance = await checkStorageBalance(account, contractId);
console.log(hasStorageBalance); // Output: true or false
```

2. Performing a token swap operation on NEAR Protocol:
```typescript
const runtime = Runtime.create(....); // Create NEAR Protocol runtime object
const inputTokenId = "tokenA";
const outputTokenId = "tokenB";
const amount = "100";
const slippageTolerance = 0.1;
const swapResult = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log(swapResult); // Output: Array of transactions for the swap operation
```

### Best Practices
- Always handle the Promise returned by the functions with `await` or `.then()` method to properly access the resolved data.
- Make sure to provide correct inputs to the functions according to the specified parameters to avoid errors.

## API Reference
### providers/wallet.ts

### Classes

- WalletProvider: 
```typescript
/**
 * A class that implements the Provider interface and acts as a wallet provider.
 * Manages interactions with a NEAR wallet to retrieve and format portfolio information.
 * @implements {Provider}
 */
```

#### Methods

- constructor: 
```typescript
/**
 * Constructor for creating an instance of the class.
 *
 * @param {string} accountId - The unique identifier for the account.
 */
```

- get: 
```typescript
/**
 * Asynchronously retrieves the formatted portfolio using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used to retrieve the portfolio.
 * @param {Memory} _message - The memory object (not used in this method).
 * @param {State} [_state] - Optional state object (not used in this method).
 * @returns {Promise<string | null>} - A promise that resolves with the formatted portfolio string or null if an error occurs.
 */
```

- connect: 
```typescript
/**
 * Establishes a connection to NEAR blockchain using the provided runtime object.
 * If the account is already connected, returns the account.
 * If NEAR wallet secret key and public key are not configured, throws an error.
 * Creates a KeyPair from the secret key and sets it in the keystore.
 * Connects to NEAR blockchain using the provided configuration.
 * Retrieves the account for the specified account ID and returns it.
 * @param {IAgentRuntime} runtime - The runtime object for the agent.
 * @returns {Promise<Account>} The connected NEAR account.
 */
```

- fetchWithRetry: 
```typescript
/**
 * Fetches data from a URL with retry mechanism in case of failure.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} The data fetched from the URL.
 */
```

- fetchPortfolioValue: 
```typescript
/**
 * Fetches the current value of the portfolio based on the account balance and NEAR price in USD.
 * If a cached value is available, it returns that instead of making an API call.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used to interact with the NEAR blockchain.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio object containing total USD value, total NEAR balance, and token details.
 * @throws {Error} If there is an error fetching the portfolio.
 */
```

- fetchNearPrice: 
```typescript
/**
 * Private method to asynchronously fetch the near price.
 * 
 * @returns {Promise<number>} The near price fetched.
 */
```

- formatPortfolio: 
```typescript
/**
 * Formats the wallet portfolio data into a human-readable string.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to access system information.
 * @param {WalletPortfolio} portfolio - The wallet portfolio data to be formatted.
 * @returns {string} - The formatted string displaying system information, account ID, total value, token balances, and market prices.
 */
```

- getFormattedPortfolio: 
```typescript
/**
 * Asynchronously fetches and formats the portfolio value for a given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to fetch the portfolio value for.
 * @returns {Promise<string>} The formatted portfolio value as a string.
 */
```

### Interfaces

- NearToken: 
```typescript
/**
 * Interface representing a Near Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token for display.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near Protocol tokens (optional).
 */
```

- WalletPortfolio: 
```typescript
/**
 * Interface representing a wallet portfolio with total USD balance, optional total NEAR balance, and an array of NearToken objects.
 * @interface
 * @property {string} totalUsd - The total USD balance in the wallet.
 * @property {string} [totalNear] - The optional total NEAR balance in the wallet.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the wallet.
 */
```

### Types
- None

### Functions
- None

### actions/transfer.ts

### Classes
N/A

### Interfaces
- TransferContent: 
```typescript
/**
 * Interface for transferring content with specific recipient, amount, and optional token address.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### Types
N/A

### Functions
- isTransferContent:
```typescript
/**
 * Check if the given content object is a TransferContent object.
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content object to check.
 * @returns {boolean} Returns true if the content is of type TransferContent.
 */
```

- transferNEAR:
```typescript
/**
 * Transfers a specified amount of NEAR tokens from the current wallet account to a recipient.
 * @param {IAgentRuntime} runtime - The agent runtime providing settings and connection to NEAR.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR tokens to transfer (in NEAR).
 * @returns {Promise<string>} - A promise that resolves to the hash of the transaction upon successful transfer.
 * @throws {Error} - If NEAR wallet credentials are not configured in the runtime settings.
 */
```

### environment.ts

### Classes

### Interfaces

### Types

- NearConfig: 
```typescript
/**
 * Type definition for NearConfig based on the inferred type from nearEnvSchema.
 */
```

### Functions

- getConfig:
```typescript
/**
 * Retrieves configuration based on the provided environment or defaults to ENV ||
 * process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV.
 * @param {string | undefined | null} env - The environment to get configuration for.
 * @returns {Object} - The configuration object based on the provided environment.
 */
```

- validateNearConfig: 
```typescript
/**
 * Validates the NEAR configuration based on the runtime settings and environment variables.
 * @param {IAgentRuntime} runtime - The Agent runtime containing the settings.
 * @returns {Promise<NearConfig>} - A Promise that resolves to the validated NEAR configuration.
 */
``` 

Please let me know if you need more information or examples.

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
 * Asynchronously checks the storage balance of a specified account within a given contract.
 * 
 * @param {any} account - The account for which to check the storage balance.
 * @param {string} contractId - The ID of the contract to query.
 * @returns {Promise<boolean>} A Promise that resolves to true if the storage balance is non-zero, false otherwise.
 */
checkStorageBalance(account: any, contractId: string): Promise<boolean>
```

#### swapToken
```typescript
/**
 * Performs token swap operation on NEAR Protocol.
 * 
 * @param {IAgentRuntime} runtime - The NEAR Protocol runtime object.
 * @param {string} inputTokenId - The token ID of the token to be swapped from.
 * @param {string} outputTokenId - The token ID of the token to be swapped to.
 * @param {string} amount - The amount of input token to be swapped.
 * @param {number} slippageTolerance - The maximum acceptable slippage tolerance for the swap.
 * @returns {Promise<any>} - A promise that resolves with an array of transactions for the swap operation.
 */
swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number): Promise<any>
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
       ...
   }
   - Type: enhancement

### Troubleshooting
### Common Issues
1. The NEAR wallet credentials are not configured
   - Cause: The NEAR wallet secret key and public key are missing or not set in the runtime settings.
   - Solution: Set the NEAR wallet secret key and public key in the runtime settings to establish the connection with the NEAR blockchain.

### Debugging Tips
- Ensure the NEAR wallet secret key and public key are correctly configured in the runtime settings.
- Verify that the NEAR network ID, node URL, and wallet URL are set correctly for the connection.

### FAQ
Q: How to fetch the NEAR price in USD?
A: You can fetch the NEAR price in USD using the `fetchNearPrice` method. Here is an example URL: `https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd`