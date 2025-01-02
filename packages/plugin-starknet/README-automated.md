# @elizaos/plugin-starknet Documentation

## Overview
### Purpose
The @elizaos/plugin-starknet package is designed to provide a toolkit for interacting with the Starknet blockchain platform. It includes classes like WalletProvider for managing wallet functions, as well as interfaces for defining routes and capturing data from Dex Screener. The package offers essential components for developers to build applications on the Starknet network.

Package Information:
- Name: @elizaos/plugin-starknet
- Description: N/A
- Version: 0.1.7-alpha.2
- Keywords: Starknet, blockchain, wallet, route, Dex Screener

### Key Features
- WalletProvider class for wallet management
- Route interface for defining routes with source, address, percentage distribution, and token addresses
- DexScreenerData interface for capturing data from Dex Screener
- Prices interface for tracking prices of different cryptocurrencies, including Starknet
- Other code components and utilities for working with the Starknet blockchain platform.

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
- CD into the agent/ directory
- Run `pnpm install` to install the new dependency
- Run `pnpm build` to build the project with the new plugin

### 2. Importing and Using the Plugin:
- Import syntax:
  ```typescript
  import { starknetPlugin } from "@elizaos/plugin-starknet";
  ```
- Add the plugin to the AgentRuntime plugins array

### 3. Integration Example Setup:
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
- Ensure you see ["✓ Registering action: <plugin actions>"] in the console after integrating the plugin

Remember, this is a workspace package that needs to be added to agent/package.json and then built to successfully integrate with your ElizaOS project.

## Configuration
# Configuration Documentation

## Required Environment Variables

1. **STARKNET_ADDRESS**
   - Purpose: Represents the StarkNet address used for identification and communication within the decentralized network.
   
2. **STARKNET_PRIVATE_KEY**
   - Purpose: Represents the private key associated with the StarkNet address for secure authentication and transaction signing.
   
3. **STARKNET_RPC_URL**
   - Purpose: Represents the URL of the StarkNet RPC endpoint to interact with the network and execute remote procedure calls.
   
4. **STARKNETID_NAMING_CONTRACT**
   - Purpose: Represents the contract address of the naming contract used for assigning unique identifiers in the StarkNet network.
   
5. **STARKNETID_IDENTITY_CONTRACT**
   - Purpose: Represents the contract address of the identity contract used for managing user identities and permissions within the StarkNet ecosystem.

## .env Example File
```
STARKNET_ADDRESS=0x1234567890ABCDEF
STARKNET_PRIVATE_KEY=0xABCDEF1234567890
STARKNET_RPC_URL=https://rpc.starknet.io
STARKNETID_NAMING_CONTRACT=0x9876543210FEDCBA
STARKNETID_IDENTITY_CONTRACT=0xFEDCBA9876543210
```

Please configure the required environment variables in the **.env** file for the application to function properly. Remember to add the **.env** file to the **.gitignore** to prevent sensitive information from being committed to the repository.

## Features

### Actions
### EXECUTE_STARKNET_SWAP
Perform a token swap on starknet. Use this action when a user asks you to swap tokens anything.

#### Properties
- Name: EXECUTE_STARKNET_SWAP
- Similes: STARKNET_SWAP_TOKENS, STARKNET_TOKEN_SWAP, STARKNET_TRADE_TOKENS, STARKNET_EXCHANGE_TOKENS

#### Handler
The handler for EXECUTE_STARKNET_SWAP validates the Starknet configuration, composes a context for token swap using a template, generates a response object, fetches quotes for the swap, executes the swap with a specified slippage, and logs the transaction details.

#### Examples
- User 1: "Swap 10 ETH for LORDS"
  Agent: "Ok, I'll swap 10 ETH for LORDS"

- User 1: "Swap 100 $lords on starknet"
  Agent: "Ok, I'll swap 100 $lords on starknet"

- User 1: "Swap 0.5 BTC for LORDS"
  Agent: "Ok, I'll swap 0.5 BTC for LORDS"

### SEND_TOKEN
Initiate a token transfer on StarkNet.

#### Properties
- Name: SEND_TOKEN
- Similes: TRANSFER_TOKEN_ON_STARKNET, TRANSFER_TOKENS_ON_STARKNET, SEND_TOKENS_ON_STARKNET, SEND_ETH_ON_STARKNET, PAY_ON_STARKNET

#### Handler
The handler for this action validates the StarkNet configuration, composes a transfer context, generates transfer content, validates the content, and executes the token transfer using ERC20Token.

#### Examples
- User: "Send 10 ETH to 0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7"
  Agent: "I'll transfer 10 ETH to that address right away. Let me process that for you."
  
- User: "Send 10 ETH to domain.stark"
  Agent: "I'll transfer 10 ETH to domain.stark et address 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49 right away. Let me process that for you."
  
- User: "Can you transfer 50 LORDS tokens to 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49?"
  Agent: "Executing transfer of 50 LORDS tokens to the specified address. One moment please."
  
- User: "Can you transfer 50 LORDS tokens to domain.stark?"
  Agent: "Executing transfer of 50 LORDS tokens to domain.stark at address 0x0124aeb495b947201f5fac96fd1138e326ad86195b98df6dec9009158a533b49. One moment please."
  
- User: "Please send 0.5 BTC to 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac"
  Agent: "Got it, initiating transfer of 0.5 BTC to the provided address. I'll confirm once it's complete."
  
- User: "Please send 0.5 BTC to domain.stark"
  Agent: "Got it, initiating transfer of 0.5 BTC to domain.stark at address 0x03fe2b97c1fd336e750087d68b9b867997fd64a2661ff3ca5a7c771641e8e7ac. I'll confirm once it's complete."

### deployToken
Deploy an Unruggable Memecoin on Starknet. Use this action when a user asks you to deploy a new token on Starknet.

#### Properties
- Name: deployToken
- Similes: 
  - DEPLOY_STARKNET_UNRUGGABLE_TOKEN
  - STARKNET_DEPLOY_MEMECOIN
  - STARKNET_CREATE_MEMECOIN

#### Handler
The handler function validates the Starknet configuration, composes the deployment context, generates deployment content, deploys the memecoin on Starknet, initiates the token launch on Ekubo, and provides a callback response to the user.

#### Examples
- User: "Deploy a new token called Lords with the symbol LORDS, owned by 0x024BA6a4023fB90962bDfc2314F3B94372aa382D155291635fc3E6b777657A5B and initial supply of 1000000000000000000 on Starknet"
  Agent: "Ok, I'll deploy the Lords token to Starknet"

- User: "Deploy the SLINK coin to Starknet"
  Agent: "Ok, I'll deploy your coin on Starknet"

- User: "Create a new coin on Starknet"
  Agent: "Ok, I'll create a new coin for you on Starknet"

### CREATE_SUBDOMAIN
Creates a subdomain on Starknet.

#### Properties
- Name: CREATE_SUBDOMAIN
- Similes: CREATE_SUBDOMAIN_ON_STARKNET, SUBDOMAIN_ON_STARKNET, SUBDOMAIN_CREATION, SEND_SUBDOMAIN_ON_STARKNET

#### Handler
Handles the creation of a subdomain on Starknet by validating the request, generating transfer content, and executing the transfer.

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
1. Retrieve the wallet portfolio for a user:
```typescript
const walletProvider = new WalletProvider(runtime);
const portfolio = await walletProvider.getWalletPortfolio();
console.log(portfolio);
```

2. Get the USD values of tokens from Coingecko:
```typescript
const walletProvider = new WalletProvider(runtime);
const tokenPrices = await walletProvider.getTokenUsdValues();
console.log(tokenPrices);
```

### Best Practices
- Ensure to handle any errors or exceptions that may occur during the retrieval of the wallet portfolio or token USD values.
- It is recommended to check and handle the caching mechanism to optimize performance and reduce unnecessary API calls.

### providers/token.ts

### Common Use Cases
1. Fetch token data and security information for a specific token:
```typescript
const tokenProvider = new TokenProvider(tokenAddress, walletProvider);
const tokenData = await tokenProvider.getProcessedTokenData();
console.log(tokenData);
```

