import { TokenInfo } from "./token";

/**
 * Interface representing the security data related to a token.
 * @typedef {Object} TokenSecurityData
 * @property {string} ownerBalance - The balance of the token's owner.
 * @property {string} creatorBalance - The balance of the token's creator.
 * @property {number} ownerPercentage - The percentage of the token owned by the owner.
 * @property {number} creatorPercentage - The percentage of the token owned by the creator.
 * @property {string} top10HolderBalance - The balance of the top 10 token holders.
 * @property {number} top10HolderPercent - The percentage owned by the top 10 token holders.
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
 * Interface representing trade data for a specific token.
 * @typedef { Object } TokenTradeData
 * @property { string } address - The token address
 * @property { number } holder - Number of token holders
 * @property { number } market - Token market
 * @property { number } last_trade_unix_time - Unix timestamp of the last trade
 * @property { string } last_trade_human_time - Human-readable timestamp of the last trade
 * @property { number } price - Token price
 * @property { number } history_30m_price - Price history for the last 30 minutes
 * @property { number } price_change_30m_percent - Price change percentage for the last 30 minutes
 * ...
 * @property {number | null} volume_8h_change_percent - Volume change percentage for the last 8 hours
 * @property { number } volume_buy_8h - Volume of token bought in the last 8 hours
 * @property { number } volume_buy_8h_usd - USD value of token bought in the last 8 hours
 * ...
 * @property {number | null} volume_sell_24h_change_percent - Volume sell change percentage for the last 24 hours
 * @property { number } trade_24h - Number of trades in the last 24 hours
 * @property { number } trade_history_24h - Trade history for the last 24 hours
 * ...
 * @property { number } volume_sell_24h_usd - USD value of tokens sold in the last 24 hours
 * @property { number } volume_sell_history_24h - Historical volume of tokens sold in the last 24 hours
 * @property { number } volume_sell_history_24h_usd - Historical USD value of tokens sold in the last 24 hours
 * @property {number | null} volume_sell_24h_change_percent - Volume sell change percentage for the last 24 hours
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
 * Interface representing an object containing a holder's data.
 * @property {string} address - The address associated with the holder.
 * @property {string} balance - The balance associated with the holder.
 */
export interface HolderData {
    address: string;
    balance: string;
}

/**
 * Interface representing processed token data
 * @interface ProcessedTokenData
 * @property {TokenSecurityData} security - Object containing security data of the token
 * @property {TokenInfo} tradeData - Object containing information about token trades
 * @property {string} holderDistributionTrend - Trend of holder distribution ('increasing' | 'decreasing' | 'stable')
 * @property {Array<{holderAddress: string, balanceUsd: string}>} highValueHolders - Array of objects representing high value holders
 * @property {boolean} recentTrades - Flag indicating if there are recent trades for the token
 * @property {number} highSupplyHoldersCount - Count of high supply holders
 * @property {DexScreenerData} dexScreenerData - Object containing data from Dex Screener
 * @property {boolean} isDexScreenerListed - Flag indicating if the token is listed in Dex Screener
 * @property {boolean} isDexScreenerPaid - Flag indicating if the token is paid for in Dex Screener
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
 * Interface representing a pair on DexScreener.
 * @typedef {object} DexScreenerPair
 * @property {string} chainId - The chain ID.
 * @property {string} dexId - The Dex ID.
 * @property {string} url - The URL of the pair.
 * @property {string} pairAddress - The pair address.
 * @property {object} baseToken - The base token information.
 * @property {string} baseToken.address - The address of the base token.
 * @property {string} baseToken.name - The name of the base token.
 * @property {string} baseToken.symbol - The symbol of the base token.
 * @property {object} quoteToken - The quote token information.
 * @property {string} quoteToken.address - The address of the quote token.
 * @property {string} quoteToken.name - The name of the quote token.
 * @property {string} quoteToken.symbol - The symbol of the quote token.
 * @property {string} priceNative - The price in native currency.
 * @property {string} priceUsd - The price in USD.
 * @property {object} txns - Transaction information.
 * @property {object} txns.m5 - Last 5 minutes transaction volume.
 * @property {number} txns.m5.buys - Number of buys in last 5 minutes.
 * @property {number} txns.m5.sells - Number of sells in last 5 minutes.
 * @property {object} volume - Volume information.
 * @property {number} volume.h24 - Volume in last 24 hours.
 * @property {number} volume.h6 - Volume in last 6 hours.
 * @property {number} volume.h1 - Volume in last 1 hour.
 * @property {number} volume.m5 - Volume in last 5 minutes.
 * @property {object} priceChange - Price change information.
 * @property {number} priceChange.m5 - Price change in last 5 minutes.
 * @property {number} priceChange.h1 - Price change in last 1 hour.
 * @property {number} priceChange.h6 - Price change in last 6 hours.
 * @property {number} priceChange.h24 - Price change in last 24 hours.
 * @property {object} liquidity - Liquidity information.
 * @property {number} liquidity.usd - Liquidity in USD.
 * @property {number} liquidity.base - Liquidity in base token.
 * @property {number} liquidity.quote - Liquidity in quote token.
 * @property {number} fdv - Fully diluted valuation.
 * @property {number} marketCap - Market capitalization.
 * @property {number} pairCreatedAt - Timestamp of pair creation.
 * @property {object} info - Additional information.
 * @property {string} info.imageUrl - URL of the image.
 * @property {Array<{label: string, url: string}>} info.websites - Array of websites associated with the pair.
 * @property {Array<{type: string, url: string}>} info.socials - Array of social media links associated with the pair.
 * @property {object} boosts - Boosts information.
 * @property {number} boosts.active - Number of active boosts.
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
 * Interface representing data returned by a Dex Screener.
 * @typedef {object} DexScreenerData
 * @property {string} schemaVersion - The version of the schema.
 * @property {DexScreenerPair[]} pairs - An array of DexScreenerPair objects.
 */
export interface DexScreenerData {
    schemaVersion: string;
    pairs: DexScreenerPair[];
}

/**
 * Interface representing prices of different cryptocurrencies in USD.
 * @typedef {object} Prices
 * @property {object} starknet - Object containing the price of starknet in USD.
 * @property {string} starknet.usd - The price of starknet in USD.
 * @property {object} bitcoin - Object containing the price of bitcoin in USD.
 * @property {string} bitcoin.usd - The price of bitcoin in USD.
 * @property {object} ethereum - Object containing the price of ethereum in USD.
 * @property {string} ethereum.usd - The price of ethereum in USD.
 */
export interface Prices {
    starknet: { usd: string };
    bitcoin: { usd: string };
    ethereum: { usd: string };
}

/**
 * Interface representing calculated buy amounts.
 * @typedef {Object} CalculatedBuyAmounts
 * @property {number} none - The buy amount when it is none.
 * @property {number} low - The buy amount when it is low.
 * @property {number} medium - The buy amount when it is medium.
 * @property {number} high - The buy amount when it is high.
 */
export interface CalculatedBuyAmounts {
    none: 0;
    low: number;
    medium: number;
    high: number;
}
