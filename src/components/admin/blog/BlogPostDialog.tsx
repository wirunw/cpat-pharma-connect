
import React, { useState } from "react";
import { Database } from "@/integrations/supabase/types";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (post: any, imageFile: File | null) => Promise<void>;
  post?: BlogPost;
  title: string;
  description: string;
  isSubmitting?: boolean;
}

export const BlogPostDialog = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  post, 
  title, 
  description,
  isSubmitting 
}: BlogPostDialogProps) => {
  const [formData, setFormData] = useState(post || {
    title: "",
    excerpt: "",
    category: "",
    status: "draft" as "draft" | "published"
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.image_url || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error('ขนาดไฟล์เกิน 10MB กรุณาเลือกไฟล์ใหม่');
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setFormData(post || {
      title: "",
      excerpt: "",
      category: "",
      status: "draft" as "draft" | "published"
    });
    setImageFile(null);
    setImagePreview(post?.image_url || null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">หัวข้อ</Label>
            <Input
              id="title"
              className="col-span-3"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">หมวดหมู่</Label>
            <Input
              id="category"
              className="col-span-3"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">สถานะ</Label>
            <select
              id="status"
              className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value as "draft" | "published"})}
            >
              <option value="draft">ฉบับร่าง</option>
              <option value="published">เผยแพร่</option>
            </select>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="excerpt" className="text-right pt-2">เนื้อหาย่อ</Label>
            <Textarea
              id="excerpt"
              className="col-span-3"
              rows={4}
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="image" className="text-right pt-2">รูปภาพ</Label>
            <div className="col-span-3">
              <div className="flex items-center gap-4">
                <div className="border border-dashed border-gray-300 rounded-md p-4 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer">
                    <Upload className="h-6 w-6 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">
                      {post ? 'คลิกเพื่ออัปโหลดรูปภาพใหม่' : 'คลิกเพื่ออัปโหลดรูปภาพ'}
                    </span>
                    <span className="text-xs text-gray-400 mt-1">(ขนาดไม่เกิน 10MB)</span>
                  </label>
                </div>
                {imagePreview && (
                  <div className="w-20 h-20 overflow-hidden rounded-md border">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            ยกเลิก
          </Button>
          <Button 
            onClick={() => onSubmit(formData, imageFile)} 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'กำลังบันทึก...' : post ? 'บันทึกการเปลี่ยนแปลง' : 'บันทึก'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