2. Check if a token should be traded based on various metrics:
```typescript
const tokenProvider = new TokenProvider(tokenAddress, walletProvider);
const shouldTrade = await tokenProvider.shouldTradeToken();
console.log(shouldTrade);
```

### Best Practices
- Always initialize the TokenProvider class with the correct token address and wallet provider.
- Handle any errors that may occur during processing the token data or determining trading status.

### providers/trustScoreProvider.ts

### Common Use Cases

1. **Update Trust Score:**  
   This use case involves updating the trust score for a recommender based on token performance and recommender metrics.  
   ```typescript
   const trustScoreManager = new TrustScoreManager(runtime, tokenProvider, trustScoreDb);
   const tokenAddress = "0x123abc...";
   const recommenderId = "abcd123...";
   
   trustScoreManager.generateTrustScore(tokenAddress, recommenderId, "recommenderWalletAddress")
     .then((result) => {
         console.log("Trust score updated successfully");
         // Do something with the result
     })
     .catch((error) => {
         console.error("Error updating trust score: ", error);
     });
   ```

2. **Get Recommendations:**  
   Fetching recommendations for a specific token and its associated recommender data.  
   ```typescript
   const trustScoreManager = new TrustScoreManager(runtime, tokenProvider, trustScoreDb);
   const tokenAddress = "0x456def...";
   const recommenderId = "efgh456...";
   
   trustScoreManager.getRecommendations(tokenAddress, recommenderId)
     .then((recommendations) => {
         console.log("Received recommendations: ", recommendations);
         // Process recommendations
     })
     .catch((error) => {
         console.error("Error fetching recommendations: ", error);
     });
   ```

### Best Practices

- **Proper Error Handling**: Always handle errors that may occur during trust score calculations or recommendation fetching to provide a better user experience.
- **Documentation:** Document the parameters and return types of each method for better understanding and maintenance of the codebase.

### utils/ERC20Token.ts

### Common Use Cases
1. **Creating an ERC20 Token Instance**
```typescript
import { ERC20Token } from 'utils/ERC20Token';

const token = new ERC20Token('0x123456789ABCDEF', providerOrAccount);
```

2. **Getting Token Balance**
```typescript
import { ERC20Token } from 'utils/ERC20Token';

const token = new ERC20Token('0x123456789ABCDEF', providerOrAccount);
const balance = await token.balanceOf('0xRecipientAddress');
console.log('Token balance:', balance);
```

### Best Practices
- **Use Type Definitions**
It is recommended to use the provided type definitions (ApproveCall, TransferCall) to ensure type safety and improve code readability.
- **Handle Promise Results**
Since some methods return promises, make sure to handle the results appropriately, either using async/await or .then() for promises. This ensures that the code executes correctly and handles any errors that may occur.

### utils/cache.ts

### Common Use Cases
1. **Caching Data**: 
```typescript
import { Cache } from './utils/cache';

const cache = new Cache();

// Storing data in cache
cache.set('userList', [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);

// Retrieving data from cache
const userList = cache.get('userList');
console.log(userList); // Output: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

2. **Using File-based Cache**: 
```typescript
import { Cache } from './utils/cache';

const cache = new Cache();

// Storing data in file-based cache
cache.writeCacheToFile('settings', { theme: 'dark', language: 'en' });

// Retrieving data from file-based cache
const settings = cache.readCacheFromFile('settings');
console.log(settings); // Output: { theme: 'dark', language: 'en' }
```

### Best Practices
- **Use Cache Keys Wisely**: Ensure unique and descriptive cache keys to avoid conflicts or confusion when retrieving cached data.
- **Regularly Clean Cache**: Implement a mechanism to clean up old or unnecessary cached data to optimize memory usage.

### actions/subdomain.ts

### Common Use Cases
1. Checking if the provided content is valid for subdomain creation:

```typescript
import { SubdomainCreationContent, isSubdomainCreation } from './actions/subdomain';

const content: SubdomainCreationContent = {
  recipient: 'example@gmail.com',
  subdomain: 'example',
};

const isValid: boolean = isSubdomainCreation(content);
console.log(isValid); // Output: true
```

2. Handling subdomain creation based on the provided content:

```typescript
import { SubdomainCreationContent, isSubdomainCreation } from './actions/subdomain';

function createSubdomain(content: SubdomainCreationContent): void {
  if (isSubdomainCreation(content)) {
    // Logic to create the subdomain
    console.log(`Subdomain ${content.subdomain} created for ${content.recipient}`);
  } else {
    console.log('Invalid content for subdomain creation');
  }
}

const content: SubdomainCreationContent = {
  recipient: 'test@email.com',
  subdomain: 'test',
};

createSubdomain(content);
```

### Best Practices
- When using the `isSubdomainCreation` function, ensure that the provided content matches the SubdomainCreationContent interface to prevent errors.
- Implement error handling or validation checks within the function that processes subdomain creation to handle invalid content gracefully.

### actions/swap.ts

### Common Use Cases
1. Checking if an object is a valid SwapContent object:
```typescript
const content = {
  sellTokenAddress: "0x123abc",
  buyTokenAddress: "0x456def",
  sellAmount: "10"
};

const isValidSwapContent = isSwapContent(content);
console.log(isValidSwapContent); // Output: true
```

2. Performing a swap based on the provided swap content:
```typescript
const content = {
  sellTokenAddress: "0x123abc",
  buyTokenAddress: "0x456def",
  sellAmount: "10"
};

if(isSwapContent(content)){
  // Perform swap based on the provided content
  console.log("Swapping tokens...");
} else {
  console.log("Invalid swap content");
}
```

### Best Practices
- Make sure to validate the input object using the `isSwapContent` function before performing any swap operation.
- Provide clear error messages or handling for cases where the input object is not a valid SwapContent object.

### actions/takeOrder.ts

### Common Use Cases
1. Taking an order from a user to trade a certain asset at a specified price.
```typescript
import { Order } from '../interfaces';

function takeOrder(order: Order): void {
    // Logic to process and execute the order
    console.log(`Order taken for asset ${order.ticker} by user ${order.userId}`);
}

const newOrder: Order = {
    userId: '123',
    ticker: 'AAPL',
    contractAddress: '0x1234567890',
    timestamp: '2022-10-20T09:00:00',
    buyAmount: 10,
    price: 150.50
};

takeOrder(newOrder);
```

2. Implementing a trading system that uses the `takeOrder` function to manage incoming orders from users.
```typescript
import { Order } from '../interfaces';

// Trading system class
class TradingSystem {
    takeOrder(order: Order): void {
        console.log(`Order received for asset ${order.ticker} by user ${order.userId}`);
        // Additional logic to process and execute the order
    }

    // Other trading system methods and properties
}

const tradingSystem = new TradingSystem();

const newOrder: Order = {
    userId: '456',
    ticker: 'GOOGL',
    contractAddress: '0xABCD987654',
    timestamp: '2022-10-21T10:00:00',
    buyAmount: 5,
    price: 2800.75
};

tradingSystem.takeOrder(newOrder);
```

### Best Practices
- Encapsulate the `takeOrder` functionality within a class or module to organize code and maintain separation of concerns.
- Validate the incoming order data to ensure it meets the required format and criteria before processing the order.

### actions/transfer.ts

### Common Use Cases
1. Transfer tokens to a recipient:
```typescript
import { TransferContent, isTransferContent } from './actions/transfer';

const transferData: TransferContent = {
  tokenAddress: '0x123abc',
  recipient: '0x456def',
  amount: '10'
};

if (isTransferContent(transferData)) {
  // Perform transfer action
} else {
  console.error('Invalid transfer data');
}
```

2. Check if content is a valid TransferContent object:
```typescript
import { TransferContent, isTransferContent } from './actions/transfer';

const contentToValidate: TransferContent = {
  tokenAddress: '0x789ghi',
  amount: 5
};

if (isTransferContent(contentToValidate)) {
  console.log('Content is a valid TransferContent object');
} else {
  console.error('Content is not a valid TransferContent object');
}
```

### Best Practices
- Always provide the required properties when creating a TransferContent object to ensure accurate data for the transfer action.
- Use the isTransferContent function to validate transfer content before performing any transfer actions to prevent errors.

### actions/unruggable.ts

### Common Use Cases
1. Checking if an object meets the criteria for a DeployTokenContent:
```typescript
import { isDeployTokenContent } from '../actions/unruggable';

