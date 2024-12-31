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
 * Interface representing a Near Protocol token.
 *
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {number} decimals - The number of decimal places for the token.
 * @property {string} balance - The balance of the token.
 * @property {string} uiAmount - The UI amount of the token.
 * @property {string} priceUsd - The price of the token in USD.
 * @property {string} valueUsd - The value of the token in USD.
 * @property {string} [valueNear] - The value of the token in Near Protocol.
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
 * Interface for Wallet Portfolio data.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - Total value in USD.
 * @property {string} [totalNear] - Total value in Near (optional).
 * @property {Array<NearToken>} tokens - Array of NearToken objects.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
 * Class representing a Wallet Provider that implements Provider interface.
 */

export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Constructor for creating an instance of a class.
 * 
 * @param {string} accountId - The unique identifier for the account.
 */ 
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Retrieves the formatted portfolio from the wallet provider.
 * 
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {Memory} _message - The memory object representing the message.
 * @param {State} [_state] - The optional state object.
 * @returns {Promise<string | null>} The formatted portfolio, or null if an error occurs.
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
 * Connects to the NEAR blockchain using the provided runtime and sets up the necessary wallet credentials.
 * Retrieves the NEAR wallet secret key and public key from the runtime settings, creates a KeyPair from the secret key,
 * sets the key in the keystore, establishes a connection to the NEAR blockchain, and initializes the NEAR account.
 * Throws an error if the NEAR wallet credentials are not configured.
 * 
 * @param {IAgentRuntime} runtime - The runtime object that provides access to NEAR wallet settings.
 * @returns {Promise<Account>} The NEAR account object after successful connection.
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
 * This function makes a network request to the specified URL with optional request options.
 * It will attempt to fetch the data with retries up to a maximum number of attempts defined in PROVIDER_CONFIG.MAX_RETRIES.
 * If the request is unsuccessful after all attempts, it will throw the last error encountered.
 * @param {string} url - The URL to make the network request to.
 * @param {RequestInit} options - Optional request options such as method, headers, etc.
 * @returns {Promise<any>} A Promise that resolves with the JSON response data if successful.
 * @throws {Error} Throws an error if all attempts fail to retrieve the data.
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
 * Asynchronously fetches the current value of the portfolio for the specified account ID.
 * If the portfolio value is already cached, the cached value is returned.
 * Otherwise, the portfolio value is fetched by connecting to the runtime, getting the account balance,
 * converting the balance from yoctoNEAR to NEAR, fetching the NEAR price in USD,
 * calculating the total USD value of the portfolio, and constructing the WalletPortfolio object.
 * The constructed portfolio object is then cached and returned.
 * If an error occurs during the process, it is caught, logged, and re-thrown.
 * 
 * @param {IAgentRuntime} runtime - The agent runtime used to connect and fetch account information.
 * @returns {Promise<WalletPortfolio>} A promise that resolves with the portfolio value as a WalletPortfolio object.
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
 * Asynchronously fetches the NEAR token price from the Coingecko API.
 * If the price is already cached, it retrieves it from the cache to avoid unnecessary API calls.
 * If the price is not cached, it makes a request to the API and stores the price in the cache for future use.
 * 
 * @returns {Promise<number>} The NEAR token price in USD.
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
 * Formats the wallet portfolio information into a human-readable string.
 *
 * @param {IAgentRuntime} runtime - The runtime environment for the agent.
 * @param {WalletPortfolio} portfolio - The portfolio information to format.
 * @returns {string} The formatted portfolio information as a string.
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
* Asynchronously retrieves the portfolio value using the provided IAgentRuntime instance,
* then formats the portfolio and returns it as a string.
* 
* @param {IAgentRuntime} runtime - The IAgentRuntime instance to use for fetching the portfolio value.
* @returns {Promise<string>} A Promise that resolves with the formatted portfolio string.
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
