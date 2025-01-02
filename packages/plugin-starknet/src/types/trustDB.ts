import { TokenInfo } from "./token";

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
export interface TokenSecurityData {
    ownerBalance: string;
    creatorBalance: string;
    ownerPercentage: number;
    creatorPercentage: number;
    top10HolderBalance: string;
    top10HolderPercent: number;
}

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
export interface TokenTradeData {
    address: string;
    holder: number;
    market: number;
    last_trade_unix_time: number;
    last_trade_human_time: string;
    price: number;
    history_30m_price: number;
    price_change_30m_percent: number;
    history_1h_price: number;
    price_change_1h_percent: number;
    history_2h_price: number;
    price_change_2h_percent: number;
    history_4h_price: number;
    price_change_4h_percent: number;
    history_6h_price: number;
    price_change_6h_percent: number;
    history_8h_price: number;
    price_change_8h_percent: number;
    history_12h_price: number;
    price_change_12h_percent: number;
    history_24h_price: number;
    price_change_24h_percent: number;
    unique_wallet_30m: number;
    unique_wallet_history_30m: number;
    unique_wallet_30m_change_percent: number;
    unique_wallet_1h: number;
    unique_wallet_history_1h: number;
    unique_wallet_1h_change_percent: number;
    unique_wallet_2h: number;
    unique_wallet_history_2h: number;
    unique_wallet_2h_change_percent: number;
    unique_wallet_4h: number;
    unique_wallet_history_4h: number;
    unique_wallet_4h_change_percent: number;
    unique_wallet_8h: number;
    unique_wallet_history_8h: number | null;
    unique_wallet_8h_change_percent: number | null;
    unique_wallet_24h: number;
    unique_wallet_history_24h: number | null;
    unique_wallet_24h_change_percent: number | null;
    trade_30m: number;
    trade_history_30m: number;
    trade_30m_change_percent: number;
    sell_30m: number;
    sell_history_30m: number;
    sell_30m_change_percent: number;
    buy_30m: number;
    buy_history_30m: number;
    buy_30m_change_percent: number;
    volume_30m: number;
    volume_30m_usd: number;
    volume_history_30m: number;
    volume_history_30m_usd: number;
    volume_30m_change_percent: number;
    volume_buy_30m: number;
    volume_buy_30m_usd: number;
    volume_buy_history_30m: number;
    volume_buy_history_30m_usd: number;
    volume_buy_30m_change_percent: number;
    volume_sell_30m: number;
    volume_sell_30m_usd: number;
    volume_sell_history_30m: number;
    volume_sell_history_30m_usd: number;
    volume_sell_30m_change_percent: number;
    trade_1h: number;
    trade_history_1h: number;
    trade_1h_change_percent: number;
    sell_1h: number;
    sell_history_1h: number;
    sell_1h_change_percent: number;
    buy_1h: number;
    buy_history_1h: number;
    buy_1h_change_percent: number;
    volume_1h: number;
    volume_1h_usd: number;
    volume_history_1h: number;
    volume_history_1h_usd: number;
    volume_1h_change_percent: number;
    volume_buy_1h: number;
    volume_buy_1h_usd: number;
    volume_buy_history_1h: number;
    volume_buy_history_1h_usd: number;
    volume_buy_1h_change_percent: number;
    volume_sell_1h: number;
    volume_sell_1h_usd: number;
    volume_sell_history_1h: number;
    volume_sell_history_1h_usd: number;
    volume_sell_1h_change_percent: number;
    trade_2h: number;
    trade_history_2h: number;
    trade_2h_change_percent: number;
    sell_2h: number;
    sell_history_2h: number;
    sell_2h_change_percent: number;
    buy_2h: number;
    buy_history_2h: number;
    buy_2h_change_percent: number;
    volume_2h: number;
    volume_2h_usd: number;
    volume_history_2h: number;
    volume_history_2h_usd: number;
    volume_2h_change_percent: number;
    volume_buy_2h: number;
    volume_buy_2h_usd: number;
    volume_buy_history_2h: number;
    volume_buy_history_2h_usd: number;
    volume_buy_2h_change_percent: number;
    volume_sell_2h: number;
    volume_sell_2h_usd: number;
    volume_sell_history_2h: number;
    volume_sell_history_2h_usd: number;
    volume_sell_2h_change_percent: number;
    trade_4h: number;
    trade_history_4h: number;
    trade_4h_change_percent: number;
    sell_4h: number;
    sell_history_4h: number;
    sell_4h_change_percent: number;
    buy_4h: number;
    buy_history_4h: number;
    buy_4h_change_percent: number;
    volume_4h: number;
    volume_4h_usd: number;
    volume_history_4h: number;
    volume_history_4h_usd: number;
    volume_4h_change_percent: number;
    volume_buy_4h: number;
    volume_buy_4h_usd: number;
    volume_buy_history_4h: number;
    volume_buy_history_4h_usd: number;
    volume_buy_4h_change_percent: number;
    volume_sell_4h: number;
    volume_sell_4h_usd: number;
    volume_sell_history_4h: number;
    volume_sell_history_4h_usd: number;
    volume_sell_4h_change_percent: number;
    trade_8h: number;
    trade_history_8h: number | null;
    trade_8h_change_percent: number | null;
    sell_8h: number;
    sell_history_8h: number | null;
    sell_8h_change_percent: number | null;
    buy_8h: number;
    buy_history_8h: number | null;
    buy_8h_change_percent: number | null;
    volume_8h: number;
    volume_8h_usd: number;
    volume_history_8h: number;
    volume_history_8h_usd: number;
    volume_8h_change_percent: number | null;
    volume_buy_8h: number;
    volume_buy_8h_usd: number;
    volume_buy_history_8h: number;
    volume_buy_history_8h_usd: number;
    volume_buy_8h_change_percent: number | null;
    volume_sell_8h: number;
    volume_sell_8h_usd: number;
    volume_sell_history_8h: number;
    volume_sell_history_8h_usd: number;
    volume_sell_8h_change_percent: number | null;
    trade_24h: number;
    trade_history_24h: number;
    trade_24h_change_percent: number | null;
    sell_24h: number;
    sell_history_24h: number;
    sell_24h_change_percent: number | null;
    buy_24h: number;
    buy_history_24h: number;
    buy_24h_change_percent: number | null;
    volume_24h: number;
    volume_24h_usd: number;
    volume_history_24h: number;
    volume_history_24h_usd: number;
    volume_24h_change_percent: number | null;
    volume_buy_24h: number;
    volume_buy_24h_usd: number;
    volume_buy_history_24h: number;
    volume_buy_history_24h_usd: number;
    volume_buy_24h_change_percent: number | null;
    volume_sell_24h: number;
    volume_sell_24h_usd: number;
    volume_sell_history_24h: number;
    volume_sell_history_24h_usd: number;
    volume_sell_24h_change_percent: number | null;
}

