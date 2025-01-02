# @elizaos/plugin-starknet Documentation

## Overview

### Purpose
@elizaos/plugin-starknet is a comprehensive package that provides classes and interfaces for interacting with the blockchain, managing trust scores, ERC20 tokens, caching data, and various other functionalities related to blockchain operations. The package aims to simplify and streamline blockchain interactions, token management, and trade-related operations for developers.

### Key Features

The package includes the following code components:

Classes:
1. WalletProvider: Manages interactions with the blockchain to fetch wallet portfolio and token USD values.
2. TokenProvider: Handles token-related functionalities.
3. TrustScoreManager: Manages trust score calculation and storage for different entities.
4. ERC20Token: Represents an ERC20 token with methods for interacting with the token contract.
5. Cache: Stores data with a specified time-to-live (TTL).

Interfaces:
1. SubdomainCreationContent: Content needed to create a subdomain.
2. SwapContent: Details required for a token swap.
3. Order: Represents an order in the system.
4. TransferContent: Interface for transferring content.
5. DeployTokenContent: Interface for deploying a token contract.
6. TradeData: Represents trade data.
7. sellDetails: Details of a sale.
8. _RecommendationGroup: Interface for a recommendation group.
9. RecommenderData: Data for a recommender.
10. TokenRecommendationSummary: Summary of token recommendations.
11. TokenMetrics: Token metrics interface.
12. TradingThresholds: Trading thresholds for a specific asset.
13. HolderAnalysisParams: Parameters for analyzing token holders.
14. HolderAnalysisResult: Result of an analysis on token holders.
15. QuoteRequest: Quote request interface.
16. Quote: Interface representing a Quote object.

These classes and interfaces offer a robust set of functionalities for blockchain management and trade-related operations, making @elizaos/plugin-starknet a valuable asset for developers working with blockchain technologies.

## Installation
## Installation and Integration Instructions for @elizaos/plugin-starknet

### 1. Adding the Plugin to Your ElizaOS Project:
- Add the following to your agent/package.json dependencies:
  ```json
  {
    "dependencies": {
      "@elizaos/plugin-starknet": "workspace:*"
    }
  }
  ```
- Then, follow these steps:
  1. cd into the agent/ directory
  2. Run `pnpm install` to install the new dependency
  3. Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:
- Import the plugin using: `import { starknetPlugin } from "@elizaos/plugin-starknet";`
- Add it to the AgentRuntime plugins array in your project configuration

### 3. Integration Example:
```typescript
import { starknetPlugin } from "@elizaos/plugin-starknet";

return new AgentRuntime({
    // other configuration...
    plugins: [
        starknetPlugin,
        // other plugins...
    ],
});
```

### 4. Verification Steps:
- Ensure that you see ["✓ Registering action: <plugin actions>"] in the console after integration

Remember that this plugin is a workspace package and needs to be added to agent/package.json before building the project.

## Configuration
# Configuration Documentation

## Required Environment Variables and Their Purpose

1. **STARKNET_ADDRESS**: Defines the StarkNet address that will be used for the application.
2. **STARKNET_PRIVATE_KEY**: Specifies the private key of the StarkNet address for authentication purposes.
3. **STARKNET_RPC_URL**: Sets the URL for the StarkNet RPC server. If not provided, a default URL will be used.
4. **STARKNETID_NAMING_CONTRACT**: Specifies the naming contract for StarkNetID services.
5. **STARKNETID_IDENTITY_CONTRACT**: Specifies the identity contract for StarkNetID functionalities.

## Example .env File

```
STARKNET_ADDRESS=0x1234567890abcdef
STARKNET_PRIVATE_KEY=abcdef1234567890
STARKNET_RPC_URL=https://rpc.starknet.io
STARKNETID_NAMING_CONTRACT=0xabcdef1234567890
STARKNETID_IDENTITY_CONTRACT=0x0987654321fedcba
```

**Note:** Update the values of the environment variables in the .env file with your specific configurations.

Don't forget to add the .gitignore file to ensure the .env file is not committed to the repository.

## Features

### Actions
### EXECUTE_STARKNET_SWAP
Perform a token swap on starknet. Use this action when a user asks you to swap tokens anything.

#### Properties
- Name: EXECUTE_STARKNET_SWAP
- Similes: 
    - STARKNET_SWAP_TOKENS
    - STARKNET_TOKEN_SWAP
    - STARKNET_TRADE_TOKENS
    - STARKNET_EXCHANGE_TOKENS

#### Handler
The handler for EXECUTE_STARKNET_SWAP action starts by validating the Starknet configuration. It then composes a context for the token swap based on the user's request and generates a response using a model of medium complexity. The handler then fetches a quote for the swap parameters and executes the swap on Starknet with a specified slippage. If successful, it logs the transaction hash and sends a completion message to the user.

#### Examples
- User: "Swap 10 ETH for LORDS"
- Agent: "Ok, I'll swap 10 ETH for LORDS"

- User: "Swap 100 $lords on starknet"
- Agent: "Ok, I'll swap 100 $lords on starknet"

- User: "Swap 0.5 BTC for LORDS"
- Agent: "Ok, I'll swap 0.5 BTC for LORDS"

### SEND_TOKEN
Initiate the transfer of tokens or cryptocurrencies on StarkNet.

#### Properties
- Name: SEND_TOKEN
- Similes: TRANSFER_TOKEN_ON_STARKNET, TRANSFER_TOKENS_ON_STARKNET, SEND_TOKENS_ON_STARKNET, SEND_ETH_ON_STARKNET, PAY_ON_STARKNET

#### Handler
Handles the initiation of token transfers on StarkNet based on the user's request.

#### Examples
- User: "Send 10 ETH to 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  Agent: "I'll transfer 10 ETH to that address right away. Let me process that for you."

- User: "Can you transfer 50 LORDS tokens to 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49?"
  Agent: "Executing transfer of 50 LORDS tokens to the specified address. One moment please."

- User: "Please send 0.5 BTC to 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac"
  Agent: "Got it, initiating transfer of 0.5 BTC to the provided address. I'll confirm once it's complete."

### DEPLOY_STARKNET_UNRUGGABLE_MEME_TOKEN
Deploy an Unruggable Memecoin on Starknet. Use this action when a user asks you to deploy a new token on Starknet.

#### Properties
- Name: DEPLOY_STARKNET_UNRUGGABLE_MEME_TOKEN
- Similes: 
    - DEPLOY_STARKNET_UNRUGGABLE_TOKEN
    - STARKNET_DEPLOY_MEMECOIN
    - STARKNET_CREATE_MEMECOIN

#### Handler
The handler for this action validates the Starknet configuration, composes the necessary context for deployment, generates the deployment object, and initiates the deployment process on Starknet. It also logs the token deployment information and launches the token on Ekubo for trading.

#### Examples
- User: "Deploy a new token called Lords with the symbol LORDS, owned by 0x024BA6a4023fB90962bDfc2314F3B94372aa382D155291635fc3E6b777657A5B and initial supply of 1000000000000000000 on Starknet"
  Agent: "Ok, I'll deploy the Lords token to Starknet"

- User: "Deploy the SLINK coin to Starknet"
  Agent: "Ok, I'll deploy your coin on Starknet"

- User: "Create a new coin on Starknet"
  Agent: "Ok, I'll create a new coin for you on Starknet"

### CREATE_SUBDOMAIN
Create a subdomain on StarkNet for a user.

#### Properties
- Name: CREATE_SUBDOMAIN
- Similes: CREATE_SUBDOMAIN_ON_STARKNET, SUBDOMAIN_ON_STARKNET, SUBDOMAIN_CREATION, SEND_SUBDOMAIN_ON_STARKNET

#### Handler
The handler for this action creates a subdomain on StarkNet based on the user's request. It validates the subdomain creation content, generates the transfer call, and executes the transfer to the specified recipient address. If successful, it notifies the user and completes the transfer process.

#### Examples
- User: "Send me subdomain.domain.stark to 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49"
- Agent: "I'll transfer subdomain.domain.stark to that address right away. Let me process that for you."



### Providers
No providers documentation available.

### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/portfolioProvider.ts

