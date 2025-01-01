
# Plugin Documentation
## Overview and Purpose
# @elizaos/plugin-near

### Purpose:
The purpose of this plugin is to provide functionalities for interacting with a NEAR wallet, fetching portfolio value, and formatting portfolio information.

### Main Features:
- **WalletProvider class:** This class represents a Wallet Provider that implements the Provider interface, allowing users to interact with a NEAR wallet, fetch portfolio value, and format portfolio information.
- **Key interfaces:**
  - **TransferContent:** Represents the content of a transfer, including recipient, amount, and token address for native NEAR transfers.
  - **NearToken:** Represents a token in the NEAR Protocol ecosystem, providing information such as name, symbol, balance, price in USD, and value in NEAR tokens.
  - **WalletPortfolio:** Represents a wallet portfolio, including total amount in USD, total amount in NEAR (if available), and an array of NearToken objects for different tokens.
## Installation
### Installation and Integration Instructions for @elizaos/plugin-near

#### Adding the Plugin to Your ElizaOS Project:
1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. cd into the agent/ directory
3. Run `pnpm install` to install the new dependency
4. Run `pnpm build` to build the project with the new plugin

#### Importing and Using the Plugin:
- Import syntax:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add it to the AgentRuntime plugins array:
  ```typescript
  new AgentRuntime({
      // other configuration...
      plugins: [
          nearPlugin,
          // other plugins...
      ],
  });
  ```

#### Integration Example:
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

#### Verification Steps:
Ensure successful integration by checking for the following in the console:
- ["✓ Registering action: <plugin actions>"]

Make sure to follow the installation and integration steps carefully to successfully incorporate the Near Protocol Plugin for Eliza into your ElizaOS project.
## Configuration
# Configuration Documentation

To configure the application, please set the following environment variables in a `.env` file:

```plaintext
NEAR_ENV=
REACT_APP_REF_SDK_ENV=
NEAR_WALLET_SECRET_KEY=
NEAR_WALLET_PUBLIC_KEY=
NEAR_ADDRESS=
SLIPPAGE=
RPC_URL=
NEAR_NETWORK=
```

## Environment Variables and Their Purpose

1. `NEAR_ENV`: Used to specify the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used for SDK environment configuration.
3. `NEAR_WALLET_SECRET_KEY`: Contains the secret key for NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Contains the public key for NEAR wallet.
5. `NEAR_ADDRESS`: Specifies the NEAR address.
6. `SLIPPAGE`: Used to set the slippage ratio.
7. `RPC_URL`: Specifies the RPC URL.
8. `NEAR_NETWORK`: Sets the NEAR network.

## Note:
Please ensure that the `.env` file is added to the `.gitignore` to prevent it from being committed to the repository. This will help to keep sensitive information secure.

If you need more information on specific endpoints or URLs, refer to the provided code snippets.
## Actions

## Providers

## Evaluators

## Usage Examples
# Usage Documentation for Wallet Provider Class

### Classes:

#### Wallet Provider:
A class representing a Wallet Provider that implements the Provider interface. Provides functionalities to interact with a NEAR wallet, fetch portfolio value, and format portfolio information.

```javascript
/**
 * A class representing a Wallet Provider that implements the Provider interface.
 * Provides functionalities to interact with a NEAR wallet, fetch portfolio value, and format portfolio information.
 * @implements {Provider}
 */
class WalletProvider {
   // Class implementation goes here
}
```

### Methods:

#### constructor:
Constructor for creating an instance of the class.

```javascript
/**
 * Constructor for creating an instance of the class.
 * @param {string} accountId - The unique identifier for the account associated with the instance.
 */
```

#### get:
Asynchronously retrieves the formatted portfolio using the provided IAgentRuntime.

```javascript
/**
 * Asynchronously retrieves the formatted portfolio using the provided IAgentRuntime.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime to use for retrieving the portfolio.
 * @param {Memory} _message - The message object.
 * @param {State} [_state] - The optional state object.
 * @returns {Promise<string | null>} A Promise that resolves with the formatted portfolio or null if an error occurs.
 */
```

#### connect:
Connects to NEAR blockchain using the provided runtime and sets up the account with the necessary credentials.

