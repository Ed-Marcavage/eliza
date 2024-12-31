# Plugin Documentation
## Overview and Purpose
# Plugin Overview: @elizaos/plugin-near

## 1. Purpose:
This plugin is designed to provide wallet functionality for NEAR Protocol users. It includes classes for managing wallet operations such as fetching portfolio values, connecting to wallets, and formatting portfolio information.

## 2. Main Features:
- **WalletProvider Class**: Manages wallet functionality and implements the Provider interface.
- **Key Interfaces**:
  - **TransferContent**: Represents the content of a transfer and extends the Content interface.
  - **NearToken**: Represents a NEAR Protocol token with various properties.
  - **WalletPortfolio**: Represents a wallet portfolio with total value information and an array of token objects.
## Installation
## Installation Instructions

### Adding the Plugin to Your ElizaOS Project
1. Add the following to your agent/package.json dependencies:
   ```json
   {
     "dependencies": {
       "@elizaos/plugin-near": "workspace:*"
     }
   }
   ```
2. Navigate to the agent/ directory in your project.
3. Run `pnpm install` to install the new dependency.
4. Run `pnpm build` to build the project with the new plugin.

### Importing and Using the Plugin
- Import the plugin using:
  ```typescript
  import { nearPlugin } from "@elizaos/plugin-near";
  ```
- Add it to the AgentRuntime plugins array.

### Integration Example
```typescript
import { AgentRuntime } from "@elizaos/core";
import { nearPlugin } from "@elizaos/plugin-near";

return new AgentRuntime({
    // other configuration...
    plugins: [
        nearPlugin,
        // other plugins...
    ],
});
```

### Verification Steps
1. Ensure that the plugin is successfully added to the agent/package.json dependencies.
2. Verify that the plugin is imported correctly and added to the AgentRuntime plugins array.
3. Test the functionality provided by the NEAR Protocol plugin, such as swap and transfer actions.

By following these steps, you should have successfully installed and integrated the @elizaos/plugin-near plugin into your ElizaOS project.
## Configuration
# Configuration Documentation

## Required Environment Variables and Purpose

1. `NEAR_ENV`: Specifies the environment for the NEAR protocol.
2. `REACT_APP_REF_SDK_ENV`: Specifies the environment for the REACT app referencing SDK.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR wallet address.
6. `SLIPPAGE`: Specifies the slippage for the runtime.
7. `RPC_URL`: Specifies the RPC URL for the runtime.
8. `NEAR_NETWORK`: Specifies the network ID for NEAR.
  
## Full .env Example File

```bash
NEAR_ENV=development
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=xyz123
NEAR_WALLET_PUBLIC_KEY=abc456
NEAR_ADDRESS=example.near
SLIPPAGE=0.5
RPC_URL=https://example.rpc.near.org
NEAR_NETWORK=testnet
```

**Note:** Make sure to configure these environment variables in the `.env` file and add the `.env` file to the `.gitignore` to prevent it from being committed to the repository.
## Usage Examples
# Class: NearPlugin

### Basic Usage Example:
```java
NearPlugin nearPlugin = new NearPlugin();
```

### Code Snippet:
```java
NearPlugin nearPlugin = new NearPlugin();
nearPlugin.setupNearPlugin("yourAPIKey");
```
This code snippet initializes a `NearPlugin` object and sets up the plugin with the provided API key.

### Workflow Example:
```java
NearPlugin nearPlugin = new NearPlugin();
nearPlugin.setupNearPlugin("yourAPIKey");
List<Location> locations = nearPlugin.getNearbyLocations(37.7749, -122.4194, 10);
for(Location location : locations) {
    System.out.println(location.getName());
}
```
This workflow demonstrates initializing the plugin, setting it up with an API key, getting nearby locations based on coordinates, and printing out the names of those locations.

# Class: Location

### Basic Usage Example:
```java
Location location = new Location("123 Main St", 37.7749, -122.4194);
```

### Code Snippet:
```java
Location location = new Location("123 Main St", 37.7749, -122.4194);
String name = location.getName();
double lat = location.getLatitude();
double lon = location.getLongitude();
```
This code snippet creates a `Location` object with a name and coordinates, and then retrieves the name, latitude, and longitude of the location.

### Workflow Example:
```java
Location location = new Location("Golden Gate Bridge", 37.8199, -122.4783);
System.out.println("Name: " + location.getName());
System.out.println("Coordinates: " + location.getLatitude() + ", " + location.getLongitude());
```
This workflow demonstrates creating a `Location` object for the Golden Gate Bridge with its name and coordinates, and then printing out the name and coordinates of the location.
## API Reference
# API Reference Documentation

