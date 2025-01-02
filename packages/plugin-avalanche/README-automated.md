# @elizaos/plugin-avalanche Documentation

## Overview
### Purpose
The purpose of the @elizaos/plugin-avalanche package is to provide interfaces, types, and functions for creating and managing various content and transactions related to the Avalanche blockchain. It includes interfaces for creating token mill content, transferring tokens, defining strategies, and executing swap transactions. Additionally, it offers functions for checking content formats and validating Avalanche configurations.

### Key Features

- **TokenMillCreateContent Interface**: Represents the structure for creating new token mill content.
- **TransferContent Interface**: Defines the content required for transferring tokens.
- **StrategyContent Interface**: Represents the content of a strategy in a protocol.
- **SwapContent Interface**: Contains the content of a swap transaction.
- **YakSwapQuote Interface**: Represents a YakSwapQuote object.
- **TokenMillMarketCreationParameters Interface**: Defines the parameters for creating a TokenMill market.
- **AvalancheConfig Type**: Represents the configuration type for Avalanche.
- **Validation Functions**: Includes functions to check content formats and validate Avalanche configurations.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-avalanche

### 1. Add the plugin to your ElizaOS project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-avalanche": "workspace:*"
    }
  }
  ```
- Run the following commands:
  1. cd agent/
  2. pnpm install
  3. pnpm build

### 2. Import and use the plugin:
- Import the plugin using: `import { avalanchePlugin } from "@elizaos/plugin-avalanche";`
- Add it to the AgentRuntime plugins array

### 3. Integration example:
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
Ensure you see ["✓ Registering action: <plugin actions>"] in the console for successful integration.

Note: This plugin requires the "whatwg-url" peer dependency version 7.1.0 to be installed separately.

## Configuration
# Configuration Documentation

## Required Environment Variables
- `AVALANCHE_PRIVATE_KEY`: This environment variable is used to store the private key for accessing the Avalanche network.

## .env Example File
```plaintext
AVALANCHE_PRIVATE_KEY=your_private_key_here
```

To configure the application, create a `.env` file in the root directory of your project and add the above environment variables with their respective values. Make sure to keep the `.env` file private and do not commit it to your repository by adding it to the `.gitignore` file.

## Features

### Actions
### Okay
When the user agrees or gives permission to proceed with a task or action.

#### Properties
- Name: Okay
- Similes: [list of similes]

#### Handler
The handler responds to the user's confirmation and carries out the action as requested.

#### Examples
Agent: Are you ready to proceed with your order?
User: Okay

### SEND_TOKEN
Sends a token or transfers a token on the Avalanche network.

#### Properties
- Name: SEND_TOKEN
- Similes: TRANSFER_TOKEN_ON_AVALANCHE, TRANSFER_TOKENS_ON_AVALANCHE, SEND_TOKENS_ON_AVALANCHE, SEND_AVAX_ON_AVALANCHE, PAY_ON_AVALANCHE

#### Handler
The handler processes the request to send or transfer a token on the Avalanche network. It validates the transfer request, composes the transfer context, generates transfer content, and initiates the token transfer based on the provided details.

#### Examples
- User {{user1}}: "Send 10 AVAX to 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"

### SWAP_TOKEN
Allows the user to swap tokens.

#### Properties
- Name: SWAP_TOKEN
- Similes: TRADE_TOKEN, BUY_TOKEN, SELL_TOKEN

#### Handler
This handler processes the user's request to swap tokens. It validates the request, generates the swap content, gets a quote for the swap, and performs the swap transaction. 

#### Examples
- User: "Swap 1 AVAX for USDC"
- User: "Swap 10 USDC for gmYAK"

### DEPOSIT_TO_STRATEGY
This action is used when the user requests to deposit into a yield-earning strategy.

#### Properties
- Name: DEPOSIT_TO_STRATEGY
- Similes: DEPOSIT_FOR_YIELD, DEPOSIT_TOKENS

#### Handler
The handler for DEPOSIT_TO_STRATEGY action checks if the provided content is a valid deposit request. It then processes the deposit by approving the token, depositing it into the strategy, and logging the transaction details.

#### Examples
- User: User  
  Example: Deposit 1 USDC into the strategy

- User: User  
  Example: Deposit 10 gmYAK to earn yield



### Providers
### tokens
The `tokens` provider is responsible for fetching and displaying available tokens and their addresses.

#### Methods
Focus on the `get()` method and its functionality.

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
The strategies provider fetches available strategy addresses and their deposit tokens.

#### Methods
Focus on the `get()` method and its functionality.

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

### Wallet Provider
This provider is responsible for fetching wallet balances for the user.

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
1. Creating a new token mill content:
```typescript
const newTokenMillContent: TokenMillCreateContent = {
  name: "MyTokenMill",
  symbol: "MTM"
};