```javascript
/**
 * Connects to NEAR blockchain using the provided runtime and sets up the account with the necessary credentials.
 * @param {IAgentRuntime} runtime - The runtime object that provides access to settings and other runtime functionalities.
 * @returns {Promise<Account>} - A promise that resolves to the connected NEAR account object.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

#### fetchWithRetry:
Fetches data from a specified URL with the option to retry multiple times if the request fails.

```javascript
/**
 * Fetches data from a specified URL with the option to retry multiple times if the request fails.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options to include in the fetch request.
 * @returns {Promise<any>} The response data from the fetch request.
 */
```

#### fetchPortfolioValue:
Asynchronously fetches the current portfolio value for the user's account.

```javascript
/**
 * Asynchronously fetches the current portfolio value for the user's account.
 * If the value is already present in the cache, it will return the cached value.
 *
 * @param {IAgentRuntime} runtime - The Agent Runtime interface.
 * @returns {Promise<WalletPortfolio>} The portfolio containing the total USD value, total NEAR balance,
 * and an array of tokens with their respective details.
 */
```

#### fetchNearPrice:
Fetches the near price from a specified API endpoint with a retry mechanism.

```javascript
/**
 * Fetches the near price from a specified API endpoint with a retry mechanism.
 * Uses caching to store and retrieve the price.
 * 
 * @returns {Promise<number>} The near price in USD.
 */
```

#### formatPortfolio:
Formats the given WalletPortfolio data into a readable string output.

```javascript
/**
 * Formats the given WalletPortfolio data into a readable string output.
 * 
 * @param {IAgentRuntime} runtime - The information about the agent runtime.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted portfolio data as a string.
 */
```

#### getFormattedPortfolio:
Asynchronously retrieves and formats the portfolio of the user.

```javascript
/**
 * Asynchronously retrieves and formats the portfolio of the user.
 * 
 * @param {IAgentRuntime} runtime - The runtime object for accessing agent specific functionality.
 * @returns {Promise<string>} A promise that resolves to a string representing the formatted portfolio.
 */
```

### Create:

1. **Basic Usage Example:**
```javascript
const walletProvider = new WalletProvider('exampleAccountId');

const runtime = new IAgentRuntime();
const formattedPortfolio = await walletProvider.getFormattedPortfolio(runtime);

console.log(formattedPortfolio);
```

2. **Modifying and Extending Functionality:**
The Wallet Provider class can be extended by adding new methods for interacting with different blockchain networks or by enhancing existing functionalities like caching mechanisms or data processing algorithms.

```javascript
class ExtendedWalletProvider extends WalletProvider {
   // New methods and functionalities can be added here
}
```

3. **Customizing Actions, Providers, and Evaluators:**
Actions, providers, and evaluators can be customized by extending the existing classes and overriding their methods to tailor them to specific use cases.

```javascript
class CustomWalletProvider extends WalletProvider {
   // Override existing methods or add new methods for custom functionality
}

const customProvider = new CustomWalletProvider('customAccountId');
```

By following these guidelines and examples, developers can effectively utilize, modify, and extend the functionality of the Wallet Provider class for various applications and use cases.
## API Reference
# API Reference Documentation

## Classes

### WalletProvider
A class representing a Wallet Provider that implements the Provider interface. Provides functionalities to interact with a NEAR wallet, fetch portfolio value, and format portfolio information.

#### Methods
#### constructor
Constructor for creating an instance of the class.
```javascript
/**
 * @param {string} accountId - The unique identifier for the account associated with the instance.
 */
```

#### get
Asynchronously retrieves the formatted portfolio using the provided IAgentRuntime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The IAgentRuntime to use for retrieving the portfolio.
 * @param {Memory} _message - The message object.
 * @param {State} [_state] - The optional state object.
 * @returns {Promise<string | null>} A Promise that resolves with the formatted portfolio or null if an error occurs.
 */
```

#### connect
Connects to NEAR blockchain using the provided runtime and sets up the account with the necessary credentials.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime object that provides access to settings and other runtime functionalities.
 * @returns {Promise<Account>} - A promise that resolves to the connected NEAR account object.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
```

#### fetchWithRetry
Fetches data from a specified URL with the option to retry multiple times if the request fails.
```javascript
/**
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options to include in the fetch request.
 * @returns {Promise<any>} The response data from the fetch request.
 */