### Common Use Cases
1. Fetching wallet portfolio and token USD values:
```typescript
const walletProvider = new WalletProvider(runtime);
const walletPortfolio = await walletProvider.getWalletPortfolio();
const tokenUsdValues = await walletProvider.getTokenUsdValues();
```

2. Caching token balances and USD values for future use:
```typescript
const walletProvider = new WalletProvider(runtime);
const walletPortfolio = await walletProvider.getWalletPortfolio();
// Use the cached values for some time
const cachedTokenBalances = walletProvider.getCachedTokenBalances();
const cachedTokenUsdValues = walletProvider.getCachedTokenUsdValues();
```

### Best Practices
- Ensure to handle errors and edge cases gracefully in the methods to provide a robust user experience.
- Implement proper caching mechanisms to optimize API calls and improve performance.

### providers/token.ts

### Common Use Cases
1. Fetching token data and processing it for analysis:
```typescript
const tokenProvider = new TokenProvider(tokenAddress, walletProvider);
const tokenData = await tokenProvider.getProcessedTokenData();
```

2. Checking if a token should be traded based on various metrics:
```typescript
const tokenProvider = new TokenProvider(tokenAddress, walletProvider);
const shouldTrade = await tokenProvider.shouldTradeToken();
```

### Best Practices
- Ensure to handle errors appropriately when using asynchronous operations like fetching data or processing token information.
- Use the provided methods in a modular way to easily integrate them into different parts of your application for analyzing token data.

### providers/trustScoreProvider.ts

### Common Use Cases
1.
```typescript
import { TrustScoreManager } from './providers/trustScoreProvider';

const trustScoreManager = new TrustScoreManager();

// Update recommender metrics for a token
const tokenAddress = '0x123abc';
const recommenderId = '456def';
const { TokenPerformance, RecommenderMetrics } = trustScoreManager.updateRecommenderMetrics(tokenAddress, recommenderId);
```

2.
```typescript
import { TrustScoreManager } from './providers/trustScoreProvider';

const trustScoreManager = new TrustScoreManager();

// Generate trust score for a token and recommender
const tokenAddress = '0x123abc';
const recommenderId = '456def';
const { TokenPerformance, RecommenderMetrics } = trustScoreManager.generateTrustScore(tokenAddress, recommenderId, 'recommenderWalletAddress');
```

### Best Practices
- Ensure to provide valid token addresses and recommender IDs when using the trust score manager methods.
- Handle errors and exceptions gracefully when interacting with the trust score provider.

### utils/ERC20Token.ts

### Common Use Cases

1. Creating an instance of ERC20Token to interact with an ERC20 token contract:
```typescript
import { ERC20Token } from './utils/ERC20Token';

const tokenAddress = '0x1234...'; // address of the ERC20 token contract
const token = new ERC20Token(tokenAddress);
```

2. Checking the balance of a specific account:
```typescript
const accountAddress = '0x5678...'; // address of the account
const balance = await token.balanceOf(accountAddress);
console.log(balance); // output: 1000
```

### Best Practices

- **Best practice 1:** Always handle errors when calling async functions like balanceOf.
- **Best practice 2:** Use the provided types like ApproveCall and TransferCall to ensure type safety and accurate data representation.

### utils/cache.ts

- **First use case with code example:** Storing and retrieving data in a cache

```typescript
import { Cache } from './utils/cache';

// Create a new cache instance
const cache = new Cache();

// Set data in the cache
cache.set('key1', 'value1');

// Get data from the cache
const cachedData = cache.get('key1');
console.log(cachedData); // Output: value1
```

- **Second use case with code example:** Reading and writing cached data from/to a file

```typescript
import { Cache } from './utils/cache';

// Create a new cache instance
const cache = new Cache();

// Write data to a cache file
cache.writeCacheToFile('key2', { name: 'John', age: 30 });

// Read data from a cache file
const cachedData = cache.readCacheFromFile<{ name: string, age: number }>('key2');
console.log(cachedData); // Output: { name: 'John', age: 30 }
```

- **Best Practices:**
  - **Best practice 1:** Set an appropriate time-to-live (TTL) for cached data to avoid storing outdated information.
  - **Best practice 2:** Use cache keys that are easy to understand and unique to each piece of data to prevent conflicts.

### actions/subdomain.ts

### Common Use Cases
1. Creating a new subdomain:
```typescript
const newSubdomainContent: SubdomainCreationContent = {
  recipient: "example@example.com",
  subdomain: "newsubdomain"
};

if (isSubdomainCreation(newSubdomainContent)) {
  // Code to create a new subdomain
} else {
  console.log("Invalid content for subdomain creation");
}
```

2. Validating subdomain creation content:
```typescript
const subdomainContent: SubdomainCreationContent = {
  recipient: "test@test.com",
  subdomain: "testsubdomain"
};

console.log(isSubdomainCreation(subdomainContent)); // Output: true
```

### Best Practices
- Always use the provided SubdomainCreationContent interface when creating new subdomains to ensure consistency and correctness in the content structure.
- Validate the subdomain creation content using the isSubdomainCreation function before proceeding with any subdomain creation action. This helps prevent errors and ensures that only valid content is used.

### actions/swap.ts

### Common Use Cases
1. **Performing a token swap:** Use the `isSwapContent` function to validate the input before executing a token swap operation.
```typescript
import { isSwapContent } from './actions/swap';

const content = {
  sellTokenAddress: '0x123abc...',
  buyTokenAddress: '0x456def...',
  sellAmount: '100'
};

if (isSwapContent(content)) {
  // Execute token swap
} else {
  console.error('Invalid swap content');
}
```

2. **Handling user input for token swapping:** Utilize the `SwapContent` interface to define the structure of user input for token swapping.
```typescript
import { SwapContent } from './interfaces/swap';

const userInput: SwapContent = {
  sellTokenAddress: '0xabc456...',
  buyTokenAddress: '0xdef789...',
  sellAmount: '50'
};

console.log(userInput);
```

### Best Practices
- **Validate input data:** Always validate the input data using the `isSwapContent` function before processing any token swaps to prevent errors.
- **Utilize interfaces:** Define and use interfaces, such as `SwapContent`, to maintain a structured format for input data and improve code readability.

### actions/takeOrder.ts

### Common Use Cases
1. Creating a new order: 
   ```typescript
   import { Order } from './interfaces';
   import { takeOrder } from './actions/takeOrder';

   const newOrder: Order = {
       userId: "123",
       ticker: "AAPL",
       contractAddress: "0x123abc",
       timestamp: "2022-01-01T12:00:00",
       buyAmount: 10,
       price: 150.50
   };

   takeOrder(newOrder);
   ```

2. Processing an existing order:
   ```typescript
   import { Order } from './interfaces';
   import { takeOrder } from './actions/takeOrder';

   const existingOrder: Order = {
       userId: "456",
       ticker: "GOOGL",
       contractAddress: "0x456def",
       timestamp: "2022-01-02T09:00:00",
       buyAmount: 5,
       price: 200.75
   };

   takeOrder(existingOrder);
   ```

### Best Practices
- Ensure that the Order object passed to the `takeOrder` function contains all required properties.
- Handle any errors or exceptions that may occur during the order processing.

### actions/transfer.ts

### Common Use Cases
1. Checking if a provided content is a valid TransferContent object:
```typescript
import { isTransferContent, TransferContent } from './actions/transfer';

const content: TransferContent = {
  tokenAddress: '0x123abc',
  recipient: '0x456def',
  amount: 100
};

const isValidTransferContent = isTransferContent(content);
console.log(isValidTransferContent); // Output: true
```

2. Utilizing the TransferContent interface to define a transfer of content:
```typescript
import { TransferContent } from './actions/transfer';

const transfer: TransferContent = {
  tokenAddress: '0x456def',
  recipient: '0x789ghi',
  starkName: 'JohnDoe',
  amount: 50
};

console.log(transfer); // Output: { tokenAddress: '0x456def', recipient: '0x789ghi', starkName: 'JohnDoe', amount: 50 }
```

### Best Practices
- Always use the isTransferContent function to validate any TransferContent object before using it in your application to ensure consistency and avoid errors.
- Follow the defined structure of the TransferContent interface when defining transfer objects to maintain code readability and consistency.

### actions/unruggable.ts

### Common Use Cases

