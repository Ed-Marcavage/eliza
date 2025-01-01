
# Plugin Documentation
## Overview and Purpose
## Plugin Overview: @elizaos/plugin-near

### Purpose:
This plugin is designed to provide a seamless integration with the NEAR Protocol, offering functionalities related to wallet management and token transfers.

### Main Features:
1. **WalletProvider Class:**
   - Represents a Wallet Provider that implements the Provider interface.

2. **Key Interfaces:**
   - **TransferContent:**
     - Interface for transferring content with recipient, amount, and optional tokenAddress.
   - **NearToken:**
     - Interface representing a NEAR Protocol token with various properties like name, symbol, balance, and price.

3. **WalletPortfolio Interface:**
   - Represents a wallet portfolio with total values in USD and NEAR tokens, along with an array of NearToken objects representing different tokens in the wallet.
## Installation
### Installation Instructions:

1. **Add the plugin to your ElizaOS project:**
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

2. **Import and Use the Plugin:**
   - Import syntax: `import { nearPlugin } from "@elizaos/plugin-near";`
   - Add it to the AgentRuntime plugins array

3. **Integration Example:**
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

4. **Verification Steps:**
   - Ensure you see ["✓ Registering action: executeSwap", "✓ Registering action: executeTransfer"] in the console

### Dependencies:
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

### Peer Dependencies:
```json
{
  "whatwg-url": "7.1.0",
  "form-data": "4.0.1"
}
```  

Make sure to follow these instructions carefully to successfully integrate the @elizaos/plugin-near plugin into your ElizaOS project.
## Configuration
# Configuration Documentation

### Required Environment Variables and Purpose:

1. `NEAR_ENV`: Specifies the environment context for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Specifies the environment context for the React application and SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for NEAR wallet authentication.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for NEAR wallet authentication.
5. `NEAR_ADDRESS`: NEAR address for interacting with the NEAR protocol.
6. `SLIPPAGE`: Amount of price slippage allowed.
7. `RPC_URL`: URL for connecting to the remote procedure call server.
8. `NEAR_NETWORK`: Network ID for the NEAR protocol.

### Full .env Example File:

```plaintext
NEAR_ENV=production
REACT_APP_REF_SDK_ENV=development
NEAR_WALLET_SECRET_KEY=abcde12345
NEAR_WALLET_PUBLIC_KEY=12345abcde
NEAR_ADDRESS=example.near
SLIPPAGE=0.5
RPC_URL=https://rpc.example.testnet.near.org
NEAR_NETWORK=testnet
```

### Note: 
Configuration is done in the .env file. Ensure to set the .env file in the .gitignore to prevent committing sensitive information to the repository.
## Actions

## Providers

## Evaluators

## Usage Examples
## Usage Documentation

### Classes

#### undefined
```javascript
/**
 * Class representing a Wallet Provider that implements Provider interface.
 */
```

### Methods

#### constructor
```javascript
/**
 * Constructor for creating a new instance of a class.
 * 
 * @param {string} accountId - The unique identifier for the account.
 */
```

#### get
```javascript
/**
 * Asynchronously retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime for the agent
 * @param {Memory} _message - The message memory
 * @param {State} [_state] - Optional state information
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs
 */
```

#### connect
```javascript
/**
 * Connects to NEAR Protocol using the provided runtime and initializes the account.
 * @param {IAgentRuntime} runtime - The runtime object to use for connecting.
 * @returns {Promise} - A Promise that resolves to the initialized account.
 */
```

#### fetchWithRetry
```javascript
/**
 * Fetches data from a specified URL with retry logic in case of failures.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - Optional request configuration options.
 * @returns {Promise<any>} A Promise that resolves with the fetched data.
 */
```

#### fetchPortfolioValue
```javascript
/**
 * Fetch the current value of the wallet portfolio.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio.
 */
```

#### fetchNearPrice
```javascript
/**
* Fetches the near price from the Coingecko API. 
* If the near price is cached, it returns the cached value. 
* Otherwise, it makes a request to the API and stores the fetched price in the cache. 
* 
* @returns {Promise<number>} The near price in USD.
*/
```

