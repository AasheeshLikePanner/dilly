import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  console.log('--- Starting Feedback Insert Test ---');

  // 1. Check for environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    console.error('Test Insert Error: Missing Supabase URL or Service Role Key in .env.local');
    return NextResponse.json(
      { error: 'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable.' },
      { status: 500 }
    );
  }
  console.log('Test Insert: Environment variables found.');

  // 2. Create Admin Client
  const supabaseAdmin = createClient(supabaseUrl, serviceKey);
  console.log('Test Insert: Supabase admin client created.');

  // 3. Attempt to insert a hardcoded row
  const testFeedback = {
    // NOTE: You must have a valid workspace with this UUID in your 'workspaces' table.
    // If you don't have this one, change it to one that exists.
    workspace_id: '9564874e-d630-4796-8456-412c5ddb171f',
    type: 'test',
    comment: 'This is a test insert from the test API route.',
    source: 'test-route',
  };

  console.log('Test Insert: Attempting to insert data:', testFeedback);
  const { data, error } = await supabaseAdmin
    .from('feedback')
    .insert(testFeedback)
    .select()
    .single();

  // 4. Handle response
  if (error) {
    console.error('Test Insert: Database error:', error);
    return NextResponse.json({
      message: 'The test insert failed. See the server logs for the database error.',
      db_error: error,
    }, { status: 500 });
  }

  console.log('--- Test Insert Successful! ---');
  console.log('Test Insert: Created data:', data);
  return NextResponse.json({
    message: 'Success! A test record was inserted into the feedback table.',
    data: data,
  });
}
