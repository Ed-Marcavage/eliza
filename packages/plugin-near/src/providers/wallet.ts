import { IAgentRuntime, Memory, Provider, State } from "@elizaos/core";
import { KeyPair, keyStores, connect, Account, utils } from "near-api-js";
import BigNumber from "bignumber.js";
import { KeyPairString } from "near-api-js/lib/utils";
import NodeCache from "node-cache";

const PROVIDER_CONFIG = {
    networkId: process.env.NEAR_NETWORK || "testnet",
    nodeUrl:
        process.env.RPC_URL ||
        `https://rpc.${process.env.NEAR_NETWORK || "testnet"}.near.org`,
    walletUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.mynearwallet.com/`,
    helperUrl: `https://helper.${process.env.NEAR_NETWORK || "testnet"}.near.org`,
    explorerUrl: `https://${process.env.NEAR_NETWORK || "testnet"}.nearblocks.io`,
    MAX_RETRIES: 3,
    RETRY_DELAY: 2000,
    SLIPPAGE: process.env.SLIPPAGE ? parseInt(process.env.SLIPPAGE) : 1,
};

/**
 * Interface for representing a token on the NEAR blockchain.
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token in the user interface.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR (optional).
 */
export interface NearToken {
    name: string;
    symbol: string;
    decimals: number;
    balance: string;
    uiAmount: string;
    priceUsd: string;
    valueUsd: string;
    valueNear?: string;
}

/**
 * Interface representing a wallet portfolio.
 * @property {string} totalUsd - The total value in USD.
 * @property {string} [totalNear] - The total value in NEAR (optional).
 * @property {Array<NearToken>} tokens - An array of NearToken objects.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
 * Class representing a Wallet Provider that implements the Provider interface.
 * @implements {Provider}
 */
*/
export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Constructor for creating a new instance of the class.
 * @param {string} accountId - The unique identifier for the account.
 */
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Asynchronously retrieves a formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment of the agent.
 * @param {Memory} _message - The memory message received by the agent.
 * @param {State} [_state] - Optional state to be passed to the function.
 * @returns {Promise<string | null>} - A promise that resolves with the formatted portfolio string, or null if an error occurs.
 */
    async get(
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string | null> {
        try {
            return await this.getFormattedPortfolio(runtime);
        } catch (error) {
            console.error("Error in wallet provider:", error);
            return null;
        }
    }

/**
 * Connects the current instance to a NEAR wallet using the provided runtime.
/**
 * Represents a Near Protocol token.
 *
 * @typedef {object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The current balance of the token.
 * @property {string} uiAmount - The amount of the token for display in UI.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol currency.
 */
 * 
 * @param {IAgentRuntime} runtime - The runtime instance to use for retrieving settings.
 * @returns {Promise<Account>} - A Promise that resolves with the NEAR account object once connected.
 * @throws {Error} - If NEAR wallet credentials are not configured.
 */
    public async connect(runtime: IAgentRuntime) {
        if (this.account) return this.account;

        const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
        const publicKey = runtime.getSetting("NEAR_WALLET_PUBLIC_KEY");

/**
 * Interface representing a wallet portfolio.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total balance in USD.
 * @property {string} [totalNear] - The total balance in NEAR cryptocurrency (optional).
 * @property {Array<NearToken>} tokens - Array of NearToken objects representing the tokens held in the wallet.
 */
        if (!secretKey || !publicKey) {
            throw new Error("NEAR wallet credentials not configured");
        }

        // Create KeyPair from secret key
        const keyPair = KeyPair.fromString(secretKey as KeyPairString);
/**
 * Class representing a Wallet Provider.
 * @implements {Provider}
 */
 */

        // Set the key in the keystore
        await this.keyStore.setKey(
            PROVIDER_CONFIG.networkId,
/**
 * Constructor for creating an instance of the AccountCache class.
 * 
 * @param {string} accountId - The unique identifier for the account.
 */
            this.accountId,
            keyPair
        );

        const nearConnection = await connect({
/**
 * Asynchronously retrieves the formatted portfolio data using the provided agent runtime.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime for interacting with the underlying blockchain network
 * @param {Memory} _message - The memory object containing information related to the current agent state
 * @param {State} [_state] - Optional state object that can be provided for additional context
 * @returns {Promise<string | null>} A promise that resolves with the formatted portfolio data or null if an error occurs
 */
            networkId: PROVIDER_CONFIG.networkId,
            keyStore: this.keyStore,
            nodeUrl: PROVIDER_CONFIG.nodeUrl,
            walletUrl: PROVIDER_CONFIG.walletUrl,
            helperUrl: PROVIDER_CONFIG.helperUrl,
        });

        this.account = await nearConnection.account(this.accountId);
        return this.account;
    }

/**
 * Fetches data from a specified URL with retry logic.
/**
 * Connect to NEAR Wallet using provided runtime and set up the account.
 * 
 * @param {IAgentRuntime} runtime - The runtime object to get NEAR wallet settings from
 * @returns {Promise<object>} - The NEAR account object
 * @throws {Error} - If NEAR wallet credentials not configured
 */
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} The fetched data.
 */
    private async fetchWithRetry(
        url: string,
        options: RequestInit = {}
    ): Promise<any> {
        let lastError: Error;

        for (let i = 0; i < PROVIDER_CONFIG.MAX_RETRIES; i++) {
            try {
                const response = await fetch(url, options);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return await response.json();
            } catch (error) {
                console.error(`Attempt ${i + 1} failed:`, error);
                lastError = error as Error;
                if (i < PROVIDER_CONFIG.MAX_RETRIES - 1) {
                    await new Promise((resolve) =>
                        setTimeout(
                            resolve,
                            PROVIDER_CONFIG.RETRY_DELAY * Math.pow(2, i)
                        )
                    );
                }
            }
        }
        throw lastError!;
/**
 * Fetches data from a given URL with retry logic.
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - Optional request options.
 * @returns {Promise<any>} The fetched data.
 */
    }

