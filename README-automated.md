# Plugin Documentation
## Overview and Purpose
### @elizaos/plugin-near

#### Purpose:
The @elizaos/plugin-near package is designed to provide functionality related to handling wallet operations and managing token transfers within the NEAR Protocol ecosystem.

#### Main Features and Capabilities:
1. **WalletProvider Class**: Implements the Provider interface to facilitate wallet-related operations.
2. **TransferContent Interface**: Defines the structure of a content transfer, including recipient, amount, and token address.
3. **NearToken Interface**: Represents a NEAR Protocol token with properties like name, symbol, balance, and price in USD.
4. **WalletPortfolio Interface**: Represents a wallet portfolio with total USD value, optional NEAR value, and an array of NearToken objects.

#### When and Why to Use:
- Developers looking to integrate wallet features and token management within NEAR Protocol can use this plugin.
- Used for handling transfers, managing token data, and calculating portfolio values within NEAR-based applications.

#### Key Dependencies or Requirements:
- This plugin may require familiarity with the NEAR Protocol ecosystem, including the use of tokens and wallet operations.
- It depends on the implementation of the Provider interface for wallet functionalities.

Overall, the @elizaos/plugin-near package offers a valuable toolset for developers working with wallet operations and token transfers in NEAR Protocol applications.
## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the Plugin to Your ElizaOS Project:
- Using pnpm in the monorepo workspace:
  ```bash
  pnpm add @elizaos/plugin-near
  ```
- Import syntax to use the plugin:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add the plugin to the AgentRuntime plugins array:
  ```typescript
  import { AgentRuntime } from "@elizaos/core";
  
  return new AgentRuntime({
      // other configuration...
      plugins: [
          nearPlugin,
          // other plugins...
      ],
  });
  ```

### 2. Prerequisite Configurations and Dependencies:
- Ensure that the following dependencies are installed:
  ```json
  {
    "@elizaos/core": "workspace:*",
    "@ref-finance/ref-sdk": "^1.4.6",
    "tsup": "8.3.5",
    "near-api-js": "5.0.1",
    "bignumber.js": "9.1.2",
    "node-cache": "5.1.2"
  }
  ```
- Peer dependencies required:
  ```json
  {
    "whatwg-url": "7.1.0",
    "form-data": "4.0.1"
  }
  ```

### 3. Example Integration Code:
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

### 4. Capabilities Provided by this Plugin:
- Plugin Name: NEAR
- Description: Near Protocol Plugin for Eliza
- Providers: [walletProvider]
- Actions: [executeSwap, executeTransfer]
- Evaluators: []

### 5. Verification Steps:
After following the above steps:
- Verify that the plugin is correctly added to the AgentRuntime plugins array.
- Ensure that the necessary dependencies are resolved without any errors.

Remember to adjust the configuration and setup according to your specific project requirements.
## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`
   - Purpose: Specifies the environment for the NEAR protocol.
   - Example Value: `development`

2. `REACT_APP_REF_SDK_ENV`
   - Purpose: Specifies the environment for the REACT SDK.
   - Example Value: `production`

3. `NEAR_WALLET_SECRET_KEY`
   - Purpose: Secret key for the NEAR wallet.
   - Example Value: `xxxxxxxxxxxxxxxxxxxx`

4. `NEAR_WALLET_PUBLIC_KEY`
   - Purpose: Public key for the NEAR wallet.
   - Example Value: `yyyyyyyyyyyyyyyyyyyy`

5. `NEAR_ADDRESS`
   - Purpose: NEAR address for the wallet.
   - Example Value: `mywallet.near`

6. `SLIPPAGE`
   - Purpose: Slippage setting for transactions.
   - Example Value: `0.05`

7. `RPC_URL`
   - Purpose: URL for the RPC endpoint.
   - Example Value: `https://rpc.testnet.near.org`

8. `NEAR_NETWORK`
   - Purpose: Specifies the NEAR network to connect to.
   - Example Value: `mainnet`

## Instruction for Configuration