const tokenContent = {
  name: "MyToken",
  symbol: "MT",
  owner: "0x1234567890",
  initialSupply: "1000000"
};

if(isDeployTokenContent(tokenContent)) {
  console.log("Token content is valid");
} else {
  console.log("Token content is invalid");
}
```

2. Using the DeployTokenContent interface in a function parameter:
```typescript
import { DeployTokenContent } from '../actions/unruggable';

const deployToken = (content: DeployTokenContent) => {
  // Logic to deploy token
  console.log(`Deploying token with name: ${content.name} and symbol: ${content.symbol}`);
};

const tokenContent = {
  name: "MyToken",
  symbol: "MT",
  owner: "0x1234567890",
  initialSupply: "1000000"
};

deployToken(tokenContent);
```

### Best Practices
- When defining an object that should adhere to the DeployTokenContent interface, make sure all properties are present and of the correct type.
- Use the isDeployTokenContent function to validate input before processing it further.

### providers/utils.ts

### Common Use Cases
1. **First use case with code example:**

   Usage: Evaluating if a token should be traded based on metrics and thresholds.
   
   ```typescript
   import { evaluateTokenTrading, TokenMetrics, TradingThresholds } from './providers/utils';
   
   const tokenMetrics: TokenMetrics = {
       liquidityUsd: 1000000,
       marketCapUsd: 5000000,
       totalSupply: 100000000,
       ownerPercentage: 10,
       creatorPercentage: 5,
       top10HolderPercent: 40,
       priceChange24hPercent: 2,
       priceChange12hPercent: 1,
       uniqueWallet24h: 200,
       volume24hUsd: 5000
   };
   
   const tradingThresholds: TradingThresholds = {
       volume24hUsdThreshold: 1000,
       priceChange24hPercentThreshold: 5,
       priceChange12hPercentThreshold: 3,
       top10HolderPercentThreshold: 50,
       uniqueWallet24hThreshold: 150,
       minimumLiquidityUsd: 500000,
       minimumMarketCapUsd: 2000000
   };
   
   const evaluationResult = evaluateTokenTrading(tokenMetrics, tradingThresholds);
   
   console.log(evaluationResult);
   ```
   
2. **Second use case with code example:**

   Usage: Analyzing high supply holders based on specified parameters.
   
   ```typescript
   import { analyzeHighSupplyHolders, HolderAnalysisParams } from './providers/utils';
   
   const holderAnalysisParams: HolderAnalysisParams = {
       holders: [
           { address: '0x1234', percentage: 20 },
           { address: '0x5678', percentage: 15 }
       ],
       ownerBalance: '1000000',
       creatorBalance: '500000',
       thresholdPercentage: 10
   };
   
   const analysisResult = analyzeHighSupplyHolders(holderAnalysisParams);
   
   console.log(analysisResult);
   ```

### Best Practices
- **Best practice 1:**
  
  When using the `evaluateTokenTrading` function, provide both the `TokenMetrics` and `TradingThresholds` objects to ensure accurate evaluation of whether the token should be traded.

- **Best practice 2:**

  When analyzing high supply holders with the `analyzeHighSupplyHolders` function, make sure to include the required parameters and provide meaningful threshold percentages for accurate analysis.

### types/token.ts

### Common Use Cases
1. Creating a quote request with specific parameters:
```typescript
const quoteRequest: QuoteRequest = {
  sellTokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  buyTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  sellAmount: 1000000000000000000,
  buyAmount: 3000000000000000000,
  takerAddress: '0x0000000000000000000000000000000000000000',
  size: 3,
  excludeSources: ['Uniswap', 'Kyber'],
  integratorFees: 30,
  integratorFeeRecipient: '0x77c6E4a580fEA585fC2E7FD6ajA56d20Eafa10ed',
  integratorName: 'MyApp'
};
```

2. Representing a quote object with detailed information:
```typescript
const quote: Quote = {
  quoteId: '123456',
  sellTokenAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  sellAmount: 1000000000000000000,
  sellAmountInUsd: 3000,
  buyTokenAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
  buyAmount: 3000000000000000000,
  buyAmountInUsd: 9000,
  blockNumber: 123456,
  chainId: '1',
  expiry: 1652956800,
  routes: [{ name: 'Uniswap', address: '0x1', percent: 1, sellTokenAddress: '0x6B1', buyTokenAddress: '0xC2' }],
  gasFees: 0.003,
  gasFeesInUsd: 9.0,
  avnuFees: 100000000,
  avnuFeesInUsd: 30000,
  avnuFeesBps: 30,
  integratorFees: 500000000,
  integratorFeesInUsd: 150000,
  integratorFeesBps: 50,
  priceRatioUsd: 3,
  sellTokenPriceInUsd: 3000,
  buyTokenPriceInUsd: 9000,
  gasless: { active: true, gasTokenPrices: [{ tokenAddress: '0xGas', gasFeesInUsd: 2.0, gasFeesInGasToken: 100000 }] }
};
```

### Best Practices
- When defining a quote request, provide as much information as possible to accurately retrieve the desired quotes.
- Ensure to handle and display all relevant information from the quote object to the user for transparency and clarity.

### types/trustDB.ts

### Common Use Cases
1. **Create a new instance of TokenSecurityData:**
   ```typescript
   import { TokenSecurityData } from './types/trustDB';

   const newTokenSecurityData: TokenSecurityData = {
       ownerBalance: '100'
   };
   ```

2. **Retrieve prices for different cryptocurrencies using the Prices interface:**
   ```typescript
   import { Prices } from './types/trustDB';

   const cryptoPrices: Prices = {
       starknet: { usd: '50' }
   };
   ```

### Best Practices
- **Use interfaces to define data structures:** By using interfaces like TokenSecurityData and Prices, you can clearly define the structure of your data and ensure type safety in your code.
- **Ensure data consistency:** By following the defined structure of interfaces like DexScreenerData, you can ensure that your data remains consistent and easy to work with throughout your application.

### utils/index.ts

### Common Use Cases
1. Fetching data from a URL with retry logic in case of failures:
```typescript
import { fetchWithRetry, RetryConfig } from './utils';

const url = 'https://api.example.com/data';
const config: RetryConfig = {
  maxRetries: 5,
  delay: 2000,
  maxDelay: 5000,
  backoff: (retryCount, baseDelay, maxDelay) => Math.min(baseDelay * Math.pow(2, retryCount), maxDelay)
};

fetchWithRetry(url, {}, config)
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

2. Parsing currency amounts with specified options:
```typescript
import { ParseCurrencyAmountOptions } from './utils';

const amount = 123.456789;
const options: ParseCurrencyAmountOptions = {
  fixed: 2,
  significant: 5
};

const formattedAmount = parseCurrencyAmount(amount, options);
console.log(formattedAmount); // Output: 123.46
```

### Best Practices
- Always provide appropriate configuration options for retrying operations to ensure efficient error handling.
- Use the provided interfaces to maintain consistency and readability in the codebase.

### environment.ts

### Common Use Cases
1. Validate Starknet configuration before running Starknet application:
```typescript
const runtime: IAgentRuntime = getAgentRuntime();
const validatedConfig: StarknetConfig = validateStarknetConfig(runtime);
// Use the validated Starknet configuration object
```

2. Ensure required settings and environment variables are correctly configured:
```typescript
const runtime: IAgentRuntime = getAgentRuntime();
try {
    const validatedConfig: StarknetConfig = validateStarknetConfig(runtime);
    // Continue with application logic
} catch (error) {
    console.error(error.message);
    // Handle error appropriately
}
```

### Best Practices
- Always pass the correct `IAgentRuntime` object to `validateStarknetConfig` function to ensure accurate validation.
- Use try-catch blocks when calling `validateStarknetConfig` to handle any validation errors gracefully.

## API Reference
### File: `providers/portfolioProvider.ts`
#### Classes

##### `WalletProvider`

```typescript
/**
 * A class representing a Wallet Provider.
 */
```

