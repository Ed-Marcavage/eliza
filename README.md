# @elizaos/plugin-near Documentation

    ## Overview
    ### Purpose
The @elizaos/plugin-near plugin is designed to enhance the functionality of a Near Field Communication (NFC) enabled device by providing additional features and capabilities.

### Key Features
- Feature 1: Enables communication with NFC tags and devices, allowing for seamless data transfer and interaction.
- Feature 2: Provides support for reading and writing NFC data, making it easy to customize and personalize NFC-enabled devices.

    ## Installation
    ## Installation Instructions

1. **Add plugin to ElizaOS project**:
   - Add the following to your agent/package.json dependencies:
     ```json
     {
       "dependencies": {
         "@elizaos/plugin-near": "workspace:*"
       }
     }
     ```
   - CD into the agent/ directory
   - Run `pnpm install` to install the new dependency
   - Run `pnpm build` to build the project with the new plugin

2. **Import and use the plugin**:
   - Import the plugin using: `import { nearPlugin } from "@elizaos/plugin-near";`
   - Add it to the AgentRuntime plugins array

3. **Integration Example**:
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

4. **Verification steps**:
   - Ensure you see ["✓ Registering action: <plugin actions>"] in the console after integrating the plugin.

## Additional Notes:
- Dependencies needed for the plugin are listed, ensure they are installed.
- Peer dependencies are listed, ensure they are installed if required for your project.

    ## Configuration
    # Configuration Documentation

## Required Environment Variables and Their Purpose
1. `NEAR_ENV`: Used to set the NEAR environment.
2. `REACT_APP_REF_SDK_ENV`: Used to reference the SDK environment.
3. `NEAR_WALLET_SECRET_KEY`: Secret key for the NEAR wallet.
4. `NEAR_WALLET_PUBLIC_KEY`: Public key for the NEAR wallet.
5. `NEAR_ADDRESS`: NEAR address for the runtime or process environment.
6. `SLIPPAGE`: Slippage setting for runtime or process environment.
7. `RPC_URL`: RPC URL setting for runtime or process environment.
8. `NEAR_NETWORK`: Network ID for NEAR or default to "testnet".

## Example .env File
```plaintext
NEAR_ENV=dev
REACT_APP_REF_SDK_ENV=production
NEAR_WALLET_SECRET_KEY=mysecretkey123
NEAR_WALLET_PUBLIC_KEY=mypublickey123
NEAR_ADDRESS=example.near
SLIPPAGE=1
RPC_URL=http://example.com/near
NEAR_NETWORK=mainnet
```

To configure your application, update the values of these environment variables in the `.env` file. Make sure to add `.env` to your `.gitignore` file to prevent it from being committed to the repository.

    ## Features

    ### Actions
    Perform a token swap using Ref Finance.
Similes/Aliases:
- SWAP_TOKENS_NEAR
- TOKEN_SWAP_NEAR
- TRADE_TOKENS_NEAR
- EXCHANGE_TOKENS_NEAR

The handler function of this action initializes the Ref SDK with the testnet environment, composes the state from the message, obtains wallet information, generates the swap context, and extracts the input token ID, output token ID, and amount for the requested token swap. If any of these parameters are missing, the action will notify the user and skip the swap. It then retrieves the NEAR account credentials, creates a key store, connects to NEAR, executes the token swap using the `swapToken` function, and signs and sends the transactions.

Usage Examples:
1. 
   - User1 provides input token ID as "wrap.testnet", output token ID as "ref.fakes.testnet", and amount as "1.0".
   - User2 initiates the action with the statement "Swapping 1.0 NEAR for REF...".
   - User2 receives a response indicating "Swap completed successfully! Transaction hash: ..."

Interaction Examples:
- {{user1}}: "I want to swap 1.0 WRAP tokens for REF tokens."
- {{user2}}: "Sure, initiating the swap now..."
- {{user2}}: "Swap completed successfully! Transaction hash: ..."

1. This action named "SEND_NEAR" allows transferring NEAR tokens to another account.

