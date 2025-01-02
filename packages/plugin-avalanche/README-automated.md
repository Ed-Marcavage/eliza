# @elizaos/plugin-avalanche Documentation

## Overview
### Purpose
The `@elizaos/plugin-avalanche` package serves as a plugin for facilitating various operations related to Avalanche blockchain through defined interfaces, types, and functions. It allows users to interact with Avalanche blockchain by creating token mills, transferring tokens, defining strategies, swapping tokens, and managing market creation parameters.

Package Information:
- Name: @elizaos/plugin-avalanche
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: 

### Key Features

- Code Components:
- Interfaces:
  - TokenMillCreateContent: Represents the structure required to create a new token mill.
  - TransferContent: Details of a transfer transaction of specific content.
  - StrategyContent: Content for a strategy.
  - SwapContent: Swap content information.
  - YakSwapQuote: Interface representing a YakSwapQuote.
  - TokenMillMarketCreationParameters: Parameters required for creating a TokenMill market.
  
- Types:
  - AvalancheConfig: Type definition for AvalancheConfig.
  
- Functions:
  - isTokenMillCreateContent: Validates TokenMillCreateContent object.
  - isTransferContent: Checks if content matches TransferContent structure.
  - isStrategyContent: Checks if content is of type StrategyContent.
  - isSwapContent: Checks if content is of type SwapContent.
  - validateAvalancheConfig: Validates and returns valid Avalanche configuration.
  
### Key Features and Capabilities
- Feature 1: Creation of token mills, transfer of tokens, and definition of strategies.
- Feature 2: Swapping tokens and managing market creation parameters.

## Installation
# Installation and Integration Instructions for @elizaos/plugin-avalanche

### 1. Add the plugin to your ElizaOS project:
   - Add the following to your agent/package.json dependencies:
     ```json
     {
       "dependencies": {
         "@elizaos/plugin-avalanche": "workspace:*"
       }
     }
     ```
   - CD into the agent/ directory
   - Run `pnpm install` to install the new dependency
   - Run `pnpm build` to build the project with the new plugin

### 2. Import and use the plugin:
   - Import the plugin using: 
     ```typescript
     import { avalanchePlugin } from "@elizaos/plugin-avalanche";
     ```
   - Add the plugin to the AgentRuntime plugins array in your code.

### 3. Integration example showing the complete setup:
   ```typescript
   import { avalanchePlugin } from "@elizaos/plugin-avalanche";

   return new AgentRuntime({
       // other configuration...
       plugins: [
           avalanchePlugin,
           // other plugins...
       ],
   });
   ```

### 4. Verification steps:
   - Ensure you see ["✓ Registering action: <plugin actions>"] in the console after integrating the plugin successfully. 

Remember, this plugin is for the ElizaOS agent system and requires the necessary dependencies and peer dependencies to be installed for proper integration. If you encounter any issues, refer to the documentation or reach out for support.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose

1. `AVALANCHE_PRIVATE_KEY`: This environment variable is used to store the private key for the Avalanche platform.

## .env Example File

```plaintext
AVALANCHE_PRIVATE_KEY=your_private_key_here
```

## Note
Configuration settings should be set in the .env file. Ensure that the .env file is added to the .gitignore so that sensitive information, such as private keys, are not committed to the repository.

## Features

### Actions
### Okay
A simple action that conveys agreement or acceptance.

#### Properties
- Name: Okay
- Similes: ["Alright", "Sure", "Got it", "Yes"]

#### Handler
The handler for this action simply acknowledges the user's input and can be used to move the conversation forward.

#### Examples
- User: Can we meet at 2 pm?
Agent: Okay.

### SEND_TOKEN
Transfer tokens on the Avalanche network.

#### Properties
- Name: SEND_TOKEN
- Similes: 
    - TRANSFER_TOKEN_ON_AVALANCHE
    - TRANSFER_TOKENS_ON_AVALANCHE
    - SEND_TOKENS_ON_AVALANCHE
    - SEND_AVAX_ON_AVALANCHE
    - PAY_ON_AVALANCHE