```

#### fetchPortfolioValue
Asynchronously fetches the current portfolio value for the user's account.
```javascript
/**
 * @param {IAgentRuntime} runtime - The Agent Runtime interface.
 * @returns {Promise<WalletPortfolio>} The portfolio containing the total USD value, total NEAR balance,
 * and an array of tokens with their respective details.
 */
```

#### fetchNearPrice
Fetches the near price from a specified API endpoint with a retry mechanism.
```javascript
/**
 * @returns {Promise<number>} The near price in USD.
 */
```

#### formatPortfolio
Formats the given WalletPortfolio data into a readable string output.
```javascript
/**
 * @param {IAgentRuntime} runtime - The information about the agent runtime.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted portfolio data as a string.
 */
```

#### getFormattedPortfolio
Asynchronously retrieves and formats the portfolio of the user.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime object for accessing agent specific functionality.
 * @returns {Promise<string>} A promise that resolves to a string representing the formatted portfolio.
 */
```

## Interfaces

### TransferContent
Interface representing the content of a transfer.
```javascript
/**
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional. The token address for native NEAR transfers.
 */
```

### NearToken
Interface representing a token in the NEAR Protocol ecosystem.
```javascript
/**
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The user interface amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The optional value of the token in NEAR Protocol tokens.
 */
```

### WalletPortfolio
Interface representing a wallet portfolio.
```javascript
/**
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total amount in USD.
 * @property {string} [totalNear] - The total amount in NEAR (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens.
 */
```

## Types

### NearConfig
Represents the configuration options for connecting to a NEAR Protocol server.

## Examples
```javascript
const walletProvider = new WalletProvider("myAccountId");

walletProvider.connect(runtime)
  .then(account => {
    console.log(`Connected to NEAR account: ${account}`);
    return walletProvider.fetchPortfolioValue(runtime);
  })
  .then(portfolio => {
    console.log(walletProvider.formatPortfolio(runtime, portfolio));
  })
  .catch(error => console.error(error));
``` 

This comprehensive API reference documentation provides detailed information about the classes, methods, interfaces, and types available in the WalletProvider API. Use this reference to integrate and work with the NEAR Protocol wallet functionalities effectively.
## TODO Items
**TODO: add functionality to support multiple networks**

**Context:** The current implementation only supports a single network (defined by NEAR_NETWORK and RPC_URL settings). To enhance the flexibility of the application, functionality should be added to support multiple networks. This would allow users to easily switch between different networks without modifying the code.

**Tag:** Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide for Package Dependencies and Error Handling

## Common Issues and Solutions:
1. **Issue:** Dependency version conflicts causing installation errors.
   **Solution:** Update or downgrade the package versions in the `package.json` file to resolve conflicts.

2. **Issue:** Error handling not implemented properly in methods.
   **Solution:** Make sure to handle errors using `try/catch` blocks and throw specific errors when necessary.

## Error Messages and Their Meanings:
1. **Error Message:** `Error: NEAR wallet credentials are not configured.`
   **Meaning:** The method `connect` requires NEAR wallet credentials to be configured.
  
## Debugging Tips:
- Utilize `console.log` statements to track the flow of execution and identify the source of errors.
- Consider using debugging tools like `node-inspect` to step through the code and pinpoint issues.

## Configuration Problems:
- Check if all necessary configuration settings (e.g., NEAR wallet credentials) are properly set up in the environment.

## Compatibility Issues:
Ensure that the versions of the packages in the `package.json` file are compatible with each other and with the runtime environment.

## Performance Optimization:
- Use asynchronous programming techniques to improve performance, especially in methods that involve network requests.
- Cache frequently used data to reduce unnecessary requests and improve response times.

## FAQ Section:
### Q: How to handle errors when using the `get` method?
A: You can handle errors by wrapping the method call in a `try/catch` block and returning the error message if an exception occurs.

### Q: Why am I getting a `TypeError: Cannot read property 'runtime' of undefined` error?
A: This error occurs when the `runtime` object is not properly passed to the method. Make sure to pass the correct arguments when calling the method.

### Q: How to optimize performance when connecting to the NEAR blockchain?
A: Consider using connection pooling or optimizing network requests to reduce latency and improve performance.

---

By following these troubleshooting steps and best practices, you can effectively address package dependencies and error handling issues in your project.