2. Similes/Aliases: "TRANSFER_NEAR", "SEND_TOKENS", "TRANSFER_TOKENS", "PAY_NEAR"

3. The handler function of this action initializes or updates the state, composes a transfer context using a predefined template, generates transfer content based on the context, validates the transfer content, and finally executes the NEAR transfer to the specified recipient with the specified amount. If the transfer is successful, it provides a success message with the transaction details. If there is an error during the transfer process, it logs the error and informs the user.

4. Usage Examples:
   - Natural Language Example: "Send 1.5 NEAR to bob.testnet."
   - Interaction Example between {{user1}} and {{user2}}:
     - {{user1}}: "Send 1.5 NEAR to bob.testnet."
     - {{user2}}: "I'll send 1.5 NEAR now..."
     - {{user2}}: "Successfully sent 1.5 NEAR to bob.testnet\nTransaction: ABC123XYZ"

    ### Providers
    ## WalletProvider

The `WalletProvider` class is used to fetch and format wallet information such as token balances and portfolio value based on the NEAR Protocol network. This provider requires the NEAR wallet credentials to be configured in the runtime settings.

### Constructor

#### walletProvider

- Type: Provider
- Description: A provider object that contains the `get()` method for fetching and formatting wallet information.

### Methods

#### get()

- Type: Asynchronous method
- Description: This method is responsible for fetching and formatting the wallet portfolio information. It retrieves the NEAR wallet address from the runtime settings, creates an instance of `WalletProvider`, and calls the `getFormattedPortfolio()` method to generate the portfolio report.
- Parameters:
  - `runtime`: IAgentRuntime - The interface for agent runtime that provides access to settings, state, and messaging.
  - `_message`: Memory - Not used in this method.
  - `_state`: State - Not used in this method.
- Returns:
  - Type: Promise<string | null>
  - Description: A promise that resolves to a formatted string containing the wallet information or null if an error occurs.

### Usage

To use the `WalletProvider` to get wallet information, the NEAR wallet address (NEAR_ADDRESS) must be configured in the runtime settings. Once configured, you can call the `get()` method on the `walletProvider` object to retrieve the formatted wallet portfolio information.



    ### Evaluators
    

    ## Usage Examples
    ### providers/wallet.ts

### Components
Classes:
- WalletProvider: WalletProvider class that implements Provider interface. Manages wallet functionality like fetching portfolio value, connecting to NEAR wallet, and formatting portfolio.

Methods:
- constructor: Constructor for creating a new instance of the class.
- get: Asynchronously get the portfolio data for the agent runtime.
- connect: Connects to NEAR blockchain using the provided runtime.
- fetchWithRetry: Asynchronously fetch data from the given URL with the specified options, and retry a defined number of times in case of failure.
- fetchPortfolioValue: Asynchronously fetch the current value of the portfolio.
- fetchNearPrice: Fetches the NEAR price from the Coingecko API.
- formatPortfolio: Formats the wallet portfolio into a human-readable string format.
- getFormattedPortfolio: Retrieves the formatted portfolio based on the given runtime.

Interfaces:
- NearToken: Interface for a Near Protocol token with specific properties.
- WalletPortfolio: Interface representing a wallet portfolio.

### Common Use Cases
1. Fetching Portfolio Data for Agent Runtime:
```typescript
const runtime: IAgentRuntime = new AgentRuntime();
const walletProvider = new WalletProvider("example-account-id");
const portfolioData = await walletProvider.get(runtime, new Memory(), new State());
```

2. Connecting to NEAR Blockchain:
```typescript
const runtime: IAgentRuntime = new AgentRuntime();
const walletProvider = new WalletProvider("example-account-id");
const nearAccount = await walletProvider.connect(runtime);
```

### Best Practices
- Ensure NEAR wallet credentials are properly configured before connecting.
- Handle errors gracefully and provide appropriate error messages for failed operations.

### actions/transfer.ts

### Components

Interfaces:

- TransferContent: 
/**
 * Interface representing the content of a transfer.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */

Functions:

