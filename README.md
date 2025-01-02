# @elizaos/plugin-near Documentation

## Overview

### Purpose
@elizaos/plugin-near is a comprehensive package designed to facilitate interaction with the NEAR protocol by providing essential functionality such as managing wallet operations, fetching portfolio data, and performing token swaps.

Package Information:
- Name: @elizaos/plugin-near
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- WalletProvider class for managing wallet operations, connecting to NEAR wallet, fetching portfolio value, and obtaining NEAR price in USD.
- Interfaces like TransferContent, NearToken, and WalletPortfolio to define transfer content, token properties, and wallet portfolio structure.
- Functions like checkStorageBalance, swapToken, isTransferContent, transferNEAR, getConfig, and validateNearConfig for various NEAR protocol operations and validations.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### Adding the Plugin to Your ElizaOS Project:
1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. Navigate to the agent/ directory in your project
3. Run `pnpm install` to install the new dependency
4. Run `pnpm build` to build the project with the new plugin

### Importing and Using the Plugin:
1. Import the plugin using:
   ```typescript
   import { nearPlugin } from "@elizaos/plugin-near";
   ```
2. Add it to the AgentRuntime plugins array in your code.

### Integration Example:
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

### Verification Steps:
Ensure successful integration by verifying that the following message appears in the console:
```plaintext
✓ Registering action: <plugin actions>
```

By following these steps, you should successfully install, integrate, and verify the @elizaos/plugin-near plugin in your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`: Used to define the environment for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Used to define the environment for the React SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the runtime setting.
6. `SLIPPAGE`: Slippage setting for the runtime.
7. `RPC_URL`: RPC URL for the runtime.
8. `NEAR_NETWORK`: NEAR network ID for the runtime.

## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=abcdef1234567890
NEAR_WALLET_PUBLIC_KEY=xyz0987654321
NEAR_ADDRESS=mynearaddress
SLIPPAGE=0.5
RPC_URL=https://rpc.testnet.near.org
NEAR_NETWORK=testnet
```

Please make sure to set the above environment variables in the `.env` file. Also, ensure that the `.env` file is added to the `.gitignore` file so that sensitive information is not committed to the repository.

## Features

### Actions
No actions documentation available.

### Providers
### WalletProvider
This provider allows you to fetch and format wallet information for a specific NEAR Protocol account.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { walletProvider } from "./providers/wallet";

const accountId = "example.near"; // NEAR account ID

// Define runtime, message, and state
const runtime: IAgentRuntime = { character: { system: "mySystem" } };
const message: Memory = { data: "example" };
const state: State = { key: "value" };

// Get wallet information
walletProvider.get(runtime, message, state)
    .then((portfolio: string | null) => {
        console.log(portfolio);
    })
    .catch((error: any) => {
        console.error(error);
    });
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/wallet.ts

### Common Use Cases
1. Initialize a wallet provider with a specific account ID:
```typescript
const walletProvider = new WalletProvider("example_account_id");
```

2. Retrieve the formatted portfolio using the wallet provider:
```typescript
const formattedPortfolio = await walletProvider.get(runtime, _message, _state);
```

### Best Practices
- Ensure to handle errors appropriately when fetching portfolio data.
- Use the `fetchWithRetry` method for fetching data from a URL with retry mechanism.

### actions/transfer.ts

### Common Use Cases
1. Transferring NEAR tokens to another account:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { transferNEAR } from './actions/transfer';

const recipient = 'receiver.testnet';
const amount = '10';
const transactionHash = await transferNEAR(runtime, recipient, amount);
console.log('Transfer successful, transaction hash: ', transactionHash);
```

2. Checking if content is of type TransferContent:
```typescript
import { IAgentRuntime } from 'near-sdk-as';
import { isTransferContent } from './actions/transfer';

const content = {
  recipient: 'receiver.testnet',
  amount: '10',
  tokenAddress: 'NEAR'
};

const isTransfer = isTransferContent(runtime, content);
console.log('Is content TransferContent type: ', isTransfer);
```

### Best Practices
- Always ensure that the NEAR wallet credentials are properly configured before making a transfer.
- Use proper type checking methods like `isTransferContent` to validate the content type before processing.

### environment.ts

### Common Use Cases
1. **Retrieving Near configuration based on environment:**
```typescript
import { getConfig } from 'environment';

