
# Plugin Documentation
## Overview and Purpose
# @elizaos/plugin-near

**Package Description:** Undefined

## Purpose:
The purpose of this plugin is to provide wallet functionality for the NEAR Protocol. It includes classes and interfaces for managing wallet connections, fetching portfolio data, and formatting token information.

## Main Features:
- **WalletProvider Class:** Manages wallet functionality such as connecting to NEAR wallet, fetching portfolio value, and formatting portfolio data.
- **TransferContent Interface:** Represents the content of a transfer, including recipient, amount, and optional token address for native NEAR transfers.
- **NearToken Interface:** Represents a NEAR Protocol token with properties like name, symbol, balance, price, and value in USD or NEAR currency.
- **WalletPortfolio Interface:** Represents a wallet portfolio with total value in USD, total value in NEAR currency (optional), and an array of NearToken objects for different tokens in the portfolio.

This plugin offers a comprehensive solution for handling wallet operations and managing token information within the NEAR Protocol ecosystem.
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
   - Next, run the following commands:
     1. cd agent/
     2. pnpm install
     3. pnpm build

### 2. Import and use the plugin:
   - Import the plugin using:
     ```typescript
     import { nearPlugin } from "@elizaos/plugin-near";
     ```
   - Add it to the AgentRuntime plugins array:
     ```typescript
     return new AgentRuntime({
         // other configuration...
         plugins: [
             nearPlugin,
             // other plugins...
         ],
     });
     ```

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
   - Ensure that you see ["✓ Registering action: <plugin actions>"] in the console for successful integration.
## Configuration
# Environment Variable Configuration Documentation

To configure the application, you will need to set the following environment variables in a `.env` file. Make sure to add the `.env` file to your `.gitignore` to avoid committing sensitive information to your repository.

## Required Environment Variables

1. `NEAR_ENV`  
   Purpose: Specify the environment for NEAR protocol  
   
2. `REACT_APP_REF_SDK_ENV`  
   Purpose: Environment variable for the REACT app
  
3. `NEAR_WALLET_SECRET_KEY`  
   Purpose: Secret key for the NEAR wallet  
  
4. `NEAR_WALLET_PUBLIC_KEY`  
   Purpose: Public key for the NEAR wallet  

5. `NEAR_ADDRESS`  
   Purpose: NEAR blockchain address  

6. `SLIPPAGE`  
   Purpose: Slippage setting for transactions  

7. `RPC_URL`  
   Purpose: RPC URL for NEAR protocol  

8. `NEAR_NETWORK`  
   Purpose: Specify the NEAR network, default is `"testnet"`  


## Example `.env` File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=YOUR_SECRET_KEY_HERE
NEAR_WALLET_PUBLIC_KEY=YOUR_PUBLIC_KEY_HERE
NEAR_ADDRESS=your_near_address
SLIPPAGE=1
RPC_URL=your_rpc_url
NEAR_NETWORK=testnet
```
## Actions

## Providers

## Evaluators

## Usage Examples
# WalletProvider Class

WalletProvider class implements the Provider interface and manages wallet functionality such as connecting to NEAR wallet, fetching portfolio value, and formatting portfolio data.

## Constructor
```javascript
/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The unique identifier for the account.
 */
```

## Methods

### get
```javascript
/**
 * Retrieves the formatted portfolio using the specified runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime to use for the operation.
 * @param {Memory} _message - The memory object.
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string | null>} The formatted portfolio, or null if an error occurs.
 */
```

### connect
```javascript
/**
 * Connects to NEAR network using wallet credentials.
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @returns {Promise} The NEAR account object.
 */
```

### fetchWithRetry
```javascript
/**
 * Fetches data from the specified URL with retry logic in case of failure.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
```

### fetchPortfolioValue
```javascript
/**
 * Asynchronously fetches the current value of the wallet portfolio.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to use for fetching data.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio value object.
 * @throws {Error} If there is an error fetching the portfolio value.
 */
```

### fetchNearPrice
```javascript
/**
 * Fetches the near price from an API, with caching mechanism to avoid unnecessary requests.
 * Returns the near price in USD.
 * 
 * @returns {Promise<number>} The near price in USD
 */
```

### formatPortfolio
```javascript
/**
 * Formats the given portfolio information into a readable string for display.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used to access system character information.
 * @param {WalletPortfolio} portfolio - The portfolio object containing token and value information.
 * @returns {string} The formatted portfolio information as a string.
 */
```

### getFormattedPortfolio
```javascript
/**
 * Asynchronously retrieves the portfolio value using the provided IAgentRuntime object
 * and returns a formatted string representation of the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime object used to fetch the portfolio value
 * @returns {Promise<string>} A Promise that resolves with the formatted portfolio string
 */
```

## Create

### Basic Usage Example
```javascript
const walletProvider = new WalletProvider('user123');
walletProvider.connect(agentRuntime)
  .then(nearAccount => {
    walletProvider.fetchPortfolioValue(agentRuntime)
      .then(portfolio => {
        const formattedPortfolio = walletProvider.formatPortfolio(agentRuntime, portfolio);
        console.log(formattedPortfolio);
      })
      .catch(error => {
        console.error('Error fetching portfolio value:', error);
      });
  })
  .catch(error => {
    console.error('Error connecting to NEAR network:', error);
  });
```

## Modifying and Extending Functionality

To modify or extend the functionality of actions, providers, and evaluators, you can create custom methods within the WalletProvider class or extend it with additional functionalities. Here's an example of extending the WalletProvider class with a new method:

```javascript
class CustomWalletProvider extends WalletProvider {
  constructor(accountId) {
    super(accountId);
  }