1. **Creating a new token contract**: 
```typescript
import { DeployTokenContent, isDeployTokenContent } from './actions/unruggable';

const newToken: DeployTokenContent = {
    name: 'MyToken',
    symbol: 'MTK',
    owner: '0x1234567890abcdef',
    initialSupply: '1000000'
};

if (isDeployTokenContent(newToken)) {
    // Proceed with deploying the token contract
} else {
    console.error('Invalid token content format');
}
```

2. **Validating token deployment content**:
```typescript
import { DeployTokenContent, isDeployTokenContent } from './actions/unruggable';

const invalidToken: DeployTokenContent = {
    name: 'AnotherToken',
    symbol: 'ATK',
    owner: '0x9876543210abcdef',
    initialSupply: 'abc'
};

if (isDeployTokenContent(invalidToken)) {
    // Proceed with deploying the token contract
} else {
    console.error('Invalid token content format');
}
```

### Best Practices

- **Verify content structure before proceeding**: Always use the `isDeployTokenContent` function to validate the content structure before deploying a token contract.
- **Handle validation errors**: Implement error handling for cases where the content does not match the expected structure to prevent unexpected behavior during token deployment.

### providers/utils.ts

### Common Use Cases
1. **Evaluate Token Trading**: 
   ```typescript
   import { evaluateTokenTrading } from './providers/utils';
   
   const tokenMetrics = {
       liquidityUsd: 1000000,
       marketCapUsd: 5000000,
       totalSupply: 100000000,
       ownerPercentage: 20,
       creatorPercentage: 10,
       top10HolderPercent: 50,
       priceChange24hPercent: -2,
       priceChange12hPercent: 1,
       uniqueWallet24h: 2000,
       volume24hUsd: 2000000
   };
   
   const tradingThresholds = {
       volume24hUsdThreshold: 1000000,
       priceChange24hPercentThreshold: -5,
       priceChange12hPercentThreshold: 0,
       top10HolderPercentThreshold: 60,
       uniqueWallet24hThreshold: 1500,
       minimumLiquidityUsd: 500000,
       minimumMarketCapUsd: 3000000
   };
   
   const evaluation = evaluateTokenTrading(tokenMetrics, tradingThresholds);
   console.log(evaluation);
   ```
2. **Analyze High Supply Holders**:
   ```typescript
   import { analyzeHighSupplyHolders } from './providers/utils';
   
   const analysisParams = {
       holders: [
           { address: '0x123abc', balance: '1000000' },
           { address: '0x456def', balance: '500000' }
       ],
       ownerBalance: '2000000',
       creatorBalance: '1000000',
       thresholdPercentage: 30
   };
   
   const analysisResult = analyzeHighSupplyHolders(analysisParams);
   console.log(analysisResult);
   ```

### Best Practices
- **Validate Inputs**: Ensure that the input values provided to the functions are valid and properly formatted.
- **Handle Errors**: Implement error handling mechanisms to gracefully handle any errors that may occur during the execution of the functions.

### types/token.ts

### Common Use Cases
1. Creating a quote request:
```typescript
const quoteRequest: QuoteRequest = {
    sellTokenAddress: "0x123abc...",
    buyTokenAddress: "0x456def...",
    sellAmount: BigInt(100),
    buyAmount: BigInt(200),
    takerAddress: "0x789ghi...",
    size: 3,
    excludeSources: ["Uniswap", "Sushiswap"],
    integratorFees: BigInt(30),
    integratorFeeRecipient: "0xabc123...",
    integratorName: "MyApp"
};
```

2. Storing information about a token:
```typescript
const tokenInfo: TokenInfo = {
    name: "My Token",
    symbol: "MTK",
    address: "0x789xyz...",
    logoUri: "https://example.com/logo.png",
    coingeckoId: "my-token",
    verified: true,
    market: {
        currentPrice: 100,
        marketCap: 1000000,
        fullyDilutedValuation: 2000000,
        starknetTvl: 500000,
        priceChange1h: 5,
        priceChangePercentage1h: 5,
        priceChange24h: 10,
        priceChangePercentage24h: 10,
        priceChange7d: 20,
        priceChangePercentage7d: 20,
        marketCapChange24h: 50000,
        marketCapChangePercentage24h: 5,
        starknetVolume24h: 100000,
        starknetTradingVolume24h: 50000,
    },
    tags: ["Defi", "ERC20"]
};
```

### Best Practices
- Ensure to handle BigInt values properly to prevent overflow or loss of data.
- Follow the specified structure of interfaces to maintain consistency and ease of use.

### types/trustDB.ts

### Common Use Cases
1. Parsing and processing token data:
```typescript
import { TokenTradeData, ProcessedTokenData } from './types/trustDB';

const tokenData: TokenTradeData = {
    address: '0x123abc',
    holder: 1000,
    market: 5000,
    last_trade_unix_time: 1635378566,
    last_trade_human_time: '2021-10-27 12:34:56',
    price: 10,
    history_30m_price: 12,
    price_change_30m_percent: 20,
    ...
};

const processedTokenData: ProcessedTokenData = {
    security: {...},
    tradeData: tokenData,
    holderDistributionTrend: 'increasing',
    highValueHolders: [{holderAddress: '0xabc123', balanceUsd: '1000'}],
    recentTrades: true,
    highSupplyHoldersCount: 5,
    dexScreenerData: {...},
    isDexScreenerListed: true,
    isDexScreenerPaid: true,
};
```

2. Calculating buy amounts based on different levels:
```typescript
import { CalculatedBuyAmounts } from './types/trustDB';

const buyAmounts: CalculatedBuyAmounts = {
    none: 0,
    low: 100,
    medium: 500,
    high: 1000,
};
```

### Best Practices
- Use TypeScript interfaces to define clear data structures and improve code safety.
- Keep the interfaces up to date with the latest requirements and changes to ensure consistency in data handling.

### utils/index.ts

### Common Use Cases
1. Fetching data from a URL with retry mechanism:
   ```typescript
   import { fetchWithRetry } from './utils';

   const url = 'https://api.example.com/data';
   const options = {
       headers: {
           'Authorization': 'Bearer token'
       }
   };
   const config = {
       maxRetries: 3,
       delay: 1000,
       maxDelay: 10000,
       backoff: (attempt) => Math.pow(2, attempt) * 1000
   };

   fetchWithRetry(url, options, config)
       .then(data => {
           console.log(data);
       })
       .catch(error => {
           console.error(error);
       });
   ```

2. Parsing currency amounts with specified options:
   ```typescript
   import { parseCurrencyAmount } from './utils';

   const amount = 123.4567;
   const options = {
       fixed: 2,
       significant: 4
   };

   const formattedAmount = parseCurrencyAmount(amount, options);
   console.log(formattedAmount); // Output: 123.5
   ```

### Best Practices
- Ensure to handle the promise returned by `fetchWithRetry` appropriately with `then` and `catch` to handle successful and error responses.
- Provide the necessary options and configurations when using functions like `fetchWithRetry` to customize the behavior based on the use case.

### environment.ts

### Common Use Cases
1. Validate Starknet configuration using environment variables:
```typescript
import { validateStarknetConfig } from 'environment';
import { AgentRuntime } from 'agent';

const runtime = new AgentRuntime();
validateStarknetConfig(runtime).then((config) => {
    console.log('Starknet configuration validated:', config);
}).catch((error) => {
    console.error('Error validating Starknet configuration:', error);
});
```

2. Fetch and update settings in Starknet configuration:
```typescript
import { validateStarknetConfig } from 'environment';
import { AgentRuntime } from 'agent';

const runtime = new AgentRuntime();

// Fetch the initial Starknet configuration
validateStarknetConfig(runtime).then((config) => {
    console.log('Initial Starknet configuration:', config);

    // Update some settings
    config.networkId = 12345;

    // Validate and save the updated configuration
    validateStarknetConfig(runtime, config).then((updatedConfig) => {
        console.log('Updated Starknet configuration:', updatedConfig);
    }).catch((error) => {
        console.error('Error validating updated Starknet configuration:', error);
    });
}).catch((error) => {
    console.error('Error fetching Starknet configuration:', error);
});
```

### Best Practices
- Always handle validation errors when using `validateStarknetConfig`, as it throws an error if the validation fails.
- Use the returned `StarknetConfig` object for further operations or saving the configuration.

