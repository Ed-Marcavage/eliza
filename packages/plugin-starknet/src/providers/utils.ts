import { num } from "starknet";
import { HolderData } from "../types/trustDB";

/**
 * Represents the metrics associated with a token.
 * @typedef {Object} TokenMetrics
 * @property {bigint} liquidityUsd - The liquidity in USD.
 * @property {bigint} marketCapUsd - The market capitalization in USD.
 * @property {bigint} totalSupply - The total supply of the token.
 * @property {number} ownerPercentage - The percentage owned by the token owner.
 * @property {number} creatorPercentage - The percentage owned by the token creator.
 * @property {number} top10HolderPercent - The percentage owned by the top 10 token holders.
 * @property {number} priceChange24hPercent - The percentage change in price over the last 24 hours.
 * @property {number} priceChange12hPercent - The percentage change in price over the last 12 hours.
 * @property {number} uniqueWallet24h - The number of unique wallets transacting in the last 24 hours.
 * @property {bigint} volume24hUsd - The trading volume in USD over the last 24 hours.
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
 * @typedef {Object} TradingThresholds
 * @property {number} [volume24hUsdThreshold] - The volume 24h USD threshold.
 * @property {number} [priceChange24hPercentThreshold] - The price change 24h percent threshold.
 * @property {number} [priceChange12hPercentThreshold] - The price change 12h percent threshold.
 * @property {number} [top10HolderPercentThreshold] - The top 10 holder percent threshold.
 * @property {number} [uniqueWallet24hThreshold] - The unique wallet 24h threshold.
 * @property {number} [minimumLiquidityUsd] - The minimum liquidity USD threshold.
 * @property {number} [minimumMarketCapUsd] - The minimum market cap USD threshold.
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
 * Evaluate whether a token should be traded based on the provided metrics and thresholds.
 * @param {TokenMetrics} metrics - The metrics of the token to evaluate.
 * @param {TradingThresholds} [thresholds={}] - The thresholds for trading decisions (optional).
 * @returns {{ shouldTrade: boolean, reasons: string[] }} - An object indicating whether the token should be traded and the reasons for the decision.
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
 * Interface for defining parameters needed for holder analysis.
 * @typedef {Object} HolderAnalysisParams
 * @property {HolderData[]} holders - The list of holder data to be analyzed.
 * @property {string} ownerBalance - The balance of the owner account.
 * @property {string} creatorBalance - The balance of the creator account.
 * @property {number} [thresholdPercentage] - The optional threshold percentage for analysis.
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
 * @property {number} count - The total number of holders.
 * @property {Array<{ address: string, percentage: number }>} holders - An array of objects containing holder address and percentage of total supply held.
 * @property {bigint} totalSupply - The total supply of the token in bigint format.
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
 * Analyzes the high supply holders based on the provided parameters.
 *
 * @param {HolderAnalysisParams} params - The parameters for analyzing the high supply holders.
 * @returns {HolderAnalysisResult} The analysis result including the count of high supply holders, their details, and the total supply.
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
