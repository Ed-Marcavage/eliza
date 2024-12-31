# Plugin Documentation
## Overview and Purpose
## Plugin Overview: @elizaos/plugin-near

### 1. Purpose:
The purpose of the @elizaos/plugin-near package is to provide a set of classes and interfaces for interacting with NEAR Protocol tokens within a wallet environment. It aims to simplify the management and transfer of NEAR tokens by offering a structured approach through key interfaces and classes.

### 2. Main Features:
- **WalletProvider Class:** Represents a WalletProvider that implements the Provider interface for handling wallet interactions.
- **Key Interfaces:**
    - **TransferContent:** An interface defining the transfer of content, including recipient, amount, and optional token address for native NEAR transfers.
    - **NearToken:** An interface representing a NEAR Protocol token with properties such as name, symbol, balance, and price information.
    - **WalletPortfolio:** An interface representing a wallet portfolio with total USD and NEAR values, along with an array of NearToken objects for token management.
## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the Plugin to Your ElizaOS Project:

To add the near plugin to your ElizaOS project, follow these steps:

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

### 2. Importing and Using the Plugin:

After installation, import and use the near plugin in your project:

```typescript
import { nearPlugin } from "@elizaos/plugin-near";

// Add the plugin to the AgentRuntime plugins array.
return new AgentRuntime({
    // other configuration...
    plugins: [
        nearPlugin,
        // other plugins...
    ],
});
```

### 3. Integration Example:

Here is a complete setup example for integrating the near plugin into your ElizaOS project:

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

To ensure successful integration, follow these verification steps:

1. Check that the near plugin is correctly added to the AgentRuntime plugins array.
2. Verify that the plugin functions as expected during runtime.
3. Check for any console errors or warnings related to the plugin integration.

By following these installation and integration instructions, you should be able to successfully integrate the @elizaos/plugin-near plugin into your ElizaOS project.
## Configuration
# Configuration Documentation

### Required Environment Variables and Their Purpose
1. `NEAR_ENV`:
   - Used to specify the environment for the NEAR protocol.
   
2. `REACT_APP_REF_SDK_ENV`:
   - Used to specify the environment for the React application.
   
3. `NEAR_WALLET_SECRET_KEY`:
   - Contains the secret key for the NEAR wallet.
   
4. `NEAR_WALLET_PUBLIC_KEY`:
   - Contains the public key for the NEAR wallet.
   
5. `NEAR_ADDRESS`:
   - Contains the NEAR address.
   
6. `SLIPPAGE`:
   - Contains the slippage setting.
   
7. `RPC_URL`:
   - Contains the RPC URL.
   
8. `NEAR_NETWORK`:
   - Contains the NEAR network ID.
   

### Sample .env File
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

### Note
- Please ensure all required environment variables are set in the `.env` file.
- Include the `.env` file in the `.gitignore` to prevent it from being committed to the repository.
## Usage Examples
# WalletProvider Class

A class representing a WalletProvider that implements the Provider interface.

## Methods

### constructor(accountId: string)

Creates a new instance of the class.

- `accountId` - The account ID associated with the instance.

### get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>

Asynchronously retrieves a formatted portfolio using the provided IAgentRuntime.

- `runtime` - The IAgentRuntime used to retrieve the formatted portfolio.
- `_message` - The message object, not actively used in this method.
- `_state` - An optional parameter representing the state. Defaults to undefined.

Returns a Promise that resolves with the formatted portfolio string, or null if there was an error.

### connect(runtime: IAgentRuntime): Promise<any>

Connects to a NEAR wallet using the provided runtime instance and returns the account object.
If the account is already connected, returns the existing account object.
Throws an error if NEAR wallet credentials are not properly configured.

- `runtime` - The runtime instance to use for retrieving wallet settings.

Returns a Promise resolving to the NEAR account object.

### fetchWithRetry(url: string, options?: RequestInit): Promise<any>

Fetches data from a specified URL with retry logic.

- `url` - The URL to fetch data from.
- `options` - Additional options for the request. Defaults to an empty object.

Returns a Promise resolving with the fetched data.

### fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>

Fetches the current value of the wallet portfolio by retrieving the account balance, converting the NEAR balance to USD, fetching the NEAR price in USD, and calculating the total portfolio value in USD. Caches the portfolio value for subsequent requests.

- `runtime` - The Agent runtime to use for retrieving account information.

Returns a Promise resolving to the current wallet portfolio value including total USD value, total NEAR balance, and token details. Throws an Error if there is an error fetching the portfolio value.

### fetchNearPrice(): Promise<number>

Fetches the current NEAR price from the API and returns it.
If a cached price is available, it is returned to avoid redundant API calls.

Returns a Promise resolving to the current NEAR price in USD.

### formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string

Formats the portfolio information into a user-friendly string.

- `runtime` - The runtime information of the agent.
- `portfolio` - The portfolio object containing wallet data.

Returns a string representing the formatted portfolio information.

### getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>

Asynchronously retrieves the portfolio value using the provided agent runtime.

- `runtime` - The agent runtime to utilize for fetching the portfolio value.

Returns a Promise resolving to a string representing the formatted portfolio.

## Create

Here is a basic usage example of how to use the WalletProvider class:

```javascript
const walletProvider = new WalletProvider("exampleAccountId");

walletProvider.connect(runtime)
  .then(account => walletProvider.fetchPortfolioValue(runtime))
  .then(portfolio => {
    console.log(walletProvider.formatPortfolio(runtime, portfolio));
  })
  .catch(error => {
    console.error("Error:", error);
  });
```

This example demonstrates creating an instance of the WalletProvider class, connecting to a NEAR wallet, fetching the portfolio value, and formatting the portfolio information for display.
## API Reference
# API Reference

