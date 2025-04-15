
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddSubscriberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (email: string) => Promise<boolean>;
}

export function AddSubscriberDialog({ isOpen, onClose, onAdd }: AddSubscriberDialogProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email) {
      toast.error("กรุณากรอกอีเมล");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }

    const success = await onAdd(email);
    if (success) {
      setEmail("");
      onClose();
      toast.success("เพิ่มผู้รับข่าวสารสำเร็จ");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>เพิ่มผู้รับข่าวสาร</DialogTitle>
          <DialogDescription>
            กรอกอีเมลของผู้ที่ต้องการเพิ่มเป็นผู้รับข่าวสาร
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Input
                id="email"
                placeholder="อีเมล"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button 
              variant="ghost" 
              className="shrink-0 h-10 w-10 rounded-full p-0 text-gray-500"
              onClick={() => setEmail("")}
            >
              ล้าง
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={handleSubmit}>เพิ่ม</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
