
import React, { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const MessagesManager = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch messages from Supabase
  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMessages(data || []);
    } catch (error: any) {
      console.error('Error fetching messages:', error.message);
      toast.error('ไม่สามารถดึงข้อมูลข้อความได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleViewMessage = async (message: any) => {
    setSelectedMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if not already
    if (!message.read) {
      try {
        const { error } = await supabase
          .from('contact_messages')
          .update({ read: true })
          .eq('id', message.id);
        
        if (error) throw error;
        
        // Update local state to reflect the change
        setMessages(messages.map(msg => 
          msg.id === message.id ? { ...msg, read: true } : msg
        ));
      } catch (error: any) {
        console.error('Error marking message as read:', error.message);
      }
    }
  };

  const handleDeleteClick = (message: any) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', selectedMessage.id);
      
      if (error) throw error;
      
      await fetchMessages();
      setIsDeleteDialogOpen(false);
      toast.success("ลบข้อความสำเร็จ");
    } catch (error: any) {
      console.error('Error deleting message:', error.message);
      toast.error('ไม่สามารถลบข้อความได้');
    }
  };

  const markAllAsRead = async () => {
    const unreadMessages = messages.filter(message => !message.read);
    
    if (unreadMessages.length === 0) {
      toast.info("ไม่มีข้อความที่ยังไม่ได้อ่าน");
      return;
    }
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ read: true })
        .in('id', unreadMessages.map(msg => msg.id));
      
      if (error) throw error;
      
      await fetchMessages();
      toast.success("ทำเครื่องหมายทั้งหมดว่าอ่านแล้ว");
    } catch (error: any) {
      console.error('Error marking all as read:', error.message);
      toast.error('ไม่สามารถทำเครื่องหมายทั้งหมดว่าอ่านแล้ว');
    }
  };

  const deleteAllMessages = async () => {
    if (messages.length === 0) {
      toast.info("ไม่มีข้อความที่จะลบ");
      return;
    }
    
    if (!window.confirm("คุณแน่ใจหรือไม่ที่จะลบข้อความทั้งหมด? การกระทำนี้ไม่สามารถยกเลิกได้")) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .in('id', messages.map(msg => msg.id));
      
      if (error) throw error;
      
      await fetchMessages();
      toast.success("ลบข้อความทั้งหมดสำเร็จ");
    } catch (error: any) {
      console.error('Error deleting all messages:', error.message);
      toast.error('ไม่สามารถลบข้อความทั้งหมด');
    }
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

        {isLoading ? (
          <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
        ) : messages.length > 0 ? (
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
                      <div className="text-gray-500 text-sm">{message.thai_date}</div>
                      <div className="text-gray-400 text-xs">{message.thai_time}</div>
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
                {selectedMessage?.thai_date} • {selectedMessage?.thai_time}
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
                <p className="text-sm text-gray-500 mt-1">{selectedMessage.thai_date} • {selectedMessage.thai_time}</p>
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
