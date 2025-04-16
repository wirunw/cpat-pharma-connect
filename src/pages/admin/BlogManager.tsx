
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { BlogPostCard } from "@/components/admin/blog/BlogPostCard";
import { BlogPostDialog } from "@/components/admin/blog/BlogPostDialog";
import { DeleteBlogPostDialog } from "@/components/admin/blog/DeleteBlogPostDialog";
import { useBlogPosts } from "@/hooks/useBlogPosts";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

const BlogManager = () => {
  const { 
    blogPosts, 
    isLoading, 
    fetchBlogPosts, 
    addBlogPost, 
    updateBlogPost, 
    deleteBlogPost 
  } = useBlogPosts();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [currentSession, setCurrentSession] = useState<any>(null);

  useEffect(() => {
    fetchBlogPosts();
    
    // ตรวจสอบสถานะการล็อกอินเมื่อโหลดหน้า
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setCurrentSession(data.session);
    };
    
    checkSession();
    
    // ติดตามการเปลี่ยนแปลงสถานะการล็อกอิน
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setCurrentSession(session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleAddPost = async (newPost: any, imageFile: File | null) => {
    setIsSubmitting(true);
    let imageUrl = '/placeholder.svg';
    
    if (imageFile) {
      try {
        // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
        if (!currentSession) {
          toast.error('กรุณาล็อกอินเพื่อทำการอัปโหลดรูปภาพ');
          setIsSubmitting(false);
          return;
        }
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `blog/${fileName}`;
        
        console.log('ทำการอัปโหลดไฟล์:', filePath);
        
        const { error: uploadError, data } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) throw uploadError;
        
        console.log('อัปโหลดไฟล์สำเร็จ, ข้อมูล:', data);
        
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
        console.log('URL รูปภาพ:', imageUrl);
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error('อัปโหลดรูปภาพไม่สำเร็จ: ' + error.message);
        setIsSubmitting(false);
        return;
      }
    }
    
    const success = await addBlogPost(newPost, imageUrl);
    if (success) {
      setIsAddDialogOpen(false);
      toast.success('เพิ่มบทความใหม่สำเร็จ');
    }
    setIsSubmitting(false);
  };

  const handleUpdatePost = async (updatedPost: any, imageFile: File | null) => {
    if (!selectedPost) return;
    
    setIsSubmitting(true);
    let imageUrl = selectedPost.image_url || '/placeholder.svg';
    
    if (imageFile) {
      try {
        // ตรวจสอบว่าผู้ใช้ล็อกอินอยู่หรือไม่
        if (!currentSession) {
          toast.error('กรุณาล็อกอินเพื่อทำการอัปโหลดรูปภาพ');
          setIsSubmitting(false);
          return;
        }
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `blog/${fileName}`;
        
        console.log('ทำการอัปโหลดไฟล์:', filePath);
        
        const { error: uploadError } = await supabase.storage
          .from('images')
          .upload(filePath, imageFile, {
            cacheControl: '3600',
            upsert: false
          });
        
        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('images')
          .getPublicUrl(filePath);
          
        imageUrl = urlData.publicUrl;
        console.log('URL รูปภาพใหม่:', imageUrl);
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error('อัปโหลดรูปภาพไม่สำเร็จ: ' + error.message);
        setIsSubmitting(false);
        return;
      }
    }
    
    const success = await updateBlogPost({ ...selectedPost, ...updatedPost }, imageUrl);
    if (success) {
      setIsEditDialogOpen(false);
      toast.success('อัปเดตบทความสำเร็จ');
    }
    setIsSubmitting(false);
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    const success = await deleteBlogPost(selectedPost.id);
    if (success) {
      setIsDeleteDialogOpen(false);
      toast.success('ลบบทความสำเร็จ');
    }
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">จัดการบทความ</h1>
            <p className="text-gray-500 mt-1">สร้าง แก้ไข และลบบทความบนเว็บไซต์</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มบทความใหม่
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="published">เผยแพร่แล้ว</TabsTrigger>
            <TabsTrigger value="draft">ฉบับร่าง</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.length > 0 ? (
              <div className="space-y-4">
                {blogPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={(post) => {
                      setSelectedPost(post);
                      setIsEditDialogOpen(true);
                    }} 
                    onDelete={(post) => {
                      setSelectedPost(post);
                      setIsDeleteDialogOpen(true);
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความ</div>
            )}
          </TabsContent>
          
          <TabsContent value="published">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.filter(post => post.status === 'published').length > 0 ? (
              <div className="space-y-4">
                {blogPosts.filter(post => post.status === 'published').map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={(post) => {
                      setSelectedPost(post);
                      setIsEditDialogOpen(true);
                    }} 
                    onDelete={(post) => {
                      setSelectedPost(post);
                      setIsDeleteDialogOpen(true);
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความที่เผยแพร่</div>
            )}
          </TabsContent>
          
          <TabsContent value="draft">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.filter(post => post.status === 'draft').length > 0 ? (
              <div className="space-y-4">
                {blogPosts.filter(post => post.status === 'draft').map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={(post) => {
                      setSelectedPost(post);
                      setIsEditDialogOpen(true);
                    }} 
                    onDelete={(post) => {
                      setSelectedPost(post);
                      setIsDeleteDialogOpen(true);
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความฉบับร่าง</div>
            )}
          </TabsContent>
        </Tabs>

        <BlogPostDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddPost}
          title="เพิ่มบทความใหม่"
          description="กรอกข้อมูลบทความที่ต้องการเพิ่มลงในเว็บไซต์"
          isSubmitting={isSubmitting}
        />

        <BlogPostDialog
          isOpen={isEditDialogOpen}
          onClose={() => {
            setIsEditDialogOpen(false);
            setSelectedPost(null);
          }}
          onSubmit={handleUpdatePost}
          post={selectedPost || undefined}
          title="แก้ไขบทความ"
          description="แก้ไขข้อมูลบทความที่เลือก"
          isSubmitting={isSubmitting}
        />

        <DeleteBlogPostDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => {
            setIsDeleteDialogOpen(false);
            setSelectedPost(null);
          }}
          onConfirm={handleDeletePost}
          post={selectedPost}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default BlogManager;