#### Types

##### `CoingeckoPrices`

```typescript
/**
 * Object containing prices of different cryptocurrencies in USD.
 * @typedef {Object} CoingeckoPrices
 * @property {Object.<string, {usd: number}>} - The key is the name of the cryptocurrency and the value is an object with the price in USD.
 */
```

##### `TokenBalances`

```typescript
/**
 * Represents a mapping of token addresses to their corresponding balances, where 
 * the token address is a string key and the balance is a bigint value.
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for creating a new instance of the class.
 * 
 * @param {IAgentRuntime} runtime - The runtime object used by the agent.
 */
```

##### `getWalletPortfolio`

```typescript
/**
 * Retrieves the wallet portfolio by fetching the balances of all tokens in the user's wallet.
 * If the data is found in the cache, it returns the cached values.
 * Otherwise, it fetches the balances for each token sequentially to prevent API issues.
 * Upon fetching the balances, it stores the data in the cache for future use with a 3-hour expiration.
 * @returns {Promise<TokenBalances>} The token balances in the wallet portfolio.
 */
```

##### `getTokenUsdValues`

```typescript
/**
 * Retrieves the USD values of tokens from Coingecko API.
 * If cached data is available, returns the cached values.
 * Otherwise, fetches the latest values, stores them in cache for 30 minutes, and returns them.
 * @returns {Promise<CoingeckoPrices>} The USD values of tokens
 */
```
### File: `providers/token.ts`
#### Classes

##### `TokenProvider`

```typescript
/**
 * TokenProvider class responsible for providing tokens.
 * @class
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for creating a new instance of the class.
 * @param {string} tokenAddress - The address of the token associated with the wallet.
 * @param {WalletProvider} walletProvider - The wallet provider used for interacting with the wallet.
 */
```

##### `fetchWithRetry`

```typescript
/**
 * Function to fetch data from a given URL with retry mechanism in place.
 * 
 * @template T - Type of the data to be fetched
 * @param {string} url - The URL to fetch the data from
 * @param {RequestInit} [options={}] - Additional options for the fetch request
 * @returns {Promise<T>} - A promise that resolves with the fetched data
 */
```

##### `getTokensInWallet`

```typescript
/**
* Asynchronously retrieves tokens in the wallet using the provided IAgentRuntime.
* @param {IAgentRuntime} runtime - The IAgentRuntime instance to use.
* @returns {Promise<Item[]>} A Promise that resolves to an array of Item objects representing the tokens in the wallet.
*/
```

##### `getTokenFromWallet`

```typescript
/**
 * Asynchronously retrieves the address of a token from the wallet based on the provided token symbol.
 * 
 * @param {IAgentRuntime} runtime The agent runtime object.
 * @param {string} tokenSymbol The symbol of the token to retrieve the address for.
 * @returns {Promise<string | null>} The address of the token if found, or null if not found.
 */
```

##### `fetchPrices`

```typescript
/**
 * Asynchronously fetches the prices of Bitcoin (BTC), Ethereum (ETH), and StarkNet (STRK) tokens from the provider API.
 * If the prices are cached, returns the cached data. Otherwise, fetches and stores the prices in the cache.
 * 
 * @returns {Promise<Prices>} The object containing the prices of BTC, ETH, and STRK tokens in USD.
 */
```

##### `calculateBuyAmounts`

```typescript
/**
 * Asynchronously calculates the buy amounts for different liquidity impact levels.
 * 
 * @returns {Promise<CalculatedBuyAmounts>} Promise that resolves to an object with buy amounts for each impact level (none, low, medium, high).
 */
```

##### `fetchTokenSecurity`

```typescript
/**
 * Fetches token security data asynchronously.
 * 
 * @returns {Promise<TokenSecurityData>} Promise resolving to TokenSecurityData object.
 */
```

##### `fetchTokenTradeData`

```typescript
/**
 * Fetches token trade data from the specified API endpoint.
 *
 * @returns {Promise<TokenInfo>} A promise that resolves to the fetched token trade data.
 */
```

##### `fetchDexScreenerData`

```typescript
/**
 * Asynchronously fetches DexScreener data for a specified token address.
 *
 * @returns {Promise<DexScreenerData>} The DexScreener data retrieved.
 */
```

##### `searchDexScreenerData`

```typescript
/**
 * Asynchronously fetches DexScreener data for a given symbol and returns the pair with the highest liquidity and market cap.
 * If the data is already cached, it retrieves it from the cache.
 * @param {string} symbol - The symbol to search for in DexScreener.
 * @returns {Promise<DexScreenerPair|null>} The pair with the highest liquidity and market cap, or null if no data is available.
 */
```

##### `getHighestLiquidityPair`

```typescript
/**
 * Retrieves the pair with the highest liquidity from the provided DexScreenerData object.
 * 
 * @param {DexScreenerData} dexData - The DexScreenerData object containing pairs to be searched.
 * @returns {DexScreenerPair | null} The pair with the highest liquidity, or null if no pairs are available.
 */
```

##### `analyzeHolderDistribution`

```typescript
/**
 * Analyzes the distribution of the holder based on the provided trade data.
 * 
 * @param {TokenInfo} _tradeData - The token information to analyze.
 * @returns {Promise<string>} The distribution status: "increasing", "decreasing", or "stable".
 */
```

##### `fetchHolderList`

```typescript
/**
 * Asynchronously fetches the list of holders for a specific token address.
 * If the data is cached, it returns the cached data. Otherwise, it makes a POST request to Helius API to retrieve the holders data.
 * The fetched data is processed to calculate the total balance for each unique holder.
 * The result is then cached using the provided cache key.
 * 
 * @returns {Promise<HolderData[]>} A promise that resolves with an array of HolderData objects, each containing the address and balance of a unique holder.
 */
```

##### `filterHighValueHolders`

```typescript
/**
 * Filters out high value holders based on the provided token information.
 *
 * @param {TokenInfo} tradeData - The token information to be used for filtering.
 * @returns {Promise<Array<{ holderAddress: string; balanceUsd: string }>>} The array of high value holders with their address and balance in USD.
 */
```

##### `checkRecentTrades`

```typescript
/**
 * Check if the given volume of recent trades in USD is greater than 0.
 * 
 * @param {bigint} volume24hUsd - The volume of recent trades in USD.
 * @returns {Promise<boolean>} - A Promise that resolves to true if volume24hUsd is greater than 0, 
 * false otherwise.
 */
```

##### `countHighSupplyHolders`

```typescript
/**
 * Counts the number of high supply holders for a given token security data.
 * 
 * @param {TokenSecurityData} securityData - The security data of the token.
 * @returns {Promise<number>} - The number of high supply holders.
 */
```

##### `getProcessedTokenData`

```typescript
/**
  * Asynchronously retrieves and processes various data related to the token.
  * 
  * @returns {Promise<ProcessedTokenData>} The processed token data including security data, trade data, holder distribution trend, high value holders, recent trades, high supply holders count, DexScreener data, and listing status.
  * @throws {Error} If there is an error while processing the token data.
  */
```

##### `shouldTradeToken`

```typescript
/**
 * Asynchronously determines whether the token should be traded based on various metrics.
 * @returns A Promise that resolves to a boolean indicating if the token should be traded.
 * @throws Error if there is an issue processing the token data.
 */
```

##### `formatTokenData`

```typescript
/**
 * Formats the token data into a structured string for display.
 * @param {ProcessedTokenData} data - The processed token data to format.
 * @returns {string} The formatted token data string.
 */
```

##### `getFormattedTokenReport`

```typescript
/**
* Asynchronously generates a formatted token report by first retrieving processed token data and then formatting it.
* @returns {Promise<string>} The formatted token report.
*/
```
### File: `providers/trustScoreProvider.ts`
#### Classes

##### `TrustScoreManager`

```typescript
/**
 * A class for managing trust scores.
 * @class
 */
```

#### Interfaces

##### `TradeData`

```typescript
/**
 * Interface representing Trade Data.
 * @typedef {Object} TradeData
 * @property {number} buy_amount - The amount to buy.
 * @property {boolean} is_simulation - Indicates if the trade is a simulation.
 */
```

##### `sellDetails`

