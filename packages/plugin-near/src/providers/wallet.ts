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
 * Interface representing a NEAR Protocol token.
 * @typedef {Object} NearToken
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimals for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The amount of the token in the user interface.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in NEAR Protocol tokens (optional).
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
 * Represents a wallet portfolio that contains total USD balance, total NEAR balance, and an array of NearToken objects.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - The total USD balance in the wallet
 * @property {string} [totalNear] - The total NEAR balance in the wallet (optional)
 * @property {Array<NearToken>} tokens - An array of NearToken objects representing different tokens in the wallet
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
 * Represents a WalletProvider class that implements the Provider interface.
 * * @class
 */
export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Constructor for creating a new instance of a class.
 * @param {string} accountId - The account ID associated with the instance.
 */
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Asynchronously retrieves a formatted portfolio string from the wallet provider.
 *
 * @param {IAgentRuntime} runtime - The runtime context for the agent.
 * @param {Memory} _message - The message data from memory.
 * @param {State} [_state] - Optional state data for the agent.
 * @returns {Promise<string | null>} The formatted portfolio string, or null if an error occurs.
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
 * Connect to NEAR protocol using the provided account credentials.
 * If no account is already set, it retrieves the NEAR wallet secret key and public key
 * from the runtime settings. 
 * If credentials are not configured, an error is thrown.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime interface
 * @returns {Promise<Account>} - The connected NEAR account
 */
    public async connect(runtime: IAgentRuntime) {
        if (this.account) return this.account;

        const secretKey = runtime.getSetting("NEAR_WALLET_SECRET_KEY");
        const publicKey = runtime.getSetting("NEAR_WALLET_PUBLIC_KEY");

        if (!secretKey || !publicKey) {
            throw new Error("NEAR wallet credentials not configured");
        }

        // Create KeyPair from secret key
        const keyPair = KeyPair.fromString(secretKey as KeyPairString);

        // Set the key in the keystore
        await this.keyStore.setKey(
            PROVIDER_CONFIG.networkId,
            this.accountId,
            keyPair
        );

        const nearConnection = await connect({
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
 * 
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options={}] - The options for the fetch request.
 * @returns {Promise<any>} - A Promise that resolves to the fetched data.
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
    }

/**
 * Fetches the current value of the portfolio in the wallet.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime to connect to the account
 * @returns {Promise<WalletPortfolio>} The portfolio value including total USD, total NEAR, and token details
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
 * Fetches the current price of NEAR token in USD from an API endpoint.
 * It first checks if the price is cached, and if not, makes a request to the API.
 * If successful, it caches the price and returns it. If there's an error, logs it and returns 0.
 * @returns {Promise<number>} The current price of NEAR token in USD.
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
            this.cache.set(cacheKey, price);
            return price;
        } catch (error) {
            console.error("Error fetching NEAR price:", error);
            return 0;
        }
    }

/**
 * Formats the given portfolio data into a string for display.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime object.
 * @param {WalletPortfolio} portfolio - The portfolio data to format.
 * @returns {string} The formatted string containing account ID, total value, token balances, and market prices.
 */
    formatPortfolio(
        runtime: IAgentRuntime,
        portfolio: WalletPortfolio
    ): string {
        let output = `${runtime.character.system}\n`;
        output += `Account ID: ${this.accountId}\n\n`;

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
 * Asynchronously retrieves the portfolio value from the given runtime and formats it into a string representation.
 * 
 * @param {IAgentRuntime} runtime - The runtime from which to fetch portfolio information
 * @returns {Promise<string>} A promise that resolves with the formatted portfolio value as a string
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
