# @elizaos/plugin-near

            ## Overview
            ### Purpose
The @elizaos/plugin-near is a plugin designed to provide functionality related to location tracking and proximity detection within applications.

### Key Features
- Feature 1: Allows users to easily integrate location tracking into their application, providing accurate data on user location.
- Feature 2: Enables developers to set up proximity alerts and notifications based on pre-defined distance thresholds.

            ## Installation
            # Installation and Integration Instructions for @elizaos/plugin-near

## 1. Add the plugin to your ElizaOS project:

### Step 1:
Add the following to your agent/package.json dependencies:
```json
{
  "dependencies": {
    "@elizaos/plugin-near": "workspace:*"
  }
}
```

### Step 2:
Navigate to the agent/ directory in your project

### Step 3:
Run the following commands:
```bash
pnpm install
pnpm build
```

## 2. Import and Use the Plugin:

### Import Syntax:
```typescript
import { nearPlugin } from "@elizaos/plugin-near";
```

### Add to AgentRuntime Plugins Array:
```typescript
return new AgentRuntime({
    // other configuration...
    plugins: [
        nearPlugin,
        // other plugins...
    ],
});
```

## 3. Integration Example:

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

## 4. Verification Steps:

Ensure successful integration by checking console output for the message:
```plaintext
✓ Registering action: <plugin actions>
```

By following these steps, you should be able to successfully install and integrate the @elizaos/plugin-near plugin into your ElizaOS project with NEAR Protocol functionality.

            ## Configuration
            # Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV` 
    - Purpose: Used to set the environment for NEAR protocol.
    
2. `REACT_APP_REF_SDK_ENV`
    - Purpose: Used to specify the environment for the React app.
    
3. `NEAR_WALLET_SECRET_KEY`
    - Purpose: Contains the secret key for the NEAR wallet.
    
4. `NEAR_WALLET_PUBLIC_KEY`
    - Purpose: Contains the public key for the NEAR wallet.
    
5. `NEAR_ADDRESS`
    - Purpose: specifies the NEAR address for the application.
    
6. `SLIPPAGE`
    - Purpose: Defines the slippage setting for the application.
    
7. `RPC_URL`
    - Purpose: Contains the RPC URL for the application.
    
8. `NEAR_NETWORK`
    - Purpose: Defines the NEAR network to which the application connects.