## API Reference
### providers/portfolioProvider.ts

#### Classes

##### WalletProvider

```
/**
 * Class representing a WalletProvider that interacts with the blockchain to fetch wallet portfolio and token USD values.
 * @class
 */
        **/
```

#### Types

##### CoingeckoPrices

```
/**
 * Represents the prices of different cryptocurrencies in USD according to Coingecko.
 * @typedef {Object.<string, {usd: number}>} CoingeckoPrices
 */
```

##### TokenBalances

```
/**
 * Represents the token balances for each token address, where the key is the token address and the value is a bigint representing the balance.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the class.
 *
 * @param {IAgentRuntime} runtime - The runtime object to initialize the class with.
 */
```
```

##### getWalletPortfolio

```
/**
 * Asynchronously retrieves the wallet portfolio by fetching token balances for each token in PORTFOLIO_TOKENS.
 * If the cached values are available, it returns them. Otherwise, it fetches the balances sequentially
 * to prevent API issues. The fetched balances are stored in the cache for future use with a expiry time of 3 hours.
 * @returns {Promise<TokenBalances>} The token balances for the wallet portfolio.
 */
```

##### getTokenUsdValues

```
/**
 * Retrieves the USD values of tokens from Coingecko API. 
 * 
 * @returns {Promise<CoingeckoPrices>} A promise that resolves to an object containing USD values of tokens from Coingecko API.
 */
```


### providers/token.ts

#### Classes

##### TokenProvider

```
/**
 * Class representing a Token Provider.
 */

```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the class.
 * 
 * @param {string} tokenAddress - The address of the token.
 * @param {WalletProvider} walletProvider - The wallet provider for the token.
 */
```

##### fetchWithRetry

```
/**
 * Fetches data from a specified URL with retry logic.
 *
 * @template T - The type of data to be fetched
 * @param {string} url - The URL to fetch data from
 * @param {RequestInit} [options={}] - Additional options for the fetch request
 * @returns {Promise<T>} The data fetched from the URL
 */
```

##### getTokensInWallet

```
/**
 * Asynchronously retrieves the tokens stored in the wallet for a given user runtime.
 * @param {IAgentRuntime} runtime - The user runtime object.
 * @returns {Promise<Item[]>} - A promise that resolves to an array of items representing the tokens in the wallet.
 */
```

##### getTokenFromWallet

```
/**
 * Asynchronously retrieves the address of a token from the wallet based on the token symbol.
 *
 * @param {IAgentRuntime} runtime - The runtime object to interact with the wallet.
 * @param {string} tokenSymbol - The symbol of the token to look for in the wallet.
 * @returns {Promise<string | null>} The address of the token if found, or null if not found or an error occurs.
 */
```

##### fetchPrices

```
/**
 * Asynchronously fetches prices for different tokens (BTC, ETH, STRK) from a provider API.
 * If cached data is available, it returns the cached prices.
 * Otherwise, fetches the latest price data for each token and stores it in the cache before returning.
 * @returns {Promise<Prices>} A promise that resolves to an object containing the latest prices for each token.
 */
```

##### calculateBuyAmounts

```
/**
 * Asynchronously calculates buy amounts based on liquidity and market cap.
 * @returns {Promise<CalculatedBuyAmounts>} The object containing the calculated buy amounts in different impact categories (none, low, medium, high).
 */
```

##### fetchTokenSecurity

```
/**
 * Fetches token security data from the cache if available, otherwise makes a request to the API to fetch the data.
 * 
 * @returns {Promise<TokenSecurityData>} The token security data for the specified token address.
 */
```

##### fetchTokenTradeData

```
/**
 * Asynchronously fetches token trade data from the specified API endpoint. If the data is already cached, returns cached data.
 * 
 * @returns {Promise<TokenInfo>} The token trade data fetched from the API or the cached data.
 */
```

##### fetchDexScreenerData

```
/**
 * Asynchronously fetches DexScreener data based on the token address.
 * @returns A Promise that resolves to the fetched DexScreenerData.
 */
```

##### searchDexScreenerData

```
/**
 * Asynchronously fetches DexScreener data for a specific symbol.
 * If the data is cached, returns the pair with the highest liquidity.
 * If the data is not cached, fetches the data from the DexScreener API and caches it before returning the pair with the highest liquidity.
 * @param {string} symbol The symbol to search for in the DexScreener data.
 * @returns {Promise<DexScreenerPair | null>} A Promise that resolves to the pair with the highest liquidity, or null if there was an error or no data available.
 */
```

##### getHighestLiquidityPair

```
/**
 * Get the pair with the highest liquidity from the provided DexScreenerData object.
 * If no pairs are available in the DexScreenerData, return null.
 * Pairs are sorted by liquidity first, then by market cap if liquidity is equal.
 * @param {DexScreenerData} dexData - The DexScreenerData object to search for the highest liquidity pair.
 * @returns {DexScreenerPair | null} The pair with the highest liquidity, or null if no pairs are available.
 */
```

##### analyzeHolderDistribution

```
/**
 * Asynchronously analyzes the holder distribution based on the provided trade data.
 * @param {TokenInfo} _tradeData - The trade data containing information about the token.
 * @returns {Promise<string>} A promise that resolves to a string indicating the analysis result (increasing, decreasing, or stable).
 */
```

##### fetchHolderList

```
/**
 * Asynchronously fetches the list of holders for a specific token address.
 * If the data is already cached, it returns the cached data.
 * Otherwise, retrieves the data from the Helius API by making multiple requests with pagination.
 * 
 * @returns {Promise<HolderData[]>} The list of holders for the token address.
 * @throws {Error} If there is an error fetching the holder list from Helius.
 */
```

##### filterHighValueHolders

```
/**
 * Filters out high value holders based on the token balance and current token price.
 * 
 * @param {TokenInfo} tradeData - Information about the token and its market.
 * @returns {Promise<Array<{ holderAddress: string; balanceUsd: string }>>} - Array of high value holders with their address and balance in USD.
 */
```

##### checkRecentTrades

```
/**
 * Checks if the 24 hour trading volume in USD is greater than zero.
 * @param {bigint} volume24hUsd - The 24 hour trading volume in USD.
 * @returns {Promise<boolean>} - Returns a boolean indicating if the volume is greater than zero.
 */
```

##### countHighSupplyHolders

```
/**
 * Async function to count the number of high supply holders based on the provided TokenSecurityData.
 * 
 * @param {TokenSecurityData} securityData - The security data of the token containing owner and creator balances.
 * @returns {Promise<number>} - A promise that resolves to the count of high supply holders.
 */
```

##### getProcessedTokenData

```
/**
 * Asynchronously retrieves and processes data for a token, including security, trade data, DexScreener data,
 * holder distribution trend, high-value holders, recent trades, high-supply holders count, and DexScreener listing status.
 * 
 * @returns {Promise<ProcessedTokenData>} A promise that resolves to an object containing all processed token data
 * @throws {Error} If there is an error processing the token data
 */
```

##### shouldTradeToken

```
/**
 * Asynchronously determines if this token should be traded based on various token metrics.
 * @returns {Promise<boolean>} A Promise that resolves to a boolean indicating if the token should be traded.
 */
```

##### formatTokenData

```
/**
 * Formats the token data into a structured string for Token Security and Trade Report.
 * 
 * @param {ProcessedTokenData} data - The processed token data to be formatted
 * @returns {string} - The formatted token data as a string
 */
```

##### getFormattedTokenReport

```
/**
 * Asynchronously generates a formatted token report based on processed token data.
 * 
 * @returns {Promise<string>} The formatted token report as a string.
 */
```


### providers/trustScoreProvider.ts

#### Classes

##### TrustScoreManager

```
/**
 * Class representing a Trust Score Manager.
 *
 * Manages trust score calculation and storage for various entities.
 */
```

#### Interfaces

##### TradeData

```
/**
 * Interface representing trade data.
 * @property {number} buy_amount - The amount to buy.
 * @property {boolean} is_simulation - Indicates if the trade is a simulation.
 */
```

##### sellDetails

```
/**
 * Interface representing the details of a sale.
 * @property {number} sell_amount - The amount of the sale.
 * @property {string | null} sell_recommender_id - The ID of the recommender for the sale, or null if no recommender.
 */
```

