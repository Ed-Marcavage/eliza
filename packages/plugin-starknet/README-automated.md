# @elizaos/plugin-starknet Documentation

## Overview

### Purpose
The @elizaos/plugin-starknet package is designed to provide a wide range of functionalities related to interacting with StarkNet. It includes classes such as WalletProvider for retrieving wallet portfolio information, HolderData for representing holder data, ProcessedTokenData for handling token data processing, and DexScreenerPair for managing decentralized exchange pairs. This package serves as a comprehensive tool for developers looking to integrate StarkNet capabilities into their projects.

### Key Features
- **WalletProvider Class**: Enables retrieval of wallet portfolio with token balances.
- **HolderData Interface**: Represents data of a holder including address and balance.
- **ProcessedTokenData Interface**: Handles processed token data with security information and trade details.
- **DexScreenerPair Interface**: Contains details about pairs on decentralized exchanges, including chain ID, exchange ID, URL, pair address, and base token information.

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
- cd into the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:
- Import the plugin using: `import { starknetPlugin } from "@elizaos/plugin-starknet";`
- Add it to the AgentRuntime plugins array

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
Ensure successful integration by checking the console for ["✓ Registering action: <plugin actions>"] after implementing the plugin.

**Note:** This is a workspace package, so it needs to be added to agent/package.json and then built for successful installation and integration.

## Configuration
# StarkNet Configuration Documentation

## Required Environment Variables:

1. **STARKNET_ADDRESS**
   - Purpose: Specifies the StarkNet address to connect to.

2. **STARKNET_PRIVATE_KEY**
   - Purpose: Specifies the private key for authentication.

3. **STARKNET_RPC_URL**
   - Purpose: Specifies the RPC URL for communication with StarkNet. (Optional)

4. **STARKNETID_NAMING_CONTRACT**
   - Purpose: Specifies the naming contract for StarkNet.

5. **STARKNETID_IDENTITY_CONTRACT**
   - Purpose: Specifies the identity contract for StarkNet.

## Example .env File:

```plaintext
STARKNET_ADDRESS=0x1234567890
STARKNET_PRIVATE_KEY=0xabcdef123456
STARKNET_RPC_URL=https://starknet.rpc.example.com
STARKNETID_NAMING_CONTRACT=0x987654321
STARKNETID_IDENTITY_CONTRACT=0xfedcba09876
```


**Note**: 
- Please ensure that the configuration is done in the .env file.
- Ensure that the .env file is set in the .gitignore to prevent it from being committed to the repository.

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
The handler for this action validates the Starknet configuration, composes the context for the swap, generates the token swap response, fetches quotes for the swap, and executes the swap with the specified slippage and approval settings.

#### Examples
1. **User**: "Swap 10 ETH for LORDS"
   **Agent**: "Ok, I'll swap 10 ETH for LORDS"

2. **User**: "Swap 100 $lords on starknet"
   **Agent**: "Ok, I'll swap 100 $lords on starknet"

3. **User**: "Swap 0.5 BTC for LORDS"
   **Agent**: "Ok, I'll swap 0.5 BTC for LORDS"

### SEND_TOKEN
Transfer tokens on StarkNet.

#### Properties
- Name: SEND_TOKEN
- Similes: TRANSFER_TOKEN_ON_STARKNET, TRANSFER_TOKENS_ON_STARKNET, SEND_TOKENS_ON_STARKNET, SEND_ETH_ON_STARKNET, PAY_ON_STARKNET

#### Handler
The handler for SEND_TOKEN action facilitates the transfer of tokens on StarkNet. It validates the transfer request, composes the transfer context, generates the transfer content, validates the content, and executes the token transfer. It provides feedback to the user regarding the status of the transfer.

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
The handler for this action deploys an Unruggable Memecoin on Starknet based on the user's request. It retrieves the necessary information from the user's input, such as the token name, symbol, owner address, and initial supply. Then, it initiates the token deployment process on Starknet, creating the specified coin and launching it on Ekubo for trading.

#### Examples
- User: "Deploy a new token called Lords with the symbol LORDS, owned by 0x024BA6a4023fB90962bDfc2314F3B94372aa382D155291635fc3E6b777657A5B and initial supply of 1000000000000000000 on Starknet"
  Agent: "Ok, I'll deploy the Lords token to Starknet"

- User: "Deploy the SLINK coin to Starknet"
  Agent: "Ok, I'll deploy your coin on Starknet"

- User: "Create a new coin on Starknet"
  Agent: "Ok, I'll create a new coin for you on Starknet"

### CREATE_SUBDOMAIN
Action to handle the creation of a subdomain on Starknet.

#### Properties
- Name: CREATE_SUBDOMAIN
- Similes: 
    - CREATE_SUBDOMAIN_ON_STARKNET
    - SUBDOMAIN_ON_STARKNET
    - SUBDOMAIN_CREATION
    - SEND_SUBDOMAIN_ON_STARKNET

#### Handler
This handler processes the creation of a subdomain on Starknet. It validates the content of the subdomain creation request and transfers the subdomain to the specified recipient.

#### Examples
- User:
    - "Send me subdomain.domain.stark to 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49"
- Agent:
    - "I'll transfer subdomain.domain.stark to that address right away. Let me process that for you."



### Providers
No providers documentation available.

### Evaluators
No evaluators documentation available.

## Usage Examples
### providers/portfolioProvider.ts

### Common Use Cases
1. Retrieve wallet portfolio token balances:
```typescript
const walletProvider = new WalletProvider(runtime);
walletProvider.getWalletPortfolio().then((tokenBalances) => {
  console.log(tokenBalances);
});
```

2. Retrieve token USD values using Coingecko API:
```typescript
const walletProvider = new WalletProvider(runtime);
walletProvider.getTokenUsdValues().then((coingeckoPrices) => {
  console.log(coingeckoPrices);
});
```

### Best Practices
- Ensure to handle the promises returned by the `getWalletPortfolio` and `getTokenUsdValues` methods appropriately to avoid any uncaught promise rejections.
- Consider implementing caching strategies for the retrieved data to improve performance and reduce the number of API calls.

### providers/token.ts

### Common Use Cases
1. Fetching token data and analyzing it:
```typescript
const tokenProvider = new TokenProvider("tokenAddress", walletProvider);
const processedData = await tokenProvider.getProcessedTokenData();
const shouldTrade = await tokenProvider.shouldTradeToken();
console.log(processedData);
console.log(shouldTrade);
```

2. Fetching token security data and generating a formatted token report:
```typescript
const tokenProvider = new TokenProvider("tokenAddress", walletProvider);
const securityData = await tokenProvider.fetchTokenSecurity();
const tokenReport = await tokenProvider.getFormattedTokenReport();
console.log(securityData);
console.log(tokenReport);
```

### Best Practices
- When initializing a `TokenProvider` instance, make sure to provide the correct token address and a valid `WalletProvider` for seamless interaction with the blockchain.
- Utilize the provided methods in a sequential manner for a comprehensive analysis of token data and informed decision-making regarding trading activities.

### providers/trustScoreProvider.ts

### Common Use Cases
1. Generating and managing trust scores for users based on various metrics.
   ```typescript
   const trustScoreManager = new TrustScoreManager(tokenProvider, trustScoreDb, 0.02, 30, backend, backendToken, runtime);
   const tokenAddress = "0x123abc";
   const recommenderId = "456def";
   
   trustScoreManager.generateTrustScore(tokenAddress, recommenderId, "recommenderWalletAddress")
     .then((result) => {
         console.log(result);
     })
     .catch((error) => {
         console.error(error);
     });
   ```

2. Retrieving a recommender's balance asynchronously.
   ```typescript
   trustScoreManager.getRecommenderBalance("recommenderWalletAddress")
     .then((balance) => {
         console.log(`Recommender's wallet balance: ${balance}`);
     })
     .catch((error) => {
         console.error(error);
     });
   ```

### Best Practices
- Ensure that all necessary parameters are provided when using methods to avoid unexpected behavior.
- Handle promise rejection appropriately to prevent uncaught errors.

### utils/ERC20Token.ts

### Common Use Cases
1. Create an instance of an ERC20Token contract and interact with it by getting the balance of an account or fetching the decimal value.
```typescript
import { ERC20Token } from 'utils/ERC20Token';

const token = new ERC20Token('0x1234567890abcdef', providerOrAccount);
const balance = await token.balanceOf('0x9876543210fedcba');
const decimals = await token.decimals();
```

2. Generate approval or transfer calls for a specific spender or recipient respectively.
```typescript
import { ERC20Token } from 'utils/ERC20Token';

const token = new ERC20Token('0x1234567890abcdef', providerOrAccount);
const approveCall = token.approveCall('0xabcdef1234567890', 100n);
const transferCall = token.transferCall('0xfedcba0987654321', 50n);
```

### Best Practices
- When interacting with ERC20 tokens, always ensure that you have the correct token address and provider or account set to avoid errors.
- Handle BigInt values appropriately when dealing with balances and amounts to prevent loss of precision.

### utils/cache.ts

### Common Use Cases
1. Storing and retrieving data from a cache:
```typescript
import { Cache } from './utils/cache';

// Creating a new cache instance
const cache = new Cache();

// Setting data in the cache
cache.set('key1', 'value1');

// Getting data from the cache
const value = cache.get('key1');
console.log(value); // Output: value1
```

2. Reading and writing cache data to a file:
```typescript
import { Cache } from './utils/cache';

const cache = new Cache();

// Writing data to a cache file
cache.writeCacheToFile('key2', 'value2');

// Reading data from a cache file
const data = cache.readCacheFromFile<string>('key2');
console.log(data); // Output: value2
```

### Best Practices
- Ensure to handle potential errors while reading from or writing to cache files.
- Use unique and meaningful cache keys to avoid conflicts.

### actions/subdomain.ts

### Common Use Cases
1. Checking if provided content is valid for subdomain creation:
```typescript
import { isSubdomainCreation } from './actions/subdomain';

const content = {
  recipient: 'exampleRecipient',
  subdomain: 'exampleSubdomain'
};

const isValid = isSubdomainCreation(content);
console.log(isValid); // true
```

2. Validating subdomain creation content before making a subdomain creation request:
```typescript
import { isSubdomainCreation } from './actions/subdomain';

const content = {
  recipient: 'exampleRecipient',
  subdomain: ''
};

if (!isSubdomainCreation(content)) {
  console.log('Invalid subdomain creation content');
} else {
  // Make subdomain creation request
}
```

### Best Practices
- Validate subdomain creation content before proceeding with the creation request to avoid errors.
- Ensure that the recipient and subdomain fields are provided in the content object before calling the isSubdomainCreation function.

### actions/swap.ts

### Common Use Cases

1. Checking if a given content object is a valid SwapContent object:
```typescript
import { isSwapContent, SwapContent } from 'actions/swap';

const content: SwapContent = {
  sellTokenAddress: '0x123abc',
  buyTokenAddress: '0x456def',
  sellAmount: '100'
};

const isValidSwapContent = isSwapContent(content);
console.log(isValidSwapContent); // Output: true
```

2. Performing a swap using the provided content:
```typescript
import { performSwap, SwapContent } from 'actions/swap';

const content: SwapContent = {
  sellTokenAddress: '0x123abc',
  buyTokenAddress: '0x456def',
  sellAmount: '100'
};

performSwap(content);
```

### Best Practices
- Ensure that the content object passed to `isSwapContent` or `performSwap` adheres to the structure defined in the `SwapContent` interface.
- Handle any errors or exceptions that may occur during the swap process for a robust implementation.

### actions/takeOrder.ts

### Common Use Cases
1. Create a new order:
```typescript
import { Order } from './interfaces';

const newOrder: Order = {
  userId: '1234',
  ticker: 'AAPL',
  contractAddress: '0x123456789',
  timestamp: '2022-01-01T12:00:00',
  buyAmount: 10,
  price: 150
};

// Call a function to process this new order
```

2. Update an existing order:
```typescript
import { Order } from './interfaces';

const existingOrder: Order = {
  userId: '5678',
  ticker: 'GOOGL',
  contractAddress: '0x987654321',
  timestamp: '2022-01-02T10:00:00',
  buyAmount: 5,
  price: 200
};

// Call a function to update this existing order
```

### Best Practices
- Always validate the data before creating or updating an order.
- Use proper error handling to deal with any issues that may arise during order processing.

### actions/transfer.ts

### Common Use Cases
1. Validate if a given content object is a valid TransferContent object:
```typescript
import { TransferContent, isTransferContent } from './actions/transfer';

const content: TransferContent = {
  tokenAddress: '0x123abc...',
  amount: '100',
  recipient: '0x456def...',
};

const isValidTransferContent: boolean = isTransferContent(content);
console.log(isValidTransferContent); // Output: true
```

2. Perform transfer operation based on TransferContent object:
```typescript
import { TransferContent } from './actions/transfer';

function transferFunds(transferData: TransferContent): void {
  // Perform transfer operation using the provided transfer data
  console.log(`Transferring ${transferData.amount} tokens to ${transferData.recipient}`);
}

const transferInfo: TransferContent = {
  tokenAddress: '0x123abc...',
  amount: '50',
  recipient: '0x789ghi...',
};

transferFunds(transferInfo);
// Output: Transferring 50 tokens to 0x789ghi...
```

### Best Practices
- Always provide all required properties when creating a TransferContent object to ensure accurate data for transfer operations.
- Use the `isTransferContent` function to validate TransferContent objects before performing any transfer operations to avoid errors.

### actions/unruggable.ts

### Common Use Cases
1. Deploying a new token:
```typescript
const tokenContent: DeployTokenContent = {
    name: "MyToken",
    symbol: "MTK",
    owner: "0x1234567890abcdef",
    initialSupply: "1000000000"
};

if (isDeployTokenContent(tokenContent)) {
    // Proceed with deploying the token
} else {
    console.error("Invalid token content");
}
```

2. Checking if a given object is a valid DeployTokenContent:
```typescript
const invalidTokenContent = {
    name: "MyToken",
    symbol: "MTK",
    owner: "0x1234567890abcdef"
};

if (isDeployTokenContent(invalidTokenContent)) {
    console.log("This is a valid DeployTokenContent");
} else {
    console.error("Invalid token content");
}
```

### Best Practices
- Make sure to always validate the object using `isDeployTokenContent` before proceeding with any actions that require a DeployTokenContent object.
- Use the `DeployTokenContent` interface to define the structure of token deployment content consistently throughout your codebase.

### providers/utils.ts

### Common Use Cases
1. **Token Trading Evaluation:**  
   ```typescript
   import { evaluateTokenTrading } from './providers/utils.ts';

   const metrics = {
       liquidityUsd: 1000000,
       marketCapUsd: 2000000,
       totalSupply: 100000000,
       ownerPercentage: 0.1,
       creatorPercentage: 0.05,
       top10HolderPercent: 0.3,
       priceChange24hPercent: 1.5,
       priceChange12hPercent: 0.8,
       uniqueWallet24h: 1000,
       volume24hUsd: 500000
   };

   const thresholds = {
       volume24hUsdThreshold: 100000,
       priceChange24hPercentThreshold: 2,
       priceChange12hPercentThreshold: 1,
       top10HolderPercentThreshold: 0.5,
       uniqueWallet24hThreshold: 500,
       minimumLiquidityUsd: 500000,
       minimumMarketCapUsd: 1000000
   };

   const evaluationResult = evaluateTokenTrading(metrics, thresholds);
   console.log(evaluationResult);
   ```
2. **High Supply Holders Analysis:**  
   ```typescript
   import { analyzeHighSupplyHolders } from './providers/utils.ts';

   const holderParams = {
       holders: [
           { address: '0x1234', balance: '1000' },
           { address: '0x5678', balance: '2000' },
           { address: '0x9abc', balance: '3000' }
       ],
       ownerBalance: '5000',
       creatorBalance: '5000',
       thresholdPercentage: 0.5
   };

   const analysisResult = analyzeHighSupplyHolders(holderParams);
   console.log(analysisResult);
   ```

### Best Practices
- **Ensure Proper Typing:** It's important to provide correct types for the parameters to avoid runtime errors and ensure type safety.
- **Handle Optional Parameters:** When using optional parameters like in the TradingThresholds interface, make sure to provide default values if needed to handle cases where they are not provided.

### types/token.ts

- **First use case with code example:**
  - Use Case: Creating a quote request object using the QuoteRequest interface.
  
  ```typescript
  import { QuoteRequest } from './types/token';

  const quoteRequest: QuoteRequest = {
      sellTokenAddress: '0x123abc',
      buyTokenAddress: '0x456def',
      sellAmount: 100,
      takerAddress: '0x789ghi',
      size: 3,
      excludeSources: ['Source1', 'Source2'],
      integratorFees: 50,
      integratorFeeRecipient: '0xabc123',
      integratorName: 'MyIntegratorApp'
  };
  ```

- **Second use case with code example:**
  - Use Case: Creating a token information object using the TokenInfo interface.
  
  ```typescript
  import { TokenInfo } from './types/token';

  const tokenInfo: TokenInfo = {
      name: 'MyToken',
      symbol: 'MTK',
      address: '0x789xyz',
      logoUri: 'https://example.com/tokenlogo.png',
      coingeckoId: 'my-token',
      verified: true,
      market: {
          currentPrice: 1.234,
          marketCap: 5000000,
          fullyDilutedValuation: 10000000,
          starknetTvl: 2000000,
          priceChange1h: 0.05,
          priceChangePercentage1h: 5,
          // Add other market information here
      },
      tags: ['defi', 'erc20']
  };
  ```

- **Best Practice 1:**
  - Ensure to provide all required properties when creating an object using an interface to avoid compilation errors.

- **Best Practice 2:**
  - Use interfaces to define the structure of objects for better code readability and maintainability.

### types/trustDB.ts

### Common Use Cases
1. Creating a new token entry in the TrustDB database:
```typescript
import { TrustDB } from './types/trustDB';

const tokenData: TrustDB.ProcessedTokenData = {
    security: {
        ownerBalance: '1000',
        creatorBalance: '500',
        ownerPercentage: 60,
        creatorPercentage: 40,
        top10HolderBalance: '2000',
        top10HolderPercent: 30
    },
    tradeData: {
        address: '0x123abc',
        holder: 100,
        market: 500000,
        last_trade_unix_time: 1630367516,
        last_trade_human_time: '2021-08-30 10:58:36',
        price: 2.5,
        history_30m_price: 2.7,
        price_change_30m_percent: -7,
        history_1h_price: 2.3,
        price_change_1h_percent: 4
    },
    holderDistributionTrend: 'stable',
    highValueHolders: [
        { holderAddress: '0xaaa111', balanceUsd: '5000' },
        { holderAddress: '0xbbb222', balanceUsd: '3000' }
    ],
    recentTrades: true,
    highSupplyHoldersCount: 5,
    dexScreenerData: {
        schemaVersion: '1.0',
        pairs: []
    },
    isDexScreenerListed: false,
    isDexScreenerPaid: true
};

TrustDB.addTokenEntry(tokenData);
```

2. Retrieving token information from the TrustDB database:
```typescript
import { TrustDB } from './types/trustDB';

const tokenAddress = '0x123abc';
const tokenInfo = TrustDB.getTokenInfo(tokenAddress);