```typescript
/**
 * Interface for sell details
 * @property {number} sell_amount - The amount of sell
 * @property {string | null} sell_recommender_id - The ID of the sell recommender, or null if none
 */
```

##### `_RecommendationGroup`

```typescript
/**
 * Interface representing a recommendation group.
 * @property {any} recommendation - The recommendation object.
 * @property {number} trustScore - The trust score associated with the recommendation.
 */
```

##### `RecommenderData`

```typescript
/**
 * Interface representing the data for a recommender.
 * @typedef {Object} RecommenderData
 * @property {string} recommenderId - The identifier of the recommender.
 * @property {number} trustScore - The trust score of the recommender.
 * @property {number} riskScore - The risk score of the recommender.
 * @property {number} consistencyScore - The consistency score of the recommender.
 * @property {RecommenderMetrics} recommenderMetrics - The metrics associated with the recommender.
 */
```

##### `TokenRecommendationSummary`

```typescript
/**
 * Represents a summary of recommendations for a specific token.
 * @typedef {Object} TokenRecommendationSummary
 * @property {string} tokenAddress - The address of the token.
 * @property {number} averageTrustScore - The average trust score for the token.
 * @property {number} averageRiskScore - The average risk score for the token.
 * @property {number} averageConsistencyScore - The average consistency score for the token.
 * @property {RecommenderData[]} recommenders - An array of RecommenderData objects containing information about recommenders.
 */
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

##### `calculateTrustScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `calculateOverallRiskScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `calculateRiskScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `calculateConsistencyScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `suspiciousVolume`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `sustainedGrowth`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `isRapidDump`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `checkTrustScore`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `createTradePerformance`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `delay`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `createTradeInBe`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `updateSellDetails`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `getRecommendations`

```typescript
*
     * Generates and saves trust score based on processed token data and user recommendations.
     * @param tokenAddress The address of the token to analyze.
     * @param recommenderId The UUID of the recommender.
     * @returns An object containing TokenPerformance and RecommenderMetrics.
```

##### `constructor`

```typescript
/**
 * Constructor for initializing a new instance of this class.
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {TokenProvider} tokenProvider - The token provider for authentication.
 * @param {TrustScoreDatabase} trustScoreDb - The database for trust scores.
 */
```

##### `getRecommenderBalance`

```typescript
/**
 * Asynchronously retrieves the balance of a recommender's wallet.
 *
 * @param {string} recommenderWallet - The wallet address of the recommender.
 * @returns {Promise<number>} The balance of the recommender's wallet as a number.
 */
```

##### `generateTrustScore`

```typescript
/**
 * Generates trust score for a recommender based on token performance and recommender metrics.
 * 
 * @param {string} tokenAddress - The address of the token to generate trust score for.
 * @param {string} recommenderId - The ID of the recommender.
 * @param {string} recommenderWallet - The wallet address of the recommender.
 * @returns {Promise<{
 *   tokenPerformance: TokenPerformance;
 *   recommenderMetrics: RecommenderMetrics;
 * }> } Object containing token performance and recommender metrics.
 */
```
### File: `utils/ERC20Token.ts`
#### Classes

##### `ERC20Token`

```typescript
/**
 * Class representing an ERC20 Token.
 */
```

#### Types

##### `ApproveCall`

```typescript
/**
 * Type representing an approve call on a smart contract.
 * @typedef {object} ApproveCall
 * @property {string} contractAddress - The address of the smart contract.
 * @property {"approve"} entrypoint - The specific entrypoint called on the contract.
 * @property {Calldata} calldata - The data associated with the call.
 */
```

##### `TransferCall`

```typescript
/**
 * Type representing a transfer call to a contract.
 * @typedef {Object} TransferCall
 * @property {string} contractAddress - The address of the contract
 * @property {"transfer"} entrypoint - The function entrypoint, always "transfer"
 * @property {Calldata} calldata - The data to be sent as part of the call
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for initializing a new instance of the class.
 * 
 * @param {string} token - The ERC-20 token contract address or name.
 * @param {ProviderInterface | AccountInterface} [providerOrAccount] - The provider or account.
 */
```

##### `address`

```typescript
/**
 * Returns the address of the contract.
 */
```

##### `balanceOf`

```typescript
/**
 * Retrieve the balance of a specific account.
 * @param {string} account - The account address to retrieve the balance for.
 * @returns {Promise<bigint>} The balance of the specified account.
 */
```

##### `decimals`

```typescript
/**
 * Get the decimals of the token by calling the "decimals" function on the contract.
 * @returns {Promise<bigint>} The number of decimal places for the token.
 */
```

##### `approveCall`

```typescript
/**
 * Returns an object representing an 'approve' call request.
 *
 * @param {string} spender - The address of the account or contract allowed to spend the tokens.
 * @param {bigint} amount - The amount of tokens that the spender is allowed to spend.
 * @returns {ApproveCall} An object with contractAddress, entrypoint, and calldata properties representing the approve call request.
 */
```

##### `transferCall`

```typescript
/**
 * Transfers a specified amount of tokens to a recipient.
 * @param {string} recipient - The address of the recipient.
 * @param {bigint} amount - The amount of tokens to transfer.
 * @returns {TransferCall} Information about the transfer call.
 */
```
### File: `utils/cache.ts`
#### Classes

##### `Cache`

```typescript
/**
 * Class representing a Cache with both in-memory and file-based caching functionalities.
 * @class Cache
 */
```

#### Methods

##### `constructor`

```typescript
/**
 * Constructor for creating a new instance of CacheManager.
 * Initializes a NodeCache with a standard time-to-live of 5 minutes.
 * Determines the appropriate cache directory path based on the presence of 'eliza' folder in the current filepath.
 * If 'eliza' folder is found, the cache directory path is set relative to 'eliza', otherwise it is set relative to the current directory.
 * If the cache directory does not exist, it is created synchronously using fs.mkdirSync.
 */
```

##### `readCacheFromFile`

```typescript
/**
 * Reads and retrieves data from a cache file based on the provided cacheKey.
 * 
 * @template T - The type of data expected to be retrieved from the cache file.
 * @param {string} cacheKey - The key used to identify the cache file to read from.
 * @returns {T | null} - The data retrieved from the cache file if found and valid, or null if the cache file doesn't exist or is corrupted.
 */
```

##### `writeCacheToFile`

```typescript
/**
 * Writes the provided data to a JSON file in the cache directory.
 * @template T
 * @param {string} cacheKey - The key to identify the cache file.
 * @param {T} data - The data to be stored in the cache file.
 * @returns {void}
 */
```

##### `get`

```typescript
/**
 * Retrieves a value from the cache using the specified cache key.
 * @template T
 * @param {string} cacheKey - The key for retrieving the value from the cache.
 * @returns {T | undefined} The value stored in the cache for the specified key, or undefined if not found.
 */
```

##### `set`

```typescript
/**
 * Set the data to the cache with the specified cache key.
 * 
 * @param {string} cacheKey - The key used to cache the data.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
```

##### `getCachedData`

```typescript
/**
 * Retrieves data from the cache using the provided cache key.
 * 
 * @template T - The type of the data to retrieve
 * @param cacheKey - The key to use when retrieving data from the cache
 * @returns The cached data if found, or null if the data is not found in either in-memory or file-based cache
 */
```

##### `setCachedData`

```typescript
/**
 * Set the data in the in-memory cache and write it to file-based cache.
 * 
 * @param {string} cacheKey - The key to use for caching the data.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
```
### File: `actions/subdomain.ts`
#### Interfaces

##### `SubdomainCreationContent`

```typescript
/**
 * Interface representing the content needed for creating a subdomain.
 * @interface
 * @extends Content
 * @property {string} recipient - The recipient of the subdomain creation content.
 * @property {string} subdomain - The subdomain to be created.
 */
```

#### Functions

##### `isSubdomainCreation`

```typescript
/**
 * Checks if the provided content is valid for subdomain creation.
 * @param {SubdomainCreationContent} content - The subdomain creation content to validate.
 * @returns {boolean} Returns true if the content is valid for subdomain creation, false otherwise.
 */