#### formatPortfolio
```javascript
/**
 * Formats the portfolio information to be displayed in a readable string format.
 *
 * @param {IAgentRuntime} runtime - The runtime information of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio containing token and total value information.
 * @returns {string} A formatted string representing the portfolio information.
 */
```

#### getFormattedPortfolio
```javascript
/**
 * Asynchronously retrieves and formats the portfolio value based on the given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime of the agent.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value or an error message.
 */
```

### Common Use Cases
- Retrieving and formatting wallet portfolio information
- Connecting to NEAR Protocol and initializing accounts
- Fetching data from a URL with retry logic
- Fetching the current value of a wallet portfolio
- Fetching the near price from Coingecko API

### Extending Functionality
To modify or extend the functionality of the provided methods, you can:
1. Customize the logic within each method to fit specific use cases.
2. Implement additional error handling or data validation as needed.
3. Integrate with other APIs or services to enhance functionality.
4. Create new methods or classes that build upon the existing functionality.

For example, you could modify the `fetchPortfolioValue` method to include additional token information or create a new method that calculates the percentage change in portfolio value over time.

### Code Samples
```javascript
// Example of using the constructor to create a new instance
const walletProvider = new WalletProvider('1234567890');

// Example of calling the get method to retrieve formatted portfolio
walletProvider.get(runtime, _message, _state)
  .then((portfolio) => {
    console.log(portfolio);
  })
  .catch((error) => {
    console.error(error);
  });

// Example of connecting to NEAR Protocol
walletProvider.connect(runtime)
  .then((account) => {
    console.log(`Connected to NEAR with account: ${account}`);
  })
  .catch((error) => {
    console.error(error);
  });

// Example of fetching portfolio value
walletProvider.fetchPortfolioValue(runtime)
  .then((portfolio) => {
    console.log(portfolio);
  })
  .catch((error) => {
    console.error(error);
  });
```

### For more information on modifying and extending functionality, refer to the documentation and code examples provided above.
## API Reference
# API Reference Documentation

## Classes

### WalletProvider
```javascript
/**
 * Class representing a Wallet Provider that implements Provider interface.
 */
```

#### Methods

##### constructor
```javascript
/**
 * Constructor for creating a new instance of a class.
 * 
 * @param {string} accountId - The unique identifier for the account.
 */
```

##### get
```javascript
/**
 * Asynchronously retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime for the agent
 * @param {Memory} _message - The message memory
 * @param {State} [_state] - Optional state information
 * @returns {Promise<string | null>} The formatted portfolio or null if an error occurs
 */
```

##### connect
```javascript
/**
 * Connects to NEAR Protocol using the provided runtime and initializes the account.
 * @param {IAgentRuntime} runtime - The runtime object to use for connecting.
 * @returns {Promise} - A Promise that resolves to the initialized account.
 */
```

##### fetchWithRetry
```javascript
/**
 * Fetches data from a specified URL with retry logic in case of failures.
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} options - Optional request configuration options.
 * @returns {Promise<any>} A Promise that resolves with the fetched data.
 */
```

##### fetchPortfolioValue
```javascript
/**
 * Fetch the current value of the wallet portfolio.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface.
 * @returns {Promise<WalletPortfolio>} A promise that resolves to the wallet portfolio.
 */
```

##### fetchNearPrice
```javascript
/**
* Fetches the near price from the Coingecko API. 
* If the near price is cached, it returns the cached value. 
* Otherwise, it makes a request to the API and stores the fetched price in the cache. 
* 
* @returns {Promise<number>} The near price in USD.
*/
```

##### formatPortfolio
```javascript
/**
 * Formats the portfolio information to be displayed in a readable string format.
 *
 * @param {IAgentRuntime} runtime - The runtime information of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio containing token and total value information.
 * @returns {string} A formatted string representing the portfolio information.
 */
```

