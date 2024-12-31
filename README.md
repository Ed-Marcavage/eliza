# Plugin Documentation
## Overview and Purpose
### @elizaos/plugin-near

#### Package description:
*The package @elizaos/plugin-near is a plugin designed to facilitate interactions with the NEAR Protocol blockchain. It provides functionality for managing wallets, transferring tokens, and fetching wallet portfolio information.*

#### Main classes:
1. **WalletProvider**:
   A class representing a wallet provider that implements the Provider interface. It handles fetching and formatting wallet portfolio information.

#### Key interfaces:
1. **TransferContent**:
   - Interface representing the content of a transfer. It extends the Content interface and includes recipient, amount, and optional token address fields.
   
2. **NearToken**:
   - Interface representing a NEAR Protocol token with properties for name, symbol, decimals, balance, uiAmount, priceUsd, valueUsd, and optional valueNear.
   
3. **WalletPortfolio**:
   - Interface representing a wallet portfolio with totalUsd, totalNear (optional), and an array of NearToken objects for different tokens.

#### Main features:
1. **Wallet management**: The plugin allows users to manage their NEAR Protocol wallets efficiently.
2. **Token transfers**: Users can easily initiate token transfers using the provided TransferContent interface.
3. **Portfolio tracking**: The plugin enables users to fetch and display their wallet portfolio information, including total values in USD and NEAR tokens, along with details for individual tokens.
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
   - cd into the agent/ directory.
   - Run `pnpm install` to install the new dependency.
   - Run `pnpm build` to build the project with the new plugin.

### Usage Instructions:

2. **Import and use the plugin:**

   - Using import syntax:
     ```typescript
     import { nearPlugin } from "@elizaos/plugin-near";
     ```
   - Add it to the AgentRuntime plugins array.

### Integration Example:

3. **Complete setup example:**
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

### Verification Steps:

4. **Verification to ensure successful integration:**
   - Check that the plugin is correctly imported and added to the AgentRuntime.
   - Verify that the plugin functions are accessible and usable within your ElizaOS project.
   - Run any necessary tests or simulations to confirm the functionality of the NEAR Protocol Plugin for Eliza.
## Configuration
# Configuration Documentation

Configuration for this application is done using environment variables in the `.env` file. Make sure to set up the `.env` file and add it to the `.gitignore` file to prevent the variables from being committed to the repository.

## Required Environment Variables and Their Purpose

1. `NEAR_ENV`: Used for specifying the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used for specifying the React SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Used for the NEAR wallet secret key.
4. `NEAR_WALLET_PUBLIC_KEY`: Used for the NEAR wallet public key.
5. `NEAR_ADDRESS`: Used for the NEAR address.
6. `SLIPPAGE`: Used for specifying the slippage.
7. `RPC_URL`: Used for specifying the RPC URL.
8. `NEAR_NETWORK`: Used for specifying the NEAR network.

## Example .env File

```plaintext
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=your_wallet_secret_key
NEAR_WALLET_PUBLIC_KEY=your_wallet_public_key
NEAR_ADDRESS=your_near_address
SLIPPAGE=1
RPC_URL=your_rpc_url
NEAR_NETWORK=testnet
```

Make sure to replace the placeholders with your actual values before using the `.env` file in your project.
## Usage Examples
## NearPluginManager

### Basic usage example:

Initialize the NearPluginManager:

```java
NearPluginManager nearPluginManager = new NearPluginManager();
```

### Code snippet demonstrating public method usage:

Register a new plugin with a specific name:

```java
nearPluginManager.registerPlugin("MyPlugin", new MyPlugin());
```

### Example workflow showing a practical use case:

1. Initialize NearPluginManager.
2. Register multiple plugins.
3. Retrieve a specific plugin by name for further processing.

## NearPlugin

### Basic usage example:

Create a custom plugin class:

```java
public class MyPlugin implements NearPlugin {
    // Implementation of methods
}
```

### Code snippet demonstrating public method usage:

Override the execute() method in MyPlugin:

```java
@Override
public void execute() {
    // Plugin execution logic
}
```

### Example workflow showing a practical use case:

1. Implement a custom plugin class by extending NearPlugin.
2. Override the execute() method with specific functionality.
3. Use the plugin within the NearPluginManager for execution.

By following these examples, users can effectively utilize the @elizaos/plugin-near package to manage plugins and execute custom logic within their applications.
## API Reference
# API Reference

## Classes and Public Methods

### TransferContent

- **Methods:**
1. `sendTransfer(content: TransferContent): void`

### Public Interfaces

#### TransferContent
```typescript
/**
 * Interface representing the content of a transfer.
 * Extends the Content interface.
 */
interface TransferContent {
    recipient: string;
    amount: string | number;
    tokenAddress?: string;
}
```

#### NearToken
```typescript
/**
 * Interface representing a NEAR Protocol token.
 */
interface NearToken {
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: string;
    priceUsd: string;
    valueUsd: string;
    valueNear?: string;
}
```

#### WalletPortfolio
```typescript
/**
 * Interface representing a wallet portfolio.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: NearToken[];
}
```

## Public Types

### NearConfig
```typescript
/**
 * Type definition for the NearConfig object inferred from the nearEnvSchema.
 */
type NearConfig = any;
```

## Examples

### Sending a Transfer
```typescript
import { TransferContent } from 'your-library';

const transferData: TransferContent = {
    recipient: 'alice.near',
    amount: 10,
    tokenAddress: 'near_token_address'
};

sendTransfer(transferData);
```

## Type Constraints and Requirements

- The `TransferContent` interface requires a `recipient` of type `string`, an `amount` of type `string` or `number`, and an optional `tokenAddress` of type `string`.
- The `NearToken` interface mandates properties like `name`, `symbol`, `decimals`, `balance`, `uiAmount`, `priceUsd`, and `valueUsd`.
- The `WalletPortfolio` interface must have `totalUsd` as a `string` and `tokens` as an array of `NearToken` objects.
## TODO Items
TODO Comment: TODO: add functionality to support multiple networks

Context: Currently, the code only supports one network (testnet) specified by the NEAR_NETWORK setting. To enhance the flexibility and usability of the code, functionality needs to be added to support multiple networks. This involves allowing the user to specify different network configurations (e.g., mainnet, betanet) and adapt the code accordingly for seamless operation across different networks.

Tag: Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide

## Common Issues and Solutions
- **Issue:** NEAR wallet credentials not configured properly
  - **Solution:** Make sure the NEAR wallet credentials are set up correctly before calling the `connect` method.

## Error Messages and Their Meaning
- **Error Message:** `Error: NEAR wallet credentials are not configured properly`
  - **Meaning:** This error indicates that the NEAR wallet credentials are not set up correctly and need to be configured before proceeding.

## Debugging Tips
- Use console.log statements to track the flow of execution and log important values at each step of the method.

## Configuration Problems
- Ensure that all required dependencies are installed and up to date as per the package dependencies provided.

## Compatibility Issues
- Ensure that the versions of the dependencies listed in the package.json file are compatible with each other to avoid any conflicts.

## Performance Optimization
- Implement caching mechanisms where appropriate to reduce the number of API calls and improve performance.

## FAQ Section
- **Q:** What should I do if I encounter an error while fetching the portfolio value?
  - **A:** Check the error message thrown by the `fetchPortfolioValue` method and verify if all required data (NEAR balance, NEAR price in USD) is being fetched correctly.

*Note: Adjust the troubleshooting guide based on specific errors or issues encountered during development.*