if(isTokenMillCreateContent(runtime, newTokenMillContent)){
  // Proceed with creating the token mill content
} else {
  console.log("Invalid token mill content format");
}
```

2. Validating existing content as TokenMillCreateContent:
```typescript
const existingContent = {
  name: "AnotherTokenMill",
  symbol: "ATM"
};

if(isTokenMillCreateContent(runtime, existingContent)){
  // Existing content is in the correct format for a token mill
} else {
  console.log("Existing content does not match the TokenMillCreateContent format");
}
```

### Best Practices
- Use TypeScript to ensure type checking and catch any potential errors at compile time.
- Follow the naming convention for functions and interfaces to enhance code readability and maintainability.

### actions/transfer.ts

### Common Use Cases
1. Transferring tokens to another address:
```typescript
const content: TransferContent = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  recipient: "0x1111111111111111111111111111111111111111",
  amount: "100"
};

if (isTransferContent(runtime, content)) {
  // Perform token transfer
} else {
  console.error("Invalid transfer content");
}
```

2. Validating transfer content before executing transfer:
```typescript
const invalidContent: TransferContent = {
  tokenAddress: "0x0000000000000000000000000000000000000000",
  recipient: "invalidAddress",
  amount: "100"
};

if (isTransferContent(runtime, invalidContent)) {
  // Perform token transfer
} else {
  console.error("Invalid transfer content");
}
```

### Best Practices
- Ensure that the `content` object passed to the `isTransferContent` function adheres to the `TransferContent` interface to avoid errors.
- Utilize the boolean return value of `isTransferContent` to handle cases where invalid transfer content is provided.

### actions/yakStrategy.ts

### Common Use Cases
1. Checking if a given content is of type StrategyContent using the `isStrategyContent` function:
```typescript
import { isStrategyContent } from './actions/yakStrategy';

const runtime = /* initialize runtime object */;
const content = {
  depositTokenAddress: '0x123...',
  strategyAddress: '0x456...',
  amount: '100'
};

const isStrategy = isStrategyContent(runtime, content);
console.log(isStrategy); // Output: true
```

2. Implementing a function that processes only StrategyContent data:
```typescript
import { StrategyContent } from './actions/yakStrategy';

