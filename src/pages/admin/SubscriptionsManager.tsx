
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
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
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { toast } from "sonner";
import { Download, MailPlus, Search, Trash2 } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";

const SubscriptionsManager = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubscriber, setSelectedSubscriber] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch subscribers from Supabase
  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setSubscribers(data || []);
    } catch (error: any) {
      console.error('Error fetching subscribers:', error.message);
      toast.error('ไม่สามารถดึงข้อมูลผู้รับข่าวสารได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleAddSubscriber = async () => {
    if (!newEmail) {
      toast.error("กรุณากรอกอีเมล");
      return;
    }
    
    // Validate email with simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }
    
    try {
      // Check if email already exists
      const { data: existingData } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', newEmail.toLowerCase())
        .single();

      if (existingData) {
        toast.error("อีเมลนี้มีอยู่ในระบบแล้ว");
        return;
      }
      
      const today = new Date();
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543; // Convert to Buddhist Era
      const formattedDate = `${day} ${month} ${year}`;
      
      const { error } = await supabase
        .from('subscribers')
        .insert([
          {
            email: newEmail.toLowerCase(),
            thai_date: formattedDate,
            source: "เพิ่มโดยผู้ดูแลระบบ"
          }
        ]);
      
      if (error) throw error;
      
      await fetchSubscribers();
      setNewEmail("");
      setIsAddDialogOpen(false);
      toast.success("เพิ่มผู้รับข่าวสารสำเร็จ");
    } catch (error: any) {
      console.error('Error adding subscriber:', error.message);
      toast.error('ไม่สามารถเพิ่มผู้รับข่าวสารได้');
    }
  };

  const handleDeleteClick = (subscriber: any) => {
    setSelectedSubscriber(subscriber);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteSubscriber = async () => {
    if (!selectedSubscriber) return;
    
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', selectedSubscriber.id);
      
      if (error) throw error;
      
      await fetchSubscribers();
      setIsDeleteDialogOpen(false);
      toast.success("ลบผู้รับข่าวสารสำเร็จ");
    } catch (error: any) {
      console.error('Error deleting subscriber:', error.message);
      toast.error('ไม่สามารถลบผู้รับข่าวสารได้');
    }
  };

  const filteredSubscribers = subscribers.filter(sub => 
    sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (sub.source && sub.source.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = () => {
    if (subscribers.length === 0) {
      toast.error('ไม่มีข้อมูลสำหรับดาวน์โหลด');
      return;
    }
    
    const headers = ["ID", "Email", "Date", "Source"];
    const csvData = [
      headers.join(","),
      ...subscribers.map(sub => 
        [sub.id, sub.email, sub.thai_date, sub.source].join(",")
      )
    ].join("\n");
    
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "cpat_subscribers.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("ดาวน์โหลดข้อมูลสำเร็จ");
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">สมาชิกรับข่าวสาร</h1>
            <p className="text-gray-500 mt-1">จัดการรายชื่ออีเมลสำหรับการส่งข่าวสาร</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={exportToCSV}
              disabled={subscribers.length === 0}
            >
              <Download className="h-4 w-4" />
              ส่งออกข้อมูล
            </Button>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <MailPlus className="h-4 w-4 mr-2" />
              เพิ่มผู้รับข่าวสาร
            </Button>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">ตัวกรองข้อมูล</CardTitle>
            <CardDescription>ค้นหาสมาชิกจากอีเมลหรือแหล่งที่มา</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input
                placeholder="ค้นหาตามอีเมลหรือแหล่งที่มา..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">รายชื่อสมาชิกรับข่าวสาร ({filteredSubscribers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : filteredSubscribers.length > 0 ? (
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">ลำดับ</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead>วันที่ลงทะเบียน</TableHead>
                      <TableHead>แหล่งที่มา</TableHead>
                      <TableHead className="text-right">การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.map((subscriber, index) => (
                      <TableRow key={subscriber.id}>
                        <TableCell className="font-medium">{index + 1}</TableCell>
                        <TableCell>{subscriber.email}</TableCell>
                        <TableCell>{subscriber.thai_date}</TableCell>
                        <TableCell>{subscriber.source}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                            onClick={() => handleDeleteClick(subscriber)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="py-8 text-center text-gray-500">
                {searchTerm ? "ไม่พบข้อมูลที่ตรงกับการค้นหา" : "ยังไม่มีข้อมูลสมาชิกรับข่าวสาร"}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Subscriber Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                  />
                </div>
                <Button 
                  variant="ghost" 
                  className="shrink-0 h-10 w-10 rounded-full p-0 text-gray-500"
                  onClick={() => setNewEmail("")}
                >
                  ล้าง
                </Button>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>ยกเลิก</Button>
              <Button onClick={handleAddSubscriber}>เพิ่ม</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ยืนยันการลบผู้รับข่าวสาร</DialogTitle>
              <DialogDescription>
                คุณต้องการลบอีเมลนี้ออกจากรายชื่อผู้รับข่าวสารหรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
              </DialogDescription>
            </DialogHeader>
            {selectedSubscriber && (
              <div className="py-4">
                <p className="font-medium">{selectedSubscriber.email}</p>
                <p className="text-sm text-gray-500 mt-1">ลงทะเบียนเมื่อ: {selectedSubscriber.thai_date}</p>
                <p className="text-sm text-gray-500">แหล่งที่มา: {selectedSubscriber.source}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>ยกเลิก</Button>
              <Button variant="destructive" onClick={handleDeleteSubscriber}>ลบออกจากรายชื่อ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SubscriptionsManager;