## Classes

### WalletProvider
A class representing a WalletProvider that implements Provider interface.

#### Methods

##### constructor
Creates a new instance of the class.
```javascript
/**
 * @param {string} accountId - The account ID associated with the instance.
 */
```

##### get
Asynchronously retrieves a formatted portfolio using the provided IAgentRuntime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The IAgentRuntime used to retrieve the formatted portfolio.
 * @param {Memory} _message - The message object, not actively used in this method.
 * @param {State} [_state] - An optional parameter representing the state. Defaults to undefined.
 * @returns {Promise<string | null>} A Promise that resolves with the formatted portfolio string, or null if there was an error.
 */
```

##### connect
Connects to a NEAR wallet using the provided runtime instance and returns the account object.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime instance to use for retrieving wallet settings
 * @returns {Promise<any>} The NEAR account object
 */
```

##### fetchWithRetry
Fetches data from a specified URL with retry logic.
```javascript
/**
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Additional options for the request.
 * @returns {Promise<any>} A promise that resolves with the fetched data.
 */
```

##### fetchPortfolioValue
Fetches the current value of the wallet portfolio by retrieving the account balance. 
```javascript
/**
 * @param {IAgentRuntime} runtime - The Agent runtime to use for retrieving account information
 * @returns {Promise<WalletPortfolio>} The current wallet portfolio value including total USD value, total NEAR balance, and token details
 * @throws {Error} If there is an error fetching the portfolio value
 */
```

##### fetchNearPrice
Fetches the current NEAR price from the API and returns it.
```javascript
/**
 * @returns {Promise<number>} The current NEAR price in USD.
 */
```

##### formatPortfolio
Formats the portfolio information into a user-friendly string.
```javascript
/**
 * @param {IAgentRuntime} runtime - The runtime information of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio object containing wallet data.
 * @returns {string} The formatted portfolio information string.
 */
```

##### getFormattedPortfolio
Asynchronously retrieves the portfolio value using the provided agent runtime.
```javascript
/**
 * @param {IAgentRuntime} runtime - The agent runtime to utilize for fetching the portfolio value.
 * @returns {Promise<string>} A promise that resolves to a string representing the formatted portfolio.
 */
```

## Interfaces

### TransferContent
An interface representing the transfer of content, extends from Content.
```javascript
/**
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
Interface representing a NEAR Protocol token.
```javascript
/**
 * @property {string} name - Name of the token.
 * @property {string} symbol - Symbol of the token.
 * @property {number} decimals - Number of decimals for the token.
 * @property {string} balance - Token balance.
 * @property {string} uiAmount - Amount of the token in user interface format.
 * @property {string} priceUsd - Price of the token in USD.
 * @property {string} valueUsd - Value of the token in USD.
 * @property {string} [valueNear] - Value of the token in NEAR cryptocurrency.
 */
```

### WalletPortfolio
Interface representing a wallet portfolio.
```javascript
/**
 * @property {string} totalUsd - The total USD value in the wallet.
 * @property {string} [totalNear] - The optional total NEAR value in the wallet.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing the tokens in the wallet.
 */
```

## Types

### NearConfig
Represents the inferred type of the 'nearEnvSchema' schema, which is used to define the NearConfig type.
## TODO Items
**TODO Comment:** 
TODO: add functionality to support multiple networks

**Context:** 
Currently, the code only supports a single network specified by the "NEAR_NETWORK" setting. To add support for multiple networks, the code needs to be modified to handle network-specific configurations and connections.

**Tag:** 
Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide for Package Dependencies and Error Handling

## Common Issues and Solutions
- **Issue**: Package dependencies not installing correctly
  - **Solution**: Run `npm install` or `yarn install` to ensure all packages are installed correctly.
- **Issue**: Error handling not working as expected
  - **Solution**: Check if error handling logic is implemented correctly in methods.

## Error Messages and Meanings
- **Error Message**: "NEAR wallet credentials not properly configured."
  - **Meaning**: This error is thrown when the NEAR wallet credentials are missing or incorrect.
- **Error Message**: "Error fetching the portfolio value."
  - **Meaning**: Indicates that there was an issue fetching the portfolio value.

## Debugging Tips
- Use console.log statements in your code to track the flow of execution and identify where errors occur.
- Utilize debugging tools like Chrome DevTools to step through your code and pinpoint issues.

## Configuration Problems
- Ensure all necessary configuration settings (e.g., NEAR wallet credentials) are correctly set up.
- Double-check the environment variables or configuration files for any missing or incorrect values.

## Compatibility Issues
- Check for compatibility issues between different versions of packages and dependencies.
- Ensure that all packages are up to date to avoid compatibility conflicts.

## Performance Optimization
- Optimize your code for efficiency, especially in methods that involve heavy computations or API calls.
- Consider implementing caching mechanisms to improve performance, like the `node-cache` package in this example.

## FAQ Section
**Q: How do I troubleshoot package dependency issues?**
A: Make sure to check for any errors during installation, verify package versions, and update outdated dependencies.

**Q: What should I do if I encounter unexpected errors in the error handling methods?**
A: Double-check the error handling logic in the methods, ensure proper error handling is implemented, and debug to identify the root cause of the issue.

**Q: How can I improve the performance of fetching portfolio values?**
A: Consider optimizing the fetching process, implementing caching of portfolio values, and monitoring API response times for potential performance bottlenecks.

---

By following this troubleshooting guide, you should be able to identify and resolve common issues related to package dependencies, error handling methods, configuration problems, compatibility issues, and performance optimization in your application. If you encounter any other issues, refer to the provided solutions or seek further assistance from the developer community.
