import { Address } from "viem";

/**
 * Interface representing a YakSwapQuote
 * @property {bigint[]} amounts - An array of amounts
 * @property {Address[]} adapters - An array of addresses
 * @property {Address[]} path - An array of addresses
 * @property {bigint} gasEstimate - The gas estimate
 */
interface YakSwapQuote {
    amounts: bigint[];
    adapters: Address[];
    path: Address[];
    gasEstimate: bigint;
}

// struct MarketCreationParameters {
//     uint96 tokenType;
//     string name;
//     string symbol;
//     address quoteToken;
//     uint256 totalSupply;
//     uint16 creatorShare;
//     uint16 stakingShare;
//     uint256[] bidPrices;
//     uint256[] askPrices;
//     bytes args;
// }
/**
 * Interface for defining parameters required for creating a TokenMill market.
 * @typedef {Object} TokenMillMarketCreationParameters
 * @property {number} tokenType - Type of the token.
 * @property {string} name - Name of the token.
 * @property {string} symbol - Symbol of the token.
 * @property {Address} quoteToken - Address of the quote token.
 * @property {bigint} totalSupply - Total supply of the token.
 * @property {number} creatorShare - Creator's share in the market.
 * @property {number} stakingShare - Staking share in the market.
 * @property {bigint[]} bidPrices - Array of bid prices.
 * @property {bigint[]} askPrices - Array of ask prices.
 * @property {string} args - Additional arguments.
 */
interface TokenMillMarketCreationParameters {
    tokenType: number;
    name: string;
    symbol: string;
    quoteToken: Address;
    totalSupply: bigint;
    creatorShare: number;
    stakingShare: number;
    bidPrices: bigint[];
    askPrices: bigint[];
    args: string;
}

export type { YakSwapQuote, TokenMillMarketCreationParameters }