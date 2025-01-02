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
 * Interface for ParseCurrencyAmountOptions
 * @property {number} fixed - the fixed value for currency amount
 * @property {number} [significant] - optional significant value for currency amount
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
 * Represents configuration options for retrying a task.
 * @typedef {Object} RetryConfig
 * @property {number} [maxRetries] - The maximum number of retries allowed.
 * @property {number} [delay] - The delay in milliseconds before each retry.
 * @property {number} [maxDelay] - The maximum delay in milliseconds allowed for backoff strategy.
 * @property {function} [backoff] - A function that determines the delay for each retry based on parameters.
 */
```
export type RetryConfig = {
    maxRetries?: number;
    delay?: number;
    maxDelay?: number;
    backoff?: (retryCount: number, delay: number, maxDelay: number) => number;
};

/**
 * Retries fetching data from a URL with customizable retry logic.
 * 
 * @template T
 * @param {string} url - The URL to fetch data from.
 * @param {RequestInit} [options] - The options to be passed to the fetch function.
 * @param {RetryConfig} [config] - The configuration options for controlling the retry behavior.
 * @param {number} [config.maxRetries=3] - The maximum number of retries allowed.
 * @param {number} [config.delay=1000] - The initial delay in milliseconds before retrying.
 * @param {number} [config.maxDelay=10000] - The maximum delay in milliseconds before retrying.
 * @param {function} [config.backoff] - The custom backoff function for calculating delay between retries.
 * @returns {Promise<T>} - A Promise that resolves with the fetched data.
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
