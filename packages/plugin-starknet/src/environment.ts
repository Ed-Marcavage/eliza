import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

const STARKNET_PUBLIC_RPC = "https://starknet-mainnet.public.blastapi.io";

export const starknetEnvSchema = z.object({
    STARKNET_ADDRESS: z.string().min(1, "Starknet address is required"),
    STARKNET_PRIVATE_KEY: z.string().min(1, "Starknet private key is required"),
    STARKNET_RPC_URL: z.string().min(1, "Starknet RPC URL is required"),
});

/**
 * Type definition for StarknetConfig based on the inferred type from starknetEnvSchema.
 */
export type StarknetConfig = z.infer<typeof starknetEnvSchema>;

/**
 * Validates the Starknet configuration by checking if required settings are present in the runtime or environment variables.
 * @param {IAgentRuntime} runtime - The Agent runtime interface.
 * @returns {Promise<StarknetConfig>} - A Promise that resolves with the validated Starknet configuration.
 * @throws {Error} - If the configuration validation fails, an error is thrown with the validation error messages.
 */
export async function validateStarknetConfig(
    runtime: IAgentRuntime
): Promise<StarknetConfig> {
    try {
        const config = {
            STARKNET_ADDRESS:
                runtime.getSetting("STARKNET_ADDRESS") ||
                process.env.STARKNET_ADDRESS,
            STARKNET_PRIVATE_KEY:
                runtime.getSetting("STARKNET_PRIVATE_KEY") ||
                process.env.STARKNET_PRIVATE_KEY,
            STARKNET_RPC_URL:
                runtime.getSetting("STARKNET_RPC_URL") ||
                process.env.STARKNET_RPC_URL ||
                STARKNET_PUBLIC_RPC,
        };

        return starknetEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(
                `Starknet configuration validation failed:\n${errorMessages}`
            );
        }
        throw error;
    }
}