- isTransferContent: 
/**
 * Checks if the given content is a TransferContent object.
 *
 * @param {IAgentRuntime} runtime - The runtime environment of the agent.
 * @param {*} content - The content to be checked.
 * @return {boolean} Returns true if the content is of type TransferContent, otherwise false.
 */

- transferNEAR: 
/**
 * Transfer NEAR cryptocurrency from one NEAR account to another.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR to transfer in NEAR tokens.
 * @returns {Promise<string>} - The transaction hash of the executed transfer.
 */

### Common Use Cases

1. Transfer NEAR from one account to another:

```typescript
const recipient = 'example.near';
const amount = '10';
const transferHash = await transferNEAR(runtime, recipient, amount);
console.log(`Transfer executed with hash: ${transferHash}`);
```

2. Check if a given content is a TransferContent object:

```typescript
const content = {
  recipient: 'example.near',
  amount: '10',
  tokenAddress: 'token.near'
};
const isTransfer = isTransferContent(runtime, content);
console.log(`Is content a transfer? ${isTransfer}`);
```

### Best Practices

- Ensure to provide the recipient's NEAR account ID and the amount to be transferred when using the transferNEAR function.
- Use the isTransferContent function to validate the content before performing any transfer actions.

### environment.ts

### Components

- Types: NearConfig
- Functions: getConfig, validateNearConfig

### Common Use Cases

1. Getting the configuration based on the specified environment:
```typescript
const config = getConfig('development');
console.log(config);
```

2. Validating NEAR configuration settings:
```typescript
const validatedConfig = await validateNearConfig(runtime);
console.log(validatedConfig);
```

### Best Practices

- Ensure to provide a valid environment when calling `getConfig` to retrieve the correct configuration.
- Always await the result of `validateNearConfig` to ensure the NEAR configuration object is properly validated before use.

### actions/swap.ts

### Components
Functions:

- checkStorageBalance: 
  - Asynchronously checks the storage balance of an account in a specific contract.
 
- swapToken: 
  - Function to swap tokens on a decentralized exchange.

### Common Use Cases
1. Check Storage Balance:
```typescript
const account = {...}; // Account object
const contractId = 'exampleContract';
const hasStorage = await checkStorageBalance(account, contractId);
console.log(hasStorage); // Output: true or false
```

2. Swap Tokens:
```typescript
const runtime = {...}; // Agent runtime object
const inputTokenId = 'tokenA';
const outputTokenId = 'tokenB';
const amount = '10';
const slippageTolerance = 0.01;
const swapTransactions = await swapToken(runtime, inputTokenId, outputTokenId, amount, slippageTolerance);
console.log(swapTransactions); // Output: Array of transaction objects
```

### Best Practices
- Ensure proper account and contract information is provided when using checkStorageBalance.
- Specify correct input parameters and slippage tolerance when using swapToken.

    ## API Reference
    ### providers/wallet.ts


## Classes

- WalletProvider: 
  - constructor(accountId: string)
  - get(runtime: IAgentRuntime, _message: Memory, _state?: State): Promise<string | null>
  - connect(runtime: IAgentRuntime): Promise<object>
  - fetchWithRetry(url: string, options: RequestInit = {}): Promise<any>
  - fetchPortfolioValue(runtime: IAgentRuntime): Promise<WalletPortfolio>
  - fetchNearPrice(): Promise<number>
  - formatPortfolio(runtime: IAgentRuntime, portfolio: WalletPortfolio): string
  - getFormattedPortfolio(runtime: IAgentRuntime): Promise<string>

## Interfaces

- NearToken: 
  - name: string
  - symbol: string
  - decimals: number
  - balance: string
  - uiAmount: string
  - priceUsd: string
  - valueUsd: string
  - valueNear?: string

- WalletPortfolio: 
  - totalUsd: string
  - totalNear?: string
  - tokens: Array<NearToken>

## Types

None

## Functions

None

### actions/transfer.ts

### Interfaces