/**
 * Represents data for a holder, including address and balance.
 * @interface HolderData
 * @property {string} address - The address of the holder.
 * @property {string} balance - The balance of the holder.
 */
export interface HolderData {
    address: string;
    balance: string;
}

/**
 * Represents processed token data including security information, trade data, holder distribution trend, high value holders, recent trades,
 * high supply holders count, dex screener data, and flags indicating if the token is listed on DexScreener and if it requires payment for that listing.
 * * @typedef { Object } ProcessedTokenData
 * @property { TokenSecurityData } security - The security data of the token.
 * @property { TokenInfo } tradeData - The trade data of the token.
 * @property { string } holderDistributionTrend - The trend of holder distribution, can be 'increasing', 'decreasing', or 'stable'.
 * @property {Array<{holderAddress: string, balanceUsd: string}>} highValueHolders - Array of high value holders with their addresses and USD balance.
 * @property { boolean } recentTrades - Indicates if there have been recent trades with this token.
 * @property { number } highSupplyHoldersCount - The count of high supply holders.
 * @property { DexScreenerData } dexScreenerData - The data from DexScreener related to this token.
 * @property { boolean } isDexScreenerListed - Indicates if the token is listed on DexScreener.
 * @property { boolean } isDexScreenerPaid - Indicates if payment is required for listing on DexScreener.
 */
export interface ProcessedTokenData {
    security: TokenSecurityData;
    tradeData: TokenInfo;
    holderDistributionTrend: string; // 'increasing' | 'decreasing' | 'stable'
    highValueHolders: Array<{
        holderAddress: string;
        balanceUsd: string;
    }>;
    recentTrades: boolean;
    highSupplyHoldersCount: number;
    dexScreenerData: DexScreenerData;

    isDexScreenerListed: boolean;
    isDexScreenerPaid: boolean;
}

