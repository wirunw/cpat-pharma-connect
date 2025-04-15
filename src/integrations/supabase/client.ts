
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
    
    // If the bucket doesn't exist, create it
    if (!imagesBucketExists) {
      console.log('Images bucket not found, creating it...');
      
      // Create the bucket
      const { data, error } = await supabase
        .storage
        .createBucket('images', {
          public: true,
          fileSizeLimit: 10485760, // 10MB
        });
      
      if (error) {
        console.error('Error creating images bucket:', error);
        return { success: false, error };
      }
      
      // Set up public access policy for the bucket
      const { error: policyError } = await supabase
        .storage
        .from('images')
        .getPublicUrl('dummy.txt');
        
      if (policyError) {
        console.error('Error setting up public policy:', policyError);
      }
        
      console.log('Images bucket created successfully');
      return { success: true, data };
    } else {
      console.log('Images bucket already exists');
      return { success: true };
    }
  } catch (error) {
    console.error('Failed to initialize storage bucket:', error);
    return { success: false, error };
  }
};