console.log(tokenInfo);
```

### Best Practices
- Always ensure that the data passed to the TrustDB functions adheres to the defined interfaces to maintain data consistency and integrity.
- Use TypeScript's type checking to catch potential errors when working with TrustDB data structures.

### utils/index.ts

### Common Use Cases
1. **Fetching Data with Retry**:
   
   This code can be used to fetch data from a URL with retries based on the specified configuration. This is useful when dealing with unreliable network connections or temporary server issues.

   ```typescript
   import { fetchWithRetry, RetryConfig } from './utils';

   const url = 'https://api.example.com/data';
   const retryConfig: RetryConfig = {
       maxRetries: 5,
       delay: 2000,
       maxDelay: 60000,
       backoff: (retryCount, delay, maxDelay) => Math.min(delay * 2, maxDelay)
   };

   fetchWithRetry<Data>(url, {}, retryConfig)
       .then(data => console.log(data))
       .catch(error => console.error(error));
   ```

2. **Parsing Currency Amount**:

   The ParseCurrencyAmountOptions interface can be used to specify options for parsing a currency amount. This can be handy when working with financial data that requires specific formatting.

   ```typescript
   import { ParseCurrencyAmountOptions } from './utils';

   const amount = 123.456;
   const options: ParseCurrencyAmountOptions = {
       fixed: 2,
   };

   const formattedAmount = amount.toFixed(options.fixed);
   console.log(formattedAmount);
   ```

### Best Practices
- Ensure to handle errors appropriately when using `fetchWithRetry` to avoid unexpected behavior in the application.
- Document the configuration options clearly when using the `RetryConfig` type to make it easier for other developers to understand and use the code effectively.

### environment.ts

### Common Use Cases
1. **Validate Starknet Configuration:**  
   This code can be used to validate the Starknet configuration based on the runtime object provided. It ensures that the configuration is correct before using it in the application.

   ```typescript
   import { IAgentRuntime } from 'runtime';
   import { StarknetConfig, validateStarknetConfig } from 'environment';

   const runtime: IAgentRuntime = getAgentRuntime();
   
   validateStarknetConfig(runtime)
       .then((validConfig: StarknetConfig) => {
           console.log('Starknet configuration is valid:', validConfig);
       })
       .catch((error: Error) => {
           console.error('Error validating Starknet configuration:', error.message);
       });
   ```

2. **Handle Errors for Invalid Configuration:**  
   Another use case is to catch and handle errors if the Starknet configuration validation fails. This ensures that any issues with the configuration are properly managed.

   ```typescript
   import { IAgentRuntime } from 'runtime';
   import { StarknetConfig, validateStarknetConfig } from 'environment';

   const runtime: IAgentRuntime = getAgentRuntime();
   
   validateStarknetConfig(runtime)
       .then((validConfig: StarknetConfig) => {
           console.log('Starknet configuration is valid:', validConfig);
       })
       .catch((error: Error) => {
           console.error('Error validating Starknet configuration:', error.message);
           // Handle the error or notify the user
       });
   ```

### Best Practices
- **Handle Promise Rejections:**  
  It is recommended to handle promise rejections properly to prevent uncaught errors. Always use `.catch()` to handle any errors that may occur during the validation process.

- **Use Interfaces for Typed Parameters:**  
  When passing runtime objects or configurations, consider using interfaces to define the types. This helps in maintaining type safety and improves code readability.

## API Reference
### File: `providers/portfolioProvider.ts`
#### Classes

##### `WalletProvider`

```typescript
/**
 * Class representing a WalletProvider.
 */
 
/**
 * Retrieves the wallet portfolio with token balances.
 * @returns {Promise<TokenBalances>} The token balances in the wallet portfolio.
 */
 
/**
 * Retrieves the USD values of the tokens in the wallet portfolio using Coingecko API.
 * @returns {Promise<CoingeckoPrices>} The USD values of the tokens.
 */
```

**Implementation:**

```typescript
export class WalletProvider {
    private runtime: IAgentRuntime;

    constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;
    }

    async getWalletPortfolio(): Promise<TokenBalances> {
        const cacheKey = `walletPortfolio-${this.runtime.agentId}`;
        const cachedValues =
            await this.runtime.cacheManager.get<TokenBalances>(cacheKey);
        if (cachedValues) {
            elizaLogger.debug("Using cached data for getWalletPortfolio()");
            return cachedValues;
        }

        const starknetAccount = getStarknetAccount(this.runtime);
        const balances: TokenBalances = {};

        // reading balances sequentially to prevent API issues
        for (const token of Object.values(PORTFOLIO_TOKENS)) {
            const erc20 = new ERC20Token(token.address, starknetAccount);
            const balance = await erc20.balanceOf(starknetAccount.address);
            balances[token.address] = balance;
        }

        await this.runtime.cacheManager.set(cacheKey, balances, {
            expires: Date.now() + 180 * 60 * 1000, // 3 hours cache
        });

        return balances;
    }

    async getTokenUsdValues(): Promise<CoingeckoPrices> {
        const cacheKey = "tokenUsdValues";
        const cachedValues =
            await this.runtime.cacheManager.get<CoingeckoPrices>(cacheKey);
        if (cachedValues) {
            elizaLogger.debug("Using cached data for getTokenUsdValues()");
            return cachedValues;
        }

        const coingeckoIds = Object.values(PORTFOLIO_TOKENS)
            .map((token) => token.coingeckoId)
            .join(",");

        const coingeckoPrices = await fetchWithRetry<CoingeckoPrices>(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`
        );

        await this.runtime.cacheManager.set(cacheKey, coingeckoPrices, {
            expires: Date.now() + 30 * 60 * 1000, // 30 minutes cache
        });

        return coingeckoPrices;
    }
}
```

#### Types

##### `CoingeckoPrices`

```typescript
/**
 * Defines a type representing the prices of cryptocurrencies in USD as fetched from Coingecko API.
 * @typedef {Object.<string, {usd: number}>} CoingeckoPrices
 */
```

**Implementation:**

```typescript
type CoingeckoPrices = {
    [cryptoName: string]: { usd: number };
};
```

##### `TokenBalances`

```typescript
/**
 * Represents the balances of different tokens, where the key is the token address and the value is the balance as a bigint.
 */
```

**Implementation:**

```typescript
type TokenBalances = {
    [tokenAddress: string]: bigint;
};
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for creating a new instance of the class.
 * 
 * @param {IAgentRuntime} runtime - The runtime object to be assigned to the instance.
 */
```

**Implementation:**

```typescript
constructor(runtime: IAgentRuntime) {
        this.runtime = runtime;
    }
```

##### `getWalletPortfolio`

```typescript
/**
 * Asynchronously retrieves the wallet portfolio token balances.
 * If cached values are available, they are returned instead of making API calls.
 * Balances are fetched sequentially to prevent API issues.
 *
 * @returns {Promise<TokenBalances>} A promise that resolves with an object containing token balances
 */
```

**Implementation:**

```typescript
async getWalletPortfolio(): Promise<TokenBalances> {
        const cacheKey = `walletPortfolio-${this.runtime.agentId}`;
        const cachedValues =
            await this.runtime.cacheManager.get<TokenBalances>(cacheKey);
        if (cachedValues) {
            elizaLogger.debug("Using cached data for getWalletPortfolio()");
            return cachedValues;
        }

        const starknetAccount = getStarknetAccount(this.runtime);
        const balances: TokenBalances = {};

        // reading balances sequentially to prevent API issues
        for (const token of Object.values(PORTFOLIO_TOKENS)) {
            const erc20 = new ERC20Token(token.address, starknetAccount);
            const balance = await erc20.balanceOf(starknetAccount.address);
            balances[token.address] = balance;
        }

        await this.runtime.cacheManager.set(cacheKey, balances, {
            expires: Date.now() + 180 * 60 * 1000, // 3 hours cache
        });

        return balances;
    }
```

##### `getTokenUsdValues`

```typescript
/**
 * Retrieves token USD values from Coingecko API.
 * If cached data is available, it returns the cached data.
 * Otherwise, it fetches the latest token USD values from Coingecko API, caches them, and returns them.
 * @returns {Promise<CoingeckoPrices>} The token USD values from Coingecko API
 */
```

**Implementation:**

```typescript
async getTokenUsdValues(): Promise<CoingeckoPrices> {
        const cacheKey = "tokenUsdValues";
        const cachedValues =
            await this.runtime.cacheManager.get<CoingeckoPrices>(cacheKey);
        if (cachedValues) {
            elizaLogger.debug("Using cached data for getTokenUsdValues()");
            return cachedValues;
        }

        const coingeckoIds = Object.values(PORTFOLIO_TOKENS)
            .map((token) => token.coingeckoId)
            .join(",");

        const coingeckoPrices = await fetchWithRetry<CoingeckoPrices>(
            `https://api.coingecko.com/api/v3/simple/price?ids=${coingeckoIds}&vs_currencies=usd`
        );

        await this.runtime.cacheManager.set(cacheKey, coingeckoPrices, {
            expires: Date.now() + 30 * 60 * 1000, // 30 minutes cache
        });

        return coingeckoPrices;
    }
```
### File: `providers/token.ts`
#### Classes

##### `TokenProvider`

```typescript
/**
 * Class representing a TokenProvider.
 * @class
 * @classdesc A class for handling tokens.
 * @param {string} tokenAddress - The address of the token.
 * @param {WalletProvider} walletProvider - The wallet provider for interacting with the blockchain.
 */
```

**Implementation:**

```typescript
export class TokenProvider {
    private cache: Cache;

    constructor(
        private tokenAddress: string,
        private walletProvider: WalletProvider
    ) {
        this.cache = new Cache();
    }

    // TODO: remove this
    private async fetchWithRetry<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        let lastError: Error;

        for (let i = 0; i < PROVIDER_CONFIG.MAX_RETRIES; i++) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...options.headers,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! status: ${
                            response.status
                        }, message: ${await response.text()}`
                    );
                }

                return await response.json();
            } catch (error) {
                console.error(`Request attempt ${i + 1} failed:`, error);
                lastError = error as Error;

                if (i < PROVIDER_CONFIG.MAX_RETRIES - 1) {
                    const delay = PROVIDER_CONFIG.RETRY_DELAY * Math.pow(2, i);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError;
    }

    // TODO: Update to Starknet
    async getTokensInWallet(runtime: IAgentRuntime): Promise<Item[]> {
        const walletInfo =
            await this.walletProvider.fetchPortfolioValue(runtime);
        const items = walletInfo.items;
        return items;
    }

    // check if the token symbol is in the wallet
    async getTokenFromWallet(runtime: IAgentRuntime, tokenSymbol: string) {
        try {
            const items = await this.getTokensInWallet(runtime);
            const token = items.find((item) => item.symbol === tokenSymbol);

            if (token) {
                return token.address;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error checking token in wallet:", error);
            return null;
        }
    }

    async fetchPrices(): Promise<Prices> {
        try {
            const cacheKey = "prices";
            const cachedData = this.cache.getCachedData<Prices>(cacheKey);
            if (cachedData) {
                console.log("Returning cached prices.");
                return cachedData;
            }

            const { BTC, ETH, STRK } = PROVIDER_CONFIG.TOKEN_ADDRESSES;
            const tokens = [BTC, ETH, STRK];
            const prices: Prices = {
                starknet: { usd: "0" },
                bitcoin: { usd: "0" },
                ethereum: { usd: "0" },
            };

            const tokenResponses = await Promise.all(
                tokens.map((token) =>
                    fetch(`${PROVIDER_CONFIG.AVNU_API}/tokens/${token}`, {
                        method: "GET",
                        headers: {},
                    }).then((res) => res.json())
                )
            );

            tokenResponses.forEach((tokenInfo: TokenInfo, index) => {
                if (!tokenInfo.market) {
                    console.warn(
                        `No price data available for token: ${tokens[index]}`
                    );
                    return;
                }

                const token = tokens[index];
                const priceKey =
                    token === STRK
                        ? "starknet"
                        : token === BTC
                          ? "bitcoin"
                          : "ethereum";

                prices[priceKey].usd = tokenInfo.market.currentPrice.toString();
            });

            this.cache.setCachedData(cacheKey, prices);
            return prices;
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw error;
        }
    }

    async calculateBuyAmounts(): Promise<CalculatedBuyAmounts> {
        const dexScreenerData = await this.fetchDexScreenerData();
        const prices = await this.fetchPrices();
        const starknetPrice = num.toBigInt(prices.starknet.usd);

        if (!dexScreenerData || dexScreenerData.pairs.length === 0) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        // Get the first pair
        const pair = dexScreenerData.pairs[0];
        const { liquidity, marketCap } = pair;
        if (!liquidity || !marketCap) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        if (liquidity.usd === 0) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }
        if (marketCap < 100000) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        // impact percentages based on liquidity
        const impactPercentages = {
            LOW: 0.01, // 1% of liquidity
            MEDIUM: 0.05, // 5% of liquidity
            HIGH: 0.1, // 10% of liquidity
        };

        // Calculate buy amounts in USD
        const lowBuyAmountUSD = liquidity.usd * impactPercentages.LOW;
        const mediumBuyAmountUSD = liquidity.usd * impactPercentages.MEDIUM;
        const highBuyAmountUSD = liquidity.usd * impactPercentages.HIGH;

        // Convert each buy amount to STRK
        const lowBuyAmountSTRK = num.toBigInt(lowBuyAmountUSD) / starknetPrice;
        const mediumBuyAmountSTRK =
            num.toBigInt(mediumBuyAmountUSD) / starknetPrice;
        const highBuyAmountSTRK =
            num.toBigInt(highBuyAmountUSD) / starknetPrice;

        return {
            none: 0,
            low: Number(lowBuyAmountSTRK),
            medium: Number(mediumBuyAmountSTRK),
            high: Number(highBuyAmountSTRK),
        };
    }

    // TODO: Update to Starknet
    async fetchTokenSecurity(): Promise<TokenSecurityData> {
        const cacheKey = `tokenSecurity_${this.tokenAddress}`;
        const cachedData =
            this.cache.getCachedData<TokenSecurityData>(cacheKey);
        if (cachedData) {
            console.log(
                `Returning cached token security data for ${this.tokenAddress}.`
            );
            return cachedData;
        }
        // const url = `${PROVIDER_CONFIG.AVNU_API}${PROVIDER_CONFIG.TOKEN_SECURITY_ENDPOINT}${this.tokenAddress}`;
        // const data = await this.fetchWithRetry(url);

        // if (!data?.success || !data?.data) {
        //     throw new Error("No token security data available");
        // }

        // TODO: Update to Starknet
        const security: TokenSecurityData = {
            ownerBalance: "0",
            creatorBalance: "0",
            ownerPercentage: 0,
            creatorPercentage: 0,
            top10HolderBalance: "0",
            top10HolderPercent: 0,
        };
        this.cache.setCachedData(cacheKey, security);
        console.log(`Token security data cached for ${this.tokenAddress}.`);

        return security;
    }

    // TODO: Update to Starknet
    async fetchTokenTradeData(): Promise<TokenInfo> {
        const cacheKey = `tokenTradeData_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<TokenInfo>(cacheKey);
        if (cachedData) {
            console.log(
                `Returning cached token trade data for ${this.tokenAddress}.`
            );
            return cachedData;
        }

