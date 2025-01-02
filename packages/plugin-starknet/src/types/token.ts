/**
 * Interface for a quote request object.
 * @typedef {Object} QuoteRequest
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint} [sellAmount] - The amount of tokens to sell.
 * @property {bigint} [buyAmount] - The amount of tokens to buy.
 * @property {string} [takerAddress] - The address to fill the quote.
 * @property {number} [size] - The maximum number of quotes to return.
 * @property {string[]} [excludeSources] - The sources to exclude.
 * @property {bigint} [integratorFees] - The fee amount in basis points.
 * @property {string} [integratorFeeRecipient] - The address of the fee collector.
 * @property {string} [integratorName] - The name of the application.
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
 * Represents a quote for a trade transaction.
 * @typedef {Object} Quote
 * @property {string} quoteId - The unique id of the quote.
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {bigint} sellAmount - The amount of token being sold.
 * @property {number} sellAmountInUsd - The converted amount of token being sold in USD.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint} buyAmount - The amount of token being bought.
 * @property {number} buyAmountInUsd - The converted amount of token being bought in USD.
 * @property {number} [blockNumber] - The block number associated with the quote.
 * @property {string} chainId - The chain id of the blockchain.
 * @property {number} [expiry] - The Unix timestamp when the quote expires in seconds.
 * @property {Route[]} routes - An array of routes for the trade.
 * @property {bigint} gasFees - The estimated amount of gas fees in ETH.
 * @property {number} gasFeesInUsd - The converted amount of gas fees in USD.
 * @property {bigint} avnuFees - The actual fees taken by AVNU.
 * @property {number} avnuFeesInUsd - The converted amount of fees taken by AVNU in USD.
 * @property {bigint} avnuFeesBps - The fees in basis points taken by AVNU.
 * @property {bigint} integratorFees - The actual fees taken by the integrator.
 * @property {number} integratorFeesInUsd - The converted amount of fees taken by the integrator in USD.
 * @property {bigint} integratorFeesBps - The fees in basis points taken by the integrator.
 * @property {number} priceRatioUsd - The price ratio in USD.
 * @property {number} [sellTokenPriceInUsd] - The sell token price in USD.
 * @property {number} [buyTokenPriceInUsd] - The buy token price in USD.
 * @property {Gasless} gasless - Object containing gasless options for the trade.
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
 * Interface representing a route with information about the source, address,
 * percentage distribution of sellToken, sell token address, buy token address,
 * and nested routes.
 * @typedef {Object} Route
 * @property {string} name - The name of the source
 * @property {string} address - The address of the source
 * @property {number} percent - The percentage distribution of sellToken. 1 is 100%
 * @property {string} sellTokenAddress - The address of the sell token
 * @property {string} buyTokenAddress - The address of the buy token
 * @property {Array<Route>} routes - An array of nested routes
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
 * Interface representing gasless transaction settings.
 * @typedef {object} Gasless
 * @property {boolean} active - Indicates if the gasless feature is active.
 * @property {Array} gasTokenPrices - Array containing the prices of gas tokens.
 * @property {string} gasTokenPrices.tokenAddress - The address of the gas token.
 * @property {number} gasTokenPrices.gasFeesInUsd - The gas fees in USD.
 * @property {bigint} gasTokenPrices.gasFeesInGasToken - The gas fees in gas token.
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
 * Interface for token information.
 * @interface TokenInfo
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} address - The address of the token.
 * @property {string} logoUri - The URI for the token's logo.
 * @property {string} coingeckoId - The CoinGecko ID of the token.
 * @property {boolean} verified - Indicates if the token is verified.
 * @property {Object} market - Object containing market information.
 * @property {number} market.currentPrice - The current price of the token.
 * @property {number} market.marketCap - The market capitalization of the token.
 * @property {number} market.fullyDilutedValuation - The fully diluted valuation of the token.
 * @property {number} market.starknetTvl - The TVL on StarkNet for the token.
 * @property {number} market.priceChange1h - The price change in the last 1 hour.
 * @property {number} market.priceChangePercentage1h - The percentage price change in the last 1 hour.
 * @property {number} market.priceChange24h - The price change in the last 24 hours.
 * @property {number} market.priceChangePercentage24h - The percentage price change in the last 24 hours.
 * @property {number} market.priceChange7d - The price change in the last 7 days.
 * @property {number} market.priceChangePercentage7d - The percentage price change in the last 7 days.
 * @property {number} market.marketCapChange24h - The market cap change in the last 24 hours.
 * @property {number} market.marketCapChangePercentage24h - The percentage market cap change in the last 24 hours.
 * @property {number} market.starknetVolume24h - The volume on StarkNet in the last 24 hours.
 * @property {number} market.starknetTradingVolume24h - The trading volume on StarkNet in the last 24 hours.
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
