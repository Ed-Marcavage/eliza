
            ## Plugin Overview: @elizaos/plugin-near

### Purpose:
The `@elizaos/plugin-near` plugin is designed to provide functionalities related to managing wallets and transferring tokens within the NEAR protocol. It offers a comprehensive set of classes and interfaces to interact with wallet providers, transfer content, and token portfolios.

### Main Features:
1. **WalletProvider Class**:
   - Represents a Wallet Provider implementing the Provider interface for managing wallet functionalities.

2. **Key Interfaces**:
   - **TransferContent**:
     - Interface for transferring content with properties like recipient, amount, and token address for NEAR transfers.
   - **NearToken**:
     - Represents a token in the NEAR protocol with properties like name, symbol, balance, price in USD, and value in NEAR protocol's native token.
   - **WalletPortfolio**:
     - Interface for a wallet portfolio including total USD value, total NEAR value (optional), and an array of NearToken objects representing tokens.

Overall, the `@elizaos/plugin-near` plugin provides essential tools for managing NEAR wallets, transferring tokens, and tracking token portfolios in a clear and structured manner.
            ## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Add the plugin to your ElizaOS project:

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

### 2. Import and Use the Plugin:

- Import syntax using: `import { nearPlugin } from "@elizaos/plugin-near";`
- Add the plugin to the AgentRuntime plugins array.

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

Ensure you see ["✓ Registering action: <plugin actions>"] in the console to verify successful integration.

Remember to also install the necessary peer dependencies listed in the documentation for seamless integration.
            # Configuration Documentation

To configure the application, please set the following environment variables in a **.env** file in the root of your project. Make sure to add the **.env** file to the **.gitignore** to prevent sensitive information from being committed to the repository.

## Required Environment Variables

1. `NEAR_ENV`: This variable is used to define the environment for the application.
2. `REACT_APP_REF_SDK_ENV`: This variable is used in the React application for reference purposes.
3. `NEAR_WALLET_SECRET_KEY`: This variable stores the secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: This variable stores the public key for the NEAR wallet.
5. `NEAR_ADDRESS`: This variable is used to define the NEAR address.
6. `SLIPPAGE`: This variable is used to define the slippage percentage.
7. `RPC_URL`: This variable stores the RPC URL for the application.
8. `NEAR_NETWORK`: This variable defines the NEAR network for the application.

## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_secret_key_here
NEAR_WALLET_PUBLIC_KEY=your_public_key_here
NEAR_ADDRESS=your_near_address_here
SLIPPAGE=1
RPC_URL=your_rpc_url_here
NEAR_NETWORK=testnet
```

This is an example **.env** file with the required environment variables set. Please replace the placeholders with actual values for your application.

## Note

Configuration for the application is done in the **.env** file. Make sure to set all required environment variables for the application to function properly.
            # `EXECUTE_SWAP_NEAR`

Perform a token swap using Ref Finance.

## `similes`
- SWAP_TOKENS_NEAR
- TOKEN_SWAP_NEAR
- TRADE_TOKENS_NEAR
- EXCHANGE_TOKENS_NEAR

## `validate`
Check if the message is valid.

## `handler`
Perform the token swap using Ref Finance.

## `examples`
### Usage
1. User {{user1}} wants to swap 1.0 NEAR for REF:
    - User: "{{user1}}"
    - Content: 
        ```
        {
            inputTokenId: "wrap.testnet",
            outputTokenId: "ref.fakes.testnet",
            amount: "1.0",
        }
        ```
2. Agent {{user2}} initiates the token swap:
    - User: "{{user2}}"
    - Content:
        ```
        {
            text: "Swapping 1.0 NEAR for REF...",
            action: "TOKEN_SWAP",
        }
        ```
3. Agent {{user2}} confirms the successful completion of the swap:
    - User: "{{user2}}"
    - Content:
        ```
        {
            text: "Swap completed successfully! Transaction hash: ...",
        }
        ```

```markdown
# Action: SEND_NEAR

- **Name**: SEND_NEAR
- **Similes**: TRANSFER_NEAR, SEND_TOKENS, TRANSFER_TOKENS, PAY_NEAR
- **Description**: Transfer NEAR tokens to another account

## Validation
The validation logic for this action always returns true.

## Handler
The handler function executes the NEAR token transfer based on the provided content. It validates the content, performs the transfer, and returns the result via a callback function.