const nearConfig = getConfig('development');
console.log(nearConfig);
```

2. **Validating Near configuration with runtime settings:**
```typescript
import { validateNearConfig } from 'environment';

const runtime = {...}; // runtime settings
validateNearConfig(runtime)
    .then((validatedConfig) => {
        console.log('Validated Near configuration:', validatedConfig);
    })
    .catch((error) => {
        console.error('Error validating Near configuration:', error);
    });
```

### Best Practices
- **Utilize getConfig function with default environment:**
```typescript
import { getConfig } from 'environment';

const nearConfig = getConfig(); // retrieve configuration for default environment
console.log(nearConfig);
```

- **Handle errors when validating Near configuration:**
```typescript
import { validateNearConfig } from 'environment';

const runtime = {...}; // runtime settings
validateNearConfig(runtime)
    .then((validatedConfig) => {
        console.log('Validated Near configuration:', validatedConfig);
    })
    .catch((error) => {
        console.error('Error validating Near configuration:', error);
    });
```

### actions/swap.ts

### Common Use Cases
1. Swapping tokens using the `swapToken` function:
```
const runtime = new AgentRuntime();
const inputTokenId = 'token1';
const outputTokenId = 'token2';
const amount = '100';
const slippageTolerance = 0.01;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
    .then(transactions => {
        console.log('Swap successful. Transactions:', transactions);
    })
    .catch(error => {
        console.error('Error during swap:', error);
    });
```

2. Checking storage balance for a specific account and contract using the `checkStorageBalance` function:
```
const account = {
    address: '0x123abc',
    publicKey: 'abc123'
};
const contractId= 'contract1';

checkStorageBalance(account, contractId)
    .then(balanceNotNull => {
        if(balanceNotNull) {
            console.log('Storage balance is not null and total is not "0"');
        } else {
            console.log('Error occurred while checking storage balance');
        }
    })
    .catch(error => {
        console.error('Error checking storage balance:', error);
    });