##### _RecommendationGroup

```
/**
 * Interface for a recommendation group.
 * @interface
 */

```

##### RecommenderData

```
/**
* Interface representing data for a recommender.
* @typedef {Object} RecommenderData
* @property {string} recommenderId - The ID of the recommender.
* @property {number} trustScore - The trust score of the recommender.
* @property {number} riskScore - The risk score of the recommender.
* @property {number} consistencyScore - The consistency score of the recommender.
* @property {RecommenderMetrics} recommenderMetrics - The metrics of the recommender.
*/
```

##### TokenRecommendationSummary

```
/**
 * Represents a summary of token recommendations.
 * @typedef {Object} TokenRecommendationSummary
 * @property {string} tokenAddress - The address of the token.
 * @property {number} averageTrustScore - The average trust score of the token.
 * @property {number} averageRiskScore - The average risk score of the token.
 * @property {number} averageConsistencyScore - The average consistency score of the token.
 * @property {RecommenderData[]} recommenders - The recommenders of the token.
 */
```

#### Methods

##### updateRecommenderMetrics

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### calculateTrustScore

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### calculateOverallRiskScore

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### calculateRiskScore

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### calculateConsistencyScore

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### suspiciousVolume

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### sustainedGrowth

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### isRapidDump

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### checkTrustScore

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### createTradePerformance

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### delay

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### createTradeInBe

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### updateSellDetails

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### getRecommendations

```
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     
```

##### constructor

```
/**
 * Constructor for initializing a new instance of the class.
 *
 * @param {IAgentRuntime} runtime - The agent runtime used for interacting with the backend.
 * @param {TokenProvider} tokenProvider - The token provider used for accessing tokens.
 * @param {TrustScoreDatabase} trustScoreDb - The trust score database used for storing trust scores.
 */ 
```

##### getRecommenderBalance

```
/**
 * Asynchronously retrieves the balance of a recommender's wallet.
 * 
 * @param {string} recommenderWallet - The wallet address of the recommender
 * @returns {Promise<number>} - A promise that resolves with the balance of the recommender's wallet
 */
```

##### generateTrustScore

```
/**
 * Asynchronously generates the trust score for a given token, recommender ID, and recommender wallet.
 * Retrieves processed token data, recommender metrics, and calculates various trust factors to generate the trust score.
 * 
 * @param {string} tokenAddress - The address of the token for which trust score is to be generated.
 * @param {string} recommenderId - The unique ID of the recommender.
 * @param {string} recommenderWallet - The wallet address of the recommender.
 * @returns {Promise<{
 *   tokenPerformance: TokenPerformance;
 *   recommenderMetrics: RecommenderMetrics;
 * }>} An object containing token performance and recommender metrics with the calculated trust score.
 */
```


### utils/ERC20Token.ts

#### Classes

##### ERC20Token

```
/**
 * Represents an ERC20 token with methods for interacting with the token contract.
 */
  */
```

#### Types

##### ApproveCall

```
/**
 * Type representing an approve call, with properties:
 * - contractAddress: string
 * - entrypoint: "approve"
 * - calldata: Calldata
 */
```

##### TransferCall

```
/**
 * Type representing a transfer call to a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract.
 * @property {"transfer"} entrypoint - The entrypoint function "transfer".
 * @property {Calldata} calldata - The data payload for the call.
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for initializing a new contract instance with the provided token address and optional provider or account.
 * @param {string} token - The address of the ERC20 token contract.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - Optional provider or account interface.
 */
```

##### address

```
/**
 * Retrieve the address of the contract.
 * @returns {string} The address of the contract.
 */
```

##### balanceOf

```
/**
* Retrieves the balance of the specified account.
* @param {string} account - The account address to retrieve the balance for.
* @returns {Promise<bigint>} - The balance of the specified account as a bigint.
*/
```

##### decimals

```
/**
 * Asynchronously retrieves the value of the 'decimals' from the contract.
 * 
 * @returns {Promise<bigint>} The decimal value of the contract retrieved as a BigInt.
 */
```

##### approveCall

```
/**
 * Generates an "approve" call object with the specified spender and amount.
 * 
 * @param {string} spender - The address of the spender being approved.
 * @param {bigint} amount - The amount the spender is approved to spend.
 * @returns {ApproveCall} The generated "approve" call object.
 */
```

##### transferCall

```
/**
 * Transfers the specified amount to the recipient using the 'transfer' entrypoint.
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount to transfer.
 * @returns {TransferCall} Object containing contract address, entrypoint, and calldata for the transfer.
 */
```


### utils/cache.ts

#### Classes

##### Cache

```
/**
 * A class representing a cache for storing data with a specified time-to-live (TTL).
 */
 */
```

#### Methods

##### constructor

```
/**
 * Constructor for creating a new instance of the cache manager.
 */
```

##### readCacheFromFile

```
/**
 * Reads and returns the cached data stored in a file for the given cache key.
 * If the cached data is expired, the file is deleted and null is returned.
 * 
 * @template T
 * @param {string} cacheKey - The key used to identify the cached data file.
 * @returns {T | null} The cached data if not expired, null otherwise.
 */
```

##### writeCacheToFile

```
/**
 * Write data to a cache file with the specified cache key
 * @template T - The type of data being written to the cache file
 * @param {string} cacheKey - The key to identify the cache data
 * @param {T} data - The data to be written to the cache file
 * @returns {void}
 */
```

##### get

```
/**
 * Retrieves a value from the cache based on the provided cache key.
 * 
 * @template T - The type of the value being retrieved.
 * @param {string} cacheKey - The key used to access the value in the cache.
 * @returns {T | undefined} - The value associated with the cache key, or undefined if not found.
 */
```

##### set

```
/**
 * Sets the data into the cache with the specified cacheKey.
 * 
 * @template T The type of data being stored in the cache.
 * @param {string} cacheKey The key to use for storing the data in the cache.
 * @param {T} data The data to store in the cache.
 * @returns {void}
 */
           
```

##### getCachedData

```
/**
 * Retrieves data from cache based on the provided cache key.
 * 
 * @template T - The type of data to be retrieved from cache.
 * @param {string} cacheKey - The key to look up in cache.
 * @returns {T | null} The cached data if found, otherwise null.
 */
```

##### setCachedData

```
/**
 * Sets the cached data in the in-memory cache and writes it to the file-based cache.
 * 
 * @template T
 * @param {string} cacheKey - The key to store the cached data under.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
```


### actions/subdomain.ts

#### Interfaces

##### SubdomainCreationContent

```
/**
 * Interface for the content needed to create a subdomain.
 * Extends the Content interface.
 * @interface
 * @property {string} recipient - The recipient of the subdomain.
 * @property {string} subdomain - The name of the subdomain to be created.
 */
```

#### Functions

##### isSubdomainCreation

```
/**
 * Checks if the provided content is valid for subdomain creation.
 * 
 * @param {SubdomainCreationContent} content - The content to validate for subdomain creation.
 * @returns {boolean} Returns true if the content is valid for subdomain creation, otherwise false.
 */
```


### actions/swap.ts

#### Interfaces

##### SwapContent

```
/**
 * Interface representing the details required to swap content.
 * @typedef {object} SwapContent
 * @property {string} sellTokenAddress - The address of the token to be sold.
 * @property {string} buyTokenAddress - The address of the token to be bought.
 * @property {string} sellAmount - The amount of the token to be sold.
 */
```

#### Functions

##### isSwapContent

```
/**
 * Check if the input content is a valid SwapContent object.
 *
 * @param {SwapContent} content - The content to be checked.
 * @returns {boolean} - True if the content is a valid SwapContent object, false otherwise.
 */
```


### actions/takeOrder.ts

#### Interfaces

##### Order

```
/**
 * Interface representing an order in the system.
 *
 * @interface
 * @property {string} userId - The user ID associated with the order.
 * @property {string} ticker - The ticker symbol for the asset being traded.
 * @property {string} contractAddress - The contract address for the asset being traded.
 * @property {string} timestamp - The timestamp when the order was made.
 * @property {number} buyAmount - The amount of the asset being bought/sold.
 * @property {number} price - The price at which the asset is being bought/sold.
 */
```


