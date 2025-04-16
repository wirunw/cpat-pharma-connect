
import { useState, useCallback } from 'react';
import { Database } from "@/integrations/supabase/types";
import { useBlogPosts } from './useBlogPosts';
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export const usePostManager = () => {
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

  const checkSession = useCallback(async () => {
    const { data } = await supabase.auth.getSession();
    setCurrentSession(data.session);
  }, []);

  const handleAddPost = async (newPost: any, imageFile: File | null) => {
    setIsSubmitting(true);
    let imageUrl = '/placeholder.svg';
    
    if (imageFile) {
      try {
        if (!currentSession) {
          toast.error('กรุณาล็อกอินเพื่อทำการอัปโหลดรูปภาพ');
          setIsSubmitting(false);
          return;
        }
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `blog/${fileName}`;
        
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
        if (!currentSession) {
          toast.error('กรุณาล็อกอินเพื่อทำการอัปโหลดรูปภาพ');
          setIsSubmitting(false);
          return;
        }
        
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `blog/${fileName}`;
        
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

  return {
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
    checkSession
  };
};
