import NodeCache from "node-cache";
import fs from "fs";
import path from "path";

/**
 * Cache class for storing data in memory and on disk.
 */
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

/**
 * Constructor function for initializing a cache with NodeCache and setting up cache directory path based on folder structure.
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
 * Reads data from a cache file based on the cache key.
 * 
 * @template T - The type of data expected to be returned
 * @param {string} cacheKey - The key used to identify the cache file
 * @returns {T | null} - The data read from the cache file, or null if the file doesn't exist or data is corrupted/expired
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
 * Writes the data associated with the given cache key to a JSON file in the cache directory.
 *
 * @template T - The type of data to be written to the cache file.
 * @param {string} cacheKey - The unique key associated with the cache data.
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
 * Get a value from the cache based on the provided cache key.
 * 
 * @param {string} cacheKey - The key to retrieve the value from the cache.
 * @returns {T | undefined} The value stored in the cache for the provided key, or undefined if the key is not found.
 */
    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

/**
 * Set a value in the cache with the given key.
 *
 * @param {string} cacheKey - The key for the cache
 * @param {T} data - The data to be stored in the cache
 * @returns {void}
 */
    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

/**
 * Retrieves data from the cache based on the cache key.
 *  If the data is found in the in-memory cache, it is returned directly.
 *  If not found, it checks the file-based cache and populates the in-memory cache if data is found.
 * 
 * @template T - The data type expected to be retrieved from the cache.
 * @param cacheKey - The key used to identify the cached data.
 * @returns The cached data if found, otherwise null.
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
 * Sets the data in both in-memory cache and file-based cache for a given cache key.
 * 
 * @template T
 * @param {string} cacheKey - The key for the cached data.
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