        try {
            const response = await fetch(
                `${PROVIDER_CONFIG.AVNU_API}/tokens/${this.tokenAddress}`,
                {
                    method: "GET",
                    headers: {},
                }
            );

            const data = await response.json();

            if (!data?.success || !data?.data) {
                throw new Error("No token trade data available");
            }

            const tradeData: TokenInfo = {
                name: data.data.name,
                symbol: data.data.symbol,
                address: data.data.address,
                logoUri: data.data.logoUri,
                coingeckoId: data.data.coingeckoId,
                verified: data.data.verified,
                market: {
                    currentPrice: data.data.market.currentPrice,
                    marketCap: data.data.market.marketCap,
                    fullyDilutedValuation:
                        data.data.market.fullyDilutedValuation,
                    starknetTvl: data.data.market.starknetTvl,
                    priceChange1h: data.data.market.priceChange1h,
                    priceChangePercentage1h:
                        data.data.market.priceChangePercentage1h,
                    priceChange24h: data.data.market.priceChange24h,
                    priceChangePercentage24h:
                        data.data.market.priceChangePercentage24h,
                    priceChange7d: data.data.market.priceChange7d,
                    priceChangePercentage7d:
                        data.data.market.priceChangePercentage7d,
                    marketCapChange24h: data.data.market.marketCapChange24h,
                    marketCapChangePercentage24h:
                        data.data.market.marketCapChangePercentage24h,
                    starknetVolume24h: data.data.market.starknetVolume24h,
                    starknetTradingVolume24h:
                        data.data.market.starknetTradingVolume24h,
                },
                tags: data.data.tags,
            };

            this.cache.setCachedData(cacheKey, tradeData);
            return tradeData;
        } catch (error) {
            console.error("Error fetching token trade data:", error);
            throw error;
        }
    }

    async fetchDexScreenerData(): Promise<DexScreenerData> {
        const cacheKey = `dexScreenerData_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<DexScreenerData>(cacheKey);
        if (cachedData) {
            console.log("Returning cached DexScreener data.");
            return cachedData;
        }

        const url = `https://api.dexscreener.com/latest/dex/search?q=${this.tokenAddress}`;
        try {
            console.log(
                `Fetching DexScreener data for token: ${this.tokenAddress}`
            );
            const data = await fetch(url)
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                });

            if (!data || !data.pairs) {
                throw new Error("No DexScreener data available");
            }

            const dexData: DexScreenerData = {
                schemaVersion: data.schemaVersion,
                pairs: data.pairs,
            };

            // Cache the result
            this.cache.setCachedData(cacheKey, dexData);

            return dexData;
        } catch (error) {
            console.error(`Error fetching DexScreener data:`, error);
            return {
                schemaVersion: "1.0.0",
                pairs: [],
            };
        }
    }

    async searchDexScreenerData(
        symbol: string
    ): Promise<DexScreenerPair | null> {
        const cacheKey = `dexScreenerData_search_${symbol}`;
        const cachedData = this.cache.getCachedData<DexScreenerData>(cacheKey);
        if (cachedData) {
            console.log("Returning cached search DexScreener data.");
            return this.getHighestLiquidityPair(cachedData);
        }

        const url = `https://api.dexscreener.com/latest/dex/search?q=${symbol}`;
        try {
            console.log(`Fetching DexScreener data for symbol: ${symbol}`);
            const data = await fetch(url)
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                    return null;
                });

            if (!data || !data.pairs || data.pairs.length === 0) {
                throw new Error("No DexScreener data available");
            }

            const dexData: DexScreenerData = {
                schemaVersion: data.schemaVersion,
                pairs: data.pairs,
            };

            // Cache the result
            this.cache.setCachedData(cacheKey, dexData);

            // Return the pair with the highest liquidity and market cap
            return this.getHighestLiquidityPair(dexData);
        } catch (error) {
            console.error(`Error fetching DexScreener data:`, error);
            return null;
        }
    }

    getHighestLiquidityPair(dexData: DexScreenerData): DexScreenerPair | null {
        if (dexData.pairs.length === 0) {
            return null;
        }

        // Sort pairs by both liquidity and market cap to get the highest one
        return dexData.pairs.sort((a, b) => {
            const liquidityDiff = b.liquidity.usd - a.liquidity.usd;
            if (liquidityDiff !== 0) {
                return liquidityDiff; // Higher liquidity comes first
            }
            return b.marketCap - a.marketCap; // If liquidity is equal, higher market cap comes first
        })[0];
    }

    // TODO:
    async analyzeHolderDistribution(_tradeData: TokenInfo): Promise<string> {
        // Define the time intervals to consider (e.g., 30m, 1h, 2h)

        // TODO: Update to Starknet
        const intervals = [
            {
                period: "30m",
                change: 0,
            },
            { period: "1h", change: 0 },
            { period: "2h", change: 0 },
            { period: "4h", change: 0 },
            { period: "8h", change: 0 },
            {
                period: "24h",
                change: 0,
            },
        ];

        // Calculate the average change percentage
        const validChanges = intervals
            .map((interval) => interval.change)
            .filter(
                (change) => change !== null && change !== undefined
            ) as number[];

        if (validChanges.length === 0) {
            return "stable";
        }

        const averageChange =
            validChanges.reduce((acc, curr) => acc + curr, 0) /
            validChanges.length;

        const increaseThreshold = 10; // e.g., average change > 10%
        const decreaseThreshold = -10; // e.g., average change < -10%

        if (averageChange > increaseThreshold) {
            return "increasing";
        } else if (averageChange < decreaseThreshold) {
            return "decreasing";
        } else {
            return "stable";
        }
    }

    // TODO: Update to Starknet
    async fetchHolderList(): Promise<HolderData[]> {
        const cacheKey = `holderList_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<HolderData[]>(cacheKey);
        if (cachedData) {
            console.log("Returning cached holder list.");
            return cachedData;
        }

        const allHoldersMap = new Map<string, number>();
        let page = 1;
        const limit = 1000;
        let cursor;
        //HELIOUS_API_KEY needs to be added
        const url = `https://mainnet.helius-rpc.com/?api-key=${
            settings.HELIUS_API_KEY || ""
        }`;
        console.log({ url });

        try {
            while (true) {
                const params = {
                    limit: limit,
                    displayOptions: {},
                    mint: this.tokenAddress,
                    cursor: cursor,
                };
                if (cursor != undefined) {
                    params.cursor = cursor;
                }
                console.log(`Fetching holders - Page ${page}`);
                if (page > 2) {
                    break;
                }
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: "helius-test",
                        method: "getTokenAccounts",
                        params: params,
                    }),
                });

                const data = await response.json();

                if (
                    !data ||
                    !data.result ||
                    !data.result.token_accounts ||
                    data.result.token_accounts.length === 0
                ) {
                    console.log(
                        `No more holders found. Total pages fetched: ${
                            page - 1
                        }`
                    );
                    break;
                }

                console.log(
                    `Processing ${data.result.token_accounts.length} holders from page ${page}`
                );

                data.result.token_accounts.forEach((account: any) => {
                    const owner = account.owner;
                    const balance = parseFloat(account.amount);

                    if (allHoldersMap.has(owner)) {
                        allHoldersMap.set(
                            owner,
                            allHoldersMap.get(owner)! + balance
                        );
                    } else {
                        allHoldersMap.set(owner, balance);
                    }
                });
                cursor = data.result.cursor;
                page++;
            }

            const holders: HolderData[] = Array.from(
                allHoldersMap.entries()
            ).map(([address, balance]) => ({
                address,
                balance: balance.toString(),
            }));

            console.log(`Total unique holders fetched: ${holders.length}`);

            // Cache the result
            this.cache.setCachedData(cacheKey, holders);

            return holders;
        } catch (error) {
            console.error("Error fetching holder list from Helius:", error);
            throw new Error("Failed to fetch holder list from Helius.");
        }
    }

    async filterHighValueHolders(
        tradeData: TokenInfo
    ): Promise<Array<{ holderAddress: string; balanceUsd: string }>> {
        const holdersData = await this.fetchHolderList();

        const tokenPriceUsd = num.toBigInt(tradeData.market.currentPrice);

        const highValueHolders = holdersData
            .filter((holder) => {
                const balanceUsd = num.toBigInt(holder.balance) * tokenPriceUsd;
                return balanceUsd > 5;
            })
            .map((holder) => ({
                holderAddress: holder.address,
                balanceUsd: (
                    num.toBigInt(holder.balance) * tokenPriceUsd
                ).toString(),
            }));

        return highValueHolders;
    }

    async checkRecentTrades(volume24hUsd: bigint): Promise<boolean> {
        return volume24hUsd > 0;
    }

    async countHighSupplyHolders(
        securityData: TokenSecurityData
    ): Promise<number> {
        try {
            const holders = await this.fetchHolderList();
            const result = analyzeHighSupplyHolders({
                holders,
                ownerBalance: securityData.ownerBalance,
                creatorBalance: securityData.creatorBalance,
            });

            return result.count;
        } catch (error) {
            console.error("Error counting high supply holders:", error);
            return 0;
        }
    }

    async getProcessedTokenData(): Promise<ProcessedTokenData> {
        try {
            console.log(
                `Fetching security data for token: ${this.tokenAddress}`
            );
            const security = await this.fetchTokenSecurity();

            console.log(`Fetching trade data for token: ${this.tokenAddress}`);
            const tradeData = await this.fetchTokenTradeData();

            console.log(
                `Fetching DexScreener data for token: ${this.tokenAddress}`
            );
            const dexData = await this.fetchDexScreenerData();

            console.log(
                `Analyzing holder distribution for token: ${this.tokenAddress}`
            );
            const holderDistributionTrend =
                await this.analyzeHolderDistribution(tradeData);

            console.log(
                `Filtering high-value holders for token: ${this.tokenAddress}`
            );
            const highValueHolders =
                await this.filterHighValueHolders(tradeData);

            console.log(
                `Checking recent trades for token: ${this.tokenAddress}`
            );
            const recentTrades = await this.checkRecentTrades(
                num.toBigInt(tradeData.market.starknetTradingVolume24h)
            );

            console.log(
                `Counting high-supply holders for token: ${this.tokenAddress}`
            );
            const highSupplyHoldersCount =
                await this.countHighSupplyHolders(security);

            console.log(
                `Determining DexScreener listing status for token: ${this.tokenAddress}`
            );
            const isDexScreenerListed = dexData.pairs.length > 0;
            const isDexScreenerPaid = dexData.pairs.some(
                (pair) => pair.boosts && pair.boosts.active > 0
            );

            const processedData: ProcessedTokenData = {
                security,
                tradeData,
                holderDistributionTrend,
                highValueHolders,
                recentTrades,
                highSupplyHoldersCount,
                dexScreenerData: dexData,
                isDexScreenerListed,
                isDexScreenerPaid,
            };

            // console.log("Processed token data:", processedData);
            return processedData;
        } catch (error) {
            console.error("Error processing token data:", error);
            throw error;
        }
    }

    async shouldTradeToken(): Promise<boolean> {
        try {
            const tokenData = await this.getProcessedTokenData();
            const { tradeData, security, dexScreenerData } = tokenData;
            const { ownerBalance, creatorBalance } = security;
            const { liquidity, marketCap } = dexScreenerData.pairs[0];

            const totalSupply =
                num.toBigInt(ownerBalance) + num.toBigInt(creatorBalance);

            const metrics: TokenMetrics = {
                liquidityUsd: num.toBigInt(liquidity.usd),
                marketCapUsd: num.toBigInt(marketCap),
                totalSupply,
                ownerPercentage:
                    Number(num.toBigInt(ownerBalance)) / Number(totalSupply),
                creatorPercentage:
                    Number(num.toBigInt(creatorBalance)) / Number(totalSupply),
                top10HolderPercent:
                    Number(
                        num.toBigInt(tradeData.market.starknetTradingVolume24h)
                    ) / Number(totalSupply),
                priceChange24hPercent: Number(
                    num.toBigInt(tradeData.market.priceChange24h)
                ),
                // TODO: Update to Starknet
                priceChange12hPercent: Number(
                    num.toBigInt(tradeData.market.priceChange24h)
                ),
                // TODO: Update to Starknet
                uniqueWallet24h: 0,
                volume24hUsd: num.toBigInt(
                    tradeData.market.starknetTradingVolume24h
                ),
            };

            const { shouldTrade } = evaluateTokenTrading(metrics);
            return shouldTrade;
        } catch (error) {
            console.error("Error processing token data:", error);
            throw error;
        }
    }

    formatTokenData(data: ProcessedTokenData): string {
        let output = `**Token Security and Trade Report**\n`;
        output += `Token Address: ${this.tokenAddress}\n\n`;

        // Security Data
        output += `**Ownership Distribution:**\n`;
        output += `- Owner Balance: ${data.security.ownerBalance}\n`;
        output += `- Creator Balance: ${data.security.creatorBalance}\n`;
        output += `- Owner Percentage: ${data.security.ownerPercentage}%\n`;
        output += `- Creator Percentage: ${data.security.creatorPercentage}%\n`;
        output += `- Top 10 Holders Balance: ${data.security.top10HolderBalance}\n`;
        output += `- Top 10 Holders Percentage: ${data.security.top10HolderPercent}%\n\n`;

        // Trade Data
        output += `**Trade Data:**\n`;
        // output += `- Holders: ${data.tradeData.holder}\n`;
        // output += `- Unique Wallets (24h): ${data.tradeData.holders}\n`;
        output += `- Price Change (24h): ${data.tradeData.market.priceChange24h}%\n`;
        // output += `- Price Change (12h): ${data.tradeData.market.priceChange12h}%\n`;
        output += `- Volume (24h USD): $${num
            .toBigInt(data.tradeData.market.starknetTradingVolume24h)
            .toString()}\n`;
        output += `- Current Price: $${num
            .toBigInt(data.tradeData.market.currentPrice)
            .toString()}\n\n`;

        // Holder Distribution Trend
        output += `**Holder Distribution Trend:** ${data.holderDistributionTrend}\n\n`;

        // High-Value Holders
        output += `**High-Value Holders (>$5 USD):**\n`;
        if (data.highValueHolders.length === 0) {
            output += `- No high-value holders found or data not available.\n`;
        } else {
            data.highValueHolders.forEach((holder) => {
                output += `- ${holder.holderAddress}: $${holder.balanceUsd}\n`;
            });
        }
        output += `\n`;

        // Recent Trades
        output += `**Recent Trades (Last 24h):** ${
            data.recentTrades ? "Yes" : "No"
        }\n\n`;

        // High-Supply Holders
        output += `**Holders with >2% Supply:** ${data.highSupplyHoldersCount}\n\n`;

        // DexScreener Status
        output += `**DexScreener Listing:** ${
            data.isDexScreenerListed ? "Yes" : "No"
        }\n`;
        if (data.isDexScreenerListed) {
            output += `- Listing Type: ${
                data.isDexScreenerPaid ? "Paid" : "Free"
            }\n`;
            output += `- Number of DexPairs: ${data.dexScreenerData.pairs.length}\n\n`;
            output += `**DexScreener Pairs:**\n`;
            data.dexScreenerData.pairs.forEach((pair, index) => {
                output += `\n**Pair ${index + 1}:**\n`;
                output += `- DEX: ${pair.dexId}\n`;
                output += `- URL: ${pair.url}\n`;
                output += `- Price USD: $${num
                    .toBigInt(pair.priceUsd)
                    .toString()}\n`;
                output += `- Volume (24h USD): $${num
                    .toBigInt(pair.volume.h24)
                    .toString()}\n`;
                output += `- Boosts Active: ${
                    pair.boosts && pair.boosts.active
                }\n`;
                output += `- Liquidity USD: $${num
                    .toBigInt(pair.liquidity.usd)
                    .toString()}\n`;
            });
        }
        output += `\n`;

        console.log("Formatted token data:", output);
        return output;
    }

    async getFormattedTokenReport(): Promise<string> {
        try {
            console.log("Generating formatted token report...");
            const processedData = await this.getProcessedTokenData();
            return this.formatTokenData(processedData);
        } catch (error) {
            console.error("Error generating token report:", error);
            return "Unable to fetch token information. Please try again later.";
        }
    }
}
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for the class.
 * @param {string} tokenAddress - The address of the token.
 * @param {WalletProvider} walletProvider - The wallet provider to use.
 */
```

**Implementation:**

```typescript
constructor(
        private tokenAddress: string,
        private walletProvider: WalletProvider
    ) {
        this.cache = new Cache();
    }
```

##### `fetchWithRetry`

```typescript
/**
 * Fetches data from a URL with retry logic.
 * @template T
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options to include in the fetch request.
 * @returns {Promise<T>} The data fetched from the URL.
 */
```

**Implementation:**

```typescript
private async fetchWithRetry<T>(
        url: string,
        options: RequestInit = {}
    ): Promise<T> {
        let lastError: Error;

        for (let i = 0; i < PROVIDER_CONFIG.MAX_RETRIES; i++) {
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        ...options.headers,
                    },
                });

                if (!response.ok) {
                    throw new Error(
                        `HTTP error! status: ${
                            response.status
                        }, message: ${await response.text()}`
                    );
                }

                return await response.json();
            } catch (error) {
                console.error(`Request attempt ${i + 1} failed:`, error);
                lastError = error as Error;

                if (i < PROVIDER_CONFIG.MAX_RETRIES - 1) {
                    const delay = PROVIDER_CONFIG.RETRY_DELAY * Math.pow(2, i);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                }
            }
        }

        throw lastError;
    }
```

##### `getTokensInWallet`

```typescript
/**
 * Asynchronously retrieves the tokens in the user's wallet using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used to fetch the wallet information.
 * @returns {Promise<Item[]>} A Promise that resolves to an array of Item objects representing the tokens in the wallet.
 */
```

**Implementation:**

```typescript
async getTokensInWallet(runtime: IAgentRuntime): Promise<Item[]> {
        const walletInfo =
            await this.walletProvider.fetchPortfolioValue(runtime);
        const items = walletInfo.items;
        return items;
    }
```

##### `getTokenFromWallet`

```typescript
/**
 * Asynchronously retrieves the address of a specific token from the wallet based on the token symbol.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime.
 * @param {string} tokenSymbol - The symbol of the token to retrieve the address for.
 * @returns {Promise<string|null>} The address of the token if found, or null if not found or an error occurs.
 */
```

**Implementation:**

```typescript
async getTokenFromWallet(runtime: IAgentRuntime, tokenSymbol: string) {
        try {
            const items = await this.getTokensInWallet(runtime);
            const token = items.find((item) => item.symbol === tokenSymbol);

            if (token) {
                return token.address;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error checking token in wallet:", error);
            return null;
        }
    }
```

##### `fetchPrices`

```typescript
/**
 * Asynchronously fetches the prices of specified tokens from an external API.
 * If the prices are already cached, returns the cached prices instead.
 * 
 * @returns {Promise<Prices>} A Promise that resolves to an object containing the prices of the tokens.
 */
```

**Implementation:**

```typescript
async fetchPrices(): Promise<Prices> {
        try {
            const cacheKey = "prices";
            const cachedData = this.cache.getCachedData<Prices>(cacheKey);
            if (cachedData) {
                console.log("Returning cached prices.");
                return cachedData;
            }

            const { BTC, ETH, STRK } = PROVIDER_CONFIG.TOKEN_ADDRESSES;
            const tokens = [BTC, ETH, STRK];
            const prices: Prices = {
                starknet: { usd: "0" },
                bitcoin: { usd: "0" },
                ethereum: { usd: "0" },
            };

            const tokenResponses = await Promise.all(
                tokens.map((token) =>
                    fetch(`${PROVIDER_CONFIG.AVNU_API}/tokens/${token}`, {
                        method: "GET",
                        headers: {},
                    }).then((res) => res.json())
                )
            );

            tokenResponses.forEach((tokenInfo: TokenInfo, index) => {
                if (!tokenInfo.market) {
                    console.warn(
                        `No price data available for token: ${tokens[index]}`
                    );
                    return;
                }

                const token = tokens[index];
                const priceKey =
                    token === STRK
                        ? "starknet"
                        : token === BTC
                          ? "bitcoin"
                          : "ethereum";

                prices[priceKey].usd = tokenInfo.market.currentPrice.toString();
            });

            this.cache.setCachedData(cacheKey, prices);
            return prices;
        } catch (error) {
            console.error("Error fetching prices:", error);
            throw error;
        }
    }
```

##### `calculateBuyAmounts`

```typescript
/**
 * Asynchronously calculates the buy amounts in USD and converts them to STRK based on liquidity and market cap data.
 * @returns A Promise that resolves to an object containing the calculated buy amounts for different liquidity impact levels (none, low, medium, high).
 */
```

**Implementation:**

```typescript
async calculateBuyAmounts(): Promise<CalculatedBuyAmounts> {
        const dexScreenerData = await this.fetchDexScreenerData();
        const prices = await this.fetchPrices();
        const starknetPrice = num.toBigInt(prices.starknet.usd);

        if (!dexScreenerData || dexScreenerData.pairs.length === 0) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        // Get the first pair
        const pair = dexScreenerData.pairs[0];
        const { liquidity, marketCap } = pair;
        if (!liquidity || !marketCap) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        if (liquidity.usd === 0) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }
        if (marketCap < 100000) {
            return { none: 0, low: 0, medium: 0, high: 0 };
        }

        // impact percentages based on liquidity
        const impactPercentages = {
            LOW: 0.01, // 1% of liquidity
            MEDIUM: 0.05, // 5% of liquidity
            HIGH: 0.1, // 10% of liquidity
        };

        // Calculate buy amounts in USD
        const lowBuyAmountUSD = liquidity.usd * impactPercentages.LOW;
        const mediumBuyAmountUSD = liquidity.usd * impactPercentages.MEDIUM;
        const highBuyAmountUSD = liquidity.usd * impactPercentages.HIGH;

        // Convert each buy amount to STRK
        const lowBuyAmountSTRK = num.toBigInt(lowBuyAmountUSD) / starknetPrice;
        const mediumBuyAmountSTRK =
            num.toBigInt(mediumBuyAmountUSD) / starknetPrice;
        const highBuyAmountSTRK =
            num.toBigInt(highBuyAmountUSD) / starknetPrice;

        return {
            none: 0,
            low: Number(lowBuyAmountSTRK),
            medium: Number(mediumBuyAmountSTRK),
            high: Number(highBuyAmountSTRK),
        };
    }
```

##### `fetchTokenSecurity`

```typescript
/**
 * Asynchronously fetches the token security data for the current token address.
 * If the data is already cached, it returns the cached data. Otherwise, it fetches
 * the data from the specified endpoint and caches it for future use.
 * 
 * @returns {Promise<TokenSecurityData>} The token security data object containing 
 * various security parameters related to the token such as owner balance, creator balance,
 * owner percentage, creator percentage, top 10 holder balance, and top 10 holder percentage.
 */
```

**Implementation:**

```typescript
async fetchTokenSecurity(): Promise<TokenSecurityData> {
        const cacheKey = `tokenSecurity_${this.tokenAddress}`;
        const cachedData =
            this.cache.getCachedData<TokenSecurityData>(cacheKey);
        if (cachedData) {
            console.log(
                `Returning cached token security data for ${this.tokenAddress}.`
            );
            return cachedData;
        }
        // const url = `${PROVIDER_CONFIG.AVNU_API}${PROVIDER_CONFIG.TOKEN_SECURITY_ENDPOINT}${this.tokenAddress}`;
        // const data = await this.fetchWithRetry(url);

        // if (!data?.success || !data?.data) {
        //     throw new Error("No token security data available");
        // }

        // TODO: Update to Starknet
        const security: TokenSecurityData = {
            ownerBalance: "0",
            creatorBalance: "0",
            ownerPercentage: 0,
            creatorPercentage: 0,
            top10HolderBalance: "0",
            top10HolderPercent: 0,
        };
        this.cache.setCachedData(cacheKey, security);
        console.log(`Token security data cached for ${this.tokenAddress}.`);

        return security;
    }
```

##### `fetchTokenTradeData`

```typescript
/**
 * Asynchronously fetches token trade data.
 * 
 * @returns {Promise<TokenInfo>} A promise that resolves to the token trade data.
 */
```

**Implementation:**

```typescript
async fetchTokenTradeData(): Promise<TokenInfo> {
        const cacheKey = `tokenTradeData_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<TokenInfo>(cacheKey);
        if (cachedData) {
            console.log(
                `Returning cached token trade data for ${this.tokenAddress}.`
            );
            return cachedData;
        }

        try {
            const response = await fetch(
                `${PROVIDER_CONFIG.AVNU_API}/tokens/${this.tokenAddress}`,
                {
                    method: "GET",
                    headers: {},
                }
            );

            const data = await response.json();

            if (!data?.success || !data?.data) {
                throw new Error("No token trade data available");
            }

            const tradeData: TokenInfo = {
                name: data.data.name,
                symbol: data.data.symbol,
                address: data.data.address,
                logoUri: data.data.logoUri,
                coingeckoId: data.data.coingeckoId,
                verified: data.data.verified,
                market: {
                    currentPrice: data.data.market.currentPrice,
                    marketCap: data.data.market.marketCap,
                    fullyDilutedValuation:
                        data.data.market.fullyDilutedValuation,
                    starknetTvl: data.data.market.starknetTvl,
                    priceChange1h: data.data.market.priceChange1h,
                    priceChangePercentage1h:
                        data.data.market.priceChangePercentage1h,
                    priceChange24h: data.data.market.priceChange24h,
                    priceChangePercentage24h:
                        data.data.market.priceChangePercentage24h,
                    priceChange7d: data.data.market.priceChange7d,
                    priceChangePercentage7d:
                        data.data.market.priceChangePercentage7d,
                    marketCapChange24h: data.data.market.marketCapChange24h,
                    marketCapChangePercentage24h:
                        data.data.market.marketCapChangePercentage24h,
                    starknetVolume24h: data.data.market.starknetVolume24h,
                    starknetTradingVolume24h:
                        data.data.market.starknetTradingVolume24h,
                },
                tags: data.data.tags,
            };

            this.cache.setCachedData(cacheKey, tradeData);
            return tradeData;
        } catch (error) {
            console.error("Error fetching token trade data:", error);
            throw error;
        }
    }
```

##### `fetchDexScreenerData`

```typescript
/**
 * Fetches DexScreener data for a specific token address.
 * @returns {Promise<DexScreenerData>} The DexScreener data for the token address.
 */
```

**Implementation:**

```typescript
async fetchDexScreenerData(): Promise<DexScreenerData> {
        const cacheKey = `dexScreenerData_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<DexScreenerData>(cacheKey);
        if (cachedData) {
            console.log("Returning cached DexScreener data.");
            return cachedData;
        }

        const url = `https://api.dexscreener.com/latest/dex/search?q=${this.tokenAddress}`;
        try {
            console.log(
                `Fetching DexScreener data for token: ${this.tokenAddress}`
            );
            const data = await fetch(url)
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                });

            if (!data || !data.pairs) {
                throw new Error("No DexScreener data available");
            }

            const dexData: DexScreenerData = {
                schemaVersion: data.schemaVersion,
                pairs: data.pairs,
            };

            // Cache the result
            this.cache.setCachedData(cacheKey, dexData);

            return dexData;
        } catch (error) {
            console.error(`Error fetching DexScreener data:`, error);
            return {
                schemaVersion: "1.0.0",
                pairs: [],
            };
        }
    }
```

##### `searchDexScreenerData`

```typescript
/**
 * Searches DexScreener data for a specified symbol.
 * If the data is cached, returns the pair with the highest liquidity.
 * If not cached, fetches the data from DexScreener API and returns the pair with the highest liquidity.
 * @param {string} symbol - The symbol to search for.
 * @returns {Promise<DexScreenerPair | null>} Returns the pair with the highest liquidity if found, otherwise returns null.
 */
