
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

    if (listError) {
      throw listError;
    }

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
      
      // Set up public read policy for the images bucket
      const { error: readPolicyError } = await supabaseAdmin
        .storage
        .from('images')
        .createPolicy(
          'public-read',
          {
            name: 'Public Read Policy',
            definition: {
              statements: [
                {
                  effect: 'allow',
                  action: 'select',
                  role: 'anon',
                },
              ],
            },
          }
        );
        
      if (readPolicyError) {
        console.error('Read policy creation error:', readPolicyError);
      }

      // Set up public upload policy for the images bucket
      const { error: uploadPolicyError } = await supabaseAdmin
        .storage
        .from('images')
        .createPolicy(
          'public-upload',
          {
            name: 'Public Upload Policy',
            definition: {
              statements: [
                {
                  effect: 'allow',
                  action: 'insert',
                  role: 'anon',
                },
              ],
            },
          }
        );
        
      if (uploadPolicyError) {
        console.error('Upload policy creation error:', uploadPolicyError);
      }
      
      // Set up public update policy for the images bucket
      const { error: updatePolicyError } = await supabaseAdmin
        .storage
        .from('images')
        .createPolicy(
          'public-update',
          {
            name: 'Public Update Policy',
            definition: {
              statements: [
                {
                  effect: 'allow',
                  action: 'update',
                  role: 'anon',
                },
              ],
            },
          }
        );
        
      if (updatePolicyError) {
        console.error('Update policy creation error:', updatePolicyError);
      }
    } else {
      console.log('Images bucket already exists');
    }

    return new Response(
      JSON.stringify({ message: 'Storage bucket setup complete', bucketExists: imagesBucketExists }),
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