## Usage
- {{user1}}: "Send 1.5 NEAR to bob.testnet"
- {{user2}}: "I'll send 1.5 NEAR now..." (Action: SEND_NEAR)
- {{user2}}: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"

## Examples
### Example 1:
- User: {{user1}}
  Content: 
    text: "Send 1.5 NEAR to bob.testnet"

- Agent: {{user2}}
  Content:
    text: "I'll send 1.5 NEAR now..."
    action: "SEND_NEAR"

- Agent: {{user2}}
  Content:
    text: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"
``` 
```


            ## Provider: WalletProvider

### Description:
This provider retrieves information about a NEAR wallet account and formats it into a readable portfolio report.

### Methods:

#### `get()`

- **Description:** This method retrieves the formatted portfolio information for the NEAR wallet account.
- **Parameters:**
  - `runtime`: An instance of `IAgentRuntime` interface.
  - `_message`: Not used in this method.
  - `_state`: Not used in this method.
- **Returns:** A promise that resolves to a formatted portfolio report string or null in case of an error.
- **Usage:**
  ```typescript
    const accountId = runtime.getSetting("NEAR_ADDRESS");
    if (!accountId) {
        throw new Error("NEAR_ADDRESS not configured");
    }
    const provider = new WalletProvider(accountId);
    return await provider.getFormattedPortfolio(runtime);
  ```

### Usage Example:
```typescript
import { IAgentRuntime } from "@elizaos/core";
import { walletProvider } from "./WalletProvider";

const runtime: IAgentRuntime = // initialize the runtime object with required configurations

walletProvider.get(runtime, null, null)
    .then((portfolioReport: string | null) => {
        if (portfolioReport) {
            console.log(portfolioReport);
        } else {
            console.log("Error fetching wallet information");
        }
    })
    .catch((error: Error) => {
        console.error("Error in wallet provider:", error);
    });
```


            
            ### providers/wallet.ts

# Wallet Provider

The `wallet.ts` file contains a class `WalletProvider` that implements the Provider interface, along with methods for managing wallet functionality. It includes methods for retrieving portfolio information, connecting to the NEAR blockchain, fetching data with retry logic, and formatting portfolio data.

## Purpose of Components
- **WalletProvider:** Represents a Wallet Provider that interacts with the NEAR blockchain and manages wallet functionality.
- **Interface NearToken:** Represents a token in the NEAR protocol with various attributes.
- **Interface WalletPortfolio:** Represents a wallet portfolio including total USD value, total NEAR value, and an array of NearToken objects.

## Common Use Cases

### Connect to NEAR Blockchain
```typescript
const walletProvider = new WalletProvider();
const account = await walletProvider.connect(runtime);
```

### Fetch Portfolio Value
```typescript
const portfolio = await walletProvider.fetchPortfolioValue(runtime);
```

### Format Portfolio
```typescript
const formattedPortfolio = walletProvider.formatPortfolio(runtime, portfolio);
```

## Best Practices for Usage
- Ensure to provide the required parameters when calling methods to avoid errors.
- Use the provided interfaces `NearToken` and `WalletPortfolio` to create consistent data structures.
- Handle errors gracefully when fetching data from external APIs.
- Utilize caching mechanisms when fetching data that may be requested frequently to improve performance.

### actions/transfer.ts

# actions/transfer.ts Usage Documentation

## Purpose

The file `actions/transfer.ts` contains interfaces and functions related to transferring content and NEAR tokens within the NEAR Protocol ecosystem. It provides a way to define and check transfer content interfaces and execute transfers of NEAR tokens to recipients.

## Common Use Cases

### Checking Transfer Content

```typescript
import { isTransferContent } from './actions/transfer';

const transferContent = {
  recipient: 'recipient.near',
  amount: 10,
};

if (isTransferContent(runtime, transferContent)) {
  // Content is valid TransferContent
} else {
  // Content is not a valid TransferContent
}
```

### Transferring NEAR Tokens

```typescript
import { transferNEAR } from './actions/transfer';

const recipient = 'recipient.near';
const amount = '10';

const txHash = await transferNEAR(runtime, recipient, amount);
console.log('Transfer successful. Transaction Hash:', txHash);
```

## Best Practices for Usage