```

**Implementation:**

```typescript
async searchDexScreenerData(
        symbol: string
    ): Promise<DexScreenerPair | null> {
        const cacheKey = `dexScreenerData_search_${symbol}`;
        const cachedData = this.cache.getCachedData<DexScreenerData>(cacheKey);
        if (cachedData) {
            console.log("Returning cached search DexScreener data.");
            return this.getHighestLiquidityPair(cachedData);
        }

        const url = `https://api.dexscreener.com/latest/dex/search?q=${symbol}`;
        try {
            console.log(`Fetching DexScreener data for symbol: ${symbol}`);
            const data = await fetch(url)
                .then((res) => res.json())
                .catch((err) => {
                    console.error(err);
                    return null;
                });

            if (!data || !data.pairs || data.pairs.length === 0) {
                throw new Error("No DexScreener data available");
            }

            const dexData: DexScreenerData = {
                schemaVersion: data.schemaVersion,
                pairs: data.pairs,
            };

            // Cache the result
            this.cache.setCachedData(cacheKey, dexData);

            // Return the pair with the highest liquidity and market cap
            return this.getHighestLiquidityPair(dexData);
        } catch (error) {
            console.error(`Error fetching DexScreener data:`, error);
            return null;
        }
    }
```

##### `getHighestLiquidityPair`

```typescript
/**
 * Get the pair with the highest liquidity from the provided DexScreenerData object.
 *
 * @param {DexScreenerData} dexData - The DexScreenerData object containing pairs to search through
 * @returns {DexScreenerPair} The pair with the highest liquidity, or null if no pairs are found
 */
```

**Implementation:**

```typescript
getHighestLiquidityPair(dexData: DexScreenerData): DexScreenerPair | null {
        if (dexData.pairs.length === 0) {
            return null;
        }

        // Sort pairs by both liquidity and market cap to get the highest one
        return dexData.pairs.sort((a, b) => {
            const liquidityDiff = b.liquidity.usd - a.liquidity.usd;
            if (liquidityDiff !== 0) {
                return liquidityDiff; // Higher liquidity comes first
            }
            return b.marketCap - a.marketCap; // If liquidity is equal, higher market cap comes first
        })[0];
    }
```

##### `analyzeHolderDistribution`

```typescript
/**
 * Analyzes the distribution of holders based on the provided trade data.
 * Calculates the average change percentage over various time intervals (e.g., 30m, 1h, 2h) and determines if the holders are increasing, decreasing, or stable.
 * @param {TokenInfo} _tradeData - The trade data for the token.
 * @returns {Promise<string>} The analysis result: "increasing", "decreasing", or "stable".
 */
```

**Implementation:**

```typescript
async analyzeHolderDistribution(_tradeData: TokenInfo): Promise<string> {
        // Define the time intervals to consider (e.g., 30m, 1h, 2h)

        // TODO: Update to Starknet
        const intervals = [
            {
                period: "30m",
                change: 0,
            },
            { period: "1h", change: 0 },
            { period: "2h", change: 0 },
            { period: "4h", change: 0 },
            { period: "8h", change: 0 },
            {
                period: "24h",
                change: 0,
            },
        ];

        // Calculate the average change percentage
        const validChanges = intervals
            .map((interval) => interval.change)
            .filter(
                (change) => change !== null && change !== undefined
            ) as number[];

        if (validChanges.length === 0) {
            return "stable";
        }

        const averageChange =
            validChanges.reduce((acc, curr) => acc + curr, 0) /
            validChanges.length;

        const increaseThreshold = 10; // e.g., average change > 10%
        const decreaseThreshold = -10; // e.g., average change < -10%

        if (averageChange > increaseThreshold) {
            return "increasing";
        } else if (averageChange < decreaseThreshold) {
            return "decreasing";
        } else {
            return "stable";
        }
    }
```

##### `fetchHolderList`

```typescript
/**
 * Fetches the list of holders for a specific token address.
 * If the data is available in cache, returns the cached data.
 * Otherwise, makes API requests to Helius RPC to fetch the holders list.
 * 
 * @returns {Promise<HolderData[]>} A promise that resolves to an array of HolderData objects.
 */
```

**Implementation:**

```typescript
async fetchHolderList(): Promise<HolderData[]> {
        const cacheKey = `holderList_${this.tokenAddress}`;
        const cachedData = this.cache.getCachedData<HolderData[]>(cacheKey);
        if (cachedData) {
            console.log("Returning cached holder list.");
            return cachedData;
        }

        const allHoldersMap = new Map<string, number>();
        let page = 1;
        const limit = 1000;
        let cursor;
        //HELIOUS_API_KEY needs to be added
        const url = `https://mainnet.helius-rpc.com/?api-key=${
            settings.HELIUS_API_KEY || ""
        }`;
        console.log({ url });

        try {
            while (true) {
                const params = {
                    limit: limit,
                    displayOptions: {},
                    mint: this.tokenAddress,
                    cursor: cursor,
                };
                if (cursor != undefined) {
                    params.cursor = cursor;
                }
                console.log(`Fetching holders - Page ${page}`);
                if (page > 2) {
                    break;
                }
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        jsonrpc: "2.0",
                        id: "helius-test",
                        method: "getTokenAccounts",
                        params: params,
                    }),
                });

                const data = await response.json();

                if (
                    !data ||
                    !data.result ||
                    !data.result.token_accounts ||
                    data.result.token_accounts.length === 0
                ) {
                    console.log(
                        `No more holders found. Total pages fetched: ${
                            page - 1
                        }`
                    );
                    break;
                }

                console.log(
                    `Processing ${data.result.token_accounts.length} holders from page ${page}`
                );

                data.result.token_accounts.forEach((account: any) => {
                    const owner = account.owner;
                    const balance = parseFloat(account.amount);

                    if (allHoldersMap.has(owner)) {
                        allHoldersMap.set(
                            owner,
                            allHoldersMap.get(owner)! + balance
                        );
                    } else {
                        allHoldersMap.set(owner, balance);
                    }
                });
                cursor = data.result.cursor;
                page++;
            }

            const holders: HolderData[] = Array.from(
                allHoldersMap.entries()
            ).map(([address, balance]) => ({
                address,
                balance: balance.toString(),
            }));

            console.log(`Total unique holders fetched: ${holders.length}`);

            // Cache the result
            this.cache.setCachedData(cacheKey, holders);

            return holders;
        } catch (error) {
            console.error("Error fetching holder list from Helius:", error);
            throw new Error("Failed to fetch holder list from Helius.");
        }
    }
```

##### `filterHighValueHolders`

```typescript
/**
 * Filter high value holders based on the given TokenInfo data.
 * 
 * @param {TokenInfo} tradeData - The token information used for filtering.
 * @returns {Promise<Array<{ holderAddress: string; balanceUsd: string }>} - An array of high value holders with their address and balance in USD.
 */
```

**Implementation:**

```typescript
async filterHighValueHolders(
        tradeData: TokenInfo
    ): Promise<Array<{ holderAddress: string; balanceUsd: string }>> {
        const holdersData = await this.fetchHolderList();

        const tokenPriceUsd = num.toBigInt(tradeData.market.currentPrice);

        const highValueHolders = holdersData
            .filter((holder) => {
                const balanceUsd = num.toBigInt(holder.balance) * tokenPriceUsd;
                return balanceUsd > 5;
            })
            .map((holder) => ({
                holderAddress: holder.address,
                balanceUsd: (
                    num.toBigInt(holder.balance) * tokenPriceUsd
                ).toString(),
            }));

        return highValueHolders;
    }
```

##### `checkRecentTrades`

```typescript
/**
 * Check if the volume of recent trades in the last 24 hours is above 0.
 * @param {bigint} volume24hUsd - The total volume of trades in USD within the last 24 hours.
 * @returns {Promise<boolean>} A boolean indicating whether the volume is greater than 0.
 */
```

**Implementation:**

```typescript
async checkRecentTrades(volume24hUsd: bigint): Promise<boolean> {
        return volume24hUsd > 0;
    }
```

##### `countHighSupplyHolders`

```typescript
/**
 * Counts the number of high supply holders for a given token security data.
 * 
 * @param {TokenSecurityData} securityData The security data of the token including owner and creator balances.
 * @returns {Promise<number>} The number of high supply holders.
 */
```

**Implementation:**

```typescript
async countHighSupplyHolders(
        securityData: TokenSecurityData
    ): Promise<number> {
        try {
            const holders = await this.fetchHolderList();
            const result = analyzeHighSupplyHolders({
                holders,
                ownerBalance: securityData.ownerBalance,
                creatorBalance: securityData.creatorBalance,
            });

            return result.count;
        } catch (error) {
            console.error("Error counting high supply holders:", error);
            return 0;
        }
    }
```

##### `getProcessedTokenData`

```typescript
/**
 * Asynchronously retrieves and processes token data including security data, trade data, DexScreener data,
 * holder distribution, high-value holders, recent trades, high-supply holders count, and DexScreener listing status.
 * 
 * @returns {Promise<ProcessedTokenData>} The token data that has been processed and analyzed.
 * @throws {Error} If an error occurs during the data processing and analysis.
 */
```

**Implementation:**

```typescript
async getProcessedTokenData(): Promise<ProcessedTokenData> {
        try {
            console.log(
                `Fetching security data for token: ${this.tokenAddress}`
            );
            const security = await this.fetchTokenSecurity();

            console.log(`Fetching trade data for token: ${this.tokenAddress}`);
            const tradeData = await this.fetchTokenTradeData();

            console.log(
                `Fetching DexScreener data for token: ${this.tokenAddress}`
            );
            const dexData = await this.fetchDexScreenerData();

            console.log(
                `Analyzing holder distribution for token: ${this.tokenAddress}`
            );
            const holderDistributionTrend =
                await this.analyzeHolderDistribution(tradeData);

            console.log(
                `Filtering high-value holders for token: ${this.tokenAddress}`
            );
            const highValueHolders =
                await this.filterHighValueHolders(tradeData);

            console.log(
                `Checking recent trades for token: ${this.tokenAddress}`
            );
            const recentTrades = await this.checkRecentTrades(
                num.toBigInt(tradeData.market.starknetTradingVolume24h)
            );

            console.log(
                `Counting high-supply holders for token: ${this.tokenAddress}`
            );
            const highSupplyHoldersCount =
                await this.countHighSupplyHolders(security);

            console.log(
                `Determining DexScreener listing status for token: ${this.tokenAddress}`
            );
            const isDexScreenerListed = dexData.pairs.length > 0;
            const isDexScreenerPaid = dexData.pairs.some(
                (pair) => pair.boosts && pair.boosts.active > 0
            );

            const processedData: ProcessedTokenData = {
                security,
                tradeData,
                holderDistributionTrend,
                highValueHolders,
                recentTrades,
                highSupplyHoldersCount,
                dexScreenerData: dexData,
                isDexScreenerListed,
                isDexScreenerPaid,
            };

            // console.log("Processed token data:", processedData);
            return processedData;
        } catch (error) {
            console.error("Error processing token data:", error);
            throw error;
        }
    }
```

##### `shouldTradeToken`

```typescript
/**
 * Async function to determine if the token should be traded based on various metrics.
 * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the token should be traded.
 */
```

**Implementation:**

```typescript
async shouldTradeToken(): Promise<boolean> {
        try {
            const tokenData = await this.getProcessedTokenData();
            const { tradeData, security, dexScreenerData } = tokenData;
            const { ownerBalance, creatorBalance } = security;
            const { liquidity, marketCap } = dexScreenerData.pairs[0];

            const totalSupply =
                num.toBigInt(ownerBalance) + num.toBigInt(creatorBalance);

            const metrics: TokenMetrics = {
                liquidityUsd: num.toBigInt(liquidity.usd),
                marketCapUsd: num.toBigInt(marketCap),
                totalSupply,
                ownerPercentage:
                    Number(num.toBigInt(ownerBalance)) / Number(totalSupply),
                creatorPercentage:
                    Number(num.toBigInt(creatorBalance)) / Number(totalSupply),
                top10HolderPercent:
                    Number(
                        num.toBigInt(tradeData.market.starknetTradingVolume24h)
                    ) / Number(totalSupply),
                priceChange24hPercent: Number(
                    num.toBigInt(tradeData.market.priceChange24h)
                ),
                // TODO: Update to Starknet
                priceChange12hPercent: Number(
                    num.toBigInt(tradeData.market.priceChange24h)
                ),
                // TODO: Update to Starknet
                uniqueWallet24h: 0,
                volume24hUsd: num.toBigInt(
                    tradeData.market.starknetTradingVolume24h
                ),
            };

            const { shouldTrade } = evaluateTokenTrading(metrics);
            return shouldTrade;
        } catch (error) {
            console.error("Error processing token data:", error);
            throw error;
        }
    }
```

##### `formatTokenData`

```typescript
/**
 * Formats the token data into a readable string format for Token Security and Trade Report.
 * 
 * @param {ProcessedTokenData} data - The processed token data containing security, trade, holder distribution, recent trades, and DexScreener listing information.
 * @returns {string} The formatted token data containing ownership distribution, trade data, holder distribution trend, high-value holders, recent trades, high-supply holders, and DexScreener listing details.
 */
```

**Implementation:**

```typescript
formatTokenData(data: ProcessedTokenData): string {
        let output = `**Token Security and Trade Report**\n`;
        output += `Token Address: ${this.tokenAddress}\n\n`;

        // Security Data
        output += `**Ownership Distribution:**\n`;
        output += `- Owner Balance: ${data.security.ownerBalance}\n`;
        output += `- Creator Balance: ${data.security.creatorBalance}\n`;
        output += `- Owner Percentage: ${data.security.ownerPercentage}%\n`;
        output += `- Creator Percentage: ${data.security.creatorPercentage}%\n`;
        output += `- Top 10 Holders Balance: ${data.security.top10HolderBalance}\n`;
        output += `- Top 10 Holders Percentage: ${data.security.top10HolderPercent}%\n\n`;

        // Trade Data
        output += `**Trade Data:**\n`;
        // output += `- Holders: ${data.tradeData.holder}\n`;
        // output += `- Unique Wallets (24h): ${data.tradeData.holders}\n`;
        output += `- Price Change (24h): ${data.tradeData.market.priceChange24h}%\n`;
        // output += `- Price Change (12h): ${data.tradeData.market.priceChange12h}%\n`;
        output += `- Volume (24h USD): $${num
            .toBigInt(data.tradeData.market.starknetTradingVolume24h)
            .toString()}\n`;
        output += `- Current Price: $${num
            .toBigInt(data.tradeData.market.currentPrice)
            .toString()}\n\n`;

        // Holder Distribution Trend
        output += `**Holder Distribution Trend:** ${data.holderDistributionTrend}\n\n`;

        // High-Value Holders
        output += `**High-Value Holders (>$5 USD):**\n`;
        if (data.highValueHolders.length === 0) {
            output += `- No high-value holders found or data not available.\n`;
        } else {
            data.highValueHolders.forEach((holder) => {
                output += `- ${holder.holderAddress}: $${holder.balanceUsd}\n`;
            });
        }
        output += `\n`;

        // Recent Trades
        output += `**Recent Trades (Last 24h):** ${
            data.recentTrades ? "Yes" : "No"
        }\n\n`;

        // High-Supply Holders
        output += `**Holders with >2% Supply:** ${data.highSupplyHoldersCount}\n\n`;

        // DexScreener Status
        output += `**DexScreener Listing:** ${
            data.isDexScreenerListed ? "Yes" : "No"
        }\n`;
        if (data.isDexScreenerListed) {
            output += `- Listing Type: ${
                data.isDexScreenerPaid ? "Paid" : "Free"
            }\n`;
            output += `- Number of DexPairs: ${data.dexScreenerData.pairs.length}\n\n`;
            output += `**DexScreener Pairs:**\n`;
            data.dexScreenerData.pairs.forEach((pair, index) => {
                output += `\n**Pair ${index + 1}:**\n`;
                output += `- DEX: ${pair.dexId}\n`;
                output += `- URL: ${pair.url}\n`;
                output += `- Price USD: $${num
                    .toBigInt(pair.priceUsd)
                    .toString()}\n`;
                output += `- Volume (24h USD): $${num
                    .toBigInt(pair.volume.h24)
                    .toString()}\n`;
                output += `- Boosts Active: ${
                    pair.boosts && pair.boosts.active
                }\n`;
                output += `- Liquidity USD: $${num
                    .toBigInt(pair.liquidity.usd)
                    .toString()}\n`;
            });
        }
        output += `\n`;

        console.log("Formatted token data:", output);
        return output;
    }
```

##### `getFormattedTokenReport`

```typescript
/**
 * Asynchronously generates a formatted token report by retrieving processed token data and formatting it.
 * 
 * @returns {Promise<string>} A Promise that resolves with the formatted token report, or a string indicating failure.
 */
```

**Implementation:**

```typescript
async getFormattedTokenReport(): Promise<string> {
        try {
            console.log("Generating formatted token report...");
            const processedData = await this.getProcessedTokenData();
            return this.formatTokenData(processedData);
        } catch (error) {
            console.error("Error generating token report:", error);
            return "Unable to fetch token information. Please try again later.";
        }
    }
```
### File: `providers/trustScoreProvider.ts`
#### Classes

##### `TrustScoreManager`

```typescript
/**
* Class to manage trust scores for users.
* @class
* @public
* @constructor
* @param {TokenProvider} tokenProvider - The token provider to use for authentication.
* @param {TrustScoreDatabase} trustScoreDb - The database where trust scores are stored.
* @param {number} DECAY_RATE - The rate at which trust scores decay over time.
* @param {number} MAX_DECAY_DAYS - The maximum number of days before a trust score decays completely.
* @param {any} backend - The backend server used for retrieving and updating trust scores.
* @param {string} backendToken - The token used for authentication with the backend server.
* @param {IAgentRuntime} runtime - The runtime environment in which the manager operates.
*/
```

**Implementation:**

```typescript
export class TrustScoreManager {
    private tokenProvider: TokenProvider;
    private trustScoreDb: TrustScoreDatabase;
    private DECAY_RATE = 0.95;
    private MAX_DECAY_DAYS = 30;
    private backend;
    private backendToken;
    private runtime: IAgentRuntime;
    constructor(
        runtime: IAgentRuntime,
        tokenProvider: TokenProvider,
        trustScoreDb: TrustScoreDatabase
    ) {
        this.tokenProvider = tokenProvider;
        this.trustScoreDb = trustScoreDb;

        // TODO: change to starknet
        this.backend = runtime.getSetting("BACKEND_URL");

        // TODO: change to starknet
        this.backendToken = runtime.getSetting("BACKEND_TOKEN");

        this.runtime = runtime;
    }

    // Get Recommender Balance
    async getRecommenderBalance(recommenderWallet: string): Promise<number> {
        try {
            const tokenBalance = await getTokenBalance(
                this.runtime,
                recommenderWallet
            );
            const balance = parseFloat(tokenBalance);
            return balance;
        } catch (error) {
            console.error("Error fetching balance", error);
            return 0;
        }
    }

    /**
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
     */
    async generateTrustScore(
        tokenAddress: string,
        recommenderId: string,
        recommenderWallet: string
    ): Promise<{
        tokenPerformance: TokenPerformance;
        recommenderMetrics: RecommenderMetrics;
    }> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        const recommenderMetrics =
            await this.trustScoreDb.getRecommenderMetrics(recommenderId);

