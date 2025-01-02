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
 * Interfaz para representar un token cercano
 * @typedef {Object} NearToken
 * @property {string} name - El nombre del token
 * @property {string} symbol - El símbolo del token
 * @property {number} decimals - El número de decimales del token
 * @property {string} balance - El saldo del token
 * @property {string} uiAmount - La cantidad de la interfaz de usuario del token
 * @property {string} priceUsd - El precio del token en USD
 * @property {string} valueUsd - El valor del token en USD
 * @property {string} [valueNear] - El valor del token en NEAR (opcional)
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
 * Interfaz que representa el portafolio de una cartera.
 * @typedef {Object} WalletPortfolio
 * @property {string} totalUsd - El total en USD en la cartera.
 * @property {string} [totalNear] - El total en NEAR en la cartera (opcional).
 * @property {Array<NearToken>} tokens - La lista de tokens NEAR en la cartera.
 */
interface WalletPortfolio {
    totalUsd: string;
    totalNear?: string;
    tokens: Array<NearToken>;
}

/**
 * Proveedor de Cartera que implementa la interfaz Provider
 * @class
 */
export class WalletProvider implements Provider {
    private cache: NodeCache;
    private account: Account | null = null;
    private keyStore: keyStores.InMemoryKeyStore;
/**
 * Constructor de la clase que inicializa un objeto con un ID de cuenta dado.
 * Además, inicializa un nuevo caché con un tiempo de vida de 5 minutos y un almacén de claves en memoria.
 * 
 * @param {string} accountId - El ID de la cuenta asignado al objeto
 */
    constructor(private accountId: string) {
        this.cache = new NodeCache({ stdTTL: 300 }); // Cache TTL set to 5 minutes
        this.keyStore = new keyStores.InMemoryKeyStore();
    }

/**
 * Método asincrónico para obtener información de cartera formateada.
 * @param {IAgentRuntime} runtime - Interfaz que contiene información y funcionalidades del agente en ejecución.
 * @param {Memory} _message - Objeto que representa un mensaje o evento recibido por el agente.
 * @param {State} [_state] - Estado opcional que puede ser proporcionado al método.
 * @returns {Promise<string | null>} Información de cartera formateada o null en caso de error.
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
 * Método asíncrono para establecer una conexión con la red NEAR utilizando las credenciales de la billetera.
 * 
 * @param {IAgentRuntime} runtime - Instancia de IAgentRuntime
 * @returns {Promise<WalletAccount>} Retorna la cuenta de la billetera una vez establecida la conexión
 * @throws {Error} Error cuando las credenciales de la billetera NEAR no están configuradas
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
 * Función que realiza una solicitud a un URL con la posibilidad de reintento en caso de error,
 * hasta un máximo de intentos definido en PROVIDER_CONFIG.MAX_RETRIES.
 * 
 * @param {string} url - El URL al que se realizará la solicitud.
 * @param {RequestInit} options - Opciones adicionales para la solicitud.
 * @returns {Promise<any>} - Promesa que se resuelve con la respuesta en formato JSON si la solicitud es exitosa.
 * @throws {Error} - Error HTTP si la respuesta no es exitosa después de los reintentos.
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
 * 
 * Método asíncrono para obtener el valor de la cartera.
 * 
 * @param {IAgentRuntime} runtime - Interfaz del tiempo de ejecución del agente.
 * @returns {Promise<WalletPortfolio>} Retorna la cartera del usuario.
 * 
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
* Método privado asíncrono para obtener el precio cercano.
* @returns {Promise<number>} - El precio cercano en USD.
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
 * Formatea y genera un resumen legible del portafolio, incluyendo la información del sistema del personaje, ID de cuenta, valor total en USD y NEAR, saldos de tokens y precios de mercado.
 * 
 * @param {IAgentRuntime} runtime - La instancia del tiempo de ejecución del agente.
 * @param {WalletPortfolio} portfolio - El portafolio de la billetera que se formateará.
 * @returns {string} Un resumen formateado del portafolio con la información detallada.
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
 * Método asincrónico para obtener el portafolio formateado.
 * 
 * @param {IAgentRuntime} runtime - El entorno de ejecución del agente.
 * @returns {Promise<string>} La información del portafolio formateada como cadena.
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