function processStrategyContent(content: StrategyContent) {
  // Process strategy content here
}
```

### Best Practices
- Ensure to validate the content before passing it to functions that expect StrategyContent to prevent errors.
- Document the expected structure of StrategyContent for better code readability and maintainability.

### actions/yakSwap.ts

### Common Use Cases

1. **Use Case 1: Verify if provided content is of type SwapContent**
   
   ```typescript
   import { isSwapContent } from 'actions/yakSwap';
   
   const content = {
       fromTokenAddress: '0x123abc',
       toTokenAddress: '0x456def',
       amount: 100
   };
   
   const isSwap = isSwapContent(runtime, content);
   console.log(isSwap); // Output: true
   ```

2. **Use Case 2: Perform a swap transaction using SwapContent**
   
   ```typescript
   import { performSwap } from 'actions/yakSwap';
   
   const swapData = {
       fromTokenAddress: '0x123abc',
       toTokenAddress: '0x456def',
       amount: 100,
       recipient: '0x789ghi'
   };
   
   const success = performSwap(runtime, swapData);
   console.log(success); // Output: true (if transaction successful)
   ```

### Best Practices

- **Best Practice 1: Validate input content**
  
  It is recommended to always validate the input content before performing any operations to ensure data integrity and prevent errors.

- **Best Practice 2: Handle errors gracefully**
  
  Implement error handling mechanisms to gracefully handle any failures that may occur during swap transactions. This can help improve the overall reliability of the application.

### types/index.ts

### Common Use Cases
1. Creating a YakSwapQuote object with the provided interface:
```typescript
const quote: YakSwapQuote = {
    amounts: [100, 200, 300],
    adapters: ['0x123...', '0x456...'],
    path: ['0x789...', '0x987...'],
    gasEstimate: 100000
};
```

2. Using TokenMillMarketCreationParameters interface for creating a TokenMill market:
```typescript
const marketParams: TokenMillMarketCreationParameters = {
    tokenType: 0,
    name: 'MyToken',
    symbol: 'MT',
    quoteToken: '0xabc...',
    totalSupply: 1000000,
    creatorShare: 0.1,
    stakingShare: 0.2,
    bidPrices: [200, 250, 300],
    askPrices: [150, 180, 210],
    args: 'Additional arguments here'
};
```

### Best Practices
- Ensure that you provide valid data types as per the interface definition.
- Use the provided interfaces to maintain consistency and avoid errors in your code.

### environment.ts

### Common Use Cases
1. Validating Avalanche configuration settings within a Node.js runtime environment.
```typescript
import { IAgentRuntime } from './types';
import { validateAvalancheConfig, AvalancheConfig } from './environment';

const runtime: IAgentRuntime = {
  settings: {
    AVALANCHE_PRIVATE_KEY: 'myPrivateKey123'
  }
};

validateAvalancheConfig(runtime)
  .then((config: AvalancheConfig) => {
    console.log('Avalanche configuration validated:', config);
  })
  .catch((error: Error) => {
    console.error('Error validating Avalanche configuration:', error);
  });
```

2. Automatically validating Avalanche configuration based on environment variables.
```typescript
import { validateAvalancheConfig, AvalancheConfig } from './environment';

validateAvalancheConfig(process.env)
  .then((config: AvalancheConfig) => {
    console.log('Avalanche configuration validated:', config);
  })
  .catch((error: Error) => {
    console.error('Error validating Avalanche configuration:', error);
  });
```

### Best Practices
- Ensure that the input data provided to `validateAvalancheConfig` follows the expected structure defined in the `IAgentRuntime` interface.
- Handle any potential errors thrown by the validation process using proper error-handling mechanisms.

## API Reference
### File: `actions/tokenMillCreate.ts`
#### Interfaces

##### `TokenMillCreateContent`

```typescript
/**
 * Interface for creating a new token mill content.
 * @interface
 * @extends Content
 * @property {string} name - The name of the content.
 * @property {string} symbol - The symbol of the content.
 */
```

**Implementation:**

```typescript
export interface TokenMillCreateContent extends Content {
    name: string;
    symbol: string;
}
```

#### Functions

##### `isTokenMillCreateContent`

```typescript
/**
 * Check if the given content is in the format of TokenMillCreateContent
 * 
 * @param {IAgentRuntime} runtime - The runtime object
 * @param {any} content - The content to be checked
 * @returns {boolean} - Returns true if the content is TokenMillCreateContent, false otherwise
 */