#### Handler
The handler validates the transfer request and processes the token transfer on the Avalanche network. It checks the source of the transfer and composes the transfer context before generating the transfer content. The handler then proceeds to send the tokens and provides the user with feedback based on the success or failure of the transfer.

#### Examples
- User: "Send 10 AVAX to 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"

### SWAP_TOKEN
Swap a token for another token

#### Properties
- Name: SWAP_TOKEN
- Similes: TRADE_TOKEN, BUY_TOKEN, SELL_TOKEN

#### Handler
The handler for this action allows the user to swap one token for another token. It validates the swap request, generates the swap content, and processes the swap transaction accordingly. If the swap involves native tokens, it handles the swap to or from native AVAX.

#### Examples
- User: "Swap 1 AVAX for USDC"
- User: "Swap 10 USDC for gmYAK"

### DEPOSIT_TO_STRATEGY
Deposit tokens into a yield-earning strategy.

#### Properties
- Name: DEPOSIT_TO_STRATEGY
- Similes: ["DEPOSIT_FOR_YIELD", "DEPOSIT_TOKENS"]

#### Handler
The handler for DEPOSIT_TO_STRATEGY action validates the Avalanche configuration, composes the context for the strategy, generates content, validates the content, and performs the deposit process.

#### Examples
- User: User
  - Text: Deposit 1 USDC into the strategy

- User: User
  - Text: Deposit 10 gmYAK to earn yield



### Providers
### tokens
A provider that retrieves and formats a list of available tokens and their addresses.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import {
    IAgentRuntime,
    Memory,
    Provider,
    State,
    elizaLogger,
} from "@elizaos/core";
import { TOKEN_ADDRESSES } from "../utils/constants";

const tokensProvider: Provider = {
    get: async (_runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        elizaLogger.debug("tokensProvider::get");
        const tokens = Object.entries(TOKEN_ADDRESSES)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        return `The available tokens and their addresses are:\n${tokens}`;
    },
};

export { tokensProvider };
```

### Strategies Provider
Provides functionality to get a list of available strategy addresses and their deposit tokens.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import {
    IAgentRuntime,
    Memory,
    Provider,
    State,
    elizaLogger,
} from "@elizaos/core";
import { STRATEGY_ADDRESSES } from "../utils/constants";

const strategiesProvider: Provider = {
    get: async (_runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        elizaLogger.debug("strategiesProvider::get");
        const strategies = Object.entries(STRATEGY_ADDRESSES)
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");
        return `The available strategy addresses and their deposit tokens are:\n${strategies}`;
    },
};

export { strategiesProvider };
```

### wallet
This provider is responsible for fetching wallet balances and token balances for a given account.

#### Methods
Focus on the get() method and its functionality.

#### Usage
```typescript
import {
    IAgentRuntime,
    Memory,
    Provider,
    State,
    elizaLogger,
} from "@elizaos/core";
import { formatUnits } from "viem";
import { getAccount, getDecimals, getTokenBalance } from "../utils";
import { STRATEGY_ADDRESSES, TOKEN_ADDRESSES } from "../utils/constants";

const walletProvider: Provider = {
    get: async (runtime: IAgentRuntime, _message: Memory, _state?: State) => {
        elizaLogger.debug("walletProvider::get");
        const privateKey = runtime.getSetting("AVALANCHE_PRIVATE_KEY");
        if (!privateKey) {
            throw new Error(
                "AVALANCHE_PRIVATE_KEY not found in environment variables"
            );
        }

        const account = getAccount(runtime);

        let output = `# Wallet Balances\n\n`;
        output += `## Wallet Address\n\n\`${account.address}\`\n\n`;

        output += `## Latest Token Balances\n\n`;
        for (const [token, address] of Object.entries(TOKEN_ADDRESSES)) {
            const decimals = await getDecimals(runtime, address);
            const balance = await getTokenBalance(
                runtime,
                address,
                account.address
            );
            output += `${token}: ${formatUnits(balance, decimals)}\n`;
        }
        output += `Note: These balances can be used at any time.\n\n`;

        output += `## Balances in Yield Strategies\n\n`;
        for (const [strategy, address] of Object.entries(STRATEGY_ADDRESSES)) {
            const balance = await getTokenBalance(
                runtime,
                address,
                account.address
            );
            const decimals = await getDecimals(runtime, address);
            output += `${strategy}: ${formatUnits(balance, decimals)}\n`;
        }
        output += `Note: These balances must be withdrawn from the strategy before they can be used.\n\n`;

        elizaLogger.debug("walletProvider::get output:", output);
        return output;
    },
};

