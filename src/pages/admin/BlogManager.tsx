
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { BlogPostDialog } from "@/components/admin/blog/BlogPostDialog";
import { DeleteBlogPostDialog } from "@/components/admin/blog/DeleteBlogPostDialog";
import { BlogPostTabs } from "@/components/admin/blog/BlogPostTabs";
import { usePostManager } from "@/hooks/usePostManager";
import { supabase } from "@/integrations/supabase/client";

const BlogManager = () => {
  const {
    blogPosts,
    isLoading,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isSubmitting,
    selectedPost,
    setSelectedPost,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
    checkSession,
    fetchBlogPosts
  } = usePostManager();

  useEffect(() => {
    checkSession();
    fetchBlogPosts();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to login");
        window.location.href = "/admin/login";
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [checkSession, fetchBlogPosts]);

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

        <BlogPostTabs 
          blogPosts={blogPosts}
          isLoading={isLoading}
          onEdit={(post) => {
            setSelectedPost(post);
            setIsEditDialogOpen(true);
          }}
          onDelete={(post) => {
            setSelectedPost(post);
            setIsDeleteDialogOpen(true);
          }}
        />

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