```

**Implementation:**

```typescript
function isTokenMillCreateContent(
    runtime: IAgentRuntime,
    content: any
): content is TokenMillCreateContent {
    elizaLogger.debug("Content for create", content);
    return (
        typeof content.name === "string" && typeof content.symbol === "string"
    );
}
```
### File: `actions/transfer.ts`
#### Interfaces

##### `TransferContent`

```typescript
/**
 * Interface representing content to transfer.
 * @interface
 * @extends Content
 * @property {string} tokenAddress - The address of the token to transfer.
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer (can be either a string or number).
 */
```

**Implementation:**

```typescript
export interface TransferContent extends Content {
    tokenAddress: string;
    recipient: string;
    amount: string | number;
}
```

#### Functions

##### `isTransferContent`

```typescript
/**
 * Checks if the provided content is a TransferContent object.
 *
 * @param {IAgentRuntime} runtime - The runtime object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} - Returns true if the content is a TransferContent object, false otherwise.
 */
```

**Implementation:**

```typescript
function isTransferContent(
    runtime: IAgentRuntime,
    content: any
): content is TransferContent {
    elizaLogger.debug("Content for transfer", content);
    return (
        typeof content.tokenAddress === "string" &&
        typeof content.recipient === "string" &&
        (typeof content.amount === "string" ||
            typeof content.amount === "number")
    );
}
```
### File: `actions/yakStrategy.ts`
#### Interfaces

##### `StrategyContent`

```typescript
/**
 * Interface representing the content of a strategy in a protocol.
 * @interface StrategyContent
 * @extends Content
 * @property {string} depositTokenAddress - The address of the token to be deposited in the strategy
 * @property {string} strategyAddress - The address of the strategy contract
 * @property {string | number} amount - The amount to be deposited in the strategy (can be string or number)
 */
```

**Implementation:**

```typescript
export interface StrategyContent extends Content {
    depositTokenAddress: string;
    strategyAddress: string;
    amount: string | number;
}
```

#### Functions

##### `isStrategyContent`

```typescript
/**
 * Check if the given content is of type StrategyContent.
 *
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {any} content - The content to check.
 * @returns {boolean} - True if the content is of type StrategyContent, false otherwise.
 */
```

**Implementation:**

```typescript
function isStrategyContent(
    runtime: IAgentRuntime,
    content: any
): content is StrategyContent {
    elizaLogger.debug("Content for strategy", content);
    return (
        typeof content.depositTokenAddress === "string" &&
        typeof content.strategyAddress === "string" &&
        (typeof content.amount === "string" ||
            typeof content.amount === "number")
    );
}
```
### File: `actions/yakSwap.ts`
#### Interfaces

##### `SwapContent`

```typescript
/**
 * Interface representing the content of a swap transaction.
 * Extends Content interface.
 * @property {string} fromTokenAddress - The address of the token being swapped from.
 * @property {string} toTokenAddress - The address of the token being swapped to.
 * @property {string} [recipient] - Optional recipient address for the swap.
 * @property {string | number} amount - The amount of tokens being swapped.
 */
```

**Implementation:**

```typescript
export interface SwapContent extends Content {
    fromTokenAddress: string;
    toTokenAddress: string;
    recipient?: string;
    amount: string | number;
}
```

#### Functions

##### `isSwapContent`

```typescript
/**
 * Check if the provided content is of type SwapContent.
 * 
 * @param {IAgentRuntime} runtime - The Agent Runtime object.
 * @param {any} content - The content to be checked.
 * @returns {boolean} Returns true if the content is of type SwapContent, false otherwise.
 */
