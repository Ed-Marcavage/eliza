# Plugin Documentation
## Overview and Purpose
# @elizaos/plugin-near

## Package Overview
The package `@elizaos/plugin-near` is designed to provide functionality for connecting to a wallet, fetching portfolio values, and formatting the portfolio in projects utilizing the NEAR Protocol.

## Main Features
1. **WalletProvider**
   - Represents a wallet provider implementing the Provider interface.
   - Provides methods for connecting to a wallet, fetching portfolio values, and formatting the portfolio.

2. **Key Interfaces**
   - **TransferContent**
     - Represents the transfer of content with recipient, amount, and optional token address.
   - **NearToken**
     - Represents a NEAR Protocol token with properties like name, symbol, balance, price, and value in USD and NEAR.
   - **WalletPortfolio**
     - Represents a wallet portfolio with a total value in USD, total value in NEAR (optional), and an array of NearToken objects.

The `@elizaos/plugin-near` package facilitates interactions with NEAR Protocol wallets, token transfers, and portfolio management through the defined classes and interfaces.
## Installation
## Installation Instructions

### 1. Adding the Plugin to Your ElizaOS Project:
1. Add the following to your agent/package.json dependencies:
```json
{
  "dependencies": {
    "@elizaos/plugin-near": "workspace:*"
  }
}
```
2. Navigate to the agent/ directory in your project.
3. Run `pnpm install` to install the new plugin dependency.
4. Run `pnpm build` to build the project with the new plugin.

### 2. Importing and Using the Plugin:
- To import the plugin, use: 
```typescript
import { nearPlugin } from "@elizaos/plugin-near";
```
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
1. Ensure that the plugin has been successfully added to your project's dependencies.
2. Verify that the plugin is imported and added to the plugins array in your AgentRuntime configuration.
3. Build and run your ElizaOS project to ensure that the near plugin is functioning as expected.

By following these installation and integration instructions, you should be able to successfully add and use the @elizaos/plugin-near plugin in your ElizaOS project.
## Configuration
# Configuration Documentation

### Required Environment Variables
1. `NEAR_ENV`: Specifies the environment for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Specifies the environment for the React SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the application.
6. `SLIPPAGE`: Slippage setting for the application.
7. `RPC_URL`: RPC URL for the application.
8. `NEAR_NETWORK`: Network ID for the NEAR protocol.

### Purpose of Environment Variables
1. `NEAR_ENV`: Determine environment for NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Determine environment for React SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet authentication.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet authentication.
5. `NEAR_ADDRESS`: NEAR address for the application.
6. `SLIPPAGE`: Slippage setting for the application.
7. `RPC_URL`: RPC URL for the application.
8. `NEAR_NETWORK`: Network ID for the NEAR protocol.

### Example .env File
```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=mySecretKey
NEAR_WALLET_PUBLIC_KEY=myPublicKey
NEAR_ADDRESS=example.near
SLIPPAGE=2
RPC_URL=https://example.com/rpc
NEAR_NETWORK=testnet
```

Please ensure that the `.env` file is set in the `.gitignore` file to prevent the exposure of sensitive information. Configuration settings can be adjusted in the `.env` file.
## Usage Examples
# Wallet Provider API

## Classes
### undefined
A class representing a wallet provider that implements the Provider interface.

#### Methods:
1. **constructor(accountId)**
   - Constructor for a new instance of AccountCache.
   ```javascript
   const walletProvider = new undefined("myAccountId");
   ```

### Methods
1. **get(runtime, _message, _state)**
   - Asynchronously retrieves a formatted portfolio for the given agent runtime.
   ```javascript
   const formattedPortfolio = await walletProvider.get(myAgentRuntime, myMemoryObject, myState);
   ```

2. **connect(runtime)**
   - Connects to NEAR network using the provided account credentials.
   ```javascript
   const connectedAccount = await walletProvider.connect(myAgentRuntime);
   ```

3. **fetchWithRetry(url, options)**
   - Fetches data from a specified URL with retries in case of failure.
   ```javascript
   const fetchedData = await walletProvider.fetchWithRetry("https://example.com/data", {});
   ```

4. **fetchPortfolioValue(runtime)**
   - Fetches the current value of the portfolio by connecting to the account, retrieving the balance, converting to NEAR, fetching the NEAR price in USD, and calculating the total USD value of the portfolio.
   ```javascript
   const portfolioValue = await walletProvider.fetchPortfolioValue(myAgentRuntime);
   ```

5. **fetchNearPrice()**
   - Fetches the current price of NEAR token in USD from the Coingecko API with caching mechanism.
   ```javascript
   const nearPrice = await walletProvider.fetchNearPrice();
   ```

6. **formatPortfolio(runtime, portfolio)**
   - Formats the portfolio information into a string with various details such as account ID, total value, token balances, and market prices.
   ```javascript
   const formattedPortfolio = walletProvider.formatPortfolio(myAgentRuntime, myPortfolio);
   ```

7. **getFormattedPortfolio(runtime)**
   - Asynchronously fetches the portfolio value using the given runtime and returns a formatted summary.
   ```javascript
   const formattedSummary = await walletProvider.getFormattedPortfolio(myAgentRuntime);
   ```
## API Reference
# WalletProvider Class