        const isRapidDump = await this.isRapidDump(tokenAddress);
        const sustainedGrowth = await this.sustainedGrowth(tokenAddress);
        const suspiciousVolume = await this.suspiciousVolume(tokenAddress);
        const balance = await this.getRecommenderBalance(recommenderWallet);
        const virtualConfidence = balance / 1000000; // TODO: create formula to calculate virtual confidence based on user balance
        const lastActive = recommenderMetrics.lastActiveDate;
        const now = new Date();
        const inactiveDays = Math.floor(
            (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        const decayFactor = Math.pow(
            this.DECAY_RATE,
            Math.min(inactiveDays, this.MAX_DECAY_DAYS)
        );
        const decayedScore = recommenderMetrics.trustScore * decayFactor;
        const validationTrustScore =
            this.trustScoreDb.calculateValidationTrust(tokenAddress);

        return {
            tokenPerformance: {
                tokenAddress:
                    processedData.dexScreenerData.pairs[0]?.baseToken.address ||
                    "",
                priceChange24h:
                    processedData.tradeData.price_change_24h_percent,
                volumeChange24h: processedData.tradeData.volume_24h,
                trade_24h_change:
                    processedData.tradeData.trade_24h_change_percent,
                liquidity:
                    processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0,
                liquidityChange24h: 0,
                holderChange24h:
                    processedData.tradeData.unique_wallet_24h_change_percent,
                rugPull: false, // TODO: Implement rug pull detection
                isScam: false, // TODO: Implement scam detection
                marketCapChange24h: 0, // TODO: Implement market cap change
                sustainedGrowth: sustainedGrowth,
                rapidDump: isRapidDump,
                suspiciousVolume: suspiciousVolume,
                validationTrust: validationTrustScore,
                lastUpdated: new Date(),
            },
            recommenderMetrics: {
                recommenderId: recommenderId,
                trustScore: recommenderMetrics.trustScore,
                totalRecommendations: recommenderMetrics.totalRecommendations,
                successfulRecs: recommenderMetrics.successfulRecs,
                avgTokenPerformance: recommenderMetrics.avgTokenPerformance,
                riskScore: recommenderMetrics.riskScore,
                consistencyScore: recommenderMetrics.consistencyScore,
                virtualConfidence: virtualConfidence,
                lastActiveDate: now,
                trustDecay: decayedScore,
                lastUpdated: new Date(),
            },
        };
    }

    async updateRecommenderMetrics(
        recommenderId: string,
        tokenPerformance: TokenPerformance,
        recommenderWallet: string
    ): Promise<void> {
        const recommenderMetrics =
            await this.trustScoreDb.getRecommenderMetrics(recommenderId);

        const totalRecommendations =
            recommenderMetrics.totalRecommendations + 1;
        const successfulRecs = tokenPerformance.rugPull
            ? recommenderMetrics.successfulRecs
            : recommenderMetrics.successfulRecs + 1;
        const avgTokenPerformance =
            (recommenderMetrics.avgTokenPerformance *
                recommenderMetrics.totalRecommendations +
                tokenPerformance.priceChange24h) /
            totalRecommendations;

        const overallTrustScore = this.calculateTrustScore(
            tokenPerformance,
            recommenderMetrics
        );
        const riskScore = this.calculateOverallRiskScore(
            tokenPerformance,
            recommenderMetrics
        );
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        const balance = await this.getRecommenderBalance(recommenderWallet);
        const virtualConfidence = balance / 1000000; // TODO: create formula to calculate virtual confidence based on user balance
        const lastActive = recommenderMetrics.lastActiveDate;
        const now = new Date();
        const inactiveDays = Math.floor(
            (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        const decayFactor = Math.pow(
            this.DECAY_RATE,
            Math.min(inactiveDays, this.MAX_DECAY_DAYS)
        );
        const decayedScore = recommenderMetrics.trustScore * decayFactor;

        const newRecommenderMetrics: RecommenderMetrics = {
            recommenderId: recommenderId,
            trustScore: overallTrustScore,
            totalRecommendations: totalRecommendations,
            successfulRecs: successfulRecs,
            avgTokenPerformance: avgTokenPerformance,
            riskScore: riskScore,
            consistencyScore: consistencyScore,
            virtualConfidence: virtualConfidence,
            lastActiveDate: new Date(),
            trustDecay: decayedScore,
            lastUpdated: new Date(),
        };

        await this.trustScoreDb.updateRecommenderMetrics(newRecommenderMetrics);
    }

    calculateTrustScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ): number {
        const riskScore = this.calculateRiskScore(tokenPerformance);
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        return (riskScore + consistencyScore) / 2;
    }

    calculateOverallRiskScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ) {
        const riskScore = this.calculateRiskScore(tokenPerformance);
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        return (riskScore + consistencyScore) / 2;
    }

    calculateRiskScore(tokenPerformance: TokenPerformance): number {
        let riskScore = 0;
        if (tokenPerformance.rugPull) {
            riskScore += 10;
        }
        if (tokenPerformance.isScam) {
            riskScore += 10;
        }
        if (tokenPerformance.rapidDump) {
            riskScore += 5;
        }
        if (tokenPerformance.suspiciousVolume) {
            riskScore += 5;
        }
        return riskScore;
    }

    calculateConsistencyScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ): number {
        const avgTokenPerformance = recommenderMetrics.avgTokenPerformance;
        const priceChange24h = tokenPerformance.priceChange24h;

        return Math.abs(priceChange24h - avgTokenPerformance);
    }

    async suspiciousVolume(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        const unique_wallet_24h = processedData.tradeData.unique_wallet_24h;
        const volume_24h = processedData.tradeData.volume_24h;
        const suspiciousVolume = unique_wallet_24h / volume_24h > 0.5;
        console.log(`Fetched processed token data for token: ${tokenAddress}`);
        return suspiciousVolume;
    }

    async sustainedGrowth(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return processedData.tradeData.volume_24h_change_percent > 50;
    }

    async isRapidDump(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return processedData.tradeData.trade_24h_change_percent < -50;
    }

    async checkTrustScore(tokenAddress: string): Promise<TokenSecurityData> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return {
            ownerBalance: processedData.security.ownerBalance,
            creatorBalance: processedData.security.creatorBalance,
            ownerPercentage: processedData.security.ownerPercentage,
            creatorPercentage: processedData.security.creatorPercentage,
            top10HolderBalance: processedData.security.top10HolderBalance,
            top10HolderPercent: processedData.security.top10HolderPercent,
        };
    }

    /**
     * Creates a TradePerformance object based on token data and recommender.
     * @param tokenAddress The address of the token.
     * @param recommenderId The UUID of the recommender.
     * @param data ProcessedTokenData.
     * @returns TradePerformance object.
     */
    async createTradePerformance(
        runtime: IAgentRuntime,
        tokenAddress: string,
        recommenderId: string,
        data: TradeData
    ): Promise<TradePerformance> {
        const recommender =
            await this.trustScoreDb.getOrCreateRecommenderWithTelegramId(
                recommenderId
            );
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();

        // TODO: change to starknet
        const wallet = new WalletProvider(runtime);

        const prices = await wallet.fetchPrices(runtime);
        const solPrice = prices.solana.usd;
        const buySol = data.buy_amount / parseFloat(solPrice);
        const buy_value_usd = data.buy_amount * processedData.tradeData.price;

        const creationData = {
            token_address: tokenAddress,
            recommender_id: recommender.id,
            buy_price: processedData.tradeData.price,
            sell_price: 0,
            buy_timeStamp: new Date().toISOString(),
            sell_timeStamp: "",
            buy_amount: data.buy_amount,
            sell_amount: 0,
            buy_sol: buySol,
            received_sol: 0,
            buy_value_usd: buy_value_usd,
            sell_value_usd: 0,
            profit_usd: 0,
            profit_percent: 0,
            buy_market_cap:
                processedData.dexScreenerData.pairs[0]?.marketCap || 0,
            sell_market_cap: 0,
            market_cap_change: 0,
            buy_liquidity:
                processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0,
            sell_liquidity: 0,
            liquidity_change: 0,
            last_updated: new Date().toISOString(),
            rapidDump: false,
        };
        this.trustScoreDb.addTradePerformance(creationData, data.is_simulation);
        // api call to update trade performance
        this.createTradeInBe(tokenAddress, recommenderId, data);
        return creationData;
    }

    async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // TODO: change to starknet
    async createTradeInBe(
        tokenAddress: string,
        recommenderId: string,
        data: TradeData,
        retries = 3,
        delayMs = 2000
    ) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await fetch(
                    `${this.backend}/api/updaters/createTradePerformance`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.backendToken}`,
                        },
                        body: JSON.stringify({
                            tokenAddress: tokenAddress,
                            tradeData: data,
                            recommenderId: recommenderId,
                        }),
                    }
                );
                // If the request is successful, exit the loop
                return;
            } catch (error) {
                console.error(
                    `Attempt ${attempt} failed: Error creating trade in backend`,
                    error
                );
                if (attempt < retries) {
                    console.log(`Retrying in ${delayMs} ms...`);
                    await this.delay(delayMs); // Wait for the specified delay before retrying
                } else {
                    console.error("All attempts failed.");
                }
            }
        }
    }

    /**
     * Updates a trade with sell details.
     * @param tokenAddress The address of the token.
     * @param recommenderId The UUID of the recommender.
     * @param buyTimeStamp The timestamp when the buy occurred.
     * @param sellDetails An object containing sell-related details.
     * @param isSimulation Whether the trade is a simulation. If true, updates in simulation_trade; otherwise, in trade.
     * @returns boolean indicating success.
     */

    async updateSellDetails(
        runtime: IAgentRuntime,
        tokenAddress: string,
        recommenderId: string,
        sellTimeStamp: string,
        sellDetails: sellDetails,
        isSimulation: boolean
    ) {
        const recommender =
            await this.trustScoreDb.getOrCreateRecommenderWithTelegramId(
                recommenderId
            );
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();

        // TODO:
        const wallet = new WalletProvider(this.runtime);

        const prices = await wallet.fetchPrices(runtime);
        const solPrice = prices.solana.usd;
        const sellSol = sellDetails.sell_amount / parseFloat(solPrice);
        const sell_value_usd =
            sellDetails.sell_amount * processedData.tradeData.price;
        const trade = await this.trustScoreDb.getLatestTradePerformance(
            tokenAddress,
            recommender.id,
            isSimulation
        );
        const buyTimeStamp = trade.buy_timeStamp;
        const marketCap =
            processedData.dexScreenerData.pairs[0]?.marketCap || 0;
        const liquidity =
            processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0;
        const sell_price = processedData.tradeData.price;
        const profit_usd = sell_value_usd - trade.buy_value_usd;
        const profit_percent = (profit_usd / trade.buy_value_usd) * 100;

        const market_cap_change = marketCap - trade.buy_market_cap;
        const liquidity_change = liquidity - trade.buy_liquidity;

        const isRapidDump = await this.isRapidDump(tokenAddress);

        const sellDetailsData = {
            sell_price: sell_price,
            sell_timeStamp: sellTimeStamp,
            sell_amount: sellDetails.sell_amount,
            received_sol: sellSol,
            sell_value_usd: sell_value_usd,
            profit_usd: profit_usd,
            profit_percent: profit_percent,
            sell_market_cap: marketCap,
            market_cap_change: market_cap_change,
            sell_liquidity: liquidity,
            liquidity_change: liquidity_change,
            rapidDump: isRapidDump,
            sell_recommender_id: sellDetails.sell_recommender_id || null,
        };
        this.trustScoreDb.updateTradePerformanceOnSell(
            tokenAddress,
            recommender.id,
            buyTimeStamp,
            sellDetailsData,
            isSimulation
        );
        return sellDetailsData;
    }

    // get all recommendations
    async getRecommendations(
        startDate: Date,
        endDate: Date
    ): Promise<Array<TokenRecommendationSummary>> {
        const recommendations = this.trustScoreDb.getRecommendationsByDateRange(
            startDate,
            endDate
        );

        // Group recommendations by tokenAddress
        const groupedRecommendations = recommendations.reduce(
            (acc, recommendation) => {
                const { tokenAddress } = recommendation;
                if (!acc[tokenAddress]) acc[tokenAddress] = [];
                acc[tokenAddress].push(recommendation);
                return acc;
            },
            {} as Record<string, Array<TokenRecommendation>>
        );

        const result = Object.keys(groupedRecommendations).map(
            (tokenAddress) => {
                const tokenRecommendations =
                    groupedRecommendations[tokenAddress];

                // Initialize variables to compute averages
                let totalTrustScore = 0;
                let totalRiskScore = 0;
                let totalConsistencyScore = 0;
                const recommenderData = [];

                tokenRecommendations.forEach((recommendation) => {
                    const tokenPerformance =
                        this.trustScoreDb.getTokenPerformance(
                            recommendation.tokenAddress
                        );
                    const recommenderMetrics =
                        this.trustScoreDb.getRecommenderMetrics(
                            recommendation.recommenderId
                        );

                    const trustScore = this.calculateTrustScore(
                        tokenPerformance,
                        recommenderMetrics
                    );
                    const consistencyScore = this.calculateConsistencyScore(
                        tokenPerformance,
                        recommenderMetrics
                    );
                    const riskScore = this.calculateRiskScore(tokenPerformance);

                    // Accumulate scores for averaging
                    totalTrustScore += trustScore;
                    totalRiskScore += riskScore;
                    totalConsistencyScore += consistencyScore;

                    recommenderData.push({
                        recommenderId: recommendation.recommenderId,
                        trustScore,
                        riskScore,
                        consistencyScore,
                        recommenderMetrics,
                    });
                });

                // Calculate averages for this token
                const averageTrustScore =
                    totalTrustScore / tokenRecommendations.length;
                const averageRiskScore =
                    totalRiskScore / tokenRecommendations.length;
                const averageConsistencyScore =
                    totalConsistencyScore / tokenRecommendations.length;

                return {
                    tokenAddress,
                    averageTrustScore,
                    averageRiskScore,
                    averageConsistencyScore,
                    recommenders: recommenderData,
                };
            }
        );

        // Sort recommendations by the highest average trust score
        result.sort((a, b) => b.averageTrustScore - a.averageTrustScore);

        return result;
    }
}
```

#### Interfaces

##### `TradeData`

```typescript
/**
 * Interface representing trade data.
 * @property {number} buy_amount - The amount to buy.
 * @property {boolean} is_simulation - Indicates if the trade is a simulation.
 */
```

**Implementation:**

```typescript
interface TradeData {
    buy_amount: number;
    is_simulation: boolean;
}
```

##### `sellDetails`

```typescript
/**
 * Interface representing the details of a sale.
 * @property {number} sell_amount - The amount of the sale.
 * @property {string | null} sell_recommender_id - The ID of the recommender for the sale, or null if there is none.
 */
```

**Implementation:**

```typescript
interface sellDetails {
    sell_amount: number;
    sell_recommender_id: string | null;
}
```

##### `_RecommendationGroup`

```typescript
/**
 * Interface representing a recommendation group with a recommendation and trust score.
 */
```

**Implementation:**

```typescript
interface _RecommendationGroup {
    recommendation: any;
    trustScore: number;
}
```

##### `RecommenderData`

```typescript
/**
 * Interface representing recommender data.
 * @typedef {Object} RecommenderData
 * @property {string} recommenderId - The ID of the recommender.
 * @property {number} trustScore - The trust score of the recommender.
 * @property {number} riskScore - The risk score of the recommender.
 * @property {number} consistencyScore - The consistency score of the recommender.
 * @property {RecommenderMetrics} recommenderMetrics - The metrics of the recommender.
 */
```

**Implementation:**

```typescript
interface RecommenderData {
    recommenderId: string;
    trustScore: number;
    riskScore: number;
    consistencyScore: number;
    recommenderMetrics: RecommenderMetrics;
}
```

##### `TokenRecommendationSummary`

```typescript
/**
 * Interface representing a summary of token recommendations.
 * @typedef {Object} TokenRecommendationSummary
 * @property {string} tokenAddress - The address of the token.
 * @property {number} averageTrustScore - The average trust score for the token.
 * @property {number} averageRiskScore - The average risk score for the token.
 * @property {number} averageConsistencyScore - The average consistency score for the token.
 * @property {RecommenderData[]} recommenders - Array of recommender data objects.
 */
```

**Implementation:**

```typescript
interface TokenRecommendationSummary {
    tokenAddress: string;
    averageTrustScore: number;
    averageRiskScore: number;
    averageConsistencyScore: number;
    recommenders: RecommenderData[];
}
```

#### Methods

##### `updateRecommenderMetrics`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async updateRecommenderMetrics(
        recommenderId: string,
        tokenPerformance: TokenPerformance,
        recommenderWallet: string
    ): Promise<void> {
        const recommenderMetrics =
            await this.trustScoreDb.getRecommenderMetrics(recommenderId);

        const totalRecommendations =
            recommenderMetrics.totalRecommendations + 1;
        const successfulRecs = tokenPerformance.rugPull
            ? recommenderMetrics.successfulRecs
            : recommenderMetrics.successfulRecs + 1;
        const avgTokenPerformance =
            (recommenderMetrics.avgTokenPerformance *
                recommenderMetrics.totalRecommendations +
                tokenPerformance.priceChange24h) /
            totalRecommendations;

        const overallTrustScore = this.calculateTrustScore(
            tokenPerformance,
            recommenderMetrics
        );
        const riskScore = this.calculateOverallRiskScore(
            tokenPerformance,
            recommenderMetrics
        );
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        const balance = await this.getRecommenderBalance(recommenderWallet);
        const virtualConfidence = balance / 1000000; // TODO: create formula to calculate virtual confidence based on user balance
        const lastActive = recommenderMetrics.lastActiveDate;
        const now = new Date();
        const inactiveDays = Math.floor(
            (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        const decayFactor = Math.pow(
            this.DECAY_RATE,
            Math.min(inactiveDays, this.MAX_DECAY_DAYS)
        );
        const decayedScore = recommenderMetrics.trustScore * decayFactor;

        const newRecommenderMetrics: RecommenderMetrics = {
            recommenderId: recommenderId,
            trustScore: overallTrustScore,
            totalRecommendations: totalRecommendations,
            successfulRecs: successfulRecs,
            avgTokenPerformance: avgTokenPerformance,
            riskScore: riskScore,
            consistencyScore: consistencyScore,
            virtualConfidence: virtualConfidence,
            lastActiveDate: new Date(),
            trustDecay: decayedScore,
            lastUpdated: new Date(),
        };

        await this.trustScoreDb.updateRecommenderMetrics(newRecommenderMetrics);
    }
```

##### `calculateTrustScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
calculateTrustScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ): number {
        const riskScore = this.calculateRiskScore(tokenPerformance);
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        return (riskScore + consistencyScore) / 2;
    }
```

##### `calculateOverallRiskScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
calculateOverallRiskScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ) {
        const riskScore = this.calculateRiskScore(tokenPerformance);
        const consistencyScore = this.calculateConsistencyScore(
            tokenPerformance,
            recommenderMetrics
        );

        return (riskScore + consistencyScore) / 2;
    }
```

##### `calculateRiskScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
calculateRiskScore(tokenPerformance: TokenPerformance): number {
        let riskScore = 0;
        if (tokenPerformance.rugPull) {
            riskScore += 10;
        }
        if (tokenPerformance.isScam) {
            riskScore += 10;
        }
        if (tokenPerformance.rapidDump) {
            riskScore += 5;
        }
        if (tokenPerformance.suspiciousVolume) {
            riskScore += 5;
        }
        return riskScore;
    }
```

##### `calculateConsistencyScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
calculateConsistencyScore(
        tokenPerformance: TokenPerformance,
        recommenderMetrics: RecommenderMetrics
    ): number {
        const avgTokenPerformance = recommenderMetrics.avgTokenPerformance;
        const priceChange24h = tokenPerformance.priceChange24h;

        return Math.abs(priceChange24h - avgTokenPerformance);
    }
```

##### `suspiciousVolume`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async suspiciousVolume(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        const unique_wallet_24h = processedData.tradeData.unique_wallet_24h;
        const volume_24h = processedData.tradeData.volume_24h;
        const suspiciousVolume = unique_wallet_24h / volume_24h > 0.5;
        console.log(`Fetched processed token data for token: ${tokenAddress}`);
        return suspiciousVolume;
    }
```

##### `sustainedGrowth`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async sustainedGrowth(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return processedData.tradeData.volume_24h_change_percent > 50;
    }
```

##### `isRapidDump`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async isRapidDump(tokenAddress: string): Promise<boolean> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return processedData.tradeData.trade_24h_change_percent < -50;
    }
```

##### `checkTrustScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async checkTrustScore(tokenAddress: string): Promise<TokenSecurityData> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        return {
            ownerBalance: processedData.security.ownerBalance,
            creatorBalance: processedData.security.creatorBalance,
            ownerPercentage: processedData.security.ownerPercentage,
            creatorPercentage: processedData.security.creatorPercentage,
            top10HolderBalance: processedData.security.top10HolderBalance,
            top10HolderPercent: processedData.security.top10HolderPercent,
        };
    }
```

##### `createTradePerformance`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async createTradePerformance(
        runtime: IAgentRuntime,
        tokenAddress: string,
        recommenderId: string,
        data: TradeData
    ): Promise<TradePerformance> {
        const recommender =
            await this.trustScoreDb.getOrCreateRecommenderWithTelegramId(
                recommenderId
            );
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();

        // TODO: change to starknet
        const wallet = new WalletProvider(runtime);

        const prices = await wallet.fetchPrices(runtime);
        const solPrice = prices.solana.usd;
        const buySol = data.buy_amount / parseFloat(solPrice);
        const buy_value_usd = data.buy_amount * processedData.tradeData.price;

        const creationData = {
            token_address: tokenAddress,
            recommender_id: recommender.id,
            buy_price: processedData.tradeData.price,
            sell_price: 0,
            buy_timeStamp: new Date().toISOString(),
            sell_timeStamp: "",
            buy_amount: data.buy_amount,
            sell_amount: 0,
            buy_sol: buySol,
            received_sol: 0,
            buy_value_usd: buy_value_usd,
            sell_value_usd: 0,
            profit_usd: 0,
            profit_percent: 0,
            buy_market_cap:
                processedData.dexScreenerData.pairs[0]?.marketCap || 0,
            sell_market_cap: 0,
            market_cap_change: 0,
            buy_liquidity:
                processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0,
            sell_liquidity: 0,
            liquidity_change: 0,
            last_updated: new Date().toISOString(),
            rapidDump: false,
        };
        this.trustScoreDb.addTradePerformance(creationData, data.is_simulation);
        // api call to update trade performance
        this.createTradeInBe(tokenAddress, recommenderId, data);
        return creationData;
    }
```

