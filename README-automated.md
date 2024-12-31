# Plugin Documentation
## Overview and Purpose
### Package Overview: @elizaos/plugin-near

1. **Purpose**: 
   This plugin aims to provide functionality for interacting with Near Protocol wallets and tokens, enabling users to manage transfers, view token balances, and track portfolio values.

2. **Main Features and Capabilities**:
   - **WalletProvider Class**: Represents a Wallet Provider for interacting with Near wallets.
   - **Key Interfaces**:
     - **TransferContent**: Specifies the content of a transfer, including recipient address, amount, and optional token address.
     - **NearToken**: Defines properties of a Near Protocol token such as name, symbol, balance, and value in USD.
     - **WalletPortfolio**: Represents a wallet portfolio with total values in USD, Near, and an array of NearToken objects.

3. **Usage Scenarios**:
   Users would utilize this plugin to:
   - Facilitate transfers of tokens or currency within Near Protocol wallets.
   - View and manage token balances, prices, and portfolio values.
   - Monitor the value of tokens in USD and Near Protocol USD.

4. **Key Dependencies or Requirements**:
   This plugin may have dependencies on Near Protocol libraries or APIs for wallet interactions and token data retrieval. Users may need access to a Near wallet and possess knowledge of Near Protocol token standards.

Overall, @elizaos/plugin-near plugin offers comprehensive tools for managing Near Protocol wallets and tokens, empowering users to efficiently handle transfers and monitor portfolio values.
## Installation
```markdown
# Installation Instructions for @elizaos/plugin-near

### Prerequisite installations:
1. Make sure you have pnpm installed. If not, install it using the following command:
   ```
   npm install -g pnpm
   ```

### Package Manager Commands:
1. To install @elizaos/plugin-near and its dependencies, run the following command:
   ```
   pnpm install @elizaos/plugin-near @elizaos/core@workspace:* @ref-finance/ref-sdk@^1.4.6 tsup@8.3.5 near-api-js@5.0.1 bignumber.js@9.1.2 node-cache@5.1.2 whatwg-url@7.1.0 form-data@4.0.1
   ```

### Verification Steps:
1. After the installation completes, verify that all dependencies and peer dependencies are successfully installed by running:
   ```
   pnpm ls
   ```
   This command will display the dependency tree for the installed packages.

2. To ensure @elizaos/plugin-near is correctly installed, you can import it in your code and verify functionality.

Congratulations! You have successfully installed @elizaos/plugin-near and its dependencies.
```
## Configuration
# Configuration Documentation

## Required Environment Variables

1. `NEAR_ENV`
   - Purpose: Specifies the environment for NEAR protocol.
   - Example Value: `mainnet`, `testnet`

2. `REACT_APP_REF_SDK_ENV`
   - Purpose: Environment variable for the SDK used in React applications.
   - Example Value: `development`, `production`

3. `NEAR_WALLET_SECRET_KEY`
   - Purpose: Secret key for NEAR wallet.
   - Example Value: `XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`

4. `NEAR_WALLET_PUBLIC_KEY`
   - Purpose: Public key for NEAR wallet.
   - Example Value: `YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY`

5. `NEAR_ADDRESS`
   - Purpose: NEAR protocol address.
   - Example Value: `example.near`

6. `SLIPPAGE`
   - Purpose: Slippage setting for transactions.
   - Example Value: `1`, `0.5`

7. `RPC_URL`
   - Purpose: URL for the RPC server.
   - Example Value: `https://example.rpc.near.org`

8. `NEAR_NETWORK`
   - Purpose: NEAR network identifier.
   - Example Value: `mainnet`, `testnet`

## Setting Configuration in .env File

Ensure the specified environment variables are set in the `.env` file. It is recommended to add the `.env` file to the `.gitignore` to prevent it from being committed to the repository.

```plaintext
NEAR_ENV=mainnet
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEAR_WALLET_PUBLIC_KEY=YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
NEAR_ADDRESS=example.near
SLIPPAGE=1
RPC_URL=https://example.rpc.near.org
NEAR_NETWORK=testnet
```

## Notes

- For variables that are optional or have default values, like `SLIPPAGE`, the configuration will default to a value of `1` if not explicitly set.
- URLs and network identifiers should be properly formatted and specified as needed.
- Ensure to review and update the configuration based on the specific requirements of your application.
## Usage Examples
### Basic Usage Example

To create an instance of a Wallet Provider:
```javascript
const walletProvider = new WalletProvider();
```

### Common Use Cases

#### 1. Retrieving a formatted portfolio for the given agent runtime
```javascript
const formattedPortfolio = await walletProvider.get(runtime, _message, _state);
console.log(formattedPortfolio);
```

#### 2. Connecting to the NEAR blockchain
```javascript
const nearAccount = await walletProvider.connect(runtime);
console.log(nearAccount);
```

#### 3. Fetching data from a specified URL with retries
```javascript
const fetchedData = await walletProvider.fetchWithRetry(url, options);
console.log(fetchedData);
```

#### 4. Fetching the portfolio value for the current account
```javascript
const portfolioValue = await walletProvider.fetchPortfolioValue(runtime);
console.log(portfolioValue);
```

#### 5. Fetching the current NEAR price from the CoinGecko API
```javascript
const nearPrice = await walletProvider.fetchNearPrice();
console.log(nearPrice);
```

#### 6. Formatting the portfolio information
```javascript
const formattedPortfolioInfo = walletProvider.formatPortfolio(runtime, portfolio);
console.log(formattedPortfolioInfo);
```

#### 7. Retrieving and formatting the user's portfolio information
```javascript
const formattedUserPortfolio = await walletProvider.getFormattedPortfolio(runtime);
console.log(formattedUserPortfolio);
```
## API Reference
# WalletProvider Class

