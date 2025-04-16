
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { type SiteContent } from '@/hooks/useSiteContent';
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface TextContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const TextContent = ({ content, isAdmin }: TextContentProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(content.title || '');
  const [editedDescription, setEditedDescription] = useState(content.description || '');
  const [editedContent, setEditedContent] = useState(content.content || '');

  // For debugging
  useEffect(() => {
    console.log('TextContent isAdmin:', isAdmin);
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

  return (
    <div className="relative group">
      {content.title && <h2 className="text-2xl font-bold mb-4 text-gray-900">{content.title}</h2>}
      {content.description && (
        <div className="whitespace-pre-wrap text-gray-800">
          {content.description.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
      )}
      {content.content && (
        <div className="mt-4 whitespace-pre-wrap text-gray-800">
          {content.content.split('\n').map((line, i) => (
            <p key={i} className="mb-2">{line}</p>
          ))}
        </div>
      )}
      {isAdmin && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-2 -top-2 opacity-100 bg-blue-600 hover:bg-blue-700 text-white hover:text-white z-50 shadow-md"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>แก้ไขเนื้อหา</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
          
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
};