/**
 * Interface for DexScreenerPair object representing pair details.
 * @typedef { Object } DexScreenerPair
 * @property { string } chainId - The chain identifier.
 * @property { string } dexId - The DEX identifier.
 * @property { string } url - The URL of the pair.
 * @property { string } pairAddress - The address of the pair.
 * @property { Object } baseToken - The base token details.
 * @property { string } baseToken.address - The address of the base token.
 * @property { string } baseToken.name - The name of the base token.
 * @property { string } baseToken.symbol - The symbol of the base token.
 * @property { Object } quoteToken - The quote token details.
 * @property { string } quoteToken.address - The address of the quote token.
 * @property { string } quoteToken.name - The name of the quote token.
 * @property { string } quoteToken.symbol - The symbol of the quote token.
 * @property { string } priceNative - The price in native currency.
 * @property { string } priceUsd - The price in USD.
 * @property { Object } txns - The transaction details.
 * @property { Object } txns.m5 - The transaction details for the past 5 minutes.
 * @property { number } txns.m5.buys - The number of buys in the past 5 minutes.
 * @property { number } txns.m5.sells - The number of sells in the past 5 minutes.
 * @property { Object } txns.h1 - The transaction details for the past 1 hour.
 * @property { number } txns.h1.buys - The number of buys in the past 1 hour.
 * @property { number } txns.h1.sells - The number of sells in the past 1 hour
 * @property { Object } txns.h6 - The transaction details for the past 6 hours.
 * @property { number } txns.h6.buys - The number of buys in the past 6 hours.
 * @property { number } txns.h6.sells - The number of sells in the past 6 hours.
 * @property { Object } txns.h24 - The transaction details for the past 24 hours.
 * @property { number } txns.h24.buys - The number of buys in the past 24 hours.
 * @property { number } txns.h24.sells - The number of sells in the past 24 hours.
 * @property { Object } volume - The volume details.
 * @property { number } volume.h24 - The volume in the past 24 hours.
 * @property { number } volume.h6 - The volume in the past 6 hours.
 * @property { number } volume.h1 - The volume in the past 1 hour.
 * @property { number } volume.m5 - The volume in the past 5 minutes.
 * @property { Object } priceChange - The price change details.
 * @property { number } priceChange.m5 - The price change in the past 5 minutes.
 * @property { number } priceChange.h1 - The price change in the past 1 hour.
 * @property { number } priceChange.h6 - The price change in the past 6 hours.
 * @property { number } priceChange.h24 - The price change in the past 24 hours.
 * @property { Object } liquidity - The liquidity details.
 * @property { number } liquidity.usd - The liquidity in USD.
 * @property { number } liquidity.base - The liquidity in base token.
 * @property { number } liquidity.quote - The liquidity in quote token.
 * @property { number } fdv - The fully diluted valuation.
 * @property { number } marketCap - The market capitalization.
 * @property { number } pairCreatedAt - The timestamp when pair was created.
 * @property { Object } info - The additional information.
 * @property { string } info.imageUrl - The URL of the image.
 * @property {Object[]} info.websites - The array of website details.
 * @property { string } info.websites.label - The label of the website.
 * @property { string } info.websites.url - The URL of the website.
 * @property {Object[]} info.socials - The array of social media details.
 * @property { string } info.socials.type - The type of social media.
 * @property { string } info.socials.url - The URL of the social media.
 * @property { Object } boosts - The boost details.
 * @property { number } boosts.active - The active boost value.
 */
export interface DexScreenerPair {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
        address: string;
        name: string;
        symbol: string;
    };
    quoteToken: {
        address: string;
        name: string;
        symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
        m5: { buys: number; sells: number };
        h1: { buys: number; sells: number };
        h6: { buys: number; sells: number };
        h24: { buys: number; sells: number };
    };
    volume: {
        h24: number;
        h6: number;
        h1: number;
        m5: number;
    };
    priceChange: {
        m5: number;
        h1: number;
        h6: number;
        h24: number;
    };
    liquidity: {
        usd: number;
        base: number;
        quote: number;
    };
    fdv: number;
    marketCap: number;
    pairCreatedAt: number;
    info: {
        imageUrl: string;
        websites: { label: string; url: string }[];
        socials: { type: string; url: string }[];
    };
    boosts: {
        active: number;
    };
}

/**
 * Interface representing data returned by Dex Screener
 * @typedef {Object} DexScreenerData
 * @property {string} schemaVersion - The version of the schema
 * @property {DexScreenerPair[]} pairs - An array of DexScreenerPair objects
 */
export interface DexScreenerData {
    schemaVersion: string;
    pairs: DexScreenerPair[];
}

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
export interface Prices {
    starknet: { usd: string };
    bitcoin: { usd: string };
    ethereum: { usd: string };
}

/**
 * Interface representing the calculated buy amounts for different levels.
 *
 * @typedef {Object} CalculatedBuyAmounts
 * @property {number} none - The buy amount for none level (0).
 * @property {number} low - The buy amount for low level.
 * @property {number} medium - The buy amount for medium level.
 * @property {number} high - The buy amount for high level.
 */
export interface CalculatedBuyAmounts {
    none: 0;
    low: number;
    medium: number;
    high: number;
}
