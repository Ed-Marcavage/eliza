import { num } from "starknet";
import { HolderData } from "../types/trustDB";

/**
 * Interface representing token metrics.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total supply.
 * @property {number} ownerPercentage - The percentage owned by the owner.
 * @property {number} creatorPercentage - The percentage owned by the creator.
 * @property {number} top10HolderPercent - The percentage held by the top 10 holders.
 * @property {number} priceChange24hPercent - The percentage change in price in the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage change in price in the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets in the last 24 hours.
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
 * Interface representing trading thresholds for a specific asset.
 * @typedef {Object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - The threshold for 24-hour trading volume in USD.
 * @property {number} [priceChange24hPercentThreshold] - The threshold for 24-hour price change percentage.
 * @property {number} [priceChange12hPercentThreshold] - The threshold for 12-hour price change percentage.
 * @property {number} [top10HolderPercentThreshold] - The threshold for percentage of top 10 holders.
 * @property {number} [uniqueWallet24hThreshold] - The threshold for unique wallets in the past 24 hours.
 * @property {number} [minimumLiquidityUsd] - The minimum liquidity threshold in USD.
 * @property {number} [minimumMarketCapUsd] - The minimum market cap threshold in USD.
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
 * Evaluates whether a token meets the specified trading thresholds based on provided metrics.
 * @param {TokenMetrics} metrics - The metrics of the token to evaluate.
 * @param {TradingThresholds} thresholds - The thresholds for trading (default values provided).
 * @return {{ shouldTrade: boolean; reasons: string[] }} An object containing whether the token should trade and the reasons for the evaluation.
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
 * Interface representing the parameters for analyzing holders.
 * @typedef {object} HolderAnalysisParams
 * @property {HolderData[]} holders - Array of HolderData objects
 * @property {string} ownerBalance - The balance of the owner
 * @property {string} creatorBalance - The balance of the creator
 * @property {number} [thresholdPercentage] - Optional threshold percentage
 */
export interface HolderAnalysisParams {
    holders: HolderData[];
    ownerBalance: string;
    creatorBalance: string;
    thresholdPercentage?: number;
}

/**
 * Interface representing the result of an analysis on token holders.
 * @typedef {Object} HolderAnalysisResult
 * @property {number} count - The number of holders.
 * @property {Array<{ address: string, percentage: number }>} holders - An array of objects representing each holder's address and percentage.
 * @property {bigint} totalSupply - The total supply of tokens.
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
 * Analyze high supply holders based on the given parameters.
 *
 * @param {HolderAnalysisParams} params - Parameters for holder analysis.
 * @returns {HolderAnalysisResult} Result of the analysis, including count, high supply holders, and total supply.
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
