
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type BlogPostInsert = Database['public']['Tables']['blog_posts']['Insert'];
type BlogPostUpdate = Database['public']['Tables']['blog_posts']['Update'];

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const fetchBlogPosts = useCallback(async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      console.log("Fetching all blog posts...");
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      console.log(`Found ${data?.length || 0} blog posts`);
      setBlogPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error.message);
      setFetchError(error.message);
      toast.error('ไม่สามารถดึงข้อมูลบทความได้');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addBlogPost = async (
    newPost: { 
      title: string; 
      excerpt: string; 
      category: string; 
      status: "draft" | "published";
      content: string; // Add content field
    },
    imageUrl: string,
  ) => {
    try {
      const today = new Date();
      const thaiDate = `${today.getDate()} ${getThaiMonth(today.getMonth())} ${today.getFullYear() + 543}`;
      
      const newBlogPost: BlogPostInsert = {
        title: newPost.title,
        excerpt: newPost.excerpt,
        category: newPost.category,
        status: newPost.status,
        content: newPost.content, // Include content field
        image_url: imageUrl,
        thai_date: thaiDate
      };
      
      console.log("Saving new blog post:", newBlogPost);
      
      const { error } = await supabase
        .from('blog_posts')
        .insert([newBlogPost]);
      
      if (error) throw error;
      
      await fetchBlogPosts();
      return true;
    } catch (error: any) {
      console.error('Error adding blog post:', error.message);
      toast.error('ไม่สามารถเพิ่มบทความได้: ' + error.message);
      return false;
    }
  };

  const updateBlogPost = async (post: BlogPost, imageUrl: string) => {
    try {
      const updatedPost: BlogPostUpdate = {
        title: post.title,
        excerpt: post.excerpt,
        category: post.category,
        status: post.status,
        content: 'content' in post ? post.content : null, // Include content field
        image_url: imageUrl
      };
      
      const { error } = await supabase
        .from('blog_posts')
        .update(updatedPost)
        .eq('id', post.id);
      
      if (error) throw error;
      
      await fetchBlogPosts();
      return true;
    } catch (error: any) {
      console.error('Error updating blog post:', error.message);
      toast.error('ไม่สามารถอัปเดตบทความได้');
      return false;
    }
  };

  const deleteBlogPost = async (postId: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', postId);
      
      if (error) throw error;
      
      await fetchBlogPosts();
      return true;
    } catch (error: any) {
      console.error('Error deleting blog post:', error.message);
      toast.error('ไม่สามารถลบบทความได้');
      return false;
    }
  };

  return {
    blogPosts,
    isLoading,
    fetchBlogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    fetchError
  };
};

const getThaiMonth = (month: number) => {
  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  return thaiMonths[month];
};
