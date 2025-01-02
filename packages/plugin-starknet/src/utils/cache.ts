import NodeCache from "node-cache";
import fs from "fs";
import path from "path";

/**
 * A class representing a cache for storing data with a specified time-to-live (TTL).
 */
export class Cache {
    private cache: NodeCache;
    public cacheDir: string;

/**
 * Constructor for creating a new instance of the cache manager.
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
 * Reads and returns the cached data stored in a file for the given cache key.
 * If the cached data is expired, the file is deleted and null is returned.
 * 
 * @template T
 * @param {string} cacheKey - The key used to identify the cached data file.
 * @returns {T | null} The cached data if not expired, null otherwise.
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
 * Write data to a cache file with the specified cache key
 * @template T - The type of data being written to the cache file
 * @param {string} cacheKey - The key to identify the cache data
 * @param {T} data - The data to be written to the cache file
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
 * Retrieves a value from the cache based on the provided cache key.
 * 
 * @template T - The type of the value being retrieved.
 * @param {string} cacheKey - The key used to access the value in the cache.
 * @returns {T | undefined} - The value associated with the cache key, or undefined if not found.
 */
    public get<T>(cacheKey: string): T | undefined {
        return this.cache.get<T>(cacheKey);
    }

/**
 * Sets the data into the cache with the specified cacheKey.
 * 
 * @template T The type of data being stored in the cache.
 * @param {string} cacheKey The key to use for storing the data in the cache.
 * @param {T} data The data to store in the cache.
 * @returns {void}
 */
           
    public set<T>(cacheKey: string, data: T): void {
        this.cache.set(cacheKey, data);
    }

/**
 * Retrieves data from cache based on the provided cache key.
 * 
 * @template T - The type of data to be retrieved from cache.
 * @param {string} cacheKey - The key to look up in cache.
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
 * Sets the cached data in the in-memory cache and writes it to the file-based cache.
 * 
 * @template T
 * @param {string} cacheKey - The key to store the cached data under.
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
