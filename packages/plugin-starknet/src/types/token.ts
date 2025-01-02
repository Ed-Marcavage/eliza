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
 * Interface representing a Quote object containing information about a quote for a token swap.
 * @typedef { Object } Quote
 * @property { string } quoteId - The unique id of the quote.
 * @property { string } sellTokenAddress - The address of the token being sold.
 * @property { bigint } sellAmount - The amount of token being sold.
 * @property { number } sellAmountInUsd - The amount of token being sold in USD.
 * @property { string } buyTokenAddress - The address of the token being bought.
 * @property { bigint } buyAmount - The amount of token being bought.
 * @property { number } buyAmountInUsd - The amount of token being bought in USD.
 * @property { number } [blockNumber] - The block number related to the quote.
 * @property { string } chainId - The chain id of the quote.
 * @property { number } [expiry] - The Unix timestamp when the quote expires in seconds.
 * @property {Route[]} routes - An array of Route objects representing the route for the quote.
 * @property { bigint } gasFees - The estimated amount of gas fees in ETH.
 * @property { number } gasFeesInUsd - The estimated amount of gas fees in USD.
 * @property { bigint } avnuFees - The actual fees taken by AVNU.
 * @property { number } avnuFeesInUsd - The actual fees taken by AVNU in USD.
 * @property { bigint } avnuFeesBps - The fees in bps taken by AVNU.
 * @property { bigint } integratorFees - The actual fees taken by the integrator.
 * @property { number } integratorFeesInUsd - The actual fees taken by the integrator in USD.
 * @property { bigint } integratorFeesBps - The fees in bps taken by the integrator.
 * @property { number } priceRatioUsd - The price ratio in USD and in bps.
 * @property { number } [sellTokenPriceInUsd] - The sell token price in USD.
 * @property { number } [buyTokenPriceInUsd] - The buy token price in USD.
 * @property { Gasless } gasless - An object containing information about gasless transactions.
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
 * Interface for defining a route containing information about the source, address, percentage distribution, and token addresses.
 * @typedef {Object} Route
 * @property {string} name - The name of the source (e.g. 10kSwap)
 * @property {string} address - The address of the source
 * @property {number} percent - The percentage distribution of the sellToken (1 representing 100%)
 * @property {string} sellTokenAddress - The address of the sell token
 * @property {string} buyTokenAddress - The address of the buy token
 * @property {Route[]} routes - An array of nested routes
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
 * Interface representing gasless transaction information.
 * @property {boolean} active - Indicates if gasless transactions are active.
 * @property {Object[]} gasTokenPrices - Array of gas token prices.
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