##### `delay`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
```

##### `createTradeInBe`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async createTradeInBe(
        tokenAddress: string,
        recommenderId: string,
        data: TradeData,
        retries = 3,
        delayMs = 2000
    ) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            try {
                await fetch(
                    `${this.backend}/api/updaters/createTradePerformance`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${this.backendToken}`,
                        },
                        body: JSON.stringify({
                            tokenAddress: tokenAddress,
                            tradeData: data,
                            recommenderId: recommenderId,
                        }),
                    }
                );
                // If the request is successful, exit the loop
                return;
            } catch (error) {
                console.error(
                    `Attempt ${attempt} failed: Error creating trade in backend`,
                    error
                );
                if (attempt < retries) {
                    console.log(`Retrying in ${delayMs} ms...`);
                    await this.delay(delayMs); // Wait for the specified delay before retrying
                } else {
                    console.error("All attempts failed.");
                }
            }
        }
    }
```

##### `updateSellDetails`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async updateSellDetails(
        runtime: IAgentRuntime,
        tokenAddress: string,
        recommenderId: string,
        sellTimeStamp: string,
        sellDetails: sellDetails,
        isSimulation: boolean
    ) {
        const recommender =
            await this.trustScoreDb.getOrCreateRecommenderWithTelegramId(
                recommenderId
            );
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();

        // TODO:
        const wallet = new WalletProvider(this.runtime);

        const prices = await wallet.fetchPrices(runtime);
        const solPrice = prices.solana.usd;
        const sellSol = sellDetails.sell_amount / parseFloat(solPrice);
        const sell_value_usd =
            sellDetails.sell_amount * processedData.tradeData.price;
        const trade = await this.trustScoreDb.getLatestTradePerformance(
            tokenAddress,
            recommender.id,
            isSimulation
        );
        const buyTimeStamp = trade.buy_timeStamp;
        const marketCap =
            processedData.dexScreenerData.pairs[0]?.marketCap || 0;
        const liquidity =
            processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0;
        const sell_price = processedData.tradeData.price;
        const profit_usd = sell_value_usd - trade.buy_value_usd;
        const profit_percent = (profit_usd / trade.buy_value_usd) * 100;

        const market_cap_change = marketCap - trade.buy_market_cap;
        const liquidity_change = liquidity - trade.buy_liquidity;

        const isRapidDump = await this.isRapidDump(tokenAddress);

        const sellDetailsData = {
            sell_price: sell_price,
            sell_timeStamp: sellTimeStamp,
            sell_amount: sellDetails.sell_amount,
            received_sol: sellSol,
            sell_value_usd: sell_value_usd,
            profit_usd: profit_usd,
            profit_percent: profit_percent,
            sell_market_cap: marketCap,
            market_cap_change: market_cap_change,
            sell_liquidity: liquidity,
            liquidity_change: liquidity_change,
            rapidDump: isRapidDump,
            sell_recommender_id: sellDetails.sell_recommender_id || null,
        };
        this.trustScoreDb.updateTradePerformanceOnSell(
            tokenAddress,
            recommender.id,
            buyTimeStamp,
            sellDetailsData,
            isSimulation
        );
        return sellDetailsData;
    }
```

##### `getRecommendations`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

**Implementation:**

```typescript
async getRecommendations(
        startDate: Date,
        endDate: Date
    ): Promise<Array<TokenRecommendationSummary>> {
        const recommendations = this.trustScoreDb.getRecommendationsByDateRange(
            startDate,
            endDate
        );

        // Group recommendations by tokenAddress
        const groupedRecommendations = recommendations.reduce(
            (acc, recommendation) => {
                const { tokenAddress } = recommendation;
                if (!acc[tokenAddress]) acc[tokenAddress] = [];
                acc[tokenAddress].push(recommendation);
                return acc;
            },
            {} as Record<string, Array<TokenRecommendation>>
        );

        const result = Object.keys(groupedRecommendations).map(
            (tokenAddress) => {
                const tokenRecommendations =
                    groupedRecommendations[tokenAddress];

                // Initialize variables to compute averages
                let totalTrustScore = 0;
                let totalRiskScore = 0;
                let totalConsistencyScore = 0;
                const recommenderData = [];

                tokenRecommendations.forEach((recommendation) => {
                    const tokenPerformance =
                        this.trustScoreDb.getTokenPerformance(
                            recommendation.tokenAddress
                        );
                    const recommenderMetrics =
                        this.trustScoreDb.getRecommenderMetrics(
                            recommendation.recommenderId
                        );

                    const trustScore = this.calculateTrustScore(
                        tokenPerformance,
                        recommenderMetrics
                    );
                    const consistencyScore = this.calculateConsistencyScore(
                        tokenPerformance,
                        recommenderMetrics
                    );
                    const riskScore = this.calculateRiskScore(tokenPerformance);

                    // Accumulate scores for averaging
                    totalTrustScore += trustScore;
                    totalRiskScore += riskScore;
                    totalConsistencyScore += consistencyScore;

                    recommenderData.push({
                        recommenderId: recommendation.recommenderId,
                        trustScore,
                        riskScore,
                        consistencyScore,
                        recommenderMetrics,
                    });
                });

                // Calculate averages for this token
                const averageTrustScore =
                    totalTrustScore / tokenRecommendations.length;
                const averageRiskScore =
                    totalRiskScore / tokenRecommendations.length;
                const averageConsistencyScore =
                    totalConsistencyScore / tokenRecommendations.length;

                return {
                    tokenAddress,
                    averageTrustScore,
                    averageRiskScore,
                    averageConsistencyScore,
                    recommenders: recommenderData,
                };
            }
        );

        // Sort recommendations by the highest average trust score
        result.sort((a, b) => b.averageTrustScore - a.averageTrustScore);

        return result;
    }
```

##### `constructor`

```typescript
/**
 * Constructor for initializing a new instance of the class.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {TokenProvider} tokenProvider - The provider for generating tokens.
 * @param {TrustScoreDatabase} trustScoreDb - The database for storing trust scores.
 */
```

**Implementation:**

```typescript
constructor(
        runtime: IAgentRuntime,
        tokenProvider: TokenProvider,
        trustScoreDb: TrustScoreDatabase
    ) {
        this.tokenProvider = tokenProvider;
        this.trustScoreDb = trustScoreDb;

        // TODO: change to starknet
        this.backend = runtime.getSetting("BACKEND_URL");

        // TODO: change to starknet
        this.backendToken = runtime.getSetting("BACKEND_TOKEN");

        this.runtime = runtime;
    }
```

##### `getRecommenderBalance`

```typescript
/**
 * Asynchronously retrieves the balance of a recommender's wallet.
 * 
 * @param {string} recommenderWallet - The wallet address of the recommender.
 * @returns {Promise<number>} - A promise that resolves to the balance of the recommender's wallet as a number.
 */
```

**Implementation:**

```typescript
async getRecommenderBalance(recommenderWallet: string): Promise<number> {
        try {
            const tokenBalance = await getTokenBalance(
                this.runtime,
                recommenderWallet
            );
            const balance = parseFloat(tokenBalance);
            return balance;
        } catch (error) {
            console.error("Error fetching balance", error);
            return 0;
        }
    }
```

##### `generateTrustScore`

```typescript
/**
 * Generates trust score for a specific token and recommender.
 * 
 * @param {string} tokenAddress - The address of the token.
 * @param {string} recommenderId - The ID of the recommender.
 * @param {string} recommenderWallet - The wallet address of the recommender.
 * @returns {Promise<{tokenPerformance: TokenPerformance; recommenderMetrics: RecommenderMetrics;}>} An object containing the token performance and recommender metrics.
 */
```

**Implementation:**

```typescript
async generateTrustScore(
        tokenAddress: string,
        recommenderId: string,
        recommenderWallet: string
    ): Promise<{
        tokenPerformance: TokenPerformance;
        recommenderMetrics: RecommenderMetrics;
    }> {
        const processedData: ProcessedTokenData =
            await this.tokenProvider.getProcessedTokenData();
        console.log(`Fetched processed token data for token: ${tokenAddress}`);

        const recommenderMetrics =
            await this.trustScoreDb.getRecommenderMetrics(recommenderId);

        const isRapidDump = await this.isRapidDump(tokenAddress);
        const sustainedGrowth = await this.sustainedGrowth(tokenAddress);
        const suspiciousVolume = await this.suspiciousVolume(tokenAddress);
        const balance = await this.getRecommenderBalance(recommenderWallet);
        const virtualConfidence = balance / 1000000; // TODO: create formula to calculate virtual confidence based on user balance
        const lastActive = recommenderMetrics.lastActiveDate;
        const now = new Date();
        const inactiveDays = Math.floor(
            (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        const decayFactor = Math.pow(
            this.DECAY_RATE,
            Math.min(inactiveDays, this.MAX_DECAY_DAYS)
        );
        const decayedScore = recommenderMetrics.trustScore * decayFactor;
        const validationTrustScore =
            this.trustScoreDb.calculateValidationTrust(tokenAddress);

        return {
            tokenPerformance: {
                tokenAddress:
                    processedData.dexScreenerData.pairs[0]?.baseToken.address ||
                    "",
                priceChange24h:
                    processedData.tradeData.price_change_24h_percent,
                volumeChange24h: processedData.tradeData.volume_24h,
                trade_24h_change:
                    processedData.tradeData.trade_24h_change_percent,
                liquidity:
                    processedData.dexScreenerData.pairs[0]?.liquidity.usd || 0,
                liquidityChange24h: 0,
                holderChange24h:
                    processedData.tradeData.unique_wallet_24h_change_percent,
                rugPull: false, // TODO: Implement rug pull detection
                isScam: false, // TODO: Implement scam detection
                marketCapChange24h: 0, // TODO: Implement market cap change
                sustainedGrowth: sustainedGrowth,
                rapidDump: isRapidDump,
                suspiciousVolume: suspiciousVolume,
                validationTrust: validationTrustScore,
                lastUpdated: new Date(),
            },
            recommenderMetrics: {
                recommenderId: recommenderId,
                trustScore: recommenderMetrics.trustScore,
                totalRecommendations: recommenderMetrics.totalRecommendations,
                successfulRecs: recommenderMetrics.successfulRecs,
                avgTokenPerformance: recommenderMetrics.avgTokenPerformance,
                riskScore: recommenderMetrics.riskScore,
                consistencyScore: recommenderMetrics.consistencyScore,
                virtualConfidence: virtualConfidence,
                lastActiveDate: now,
                trustDecay: decayedScore,
                lastUpdated: new Date(),
            },
        };
    }
```
### File: `utils/ERC20Token.ts`
#### Classes

##### `ERC20Token`

```typescript
/**
 * Represents an ERC20 Token with various methods for interacting with the token contract.
 */
  */
```

**Implementation:**

```typescript
export class ERC20Token {
    abi: any;
    contract: Contract;
    calldata: CallData;
    constructor(
        token: string,
        providerOrAccount?: ProviderInterface | AccountInterface
    ) {
        this.contract = new Contract(erc20Abi, token, providerOrAccount);
        this.calldata = new CallData(this.contract.abi);
    }

    public address() {
        return this.contract.address;
    }

    public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }

    public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }

    public approveCall(spender: string, amount: bigint): ApproveCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "approve",
            calldata: this.calldata.compile("approve", {
                spender: spender,
                amount: cairo.uint256(amount),
            }),
        };
    }

    public transferCall(recipient: string, amount: bigint): TransferCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "transfer",
            calldata: this.calldata.compile("transfer", {
                recipient: recipient,
                amount: cairo.uint256(amount),
            }),
        };
    }
}
```

#### Types

##### `ApproveCall`

```typescript
/**
* Represents a request to approve a contract call. 
* @typedef {Object} ApproveCall
* @property {string} contractAddress - The address of the contract to be called.
* @property {'approve'} entrypoint - The entrypoint of the call.
* @property {Calldata} calldata - The data for the call.
*/
```

**Implementation:**

```typescript
export type ApproveCall = {
    contractAddress: string;
    entrypoint: "approve";
    calldata: Calldata;
};
```

##### `TransferCall`

```typescript
/**
 * Type representing a transfer call for a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract.
 * @property {string} entrypoint - The entrypoint function, always set to "transfer".
 * @property {Calldata} calldata - The data to be sent in the call.
 */
```

**Implementation:**

```typescript
export type TransferCall = {
    contractAddress: string;
    entrypoint: "transfer";
    calldata: Calldata;
};
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for a new instance of a contract.
 * 
 * @param {string} token - The token address.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - The provider or account to use.
 */
```

**Implementation:**

```typescript
constructor(
        token: string,
        providerOrAccount?: ProviderInterface | AccountInterface
    ) {
        this.contract = new Contract(erc20Abi, token, providerOrAccount);
        this.calldata = new CallData(this.contract.abi);
    }
```

##### `address`

```typescript
/**
 * Get the address of the contract.
 * @returns {string} The address of the contract.
 */
```

**Implementation:**

```typescript
public address() {
        return this.contract.address;
    }
```

##### `balanceOf`

```typescript
/**
 * This method asynchronously retrieves the balance of a specified account.
 * @param {string} account - The account for which the balance needs to be retrieved.
 * @returns {Promise<bigint>} The balance of the specified account as a BigInt.
 */
```

**Implementation:**

```typescript
public async balanceOf(account: string): Promise<bigint> {
        const result = await this.contract.call("balance_of", [account]);
        return result as bigint;
    }
```

##### `decimals`

```typescript
/**
 * Asynchronously fetches the decimal value related to the contract.
 * @returns {Promise<bigint>} The decimal value as a big integer.
 */
```

**Implementation:**

```typescript
public async decimals() {
        const result = await this.contract.call("decimals");
        return result as bigint;
    }
```

##### `approveCall`

```typescript
/**
 * Create an 'ApproveCall' object to approve the specified amount for the spender.
 * 
 * @param {string} spender - The address of the spender to approve the amount for.
 * @param {bigint} amount - The amount to approve for the spender.
 * @returns {ApproveCall} An object containing contract address, entrypoint, and calldata for approval.
 */
```

**Implementation:**

```typescript
public approveCall(spender: string, amount: bigint): ApproveCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "approve",
            calldata: this.calldata.compile("approve", {
                spender: spender,
                amount: cairo.uint256(amount),
            }),
        };
    }
```

##### `transferCall`

```typescript
/**
 * Generates a TransferCall object to transfer a specified amount to a recipient.
 *
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount to transfer.
 *
 * @returns {TransferCall} - The TransferCall object containing contract address, entrypoint, and calldata.
 */
```

**Implementation:**

```typescript
public transferCall(recipient: string, amount: bigint): TransferCall {
        return {
            contractAddress: this.contract.address,
            entrypoint: "transfer",
            calldata: this.calldata.compile("transfer", {
                recipient: recipient,
                amount: cairo.uint256(amount),
            }),
        };
    }
```
### File: `utils/cache.ts`
#### Classes

##### `Cache`

```typescript
/**
 * A class representing a caching mechanism with both in-memory and file-based storage.
 * @class Cache
 */
```

**Implementation:**

```typescript
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

    constructor() {
        this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
        const __dirname = path.resolve();

        // Find the 'eliza' folder in the filepath and adjust the cache directory path
        const elizaIndex = __dirname.indexOf("eliza");
        if (elizaIndex !== -1) {
            const pathToEliza = __dirname.slice(0, elizaIndex + 5); // include 'eliza'
            this.cacheDir = path.join(pathToEliza, "cache");
        } else {
            this.cacheDir = path.join(__dirname, "cache");
        }

        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir);
        }
    }

    private readCacheFromFile<T>(cacheKey: string): T | null {
        const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const parsed = JSON.parse(fileContent);
                const now = Date.now();
                if (now < parsed.expiry) {
                    return parsed.data as T;
                } else {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.error(
                    `Error reading cache file for key ${cacheKey}:`,
                    error
                );
                // Delete corrupted cache file
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    console.error(`Error deleting corrupted cache file:`, e);
                }
            }
        }
        return null;
    }

    private writeCacheToFile<T>(cacheKey: string, data: T): void {
        try {
            const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
            const cacheData = {
                data: data,
                expiry: Date.now() + 300000, // 5 minutes in milliseconds
            };
            fs.writeFileSync(filePath, JSON.stringify(cacheData), "utf-8");
        } catch (error) {
            console.error(
                `Error writing cache file for key ${cacheKey}:`,
                error
            );
        }
    }

    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

    public getCachedData<T>(cacheKey: string): T | null {
        // Check in-memory cache first
        const cachedData = this.cache.get<T>(cacheKey);
        if (cachedData !== undefined) {
            return cachedData;
        }

        // Check file-based cache
        const fileCachedData = this.readCacheFromFile<T>(cacheKey);
        if (fileCachedData) {
            // Populate in-memory cache
            this.cache.set(cacheKey, fileCachedData);
            return fileCachedData;
        }

        return null;
    }

    public setCachedData<T>(cacheKey: string, data: T): void {
        // Set in-memory cache
        this.cache.set(cacheKey, data);

        // Write to file-based cache
        this.writeCacheToFile(cacheKey, data);
    }
}
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor function for creating a cache instance.
 */
```

**Implementation:**

```typescript
constructor() {
        this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
        const __dirname = path.resolve();

        // Find the 'eliza' folder in the filepath and adjust the cache directory path
        const elizaIndex = __dirname.indexOf("eliza");
        if (elizaIndex !== -1) {
            const pathToEliza = __dirname.slice(0, elizaIndex + 5); // include 'eliza'
            this.cacheDir = path.join(pathToEliza, "cache");
        } else {
            this.cacheDir = path.join(__dirname, "cache");
        }

        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir);
        }
    }
```

##### `readCacheFromFile`

```typescript
/**
 * Reads cached data from a file based on the provided cache key.
 * If the cache file exists and has not expired, returns the cached data.
 * If the cache file does not exist or has expired, returns null.
 * 
 * @template T - The type of data being read from the cache file.
 * @param {string} cacheKey - The unique key used to identify the cache file.
 * @returns {T | null} The cached data if it is valid, otherwise null.
 */
```

**Implementation:**

```typescript
private readCacheFromFile<T>(cacheKey: string): T | null {
        const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const parsed = JSON.parse(fileContent);
                const now = Date.now();
                if (now < parsed.expiry) {
                    return parsed.data as T;
                } else {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.error(
                    `Error reading cache file for key ${cacheKey}:`,
                    error
                );
                // Delete corrupted cache file
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    console.error(`Error deleting corrupted cache file:`, e);
                }
            }
        }
        return null;
    }
```

##### `writeCacheToFile`

```typescript
/**
 * Writes the provided data to a JSON file in the cache directory.
 * 
 * @template T
 * @param {string} cacheKey - The key to identify the cache file.
 * @param {T} data - The data to be stored in the cache file.
 * @returns {void}
 */
```

**Implementation:**

```typescript
private writeCacheToFile<T>(cacheKey: string, data: T): void {
        try {
            const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
            const cacheData = {
                data: data,
                expiry: Date.now() + 300000, // 5 minutes in milliseconds
            };
            fs.writeFileSync(filePath, JSON.stringify(cacheData), "utf-8");
        } catch (error) {
            console.error(
                `Error writing cache file for key ${cacheKey}:`,
                error
            );
        }
    }
```

##### `get`

```typescript
/**
 * Get a value from the cache with the given key.
 * 
 * @param cacheKey - The key to lookup in the cache.
 * @returns The value corresponding to the key in the cache, or `undefined` if not found.
 */
```

**Implementation:**

```typescript
public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }
```

##### `set`

```typescript
/**
 * Sets a value in the cache with the specified key.
 * 
 * @param {string} cacheKey - The key to set the value with.
 * @param {T} data - The data to store in the cache.
 * @returns {void}
 */
```

**Implementation:**

```typescript
public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }
```

##### `getCachedData`

```typescript
/**
 * Retrieves cached data based on the provided cache key.
 * 
 * @template T - The type of data to be retrieved.
 * @param {string} cacheKey - The key to identify the cached data.
 * @returns {T | null} The cached data if found, otherwise null.
 */
```

**Implementation:**

```typescript
public getCachedData<T>(cacheKey: string): T | null {
        // Check in-memory cache first
        const cachedData = this.cache.get<T>(cacheKey);
        if (cachedData !== undefined) {
            return cachedData;
        }

        // Check file-based cache
        const fileCachedData = this.readCacheFromFile<T>(cacheKey);
        if (fileCachedData) {
            // Populate in-memory cache
            this.cache.set(cacheKey, fileCachedData);
            return fileCachedData;
        }

        return null;
    }
```

##### `setCachedData`

```typescript
/**
 * Set cached data in memory and write to file-based cache using the provided cache key and data.
 * 
 * @param {string} cacheKey - The key used to access the cached data.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
```

**Implementation:**