## Sample .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key_here
NEAR_WALLET_PUBLIC_KEY=your_public_key_here
NEAR_ADDRESS=your_near_address_here
SLIPPAGE=1
RPC_URL=https://rpc.testnet.near.org
NEAR_NETWORK=testnet
```

**Note:** Please ensure that the `.env` file is set in the `.gitignore` file to prevent it from being committed to the repository. Configuration can be done in the `.env` file.

            ## Features

            ### Actions
            # Action: EXECUTE_SWAP_NEAR

Perform a token swap using Ref Finance.

## Properties:
- **Name:** EXECUTE_SWAP_NEAR
- **Similes:** SWAP_TOKENS_NEAR, TOKEN_SWAP_NEAR, TRADE_TOKENS_NEAR, EXCHANGE_TOKENS_NEAR

## Validation:
The action validates the message and returns true.

## Handler:
The handler function performs the token swap using Ref Finance. It initializes the Ref SDK with the testnet environment, composes the state, extracts wallet information, composes the context with the swap template, generates the object, and executes the token swap. If any required parameters are missing, it sends a message asking for the input token ID, output token ID, and amount. Upon successful completion of the swap, it sends a message with the transaction hashes. If an error occurs during the swap, it sends an error message.

## Examples:
### Usage:
1. User {{user1}} wants to swap tokens:
    ```json
    {
        "inputTokenId": "wrap.testnet",
        "outputTokenId": "ref.fakes.testnet",
        "amount": "1.0"
    }
    ```
2. Agent performs the token swap:
    ```json
    {
        "user": "{{user2}}",
        "content": {
            "text": "Swapping 1.0 NEAR for REF...",
            "action": "TOKEN_SWAP"
        }
    }
    ```
3. Agent confirms successful swap:
    ```json
    {
        "user": "{{user2}}",
        "content": {
            "text": "Swap completed successfully! Transaction hash: ..."
        }
    }
    ```

## Note:
- Additional properties and functionalities for the action can be added as required.

# Action: SEND_NEAR

## Description
Transfer NEAR tokens to another account.

## Similar Actions
- TRANSFER_NEAR
- SEND_TOKENS
- TRANSFER_TOKENS
- PAY_NEAR

## Validation
This action does not have specific validation logic implemented. 

## Handler
1. Initialize or update state.
2. Compose transfer context using a pre-defined template.
3. Generate transfer content based on the context and a small model class.
4. Validate the transfer content.
5. Perform NEAR token transfer to the specified recipient.
6. If successful, provide a success message with the transaction details.
7. If an error occurs during the transfer, provide an error message.

## Examples
### Usage
1. User {{user1}}: "Send 1.5 NEAR to bob.testnet"
2. Agent {{user2}}: "I'll send 1.5 NEAR now..."
3. Agent {{user2}}: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"



            ### Providers
            ## WalletProvider

The `WalletProvider` class is responsible for fetching and formatting the wallet portfolio information for a given NEAR Protocol account ID.

### Constructor

- **Parameters**
  - `accountId` : string - The NEAR Protocol account ID for which the wallet portfolio information will be fetched and formatted.

### Methods

#### `get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>`

- **Description**: Fetches and returns the formatted wallet portfolio information for the specified NEAR Protocol account ID.
  
- **Parameters**
  - `runtime` : IAgentRuntime - The current runtime environment.
  - `_message` : Memory - Unused parameter.
  - `_state` : State - Unused parameter.

- **Returns**
  - `Promise<string | null>` : A promise that resolves to the formatted wallet portfolio information as a string, or `null` if an error occurs.

#### `connect(runtime: IAgentRuntime): Promise<Account>`

- **Description**: Establishes a connection to the NEAR Protocol account using the provided wallet credentials.

- **Parameters**
  - `runtime` : IAgentRuntime - The current runtime environment.

- **Returns**
  - `Promise<Account>` : A promise that resolves to the NEAR Protocol account object once connected.

#### `fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>`

- **Description**: Fetches the portfolio value of the NEAR Protocol account including token balances and total value in USD.

- **Parameters**
  - `runtime` : IAgentRuntime - The current runtime environment.

- **Returns**
  - `Promise<WalletPortfolio>` : A promise that resolves to an object containing the wallet portfolio information.

#### `fetchNearPrice(): Promise<number>`

- **Description**: Fetches the current price of NEAR in USD from the CoinGecko API.

- **Returns**
  - `Promise<number>` : A promise that resolves to the current price of NEAR in USD.

#### `formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string`

- **Description**: Formats the wallet portfolio information into a human-readable string.

- **Parameters**
  - `runtime` : IAgentRuntime - The current runtime environment.
  - `portfolio` : WalletPortfolio - The wallet portfolio object containing the information to be formatted.

- **Returns**
  - `string` : The formatted wallet portfolio information as a string.

#### `getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>`

- **Description**: Retrieves the formatted wallet portfolio information by fetching the portfolio value and formatting it.

- **Parameters**
  - `runtime` : IAgentRuntime - The current runtime environment.

- **Returns**
  - `Promise<string>` : A promise that resolves to the formatted wallet portfolio information as a string.

### Notes

- The `WalletProvider` class utilizes NodeCache for caching fetched data with a TTL of 5 minutes.
- The NEAR Protocol account credentials should be provided through the `NEAR_WALLET_SECRET_KEY` and `NEAR_WALLET_PUBLIC_KEY` settings.
- The NEAR Protocol account ID should be configured using the `NEAR_ADDRESS` setting when using the `walletProvider` object.



            ### Evaluators
            

            ## Usage Examples
            ### providers/wallet.ts

### Components

Classes:
- WalletProvider: Class representing a wallet provider that implements the Provider interface.

Methods:
- constructor: Constructor for creating a new instance of the class. Takes a string parameter accountId.
- get: Retrieves the formatted portfolio from the wallet provider. Takes IAgentRuntime, Memory, and optional State parameters.
- connect: Connect to the NEAR network using the provided runtime and retrieve the account information. Throws an error if NEAR wallet credentials are not properly configured.
- fetchWithRetry: Fetches data from a given URL with retries in case of failure.
- fetchPortfolioValue: Fetch the current value of the portfolio by getting the account balance, converting it to NEAR and USD, fetching the NEAR price in USD, and calculating the total value in USD.
- fetchNearPrice: Asynchronously fetches the near price from the Coingecko API.
- formatPortfolio: Formats the portfolio information into a string with account ID, total value, token balances, and market prices.
- getFormattedPortfolio: Asynchronously retrieves the portfolio value using the provided IAgentRuntime instance and returns it in a formatted string.

Interfaces:
- NearToken: Interface representing a NEAR Protocol token.
- WalletPortfolio: Interface representing a wallet portfolio.

### Common Use Cases

1. Fetching the portfolio value and formatting it:
```typescript
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolioValue);
console.log(formattedPortfolio);
```

2. Connecting to the NEAR network and fetching account information:
```typescript
try {
    const nearAccount = await walletProvider.connect(runtime);
    console.log(nearAccount);
} catch (error) {
    console.error(error.message);
}
```

### Best Practices
- Ensure NEAR wallet credentials are properly configured before connecting to the NEAR network.
- Implement retry logic when fetching data from external sources to handle network failures gracefully.

### actions/transfer.ts

### Components
Interfaces:
- TransferContent:
  Interface representing the content of a transfer operation.
  Extends the Content interface.
  - recipient - The recipient of the transfer.
  - amount - The amount to be transferred.
  - tokenAddress - Optional token address for non-native NEAR transfers.

Functions:
- isTransferContent:
  Checks if the specified content is of type TransferContent.
  - runtime - The runtime environment for running the function.
  - content - The content to be checked.
  Returns true if the content is of type TransferContent, false otherwise.
- transferNEAR:
  Transfer NEAR tokens from the current account to a specified recipient.
  - runtime - The runtime object for accessing settings and other runtime functions.
  - recipient - The NEAR account ID of the recipient.
  - amount - The amount of NEAR to transfer in string format.
  Returns a Promise that resolves to the transaction hash of the transfer.

### Common Use Cases
1. To check if a content is of type TransferContent:
```typescript
const runtime = getRuntime();
const content = getContent();

