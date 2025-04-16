
import React, { useRef, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { type SiteContent } from '@/hooks/useSiteContent';
import { Button } from "@/components/ui/button";
import { Pencil, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface EditableContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const EditableContent = ({ content, isAdmin }: EditableContentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(content.title || '');
  const [editedDescription, setEditedDescription] = useState(content.description || '');
  const [editedContent, setEditedContent] = useState(content.content || '');
  const [isUploading, setIsUploading] = useState(false);

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
      setIsEditing(false);
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
      // Initialize storage bucket if needed
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

  const handleSaveContent = () => {
    const updates: Partial<SiteContent> = {};
    
    if (content.title !== editedTitle) {
      updates.title = editedTitle;
    }
    
    if (content.description !== editedDescription) {
      updates.description = editedDescription;
    }
    
    if (content.content !== editedContent) {
      updates.content = editedContent;
    }
    
    if (Object.keys(updates).length > 0) {
      updateMutation.mutateAsync(updates);
    } else {
      setIsEditing(false);
    }
  };

  if (content.content_type === 'image') {
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
  }

  if (content.content_type === 'text' || content.content_type === 'html') {
    return (
      <div className="relative group">
        {content.title && <h2 className="text-2xl font-bold mb-4">{content.title}</h2>}
        {content.description && (
          <div className="whitespace-pre-wrap">
            {content.description.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        )}
        {content.content && (
          <div className="mt-4 whitespace-pre-wrap">
            {content.content.split('\n').map((line, i) => (
              <p key={i} className="mb-2">{line}</p>
            ))}
          </div>
        )}
        {isAdmin && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 -top-4 opacity-0 group-hover:opacity-100 bg-white hover:bg-gray-100"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>แก้ไขเนื้อหา</DialogTitle>
                </DialogHeader>
                {content.title !== null && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-1 block">หัวข้อ</label>
                    <Input
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="หัวข้อ"
                    />
                  </div>
                )}
                {content.description !== null && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-1 block">คำอธิบาย</label>
                    <Textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      placeholder="คำอธิบาย"
                      rows={5}
                    />
                  </div>
                )}
                {content.content !== null && (
                  <div className="mb-4">
                    <label className="text-sm font-medium mb-1 block">เนื้อหา</label>
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="เนื้อหา"
                      rows={8}
                    />
                  </div>
                )}
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>ยกเลิก</Button>
                  <Button onClick={handleSaveContent}>บันทึก</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>
    );
  }

  return null;
};