#### TransferContent
/**
 * Interface representing the content of a transfer.
 * @interface TransferContent
 * @extends Content
 * @property {string} recipient - The recipient of the transfer.
 * @property {string | number} amount - The amount to transfer.
 * @property {string} [tokenAddress] - Optional token address for native NEAR transfers.
 */

### Functions

#### isTransferContent
/**
 * Checks if the given content is a TransferContent object.
 *
 * @param {IAgentRuntime} runtime - The runtime environment of the agent.
 * @param {*} content - The content to be checked.
 * @return {boolean} Returns true if the content is of type TransferContent, otherwise false.
 */

#### transferNEAR
/**
 * Transfer NEAR cryptocurrency from one NEAR account to another.
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {string} recipient - The NEAR account ID of the recipient.
 * @param {string} amount - The amount of NEAR to transfer in NEAR tokens.
 * @returns {Promise<string>} - The transaction hash of the executed transfer.
 */

### environment.ts

### Types

- NearConfig: 
  ```
  /**
   * Type definition for NearConfig based on the inferred type from nearEnvSchema.
   */
  ```

### Functions

- getConfig: 
  ```
  /**
   * Get the configuration based on the specified environment or default values.
   * 
   * @param {string | undefined | null} env - The environment to retrieve the configuration for. If not provided, 'ENV', 'process.env.NEAR_ENV', or 'process.env.REACT_APP_REF_SDK_ENV' will be used in that order.
   * @returns {Object} - The configuration object containing networkId, nodeUrl, walletUrl, WRAP_NEAR_CONTRACT_ID, REF_FI_CONTRACT_ID, REF_TOKEN_ID, indexerUrl, explorerUrl, and REF_DCL_SWAP_CONTRACT_ID based on the specified environment or default values.
   */
  ```

- validateNearConfig: 
  ```
  /**
   * Asynchronous function to validate NEAR configuration settings.
   * 
   * @param {IAgentRuntime} runtime - The agent runtime providing access to settings.
   * @returns {Promise<NearConfig>} The validated NEAR configuration object.
   */
  ```

### actions/swap.ts

### Functions

#### checkStorageBalance
/**
 * Asynchronously checks the storage balance of an account in a specific contract.
 * 
 * @param {any} account - The account object to check the storage balance for.
 * @param {string} contractId - The ID of the contract to check the storage balance in.
 * @returns {Promise<boolean>} - A promise that resolves to true if the storage balance is not empty, false otherwise.
 */

#### swapToken
/**
 * Function to swap tokens on a decentralized exchange.
 * 
 * @param {IAgentRuntime} runtime - The Agent runtime object.
 * @param {string} inputTokenId - The token ID of the input token.
 * @param {string} outputTokenId - The token ID of the output token.
 * @param {string} amount - The amount of tokens to swap.
 * @param {number} slippageTolerance - The allowed slippage tolerance for the swap (default is 0.01).
 * @returns {Promise<any>} - A promise that resolves to an array of transaction objects representing the swap transactions.
 */

    ## Development

    ### TODO Items
    ### Items
1. TODO: add functionality to support multiple networks
   - Context: async function swapToken(
    runtime: IAgentRuntime,
    inputTokenId: string,
    outputTokenId: string,
    amount: string,
    slippageTolerance: number = Number(
        runtime.getSetting("SLIPPAGE_TOLERANCE")
    ) || 0.01
): Promise<any> {
    - Type: feature
2. [Second TODO item]
   - Context: [context of the TODO]
   - Type: [bug/feature/enhancement]

    ### Troubleshooting
    ### Common Issues
1. Wallet not connecting
   - Cause: NEAR wallet credentials not configured.
   - Solution: Ensure NEAR wallet secret key and public key are configured in the runtime settings.

### Debugging Tips
- Check if NEAR wallet credentials are correctly set in the runtime settings.
- Verify the network configuration for NEAR blockchain connectivity.

### FAQ
Q: How do I fetch the current value of the wallet portfolio?
A: You can use the `fetchPortfolioValue` method provided in the `WalletProvider` class to fetch the current value of the wallet portfolio asynchronously. It returns a `WalletPortfolio` object representing the total value, tokens held, and prices.