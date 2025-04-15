
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

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface DeleteBlogPostDialogProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

export const DeleteBlogPostDialog = ({ 
  post, 
  isOpen, 
  onClose, 
  onConfirm 
}: DeleteBlogPostDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ยืนยันการลบบทความ</DialogTitle>
          <DialogDescription>
            คุณต้องการลบบทความนี้หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
          </DialogDescription>
        </DialogHeader>
        {post && (
          <div className="py-4">
            <p className="font-medium">{post.title}</p>
            <p className="text-sm text-gray-500 mt-1">{post.category} • {post.thai_date}</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button variant="destructive" onClick={onConfirm}>ลบบทความ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
