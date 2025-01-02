import NodeCache from "node-cache";
import fs from "fs";
import path from "path";

/**
 * A class representing a caching mechanism with both in-memory and file-based storage.
 * @class Cache
 */
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

/**
 * Constructor function for creating a cache instance.
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
 * Reads cached data from a file based on the provided cache key.
 * If the cache file exists and has not expired, returns the cached data.
 * If the cache file does not exist or has expired, returns null.
 * 
 * @template T - The type of data being read from the cache file.
 * @param {string} cacheKey - The unique key used to identify the cache file.
 * @returns {T | null} The cached data if it is valid, otherwise null.
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
 * Writes the provided data to a JSON file in the cache directory.
 * 
 * @template T
 * @param {string} cacheKey - The key to identify the cache file.
 * @param {T} data - The data to be stored in the cache file.
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
 * Get a value from the cache with the given key.
 * 
 * @param cacheKey - The key to lookup in the cache.
 * @returns The value corresponding to the key in the cache, or `undefined` if not found.
 */
    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

/**
 * Sets a value in the cache with the specified key.
 * 
 * @param {string} cacheKey - The key to set the value with.
 * @param {T} data - The data to store in the cache.
 * @returns {void}
 */
    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

/**
 * Retrieves cached data based on the provided cache key.
 * 
 * @template T - The type of data to be retrieved.
 * @param {string} cacheKey - The key to identify the cached data.
 * @returns {T | null} The cached data if found, otherwise null.
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
 * Set cached data in memory and write to file-based cache using the provided cache key and data.
 * 
 * @param {string} cacheKey - The key used to access the cached data.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
    public setCachedData<T>(cacheKey: string, data: T): void {
        // Set in-memory cache
        this.cache.set(cacheKey, data);

        // Write to file-based cache
        this.writeCacheToFile(cacheKey, data);
    }
}
