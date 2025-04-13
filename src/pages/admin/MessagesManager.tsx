
import React, { useState } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

// Sample data
const initialMessages = [
  {
    id: 1,
    name: "สมชาย ใจดี",
    email: "somchai@example.com",
    phone: "081-234-5678",
    message: "สนใจสมัครเรียนหลักสูตรการบริหารเภสัชกิจ มีรายละเอียดเพิ่มเติมไหมครับ รบกวนส่งข้อมูลมาทางอีเมลด้วยนะครับ ขอบคุณมากครับ",
    date: "12 เมษายน 2025",
    time: "14:30 น.",
    read: false
  },
  {
    id: 2,
    name: "สมศรี มีสุข",
    email: "somsri@example.com",
    phone: "089-876-5432",
    message: "อยากสอบถามเกี่ยวกับค่าใช้จ่ายในหลักสูตร การบริหารเภสัชกิจ ทั้งหมดเท่าไหร่คะ และมีทุนการศึกษาหรือส่วนลดสำหรับสมาชิกองค์กรหรือไม่",
    date: "10 เมษายน 2025",
    time: "10:15 น.",
    read: false
  },
  {
    id: 3,
    name: "วิชัย สุขสงวน",
    email: "wichai@example.com",
    phone: "062-345-6789",
    message: "ขอสอบถามเรื่องการสมัครเรียนครับ มีเรียนออนไลน์หรือไม่ และถ้าเราไม่สามารถเข้าเรียนได้บางวัน จะมีการบันทึกคลาสให้ดูย้อนหลังไหมครับ",
    date: "5 เมษายน 2025",
    time: "16:45 น.",
    read: true
  },
  {
    id: 4,
    name: "นภา สมใจ",
    email: "napha@example.com",
    phone: "091-987-6543",
    message: "ดิฉันสนใจในหลักสูตรการบริหารเภสัชกิจ แต่อยากทราบว่าจำเป็นต้องมีพื้นฐานด้านการบริหารธุรกิจมาก่อนหรือไม่ และจบแล้วสามารถนำไปต่อยอดในการทำงานด้านใดได้บ้าง",
    date: "2 เมษายน 2025",
    time: "09:00 น.",
    read: true
  },
  {
    id: 5,
    name: "ประวิทย์ วงศ์ทอง",
    email: "prawit@example.com",
    phone: "085-678-9012",
    message: "ผมเป็นเภสัชกรที่ทำงานในโรงพยาบาลมา 5 ปี อยากพัฒนาตนเองด้านการบริหาร หลักสูตรนี้เหมาะกับผมหรือไม่ครับ และมีตัวอย่างความสำเร็จของศิษย์เก่าให้ดูหรือไม่",
    date: "28 มีนาคม 2025",
    time: "13:20 น.",
    read: true
  }
];

const MessagesManager = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      const updatedMessages = messages.map(msg => 
        msg.id === message.id ? { ...msg, read: true } : msg
      );
      setMessages(updatedMessages);
    }
  };

  const handleDeleteClick = (message: any) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMessage = () => {
    if (!selectedMessage) return;
    
    const filteredMessages = messages.filter(message => message.id !== selectedMessage.id);
    setMessages(filteredMessages);
    setIsDeleteDialogOpen(false);
    toast.success("ลบข้อความสำเร็จ");
  };

  const markAllAsRead = () => {
    const updatedMessages = messages.map(message => ({ ...message, read: true }));
    setMessages(updatedMessages);
    toast.success("ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว");
  };

  const deleteAllMessages = () => {
    setMessages([]);
    toast.success("ลบข้อความทั้งหมดสำเร็จ");
  };

  const unreadCount = messages.filter(message => !message.read).length;

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ข้อความติดต่อ</h1>
            <p className="text-gray-500 mt-1">จัดการข้อความจากแบบฟอร์มติดต่อ</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
              <MailOpen className="mr-2 h-4 w-4" />
              ทำเครื่องหมายว่าอ่านทั้งหมด
            </Button>
            <Button variant="outline" className="text-red-600 hover:bg-red-50" onClick={deleteAllMessages} disabled={messages.length === 0}>
              <Trash2 className="mr-2 h-4 w-4" />
              ลบทั้งหมด
            </Button>
          </div>
        </div>

        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map(message => (
              <Card key={message.id} className={`${!message.read ? 'border-blue-300 bg-blue-50' : ''}`}>
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        {message.name}
                        {!message.read && (
                          <Badge className="ml-2 bg-blue-500">ใหม่</Badge>
                        )}
                      </h3>
                      <div className="text-gray-500 text-sm mt-1">
                        <span className="inline-block mr-3">{message.email}</span>
                        <span className="inline-block">{message.phone}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gray-500 text-sm">{message.date}</div>
                      <div className="text-gray-400 text-xs">{message.time}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 line-clamp-2 mb-3">{message.message}</p>
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => handleViewMessage(message)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      ดูข้อความ
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={() => handleDeleteClick(message)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-gray-500">ไม่มีข้อความ</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-400">ยังไม่มีข้อความจากแบบฟอร์มติดต่อ</p>
            </CardContent>
          </Card>
        )}

        {/* View Message Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>ข้อความจาก {selectedMessage?.name}</DialogTitle>
              <DialogDescription>
                {selectedMessage?.date} • {selectedMessage?.time}
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <div className="py-4">
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-sm text-gray-500">อีเมล:</div>
                  <div className="col-span-2 text-sm">{selectedMessage.email}</div>
                  
                  <div className="text-sm text-gray-500">เบอร์โทรศัพท์:</div>
                  <div className="col-span-2 text-sm">{selectedMessage.phone}</div>
                </div>
                <div className="border-t pt-4">
                  <div className="text-sm text-gray-500 mb-2">ข้อความ:</div>
                  <p className="text-gray-700 whitespace-pre-line">{selectedMessage.message}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>ปิด</Button>
              <Button 
                variant="outline" 
                className="text-red-600 hover:bg-red-50"
                onClick={() => {
                  setIsViewDialogOpen(false);
                  handleDeleteClick(selectedMessage);
                }}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                ลบข้อความ
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ยืนยันการลบข้อความ</DialogTitle>
              <DialogDescription>
                คุณต้องการลบข้อความนี้หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
              </DialogDescription>
            </DialogHeader>
            {selectedMessage && (
              <div className="py-4">
                <p className="font-medium">ข้อความจาก: {selectedMessage.name}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedMessage.date} • {selectedMessage.time}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>ยกเลิก</Button>
              <Button variant="destructive" onClick={handleDeleteMessage}>ลบข้อความ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default MessagesManager;