### actions/transfer.ts

#### Interfaces

##### TransferContent

```
/**
 * Interface representing the transfer of content.
 * @interface TransferContent
 * @augments Content
 * @property {string} tokenAddress - The address of the token being transferred.
 * @property {string} [recipient] - The recipient of the transfer.
 * @property {string} [starkName] - The stark name associated with the transfer.
 * @property {string | number} amount - The amount being transferred.
 */
```

#### Functions

##### isTransferContent

```
/**
 * Checks if the provided content is a valid TransferContent object.
 *
 * @param {TransferContent} content - The content to be validated.
 * @returns {boolean} - True if the content is a valid TransferContent object, false otherwise.
 */
```


### actions/unruggable.ts

#### Interfaces

##### DeployTokenContent

```
/**
 * Interface for deploying a token contract with specific content.
 * @typedef {Object} DeployTokenContent
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} owner - The owner of the token.
 * @property {string} initialSupply - The initial supply of the token.
 */
```

#### Functions

##### isDeployTokenContent

```
/**
 * Function to check if the given object matches the structure of a DeployTokenContent.
 * @param {DeployTokenContent} content - The object to check.
 * @returns {boolean} Returns true if the object matches the structure, false otherwise.
 */
```


### providers/utils.ts

#### Interfaces

##### TokenMetrics

```
/**
 * Interface representing token metrics.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total supply.
 * @property {number} ownerPercentage - The percentage owned by the owner.
 * @property {number} creatorPercentage - The percentage owned by the creator.
 * @property {number} top10HolderPercent - The percentage held by the top 10 holders.
 * @property {number} priceChange24hPercent - The percentage change in price in the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage change in price in the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets in the last 24 hours.
 * @property {bigint} volume24hUsd - The trading volume in USD in the last 24 hours.
 */
```

##### TradingThresholds

```
/**
 * Interface representing trading thresholds for a specific asset.
 * @typedef {Object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - The threshold for 24-hour trading volume in USD.
 * @property {number} [priceChange24hPercentThreshold] - The threshold for 24-hour price change percentage.
 * @property {number} [priceChange12hPercentThreshold] - The threshold for 12-hour price change percentage.
 * @property {number} [top10HolderPercentThreshold] - The threshold for percentage of top 10 holders.
 * @property {number} [uniqueWallet24hThreshold] - The threshold for unique wallets in the past 24 hours.
 * @property {number} [minimumLiquidityUsd] - The minimum liquidity threshold in USD.
 * @property {number} [minimumMarketCapUsd] - The minimum market cap threshold in USD.
 */
```

##### HolderAnalysisParams

```
/**
 * Interface representing the parameters for analyzing holders.
 * @typedef {object} HolderAnalysisParams
 * @property {HolderData[]} holders - Array of HolderData objects
 * @property {string} ownerBalance - The balance of the owner
 * @property {string} creatorBalance - The balance of the creator
 * @property {number} [thresholdPercentage] - Optional threshold percentage
 */
```

##### HolderAnalysisResult

```
/**
 * Interface representing the result of an analysis on token holders.
 * @typedef {Object} HolderAnalysisResult
 * @property {number} count - The number of holders.
 * @property {Array<{ address: string, percentage: number }>} holders - An array of objects representing each holder's address and percentage.
 * @property {bigint} totalSupply - The total supply of tokens.
 */
```

#### Functions

##### evaluateTokenTrading

```
/**
 * Evaluates whether a token meets the specified trading thresholds based on provided metrics.
 * @param {TokenMetrics} metrics - The metrics of the token to evaluate.
 * @param {TradingThresholds} thresholds - The thresholds for trading (default values provided).
 * @return {{ shouldTrade: boolean; reasons: string[] }} An object containing whether the token should trade and the reasons for the evaluation.
 */
```

##### analyzeHighSupplyHolders

```
/**
 * Analyze high supply holders based on the given parameters.
 *
 * @param {HolderAnalysisParams} params - Parameters for holder analysis.
 * @returns {HolderAnalysisResult} Result of the analysis, including count, high supply holders, and total supply.
 */
```


### types/token.ts

#### Interfaces

##### QuoteRequest

```
/**
 * Interface representing a quote request.
 * @typedef {Object} QuoteRequest
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {BigInt} [sellAmount] - The amount of the token being sold.
 * @property {BigInt} [buyAmount] - The amount of the token being bought.
 * @property {string} [takerAddress] - The address that will fill the quote.
 * @property {number} [size] - The maximum number of returned quotes.
 * @property {string[]} [excludeSources] - The sources to be excluded from the quote.
 * @property {BigInt} [integratorFees] - Fee amount in basis points, where 30 is 0.3%.
 * @property {string} [integratorFeeRecipient] - Address of the fee collector when integratorFees is defined.
 * @property {string} [integratorName] - The name of the integrating application.
 */
```

##### Quote

```
/**
 * Interface representing a Quote object.
 *
 * @typedef {Object} Quote
 * @property {string} quoteId - The unique id of the quote
 * @property {string} sellTokenAddress - The address of the token being sold
 * @property {bigint} sellAmount - The amount of the token being sold
 * @property {number} sellAmountInUsd - The equivalent amount in USD of the token being sold
 * @property {string} buyTokenAddress - The address of the token being bought
 * @property {bigint} buyAmount - The amount of the token being bought
 * @property {number} buyAmountInUsd - The equivalent amount in USD of the token being bought
 * @property {number} [blockNumber] - The block number associated with the quote
 * @property {string} chainId - The id of the blockchain chain
 * @property {number} [expiry] - Unix timestamp of when the quote expires in seconds
 * @property {Route[]} routes - Array of Route objects representing the trading path
 * @property {bigint} gasFees - The estimated amount of gas fees in ETH
 * @property {number} gasFeesInUsd - The equivalent amount of gas fees in USD
 * @property {bigint} avnuFees - The actual fees taken by AVNU
 * @property {number} avnuFeesInUsd - The equivalent amount of fees taken by AVNU in USD
 * @property {bigint} avnuFeesBps - The fees taken by AVNU in basis points
 * @property {bigint} integratorFees - The actual fees taken by the integrator
 * @property {number} integratorFeesInUsd - The equivalent amount of fees taken by the integrator in USD
 * @property {bigint} integratorFeesBps - The fees taken by the integrator in basis points
 * @property {number} priceRatioUsd - The price ratio in USD
 * @property {number} [sellTokenPriceInUsd] - The sell token price in USD
 * @property {number} [buyTokenPriceInUsd] - The buy token price in USD
 * @property {Gasless} gasless - Object representing gasless transaction information
 */
```
```

##### Route

```
/**
 * Interface representing a route for trading tokens.
 * @typedef {Object} Route
 * @property {string} name - The name of the source (e.g. 10kSwap)
 * @property {string} address - The address of the source
 * @property {number} percent - The percentage distribution of sellToken. 1 represents 100%
 * @property {string} sellTokenAddress - The address of the sell token
 * @property {string} buyTokenAddress - The address of the buy token
 * @property {Route[]} routes - An array of Route objects representing possible routes for trading tokens
 */
```

##### Gasless

```
/**
 * Represents a gasless functionality with the following properties:
 * @property {boolean} active - Indicates if the gasless functionality is currently active.
 * @property {Array<{ tokenAddress: string, gasFeesInUsd: number, gasFeesInGasToken: bigint }>} gasTokenPrices - An array of objects representing gas token prices, each containing:
 *   - @property {string} tokenAddress - The address of the gas token.
 *   - @property {number} gasFeesInUsd - The gas fees in USD.
 *   - @property {bigint} gasFeesInGasToken - The gas fees in gas token format.
 */