if (isTransferContent(runtime, content)) {
  // Content is a TransferContent
} else {
  // Content is not a TransferContent
}
```

2. To transfer NEAR tokens to a recipient:
```typescript
const runtime = getRuntime();
const recipient = 'recipient.near';
const amount = '10';

transferNEAR(runtime, recipient, amount)
  .then((transactionHash) => {
    console.log(`Transfer successful. Transaction hash: ${transactionHash}`);
  })
  .catch((error) => {
    console.error(`Error transferring NEAR tokens: ${error}`);
  });
```

### Best Practices
- Always check if the content is of type TransferContent before performing any transfer operation.
- Ensure that the recipient's NEAR account ID and the amount to be transferred are valid and correctly formatted.

### environment.ts

### Components
Types:

- NearConfig: 
  /**
   * Type definition for NearConfig inferred from nearEnvSchema.
   */

Functions:

- getConfig: 
  /**
   * Function to get the configuration based on the specified environment or default values.
   * 
   * @param {string} env - The environment to get the configuration for. If not provided, ENV or process.env.NEAR_ENV or process.env.REACT_APP_REF_SDK_ENV will be used.
   * 
   * @returns {object} - The configuration object based on the specified environment.
   */
- validateNearConfig: 
  /**
   * Validates the Near configuration based on the provided runtime and environment settings.
   * @param {IAgentRuntime} runtime - The Agent runtime object.
   * @returns {Promise<NearConfig>} - The validated Near configuration object.
   */

### Common Use Cases
1. First use case with code example:
```typescript
const config = getConfig('production');
console.log(config);
```

2. Second use case with code example:
```typescript
const runtime = getAgentRuntime();
const validatedConfig = await validateNearConfig(runtime);
console.log(validatedConfig);
```

### Best Practices
- Ensure to provide the correct environment when calling `getConfig` function.
- Always use the `validateNearConfig` function to make sure the Near configuration is valid before using it.

### actions/swap.ts

### Components
Functions:
- checkStorageBalance: Asynchronously checks the storage balance of a given account on a specified contract.
- swapToken: Function to swap tokens on NEAR Protocol.

### Common Use Cases
1. Checking storage balance:
```
const account = { /* account object */ };
const contractId = 'exampleContractId';
checkStorageBalance(account, contractId)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error);
  });
