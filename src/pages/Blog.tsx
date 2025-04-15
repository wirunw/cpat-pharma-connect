
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type SubscriberInsert = Database['public']['Tables']['subscribers']['Insert'];

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      console.log("Attempting to fetch published blog posts...");
      
      // Simple query to get all blog posts regardless of status - for debugging
      const { data: allPosts, error: allError } = await supabase
        .from('blog_posts')
        .select('*');
      
      if (allError) {
        console.error('Error fetching all blog posts:', allError);
        throw allError;
      }
      
      console.log("All blog posts (for debugging):", allPosts);
      console.log("Total posts in database:", allPosts?.length || 0);
      
      if (allPosts && allPosts.length > 0) {
        console.log("Post statuses:", allPosts.map(p => `${p.id}: ${p.status}`));
      }
      
      // Now fetch only published posts for display
      const { data: publishedPosts, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching published blog posts:', error);
        setFetchError(`Database error: ${error.message}`);
        throw error;
      }
      
      console.log("Published blog posts:", publishedPosts);
      console.log("Total published posts:", publishedPosts?.length || 0);
      
      // Ensure we're setting the posts in state
      setBlogPosts(publishedPosts || []);
    } catch (error: any) {
      console.error('Error in fetchBlogPosts():', error.message);
      toast.error("ไม่สามารถโหลดบทความได้");
      setFetchError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriberEmail) {
      toast.error("กรุณากรอกอีเมล");
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }
    
    try {
      // Check if already subscribed
      const { data: existingData } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', subscriberEmail.toLowerCase())
        .single();

      if (existingData) {
        toast.info("อีเมลนี้ได้ลงทะเบียนไว้แล้ว");
        setSubscriberEmail("");
        return;
      }
      
      const today = new Date();
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543; // Convert to Buddhist Era
      const formattedDate = `${day} ${month} ${year}`;
      
      const newSubscriber: SubscriberInsert = {
        email: subscriberEmail.toLowerCase(),
        thai_date: formattedDate,
        source: "หน้าบทความ"
      };
      
      const { error } = await supabase
        .from('subscribers')
        .insert([newSubscriber]);
      
      if (error) throw error;
      
      toast.success("ลงทะเบียนรับข่าวสารสำเร็จ");
      setSubscriberEmail("");
    } catch (error: any) {
      console.error('Error subscribing:', error.message);
      toast.error("ไม่สามารถลงทะเบียนได้ โปรดลองอีกครั้ง");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">บทความและข่าวสาร</h1>
            <p className="text-xl max-w-3xl">
              ติดตามข่าวสาร บทความวิชาการ และความรู้ใหม่ๆ ด้านการบริหารเภสัชกิจจากผู้เชี่ยวชาญของเรา
            </p>
          </div>
        </section>
        
        {/* Blog posts grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            {isLoading ? (
              <div className="text-center py-12">กำลังโหลดข้อมูล...</div>
            ) : fetchError ? (
              <div className="text-center py-12 text-red-500">
                <p className="text-xl">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
                <p className="mt-2">{fetchError}</p>
                <button 
                  onClick={fetchBlogPosts}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  ลองใหม่อีกครั้ง
                </button>
              </div>
            ) : blogPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
                    <div className="h-48 bg-gray-200">
                      <img 
                        src={post.image_url || "/placeholder.svg"} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                        <span className="text-sm text-gray-500">{post.thai_date}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-blue-900">{post.title}</h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <Link to={`/blog/${post.id}`} className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700">
                        อ่านเพิ่มเติม
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500">ยังไม่มีบทความในขณะนี้</p>
                <p className="mt-2 text-gray-400">โปรดกลับมาตรวจสอบในภายหลัง</p>
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-left max-w-2xl mx-auto">
                  <h3 className="font-bold text-yellow-800">ข้อมูลสำหรับการแก้ไขปัญหา:</h3>
                  <p className="text-sm text-yellow-700 mt-2">
                    ไม่พบบทความที่เผยแพร่ กรุณาตรวจสอบสถานะของบทความในระบบ admin หรือติดต่อผู้ดูแลระบบหากคุณเห็นข้อความนี้
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter signup */}
        <section className="bg-blue-50 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">รับข่าวสารและบทความใหม่ๆ</h2>
            <p className="text-gray-600 mb-8">ลงทะเบียนรับจดหมายข่าวของเราเพื่อติดตามบทความ ข่าวสาร และกิจกรรมล่าสุดจาก CPAT</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="อีเมลของคุณ" 
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                required
              />
              <button 
                type="submit" 
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                สมัครรับข่าวสาร
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
