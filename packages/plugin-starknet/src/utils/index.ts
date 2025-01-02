import { elizaLogger, IAgentRuntime } from "@elizaos/core";
import { Fraction, Percent } from "@uniswap/sdk-core";
import { Account, Contract, RpcProvider } from "starknet";

export const getTokenBalance = async (
    runtime: IAgentRuntime,
    tokenAddress: string
) => {
    const provider = getStarknetProvider(runtime);

    const { abi: tokenAbi } = await provider.getClassAt(tokenAddress);
    if (tokenAbi === undefined) {
        throw new Error("no abi.");
    }

    const tokenContract = new Contract(tokenAbi, tokenAddress, provider);

    tokenContract.connect(getStarknetAccount(runtime));

    return await tokenContract.balanceOf(tokenAddress);
};

export const getStarknetProvider = (runtime: IAgentRuntime) => {
    return new RpcProvider({
        nodeUrl: runtime.getSetting("STARKNET_RPC_URL"),
    });
};

export const getStarknetAccount = (runtime: IAgentRuntime) => {
    return new Account(
        getStarknetProvider(runtime),
        runtime.getSetting("STARKNET_ADDRESS"),
        runtime.getSetting("STARKNET_PRIVATE_KEY")
    );
};

export const getPercent = (amount: string | number, decimals: number) => {
    return new Percent(amount, decimals);
};

export const parseFormatedAmount = (amount: string) => amount.replace(/,/g, "");

export const PERCENTAGE_INPUT_PRECISION = 2;

export const parseFormatedPercentage = (percent: string) =>
    new Percent(
        +percent * 10 ** PERCENTAGE_INPUT_PRECISION,
        100 * 10 ** PERCENTAGE_INPUT_PRECISION
    );

/**
 * Interface for options when parsing currency amounts.
 * @typedef {Object} ParseCurrencyAmountOptions
 * @property {number} fixed - The number of decimal places to round to.
 * @property {number} [significant] - The number of significant digits to round to.
 */
interface ParseCurrencyAmountOptions {
    fixed: number;
    significant?: number;
}

export const formatCurrenyAmount = (
    amount: Fraction,
    { fixed, significant = 1 }: ParseCurrencyAmountOptions
) => {
    const fixedAmount = amount.toFixed(fixed);
    const significantAmount = amount.toSignificant(significant);

    if (+significantAmount > +fixedAmount) return significantAmount;
    else return +fixedAmount.toString();
};

export const formatPercentage = (percentage: Percent) => {
    const formatedPercentage = +percentage.toFixed(2);
    const exact = percentage.equalTo(
        new Percent(Math.round(formatedPercentage * 100), 10000)
    );

    return `${exact ? "" : "~"}${formatedPercentage}%`;
};

/**
 * Represents a configuration object for retrying operations.
 * @typedef {Object} RetryConfig
 * @property {number} [maxRetries] - The maximum number of retries allowed.
 * @property {number} [delay] - The initial delay before the first retry.
 * @property {number} [maxDelay] - The maximum delay allowed for retries.
 * @property {Function} [backoff] - A function that calculates the delay between retries based on parameters.
 */
export type RetryConfig = {
    maxRetries?: number;
    delay?: number;
    maxDelay?: number;
    backoff?: (retryCount: number, delay: number, maxDelay: number) => number;
};

/**
 * Fetches data from a URL with retry mechanism based on the provided configuration.
 * @template T
 * @param {string} url The URL to fetch data from.
 * @param {RequestInit} [options] The options to be passed to the fetch API.
 * @param {RetryConfig} [config] The configuration object for retry settings.
 * @param {number} [config.maxRetries=3] The maximum number of allowed retries.
 * @param {number} [config.delay=1000] The base delay in milliseconds between retries.
 * @param {number} [config.maxDelay=10000] The maximum delay in milliseconds between retries.
 * @param {function} [config.backoff] The backoff function that determines the delay between retries.
 * @returns {Promise<T>} A promise that resolves with the fetched data if successful.
 * @throws {Error} If the maximum number of retries is exhausted and the fetch still fails.
 */
export async function fetchWithRetry<T>(
    url: string,
    options?: RequestInit,
    config: RetryConfig = {}
): Promise<T> {
    const {
        maxRetries = 3,
        delay = 1000,
        maxDelay = 10000,
        backoff = (retryCount, baseDelay, maxDelay) =>
            Math.min(baseDelay * Math.pow(2, retryCount), maxDelay),
    } = config;

    let lastError: Error | null = null;

    for (let retryCount = 0; retryCount <= maxRetries; retryCount++) {
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                throw new Error(
                    `Coingecko API HTTP status: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            elizaLogger.debug(`Error fetching ${url}:`, error);
            lastError = error as Error;

            if (retryCount === maxRetries) break;

            await new Promise((resolve) =>
                setTimeout(resolve, backoff(retryCount, delay, maxDelay))
            );
            elizaLogger.debug(`Retry #${retryCount + 1} to fetch ${url}...`);
        }
    }

    throw lastError;
}