```

### Best Practices
- Ensure that the necessary parameters are provided when using the functions.
- Handle promise rejections by adding appropriate error handling in the `catch` block.

## API Reference
### providers/wallet.ts

#### Classes

##### WalletProvider

/**
 * WalletProvider class that implements Provider interface.
 * Manages wallet functionality such as connecting to NEAR wallet, fetching portfolio value,
 * formatting portfolio data, and fetching NEAR price in USD.
 * @implements Provider
 */

#### Interfaces

##### NearToken

/**
 * Interface for representing a token that is near a specified value.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in the NEAR protocol.
 */

##### WalletPortfolio

/**
* Interface for a wallet portfolio, containing total USD value, total NEAR value, and an array of NearToken objects.
* @typedef {Object} WalletPortfolio
* @property {string} totalUsd - The total value in USD.
* @property {string} [totalNear] - The total value in NEAR (optional).
* @property {Array<NearToken>} tokens - An array of NearToken objects.
*/

#### Methods

##### constructor

/**
 * Constructor for creating an instance of a class with the specified accountId.
 * Additionally, initializes a cache with a TTL of 5 minutes and an in-memory key store.
 * @param {string} accountId - The unique identifier for the account.
 */

##### get

/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The memory object for the agent.
 * @param {State} [_state] - The optional state object for the agent.
 * @returns {Promise<string | null>} The formatted portfolio string or null if an error occurs.
 */

##### connect

/**
 * Connects to the NEAR Wallet using the provided runtime and sets up the account.
 * If the account is already initialized, it returns the existing account.
 *
 * @param {IAgentRuntime} runtime - The runtime object that provides access to settings.
 * @returns {Promise<Account>} Returns a Promise that resolves to the NEAR Wallet account object.
 * @throws {Error} Throws an error if the NEAR wallet credentials are not configured.
 */

##### fetchWithRetry

/**
 * Fetches data from a URL with retry mechanism.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to include in the fetch request.
 * @returns {Promise<any>} The data retrieved from the URL.
 */

##### fetchPortfolioValue

/**
 * Fetches the current value of the portfolio by querying the account balance,
 * converting NEAR balance to USD, fetching the NEAR price in USD, and calculating
 * the total USD value of the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The runtime to use for fetching data.
 * @returns {Promise<WalletPortfolio>} - The portfolio object containing the total USD value,
 * total NEAR balance, and the token details.
 * @throws {Error} - If there is an error fetching the portfolio value.
 */

##### fetchNearPrice

/**
 * Fetches the NEAR price from the API and stores it in cache if it's not already cached.
 * 
 * @return {Promise<number>} The NEAR price in USD.
 */

##### formatPortfolio

/**
 * Formats the given portfolio data into a readable string for display.
 * 
 * @param {IAgentRuntime} runtime - The current agent runtime.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted portfolio as a string.
 */

##### getFormattedPortfolio

/**
 * Asynchronously gets the formatted portfolio value.
 * 
 * @param {IAgentRuntime} runtime - The runtime information for the agent.
 * @returns {Promise<string>} The formatted portfolio value.
 */


### actions/transfer.ts

#### Interfaces

##### TransferContent

/**
 * Interface representing the content of a transfer.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount of the transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */

#### Functions

##### isTransferContent

/**
 * Checks if the provided content is TransferContent type.
 * 
 * @param {IAgentRuntime} runtime - The runtime object that provides access to agent-specific functions and data.
 * @param {any} content - The content to be checked if it is of TransferContent type.
 * @returns {boolean} Returns true if the content is of TransferContent type, false otherwise.
 */

##### transferNEAR

/**
 * Transfer NEAR tokens to a recipient.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment.
 * @param {string} recipient - The NEAR account to transfer tokens to.
 * @param {string} amount - The amount of NEAR tokens to transfer.
 * @returns {Promise<string>} The transaction hash of the transfer.
 * @throws {Error} If NEAR wallet credentials are not properly configured.
 */


### environment.ts

#### Types

##### NearConfig

/**
 * Type alias for the inferred type of the Near environment schema.
 */

#### Functions

##### getConfig

/**
 * Retrieves the configuration based on the provided environment or falls back to default values.
 * @param {string | undefined | null} env - The environment to retrieve the configuration for.
 * @returns {Object} The configuration object with network information based on the specified or default environment.
 */

##### validateNearConfig

/**
 * Validates the Near configuration based on the provided runtime settings and environment variables.
 * @param {IAgentRuntime} runtime - The agent runtime interface containing settings.
 * @returns {Promise<NearConfig>} - A Promise that resolves with the validated Near configuration.
 * @throws {Error} - If the configuration validation fails, an error is thrown with detailed messages.
 */ 



### actions/swap.ts

#### Functions

##### checkStorageBalance

/**
 * Asynchronously checks the storage balance of a given account for a specific contract.
 * 
 * @param {any} account - The account for which the storage balance is to be checked.
 * @param {string} contractId - The ID of the contract for which the storage balance is to be checked.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the storage balance is not null and the total is not "0", or false if an error occurs.
 */

##### swapToken

/**
 * Perform token swap operation.
 * 
 * @param {IAgentRuntime} runtime - The Agent runtime instance.
 * @param {string} inputTokenId - The ID of the input token.
 * @param {string} outputTokenId - The ID of the output token.
 * @param {string} amount - The amount of input token to swap.
 * @param {number} [slippageTolerance=0.01] - The slippage tolerance for the swap operation.
 * 
 * @returns {Promise<any>} - Promise that resolves to an array of transactions for the swap.
 */


## Development

### TODO Items
### Items
1. TODO: add functionality to support multiple networks
   - Context: Function to swap tokens with multiple network support
   - Type: enhancement

### Troubleshooting
### Common Issues
1. `NEAR wallet credentials not configured`
   - Cause: The NEAR wallet credentials (secret key, public key) are not properly configured or missing.
   - Solution: Configure the NEAR wallet credentials in the agent runtime settings.

### Debugging Tips
- Ensure that the NEAR wallet credentials are properly set in the agent runtime settings.
- Check for any error messages related to wallet provider functionality.

### FAQ
Q: How to connect to the NEAR Wallet using the `WalletProvider` class?
A: You can connect to the NEAR Wallet by calling the `connect` method of the `WalletProvider` class with the appropriate runtime object. For example:
   ```typescript
   const walletProvider = new WalletProvider("your_account_id");
   const account = await walletProvider.connect(yourRuntimeObject);
   ```