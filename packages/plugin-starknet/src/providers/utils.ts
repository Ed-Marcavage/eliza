import { num } from "starknet";
import { HolderData } from "../types/trustDB";

/**
 * Interface representing token metrics data.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The amount of liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total token supply.
 * @property {number} ownerPercentage - The percentage owned by the token owner.
 * @property {number} creatorPercentage - The percentage owned by the token creator.
 * @property {number} top10HolderPercent - The percentage owned by the top 10 token holders.
 * @property {number} priceChange24hPercent - The percentage change in price in the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage change in price in the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets involved in transactions in the last 24 hours.
 * @property {bigint} volume24hUsd - The trading volume in USD in the last 24 hours.
 */
export interface TokenMetrics {
    liquidityUsd: bigint;
    marketCapUsd: bigint;
    totalSupply: bigint;
    ownerPercentage: number;
    creatorPercentage: number;
    top10HolderPercent: number;
    priceChange24hPercent: number;
    priceChange12hPercent: number;
    uniqueWallet24h: number;
    volume24hUsd: bigint;
}

/**
 * Interface representing trading thresholds for a cryptocurrency.
 * @typedef {object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - The volume threshold in USD for the past 24 hours.
 * @property {number} [priceChange24hPercentThreshold] - The price change threshold in percentage for the past 24 hours.
 * @property {number} [priceChange12hPercentThreshold] - The price change threshold in percentage for the past 12 hours.
 * @property {number} [top10HolderPercentThreshold] - The threshold for the percentage of top 10 holders.
 * @property {number} [uniqueWallet24hThreshold] - The threshold for unique wallets in the past 24 hours.
 * @property {number} [minimumLiquidityUsd] - The minimum liquidity threshold in USD.
 * @property {number} [minimumMarketCapUsd] - The minimum market capitalization threshold in USD.
 */
export interface TradingThresholds {
    volume24hUsdThreshold?: number;
    priceChange24hPercentThreshold?: number;
    priceChange12hPercentThreshold?: number;
    top10HolderPercentThreshold?: number;
    uniqueWallet24hThreshold?: number;
    minimumLiquidityUsd?: number;
    minimumMarketCapUsd?: number;
}

/**
 * Function to evaluate if a token should be traded based on various metrics and thresholds.
 * @param {TokenMetrics} metrics - The metrics of the token to evaluate.
 * @param {TradingThresholds} thresholds - The threshold values to be used for evaluation.
 * @returns {Object} An object containing the evaluation result and reasons.
 */
export function evaluateTokenTrading(
    metrics: TokenMetrics,
    thresholds: TradingThresholds = {}
): { shouldTrade: boolean; reasons: string[] } {
    // Default thresholds
    const {
        volume24hUsdThreshold = 1000,
        priceChange24hPercentThreshold = 10,
        priceChange12hPercentThreshold = 5,
        top10HolderPercentThreshold = 0.05,
        uniqueWallet24hThreshold = 100,
        minimumLiquidityUsd = 1000,
        minimumMarketCapUsd = 100000,
    } = thresholds;

    const reasons: string[] = [];

    // Evaluate each condition
    if (metrics.top10HolderPercent >= top10HolderPercentThreshold) {
        reasons.push("High concentration in top 10 holders");
    }

    if (metrics.volume24hUsd >= BigInt(volume24hUsdThreshold)) {
        reasons.push("High 24h trading volume");
    }

    if (metrics.priceChange24hPercent >= priceChange24hPercentThreshold) {
        reasons.push("Significant 24h price change");
    }

    if (metrics.priceChange12hPercent >= priceChange12hPercentThreshold) {
        reasons.push("Significant 12h price change");
    }

    if (metrics.uniqueWallet24h >= uniqueWallet24hThreshold) {
        reasons.push("High number of unique wallets");
    }

    if (metrics.liquidityUsd < BigInt(minimumLiquidityUsd)) {
        reasons.push("Low liquidity");
    }

    if (metrics.marketCapUsd < BigInt(minimumMarketCapUsd)) {
        reasons.push("Low market cap");
    }

    return {
        shouldTrade: reasons.length > 0,
        reasons,
    };
}

/**
 * Interface for defining the parameters required for holder analysis.
 * @typedef {Object} HolderAnalysisParams
 * @property {HolderData[]} holders - An array containing the data of individual holders.
 * @property {string} ownerBalance - The balance of the owner.
 * @property {string} creatorBalance - The balance of the creator.
 * @property {number} [thresholdPercentage] - The optional threshold percentage value.
 */
export interface HolderAnalysisParams {
    holders: HolderData[];
    ownerBalance: string;
    creatorBalance: string;
    thresholdPercentage?: number;
}

/**
 * Interface representing the result of analysis on token holders.
 * @typedef {Object} HolderAnalysisResult
 * @property {number} count - The total number of holders.
 * @property {Object[]} holders - An array of objects containing holder address and percentage of total supply.
 * @property {string} holders[].address - The address of the holder.
 * @property {number} holders[].percentage - The percentage of total supply held by the holder.
 * @property {bigint} totalSupply - The total supply of the token.
 */
export interface HolderAnalysisResult {
    count: number;
    holders: Array<{
        address: string;
        percentage: number;
    }>;
    totalSupply: bigint;
}

/**
 * Analyzes high supply holders based on the provided parameters.
 *
 * @param {HolderAnalysisParams} params - The parameters for analyzing high supply holders.
 * @returns {HolderAnalysisResult} The result of the analysis, including count of high supply holders, list of high supply holders, and total supply.
 */
export function analyzeHighSupplyHolders(
    params: HolderAnalysisParams
): HolderAnalysisResult {
    try {
        const {
            holders,
            ownerBalance,
            creatorBalance,
            thresholdPercentage = 0.02, // Default threshold of 2%
        } = params;

        const ownerBalanceBigInt = num.toBigInt(ownerBalance);
        const totalSupply = ownerBalanceBigInt + num.toBigInt(creatorBalance);

        const highSupplyHolders = holders
            .map((holder) => {
                const balance = num.toBigInt(holder.balance);
                const percentage = Number(balance) / Number(totalSupply);
                return {
                    address: holder.address,
                    percentage,
                };
            })
            .filter((holder) => holder.percentage > thresholdPercentage);

        return {
            count: highSupplyHolders.length,
            holders: highSupplyHolders,
            totalSupply,
        };
    } catch (error) {
        console.error("Error analyzing high supply holders:", error);
        return {
            count: 0,
            holders: [],
            totalSupply: BigInt(0),
        };
    }
}