export { walletProvider };
```



### Evaluators
No evaluators documentation available.

## Usage Examples
### actions/tokenMillCreate.ts

### Common Use Cases
1. Create a new token mill with the provided name and symbol.
```typescript
import { TokenMillCreateContent, isTokenMillCreateContent } from './actions/tokenMillCreate';

const newTokenMill: TokenMillCreateContent = {
  name: "ExampleTokenMill",
  symbol: "ETM"
};

if (isTokenMillCreateContent(runtime, newTokenMill)) {
  // Create a new token mill using newTokenMill object
} else {
  console.log("Invalid token mill creation content");
}
```

2. Validate the content object before creating a new token mill.
```typescript
import { TokenMillCreateContent, isTokenMillCreateContent } from './actions/tokenMillCreate';

const invalidTokenMill: any = {
  name: "InvalidTokenMill"
};

if (isTokenMillCreateContent(runtime, invalidTokenMill)) {
  // Create a new token mill using invalidTokenMill object
} else {
  console.log("Invalid token mill creation content");
}
```

### Best Practices
- Always validate the content object using `isTokenMillCreateContent` function before creating a new token mill to ensure the data is in the correct format.
- Use the Interfaces provided to maintain consistency and ensure all required properties are present when creating a new token mill.

### actions/transfer.ts

### Common Use Cases
1. Transfer tokens from one user to another:
```typescript
import { isTransferContent } from './actions/transfer';

const transferDetails = {
  tokenAddress: '0x123abc',
  recipient: '0x456def',
  amount: 100
};

if (isTransferContent(runtime, transferDetails)) {
  // Perform transfer operation
} else {
  console.log('Invalid transfer details');
}
```

2. Validate transfer details before initiating a transaction:
```typescript
import { isTransferContent } from './actions/transfer';

const invalidTransfer = {
  tokenAddress: '0x123abc',
  amount: 'invalid amount'
};

if (isTransferContent(runtime, invalidTransfer)) {
  // Perform transfer operation
} else {
  console.log('Invalid transfer details');
}
```

### Best Practices
- Ensure to provide all required fields in the transfer details object to accurately validate the transfer content.
- Handle the return value of isTransferContent function appropriately based on the validation result to prevent unexpected behavior in the code.

### actions/yakStrategy.ts

### Common Use Cases
1. Checking if a given content is of type StrategyContent:
```typescript
import { isStrategyContent } from './actions/yakStrategy';

const content = {
  depositTokenAddress: '0x123abc',
  strategyAddress: '0x456def',
  amount: '100'
};

const isStrategy = isStrategyContent(content);
console.log(isStrategy); // Output should be true
```

2. Using StrategyContent interface to define strategy related data:
```typescript
import { StrategyContent } from './interfaces/yakInterfaces';

const strategyData: StrategyContent = {
  depositTokenAddress: '0x789ghi',
  strategyAddress: '0x101jkl',
  amount: 200
};