```

**Implementation:**

```typescript
function isSwapContent(
    runtime: IAgentRuntime,
    content: any
): content is SwapContent {
    elizaLogger.debug("Content for swap", content);
    return (
        typeof content.fromTokenAddress === "string" &&
        typeof content.toTokenAddress === "string" &&
        (typeof content.recipient === "string" || !content.recipient) &&
        (typeof content.amount === "string" ||
            typeof content.amount === "number")
    );
}
```
### File: `types/index.ts`
#### Interfaces

##### `YakSwapQuote`

```typescript
/**
 * Interface representing a YakSwapQuote object.
 * @typedef {Object} YakSwapQuote
 * @property {bigint[]} amounts - Array of amounts for the swap.
 * @property {Address[]} adapters - Array of adapter addresses used for the swap.
 * @property {Address[]} path - Array of addresses representing the swap path.
 * @property {bigint} gasEstimate - Gas estimate for the swap.
 */
```

**Implementation:**

```typescript
interface YakSwapQuote {
    amounts: bigint[];
    adapters: Address[];
    path: Address[];
    gasEstimate: bigint;
}
```

##### `TokenMillMarketCreationParameters`

```typescript
/**
 * Interface representing the parameters required for creating a TokenMill market.
 * @typedef {object} TokenMillMarketCreationParameters
 * @property {number} tokenType - The type of the token.
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {Address} quoteToken - The address of the quote token.
 * @property {bigint} totalSupply - The total supply of the token.
 * @property {number} creatorShare - The share for the creator.
 * @property {number} stakingShare - The share for staking.
 * @property {bigint[]} bidPrices - The bid prices for the market.
 * @property {bigint[]} askPrices - The ask prices for the market.
 * @property {string} args - Additional arguments for the market creation.
 */
```

**Implementation:**

```typescript
interface TokenMillMarketCreationParameters {
    tokenType: number;
    name: string;
    symbol: string;
    quoteToken: Address;
    totalSupply: bigint;
    creatorShare: number;
    stakingShare: number;
    bidPrices: bigint[];
    askPrices: bigint[];
    args: string;
}
```
### File: `environment.ts`
#### Types

##### `AvalancheConfig`

```typescript
/**
 * Represents the type of configuration for Avalanche based on the schema inferred from avalancheEnvSchema.
 */
```

**Implementation:**

```typescript
export type AvalancheConfig = z.infer<typeof avalancheEnvSchema>;
```

#### Functions

##### `validateAvalancheConfig`

```typescript
/**
 * Validates the Avalanche configuration by extracting the AVALANCHE_PRIVATE_KEY from the runtime settings or environment variables
 * and then parsing and validating the configuration using the avalancheEnvSchema.
 * 
 * @param {IAgentRuntime} runtime The runtime environment containing settings and variables
 * @returns {Promise<AvalancheConfig>} The validated Avalanche configuration
 * @throws {Error} If the configuration does not match the schema, an error with detailed messages is thrown
 */
```

**Implementation:**

```typescript
export async function validateAvalancheConfig(
    runtime: IAgentRuntime
): Promise<AvalancheConfig> {
    try {
        const config = {
            AVALANCHE_PRIVATE_KEY:
                runtime.getSetting("AVALANCHE_PRIVATE_KEY") ||
                process.env.AVALANCHE_PRIVATE_KEY,
        };

        return avalancheEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(errorMessages);
        }
        throw error;
    }
}
```

## Development

### TODO Items
### Items
1. TODO: get gas price from runtime
   - Context: This todo is related to the code that calls the `findBestPathWithGas` function on the `publicClient` object. It involves retrieving the gas price from the runtime to be used as an input parameter.
   - Type: Enhancement

No todos found in the code

### Troubleshooting
### Common Issues
1. Interface not recognized when imported
   - Cause: Incorrect import path or missing export statement
   - Solution: Double-check the import path and ensure the interface is properly exported

### Debugging Tips
- Verify correct import statements
- Ensure interface has been exported correctly
- Ask your questions at https://eliza.gg/ 🚀 or in our discord

### FAQ
Q: How do I check if content is in the format of TokenMillCreateContent?
A: You can use the `isTokenMillCreateContent` function provided in the `tokenMillCreate.ts` file to check the content format and return a boolean value. 

For more specific questions or debugging, feel free to reach out to our support channels.