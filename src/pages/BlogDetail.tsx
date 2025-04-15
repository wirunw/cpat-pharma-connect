
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogPost();
  }, [id]);

  const fetchBlogPost = async () => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      console.log("Fetching blog post with ID:", id);
      
      // Query to get published blog posts only
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .eq('status', 'published')
        .single();
      
      if (error) {
        console.error('Error fetching blog post:', error.message);
        if (error.code === 'PGRST116') {
          // If no records are returned (PGRST116 error), redirect to NotFound
          navigate('/not-found', { replace: true });
          return;
        }
        throw error;
      }
      
      console.log("Blog post data:", data);
      setBlogPost(data);
    } catch (error: any) {
      console.error('Error fetching blog post:', error.message);
      toast.error("ไม่สามารถโหลดข้อมูลบทความได้");
      
      // If there's an error, redirect to the 404 page
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

  // This should be handled by the fetchBlogPost function, but keeping it as a fallback
  if (!blogPost) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">ไม่พบบทความ</h1>
            <p className="text-gray-500 mb-6">บทความที่คุณกำลังค้นหาอาจถูกลบหรือไม่มีอยู่</p>
            <Link to="/blog" className="text-blue-600 hover:underline">
              กลับไปยังหน้าบทความทั้งหมด
            </Link>
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
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="mb-4">
              <Link to="/blog" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                กลับไปยังบทความทั้งหมด
              </Link>
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{blogPost?.title}</h1>
                <div className="flex items-center gap-3">
                  <span className="bg-blue-700 text-sm px-3 py-1 rounded-full">
                    {blogPost?.category}
                  </span>
                  <span className="text-sm text-blue-100">
                    {blogPost?.thai_date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            {blogPost?.image_url && (
              <div className="mb-8 overflow-hidden rounded-lg">
                <img 
                  src={blogPost.image_url} 
                  alt={blogPost.title} 
                  className="w-full h-auto max-h-[400px] object-cover"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-8">{blogPost?.excerpt}</p>
              
              {/* For now we'll display the excerpt as content since we don't have actual content in the database */}
              <div className="bg-blue-50 p-6 rounded-md mb-8">
                <p className="text-blue-800 font-medium mb-2">หมายเหตุ:</p>
                <p className="text-gray-700">
                  ขณะนี้เรากำลังพัฒนาระบบเพื่อแสดงเนื้อหาบทความเต็มรูปแบบ 
                  โปรดติดตามการอัปเดตในเร็วๆ นี้
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogDetail;
