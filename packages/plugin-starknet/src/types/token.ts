/**
 * Interface for specifying the parameters of a quote request.
 * @typedef {Object} QuoteRequest
 * @property {string} sellTokenAddress - The address of the token being sold.
 * @property {string} buyTokenAddress - The address of the token being bought.
 * @property {bigint=} sellAmount - The amount of tokens being sold (optional).
 * @property {bigint=} buyAmount - The amount of tokens being bought (optional).
 * @property {string=} takerAddress - The address of the entity filling the quote (optional).
 * @property {number=} size - The maximum number of quotes to be returned (optional).
 * @property {string[]=} excludeSources - The sources to be excluded from the quote retrieval (optional).
 * @property {bigint=} integratorFees - The fee amount in basis points (optional).
 * @property {string=} integratorFeeRecipient - The address of the fee collector (optional, required if integratorFees is defined).
 * @property {string=} integratorName - The name of the application making the request.
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
* Interface representing a quote for a token swap.
* @typedef {Object} Quote
* @property {string} quoteId - The unique id of the quote.
* @property {string} sellTokenAddress - The address of the token to be sold.
* @property {bigint} sellAmount - The amount of the token to be sold.
* @property {number} sellAmountInUsd - The amount of the token to be sold in USD.
* @property {string} buyTokenAddress - The address of the token to be bought.
* @property {bigint} buyAmount - The amount of the token to be bought.
* @property {number} buyAmountInUsd - The amount of the token to be bought in USD.
* @property {number} [blockNumber] - The block number related to the quote.
* @property {string} chainId - The chain id where the quote is valid.
* @property {number} [expiry] - Unix timestamp when the quote expires in seconds.
* @property {Route[]} routes - The available routes for the swap.
* @property {bigint} gasFees - The estimated amount of gas fees in ETH.
* @property {number} gasFeesInUsd - The estimated amount of gas fees in USD.
* @property {bigint} avnuFees - The actual fees taken by AVNU.
* @property {number} avnuFeesInUsd - The actual fees taken by AVNU in USD.
* @property {bigint} avnuFeesBps - The fees in basis points taken by AVNU.
* @property {bigint} integratorFees - The actual fees taken by the integrator.
* @property {number} integratorFeesInUsd - The actual fees taken by the integrator in USD.
* @property {bigint} integratorFeesBps - The fees in basis points taken by the integrator.
* @property {number} priceRatioUsd - The price ratio of the tokens in USD.
* @property {number} [sellTokenPriceInUsd] - The price of the sell token in USD.
* @property {number} [buyTokenPriceInUsd] - The price of the buy token in USD.
* @property {Gasless} gasless - Object representing gasless transaction information.
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
 * Interface representing a route for token swapping.
 * @typedef {object} Route
 * @property {string} name - The name of the source (e.g. 10kSwap)
 * @property {string} address - The address of the source
 * @property {number} percent - The percentage distribution of sellToken. 1 is 100%
 * @property {string} sellTokenAddress - The address of the sell token
 * @property {string} buyTokenAddress - The address of the buy token
 * @property {Route[]} routes - An array of nested routes for further token swapping
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
 * Interface representing Gasless object.
 * @typedef {Object} Gasless
 * @property {boolean} active - Indicates if gasless is active.
 * @property {Object[]} gasTokenPrices - Array containing gas token prices.
 * @property {string} gasTokenPrices.tokenAddress - Token address for gas token.
 * @property {number} gasTokenPrices.gasFeesInUsd - Gas fees in USD.
 * @property {bigint} gasTokenPrices.gasFeesInGasToken - Gas fees in gas token.
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
 * Interface representing token information.
 *
 * @typedef {Object} TokenInfo
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {string} address - The blockchain address of the token.
 * @property {string} logoUri - The URI for the token's logo.
 * @property {string} coingeckoId - The ID of the token on CoinGecko.
 * @property {boolean} verified - Indicates if the token is verified.
 * @property {Object} market - Object containing market information.
 * @property {number} market.currentPrice - The current price of the token.
 * @property {number} market.marketCap - The market capitalization of the token.
 * @property {number} market.fullyDilutedValuation - The fully diluted valuation of the token.
 * @property {number} market.starknetTvl - The total value locked in the StarkNet.
 * @property {number} market.priceChange1h - Percentage change in price in the last hour.
 * @property {number} market.priceChangePercentage1h - Actual change in price in the last hour.
 * @property {number} market.priceChange24h - Percentage change in price in the last 24 hours.
 * @property {number} market.priceChangePercentage24h - Actual change in price in the last 24 hours.
 * @property {number} market.priceChange7d - Percentage change in price in the last 7 days.
 * @property {number} market.priceChangePercentage7d - Actual change in price in the last 7 days.
 * @property {number} market.marketCapChange24h - Change in market capitalization in the last 24 hours.
 * @property {number} market.marketCapChangePercentage24h - Percentage change in market capitalization in the last 24 hours.
 * @property {number} market.starknetVolume24h - Volume of token traded in the StarkNet in the last 24 hours.
 * @property {number} market.starknetTradingVolume24h - Trading volume of the token in the StarkNet in the last 24 hours.
 * @property {string[]} tags - Array of tags associated with the token.
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
