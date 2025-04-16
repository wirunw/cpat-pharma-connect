
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

type DirectorSection = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

export const useDirectorSection = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminStatus = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data, error } = await supabase.rpc('is_admin', {
          user_id: session.user.id
        });
        if (!error && data) {
          setIsAdmin(data);
        }
      }
    };
    checkAdminStatus();
  }, []);

  const { data: directorSection, isLoading } = useQuery({
    queryKey: ['directorSection'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('id', 'director_section')
        .single();

      if (error) throw error;
      return data as DirectorSection;
    }
  });

  const updateImage = useMutation({
    mutationFn: async (file: File) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      // Upload image to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('director')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('director')
        .getPublicUrl(fileName);

      // Update site_content
      const { error: updateError } = await supabase
        .from('site_content')
        .update({ image_url: publicUrl })
        .eq('id', 'director_section');

      if (updateError) throw updateError;

      return publicUrl;
    },
    onSuccess: (newImageUrl) => {
      queryClient.setQueryData(['directorSection'], (old: DirectorSection | undefined) => {
        if (!old) return old;
        return { ...old, image_url: newImageUrl };
      });
      toast({
        title: "อัพโหลดสำเร็จ",
        description: "อัพเดทรูปภาพเรียบร้อยแล้ว",
      });
    },
    onError: (error) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      console.error('Upload error:', error);
    }
  });

  return {
    directorSection,
    isLoading,
    isAdmin,
    updateImage: updateImage.mutate,
    isUploading: updateImage.isPending
  };
};