```
### File: `actions/swap.ts`
#### Interfaces

##### `SwapContent`

```typescript
/**
 * Interface representing the details of content to be swapped.
 * @typedef {object} SwapContent
 * @property {string} sellTokenAddress - The address of the token to be sold.
 * @property {string} buyTokenAddress - The address of the token to be bought.
 * @property {string} sellAmount - The amount of the token to be sold.
 */
```

#### Functions

##### `isSwapContent`

```typescript
/**
 * Checks if the input object is a valid SwapContent object.
 * @param {SwapContent} content - The object to validate
 * @returns {boolean} True if the object is a valid SwapContent, false otherwise
 */
```
### File: `actions/takeOrder.ts`
#### Interfaces

##### `Order`

```typescript
/**
 * Represents an order made by a user.
 * @typedef {Object} Order
 * @property {string} userId - The user ID making the order.
 * @property {string} ticker - The ticker symbol of the asset being traded.
 * @property {string} contractAddress - The contract address of the asset being traded.
 * @property {string} timestamp - The timestamp of the order.
 * @property {number} buyAmount - The amount to be bought in the order.
 * @property {number} price - The price at which the asset is being traded.
 */
```
### File: `actions/transfer.ts`
#### Interfaces

##### `TransferContent`

```typescript
/**
 * Interface representing the transfer content.
 * Extends Content interface.
 * @property {string} tokenAddress - The address of the token.
 * @property {string} [recipient] - The recipient's address.
 * @property {string} [starkName] - The recipient's Stark name.
 * @property {string|number} amount - The amount to transfer (can be string or number).
 */
```

#### Functions

##### `isTransferContent`

```typescript
/**
 * Checks if the provided content is a valid TransferContent object.
 * @param {TransferContent} content - The content to be validated
 * @returns {boolean} Returns true if the content is a valid TransferContent object, otherwise false
 */
```
### File: `actions/unruggable.ts`
#### Interfaces

##### `DeployTokenContent`

```typescript
/**
 * Interface for the content of a deployment token.
 * @typedef {Object} DeployTokenContent
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} owner - The owner of the token.
 * @property {string} initialSupply - The initial supply of the token.
 */
```

#### Functions

##### `isDeployTokenContent`

```typescript
/**
 * Check if the provided object meets the criteria for a DeployTokenContent.
 * @param {DeployTokenContent} content - The content to be checked.
 * @returns {boolean} Returns true if the content is valid, otherwise false.
 */
```
### File: `providers/utils.ts`
#### Interfaces

##### `TokenMetrics`

```typescript
/**
 * Interface representing token metrics.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total supply.
 * @property {number} ownerPercentage - The percentage owned by the owner.
 * @property {number} creatorPercentage - The percentage owned by the creator.
 * @property {number} top10HolderPercent - The percentage owned by the top 10 holders.
 * @property {number} priceChange24hPercent - The percentage price change in the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage price change in the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets in the last 24 hours.
 * @property {bigint} volume24hUsd - The trading volume in USD in the last 24 hours.
 */
```

##### `TradingThresholds`

```typescript
/**
 * Interface representing trading thresholds for a token.
 * @typedef {Object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - Threshold for 24h trading volume in USD
 * @property {number} [priceChange24hPercentThreshold] - Threshold for 24h price change percentage
 * @property {number} [priceChange12hPercentThreshold] - Threshold for 12h price change percentage
 * @property {number} [top10HolderPercentThreshold] - Threshold for percentage of top 10 holders
 * @property {number} [uniqueWallet24hThreshold] - Threshold for unique wallets in past 24 hours
 * @property {number} [minimumLiquidityUsd] - Minimum liquidity threshold in USD
 * @property {number} [minimumMarketCapUsd] - Minimum market cap threshold in USD
 */
```

##### `HolderAnalysisParams`

```typescript
/**
 * Interface for defining parameters for analyzing holders.
 * @property {HolderData[]} holders - Array of holder data.
 * @property {string} ownerBalance - The balance of the owner.
 * @property {string} creatorBalance - The balance of the creator.
 * @property {number} [thresholdPercentage] - Optional threshold percentage.
 */
```

##### `HolderAnalysisResult`

```typescript
/**
 * Interface representing the result of an analysis of holders.
 * @typedef {Object} HolderAnalysisResult
 * @property {number} count - The total count of holders.
 * @property {Array} holders - The array of holders with their address and percentage.
 * @property {string} holders[].address - The address of the holder.
 * @property {number} holders[].percentage - The percentage of tokens held by the holder.
 * @property {bigint} totalSupply - The total supply of tokens.
 */
```

#### Functions

##### `evaluateTokenTrading`

```typescript
/**
 * Evaluates if a token should be traded based on the provided metrics and thresholds.
 *
 * @param {TokenMetrics} metrics - The metrics of the token to be evaluated.
 * @param {TradingThresholds} [thresholds={}] - The thresholds for various trading indicators.
 * @returns {{ shouldTrade: boolean, reasons: string[] }} An object containing whether the token should be traded and the reasons for the evaluation.
 */
```

##### `analyzeHighSupplyHolders`

```typescript
/**
 * Analyzes the high supply holders based on the provided parameters.
 * 
 * @param {HolderAnalysisParams} params - The parameters for analyzing high supply holders.
 * @returns {HolderAnalysisResult} The analysis result including the count of high supply holders, list of high supply holders, and the total supply.
 */
```
### File: `types/token.ts`
#### Interfaces

##### `QuoteRequest`

```typescript
/**
 * Interface for defining a quote request.
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint} [sellAmount] - The amount of tokens being sold.
 * @property {bigint} [buyAmount] - The amount of tokens being bought.
 * @property {string} [takerAddress] - The address which will fill the quote.
 * @property {number} [size] - The maximum number of returned quotes.
 * @property {string[]} [excludeSources] - The sources that the user wants to exclude.
 * @property {bigint} [integratorFees] - Fee amount in bps, where 30 is 0.3%.
 * @property {string} [integratorFeeRecipient] - Required when integratorFees is defined, the address of the fee collector.
 * @property {string} [integratorName] - The name of the application making the request.
 */
```

##### `Quote`

```typescript
/**
 * Interface representing a Quote object containing information about a quote for a token swap.
 * @typedef {Object} Quote
 * @property {string} quoteId - The unique id of the quote.
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {bigint} sellAmount - The amount of token being sold.
 * @property {number} sellAmountInUsd - The amount of token being sold in USD.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint} buyAmount - The amount of token being bought.
 * @property {number} buyAmountInUsd - The amount of token being bought in USD.
 * @property {number} [blockNumber] - The block number related to the quote.
 * @property {string} chainId - The chain id of the quote.
 * @property {number} [expiry] - The Unix timestamp when the quote expires in seconds.
 * @property {Route[]} routes - An array of Route objects representing the route for the quote.
 * @property {bigint} gasFees - The estimated amount of gas fees in ETH.
 * @property {number} gasFeesInUsd - The estimated amount of gas fees in USD.
 * @property {bigint} avnuFees - The actual fees taken by AVNU.
 * @property {number} avnuFeesInUsd - The actual fees taken by AVNU in USD.
 * @property {bigint} avnuFeesBps - The fees in bps taken by AVNU.
 * @property {bigint} integratorFees - The actual fees taken by the integrator.
 * @property {number} integratorFeesInUsd - The actual fees taken by the integrator in USD.
 * @property {bigint} integratorFeesBps - The fees in bps taken by the integrator.
 * @property {number} priceRatioUsd - The price ratio in USD and in bps.
 * @property {number} [sellTokenPriceInUsd] - The sell token price in USD.
 * @property {number} [buyTokenPriceInUsd] - The buy token price in USD.
 * @property {Gasless} gasless - An object containing information about gasless transactions.
 */
```

##### `Route`

```typescript
/**
 * Interface for defining a route containing information about the source, address, percentage distribution, and token addresses.
 * @typedef {Object} Route
 * @property {string} name - The name of the source (e.g. 10kSwap)
 * @property {string} address - The address of the source
 * @property {number} percent - The percentage distribution of the sellToken (1 representing 100%)
 * @property {string} sellTokenAddress - The address of the sell token
 * @property {string} buyTokenAddress - The address of the buy token
 * @property {Route[]} routes - An array of nested routes
 */