console.log(strategyData.strategyAddress); // Output: 0x101jkl
```

### Best Practices
- When using the `isStrategyContent` function, always make sure to pass a valid `content` object to avoid any runtime errors.
- Ensure that the properties of the `StrategyContent` interface are properly assigned when creating objects of this type.

### actions/yakSwap.ts

### Common Use Cases
1. **First use case with code example:**
   This code can be used to check if a given content object is of type SwapContent. This can be useful when processing different types of content and performing specific actions based on the content type.

   **Example:**
   ```javascript
   const content = {
       fromTokenAddress: '0x123ABC',
       toTokenAddress: '0x456DEF',
       amount: 100
   };

   const isSwap = isSwapContent(runtime, content);
   console.log(isSwap); // Output: false
   ```

2. **Second use case with code example:**
   Another use case for this code is to ensure that the content object passed to a function meets the required structure for a swap operation. By checking the content using isSwapContent, you can avoid errors or unexpected behavior during the swap process.

   **Example:**
   ```javascript
   const content = {
       fromTokenAddress: '0x123ABC',
       toTokenAddress: '0x456DEF',
       amount: 100,
       recipient: '0x789GHI'
   };

   const isSwap = isSwapContent(runtime, content);
   console.log(isSwap); // Output: true
   ```

### Best Practices
- **Best practice 1:**
  It is recommended to always use isSwapContent to validate the content object before performing any swap actions. This helps ensure that the content is in the expected format and avoids potential errors.

- **Best practice 2:**
  When implementing swap functionality in your application, define and use the SwapContent interface to maintain consistency and clarity in the structure of swap content objects. This can improve code readability and maintainability.

### types/index.ts

### Common Use Cases
1. Creating a YakSwapQuote object:
```typescript
import { YakSwapQuote, Address } from './types';

const quote: YakSwapQuote = {
    amounts: [100, 200, 300],
    adapters: ['0x123', '0x456'],
    path: ['0xabc', '0xdef'],
    gasEstimate: 50000
};
```

2. Defining TokenMillMarketCreationParameters:
```typescript
import { TokenMillMarketCreationParameters, Address } from './types';

const marketParams: TokenMillMarketCreationParameters = {
    tokenType: 1,
    name: 'MyToken',
    symbol: 'MT',
    quoteToken: '0x789',
    totalSupply: 1000000,
    creatorShare: 0.1,
    stakingShare: 0.2,
    bidPrices: [50, 60, 70],
    askPrices: [40, 50, 60],
    args: 'Additional arguments here'
};
```

### Best Practices
- When using interfaces like YakSwapQuote or TokenMillMarketCreationParameters, make sure to provide values for all required properties to ensure the object is properly defined.
- Use meaningful variable names when creating objects based on these interfaces to improve code readability.

### environment.ts

### Common Use Cases
1. Load and validate Avalanche configuration settings from a runtime environment.
```typescript
import { validateAvalancheConfig, IAgentRuntime } from './environment';

const runtime: IAgentRuntime = // retrieve runtime environment object
validateAvalancheConfig(runtime)
  .then((avalancheConfig) => {
    // Use the validated Avalanche configuration object
  })
  .catch((error) => {
    console.error('Error validating Avalanche configuration:', error);
  });
```

2. Perform additional operations with the validated Avalanche configuration object.
```typescript
import { validateAvalancheConfig, IAgentRuntime } from './environment';

const runtime: IAgentRuntime = // retrieve runtime environment object
validateAvalancheConfig(runtime)
  .then((avalancheConfig) => {
    // Use the validated Avalanche configuration object
    const { network, node } = avalancheConfig;
    // Perform additional operations with network and node configuration
  })
  .catch((error) => {
    console.error('Error validating Avalanche configuration:', error);
  });
```

### Best Practices
- Ensure to handle errors when validating the Avalanche configuration settings to prevent any unexpected behavior in the application.
- Always use the validated Avalanche configuration object in a safe and consistent manner throughout the application to maintain data integrity.

## API Reference
### actions/tokenMillCreate.ts

#### Interfaces

##### TokenMillCreateContent

```
/**
 * Interface representing the structure of the content required to create a new token mill.
 * Inherits properties from Content interface.
 * @property {string} name - The name of the token mill.
 * @property {string} symbol - The symbol of the token mill.
 */
```

#### Functions

##### isTokenMillCreateContent

```
/**
 * Checks if the provided content is a valid TokenMillCreateContent object.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content is a valid TokenMillCreateContent object, false otherwise.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Represents the details of a transfer transaction of specific content.
 * @interface TransferContent
 * @extends Content
 * @property {string} tokenAddress - The address of the token used for the transfer.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to be transferred, can be a string or number.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Checks if the provided content matches the structure of a TransferContent object.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content matches the TransferContent structure, otherwise false.
 */
