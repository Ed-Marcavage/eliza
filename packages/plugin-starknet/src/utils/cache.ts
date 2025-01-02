import NodeCache from "node-cache";
import fs from "fs";
import path from "path";

/**
 * Class representing a Cache with both in-memory and file-based caching functionalities.
 * @class Cache
 */
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

/**
 * Constructor for creating a new instance of CacheManager.
 * Initializes a NodeCache with a standard time-to-live of 5 minutes.
 * Determines the appropriate cache directory path based on the presence of 'eliza' folder in the current filepath.
 * If 'eliza' folder is found, the cache directory path is set relative to 'eliza', otherwise it is set relative to the current directory.
 * If the cache directory does not exist, it is created synchronously using fs.mkdirSync.
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
 * Reads and retrieves data from a cache file based on the provided cacheKey.
 * 
 * @template T - The type of data expected to be retrieved from the cache file.
 * @param {string} cacheKey - The key used to identify the cache file to read from.
 * @returns {T | null} - The data retrieved from the cache file if found and valid, or null if the cache file doesn't exist or is corrupted.
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
 * Retrieves a value from the cache using the specified cache key.
 * @template T
 * @param {string} cacheKey - The key for retrieving the value from the cache.
 * @returns {T | undefined} The value stored in the cache for the specified key, or undefined if not found.
 */
    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

/**
 * Set the data to the cache with the specified cache key.
 * 
 * @param {string} cacheKey - The key used to cache the data.
 * @param {T} data - The data to be cached.
 * @returns {void}
 */
    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

/**
 * Retrieves data from the cache using the provided cache key.
 * 
 * @template T - The type of the data to retrieve
 * @param cacheKey - The key to use when retrieving data from the cache
 * @returns The cached data if found, or null if the data is not found in either in-memory or file-based cache
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
 * Set the data in the in-memory cache and write it to file-based cache.
 * 
 * @param {string} cacheKey - The key to use for caching the data.
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