```

##### `Gasless`

```typescript
/**
 * Interface representing gasless transaction information.
 * @property {boolean} active - Indicates if gasless transactions are active.
 * @property {Object[]} gasTokenPrices - Array of gas token prices.
 * @property {string} gasTokenPrices.tokenAddress - The address of the gas token.
 * @property {number} gasTokenPrices.gasFeesInUsd - The gas fees in USD.
 * @property {bigint} gasTokenPrices.gasFeesInGasToken - The gas fees in gas token.
 */
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
 * @property {Object} market - Information about the market of the token.
 * @property {number} currentPrice - The current price of the token.
 * @property {number} marketCap - The market capitalization of the token.
 * @property {number} fullyDilutedValuation - The fully diluted valuation of the token.
 * @property {number} starknetTvl - The Starknet Total Value Locked of the token.
 * @property {number} priceChange1h - The price change in the last 1 hour.
 * @property {number} priceChangePercentage1h - The price change percentage in the last 1 hour.
 * @property {number} priceChange24h - The price change in the last 24 hours.
 * @property {number} priceChangePercentage24h - The price change percentage in the last 24 hours.
 * @property {number} priceChange7d - The price change in the last 7 days.
 * @property {number} priceChangePercentage7d - The price change percentage in the last 7 days.
 * @property {number} marketCapChange24h - The market capitalization change in the last 24 hours.
 * @property {number} marketCapChangePercentage24h - The market capitalization change percentage in the last 24 hours.
 * @property {number} starknetVolume24h - The Starknet volume in the last 24 hours.
 * @property {number} starknetTradingVolume24h - The Starknet trading volume in the last 24 hours.
 * @property {string[]} tags - Array of tags related to the token.
 */
```
### File: `types/trustDB.ts`
#### Interfaces

##### `TokenSecurityData`

```typescript
/**
 * Interface representing the security data of a token.
 * @interface
 * @property {string} ownerBalance - The balance of the owner of the token.
 * @property {string} creatorBalance - The balance of the creator of the token.
 * @property {number} ownerPercentage - The percentage of ownership of the owner.
 * @property {number} creatorPercentage - The percentage of ownership of the creator.
 * @property {string} top10HolderBalance - The total balance of the top 10 holders of the token.
 * @property {number} top10HolderPercent - The percentage of ownership of the top 10 holders.
 */
```

##### `TokenTradeData`

```typescript
/**
 * Interface representing Token Trade Data.
 * @typedef {Object} TokenTradeData
 * @property {string} address - The address of the token.
 * @property {number} holder - The number of holders of the token.
 * @property {number} market - The market number of the token.
 * @property {number} last_trade_unix_time - The unix time of the last trade.
 * @property {string} last_trade_human_time - The human-readable time of the last trade.
 * @property {number} price - The price of the token.
 * @property {number} history_30m_price - The price history of the last 30 minutes.
 * @property {number} price_change_30m_percent - The price change percentage over the last 30 minutes.
 * @property {number} history_1h_price - The price history of the last 1 hour.
 * @property {number} price_change_1h_percent - The price change percentage over the last 1 hour.
 * @property {number} history_2h_price - The price history of the last 2 hours.
 * @property {number} price_change_2h_percent - The price change percentage over the last 2 hours.
 * @property {number} history_4h_price - The price history of the last 4 hours.
 * @property {number} price_change_4h_percent - The price change percentage over the last 4 hours.
 * @property {number} history_6h_price - The price history of the last 6 hours.
 * @property {number} price_change_6h_percent - The price change percentage over the last 6 hours.
 * @property {number} history_8h_price - The price history of the last 8 hours.
 * @property {number} price_change_8h_percent - The price change percentage over the last 8 hours.
 * @property {number} history_12h_price - The price history of the last 12 hours.
 * @property {number} price_change_12h_percent - The price change percentage over the last 12 hours.
 * @property {number} history_24h_price - The price history of the last 24 hours.
 * @property {number} price_change_24h_percent - The price change percentage over the last 24 hours.
 * @property {number} unique_wallet_30m - The unique wallets in the last 30 minutes.
 * @property {number} unique_wallet_history_30m - The history of unique wallets in the last 30 minutes.
 * @property {number} unique_wallet_30m_change_percent - The percentage change of unique wallets in the last 30 minutes.
 * @property {number} unique_wallet_1h - The unique wallets in the last 1 hour.
 * @property {number} unique_wallet_history_1h - The history of unique wallets in the last 1 hour.
 * @property {number} unique_wallet_1h_change_percent - The percentage change of unique wallets in the last 1 hour.
 * @property {number} unique_wallet_2h - The unique wallets in the last 2 hours.
 * @property {number} unique_wallet_history_2h - The history of unique wallets in the last 2 hours.
 * @property {number} unique_wallet_2h_change_percent - The percentage change of unique wallets in the last 2 hours.
 * @property {number} unique_wallet_4h - The unique wallets in the last 4 hours.
 * @property {number} unique_wallet_history_4h - The history of unique wallets in the last 4 hours.
 * @property {number} unique_wallet_4h_change_percent - The percentage change of unique wallets in the last 4 hours.
 * @property {number} unique_wallet_8h - The unique wallets in the last 8 hours.
 * @property {number|null} unique_wallet_history_8h - The history of unique wallets in the last 8 hours.
 * @property {number|null} unique_wallet_8h_change_percent - The percentage change of unique wallets in the last 8 hours.
 * @property {number} unique_wallet_24h - The unique wallets in the last 24 hours.
 * @property {number|null} unique_wallet_history_24h - The history of unique wallets in the last 24 hours.
 * @property {number|null} unique_wallet_24h_change_percent - The percentage change of unique wallets in the last 24 hours.
 * @property {number} trade_30m - The trades in the last 30 minutes.
 * @property {number} trade_history_30m - The history of trades in the last 30 minutes.
 * @property {number} trade_30m_change_percent - The percentage change of trades in the last 30 minutes.
 * @property {number} sell_30m - The sells in the last 30 minutes.
 * @property {number} sell_history_30m - The history of sells in the last 30 minutes.
 * @property {number} sell_30m_change_percent - The percentage change of sells in the last 30 minutes.
 * @property {number} buy_30m - The buys in the last 30 minutes.
 * @property {number} buy_history_30m - The history of buys in the last 30 minutes.
 * @property {number} buy_30m_change_percent - The percentage change of buys in the last 30 minutes.
 * ...
 */
```

##### `HolderData`

```typescript
/**
 * Represents data for a holder, including address and balance.
 * @interface HolderData
 * @property {string} address - The address of the holder.
 * @property {string} balance - The balance of the holder.
 */
```

##### `ProcessedTokenData`

```typescript
/**
 * Represents processed token data including security information, trade data, holder distribution trend, high value holders, recent trades,
 * high supply holders count, dex screener data, and flags indicating if the token is listed on DexScreener and if it requires payment for that listing.
 * 
 * @typedef {Object} ProcessedTokenData
 * @property {TokenSecurityData} security - The security data of the token.
 * @property {TokenInfo} tradeData - The trade data of the token.
 * @property {string} holderDistributionTrend - The trend of holder distribution, can be 'increasing', 'decreasing', or 'stable'.
 * @property {Array<{holderAddress: string, balanceUsd: string}>} highValueHolders - Array of high value holders with their addresses and USD balance.
 * @property {boolean} recentTrades - Indicates if there have been recent trades with this token.
 * @property {number} highSupplyHoldersCount - The count of high supply holders.
 * @property {DexScreenerData} dexScreenerData - The data from DexScreener related to this token.
 * @property {boolean} isDexScreenerListed - Indicates if the token is listed on DexScreener.
 * @property {boolean} isDexScreenerPaid - Indicates if payment is required for listing on DexScreener.
 */
