import { getRedisClient, CACHE_TTL } from '../redis';
import { createSupabaseServerClient } from '../supabase-server';

export async function getWorkspaceById(workspaceId: string) {
    const redis = getRedisClient();
    const cacheKey = `workspace:id:${workspaceId}`;

    try {
        // Try cache first
        const cached = await redis.get(cacheKey);
        if (cached) {
            console.log(`[Cache HIT] Workspace by ID: ${workspaceId}`);
            return cached;
        }
    } catch (error) {
        console.error('Redis get error:', error);
        // Fall through to database
    }

    console.log(`[Cache MISS] Workspace by ID: ${workspaceId}`);

    // Cache miss - fetch from database
    const supabase = await createSupabaseServerClient();
    const { data: workspace, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('id', workspaceId)
        .single();

    if (error || !workspace) {
        return null;
    }

    // Store in cache
    try {
        await redis.setex(cacheKey, CACHE_TTL.WORKSPACE, workspace);
    } catch (error) {
        console.error('Redis set error:', error);
    }

    return workspace;
}

export async function getWorkspaceBySlug(slug: string) {
    const redis = getRedisClient();
    const cacheKey = `workspace:slug:${slug}`;

    try {
        const cached = await redis.get(cacheKey);
        if (cached) {
            console.log(`[Cache HIT] Workspace by slug: ${slug}`);
            return cached;
        }
    } catch (error) {
        console.error('Redis get error:', error);
    }

    console.log(`[Cache MISS] Workspace by slug: ${slug}`);

    const supabase = await createSupabaseServerClient();
    const { data: workspace, error } = await supabase
        .from('workspaces')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !workspace) {
        return null;
    }

    try {
        await redis.setex(cacheKey, CACHE_TTL.WORKSPACE, workspace);
        // Also cache by ID for faster lookups
        await redis.setex(`workspace:id:${workspace.id}`, CACHE_TTL.WORKSPACE, workspace);
    } catch (error) {
        console.error('Redis set error:', error);
    }

    return workspace;
}

export async function invalidateWorkspaceCache(workspaceId: string, slug?: string) {
    const redis = getRedisClient();

    try {
        await redis.del(`workspace:id:${workspaceId}`);
        if (slug) {
            await redis.del(`workspace:slug:${slug}`);
        }
        console.log(`[Cache INVALIDATE] Workspace: ${workspaceId}`);
    } catch (error) {
        console.error('Redis delete error:', error);
    }
}