/**
 * Fetches the current value of the portfolio for the account associated with the wallet.
 * If the portfolio value is already cached, it will return the cached value to reduce redundant API calls.
 *
 * @param {IAgentRuntime} runtime - The runtime environment object.
 * @returns {Promise<WalletPortfolio>} The current portfolio value as a WalletPortfolio object.
 * @throws Will throw an error if the portfolio value cannot be fetched.
 */
    async fetchPortfolioValue(
        runtime: IAgentRuntime
    ): Promise<WalletPortfolio> {
        try {
            const cacheKey = `portfolio-${this.accountId}`;
            const cachedValue = this.cache.get<WalletPortfolio>(cacheKey);

            if (cachedValue) {
                console.log("Cache hit for fetchPortfolioValue");
                return cachedValue;
            }

            const account = await this.connect(runtime);
            const balance = await account.getAccountBalance();

            // Convert yoctoNEAR to NEAR
            const nearBalance = utils.format.formatNearAmount(
                balance.available
            );
/**
 * Fetches the current portfolio value of the wallet.
 * Caches the portfolio value based on the accountId to prevent unnecessary fetches.
 * 
 * @param {IAgentRuntime} runtime - The runtime interface for interacting with the agent.
 * @returns {Promise<WalletPortfolio>} The wallet portfolio object containing total USD value, total NEAR balance,
 * and details of the NEAR token in the portfolio.
 * @throws {Error} If there is an error fetching the portfolio value.
 */

            // Fetch NEAR price in USD
            const nearPrice = await this.fetchNearPrice();
            const valueUsd = new BigNumber(nearBalance).times(nearPrice);

            const portfolio: WalletPortfolio = {
                totalUsd: valueUsd.toString(),
                totalNear: nearBalance,
                tokens: [
                    {
                        name: "NEAR Protocol",
                        symbol: "NEAR",
                        decimals: 24,
                        balance: balance.available,
                        uiAmount: nearBalance,
                        priceUsd: nearPrice.toString(),
                        valueUsd: valueUsd.toString(),
                    },
                ],
            };

            this.cache.set(cacheKey, portfolio);
            return portfolio;
        } catch (error) {
            console.error("Error fetching portfolio:", error);
            throw error;
        }
    }