```

##### TokenInfo

```
/**
 * Interface representing information about a token.
 * @typedef {Object} TokenInfo
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} address - The address of the token.
 * @property {string} logoUri - The URI for the token's logo.
 * @property {string} coingeckoId - The Coingecko ID of the token.
 * @property {boolean} verified - Indicates if the token is verified.
 * @property {Object} market - Object containing market information about the token.
 * @property {number} market.currentPrice - The current price of the token.
 * @property {number} market.marketCap - The market capitalization of the token.
 * @property {number} market.fullyDilutedValuation - The fully diluted valuation of the token.
 * @property {number} market.starknetTvl - The StarkNet TVL of the token.
 * @property {number} market.priceChange1h - The price change in the last hour.
 * @property {number} market.priceChangePercentage1h - The percentage price change in the last hour.
 * @property {number} market.priceChange24h - The price change in the last 24 hours.
 * @property {number} market.priceChangePercentage24h - The percentage price change in the last 24 hours.
 * @property {number} market.priceChange7d - The price change in the last 7 days.
 * @property {number} market.priceChangePercentage7d - The percentage price change in the last 7 days.
 * @property {number} market.marketCapChange24h - The market capitalization change in the last 24 hours.
 * @property {number} market.marketCapChangePercentage24h - The percentage market capitalization change in the last 24 hours.
 * @property {number} market.starknetVolume24h - The StarkNet volume in the last 24 hours.
 * @property {number} market.starknetTradingVolume24h - The StarkNet trading volume in the last 24 hours.
 * @property {string[]} tags - An array of tags associated with the token.
 */
```


### types/trustDB.ts

#### Interfaces

##### TokenSecurityData

```
/**
 * Interface representing the security data related to a token.
 * @typedef {Object} TokenSecurityData
 * @property {string} ownerBalance - The balance of the token's owner.
 * @property {string} creatorBalance - The balance of the token's creator.
 * @property {number} ownerPercentage - The percentage of the token owned by the owner.
 * @property {number} creatorPercentage - The percentage of the token owned by the creator.
 * @property {string} top10HolderBalance - The balance of the top 10 token holders.
 * @property {number} top10HolderPercent - The percentage owned by the top 10 token holders.
 */
```

##### TokenTradeData

```
/**
 * Interface representing trade data for a specific token.
 * @typedef {Object} TokenTradeData
 * @property {string} address - The token address
 * @property {number} holder - Number of token holders
 * @property {number} market - Token market
 * @property {number} last_trade_unix_time - Unix timestamp of the last trade
 * @property {string} last_trade_human_time - Human-readable timestamp of the last trade
 * @property {number} price - Token price
 * @property {number} history_30m_price - Price history for the last 30 minutes
 * @property {number} price_change_30m_percent - Price change percentage for the last 30 minutes
 * ...
 * @property {number | null} volume_8h_change_percent - Volume change percentage for the last 8 hours
 * @property {number} volume_buy_8h - Volume of token bought in the last 8 hours
 * @property {number} volume_buy_8h_usd - USD value of token bought in the last 8 hours
 * ...
 * @property {number | null} volume_sell_24h_change_percent - Volume sell change percentage for the last 24 hours
 * @property {number} trade_24h - Number of trades in the last 24 hours
 * @property {number} trade_history_24h - Trade history for the last 24 hours
 * ...
 * @property {number} volume_sell_24h_usd - USD value of tokens sold in the last 24 hours
 * @property {number} volume_sell_history_24h - Historical volume of tokens sold in the last 24 hours
 * @property {number} volume_sell_history_24h_usd - Historical USD value of tokens sold in the last 24 hours
 * @property {number | null} volume_sell_24h_change_percent - Volume sell change percentage for the last 24 hours
 */
 */
```

##### HolderData

```
/**
 * Interface representing an object containing a holder's data.
 * @property {string} address - The address associated with the holder.
 * @property {string} balance - The balance associated with the holder.
 */
```

##### ProcessedTokenData

```
/**
 * Interface representing processed token data
 * @interface ProcessedTokenData
 * @property {TokenSecurityData} security - Object containing security data of the token
 * @property {TokenInfo} tradeData - Object containing information about token trades
 * @property {string} holderDistributionTrend - Trend of holder distribution ('increasing' | 'decreasing' | 'stable')
 * @property {Array<{holderAddress: string, balanceUsd: string}>} highValueHolders - Array of objects representing high value holders
 * @property {boolean} recentTrades - Flag indicating if there are recent trades for the token
 * @property {number} highSupplyHoldersCount - Count of high supply holders
 * @property {DexScreenerData} dexScreenerData - Object containing data from Dex Screener
 * @property {boolean} isDexScreenerListed - Flag indicating if the token is listed in Dex Screener
 * @property {boolean} isDexScreenerPaid - Flag indicating if the token is paid for in Dex Screener
 */
         
```

##### DexScreenerPair

```
/**
 * Interface representing a pair on DexScreener.
 * @typedef {object} DexScreenerPair
 * @property {string} chainId - The chain ID.
 * @property {string} dexId - The Dex ID.
 * @property {string} url - The URL of the pair.
 * @property {string} pairAddress - The pair address.
 * @property {object} baseToken - The base token information.
 * @property {string} baseToken.address - The address of the base token.
 * @property {string} baseToken.name - The name of the base token.
 * @property {string} baseToken.symbol - The symbol of the base token.
 * @property {object} quoteToken - The quote token information.
 * @property {string} quoteToken.address - The address of the quote token.
 * @property {string} quoteToken.name - The name of the quote token.
 * @property {string} quoteToken.symbol - The symbol of the quote token.
 * @property {string} priceNative - The price in native currency.
 * @property {string} priceUsd - The price in USD.
 * @property {object} txns - Transaction information.
 * @property {object} txns.m5 - Last 5 minutes transaction volume.
 * @property {number} txns.m5.buys - Number of buys in last 5 minutes.
 * @property {number} txns.m5.sells - Number of sells in last 5 minutes.
 * @property {object} volume - Volume information.
 * @property {number} volume.h24 - Volume in last 24 hours.
 * @property {number} volume.h6 - Volume in last 6 hours.
 * @property {number} volume.h1 - Volume in last 1 hour.
 * @property {number} volume.m5 - Volume in last 5 minutes.
 * @property {object} priceChange - Price change information.
 * @property {number} priceChange.m5 - Price change in last 5 minutes.
 * @property {number} priceChange.h1 - Price change in last 1 hour.
 * @property {number} priceChange.h6 - Price change in last 6 hours.
 * @property {number} priceChange.h24 - Price change in last 24 hours.
 * @property {object} liquidity - Liquidity information.
 * @property {number} liquidity.usd - Liquidity in USD.
 * @property {number} liquidity.base - Liquidity in base token.
 * @property {number} liquidity.quote - Liquidity in quote token.
 * @property {number} fdv - Fully diluted valuation.
 * @property {number} marketCap - Market capitalization.
 * @property {number} pairCreatedAt - Timestamp of pair creation.
 * @property {object} info - Additional information.
 * @property {string} info.imageUrl - URL of the image.
 * @property {Array<{label: string, url: string}>} info.websites - Array of websites associated with the pair.
 * @property {Array<{type: string, url: string}>} info.socials - Array of social media links associated with the pair.
 * @property {object} boosts - Boosts information.
 * @property {number} boosts.active - Number of active boosts.
 */
```

##### DexScreenerData

```
/**
 * Interface representing data returned by a Dex Screener.
 * @typedef {object} DexScreenerData
 * @property {string} schemaVersion - The version of the schema.
 * @property {DexScreenerPair[]} pairs - An array of DexScreenerPair objects.
 */
```

##### Prices

```
/**
 * Interface representing prices of different cryptocurrencies in USD.
 * @typedef {object} Prices
 * @property {object} starknet - Object containing the price of starknet in USD.
 * @property {string} starknet.usd - The price of starknet in USD.
 * @property {object} bitcoin - Object containing the price of bitcoin in USD.
 * @property {string} bitcoin.usd - The price of bitcoin in USD.
 * @property {object} ethereum - Object containing the price of ethereum in USD.
 * @property {string} ethereum.usd - The price of ethereum in USD.
 */
```

##### CalculatedBuyAmounts

```
/**
 * Interface representing calculated buy amounts.
 * @typedef {Object} CalculatedBuyAmounts
 * @property {number} none - The buy amount when it is none.
 * @property {number} low - The buy amount when it is low.
 * @property {number} medium - The buy amount when it is medium.
 * @property {number} high - The buy amount when it is high.
 */
```


### utils/index.ts

#### Interfaces

##### ParseCurrencyAmountOptions

```
/**
 * Interface for options when parsing currency amounts.
 * @typedef {Object} ParseCurrencyAmountOptions
 * @property {number} fixed - The number of decimal places to round to.
 * @property {number} [significant] - The number of significant digits to round to.
 */
