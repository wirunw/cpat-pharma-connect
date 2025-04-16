
import React, { useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { type SiteContent } from '@/hooks/useSiteContent';
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from 'lucide-react';

interface EditableContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const EditableContent = ({ content, isAdmin }: EditableContentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    try {
      const { error: uploadError } = await supabase.storage
        .from('content')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('content')
        .getPublicUrl(fileName);

      await updateMutation.mutateAsync({ image_url: publicUrl });
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัพโหลดรูปภาพได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      });
    }
  };

  if (content.content_type === 'image') {
    return (
      <div className="relative group">
        <img
          src={content.image_url || '/placeholder.svg'}
          alt={content.title || 'Content image'}
          className="w-full h-auto"
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
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (content.content_type === 'text' || content.content_type === 'html') {
    return (
      <div className="relative group">
        {content.title && <h2 className="text-2xl font-bold mb-4">{content.title}</h2>}
        {content.description && <p className="text-gray-700">{content.description}</p>}
        {isAdmin && (
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-100"
            onClick={() => {
              // TODO: Implement text editor dialog
              toast({
                title: "Coming soon",
                description: "Text editing will be implemented in the next update",
              });
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }

  return null;
};