## Classes

### TransferContent

#### Public Interface
```typescript
interface TransferContent extends Content {
    recipient: string;
    amount: string | number;
    tokenAddress?: string;
}
```

### NearToken

#### Public Interface
```typescript
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

### WalletPortfolio

#### Public Interface
```typescript
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: NearToken[];
}
```

## Public Methods

N/A

## Public Interfaces

### TransferContent

#### Interface representing the content of a transfer. Extends Content interface.

- **recipient** (`string`): The recipient of the transfer.
- **amount** (`string | number`): The amount of the transfer.
- **tokenAddress** (`string`, optional): Optional for native NEAR transfers.

### NearToken

#### Interface representing a NEAR Protocol token.

- **name** (`string`): The name of the token.
- **symbol** (`string`): The symbol of the token.
- **decimals** (`number`): The number of decimals the token uses.
- **balance** (`string`): The token balance.
- **uiAmount** (`string`): The user interface amount of the token.
- **priceUsd** (`string`): The token price in USD.
- **valueUsd** (`string`): The value of the token in USD.
- **valueNear** (`string`, optional): The value of the token in NEAR Protocol tokens.

### WalletPortfolio

#### Interface representing a wallet portfolio.

- **totalUsd** (`string`): The total value in USD.
- **totalNear** (`string`, optional): The total value in NEAR (optional).
- **tokens** (`Array<NearToken>`): An array of NearToken objects representing different tokens.

## Public Types

### NearConfig

#### Represents the configuration for connecting to a NEAR Protocol node.

## Example Usage

```typescript
const transfer: TransferContent = {
  recipient: 'exampleRecipient',
  amount: 100,
  tokenAddress: 'exampleTokenAddress'
};

const nearToken: NearToken = {
  name: 'Example Token',
  symbol: 'ETK',
  decimals: 18,
  balance: '100',
  uiAmount: '100',
  priceUsd: '1.00',
  valueUsd: '100.00'
};

const wallet: WalletPortfolio = {
  totalUsd: '500.00',
  totalNear: '100',
  tokens: [nearToken]
};
```

## Type Constraints and Requirements

- The `recipient` property of `TransferContent` must be a string.
- The `amount` property of `TransferContent` can be either a string or a number.
- The `tokenAddress` property of `TransferContent` is optional.
- The `name`, `symbol`, `balance`, `uiAmount`, `priceUsd`, and `valueUsd` properties of `NearToken` must be strings.
- The `decimals` property of `NearToken` must be a number.
- The `totalUsd` property of `WalletPortfolio` must be a string.
- The `totalNear` property of `WalletPortfolio` is optional and must be a string.
- The `tokens` property of `WalletPortfolio` must be an array of `NearToken` objects.
## TODO Items
**TODO Comment:** 
TODO: add functionality to support multiple networks

**Context:** 
Currently, the code is hardcoded to support a single network (testnet). The task is to add functionality that allows the application to dynamically support multiple networks based on user settings. This includes fetching network configuration such as network ID and node URL from runtime settings and adjusting the logic to work seamlessly with different networks.

**Tag:** 
Feature
## Common Issues & Troubleshooting
# Troubleshooting Guide for Package Dependencies and Error Handling

## 1. Common Issues and Solutions
- **Issue:** Version conflicts between package dependencies causing errors.
- **Solution:** Ensure that all packages are compatible by checking version compatibility. Use `npm outdated` to see outdated packages and update them accordingly.

## 2. Error Messages and Their Meaning
- **Error Message:** "Error fetching portfolio value."
  - **Meaning:** There was an issue with fetching the portfolio value, possibly due to network problems or API issues.

## 3. Debugging Tips
- Use `console.log()` statements throughout the code to track the flow and identify where the error occurs.
- Use a debugger tool like VSCode debugger to step through the code and pinpoint the issue.

## 4. Configuration Problems
- Ensure that all required configurations are set up correctly in the runtime object to avoid errors during method execution.

## 5. Compatibility Issues
- Make sure that all packages and dependencies are compatible with each other and with the environment where the code is running.

## 6. Performance Optimization
- Optimize code by reducing unnecessary operations and improving algorithm efficiency to enhance performance.

## 7. FAQ Section
### Q: How do I resolve package dependency issues?
A: To resolve package dependency issues, update packages using `npm update` or specify exact versions in `package.json`.

### Q: What should I do if I encounter a configuration error?
A: Check the configuration settings in the runtime object and ensure that all necessary configurations are correctly set up.

---

In case of specific error messages or issues, refer to the respective section for guidance on troubleshooting and resolving the problem. If the issue persists, consider seeking further assistance from the package documentation or community forums.