- Configure the environment variables in the `.env` file.
- Ensure to add the `.env` file to the `.gitignore` to prevent it from being committed to the repository.
## Usage Examples
## Basic Usage Example

1. Create a new instance of the WalletProvider class:

```javascript
const walletProvider = new WalletProvider("myAccountId");
```

2. Fetch the NEAR price from an external API:

```javascript
walletProvider.fetchNearPrice()
  .then((price) => {
    console.log("NEAR price in USD: ", price);
  })
  .catch((error) => {
    console.error("Error fetching NEAR price: ", error);
  });
```

## Common Use Cases

### Fetch Portfolio Value and Format

```javascript
walletProvider.get(runtime)
  .then((portfolioData) => {
    return walletProvider.formatPortfolio(runtime, portfolioData);
  })
  .then((formattedPortfolio) => {
    console.log("Formatted Portfolio: ", formattedPortfolio);
  })
  .catch((error) => {
    console.error("Error fetching or formatting portfolio: ", error);
  });
```

### Fetch Portfolio Value with Retry Logic

```javascript
walletProvider.fetchWithRetry("https://example.com/portfolio")
  .then((portfolioData) => {
    console.log("Fetched Portfolio data: ", portfolioData);
  })
  .catch((error) => {
    console.error("Error fetching portfolio data: ", error);
  });
```
## API Reference
# WalletProvider Class

## Description
WalletProvider class that implements the Provider interface to handle wallet related operations.

### Methods

#### constructor
Constructor for creating a new instance of a class, with the provided accountId as a parameter. Initializes a NodeCache with a cache timeout of 5 minutes and an InMemoryKeyStore for key storage.

```javascript
/**
 * @param {string} accountId - The unique identifier for the account.
 */
constructor(accountId)
```

#### get
Asynchronously retrieves the formatted portfolio from the IAgentRuntime.

```javascript
/**
 * @param {IAgentRuntime} runtime - The IAgentRuntime object.
 * @param {Memory} _message - The Memory object, not used in this method.
 * @param {State} [_state] - Optional State object.
 * @returns {Promise<string | null>} The formatted portfolio as a string, or null if an error occurs.
 */
get(runtime, _message, _state)
```

#### connect
Establishes a connection to the NEAR blockchain using the provided runtime.

```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime to use for retrieving settings and connecting to NEAR.
 * @returns {Promise<any>} The NEAR account that has been connected.
 */
connect(runtime)
```

#### fetchWithRetry
Fetches data from a URL with retry logic in case of failures.

```javascript
/**
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} A promise that resolves with the fetched data, or rejects with an error if all retry attempts fail.
 */
fetchWithRetry(url, options)
```

#### fetchPortfolioValue
Fetches the current value of the portfolio by getting the account balance and converting it to USD.

```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime for fetching the account balance.
 * @returns {Promise<WalletPortfolio>} The object representing the wallet portfolio with total USD value, total NEAR amount, and token details.
 */
fetchPortfolioValue(runtime)
```

#### fetchNearPrice
Fetches the NEAR price from an external API and stores it in cache for future use.

```javascript
/**
 * @returns {Promise<number>} The NEAR price in USD.
 */
fetchNearPrice()

#### formatPortfolio
Formats the provided wallet portfolio data into a human-readable string representation.

```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime information of the agent.
 * @param {WalletPortfolio} portfolio - The wallet portfolio data to be formatted.
 * @returns {string} The formatted string representing the wallet portfolio data.
 */
formatPortfolio(runtime, portfolio)
```

#### getFormattedPortfolio
Asynchronously retrieves the portfolio value for a given runtime and formats it as a string.

```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime to use for fetching portfolio data.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value as a string.
 */
getFormattedPortfolio(runtime)
```

# Interfaces

## TransferContent
Represents the structure of a content transfer.

```javascript
/**
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount being transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
interface TransferContent
```

## NearToken
Interface representing a NEAR Protocol token.

```javascript
/**
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals the token uses.
 * @property {string} balance - The token balance.
 * @property {string} uiAmount - The user-interface friendly amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol (optional).
 */