```typescript
public setCachedData<T>(cacheKey: string, data: T): void {
        // Set in-memory cache
        this.cache.set(cacheKey, data);

        // Write to file-based cache
        this.writeCacheToFile(cacheKey, data);
    }
```
### File: `actions/subdomain.ts`
#### Interfaces

##### `SubdomainCreationContent`

```typescript
/**
 * Interface for defining the content of a subdomain creation request.
 * @interface
 * @extends Content
 * @property {string} recipient - The recipient of the subdomain creation request.
 * @property {string} subdomain - The subdomain to be created.
 */
```

**Implementation:**

```typescript
export interface SubdomainCreationContent extends Content {
    recipient: string;
    subdomain: string;
}
```

#### Functions

##### `isSubdomainCreation`

```typescript
/**
 * Checks if the provided content is valid for subdomain creation.
 *
 * @param {SubdomainCreationContent} content - The content to validate for subdomain creation.
 * @returns {boolean} Returns true if the content is valid for subdomain creation, false otherwise.
 */
```

**Implementation:**

```typescript
export function isSubdomainCreation(
    content: SubdomainCreationContent
): content is SubdomainCreationContent {
    // Validate types
    const validTypes =
        typeof content.recipient === "string" &&
        typeof content.subdomain === "string";
    if (!validTypes) {
        return false;
    }

    // Validate recipient (must be 32-bytes long with 0x prefix)
    const validTokenAddress =
        content.recipient.startsWith("0x") && content.recipient.length === 66;
    if (!validTokenAddress) {
        return false;
    }

    // Validate subdomain
    const validStarkName =
        isStarkDomain(content.subdomain) &&
        content.subdomain.split(".").length === 3;

    if (!validStarkName) {
        return false;
    }
    return true;
}
```
### File: `actions/swap.ts`
#### Interfaces

##### `SwapContent`

```typescript
/**
 * Interface representing the content to be swapped.
 * @property {string} sellTokenAddress - The address of the token to be sold.
 * @property {string} buyTokenAddress - The address of the token to be bought.
 * @property {string} sellAmount - The amount of tokens to be sold.
 */
```

**Implementation:**

```typescript
interface SwapContent {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount: string;
}
```

#### Functions

##### `isSwapContent`

```typescript
/**
 * Checks if the given content object is a valid SwapContent object.
 *
 * @param {SwapContent} content - The content object to be validated
 * @returns {boolean} - True if the content is a valid SwapContent object, false otherwise
 */
```

**Implementation:**

```typescript
export function isSwapContent(content: SwapContent): content is SwapContent {
    // Validate types
    const validTypes =
        typeof content.sellTokenAddress === "string" &&
        typeof content.buyTokenAddress === "string" &&
        typeof content.sellAmount === "string";
    if (!validTypes) {
        return false;
    }

    // Validate addresses (must be 32-bytes long with 0x prefix)
    const validAddresses =
        content.sellTokenAddress.startsWith("0x") &&
        content.sellTokenAddress.length === 66 &&
        content.buyTokenAddress.startsWith("0x") &&
        content.buyTokenAddress.length === 66;

    return validAddresses;
}
```
### File: `actions/takeOrder.ts`
#### Interfaces

##### `Order`

```typescript
/**
 * Represents an order with details such as user ID, ticker symbol, contract address, timestamp,
 * buy amount, and price.
 * @typedef {Object} Order
 * @property {string} userId - The unique identifier of the user placing the order.
 * @property {string} ticker - The symbol of the asset being ordered.
 * @property {string} contractAddress - The address of the contract for the asset being ordered.
 * @property {string} timestamp - The date and time when the order was placed.
 * @property {number} buyAmount - The quantity of the asset being bought.
 * @property {number} price - The price per unit of the asset being ordered.
 */
```

**Implementation:**

```typescript
interface Order {
    userId: string;
    ticker: string;
    contractAddress: string;
    timestamp: string;
    buyAmount: number;
    price: number;
}
```
### File: `actions/transfer.ts`
#### Interfaces

##### `TransferContent`

```typescript
/**
 * Represents the content of a transfer, extending the Content interface.
 * @interface TransferContent
 * @extends Content
 * @property {string} tokenAddress - The address of the token being transferred.
 * @property {string} [recipient] - The recipient of the transfer (optional).
 * @property {string} [starkName] - The Stark name associated with the transfer (optional).
 * @property {string|number} amount - The amount of token being transferred, can be a string or a number.
 */
```

**Implementation:**

```typescript
export interface TransferContent extends Content {
    tokenAddress: string;
    recipient?: string;
    starkName?: string;
    amount: string | number;
}
```

#### Functions

##### `isTransferContent`

```typescript
/**
 * Function to check if the provided content is a valid TransferContent object.
 *
 * @param {TransferContent} content - The content to be validated.
 * @returns {boolean} - True if the content is a valid TransferContent object, false otherwise.
 */
```

**Implementation:**

```typescript
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
```
### File: `actions/unruggable.ts`
#### Interfaces

##### `DeployTokenContent`

```typescript
/**
 * Interface representing the content for deploying a token.
 * @interface
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} owner - The owner of the token.
 * @property {string} initialSupply - The initial supply of the token.
 */
```

**Implementation:**

```typescript
interface DeployTokenContent {
    name: string;
    symbol: string;
    owner: string;
    initialSupply: string;
}
```

#### Functions

##### `isDeployTokenContent`

```typescript
/**
 * Check if the given object is a valid DeployTokenContent by validating its properties.
 * @param {DeployTokenContent} content - The content to be validated.
 * @returns {boolean} - true if the content is a valid DeployTokenContent, false otherwise.
 */
```

**Implementation:**

```typescript
export function isDeployTokenContent(content: DeployTokenContent) {
    // Validate types
    const validTypes =
        typeof content.name === "string" &&
        typeof content.symbol === "string" &&
        typeof content.owner === "string" &&
        typeof content.initialSupply === "string";
    if (!validTypes) {
        return false;
    }

    // Validate addresses (must be 32-bytes long with 0x prefix)
    const validAddresses =
        content.name.length > 2 &&
        content.symbol.length > 2 &&
        parseInt(content.initialSupply) > 0 &&
        content.owner.startsWith("0x") &&
        content.owner.length === 66;

    return validAddresses;
}
```
### File: `providers/utils.ts`
#### Interfaces

##### `TokenMetrics`

```typescript
/**
 * Interface for token metrics.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total supply.
 * @property {number} ownerPercentage - The owner's percentage.
 * @property {number} creatorPercentage - The creator's percentage.
 * @property {number} top10HolderPercent - The percentage of top 10 holders.
 * @property {number} priceChange24hPercent - The percentage change in price in the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage change in price in the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets in the last 24 hours.
 * @property {bigint} volume24hUsd - The volume in USD in the last 24 hours.
 */
```

**Implementation:**

```typescript
export interface TokenMetrics {
    liquidityUsd: bigint;
    marketCapUsd: bigint;
    totalSupply: bigint;
    ownerPercentage: number;
    creatorPercentage: number;
    top10HolderPercent: number;
    priceChange24hPercent: number;
    priceChange12hPercent: number;
    uniqueWallet24h: number;
    volume24hUsd: bigint;
}
```

##### `TradingThresholds`

```typescript
/**
 * Interface representing trading thresholds for a cryptocurrency.
 * @typedef {Object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - The volume threshold in USD for the last 24 hours.
 * @property {number} [priceChange24hPercentThreshold] - The price change threshold in percentage for the last 24 hours.
 * @property {number} [priceChange12hPercentThreshold] - The price change threshold in percentage for the last 12 hours.
 * @property {number} [top10HolderPercentThreshold] - The percentage threshold for top 10 holders.
 * @property {number} [uniqueWallet24hThreshold] - The threshold for unique wallets in the last 24 hours.
 * @property {number} [minimumLiquidityUsd] - The minimum liquidity threshold in USD.
 * @property {number} [minimumMarketCapUsd] - The minimum market cap threshold in USD.
 */
```

**Implementation:**

```typescript
export interface TradingThresholds {
    volume24hUsdThreshold?: number;
    priceChange24hPercentThreshold?: number;
    priceChange12hPercentThreshold?: number;
    top10HolderPercentThreshold?: number;
    uniqueWallet24hThreshold?: number;
    minimumLiquidityUsd?: number;
    minimumMarketCapUsd?: number;
}
```

##### `HolderAnalysisParams`

```typescript
/**
 * Interface for holding analysis parameters.
 * @typedef {Object} HolderAnalysisParams
 * @property {HolderData[]} holders - Array of holder data
 * @property {string} ownerBalance - Balance of the owner
 * @property {string} creatorBalance - Balance of the creator
 * @property {number} [thresholdPercentage] - Optional threshold percentage
 */
```

**Implementation:**

```typescript
export interface HolderAnalysisParams {
    holders: HolderData[];
    ownerBalance: string;
    creatorBalance: string;
    thresholdPercentage?: number;
}
```

##### `HolderAnalysisResult`

```typescript
/**
 * Interface representing the analysis result of a holder.
 * @typedef {Object} HolderAnalysisResult
 * @property {number} count - The number of holders.
 * @property {Array<{ address: string, percentage: number }>} holders - An array containing objects with address and percentage of each holder.
 * @property {bigint} totalSupply - The total supply of the holder.
 */
```

**Implementation:**

```typescript
export interface HolderAnalysisResult {
    count: number;
    holders: Array<{
        address: string;
        percentage: number;
    }>;
    totalSupply: bigint;
}
```

#### Functions

##### `evaluateTokenTrading`

```typescript
/**
 * Evaluates if a token meets trading conditions based on the provided TokenMetrics and optional TradingThresholds.
 *
 * @param {TokenMetrics} metrics - The metrics of the token to evaluate.
 * @param {TradingThresholds} thresholds - The thresholds for trading conditions (optional).
 * @returns {{ shouldTrade: boolean, reasons: string[] }} An object with the evaluation result (shouldTrade) and reasons for the evaluation.
 */
```

**Implementation:**

```typescript
export function evaluateTokenTrading(
    metrics: TokenMetrics,
    thresholds: TradingThresholds = {}
): { shouldTrade: boolean; reasons: string[] } {
    // Default thresholds
    const {
        volume24hUsdThreshold = 1000,
        priceChange24hPercentThreshold = 10,
        priceChange12hPercentThreshold = 5,
        top10HolderPercentThreshold = 0.05,
        uniqueWallet24hThreshold = 100,
        minimumLiquidityUsd = 1000,
        minimumMarketCapUsd = 100000,
    } = thresholds;

    const reasons: string[] = [];

    // Evaluate each condition
    if (metrics.top10HolderPercent >= top10HolderPercentThreshold) {
        reasons.push("High concentration in top 10 holders");
    }

    if (metrics.volume24hUsd >= BigInt(volume24hUsdThreshold)) {
        reasons.push("High 24h trading volume");
    }

    if (metrics.priceChange24hPercent >= priceChange24hPercentThreshold) {
        reasons.push("Significant 24h price change");
    }

    if (metrics.priceChange12hPercent >= priceChange12hPercentThreshold) {
        reasons.push("Significant 12h price change");
    }

    if (metrics.uniqueWallet24h >= uniqueWallet24hThreshold) {
        reasons.push("High number of unique wallets");
    }

    if (metrics.liquidityUsd < BigInt(minimumLiquidityUsd)) {
        reasons.push("Low liquidity");
    }

    if (metrics.marketCapUsd < BigInt(minimumMarketCapUsd)) {
        reasons.push("Low market cap");
    }

    return {
        shouldTrade: reasons.length > 0,
        reasons,
    };
}
```

##### `analyzeHighSupplyHolders`

```typescript
/**
 * Analyzes the high supply holders based on the specified parameters.
 *
 * @param {HolderAnalysisParams} params - The parameters for analyzing high supply holders.
 * @returns {HolderAnalysisResult} The analysis result containing the count of high supply holders,
 * the list of high supply holders, and the total supply.
 */
```

**Implementation:**

```typescript
export function analyzeHighSupplyHolders(
    params: HolderAnalysisParams
): HolderAnalysisResult {
    try {
        const {
            holders,
            ownerBalance,
            creatorBalance,
            thresholdPercentage = 0.02, // Default threshold of 2%
        } = params;

        const ownerBalanceBigInt = num.toBigInt(ownerBalance);
        const totalSupply = ownerBalanceBigInt + num.toBigInt(creatorBalance);

        const highSupplyHolders = holders
            .map((holder) => {
                const balance = num.toBigInt(holder.balance);
                const percentage = Number(balance) / Number(totalSupply);
                return {
                    address: holder.address,
                    percentage,
                };
            })
            .filter((holder) => holder.percentage > thresholdPercentage);

        return {
            count: highSupplyHolders.length,
            holders: highSupplyHolders,
            totalSupply,
        };
    } catch (error) {
        console.error("Error analyzing high supply holders:", error);
        return {
            count: 0,
            holders: [],
            totalSupply: BigInt(0),
        };
    }
}
```
### File: `types/token.ts`
#### Interfaces

##### `QuoteRequest`

```typescript
/**
 * Interface representing a quote request.
 * @typedef {Object} QuoteRequest
 * @property {string} sellTokenAddress - The address of the token to be sold.
 * @property {string} buyTokenAddress - The address of the token to be bought.
 * @property {bigint} [sellAmount] - The amount of token to be sold.
 * @property {bigint} [buyAmount] - The amount of token to be bought.
 * @property {string} [takerAddress] - The address which will fill the quote.
 * @property {number} [size] - The maximum number of returned quotes.
 * @property {string[]} [excludeSources] - The sources that the user wants to exclude.
 * @property {bigint} [integratorFees] - Fee amount in basis points, where 30 is 0.3%.
 * @property {string} [integratorFeeRecipient] - Required when integratorFees is defined. The address of the fee collector.
 * @property {string} [integratorName] - The name of the integrating application.
 */
```

**Implementation:**

```typescript
interface QuoteRequest {
    sellTokenAddress: string;
    buyTokenAddress: string;
    sellAmount?: bigint;
    buyAmount?: bigint;
    // The address which will fill the quote
    takerAddress?: string;
    // The maximum number of returned quotes
    size?: number;
    // The sources that the user wants to exclude
    excludeSources?: string[]; // ['10KSwap']
    // Fee amount in bps, 30 is 0.3%
    integratorFees?: bigint;
    // Required when integratorFees is defined. You need to provide the address of your fee collector.
    integratorFeeRecipient?: string; // 0x01238E9778D026588a51595E30B0F45609B4F771EecF0E335CdeFeD1d84a9D89
    // The name of your application
    integratorName?: string; // AVNU Portal
}
```

##### `Quote`

```typescript
/**
 * Interface representing a quote for a trade transaction.
 * @typedef {Object} Quote
 * @property {string} quoteId - The unique id of the quote.
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {bigint} sellAmount - The amount of the token being sold.
 * @property {number} sellAmountInUsd - The equivalent value of the sold amount in USD.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint} buyAmount - The amount of the token being bought.
 * @property {number} buyAmountInUsd - The equivalent value of the bought amount in USD.
 * @property {number} [blockNumber] - The block number corresponding to the transaction.
 * @property {string} chainId - The blockchain network chain id.
 * @property {number} [expiry] - The Unix timestamp when the quote expires (in seconds).
 * @property {Route[]} routes - The possible transaction routes.
 * @property {bigint} gasFees - The estimated gas fees in ETH.
 * @property {number} gasFeesInUsd - The equivalent value of gas fees in USD.
 * @property {bigint} avnuFees - The actual fees taken by AVNU.
 * @property {number} avnuFeesInUsd - The equivalent value of fees taken by AVNU in USD.
 * @property {bigint} avnuFeesBps - The fees taken by AVNU in basis points (bps).
 * @property {bigint} integratorFees - The actual fees taken by the integrator.
 * @property {number} integratorFeesInUsd - The equivalent value of fees taken by the integrator in USD.
 * @property {bigint} integratorFeesBps - The fees taken by the integrator in basis points (bps).
 * @property {number} priceRatioUsd - The price ratio in USD and in basis points (bps).
 * @property {number} [sellTokenPriceInUsd] - The price of the sell token in USD.
 * @property {number} [buyTokenPriceInUsd] - The price of the buy token in USD.
 * @property {Gasless} gasless - Object containing gasless transaction information.
 */
```

**Implementation:**

```typescript
interface Quote {
    // The unique id of the quote
    quoteId: string;
    sellTokenAddress: string;
    sellAmount: bigint;
    sellAmountInUsd: number;
    buyTokenAddress: string;
    buyAmount: bigint;
    buyAmountInUsd: number;
    blockNumber?: number;
    chainId: string;
    // Unix timestamp when quotes expires in seconds
    expiry?: number;
    routes: Route[];
    // The estimated amount of gas fees in ETH
    gasFees: bigint;
    // The estimated amount of gas fees in usd
    gasFeesInUsd: number;
    // The actual fees taken by AVNU
    avnuFees: bigint;
    // The actual fees taken by AVNU is usd
    avnuFeesInUsd: number;
    // The fees in bps taken by AVNU
    avnuFeesBps: bigint;
    // The actual fees taken by the integrator
    integratorFees: bigint;
    // The actual fees taken by the integrator in usd
    integratorFeesInUsd: number;
    // The fees in bps taken by the integrator
    integratorFeesBps: bigint;
    // Price ratio in usd and in bps
    priceRatioUsd: number;
    // The sell token price in usd
    sellTokenPriceInUsd?: number;
    // The buy token price in usd
    buyTokenPriceInUsd?: number;
    gasless: Gasless;
}
```

##### `Route`

```typescript
/**
 * Interface representing a route with the following properties:
 * - name: The name of the source (e.g. 10kSwap)
 * - address: The address of the source
 * - percent: The percentage distribution of sellToken (1 represents 100%)
 * - sellTokenAddress: The address of the sell token
 * - buyTokenAddress: The address of the buy token
 * - routes: An array of Route objects representing the possible routes
 */
```

**Implementation:**

```typescript
interface Route {
    // The name of the source
    name: string; // 10kSwap
    // The address of the source
    address: string;
    // The percentage distribution of sellToken. 1 is 100%
    percent: number;
    sellTokenAddress: string;
    buyTokenAddress: string;
    routes: Route[];
}
```

##### `Gasless`

```typescript
/**
 * Gasless interface representing gasless transactions.
 * @typedef {Object} Gasless
 * @property {boolean} active - Indicates if gasless transactions are active.
 * @property {Object[]} gasTokenPrices - Array of gas token prices.
 * @property {string} gasTokenPrices.tokenAddress - Address of the gas token.
 * @property {number} gasTokenPrices.gasFeesInUsd - Gas fees in USD.
 * @property {bigint} gasTokenPrices.gasFeesInGasToken - Gas fees in gas token.
 */
```

**Implementation:**

```typescript
export interface Gasless {
    active: boolean;
    gasTokenPrices: {
        tokenAddress: string;
        gasFeesInUsd: number;
        gasFeesInGasToken: bigint;
    }[];
}
```

##### `TokenInfo`

```typescript
/**
 * Interface representing information about a token.
 * @typedef {Object} TokenInfo
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} address - The address of the token.
 * @property {string} logoUri - The URI of the token's logo.
 * @property {string} coingeckoId - The Coingecko ID of the token.
 * @property {boolean} verified - Indicates if the token is verified.
 * @property {Object} market - Information about the token's market.
 * @property {number} market.currentPrice - The token's current price.
 * @property {number} market.marketCap - The token's market capitalization.
 * @property {number} market.fullyDilutedValuation - The token's fully diluted valuation.
 * @property {number} market.starknetTvl - The token's Starknet TVL.
 * @property {number} market.priceChange1h - The price change in the last 1 hour.
 * @property {number} market.priceChangePercentage1h - The price change percentage in the last 1 hour.
 * @property {number} market.priceChange24h - The price change in the last 24 hours.
 * @property {number} market.priceChangePercentage24h - The price change percentage in the last 24 hours.
 * @property {number} market.priceChange7d - The price change in the last 7 days.
 * @property {number} market.priceChangePercentage7d - The price change percentage in the last 7 days.
 * @property {number} market.marketCapChange24h - The market capitalization change in the last 24 hours.
 * @property {number} market.marketCapChangePercentage24h - The market capitalization change percentage in the last 24 hours.
 * @property {number} market.starknetVolume24h - The Starknet trading volume in the last 24 hours.
 * @property {number} market.starknetTradingVolume24h - The Starknet volume of trading in the last 24 hours.
 * @property {string[]} tags - The tags associated with the token.
 */
```

**Implementation:**

```typescript
export interface TokenInfo {
    name: string;
    symbol: string;
    address: string;
    logoUri: string;
    coingeckoId: string;
    verified: boolean;
    market: {
        currentPrice: number;
        marketCap: number;
        fullyDilutedValuation: number;
        starknetTvl: number;
        priceChange1h: number;
        priceChangePercentage1h: number;
        priceChange24h: number;
        priceChangePercentage24h: number;
        priceChange7d: number;
        priceChangePercentage7d: number;
        marketCapChange24h: number;
        marketCapChangePercentage24h: number;
        starknetVolume24h: number;
        starknetTradingVolume24h: number;
    };
    tags: string[];
}
```
### File: `types/trustDB.ts`
#### Interfaces

