
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create a Supabase client with the Admin key
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if images bucket already exists
    const { data: buckets, error: listError } = await supabaseAdmin
      .storage
      .listBuckets();

    const imagesBucketExists = buckets?.some(bucket => bucket.name === 'images');

    if (!imagesBucketExists) {
      // Create the images bucket
      const { error: createError } = await supabaseAdmin
        .storage
        .createBucket('images', {
          public: true, // Make the bucket public
          fileSizeLimit: 10485760, // 10MB
        });

      if (createError) {
        throw createError;
      }

      console.log('Successfully created images bucket');
      
      // Set up a policy to allow public access
      const { error: policyError } = await supabaseAdmin
        .storage
        .from('images')
        .createSignedUrl('dummy.txt', 60); // This is just to initialize the bucket
        
      if (policyError && !policyError.message.includes('not found')) {
        throw policyError;
      }
    } else {
      console.log('Images bucket already exists');
    }

    return new Response(
      JSON.stringify({ message: 'Storage bucket setup complete' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
