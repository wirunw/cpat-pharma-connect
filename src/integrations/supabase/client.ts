
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://tkwfucgtpmdefexrbfjw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrd2Z1Y2d0cG1kZWZleHJiZmp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3MDc2MTQsImV4cCI6MjA2MDI4MzYxNH0.rxmDQTo47QJ9CbmlzH2hbSgKP1mTa69XhWx3BMZSpj0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// Initialize the storage bucket
export const initializeStorageBucket = async () => {
  try {
    console.log("Attempting to initialize storage bucket...");
    
    // First check if the images bucket exists
    const { data: buckets, error: bucketsError } = await supabase
      .storage
      .listBuckets();
      
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return { success: false, error: bucketsError };
    }
    
    const imagesBucketExists = buckets.some(bucket => bucket.name === 'images');
    
    // If the bucket doesn't exist, call our edge function to create it
    if (!imagesBucketExists) {
      console.log('Images bucket not found, calling edge function to create it...');
      
      // Call the edge function to create the bucket (using service role key)
      const response = await fetch(`${SUPABASE_URL}/functions/v1/create-storage-bucket`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_PUBLISHABLE_KEY}`
        }
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edge function error:', errorText);
        return { success: false, error: new Error(errorText) };
      }
      
      const result = await response.json();
      console.log('Edge function result:', result);
      
      // Wait a moment for the bucket to be fully created
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Verify the bucket exists now
      const { data: updatedBuckets, error: verifyError } = await supabase
        .storage
        .listBuckets();
        
      if (verifyError) {
        console.error('Error verifying bucket creation:', verifyError);
        return { success: false, error: verifyError };
      }
      
      const bucketCreated = updatedBuckets.some(bucket => bucket.name === 'images');
      if (!bucketCreated) {
        console.error('Bucket was not created successfully');
        return { success: false, error: new Error('Bucket creation could not be verified') };
      }
      
      console.log('Images bucket created successfully');
      return { success: true };
    } else {
      console.log('Images bucket already exists');
      // Set up public URL for the bucket
      const { data } = supabase
        .storage
        .from('images')
        .getPublicUrl('dummy.txt');
        
      console.log('Public URL example:', data.publicUrl);
      return { success: true };
    }
  } catch (error) {
    console.error('Failed to initialize storage bucket:', error);
    return { success: false, error };
  }
};
