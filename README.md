# Plugin Documentation
## Overview and Purpose
### @elizaos/plugin-near

#### Purpose:
This plugin is designed to provide functionality for managing wallet operations, connecting to NEAR wallet, and handling portfolio data related to Near Protocol tokens.

#### Main Features:
1. **WalletProvider Class:** Manages wallet operations such as fetching portfolio value, connecting to NEAR wallet, and formatting portfolio data.
2. **Key Interfaces:**
    - **TransferContent:** Interface for transferring content with recipient, amount, and optional token address.
    - **NearToken:** Interface for a Near Protocol token with details such as name, symbol, decimals, balance, UI amount, price in USD, and value in USD.
    - **WalletPortfolio:** Interface representing a wallet portfolio with total USD amount, total NEAR tokens amount (optional), and an array of NearToken objects.
## Installation
## Installation and Integration Instructions for @elizaos/plugin-near

### 1. Adding the Plugin to Your ElizaOS Project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-near": "workspace:*"
    }
  }
  ```
- Run the following commands in your terminal:
  1. `cd agent/`
  2. `pnpm install`
  3. `pnpm build`

### 2. Importing and Using the Plugin:
- Import the plugin using:
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
- After integrating the plugin, verify functionality by executing operations that utilize the plugin's actions and providers.
- Check for any console logs or errors related to the plugin during runtime.
- Ensure that the necessary dependencies and peer dependencies are properly installed to prevent compatibility issues.

Following these instructions should successfully integrate the @elizaos/plugin-near plugin into your ElizaOS project.
## Configuration
## Configuration Documentation

### Required Environment Variables and their Purpose
1. `NEAR_ENV`: Used as a fallback option for setting the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used for setting the SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Used for setting the secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Used for setting the public key for the NEAR wallet.
5. `NEAR_ADDRESS`: Used for setting the NEAR address.
6. `SLIPPAGE`: Used for setting the slippage value.
7. `RPC_URL`: Used for setting the RPC URL.
8. `NEAR_NETWORK`: Used for setting the NEAR network.
9. `NEAR_NETWORK` (fallback option): Used as a fallback for setting the RPC URL.
  
### Example .env File
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

---

Please note that configuration should be done in the `.env` file. Ensure that the `.env` file is added to the `.gitignore` to prevent it from being committed to the repository.
## Usage Examples
**Common Use Cases:**

1. **Creating a WalletProvider Instance:**
```javascript
const walletProvider = new WalletProvider("example_account_id");
```

2. **Fetching and Formatting Portfolio Data:**
```javascript
const formattedPortfolio = await walletProvider.get(runtime, _message, _state);
```

3. **Connecting to NEAR Blockchain:**
```javascript
const connectedAccount = await walletProvider.connect(runtime);
```

4. **Fetching Portfolio Value:**
```javascript
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
```

5. **Fetching NEAR Price:**
```javascript
const nearPrice = await walletProvider.fetchNearPrice();
```

6. **Formatting Portfolio Data:**
```javascript
const formattedOutput = walletProvider.formatPortfolio(runtime, portfolio);
```
## API Reference
# API Reference Documentation

## Classes

### WalletProvider
WalletProvider class that implements Provider interface.
Manages wallet operations such as fetching portfolio value, connecting to NEAR wallet, and formatting portfolio data.
@implements Provider

#### Methods

##### constructor
Constructor for creating a new instance of a class with an accountId.
```javascript
/**
 * Constructor for creating a new instance of a class with an accountId.
 * @param {string} accountId - The identifier for the account.
 */
```

##### get
Retrieves the formatted portfolio by calling 'getFormattedPortfolio' method.
```javascript
/**
 * Retrieves the formatted portfolio by calling 'getFormattedPortfolio' method.
 * 
 * @param {IAgentRuntime} runtime - The runtime to access agent functionalities.
 * @param {Memory} _message - The memory object containing user's message.
 * @param {State} [_state] - Optional parameter for storing state information.
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio or null if an error occurs.
 */
```

##### connect
Connects to the NEAR blockchain using the provided runtime.
```javascript
/**
 * Connects to the NEAR blockchain using the provided runtime.
 * @param {IAgentRuntime} runtime - The runtime used to retrieve settings and connect to NEAR.
 * @returns {Promise<IAccount>} The connected NEAR account.
 */