- **Define TransferContent Interface**: When creating transfer content, ensure it follows the `TransferContent` interface to maintain consistency.
- **Error Handling**: Handle errors appropriately when using `transferNEAR` function, especially when wallet credentials are not configured.
- **Input Validation**: Validate recipient address and amount before performing token transfers to prevent unexpected behavior.

By following these best practices, you can effectively transfer content and NEAR tokens while maintaining security and reliability within the NEAR Protocol ecosystem.

### environment.ts

## environment.ts

### Purpose
The `environment.ts` file contains types and functions related to the configuration of the Near blockchain environment. It provides a way to get, validate, and work with the Near configuration based on the provided runtime environment.

### Common Use Cases
#### 1. Get configuration based on environment
```typescript
import { getConfig } from './environment';

const env = 'development'; // Use the desired environment
const config = getConfig(env);
console.log(config); // Output: The configuration object based on the 'development' environment
```

#### 2. Validate and retrieve Near configuration
```typescript
import { validateNearConfig } from './environment';
import { IAgentRuntime } from './types';

const runtime: IAgentRuntime = /* provide the runtime interface */;
validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log(nearConfig); // Output: The validated Near configuration
  })
  .catch((error) => {
    console.error(error.message); // Output: Error message if validation fails
  });
```

### Best Practices for Usage
- Use the `getConfig` function to easily get the configuration based on the desired environment.
- Ensure to provide a valid runtime interface when using the `validateNearConfig` function to avoid validation errors.
- Handle promise rejections when working with asynchronous operations to manage errors effectively.
- Keep the Near configuration logic centralized in the `environment.ts` file for better maintainability and organization.

### actions/swap.ts

## actions/swap.ts

### Purpose:
The `swap.ts` file contains two functions related to token swapping:
1. `checkStorageBalance`: Asynchronously checks the storage balance of a specified account within a specified contract.
2. `swapToken`: Perform a token swap using the given input token ID, output token ID, amount, and optional slippage tolerance.

### Common Use Cases:
#### 1. Checking Storage Balance:
```typescript
const account = 'exampleAccount';
const contractId = 'exampleContract';

const isNonZeroBalance = await checkStorageBalance(account, contractId);
console.log('Storage balance is not zero:', isNonZeroBalance);
```

#### 2. Token Swap:
```typescript
const runtime = getAgentRuntime();
const inputTokenId = 'inputTokenId';
const outputTokenId = 'outputTokenId';
const amount = '10'; // amount of tokens to be swapped
const slippageTolerance = 0.01; // optional, default is 0.01

const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log('Swap transactions:', swapTransactions);
```

### Best Practices for Usage:
1. **Error Handling**: Always handle any potential errors or exceptions that may occur during the execution of these functions to ensure the reliability of your application.
   
2. **Input Validation**: Validate the input parameters before calling these functions to prevent unexpected behavior or errors. Ensure that the input token IDs, account IDs, and amounts are in the correct format and within valid ranges.

3. **Asynchronous Handling**: Since both functions return promises, make sure to handle them appropriately using `async/await` or `.then()` to ensure that the results are correctly captured and processed.

4. **Testing**: Test these functions thoroughly in a controlled environment before integrating them into a production system to avoid any unintended consequences or bugs.

5. **Documentation**: Maintain clear and updated documentation for these functions to facilitate easy understanding and usage by other developers working on the project. Include details about the input parameters, return types, and any potential side effects.
            ### providers/wallet.ts

# Wallet API Reference Documentation

## Classes

### WalletProvider

```typescript
/**
 * A class representing a Wallet Provider that implements the Provider interface.
 */
class WalletProvider {
    constructor(accountId: string);
    
    get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>;
    
    connect(runtime: IAgentRuntime): Promise<IAccount>;
    
    fetchWithRetry(url: string, options: RequestInit = {}): Promise<any>;
    
    fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>;
    
    fetchNearPrice(): Promise<number>;
    
    formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string;
    
    getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>;
}
```

## Interfaces

### NearToken

```typescript
/**
 * Interface representing a token in the NEAR protocol.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The user interface amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR protocol's native token.
 */
```

### WalletPortfolio

```typescript
/**
 * Interface representing a wallet portfolio that includes total USD value, total NEAR value,
 * and an array of NearToken objects.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total USD value in the portfolio
 * @property {string} [totalNear] - The total NEAR value in the portfolio (optional)
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing tokens in the portfolio
 */
```

## Methods

### constructor

#### Signature