/**
 * Fetches the near price from an external API with caching mechanism.
 * If the price is already cached, return the cached value. If not, make a request to the API.
 * 
 * @return {Promise<number>} The near price in USD.
 */
    private async fetchNearPrice(): Promise<number> {
        const cacheKey = "near-price";
        const cachedPrice = this.cache.get<number>(cacheKey);

        if (cachedPrice) {
            return cachedPrice;
        }

        try {
            const response = await this.fetchWithRetry(
                "https://api.coingecko.com/api/v3/simple/price?ids=near&vs_currencies=usd"
            );
            const price = response.near.usd;
/**
* Fetches the current NEAR price from the API and stores it in the cache if not already fetched.
* @returns {Promise<number>} The current NEAR price in USD.
*/
            this.cache.set(cacheKey, price);
            return price;
        } catch (error) {
            console.error("Error fetching NEAR price:", error);
            return 0;
        }
    }

/**
 * Formats the portfolio information into a human-readable string format.
 *
 * @param {IAgentRuntime} runtime - The Agent Runtime object containing system information.
 * @param {WalletPortfolio} portfolio - The WalletPortfolio object containing the portfolio information.
 * @returns {string} Returns a formatted string displaying account ID, total value, token balances, and market prices.
 */
    formatPortfolio(
        runtime: IAgentRuntime,
        portfolio: WalletPortfolio
    ): string {
        let output = `${runtime.character.system}\n`;
        output += `Account ID: ${this.accountId}\n\n`;
/**
 * Formats the wallet portfolio information into a readable string.
 *
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The portfolio object containing wallet information.
 * @returns {string} - The formatted string of the wallet portfolio information.
 */

        const totalUsdFormatted = new BigNumber(portfolio.totalUsd).toFixed(2);
        const totalNearFormatted = portfolio.totalNear;

        output += `Total Value: $${totalUsdFormatted} (${totalNearFormatted} NEAR)\n\n`;
        output += "Token Balances:\n";

        for (const token of portfolio.tokens) {
            output += `${token.name} (${token.symbol}): ${token.uiAmount} ($${new BigNumber(token.valueUsd).toFixed(2)})\n`;
        }

        output += "\nMarket Prices:\n";
        output += `NEAR: $${new BigNumber(portfolio.tokens[0].priceUsd).toFixed(2)}\n`;

        return output;
    }

/**
 * Asynchronously retrieves and formats the value of the portfolio.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @returns {Promise<string>} A string representing the formatted portfolio value.
 */ 
/**
 * Asynchronously fetches the portfolio value for a given agent runtime, formats the portfolio, and returns a promise with the formatted string.
 * 
 * @param {IAgentRuntime} runtime The agent runtime to fetch the portfolio value from.
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio string or an error message if unable to fetch the wallet information.
 */
    async getFormattedPortfolio(runtime: IAgentRuntime): Promise<string> {
        try {
            const portfolio = await this.fetchPortfolioValue(runtime);
            return this.formatPortfolio(runtime, portfolio);
        } catch (error) {
            console.error("Error generating portfolio report:", error);
            return "Unable to fetch wallet information. Please try again later.";
        }
    }
}

const walletProvider: Provider = {
    get: async (
        runtime: IAgentRuntime,
        _message: Memory,
        _state?: State
    ): Promise<string | null> => {
        try {
            const accountId = runtime.getSetting("NEAR_ADDRESS");
            if (!accountId) {
                throw new Error("NEAR_ADDRESS not configured");
            }
            const provider = new WalletProvider(accountId);
            return await provider.getFormattedPortfolio(runtime);
        } catch (error) {
            console.error("Error in wallet provider:", error);
            return null;
        }
    },
};

export { walletProvider };