##### `TokenSecurityData`

```typescript
/**
 * Interface representing the security data for a token.
 * @typedef {Object} TokenSecurityData
 * @property {string} ownerBalance - The balance of the owner of the token.
 * @property {string} creatorBalance - The balance of the creator of the token.
 * @property {number} ownerPercentage - The percentage of the token owned by the owner.
 * @property {number} creatorPercentage - The percentage of the token owned by the creator.
 * @property {string} top10HolderBalance - The balance of the top 10 token holder.
 * @property {number} top10HolderPercent - The percentage of the token owned by the top 10 holder.
 */
```

**Implementation:**

```typescript
export interface TokenSecurityData {
    ownerBalance: string;
    creatorBalance: string;
    ownerPercentage: number;
    creatorPercentage: number;
    top10HolderBalance: string;
    top10HolderPercent: number;
}
```

##### `TokenTradeData`

```typescript
/**
 * Represents data for a token trade.
 * @typedef {Object} TokenTradeData
 * @property {string} address - The address of the token.
 * @property {number} holder - The number of token holders.
 * @property {number} market - The market data.
 * @property {number} last_trade_unix_time - The Unix time of the last trade.
 * @property {string} last_trade_human_time - The human-readable time of the last trade.
 * @property {number} price - The current price of the token.
 * @property {number} history_30m_price - The price history from the last 30 minutes.
 * @property {number} price_change_30m_percent - The percentage change in price from the last 30 minutes.
 * @property {number} history_1h_price - The price history from the last hour.
 * @property {number} price_change_1h_percent - The percentage change in price from the last hour.
 * ...
 * // (Continues for each property in the TokenTradeData interface)
 */
```

**Implementation:**

```typescript
export interface TokenTradeData {
    address: string;
    holder: number;
    market: number;
    last_trade_unix_time: number;
    last_trade_human_time: string;
    price: number;
    history_30m_price: number;
    price_change_30m_percent: number;
    history_1h_price: number;
    price_change_1h_percent: number;
    history_2h_price: number;
    price_change_2h_percent: number;
    history_4h_price: number;
    price_change_4h_percent: number;
    history_6h_price: number;
    price_change_6h_percent: number;
    history_8h_price: number;
    price_change_8h_percent: number;
    history_12h_price: number;
    price_change_12h_percent: number;
    history_24h_price: number;
    price_change_24h_percent: number;
    unique_wallet_30m: number;
    unique_wallet_history_30m: number;
    unique_wallet_30m_change_percent: number;
    unique_wallet_1h: number;
    unique_wallet_history_1h: number;
    unique_wallet_1h_change_percent: number;
    unique_wallet_2h: number;
    unique_wallet_history_2h: number;
    unique_wallet_2h_change_percent: number;
    unique_wallet_4h: number;
    unique_wallet_history_4h: number;
    unique_wallet_4h_change_percent: number;
    unique_wallet_8h: number;
    unique_wallet_history_8h: number | null;
    unique_wallet_8h_change_percent: number | null;
    unique_wallet_24h: number;
    unique_wallet_history_24h: number | null;
    unique_wallet_24h_change_percent: number | null;
    trade_30m: number;
    trade_history_30m: number;
    trade_30m_change_percent: number;
    sell_30m: number;
    sell_history_30m: number;
    sell_30m_change_percent: number;
    buy_30m: number;
    buy_history_30m: number;
    buy_30m_change_percent: number;
    volume_30m: number;
    volume_30m_usd: number;
    volume_history_30m: number;
    volume_history_30m_usd: number;
    volume_30m_change_percent: number;
    volume_buy_30m: number;
    volume_buy_30m_usd: number;
    volume_buy_history_30m: number;
    volume_buy_history_30m_usd: number;
    volume_buy_30m_change_percent: number;
    volume_sell_30m: number;
    volume_sell_30m_usd: number;
    volume_sell_history_30m: number;
    volume_sell_history_30m_usd: number;
    volume_sell_30m_change_percent: number;
    trade_1h: number;
    trade_history_1h: number;
    trade_1h_change_percent: number;
    sell_1h: number;
    sell_history_1h: number;
    sell_1h_change_percent: number;
    buy_1h: number;
    buy_history_1h: number;
    buy_1h_change_percent: number;
    volume_1h: number;
    volume_1h_usd: number;
    volume_history_1h: number;
    volume_history_1h_usd: number;
    volume_1h_change_percent: number;
    volume_buy_1h: number;
    volume_buy_1h_usd: number;
    volume_buy_history_1h: number;
    volume_buy_history_1h_usd: number;
    volume_buy_1h_change_percent: number;
    volume_sell_1h: number;
    volume_sell_1h_usd: number;
    volume_sell_history_1h: number;
    volume_sell_history_1h_usd: number;
    volume_sell_1h_change_percent: number;
    trade_2h: number;
    trade_history_2h: number;
    trade_2h_change_percent: number;
    sell_2h: number;
    sell_history_2h: number;
    sell_2h_change_percent: number;
    buy_2h: number;
    buy_history_2h: number;
    buy_2h_change_percent: number;
    volume_2h: number;
    volume_2h_usd: number;
    volume_history_2h: number;
    volume_history_2h_usd: number;
    volume_2h_change_percent: number;
    volume_buy_2h: number;
    volume_buy_2h_usd: number;
    volume_buy_history_2h: number;
    volume_buy_history_2h_usd: number;
    volume_buy_2h_change_percent: number;
    volume_sell_2h: number;
    volume_sell_2h_usd: number;
    volume_sell_history_2h: number;
    volume_sell_history_2h_usd: number;
    volume_sell_2h_change_percent: number;
    trade_4h: number;
    trade_history_4h: number;
    trade_4h_change_percent: number;
    sell_4h: number;
    sell_history_4h: number;
    sell_4h_change_percent: number;
    buy_4h: number;
    buy_history_4h: number;
    buy_4h_change_percent: number;
    volume_4h: number;
    volume_4h_usd: number;
    volume_history_4h: number;
    volume_history_4h_usd: number;
    volume_4h_change_percent: number;
    volume_buy_4h: number;
    volume_buy_4h_usd: number;
    volume_buy_history_4h: number;
    volume_buy_history_4h_usd: number;
    volume_buy_4h_change_percent: number;
    volume_sell_4h: number;
    volume_sell_4h_usd: number;
    volume_sell_history_4h: number;
    volume_sell_history_4h_usd: number;
    volume_sell_4h_change_percent: number;
    trade_8h: number;
    trade_history_8h: number | null;
    trade_8h_change_percent: number | null;
    sell_8h: number;
    sell_history_8h: number | null;
    sell_8h_change_percent: number | null;
    buy_8h: number;
    buy_history_8h: number | null;
    buy_8h_change_percent: number | null;
    volume_8h: number;
    volume_8h_usd: number;
    volume_history_8h: number;
    volume_history_8h_usd: number;
    volume_8h_change_percent: number | null;
    volume_buy_8h: number;
    volume_buy_8h_usd: number;
    volume_buy_history_8h: number;
    volume_buy_history_8h_usd: number;
    volume_buy_8h_change_percent: number | null;
    volume_sell_8h: number;
    volume_sell_8h_usd: number;
    volume_sell_history_8h: number;
    volume_sell_history_8h_usd: number;
    volume_sell_8h_change_percent: number | null;
    trade_24h: number;
    trade_history_24h: number;
    trade_24h_change_percent: number | null;
    sell_24h: number;
    sell_history_24h: number;
    sell_24h_change_percent: number | null;
    buy_24h: number;
    buy_history_24h: number;
    buy_24h_change_percent: number | null;
    volume_24h: number;
    volume_24h_usd: number;
    volume_history_24h: number;
    volume_history_24h_usd: number;
    volume_24h_change_percent: number | null;
    volume_buy_24h: number;
    volume_buy_24h_usd: number;
    volume_buy_history_24h: number;
    volume_buy_history_24h_usd: number;
    volume_buy_24h_change_percent: number | null;
    volume_sell_24h: number;
    volume_sell_24h_usd: number;
    volume_sell_history_24h: number;
    volume_sell_history_24h_usd: number;
    volume_sell_24h_change_percent: number | null;
}
```

##### `HolderData`

```typescript
/**
 * Interface representing data of a holder.
 * @property {string} address - The address of the holder.
 * @property {string} balance - The balance of the holder.
 */
```

**Implementation:**

```typescript
export interface HolderData {
    address: string;
    balance: string;
}
```

##### `ProcessedTokenData`

```typescript
/**
 * Interface representing processed token data.
 *
 * @typedef {Object} ProcessedTokenData
 * @property {TokenSecurityData} security - Security data of the token
 * @property {TokenInfo} tradeData - Information about the token trade
 * @property {string} holderDistributionTrend - Trend of holder distribution ('increasing' | 'decreasing' | 'stable')
 * @property {Array<{ holderAddress: string; balanceUsd: string; }>} highValueHolders - Array of high value holders with their address and balance in USD
 * @property {boolean} recentTrades - Indicates if there have been recent trades
 * @property {number} highSupplyHoldersCount - Count of high supply holders
 * @property {DexScreenerData} dexScreenerData - Data from DexScreener
 * @property {boolean} isDexScreenerListed - Indicates if the token is listed on DexScreener
 * @property {boolean} isDexScreenerPaid - Indicates if the token is paid on DexScreener
 */
```

**Implementation:**

```typescript
export interface ProcessedTokenData {
    security: TokenSecurityData;
    tradeData: TokenInfo;
    holderDistributionTrend: string; // 'increasing' | 'decreasing' | 'stable'
    highValueHolders: Array<{
        holderAddress: string;
        balanceUsd: string;
    }>;
    recentTrades: boolean;
    highSupplyHoldersCount: number;
    dexScreenerData: DexScreenerData;

    isDexScreenerListed: boolean;
    isDexScreenerPaid: boolean;
}
```

##### `DexScreenerPair`

```typescript
/**
 * Interface representing a DexScreenerPair containing details about a pair on a decentralized exchange.
 * @typedef {Object} DexScreenerPair
 * @property {string} chainId - The ID of the chain the pair belongs to.
 * @property {string} dexId - The ID of the decentralized exchange.
 * @property {string} url - The URL of the pair.
 * @property {string} pairAddress - The address of the pair.
 * @property {Object} baseToken - Details of the base token in the pair.
 * @property {string} baseToken.address - The address of the base token.
 * @property {string} baseToken.name - The name of the base token.
 * @property {string} baseToken.symbol - The symbol of the base token.
 * @property {Object} quoteToken - Details of the quote token in the pair.
 * @property {string} quoteToken.address - The address of the quote token.
 * @property {string} quoteToken.name - The name of the quote token.
 * @property {string} quoteToken.symbol - The symbol of the quote token.
 * @property {string} priceNative - The price in native currency.
 * @property {string} priceUsd - The price in USD.
 * @property {Object} txns - Transaction details.
 * @property {Object} txns.m5 - Transaction details for last 5 minutes.
 * @property {number} txns.m5.buys - Number of buys in last 5 minutes.
 * @property {number} txns.m5.sells - Number of sells in last 5 minutes.
 * @property {Object} volume - Volume details.
 * @property {number} volume.h24 - Volume in the last 24 hours.
 * @property {number} volume.h6 - Volume in the last 6 hours.
 * @property {number} volume.h1 - Volume in the last hour.
 * @property {number} volume.m5 - Volume in the last 5 minutes.
 * @property {Object} priceChange - Price change details.
 * @property {number} priceChange.m5 - Price change in the last 5 minutes.
 * @property {number} priceChange.h1 - Price change in the last hour.
 * @property {number} priceChange.h6 - Price change in the last 6 hours.
 * @property {number} priceChange.h24 - Price change in the last 24 hours.
 * @property {Object} liquidity - Liquidity details.
 * @property {number} liquidity.usd - Liquidity in USD.
 * @property {number} liquidity.base - Base liquidity.
 * @property {number} liquidity.quote - Quote liquidity.
 * @property {number} fdv - Fully-diluted value.
 * @property {number} marketCap - Market capitalization.
 * @property {number} pairCreatedAt - Timestamp of pair creation.
 * @property {Object} info - Additional information.
 * @property {string} info.imageUrl - URL of the image.
 * @property {Object[]} info.websites - Array of website details.
 * @property {string} info.websites.label - Label for the website.
 * @property {string} info.websites.url - URL of the website.
 * @property {Object[]} info.socials - Array of social media details.
 * @property {string} info.socials.type - Type of social media.
 * @property {string} info.socials.url - URL of the social media.
 * @property {Object} boosts - Boost details.
 * @property {number} boosts.active - Number of active boosts.
 */
```

**Implementation:**

```typescript
export interface DexScreenerPair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        address: string;
        name: string;
        symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
        m5: { buys: number; sells: number };
        h1: { buys: number; sells: number };
        h6: { buys: number; sells: number };
        h24: { buys: number; sells: number };
    };
    volume: {
        h24: number;
        h6: number;
        h1: number;
        m5: number;
    };
    priceChange: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    liquidity: {
        usd: number;
        base: number;
        quote: number;
    };
    fdv: number;
    marketCap: number;
    pairCreatedAt: number;
    info: {
        imageUrl: string;
        websites: { label: string; url: string }[];
        socials: { type: string; url: string }[];
    };
    boosts: {
        active: number;
    };
}
```

##### `DexScreenerData`

```typescript
/**
 * Interface representing the data format returned by a DexScreener.
 * @typedef {object} DexScreenerData
 * @property {string} schemaVersion - The version of the data schema.
 * @property {DexScreenerPair[]} pairs - An array of DexScreenerPair objects representing pairs of assets.
 */
```

**Implementation:**

```typescript
export interface DexScreenerData {
    schemaVersion: string;
    pairs: DexScreenerPair[];
}
```

##### `Prices`

```typescript
/**
 * Interface for storing price information for different cryptocurrencies.
 * @typedef {Object} Prices
 * @property {Object} starknet - Price information for StarkNet currency.
 * @property {string} starknet.usd - Price in USD for StarkNet currency.
 * @property {Object} bitcoin - Price information for Bitcoin currency.
 * @property {string} bitcoin.usd - Price in USD for Bitcoin currency.
 * @property {Object} ethereum - Price information for Ethereum currency.
 * @property {string} ethereum.usd - Price in USD for Ethereum currency.
 */
```

**Implementation:**

```typescript
export interface Prices {
    starknet: { usd: string };
    bitcoin: { usd: string };
    ethereum: { usd: string };
}
```

##### `CalculatedBuyAmounts`

```typescript
/**
 * Interface representing different calculated buy amounts.
 * @property {number} none - Amount when there is no buy.
 * @property {number} low - Low buy amount.
 * @property {number} medium - Medium buy amount.
 * @property {number} high - High buy amount.
 */
```

**Implementation:**

```typescript
export interface CalculatedBuyAmounts {
    none: 0;
    low: number;
    medium: number;
    high: number;
}
```
### File: `utils/index.ts`
#### Interfaces

##### `ParseCurrencyAmountOptions`

```typescript
/**
 * Interface for specifying options for parsing currency amount.
 * @typedef {Object} ParseCurrencyAmountOptions
 * @property {number} fixed - The number of decimal places to fix the parsed currency amount.
 * @property {number} [significant] - Optional number indicating significant figures to consider while parsing currency amount.
 */
```

**Implementation:**

```typescript
interface ParseCurrencyAmountOptions {
    fixed: number;
    significant?: number;
}
```

#### Types

##### `RetryConfig`

```typescript
/**
 * Represents a configuration object for defining retry behavior.
 * @typedef {Object} RetryConfig
 * @property {number} [maxRetries] - The maximum number of retry attempts.
 * @property {number} [delay] - The initial delay in milliseconds between retry attempts.
 * @property {number} [maxDelay] - The maximum delay in milliseconds between retry attempts.
 * @property {Function} [backoff] - A function that calculates the backoff delay between retry attempts based on the retry count, current delay, and maximum delay.
 */
```

**Implementation:**

```typescript
export type RetryConfig = {
    maxRetries?: number;
    delay?: number;
    maxDelay?: number;
    backoff?: (retryCount: number, delay: number, maxDelay: number) => number;
};
```

#### Functions

##### `fetchWithRetry`

```typescript
/**
 * Fetch data from a URL with retries based on the specified configuration.
 * 
 * @template T The type of data expected to be returned.
 * @param {string} url The URL to fetch from.
 * @param {RequestInit} [options] The options for the fetch request.
 * @param {RetryConfig} [config] The configuration options for retry behavior.
 * @param {number} [config.maxRetries=3] The maximum number of retries before giving up.
 * @param {number} [config.delay=1000] The initial delay between retries in milliseconds.
 * @param {number} [config.maxDelay=10000] The maximum delay between retries in milliseconds.
 * @param {function(number, number, number): number} [config.backoff] The exponential backoff function to compute the delay between retries.
 * @returns {Promise<T>} A promise that resolves with the fetched data.
 * @throws {Error} If all retry attempts fail, the last error encountered is thrown.
 */
```

**Implementation:**

```typescript
export async function fetchWithRetry<T>(
    url: string,
    options?: RequestInit,
    config: RetryConfig = {}
): Promise<T> {
    const {
        maxRetries = 3,
        delay = 1000,
        maxDelay = 10000,
        backoff = (retryCount, baseDelay, maxDelay) =>
            Math.min(baseDelay * Math.pow(2, retryCount), maxDelay),
    } = config;

    let lastError: Error | null = null;

    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(
                    `Coingecko API HTTP status: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            elizaLogger.debug(`Error fetching ${url}:`, error);
            lastError = error as Error;

            if (retryCount === maxRetries) break;

            await new Promise((resolve) =>
                setTimeout(resolve, backoff(retryCount, delay, maxDelay))
            );
            elizaLogger.debug(`Retry #${retryCount + 1} to fetch ${url}...`);
        }
    }

    throw lastError;
}
```
### File: `environment.ts`
#### Types

##### `StarknetConfig`

```typescript
/**
 * Type definition for Starknet configuration based on the inferred type from starknetEnvSchema.
 */
```

**Implementation:**

```typescript
export type StarknetConfig = z.infer<typeof starknetEnvSchema>;
```

#### Functions

##### `validateStarknetConfig`

```typescript
/**
 * Validates the Starknet configuration using the provided runtime object.
 * @param {IAgentRuntime} runtime - The runtime object to access settings.
 * @returns {Promise<StarknetConfig>} - A promise that resolves with the validated Starknet configuration.
 * @throws {Error} - If the configuration validation fails.
 */
```

**Implementation:**

```typescript
export async function validateStarknetConfig(
    runtime: IAgentRuntime
): Promise<StarknetConfig> {
    try {
        const config = {
            STARKNET_ADDRESS:
                runtime.getSetting("STARKNET_ADDRESS") ||
                process.env.STARKNET_ADDRESS,
            STARKNET_PRIVATE_KEY:
                runtime.getSetting("STARKNET_PRIVATE_KEY") ||
                process.env.STARKNET_PRIVATE_KEY,
            STARKNET_RPC_URL:
                runtime.getSetting("STARKNET_RPC_URL") ||
                process.env.STARKNET_RPC_URL ||
                STARKNET_PUBLIC_RPC,
        };

        return starknetEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Starknet configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
```

## Development

### TODO Items
### Items
1. Export default take_order
   - Context: The code exports a function called take_order that is associated with the todo.
   - Type: bug
2. Compose context properly
   - Context: The code exports a function called take_order, and the context in the code needs to be arranged properly.
   - Type: bug
3. Parse and validate the JSON
   - Context: The code exports a function called take_order, and it needs to parse and validate JSON data.
   - Type: bug
4. Replace with validate like other actions
   - Context: The code exports a function called take_order, and it needs to replace a function with a "validate" function used in other actions in the code.
   - Type: feature
5. Implement this for Starknet
   - Context: The code imports various functionalities from core and other utility modules, and it requires implementation for Starknet compatibility.
   - Type: enhancement

### Troubleshooting
### Common Issues
1. Error: Plugin not loading properly
   - Cause: Incorrect installation or missing dependencies
   - Solution: Reinstall the plugin and make sure all dependencies are met

2. Data not displaying correctly
   - Cause: Incorrect data formatting or missing data
   - Solution: Check the data source and ensure correct formatting and complete data

### Debugging Tips
- Check console logs for any errors
- Verify data sources for accuracy and completeness
- Ask for help on the [Eliza Discord server](https://eliza.gg/)

### FAQ
Q: How to troubleshoot data display issues?
A: Verify data sources for accuracy and completeness. Make sure the data is correctly formatted to be displayed.