```

#### Types

##### RetryConfig

```
/**
 * Represents a configuration object for retrying operations.
 * @typedef {Object} RetryConfig
 * @property {number} [maxRetries] - The maximum number of retries allowed.
 * @property {number} [delay] - The initial delay before the first retry.
 * @property {number} [maxDelay] - The maximum delay allowed for retries.
 * @property {Function} [backoff] - A function that calculates the delay between retries based on parameters.
 */
```

#### Functions

##### fetchWithRetry

```
/**
 * Fetches data from a URL with retry mechanism based on the provided configuration.
 * @template T
 * @param {string} url The URL to fetch data from.
 * @param {RequestInit} [options] The options to be passed to the fetch API.
 * @param {RetryConfig} [config] The configuration object for retry settings.
 * @param {number} [config.maxRetries=3] The maximum number of allowed retries.
 * @param {number} [config.delay=1000] The base delay in milliseconds between retries.
 * @param {number} [config.maxDelay=10000] The maximum delay in milliseconds between retries.
 * @param {function} [config.backoff] The backoff function that determines the delay between retries.
 * @returns {Promise<T>} A promise that resolves with the fetched data if successful.
 * @throws {Error} If the maximum number of retries is exhausted and the fetch still fails.
 */
```


### environment.ts

#### Types

##### StarknetConfig

```
/**
 * Defines the type StarknetConfig as the inferred type from starknetEnvSchema.
 */
```

#### Functions

##### validateStarknetConfig

```
/**
 * Validates the Starknet configuration by fetching settings from the runtime and environment variables,
 * then parsing and returning a validated StarknetConfig object.
 * 
 * @param {IAgentRuntime} runtime - The Agent runtime object used to get settings.
 * @returns {Promise<StarknetConfig>} The validated Starknet configuration.
 * @throws {Error} Throws an error if validation fails, with details of the validation error messages.
 */
```


## Development

### TODO Items
### Items
1. Implement this for Starknet.
   - Context: import {
    type Action,
    ActionExample,
    composeContext,
    Content,
    elizaLogger,
    generateObjectDeprecated,
    HandlerCallback,
    IAgentRuntime,
    Memory,
    ModelClass,
    State,
} from "@elizaos/core";
import { getStarknetAccount } from "../utils";
import { ERC20Token } from "../utils/ERC20Token";
import { validateStarknetConfig } from "../environment";
import { getAddressFromName, isStarkDomain } from "../utils/starknetId";

export interface TransferContent extends Content {
    tokenAddress: string;
    recipient?: string;
    starkName?: string;
    amount: string | number;
}

export function isTransferContent(
    content: TransferContent
): content is TransferContent {
    // Validate types
    const validTypes =
        typeof content.tokenAddress === "string" &&
        (typeof content.recipient === "string" ||
            typeof content.starkName === "string") &&
        (typeof content.amount === "string" ||
            typeof content.amount === "number");
    if (!validTypes) {
        return false;
    }

    // Validate tokenAddress (must be 32-bytes long with 0x prefix)
    const validTokenAddress =
        content.tokenAddress.startsWith("0x") &&
        content.tokenAddress.length === 66;
    if (!validTokenAddress) {
        return false;
    }

    // Additional checks based on whether recipient or starkName is defined
    if (content.recipient) {
        // Validate recipient address (must be 32-bytes long with 0x prefix)
        const validRecipient =
            content.recipient.startsWith("0x") &&
            content.recipient.length === 66;
        if (!validRecipient) {
            return false;
        }
    } else if (content.starkName) {
        // .stark name validation
        const validStarkName = isStarkDomain(content.starkName);
        if (!validStarkName) {
            return false;
        }
    }

    return true;
}

const transferTemplate = `Respond with a JSON markdown block containing only the extracted values. Use null for any values that cannot be determined.

For the amount to send, use a value from 1 - 100. Determine this based on your judgement of the recipient.

these are known addresses, if you get asked about them, use these:
- BTC/btc: 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac
- ETH/eth: 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7
- STRK/strk: 0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d
- LORDS/lords: 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49

Example response:
\`\`\`json
{
    "tokenAddress": "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    "recipient": "0x1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF",
    "starkName": "domain.stark",
    "amount": "0.001"
}
\`\`\`

{{recentMessages}}

Given the recent messages, extract the following information about the requested token transfer:
- Token contract address
- Recipient wallet address
- Recipient .stark name


Respond with a JSON markdown block containing only the extracted values.`;

export default {
    name: "SEND_TOKEN",
    similes: [
        "TRANSFER_TOKEN_ON_STARKNET",
        "TRANSFER_TOKENS_ON_STARKNET",
        "SEND_TOKENS_ON_STARKNET",
        "SEND_ETH_ON_STARKNET",
        "PAY_ON_STARKNET",
    ],
    validate: async (runtime: IAgentRuntime, _message: Memory) => {
        await validateStarknetConfig(runtime);
        return true;
    },
    description:
        "MUST use this action if the user requests send a token or transfer a token, the request might be varied, but it will always be a token transfer. If the user requests a transfer of lords, use this action.",
    handler: async (
        runtime: IAgentRuntime,
        message: Memory,
        state: State,
        _options: { [key: string]: unknown },
        callback?: HandlerCallback
    ): Promise<boolean> => {
        elizaLogger.log("Starting SEND_TOKEN handler...");

        // Initialize or update state
        if (!state) {
            state = (await runtime.composeState(message)) as State;
        } else {
            state = await runtime.updateRecentMessageState(state);
        }

        // Compose transfer context
        const transferContext = composeContext({
            state,
            template: transferTemplate,
        });

        // Generate transfer content
        const content = await generateObjectDeprecated({
            runtime,
            context: transferContext,
            modelClass: ModelClass.MEDIUM,
        });

        elizaLogger.debug("Transfer content:", content);

        // Validate transfer content
        if (!isTransferContent(content)) {
            elizaLogger.error("Invalid content for TRANSFER_TOKEN action.");
            if (callback) {
                callback({
                    text: "Not enough information to transfer tokens. Please respond with token address, recipient address or stark name, and amount.",
                    content: { error: "Invalid transfer content" },
                });
            }
            return false;
        }

        try {
            const account = getStarknetAccount(runtime);
            const erc20Token = new ERC20Token(content.tokenAddress, account);
            const decimals = await erc20Token.decimals();
            // Convert decimal amount to integer before converting to BigInt
            const amountInteger = Math.floor(
                Number(content.amount) * Math.pow(10, Number(decimals))
            );
            const amountWei = BigInt(amountInteger.toString());
            const recipient =
                content.recipient ??
                (await getAddressFromName(account, content.starkName));
            const transferCall = erc20Token.transferCall(recipient, amountWei);

            elizaLogger.success(
                "Transferring",
                amountWei,
                "of",
                content.tokenAddress,
                "to",
                recipient
            );

            const tx = await account.execute(transferCall);

            elizaLogger.success(
                "Transfer completed successfully! tx: " + tx.transaction_hash
            );
            if (callback) {
                callback({
                    text:
                        "Transfer completed successfully! tx: " +
                        tx.transaction_hash,
                    content: {},
                });
            }

            return true;
        } catch (error) {
            elizaLogger.error("Error during token transfer:", error);
            if (callback) {
                callback({
                    text: `Error transferring tokens: ${error.message}`,
                    content: { error: error.message },
                });
            }
            return false;
        }
    },

    examples: [
        [
            {
                user: "{{user1}}",
                content: {
                    text: "Send 10 ETH to 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
                },
            },
            ... (truncated)

### Troubleshooting
### Common Issues
1. Unable to fetch quotes
   - Cause: There might be connectivity issues or incorrect configuration settings.
   - Solution: Check your internet connection and ensure that the plugin configuration is correct.

### Debugging Tips
- Verify that your API keys are correctly set up.
- Check the console logs for any error messages related to quote fetching.

### FAQ
Q: How do I handle expired quotes?
A: You can implement a logic to check the expiry timestamp of the quote and handle it accordingly in your application code. For example:
```javascript
if (quote.expiry < Date.now() / 1000) {
  // Handle expired quote
}
```