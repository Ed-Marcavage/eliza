import { IAgentRuntime } from "@elizaos/core";
import { z } from "zod";

export const avalancheEnvSchema = z.object({
    AVALANCHE_PRIVATE_KEY: z
        .string()
        .min(1, "Avalanche private key is required"),
});

/**
 * Represents the type of configuration for Avalanche based on the schema inferred from avalancheEnvSchema.
 */
export type AvalancheConfig = z.infer<typeof avalancheEnvSchema>;
/**
 * Validates the Avalanche configuration by extracting the AVALANCHE_PRIVATE_KEY from the runtime settings or environment variables
 * and then parsing and validating the configuration using the avalancheEnvSchema.
 * 
 * @param {IAgentRuntime} runtime The runtime environment containing settings and variables
 * @returns {Promise<AvalancheConfig>} The validated Avalanche configuration
 * @throws {Error} If the configuration does not match the schema, an error with detailed messages is thrown
 */
export async function validateAvalancheConfig(
    runtime: IAgentRuntime
): Promise<AvalancheConfig> {
    try {
        const config = {
            AVALANCHE_PRIVATE_KEY:
                runtime.getSetting("AVALANCHE_PRIVATE_KEY") ||
                process.env.AVALANCHE_PRIVATE_KEY,
        };

        return avalancheEnvSchema.parse(config);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.errors
                .map((err) => `${err.path.join(".")}: ${err.message}`)
                .join("\n");
            throw new Error(errorMessages);
        }
        throw error;
    }
}
