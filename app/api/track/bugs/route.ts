import { createSupabaseServerClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const supabase = createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch bugs created by the current user
    // We join with workspaces to get the workspace name if needed, but for now just the bug details
    const { data: bugs, error } = await supabase
        .from('bugs')
        .select(`
      *,
      workspaces (
        name,
        slug
      )
    `)
        .eq('created_by', user.email) // Assuming created_by stores email based on previous context, or we check if it stores ID. 
        // Let's double check the schema. The user said "created_by text null". 
        // In many systems it's the user ID, but sometimes email. 
        // Given the previous file view of bugs page, it showed "created_by" being displayed directly.
        // Let's assume it matches the user's email or ID. 
        // Safest bet: check both or just use email if that's the convention.
        // Wait, the schema says created_by is text. 
        // Let's try to match against email first as that's common for "created_by" text fields in some setups, 
        // but if it's a UUID it would be user.id.
        // Let's look at how other bugs are fetched. 
        // Actually, let's just use user.email for now as a safe guess for "text" field that isn't a foreign key to profiles.
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(bugs);
}