```


### actions/yakStrategy.ts

#### Interfaces

##### StrategyContent

```
/**
 * Interface representing the content for a strategy.
 * @extends Content
 * @property {string} depositTokenAddress - The address of the deposit token.
 * @property {string} strategyAddress - The address of the strategy.
 * @property {string | number} amount - The amount associated with the strategy content.
 */
```

#### Functions

##### isStrategyContent

```
/**
 * Checks if the provided content is of type StrategyContent.
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content is of type StrategyContent, false otherwise.
 */
```


### actions/yakSwap.ts

#### Interfaces

##### SwapContent

```
/**
 * Interface for defining the swap content information.
 * Extends from the Content interface.
 * @typedef {object} SwapContent
 * @property {string} fromTokenAddress - The address of the token to swap from.
 * @property {string} toTokenAddress - The address of the token to swap to.
 * @property {string} [recipient] - Optional recipient address.
 * @property {string|number} amount - The amount of tokens to swap.
 */
```

#### Functions

##### isSwapContent

```
/**
 * Check if the provided content is of type SwapContent.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {any} content - The content to check.
 * @returns {boolean} - True if the content is of type SwapContent, false otherwise.
 */
```


### types/index.ts

#### Interfaces

##### YakSwapQuote

```
/**
 * Interface representing a YakSwapQuote
 * @property {bigint[]} amounts - An array of amounts
 * @property {Address[]} adapters - An array of addresses
 * @property {Address[]} path - An array of addresses
 * @property {bigint} gasEstimate - The gas estimate
 */
```

##### TokenMillMarketCreationParameters

```
/**
 * Interface for defining parameters required for creating a TokenMill market.
 * @typedef {Object} TokenMillMarketCreationParameters
 * @property {number} tokenType - Type of the token.
 * @property {string} name - Name of the token.
 * @property {string} symbol - Symbol of the token.
 * @property {Address} quoteToken - Address of the quote token.
 * @property {bigint} totalSupply - Total supply of the token.
 * @property {number} creatorShare - Creator's share in the market.
 * @property {number} stakingShare - Staking share in the market.
 * @property {bigint[]} bidPrices - Array of bid prices.
 * @property {bigint[]} askPrices - Array of ask prices.
 * @property {string} args - Additional arguments.
 */
```


### environment.ts

#### Types

##### AvalancheConfig

```
/**
 * Type definition for AvalancheConfig, inferred from the avalancheEnvSchema.
 */
```

#### Functions

##### validateAvalancheConfig

```
/**
 * Validates the Avalanche configuration settings and returns a valid Avalanche configuration object.
 * @param {IAgentRuntime} runtime - The runtime environment to retrieve settings from.
 * @returns {Promise<AvalancheConfig>} The validated Avalanche configuration.
 */
```


## Development

### TODO Items
- [First TODO item]
   - Context: Get gas price from runtime
   - Type: Enhancement

- [Second TODO item]
   - Context: Update the gas price parameter in the function call to find the best path with gas
   - Type: Bug

### Troubleshooting
### Common Issues
1. Issue: Unable to validate Avalanche configuration.
   - Cause: Missing or invalid Avalanche private key setting.
   - Solution: Ensure that the `AVALANCHE_PRIVATE_KEY` setting is properly configured either in the runtime settings or as an environment variable.

### Debugging Tips
- Check if the provided content matches the required interfaces.
- Validate the Avalanche configuration for any errors.

### FAQ
Q: How to check if the provided content is valid for creating a new token mill?
A: You can use the `isTokenMillCreateContent` function to validate if the content meets the structure of `TokenMillCreateContent`. Example:
   ```typescript
   const isValid = isTokenMillCreateContent(runtime, content);
   if (isValid) {
       // Content is valid for creating a new token mill
   } else {
       // Content does not match the required structure
   }
   ```