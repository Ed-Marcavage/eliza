import { Address } from "viem";

/**
 * Interface representing a YakSwapQuote object.
 * @typedef {Object} YakSwapQuote
 * @property {bigint[]} amounts - Array of amounts for the swap.
 * @property {Address[]} adapters - Array of adapter addresses used for the swap.
 * @property {Address[]} path - Array of addresses representing the swap path.
 * @property {bigint} gasEstimate - Gas estimate for the swap.
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
 * Interface representing the parameters required for creating a TokenMill market.
 * @typedef {object} TokenMillMarketCreationParameters
 * @property {number} tokenType - The type of the token.
 * @property {string} name - The name of the token.
 * @property {string} symbol - The symbol of the token.
 * @property {Address} quoteToken - The address of the quote token.
 * @property {bigint} totalSupply - The total supply of the token.
 * @property {number} creatorShare - The share for the creator.
 * @property {number} stakingShare - The share for staking.
 * @property {bigint[]} bidPrices - The bid prices for the market.
 * @property {bigint[]} askPrices - The ask prices for the market.
 * @property {string} args - Additional arguments for the market creation.
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