```

##### fetchWithRetry
Fetches data from a specified URL with retry mechanism in case of failure.
```javascript
/**
 * Fetches data from a specified URL with retry mechanism in case of failure.
 * @param {string} url - The URL from which to fetch the data.
 * @param {RequestInit} [options={}] - Additional options for the fetch request.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
```

##### fetchPortfolioValue
Fetches the current value of the portfolio.
```javascript
/**
 * Fetches the current value of the portfolio by getting the account balance,
 * converting the balance to NEAR amount, fetching the NEAR price in USD,
 * calculating the total value in USD, and returning the portfolio details.
 * @param {IAgentRuntime} runtime - The runtime object required for fetching the account.
 * @returns {Promise<WalletPortfolio>} The object containing the total USD value, total NEAR balance,
 * and an array of tokens with name, symbol, decimals, balance, UI amount, price in USD, and value in USD.
 * @throws {Error} If there is an error fetching the portfolio value.
 */
```

##### fetchNearPrice
Fetches the current price of NEAR token in USD from the Coingecko API.
```javascript
/**
 * Fetches the current price of NEAR token in USD from the Coingecko API.
 * @returns {Promise<number>} The current price of NEAR token in USD.
 */
```

##### formatPortfolio
Formats the given WalletPortfolio data into a user-friendly string output.
```javascript
/**
 * Formats the given WalletPortfolio data into a user-friendly string output.
 * @param {IAgentRuntime} runtime - The runtime information of the agent.
 * @param {WalletPortfolio} portfolio - The portfolio data to be formatted.
 * @returns {string} The formatted string output representing the portfolio information.
 */
```

##### getFormattedPortfolio
Asynchronously retrieves the portfolio value and returns it in a formatted string.
```javascript
/**
 * Asynchronously retrieves the portfolio value and returns it in a formatted string.
 * @param {IAgentRuntime} runtime - The runtime to fetch portfolio value from.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value string.
 */
```

## Interfaces

### TransferContent
Interface for transferring content with recipient, amount, and optional token address.

### NearToken
Interface for a Near Protocol token with details such as name, symbol, decimals, balance, UI amount, price in USD, value in USD, and optionally a value in Near tokens.

### WalletPortfolio
Interface representing a wallet portfolio.
```javascript
/**
 * Interface representing a wallet portfolio.
 * @public
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total amount in USD.
 * @property {string} [totalNear] - The total amount in NEAR tokens (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects.
 */
```

## Types

### NearConfig
Type definition representing the configuration object for the NEAR protocol.

## Examples

#### Fetching Portfolio Value
```javascript
async function fetchData() {
    const runtime = getRuntime(); // Placeholder function to get the runtime
    try {
        const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
        console.log(portfolioValue);
    } catch(error) {
        console.error(error);
    }
}
```
## TODO Items
**TODO Comment:**
TODO: add functionality to support multiple networks

**Context:**
Currently, the code only supports a single network (testnet) for executing token swaps. To enhance the functionality and make it more versatile, support for multiple networks needs to be added. This means enabling the user to choose the network they want to interact with, such as mainnet or custom networks.

**Tag:**
Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

### 1. Common Issues and Solutions

- **Issue**: Dependency version conflicts
  - **Solution**: Update the dependencies to the required versions specified in the package.json file.

### 2. Error Messages and Their Meanings

- **Error Message**: "Throws an error if the secret key or public key is missing"
  - **Meaning**: This error occurs when the required keys are not provided for connecting to the NEAR blockchain.

### 3. Debugging Tips

- Use console.log statements to log the execution flow and variable values for better understanding of the code logic.

### 4. Configuration Problems

- Ensure that all required configurations are set up correctly before executing the methods.

### 5. Compatibility Issues

- Check for compatibility issues between different versions of the dependencies and update them accordingly.

### 6. Performance Optimization

- Use caching mechanisms to reduce the number of API calls and improve performance in fetching portfolio values.

### 7. FAQ Section

**Q**: Why am I getting a dependency version conflict error?
**A**: This error occurs when the versions specified in the package.json file do not match the installed dependencies. Update the dependencies to resolve this issue.

**Q**: How can I optimize the performance of fetching portfolio values?
**A**: Implement caching of the fetched values to reduce API calls and improve performance.

---

Code examples and detailed error messages within the codebase should be referenced for a more specific troubleshooting process.
