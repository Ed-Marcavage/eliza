import NodeCache from "node-cache";
import fs from "fs";
import path from "path";

/**
 * Class representing a cache with in-memory and file-based storage.
 * @constructor
 * Initializes the cache with a default time-to-live of 5 minutes.
 * Determines the cache directory based on the project structure.
 * Creates the cache directory if it does not already exist.
 */
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

/**
 * Constructor for CacheManager class
 * Initializes a NodeCache with a 5 minute cache duration
 * Determines the appropriate cache directory path based on the presence of 'eliza' folder in the filepath
 * Creates the cache directory if it does not already exist
 */
    constructor() {
        this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
        const __dirname = path.resolve();

        // Find the 'eliza' folder in the filepath and adjust the cache directory path
        const elizaIndex = __dirname.indexOf("eliza");
        if (elizaIndex !== -1) {
            const pathToEliza = __dirname.slice(0, elizaIndex + 5); // include 'eliza'
            this.cacheDir = path.join(pathToEliza, "cache");
        } else {
            this.cacheDir = path.join(__dirname, "cache");
        }

        if (!fs.existsSync(this.cacheDir)) {
            fs.mkdirSync(this.cacheDir);
        }
    }

/**
 * Read cached data from file based on the cache key.
 *
 * @template T - The type of the data to be retrieved from cache
 * @param {string} cacheKey - The key used to identify the cache file
 * @returns {T | null} The cached data if valid and not expired, or null if cache file does not exist or is expired
 */
    private readCacheFromFile<T>(cacheKey: string): T | null {
        const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, "utf-8");
                const parsed = JSON.parse(fileContent);
                const now = Date.now();
                if (now < parsed.expiry) {
                    return parsed.data as T;
                } else {
                    fs.unlinkSync(filePath);
                }
            } catch (error) {
                console.error(
                    `Error reading cache file for key ${cacheKey}:`,
                    error
                );
                // Delete corrupted cache file
                try {
                    fs.unlinkSync(filePath);
                } catch (e) {
                    console.error(`Error deleting corrupted cache file:`, e);
                }
            }
        }
        return null;
    }

/**
 * Writes data to a cache file with a specified cache key.
 * 
 * @template T - The type of data being cached.
 * @param {string} cacheKey - The key to identify the cache file.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
    private writeCacheToFile<T>(cacheKey: string, data: T): void {
        try {
            const filePath = path.join(this.cacheDir, `${cacheKey}.json`);
            const cacheData = {
                data: data,
                expiry: Date.now() + 300000, // 5 minutes in milliseconds
            };
            fs.writeFileSync(filePath, JSON.stringify(cacheData), "utf-8");
        } catch (error) {
            console.error(
                `Error writing cache file for key ${cacheKey}:`,
                error
            );
        }
    }

/**
 * Retrieve a value from the cache using the provided cache key.
 * 
 * @template T - The type of the value being retrieved from the cache
 * @param cacheKey - The key used to retrieve the value from the cache
 * @returns The value retrieved from the cache, or undefined if the key does not exist in the cache
 */
    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

/**
 * Set a value in the cache with the specified key.
 * 
 * @template T - The type of data being stored in the cache.
 * @param {string} cacheKey - The key to store the data with.
 * @param {T} data - The data to be stored in the cache.
 * @returns {void}
 */
    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

/**
 * Retrieves cached data from in-memory cache or file-based cache.
 * 
 * @template T - The type of data to be retrieved.
 * @param {string} cacheKey - The key to look up the cached data.
 * @returns {T | null} The cached data if found, or null if not found.
 */
    public getCachedData<T>(cacheKey: string): T | null {
        // Check in-memory cache first
        const cachedData = this.cache.get<T>(cacheKey);
        if (cachedData !== undefined) {
            return cachedData;
        }

        // Check file-based cache
        const fileCachedData = this.readCacheFromFile<T>(cacheKey);
        if (fileCachedData) {
            // Populate in-memory cache
            this.cache.set(cacheKey, fileCachedData);
            return fileCachedData;
        }

        return null;
    }

/**
 * Set the data in the cache under the given cache key, both in-memory and file-based.
 * 
 * @template T - The type of data being cached
 * @param {string} cacheKey - The unique key to identify the cached data
 * @param {T} data - The data to be cached
 * @returns {void}
 */
    public setCachedData<T>(cacheKey: string, data: T): void {
        // Set in-memory cache
        this.cache.set(cacheKey, data);

        // Write to file-based cache
        this.writeCacheToFile(cacheKey, data);
    }
}