interface NearToken

## WalletPortfolio
Interface representing a wallet portfolio.

```javascript
/**
 * @property {string} totalUsd - The total USD value in the wallet portfolio.
 * @property {string} [totalNear] - Optional: The total NEAR value in the wallet portfolio.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing tokens in the wallet portfolio.
 */
interface WalletPortfolio

# Types

## NearConfig
Type definition for the configuration object extracted from the nearEnvSchema

```javascript
/**
 * @typedef {z.infer<typeof nearEnvSchema>} NearConfig
 */
```

## Example Usage

```javascript
const walletProvider = new WalletProvider('myAccountId');
const runtime = new IAgentRuntime();

walletProvider.connect(runtime).then((nearAccount) => {
    console.log(`Connected to NEAR account: ${nearAccount}`);
});

walletProvider.getFormattedPortfolio(runtime).then((formattedPortfolio) => {
    console.log(`Wallet Portfolio: ${formattedPortfolio}`);
});
```
## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common Issues and Their Solutions

1. **Dependency Installation Issue**: If you encounter issues with package dependencies not being installed correctly, try running the following command to install all dependencies mentioned in the package.json file:
   
   ```bash
   npm install
   ```

2. **Runtime Error**: If you face runtime errors while executing methods like `connect` or `fetchWithRetry`, check if the required parameters are correctly passed and if all necessary configurations are set up.

## Error Messages and Their Meaning

1. **Null Return Value**: If a method returns `null`, it indicates that an error occurred during execution. You should review the code logic of the method to identify and resolve the underlying issue.

2. **Missing Key Pair Error**: If an error is thrown regarding missing key pair during the `connect` method, ensure that both the secret key and public key are properly set in the runtime settings.

## Debugging Tips

1. **Console Logging**: Use `console.log()` statements strategically throughout your code to track the flow of data and identify any unexpected behavior.

2. **Debugger**: Consider using a debugger tool like Node.js debugger or Chrome DevTools to step through your code and pinpoint the source of errors.

## Configuration Problems

1. **Missing Configuration Settings**: If you encounter configuration-related issues, double-check all configuration settings in the runtime object to ensure they are correctly set.

2. **Invalid Configuration Parameters**: Make sure that all configuration parameters passed to methods like `connect` are valid and in the correct format.

## Compatibility Issues

1. **Version Compatibility**: Ensure that the versions of the packages mentioned in the package.json file are compatible with each other to prevent conflicts and compatibility issues.

2. **Platform Compatibility**: Verify that the code is compatible with the platform or environment where it is being executed, especially when working with blockchain-related functionalities.

## Performance Optimization

1. **Code Refactoring**: Review your code for any inefficiencies or redundant logic that can be optimized to improve performance.

2. **Use of Caching**: Consider implementing caching mechanisms like `node-cache` to store and retrieve data efficiently, especially in methods like `fetchWithRetry`.

## FAQ 

1. **Q: What should I do if I encounter a `Promise rejection` error?**
   - A: Check your code for any unhandled promise rejections or async errors and make sure to handle them properly using `try...catch` blocks or `.catch()` methods on promises.

2. **Q: How can I improve error handling in my methods?**
   - A: Utilize `try...catch` blocks and proper error messages in your methods to provide informative feedback and handle exceptions effectively.

3. **Q: Should I handle retries in the `fetchWithRetry` method?**
   - A: Yes, it is recommended to implement retry logic in the `fetchWithRetry` method to handle temporary network failures or timeouts.

By following these troubleshooting tips and best practices, you can effectively debug and resolve issues in your codebase related to package dependencies, error handling, configuration problems, compatibility, and performance optimization.
## TODO Items
TODO Comment: TODO: add functionality to support multiple networks

Context: Currently, the codebase only supports a single network specified in the NEAR_NETWORK setting. To add functionality to support multiple networks, the code needs to be modified to allow for dynamic network selection based on user input or configuration.

Tag: Feature