  // Custom method to perform a specific action
  customAction() {
    // Add custom functionality here
  }
}
```

In this example, you can create a new instance of the CustomWalletProvider class and access the customAction method along with the existing methods provided by WalletProvider.

Remember to consider the design patterns and best practices while modifying or extending the functionality of classes to maintain code readability and scalability.
## API Reference
# WalletProvider Class

WalletProvider class that implements Provider interface. Manages wallet functionality such as connecting to NEAR wallet, fetching portfolio value, and formatting portfolio data.

## Constructor

```javascript
/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The unique identifier for the account.
 */
constructor(accountId);
```

## Methods

### get

```javascript
/**
 * Retrieves the formatted portfolio using the specified runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime to use for the operation.
 * @param {Memory} _message - The memory object.
 * @param {State} [_state] - Optional state object.
 * @returns {Promise<string | null>} The formatted portfolio, or null if an error occurs.
 */
get(runtime, _message, _state);
```

### connect

```javascript
/**
 * Connects to NEAR network using wallet credentials.
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @returns {Promise} The NEAR account object.
 */
connect(runtime);
```

### fetchWithRetry

```javascript
/**
 * Fetches data from the specified URL with retry logic in case of failure.
 *
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
fetchWithRetry(url, options={});
```

### fetchPortfolioValue

```javascript
/**
 * Asynchronously fetches the current value of the wallet portfolio.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to use for fetching data.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio value object.
 * @throws {Error} If there is an error fetching the portfolio value.
 */
fetchPortfolioValue(runtime);
```

### fetchNearPrice

```javascript
/**
 * Fetches the near price from an API, with caching mechanism to avoid unnecessary requests.
 * Returns the near price in USD.
 * 
 * @returns {Promise<number>} The near price in USD
 */
fetchNearPrice();
```

### formatPortfolio

```javascript
/**
 * Formats the given portfolio information into a readable string for display.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used to access system character information.
 * @param {WalletPortfolio} portfolio - The portfolio object containing token and value information.
 * @returns {string} The formatted portfolio information as a string.
 */
formatPortfolio(runtime, portfolio);
```

### getFormattedPortfolio

```javascript
/**
 * Asynchronously retrieves the portfolio value using the provided IAgentRuntime object
 * and returns a formatted string representation of the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The IAgentRuntime object used to fetch the portfolio value
 * @returns {Promise<string>} A Promise that resolves with the formatted portfolio string
 */
getFormattedPortfolio(runtime);

# Interfaces

## TransferContent

```javascript
/**
 * Represents the content of a transfer, extending the Content interface.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred.
 * @property {string} [tokenAddress] - Optional: The token address for native NEAR transfers.
 */
 
## NearToken

```javascript
/**
 * Interface representing a NEAR Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol representing the token.
 * @property {number} decimals - The number of decimal places allowed for the token.
 * @property {string} balance - The current balance of the token.
 * @property {string} uiAmount - The amount of tokens in a user-friendly format.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The total value of the token in USD.
 * @property {string} [valueNear] - The total value of the token in NEAR Protocol currency.
 */

## WalletPortfolio

```javascript
/**
 * Interface representing a wallet portfolio.
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR cryptocurrency.
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the portfolio.
 */

# Types

## NearConfig

```javascript
/**
 * Represents the configuration for a NEAR environment.
 */
```
## TODO Items
**TODO Comment:** 
TODO: add functionality to support multiple networks

**Context:** 
The code currently only supports one network (testnet) and hardcoded RPC URL. The task is to modify the code to enable support for multiple networks, allowing users to specify network settings dynamically.

**Tag:** 
Feature
## Common Issues & Troubleshooting
# Package Dependency Troubleshooting Guide

## Common Issues and Solutions
- **Issue:** Package not found or dependency mismatch
  - **Solution:** Double-check the versions of the dependencies listed in the package.json file. Make sure they match the exact versions specified in the dependencies section.

## Error Messages and Their Meaning
- **Error Message:** `Cannot find module '@elizaos/core'`
  - **Meaning:** The module '@elizaos/core' is not installed or is missing in the project dependencies.
- **Error Message:** `Unhandled promise rejection. Error: There was an error fetching the portfolio value.`
  - **Meaning:** An error occurred during the portfolio value fetch operation. 
  
## Debugging Tips
- Use console.log() statements to log variables and check their values during runtime.
- Utilize the browser developer tools or a debugging tool like VS Code to step through the code and identify the source of errors.

## Configuration Problems
- Verify that all required configurations for the project, including API keys and environment variables, are correctly set up.
- Check that the paths and file names specified in the configuration files are accurate.

## Compatibility Issues
- Ensure that the versions of the dependencies listed in the package.json file are compatible with each other.
- Check for any potential conflicts between the versions of the dependencies used in the project.

## Performance Optimization
- Optimize code efficiency by reducing redundant operations and improving algorithms where possible.
- Implement caching mechanisms to store and retrieve data efficiently, especially for frequently accessed resources.

## FAQ Section
### Q: Why am I getting the error "Unhandled promise rejection" in my fetchPortfolioValue method?
A: This error indicates that there was an issue while fetching the portfolio value. Check the implementation of the fetchPortfolioValue method and ensure that error handling is correctly implemented to catch any errors that occur during the fetch operation.

### Q: How can I troubleshoot package dependency mismatches in my project?
A: Double-check the versions of the dependencies listed in the package.json file and ensure they match the exact versions specified in the dependencies section. You can also try removing the node_modules folder and running `npm install` again to reinstall the dependencies.

---
By following the troubleshooting guide above, you should be able to effectively tackle common issues, understand error messages, and optimize the performance of your project.