```

##### `DexScreenerPair`

```typescript
/**
 * Interface for DexScreenerPair object representing pair details.
 * @typedef {Object} DexScreenerPair
 * @property {string} chainId - The chain identifier.
 * @property {string} dexId - The DEX identifier.
 * @property {string} url - The URL of the pair.
 * @property {string} pairAddress - The address of the pair.
 * @property {Object} baseToken - The base token details.
 * @property {string} baseToken.address - The address of the base token.
 * @property {string} baseToken.name - The name of the base token.
 * @property {string} baseToken.symbol - The symbol of the base token.
 * @property {Object} quoteToken - The quote token details.
 * @property {string} quoteToken.address - The address of the quote token.
 * @property {string} quoteToken.name - The name of the quote token.
 * @property {string} quoteToken.symbol - The symbol of the quote token.
 * @property {string} priceNative - The price in native currency.
 * @property {string} priceUsd - The price in USD.
 * @property {Object} txns - The transaction details.
 * @property {Object} txns.m5 - The transaction details for the past 5 minutes.
 * @property {number} txns.m5.buys - The number of buys in the past 5 minutes.
 * @property {number} txns.m5.sells - The number of sells in the past 5 minutes.
 * @property {Object} txns.h1 - The transaction details for the past 1 hour.
 * @property {number} txns.h1.buys - The number of buys in the past 1 hour.
 * @property {number} txns.h1.sells - The number of sells in the past 1 hour
 * @property {Object} txns.h6 - The transaction details for the past 6 hours.
 * @property {number} txns.h6.buys - The number of buys in the past 6 hours.
 * @property {number} txns.h6.sells - The number of sells in the past 6 hours.
 * @property {Object} txns.h24 - The transaction details for the past 24 hours.
 * @property {number} txns.h24.buys - The number of buys in the past 24 hours.
 * @property {number} txns.h24.sells - The number of sells in the past 24 hours.
 * @property {Object} volume - The volume details.
 * @property {number} volume.h24 - The volume in the past 24 hours.
 * @property {number} volume.h6 - The volume in the past 6 hours.
 * @property {number} volume.h1 - The volume in the past 1 hour.
 * @property {number} volume.m5 - The volume in the past 5 minutes.
 * @property {Object} priceChange - The price change details.
 * @property {number} priceChange.m5 - The price change in the past 5 minutes.
 * @property {number} priceChange.h1 - The price change in the past 1 hour.
 * @property {number} priceChange.h6 - The price change in the past 6 hours.
 * @property {number} priceChange.h24 - The price change in the past 24 hours.
 * @property {Object} liquidity - The liquidity details.
 * @property {number} liquidity.usd - The liquidity in USD.
 * @property {number} liquidity.base - The liquidity in base token.
 * @property {number} liquidity.quote - The liquidity in quote token.
 * @property {number} fdv - The fully diluted valuation.
 * @property {number} marketCap - The market capitalization.
 * @property {number} pairCreatedAt - The timestamp when pair was created.
 * @property {Object} info - The additional information.
 * @property {string} info.imageUrl - The URL of the image.
 * @property {Object[]} info.websites - The array of website details.
 * @property {string} info.websites.label - The label of the website.
 * @property {string} info.websites.url - The URL of the website.
 * @property {Object[]} info.socials - The array of social media details.
 * @property {string} info.socials.type - The type of social media.
 * @property {string} info.socials.url - The URL of the social media.
 * @property {Object} boosts - The boost details.
 * @property {number} boosts.active - The active boost value.
 */
```

##### `DexScreenerData`

```typescript
/**
 * Interface representing data returned by Dex Screener
 * @typedef {Object} DexScreenerData
 * @property {string} schemaVersion - The version of the schema
 * @property {DexScreenerPair[]} pairs - An array of DexScreenerPair objects
 */
```

##### `Prices`

```typescript
/**
 * Interface representing prices for different cryptocurrencies.
 * @typedef {Object} Prices
 * @property {Object} starknet - Price of Starknet in USD.
 * @property {string} starknet.usd - Price of Starknet in USD.
 * @property {Object} bitcoin - Price of Bitcoin in USD.
 * @property {string} bitcoin.usd - Price of Bitcoin in USD.
 * @property {Object} ethereum - Price of Ethereum in USD.
 * @property {string} ethereum.usd - Price of Ethereum in USD.
 */
```

##### `CalculatedBuyAmounts`

```typescript
/**
 * Interface representing the calculated buy amounts for different levels.
 *
 * @typedef {Object} CalculatedBuyAmounts
 * @property {number} none - The buy amount for none level (0).
 * @property {number} low - The buy amount for low level.
 * @property {number} medium - The buy amount for medium level.
 * @property {number} high - The buy amount for high level.
 */
```
### File: `utils/index.ts`
#### Interfaces

##### `ParseCurrencyAmountOptions`

```typescript
/**
 * Interface for specifying options when parsing currency amounts.
 * @typedef {Object} ParseCurrencyAmountOptions
 * @property {number} fixed - The number of decimal places to round the currency amount to.
 * @property {number} [significant] - The number of significant digits to include in the currency amount.
 */
```

#### Types

##### `RetryConfig`

```typescript
/**
 * Represents the configuration options for retrying an operation.
 * @typedef {object} RetryConfig
 * @property {number} [maxRetries] - The maximum number of retry attempts.
 * @property {number} [delay] - The initial delay in milliseconds between retry attempts.
 * @property {number} [maxDelay] - The maximum delay in milliseconds between retry attempts.
 * @property {function} [backoff] - A function that calculates the backoff delay based on the current retry count, delay, and maximum delay.
 */
```

#### Functions

##### `fetchWithRetry`

```typescript
/**
 * Fetches data from the specified URL with support for retrying in case of failures.
 * 
 * @template T
 * @param {string} url - The URL to fetch the data from.
 * @param {RequestInit} [options] - The options to include in the fetch request.
 * @param {RetryConfig} [config] - Configuration options for retries.
 * @param {number} [config.maxRetries=3] - The maximum number of retry attempts.
 * @param {number} [config.delay=1000] - The initial delay before the first retry attempt (in milliseconds).
 * @param {number} [config.maxDelay=10000] - The maximum delay between retry attempts (in milliseconds).
 * @param {(retryCount: number, baseDelay: number, maxDelay: number) => number} [config.backoff] - The backoff function that calculates the delay for each retry attempt.
 * @returns {Promise<T>} A promise that resolves with the data fetched from the URL.
 */
```
### File: `environment.ts`
#### Types

##### `StarknetConfig`

```typescript
/**
 * Represents the type of Starknet configuration as inferred from the starknetEnvSchema.
 */
```

#### Functions

##### `validateStarknetConfig`

```typescript
/**
 * Validates the Starknet configuration by checking for required settings and environment variables.
 * Returns the validated Starknet configuration object.
 * 
 * @param {IAgentRuntime} runtime - The Agent runtime object.
 * @returns {Promise<StarknetConfig>} - The validated Starknet configuration object.
 * @throws {Error} - If Starknet configuration validation fails, including specific error messages.
 */
```

## Development

### TODO Items
### Items
1. Parse and validate the JSON
   - Context: The todo is related to export default take_order.
   - Type: Bug

2. Replace with validate like other actions
   - Context: The todo is related to export default take_order.
   - Type: Bug

3. Implement this for Starknet.
   - Context: The todo is related to a function that includes validation of transfer content based on types, token addresses, recipients, and stark domain names.
   - Type: Enhancement

4. Compose context properly
   - Context: The todo is related to a function that generates transfer content and logs the transfer context, as well as checks for valid transfer content and specific properties such as token address, recipient address, amount, and stark name.
   - Type: Bug

### Troubleshooting
### Common Issues
1. Connection error
   - Cause: Internet connection issue or server problem.
   - Solution: Check your internet connection, refresh the page, or try again later.

2. Page not loading properly
   - Cause: Browser cache issue or website problem.
   - Solution: Clear your browser cache, reload the page, or try using a different browser.

### Debugging Tips
- Refresh the page to see if the issue persists.
- Check for any browser extensions that might be causing conflicts.
- Make sure your device is connected to the internet.

### FAQ
Q: How do I reset my password?
A: You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.

Q: Is my personal information secure on this platform?
A: Yes, we take security very seriously and use encryption methods to protect your data.

Q: What should I do if I encounter a bug or error on the site?
A: Please report the issue to our support team at support@website.com with details about the problem you are facing.