##### getFormattedPortfolio
```javascript
/**
 * Asynchronously retrieves and formats the portfolio value based on the given agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The runtime of the agent.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value or an error message.
 */
```

## Interfaces

### TransferContent
```javascript
/**
 * Interface for transferring content with recipient, amount, and optional tokenAddress.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string|number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */
```

### NearToken
```javascript
/**
 * Interface representing a NEAR Protocol token
 *
 * @typedef {object} NearToken
 * @property {string} name - The name of the token
 * @property {string} symbol - The symbol of the token
 * @property {number} decimals - The number of decimals the token has
 * @property {string} balance - The balance of the token
 * @property {string} uiAmount - The amount of the token in user interface format
 * @property {string} priceUsd - The price of the token in USD
 * @property {string} valueUsd - The value of the token in USD
 * @property {string} [valueNear] - The value of the token in NEAR Protocol currency
 */
```

### WalletPortfolio
```javascript
/**
 * An interface representing a wallet portfolio.
 *
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the wallet.
 */
```

## Types

### NearConfig
```javascript
/**
* Represents the inferred type of a provided `nearEnvSchema`.
*/
```

## Examples

```javascript
// Example usage of the WalletProvider class

const wallet = new WalletProvider('1234567890');

wallet.connect(myAgentRuntime).then((initializedAccount) => {
    console.log('Account initialized:', initializedAccount);
});

wallet.get(myAgentRuntime, myMessageMemory, myState).then((formattedPortfolio) => {
    console.log('Formatted Portfolio:', formattedPortfolio);
});

wallet.fetchPortfolioValue(myAgentRuntime).then((portfolio) => {
    console.log('Wallet Portfolio:', portfolio);
});

wallet.fetchNearPrice().then((nearPrice) => {
    console.log('NEAR Price in USD:', nearPrice);
});

wallet.formatPortfolio(myAgentRuntime, myPortfolio).then((formattedString) => {
    console.log('Formatted Portfolio:', formattedString);
});

wallet.getFormattedPortfolio(myAgentRuntime).then((formattedPortfolio) => {
    console.log('Formatted Portfolio:', formattedPortfolio);
});
``` 

This comprehensive API reference provides details on the classes, methods, interfaces, types, and includes examples for complex APIs to help developers understand and implement the functionalities effectively.
## TODO Items
TODO Comment: add functionality to support multiple networks
Context: The code currently only supports one network (NEAR testnet) for token swaps. This todo item is to add functionality to support multiple networks so users can choose which network to interact with.
Tag: feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

## 1. Common Issues and Solutions
### Issue: Dependency version mismatch
- Solution: Make sure all package dependencies are up to date using `npm update`.

### Issue: Incorrect usage of methods
- Solution: Double-check method signatures and parameters according to the provided documentation.

## 2. Error Messages and Their Meaning
### Error Message: `TypeError: Cannot read property 'xxx' of null`
- Meaning: This error occurs when trying to access a property of an object that is null or undefined.
- Solution: Check if the object is null before accessing its properties.

## 3. Debugging Tips
- Use console.log statements to track the flow of your code.
- Utilize debugging tools like `node inspect` for Node.js applications.

## 4. Configuration Problems
### Problem: Incorrect configuration setup
- Solution: Verify that all configuration files are set up correctly with the required settings.

## 5. Compatibility Issues
### Issue: Incompatible package versions
- Solution: Check package.json for compatibility issues between dependencies and update packages as needed.

## 6. Performance Optimization
- Implement caching mechanisms to reduce the load on external APIs.

## 7. FAQ Section
### Q: How can I handle errors in async functions?
- A: Use `try/catch` blocks to catch and handle errors within async functions.

### Q: How can I improve the performance of my application?
- A: Optimize your code by reducing unnecessary computations and utilizing asynchronous processes where possible.

---

By following the troubleshooting guide above, you should be able to resolve common issues, understand error messages, debug effectively, and optimize the performance of your application. If you encounter any further challenges, refer to the FAQ section or seek additional support from the community.