`constructor(accountId: string);`

#### Description

Constructor for creating an instance of the class with a specified accountId. Initializes a NodeCache with a cache TTL of 5 minutes and an InMemoryKeyStore.

### get

#### Signature

`get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>;`

#### Description

Asynchronously retrieves the formatted portfolio for a given agent runtime.

### connect

#### Signature

`connect(runtime: IAgentRuntime): Promise<IAccount>;`

#### Description

Establishes a connection to the NEAR blockchain using the provided agent runtime.

### fetchWithRetry

#### Signature

`fetchWithRetry(url: string, options: RequestInit = {}): Promise<any>;`

#### Description

Fetches data from the specified URL with retry logic.

### fetchPortfolioValue

#### Signature

`fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>;`

#### Description

Asynchronously fetches the current value of the wallet portfolio, including the total USD value, total NEAR balance, and token details.

### fetchNearPrice

#### Signature

`fetchNearPrice(): Promise<number>;`

#### Description

Fetches the NEAR price from an external API and returns it.

### formatPortfolio

#### Signature

`formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string;`

#### Description

Formats the information of a wallet portfolio into a readable string.

### getFormattedPortfolio

#### Signature

`getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>;`

#### Description

Asynchronously fetches and formats the user's portfolio based on the provided agent runtime. 

## Code Example

```typescript
import { WalletProvider } from 'providers/wallet';
import { runtime } from 'runtime'; 

const wallet = new WalletProvider('myAccountId');

wallet.get(runtime, message)
    .then((portfolio: string | null) => {
        console.log(portfolio);
    })
    .catch((error: Error) => {
        console.error(error.message);
    });
```

This is the API reference documentation for the `providers/wallet.ts` file.

### actions/transfer.ts

# actions/transfer.ts API Reference Documentation

## Interfaces

### TransferContent
Interface for transferring content that extends the base Content interface.
- extends Content
- recipient: string (The recipient of the transfer.)
- amount: string | number (The amount to transfer.)
- tokenAddress?: string (Optional token address for native NEAR transfers.)

## Functions

### isTransferContent
Checks if the provided content is a valid TransferContent based on the recipient being a string and the amount being either a string or a number.

**Parameters:**
- runtime: IAgentRuntime (The runtime environment.)
- content: any (The content to check.)

**Returns:**
- boolean (Whether the content is a TransferContent or not.)

### transferNEAR
Transfer NEAR tokens from the current NEAR account to a recipient.

**Parameters:**
- runtime: IAgentRuntime (The runtime object containing settings and functionality.)
- recipient: string (The NEAR address of the recipient.)
- amount: string (The amount of NEAR tokens to transfer.)

**Returns:**
- Promise<string> (The transaction hash of the transfer.)

**Throws:**
- Error (If NEAR wallet credentials are not configured.)

## Example
```typescript
import { IAgentRuntime } from 'runtime';

const exampleRuntime: IAgentRuntime = {
  // Runtime settings
};

const exampleContent = {
  recipient: "exampleRecipient",
  amount: "10",
  tokenAddress: "exampleTokenAddress"
};

const isTransfer = isTransferContent(exampleRuntime, exampleContent); // Returns true or false

transferNEAR(exampleRuntime, "exampleRecipient", "10")
  .then((transactionHash) => {
    console.log("Transaction hash: ", transactionHash);
  })
  .catch((error) => {
    console.error("Error transferring NEAR tokens: ", error);
  });
```

### environment.ts

# API Reference Documentation

---

## Types

### NearConfig
- Defines the type NearConfig as the inferred type of the nearEnvSchema.

---

## Functions

### getConfig
- Get the configuration based on the environment provided or default values.
- Parameters:
  - `env` (optional): string - The environment to get the configuration for. Defaults to `ENV || process.env.NEAR_ENV || process.env.REACT_APP_REF_SDK_ENV`.
- Returns:
  - object: The configuration object based on the environment.

### validateNearConfig
- Validates and returns the Near configuration based on the provided runtime.
- Parameters:
  - `runtime`: IAgentRuntime - The runtime interface used to retrieve settings.
- Returns:
  - Promise<NearConfig>: A Promise that resolves to the validated Near configuration.
- Throws:
  - Error: Throws an error if the validation fails, with details on the validation errors.

---

## Code Examples

