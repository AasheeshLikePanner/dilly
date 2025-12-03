import { Redis } from '@upstash/redis';

// Singleton Redis instance
let redis: Redis | null = null;

export function getRedisClient(): Redis {
    if (!redis) {
        const url = process.env.UPSTASH_REDIS_REST_URL;
        const token = process.env.UPSTASH_REDIS_REST_TOKEN;

        if (!url || !token) {
            throw new Error('Redis credentials not configured. Please set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN');
        }

        redis = new Redis({
            url,
            token,
        });
    }

    return redis;
}

// Cache TTLs (in seconds)
export const CACHE_TTL = {
    WORKSPACE: 3600, // 1 hour
    API_KEY: 1800, // 30 minutes
    WORKSPACE_MEMBERS: 600, // 10 minutes
} as const;