A class representing a wallet provider that implements the Provider interface. Provides methods for connecting to a wallet, fetching portfolio values, and formatting the portfolio.

## Methods

### Constructor
```javascript
/**
 * Constructor for a new instance of AccountCache.
 * 
 * @param {string} accountId - The ID of the account.
 */
```

### get
```javascript
/**
 * Asynchronously retrieves a formatted portfolio for the given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to fetch the formatted portfolio for.
 * @param {Memory} _message - The memory object.
 * @param {State} [_state] - Optional state information.
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio or null if an error occurs.
 */
```

### connect
```javascript
/**
 * Connects to NEAR network using the provided account credentials.
 * 
 * @param {IAgentRuntime} runtime - The runtime object containing NEAR wallet secret and public keys.
 * @returns {Promise<any>} The connected NEAR account.
 * @throws {Error} Throws an error if NEAR wallet credentials are not configured.
 */
```

### fetchWithRetry
```javascript
/**
 * Fetches data from a specified URL with retries in case of failure.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - The options for the fetch request (default: {}).
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

### fetchPortfolioValue
```javascript
/**
 * Fetches the current value of the portfolio by connecting to the account, retrieving the balance,
 * converting yoctoNEAR to NEAR, fetching the NEAR price in USD,
 * and calculating the total USD value of the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to use for connectivity
 * @returns {Promise<WalletPortfolio>} The portfolio object containing total USD value, total NEAR balance,
 * and tokens with details such as name, symbol, balance, price in USD, and value in USD
 * @throws {Error} If an error occurs during fetching the portfolio
 */
```

### fetchNearPrice
```javascript
/**
 * Fetches the current price of NEAR token in USD from the Coingecko API with caching mechanism.
 * If the price is available in cache, it returns the cached price, otherwise fetches the price from the API.
 * @returns {Promise<number>} The current price of NEAR token in USD.
 */
```

### formatPortfolio
```javascript
/**
 * Formats the portfolio information into a string with various details such as account ID, total value, token balances, and market prices.
 * 
 * @param {IAgentRuntime} runtime - The runtime interface for the agent.
 * @param {WalletPortfolio} portfolio - The portfolio object containing the wallet information.
 * @returns {string} Returns a formatted string with the portfolio information.
 */
```

### getFormattedPortfolio
```javascript
/**
 * Asynchronously fetches the portfolio value using the given runtime and returns a formatted summary.
 * 
 * @param {IAgentRuntime} runtime - The runtime object that contains necessary information for fetching portfolio.
 * @returns {Promise<string>} A promise that resolves to a string representing the formatted portfolio summary.
 */
```

# Interfaces

## TransferContent
```javascript
/**
 * Interface representing the transfer of content with recipient, amount and optional token address.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - The optional token address for native NEAR transfers.
 */
```

## NearToken
```javascript
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places the token supports.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token in a user-friendly format.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The optional value of the token in NEAR Protocol's native token.
 */
```

## WalletPortfolio
```javascript
/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the portfolio.
 */
```

# Types

## NearConfig
```javascript
/**
 * Type definition for NearConfig based on the schema nearEnvSchema
 */
```

This comprehensive API documentation provides detailed descriptions, method signatures, parameters, return types, interface definitions, and type definitions for the WalletProvider class and related interfaces. Use this reference guide to effectively integrate wallet functionality into your application.
## TODO Items
TODO Comment: TODO: add functionality to support multiple networks

Context: Currently, the swapToken function only supports one network (testnet). This TODO item requires adding functionality to support multiple networks, allowing users to connect to different networks for token swaps.

Tag: Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

## 1. Common issues and their solutions
- **Issue:** NEAR wallet credentials not configured
  - **Solution:** Make sure to provide the correct NEAR wallet secret and public keys when connecting to the NEAR network.

## 2. Error messages and their meanings
- **Error:** `Error: NEAR wallet credentials are not configured`
  - **Meaning:** This error occurs when the NEAR wallet credentials are missing or incorrect.
  
## 3. Debugging tips
- When debugging, try to console.log relevant variables at different stages of the methods to identify where the error is occurring.
- Use a debugger to step through the code and track the flow of execution.

## 4. Configuration problems
- Ensure that all required package dependencies are installed correctly and are up to date.
- Double-check NEAR wallet credentials and ensure they are correctly configured.

## 5. Compatibility issues
- Make sure that all packages and dependencies are compatible with each other.
- Check for any compatibility issues with the versions of Node.js being used.

## 6. Performance optimization
- Consider implementing caching mechanisms to improve performance, especially when fetching portfolio values frequently.
- Optimize API calls and data processing to reduce latency and improve response times.

## 7. FAQ section
- **Q:** How can I resolve package dependency conflicts?
  - **A:** You can try updating the conflicting packages to compatible versions or manually resolving the dependencies in the package.json file.
  
- **Q:** What should I do if I encounter a "Cannot read property 'X' of undefined" error?
  - **A:** Check if the variable 'X' is properly initialized before its usage, as this error typically occurs when trying to access a property of an undefined variable.

---

By following the troubleshooting guide and implementing the suggested solutions, you can effectively address issues related to package dependencies, error handling in methods, configuration problems, compatibility issues, performance optimization, and more.