```typescript
// Example for getConfig function
const config = getConfig();
console.log(config);
// Output: { /* configuration object based on the default environment */ }

// Example for validateNearConfig function
const runtime = getRuntime(); // Assume a function to get the runtime
validateNearConfig(runtime)
  .then((nearConfig) => {
    console.log(nearConfig);
  })
  .catch((error) => {
    console.error(error.message);
  });
``` 

---

This is the API reference documentation for the **environment.ts** file. It includes the types, functions, and code examples to help you understand and utilize the file effectively.

### actions/swap.ts

## actions/swap.ts

### Functions

#### checkStorageBalance
Asynchronously checks the storage balance of a specified account within a specified contract.

```typescript
checkStorageBalance(account: any, contractId: string): Promise<boolean>
```

- `account`: The account for which to check the storage balance.
- `contractId`: The ID of the contract within which to check the storage balance.
- Returns a Promise that resolves to a boolean indicating whether the storage balance is not zero.

#### swapToken
Perform a token swap using the given input token ID, output token ID, amount, and optional slippage tolerance.

```typescript
swapToken(runtime: IAgentRuntime, inputTokenId: string, outputTokenId: string, amount: string, slippageTolerance: number = 0.01): Promise<any>
```

- `runtime`: The runtime object for the current agent environment.
- `inputTokenId`: The ID of the token to be swapped from.
- `outputTokenId`: The ID of the token to be swapped to.
- `amount`: The amount of tokens to be swapped.
- `slippageTolerance`: The acceptable slippage tolerance for the swap. Default value is 0.01.
- Returns a promise that resolves with an array of swap transactions.

### Interfaces and Types

#### IAgentRuntime
```typescript
interface IAgentRuntime {
  // Define properties and methods here...
}
```

### Code Examples

#### Checking Storage Balance
```typescript
const account = { address: '0x1234567890' };
const contractId = '0xabcdef1234';

checkStorageBalance(account, contractId)
  .then((hasBalance) => {
    if (hasBalance) {
      console.log('Storage balance is not zero.');
    } else {
      console.log('Storage balance is zero.');
    }
  });
```

#### Token Swap
```typescript
const runtime = { /* Provide runtime object */ };
const inputTokenId = 'tokenA';
const outputTokenId = 'tokenB';
const amount = '100';
const slippageTolerance = 0.005;

swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance)
  .then((swapTransactions) => {
    console.log('Swap successful:', swapTransactions);
  });
```
            TODO Comment: TODO: add functionality to support multiple networks
        
Context: The code currently only supports a single network (NEAR) with default settings for testnet. The functionality needs to be extended to support multiple networks with the ability to configure different network settings such as network ID, RPC URL, etc.
        
Tag: Feature
            # Troubleshooting Guide

## Common Issues and Solutions
1. **Issue:** Package dependencies not installed correctly.
   - **Solution:** Ensure all required packages are installed by running `npm install`.

2. **Issue:** Errors during NEAR blockchain connection.
   - **Solution:** Check if NEAR wallet secret key and public key are configured properly in the runtime settings.

## Error Messages and Meaning
1. **Error:** `Error fetching portfolio value`.
   - **Meaning:** There was an issue fetching the portfolio value from the NEAR blockchain.
   
2. **Error:** `Error connecting to NEAR blockchain`.
   - **Meaning:** There was an error establishing a connection to the NEAR blockchain.

## Debugging Tips
- Use console.log statements to debug the flow of the code and values of variables.
- Utilize a debugger tool to step through the code and identify the source of errors.

## Configuration Problems
- Ensure all required configuration settings, such as NEAR wallet keys, are correctly set in the runtime settings.

## Compatibility Issues
- Check for compatibility issues between different versions of packages, especially with the specified versions in the package dependencies.

## Performance Optimization
- Utilize caching mechanisms to optimize performance, such as in the `fetchPortfolioValue` method.

## FAQ Section
1. **Q:** How to handle errors in the `getFormattedPortfolio` method?
   - **A:** The method will throw an error if there is an issue fetching or formatting the portfolio.

2. **Q:** What does the `fetchNearPrice` method do?
   - **A:** The method fetches the NEAR price from an external API and returns it, handling errors and caching the price.

---

By following the troubleshooting guide and utilizing the provided tips, you should be able to resolve common issues and optimize the performance of your application. If you encounter any specific problems not addressed here, feel free to consult the documentation or reach out to the package maintainers for support.
            