A class representing a Wallet Provider.

### Methods

#### constructor
Constructor for creating an instance of AccountService.

- **Parameters**
  - `accountId` (string): The unique identifier for the account.

#### get
Asynchronously retrieves and returns a formatted portfolio for the given agent runtime.

- **Parameters**
  - `runtime` (IAgentRuntime): The agent runtime to retrieve the portfolio for.
  - `_message` (Memory): The memory object, not used in this method.
  - `_state` (State): Optional state object, not used in this method.
- **Returns**
  Promise<string | null>: The formatted portfolio as a string, or null if an error occurs.

#### connect
Connects to the NEAR blockchain using the provided runtime.

- **Parameters**
  - `runtime` (IAgentRuntime): The runtime used to connect to the NEAR blockchain.
- **Returns**
  Promise<object>: The NEAR account object.

#### fetchWithRetry
Fetches data from a specified URL with retries in case of failures.

- **Parameters**
  - `url` (string): The URL to fetch data from.
  - `options` (RequestInit): The options for the fetch request. Default: {}
- **Returns**
  Promise<any>: A promise that resolves with the fetched data.

#### fetchPortfolioValue
Asynchronously fetches the portfolio value for the current account.

- **Parameters**
  - `runtime` (IAgentRuntime): The agent runtime for making necessary API calls.
- **Returns**
  Promise<WalletPortfolio>: The portfolio value, including total USD value, total NEAR balance, and details of each token held in the portfolio.
- **Throws**
  Error: If there is an error fetching the portfolio value.

#### fetchNearPrice
Fetches the current NEAR price from the CoinGecko API.

- **Returns**
  Promise<number>: The NEAR price in USD.

#### formatPortfolio
Formats the portfolio information into a string for display.

- **Parameters**
  - `runtime` (IAgentRuntime): The runtime object containing system information.
  - `portfolio` (WalletPortfolio): The portfolio object containing wallet information.
- **Returns**
  string: The formatted portfolio information as a string.

#### getFormattedPortfolio
Asynchronously retrieves and formats the user's portfolio information.

- **Parameters**
  - `runtime` (IAgentRuntime): The runtime environment in which the function is executed.
- **Returns**
  Promise<string>: A promise that resolves with the formatted portfolio information or an error message.

# Interfaces

### TransferContent Interface
Interface representing the content of a transfer.

Properties:
- `recipient` (string): The recipient's address for the transfer.
- `amount` (string|number): The amount of tokens or currency to transfer.
- `tokenAddress` (string): Optional token address for transfers that are not native NEAR tokens.

### NearToken Interface
Interface representing a Near Protocol token.

Properties:
- `name` (string): The name of the token.
- `symbol` (string): The symbol of the token.
- `decimals` (number): The number of decimal places the token uses.
- `balance` (string): The balance of the token.
- `uiAmount` (string): The amount of the token for UI display.
- `priceUsd` (string): The price of the token in USD.
- `valueUsd` (string): The value of the token in USD.
- `valueNear` (string): The value of the token in NEAR Protocol USD. (optional)

### WalletPortfolio Interface
Interface representing a wallet portfolio.

Properties:
- `totalUsd` (string): The total value in USD.
- `totalNear` (string): The total value in Near. (optional)
- `tokens` (Array<NearToken>): An array of NearToken objects representing the tokens in the wallet.

# Types

### NearConfig Type
Type definition for NearConfig, inferred from nearEnvSchema.
## Common Issues & Troubleshooting
# Troubleshooting Guide

## 1. Common Issues and Solutions
- **Issue:** Dependency conflicts
  - **Solution:** Ensure that all dependencies are compatible with each other. Update packages if necessary.

## 2. Error Messages and Their Meaning
- **Error Message:** `Error fetching portfolio value`
  - **Meaning:** There was an error fetching the portfolio value from the API.
  
## 3. Debugging Tips
- Use console.log statements to track the flow of execution and identify any errors.
- Utilize the browser's developer tools to inspect network requests and responses.

## 4. Configuration Problems
- Verify that all necessary configurations (such as API keys) are set up correctly in the environment.

## 5. Compatibility Issues
- Ensure that all packages and dependencies are compatible with the versions specified in the package.json file.

## 6. Performance Optimization
- Consider caching frequently accessed data to reduce API calls and improve performance.

## 7. FAQ
- **Q:** Why am I getting "Error fetching portfolio value"?
  - **A:** This error occurs when there is an issue retrieving the portfolio value from the API. Check your network connection and ensure that the API endpoint is reachable.
  
---
By following the troubleshooting guide, you should be able to identify and resolve any issues related to package dependencies, error handling in methods, and configuration problems in your application.
## TODO Items
## TODO Section

### Functionality Enhancement
1. **TODO Comment**: add functionality to support multiple networks
   - **Context**: The function `swapToken` currently only supports one network (testnet). It needs to be updated to support multiple networks based on user input.
   - **Priority**: High
   - **File Location**: File: `swapService.ts`, Line: 3

### Error Handling
1. **TODO Comment**: Error handling needs improvement
   - **Context**: Error handling in the `catch` block of `swapToken` function can be enhanced to provide better error messages and handle edge cases more gracefully.
   - **Priority**: Medium
   - **File Location**: File: `swapService.ts`, Line: 94

### Refactoring
1. **TODO Comment**: Refactor code for better readability
   - **Context**: The `swapToken` function involves several nested operations. Refactoring the code to improve readability and maintainability would be beneficial.
   - **Priority**: Low
   - **File Location**: File: `swapService.ts`, Line: 3

## End of TODO Section
