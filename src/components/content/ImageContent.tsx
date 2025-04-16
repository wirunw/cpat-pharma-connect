
import React, { useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { type SiteContent } from '@/hooks/useSiteContent';
import { Button } from "@/components/ui/button";
import { Upload } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface ImageContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const ImageContent = ({ content, isAdmin }: ImageContentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = React.useState(false);

  // For debugging
  useEffect(() => {
    console.log('ImageContent isAdmin:', isAdmin);
  }, [isAdmin]);

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
    <div className="relative">
      <img
        src={content.image_url || '/placeholder.svg'}
        alt={content.title || 'Content image'}
        className="w-full h-auto rounded-lg"
      />
      {isAdmin && (
        <TooltipProvider>
          <div className="absolute inset-0 flex items-center justify-center">
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
            
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white hover:text-white z-50 shadow-md opacity-100"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>อัพโหลดรูปภาพ</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg z-20">
              <div className="loading-spinner"></div>
              <p className="text-white ml-2">อัพโหลด...</p>
            </div>
          )}
        </TooltipProvider>
      )}
    </div>
  );
};
