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

/**
 * Interface representing a Quote object.
 * * @typedef { Object } Quote
 * @property { string } quoteId - The unique id of the quote
 * @property { string } sellTokenAddress - The address of the token being sold
 * @property { bigint } sellAmount - The amount of the token being sold
 * @property { number } sellAmountInUsd - The equivalent amount in USD of the token being sold
 * @property { string } buyTokenAddress - The address of the token being bought
 * @property { bigint } buyAmount - The amount of the token being bought
 * @property { number } buyAmountInUsd - The equivalent amount in USD of the token being bought
 * @property { number } [blockNumber] - The block number associated with the quote
 * @property { string } chainId - The id of the blockchain chain
 * @property { number } [expiry] - Unix timestamp of when the quote expires in seconds
 * @property {Route[]} routes - Array of Route objects representing the trading path
 * @property { bigint } gasFees - The estimated amount of gas fees in ETH
 * @property { number } gasFeesInUsd - The equivalent amount of gas fees in USD
 * @property { bigint } avnuFees - The actual fees taken by AVNU
 * @property { number } avnuFeesInUsd - The equivalent amount of fees taken by AVNU in USD
 * @property { bigint } avnuFeesBps - The fees taken by AVNU in basis points
 * @property { bigint } integratorFees - The actual fees taken by the integrator
 * @property { number } integratorFeesInUsd - The equivalent amount of fees taken by the integrator in USD
 * @property { bigint } integratorFeesBps - The fees taken by the integrator in basis points
 * @property { number } priceRatioUsd - The price ratio in USD
 * @property { number } [sellTokenPriceInUsd] - The sell token price in USD
 * @property { number } [buyTokenPriceInUsd] - The buy token price in USD
 * @property { Gasless } gasless - Object representing gasless transaction information
 */
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

/**
 * Represents a gasless functionality with the following properties:
 * @property {boolean} active - Indicates if the gasless functionality is currently active.
 * @property {Array<{ tokenAddress: string, gasFeesInUsd: number, gasFeesInGasToken: bigint }>} gasTokenPrices - An array of objects representing gas token prices, each containing:
 *   - @property {string} tokenAddress - The address of the gas token.
 *   - @property {number} gasFeesInUsd - The gas fees in USD.
 *   - @property {bigint} gasFeesInGasToken - The gas fees in gas token format.
 */
export interface Gasless {
    active: boolean;
    gasTokenPrices: {
        tokenAddress: string;
        gasFeesInUsd: number;
        gasFeesInGasToken: bigint;
    }[];
}

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

export type { Quote, QuoteRequest };
