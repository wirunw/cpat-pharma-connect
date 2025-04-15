
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { Subscriber } from "@/hooks/useSubscribers";

interface DeleteSubscriberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<boolean>;
  subscriber: Subscriber | null;
}

export function DeleteSubscriberDialog({ 
  isOpen, 
  onClose, 
  onDelete, 
  subscriber 
}: DeleteSubscriberDialogProps) {
  const handleDelete = async () => {
    if (!subscriber) return;
    
    const success = await onDelete(subscriber.id);
    if (success) {
      onClose();
      toast.success("ลบผู้รับข่าวสารสำเร็จ");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>ยืนยันการลบผู้รับข่าวสาร</DialogTitle>
          <DialogDescription>
            คุณต้องการลบอีเมลนี้ออกจากรายชื่อผู้รับข่าวสารหรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
          </DialogDescription>
        </DialogHeader>
        {subscriber && (
          <div className="py-4">
            <p className="font-medium">{subscriber.email}</p>
            <p className="text-sm text-gray-500 mt-1">ลงทะเบียนเมื่อ: {subscriber.thai_date}</p>
            <p className="text-sm text-gray-500">แหล่งที่มา: {subscriber.source}</p>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button variant="destructive" onClick={handleDelete}>ลบออกจากรายชื่อ</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
