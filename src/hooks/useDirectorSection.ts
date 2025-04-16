
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from './use-toast';

export interface DirectorContent {
  id: string;
  title: string;
  description: string;
  image_url: string;
}

export function useDirectorSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const { data: isAdmin = false } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;
      
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });
      
      if (error) throw error;
      return !!data;
    }
  });

  const { data: directorSection, isLoading } = useQuery({
    queryKey: ['director-section'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'director_section')
        .single();
      
      if (error) {
        console.error('Error fetching director section:', error);
        return {
          id: 'director_section',
          title: 'สารจากผู้อำนวยการ',
          description: 'วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย (CPAT) เป็นสถาบันการศึกษาที่มุ่งสร้างผู้นำด้านเภสัชกรรมที่มีความเชี่ยวชาญในการบริหารจัดการ เพื่อยกระดับวิชาชีพเภสัชกรรมและพัฒนาระบบสุขภาพของประเทศไทย',
          image_url: '/placeholder.svg'
        } as DirectorContent;
      }
      
      return data as DirectorContent;
    }
  });

  const updateImage = async (file: File) => {
    if (!isAdmin || !file) return;
    
    setIsUploading(true);
    
    try {
      // Initialize storage bucket if needed
      await supabase.storage.createBucket('images', {
        public: true,
      }).catch(() => {
        // Bucket might already exist, continue
      });
      
      const fileExt = file.name.split('.').pop();
      const fileName = `director_${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(fileName, file);
        
      if (uploadError) throw uploadError;
      
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(fileName);
        
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ image_url: publicUrl })
        .eq('id', 'director_section');
        
      if (updateError) throw updateError;
      
      queryClient.invalidateQueries({ queryKey: ['director-section'] });
      
      toast({
        title: "อัพเดทสำเร็จ",
        description: "อัพโหลดและอัพเดทรูปภาพเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error('Error updating director image:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return {
    directorSection,
    isLoading,
    isAdmin,
    updateImage,
    isUploading
  };
}
