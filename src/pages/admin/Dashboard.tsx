
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { FileText, MessageSquare, Mail, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
type BlogPost = Database['public']['Tables']['blog_posts']['Row'];
type Subscriber = Database['public']['Tables']['subscribers']['Row'];

const Dashboard = () => {
  const [blogCount, setBlogCount] = useState(0);
  const [messageCount, setMessageCount] = useState(0);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [recentMessages, setRecentMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Initialize storage bucket if needed
        await supabase.functions.invoke('create-storage-bucket');

        // Fetch blog post count
        const { count: blogCount, error: blogError } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });
        
        if (blogError) throw blogError;
        
        // Fetch message count
        const { count: messageCount, error: messageError } = await supabase
          .from('contact_messages')
          .select('*', { count: 'exact', head: true });
        
        if (messageError) throw messageError;
        
        // Fetch subscriber count
        const { count: subscriberCount, error: subscriberError } = await supabase
          .from('subscribers')
          .select('*', { count: 'exact', head: true });
        
        if (subscriberError) throw subscriberError;
        
        // Fetch recent blog posts
        const { data: recentPosts, error: recentPostsError } = await supabase
          .from('blog_posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (recentPostsError) throw recentPostsError;
        
        // Fetch recent messages
        const { data: recentMessages, error: recentMessagesError } = await supabase
          .from('contact_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (recentMessagesError) throw recentMessagesError;
        
        setBlogCount(blogCount || 0);
        setMessageCount(messageCount || 0);
        setSubscriberCount(subscriberCount || 0);
        setRecentPosts(recentPosts || []);
        setRecentMessages(recentMessages || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate time ago
  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} วินาทีที่แล้ว`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} นาทีที่แล้ว`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ชั่วโมงที่แล้ว`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} วันที่แล้ว`;
    return `${Math.floor(diffInSeconds / 604800)} สัปดาห์ที่แล้ว`;
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
          <p className="text-gray-500 mt-1">ภาพรวมการจัดการระบบ CPAT</p>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <DashboardCard 
                title="บทความทั้งหมด" 
                value={blogCount.toString()} 
                description="บทความที่เผยแพร่บนเว็บไซต์" 
                icon={<FileText className="h-8 w-8 text-blue-600" />} 
              />
              <DashboardCard 
                title="ข้อความติดต่อ" 
                value={messageCount.toString()} 
                description="ข้อความจากแบบฟอร์มติดต่อ" 
                icon={<MessageSquare className="h-8 w-8 text-green-600" />} 
              />
              <DashboardCard 
                title="สมาชิกรับข่าวสาร" 
                value={subscriberCount.toString()} 
                description="อีเมลที่ลงทะเบียนรับข่าวสาร" 
                icon={<Mail className="h-8 w-8 text-yellow-600" />} 
              />
              <DashboardCard 
                title="ผู้เยี่ยมชมเว็บไซต์" 
                value="1,245" 
                description="จำนวนผู้เข้าชมเว็บไซต์ในเดือนนี้" 
                icon={<Users className="h-8 w-8 text-purple-600" />} 
              />
            </div>
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>บทความล่าสุด</CardTitle>
                  <CardDescription>
                    บทความที่เพิ่มล่าสุดบนเว็บไซต์
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentPosts.length > 0 ? (
                    <div className="space-y-4">
                      {recentPosts.map(post => (
                        <div key={post.id} className="flex justify-between border-b pb-2">
                          <div className="line-clamp-1">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.thai_date || 'ไม่ระบุ'}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">ยังไม่มีบทความ</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>ข้อความติดต่อล่าสุด</CardTitle>
                  <CardDescription>
                    ข้อความจากแบบฟอร์มติดต่อล่าสุด
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {recentMessages.length > 0 ? (
                    <div className="space-y-4">
                      {recentMessages.map(message => (
                        <div key={message.id} className="border-b pb-2">
                          <div className="flex justify-between">
                            <div className="font-medium">{message.name}</div>
                            <div className="text-sm text-gray-500">{getTimeAgo(message.created_at)}</div>
                          </div>
                          <div className="text-sm text-gray-600 truncate">{message.message}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 py-4">ยังไม่มีข้อความติดต่อ</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </AdminLayout>
    </ProtectedRoute>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