```

2. Swapping tokens:
```
const runtime = { /* Agent Runtime object */ };
const inputTokenId = 'inputTokenId';
const outputTokenId = 'outputTokenId';
const amount = '10';
const slippageTolerance = 0.01;
swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
  .then((transactions) => {
    console.log(transactions);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Best Practices
- Always handle Promise rejections to avoid uncaught errors.
- Provide accurate input parameters to ensure correct functionality of the functions.

            ## API Reference
            ### providers/wallet.ts


Types:

- IAgentRuntime: ```
/**
 * Interface representing the agent runtime used for NEAR wallet integration.
 */
interface IAgentRuntime {
  // properties and methods here
}
```

Functions:

- createWalletProvider: ```
/**
 * Create a new instance of the WalletProvider class.
 * @param {string} accountId - The unique identifier for the account.
 * @returns {WalletProvider} A new instance of the WalletProvider class.
 */
function createWalletProvider(accountId: string): WalletProvider;
```

- fetchWalletPortfolio: ```
/**
 * Fetch the formatted portfolio from the wallet provider.
 * 
 * @param {WalletProvider} walletProvider - The wallet provider instance.
 * @param {Memory} _message - The memory object (not used).
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string|null>} The formatted portfolio as a string, or null if an error occurs.
 */
function fetchWalletPortfolio(walletProvider: WalletProvider, _message: Memory, _state?: State): Promise<string|null>;
```

### actions/transfer.ts

### Classes

None

### Interfaces

- **TransferContent**: 
  - recipient: string
  - amount: string | number
  - tokenAddress?: string

### Types

None

### Functions

- **isTransferContent**: 
  - Parameters: 
    - runtime: IAgentRuntime
    - content: any
  - Return type: boolean

- **transferNEAR**: 
  - Parameters: 
    - runtime: IAgentRuntime
    - recipient: string
    - amount: string
  - Return type: Promise<string>

### environment.ts

Types:
- NearConfig: /**
 * Type definition for NearConfig inferred from nearEnvSchema.
 */

Functions:
- getConfig: /**
 * Function to get the configuration based on the specified environment or default values.
 * 
 * @param {string} env - The environment to get the configuration for. If not provided, ENV or process.env.NEAR_ENV or process.env.REACT_APP_REF_SDK_ENV will be used.
 * 
 * @returns {object} - The configuration object based on the specified environment.
 */
- validateNearConfig: /**
 * Validates the Near configuration based on the provided runtime and environment settings.
 * @param {IAgentRuntime} runtime - The Agent runtime object.
 * @returns {Promise<NearConfig>} - The validated Near configuration object.
 */

### actions/swap.ts

### Functions

#### checkStorageBalance
Asynchronously checks the storage balance of a given account on a specified contract.

- Parameters:
  - account (any): The account object to use for the storage balance check.
  - contractId (string): The ID of the contract to check the storage balance on.

- Returns: 
  - Promise<boolean>: A Promise that resolves to a boolean indicating whether the storage balance is not null and not equal to "0".

#### swapToken
Function to swap tokens on NEAR Protocol.

- Parameters:
  - runtime (IAgentRuntime): The Agent Runtime object.
  - inputTokenId (string): The ID of the input token.
  - outputTokenId (string): The ID of the output token.
  - amount (string): The amount of tokens to swap.
  - slippageTolerance (number): The slippage tolerance for the swap (default: 0.01).

- Returns:
  - Promise<any>: An array of transactions to be executed for the token swap.

            ## Development

            ### TODO Items
            ### Items
1. TODO: add functionality to support multiple networks
   - Context: Update the `swapToken` function to support swapping on different networks based on runtime settings.
   - Type: Enhancement

            ### Troubleshooting
            ### Common Issues
1. Plugin not connecting to NEAR network
   - Cause: NEAR wallet credentials not properly configured
   - Solution: Ensure that NEAR wallet secret key and public key are correctly configured in the runtime settings

### Debugging Tips
- Check the NEAR wallet credentials configuration
- Verify the network connection settings

### FAQ
Q: How to check the storage balance for an account on a specific contract?
A: You can use the `checkStorageBalance` function by providing the account object and the contract ID to check the storage balance. Example:
```javascript
const hasBalance = await checkStorageBalance(account, contractId);
```
            