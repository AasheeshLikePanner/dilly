import { getRedisClient, CACHE_TTL } from '../redis';
import { createSupabaseServerClient } from '../supabase-server';
import bcrypt from 'bcryptjs';

interface ApiKeyData {
    id: string;
    user_id: string;
    workspace_id: string | null;
    is_active: boolean;
    expires_at: string | null;
    secret_hash: string;
}

export async function validateApiKey(publicId: string, secret: string): Promise<ApiKeyData | null> {
    const redis = getRedisClient();
    const cacheKey = `apikey:${publicId}`;

    let apiKeyData: ApiKeyData | null = null;

    try {
        // Try cache first
        const cached = await redis.get<ApiKeyData>(cacheKey);
        if (cached) {
            console.log(`[Cache HIT] API Key: ${publicId}`);
            apiKeyData = cached;
        }
    } catch (error) {
        console.error('Redis get error:', error);
    }

    // If not in cache, fetch from database
    if (!apiKeyData) {
        console.log(`[Cache MISS] API Key: ${publicId}`);

        const supabase = await createSupabaseServerClient();
        const { data: key, error } = await supabase
            .from('api_keys')
            .select('id, user_id, is_active, expires_at, secret_hash, workspace_id')
            .eq('public_id', publicId)
            .eq('is_active', true)
            .maybeSingle();

        if (error || !key) {
            return null;
        }

        apiKeyData = key as ApiKeyData;

        // Cache the key data
        try {
            await redis.setex(cacheKey, CACHE_TTL.API_KEY, apiKeyData);
        } catch (error) {
            console.error('Redis set error:', error);
        }
    }

    // Check expiration
    if (apiKeyData.expires_at && new Date(apiKeyData.expires_at) < new Date()) {
        return null;
    }

    // Verify secret
    const isMatch = await bcrypt.compare(secret, apiKeyData.secret_hash);
    if (!isMatch) {
        return null;
    }

    return apiKeyData;
}

export async function invalidateApiKeyCache(publicId: string) {
    const redis = getRedisClient();

    try {
        await redis.del(`apikey:${publicId}`);
        console.log(`[Cache INVALIDATE] API Key: ${publicId}`);
    } catch (error) {
        console.error('Redis delete error:', error);
    }
}
