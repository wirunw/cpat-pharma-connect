
import React, { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { type SiteContent } from '@/hooks/useSiteContent';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';

interface ImageContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const ImageContent = ({ content, isAdmin }: ImageContentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  const updateMutation = useMutation({
    mutationFn: async (updates: Partial<SiteContent>) => {
      const { error } = await supabase
        .from('site_content')
        .update(updates)
        .eq('id', content.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['site-content'] });
      toast({
        title: "อัพเดทสำเร็จ",
        description: "อัพเดทเนื้อหาเรียบร้อยแล้ว",
      });
    },
    onError: (error) => {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพเดทเนื้อหาได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
      console.error('Update error:', error);
    }
  });

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    
    setIsUploading(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    try {
      await supabase.storage.createBucket('content', {
        public: true,
      }).catch(() => {
        // Bucket might already exist, continue
      });
      
      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content')
        .getPublicUrl(fileName);

      await updateMutation.mutateAsync({ image_url: publicUrl });
      
      toast({
        title: "อัพโหลดสำเร็จ",
        description: "อัพโหลดรูปภาพเรียบร้อยแล้ว",
      });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative group">
      <img
        src={content.image_url || '/placeholder.svg'}
        alt={content.title || 'Content image'}
        className="w-full h-auto rounded-lg"
      />
      {isAdmin && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleImageUpload(file);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <Button
              variant="outline"
              size="icon"
              className="bg-white hover:bg-gray-100"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 rounded-lg">
              <div className="loading-spinner"></div>
              <p className="text-white ml-2">อัพโหลด...</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};
