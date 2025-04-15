
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogDetailHeader from "@/components/blog/BlogDetailHeader";
import BlogContent from "@/components/blog/BlogContent";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";
import { debugTable } from "@/utils/debugUtils";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    } else {
      navigate('/blog', { replace: true });
    }
  }, [id]);

  const fetchBlogPost = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setFetchError(null);
    
    try {
      console.log("Fetching blog post with ID:", id);
      await debugTable(supabase, 'blog_posts');
      
      const { data: directData, error: directError } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id);
      
      if (directError) {
        console.error('Error in direct blog post query:', directError);
        throw directError;
      }
      
      console.log("Direct query results:", directData);
      
      if (!directData || directData.length === 0) {
        console.log("No blog post found with ID:", id);
        navigate('/not-found', { replace: true });
        return;
      }
      
      const post = directData[0];
      console.log("Found blog post with status:", post.status);
      
      if (post.status !== 'published') {
        console.log("Post exists but is not published. Status:", post.status);
        navigate('/not-found', { replace: true });
        return;
      }
      
      setBlogPost(post);
    } catch (error: any) {
      console.error('Error in fetchBlogPost():', error.message);
      setFetchError(error.message);
      toast.error("ไม่สามารถโหลดข้อมูลบทความได้");
      
      if (!blogPost) {
        navigate('/not-found', { replace: true });
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (fetchError || !blogPost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">{fetchError ? 'เกิดข้อผิดพลาด' : 'ไม่พบบทความ'}</h1>
            <p className="text-gray-500 mb-6">
              {fetchError || 'บทความที่คุณกำลังค้นหาอาจถูกลบหรือไม่มีอยู่'}
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <BlogDetailHeader post={blogPost} />
        <BlogContent post={blogPost} />
      </main>
      <Footer />
    </div>
  );
};

export default BlogDetail;
