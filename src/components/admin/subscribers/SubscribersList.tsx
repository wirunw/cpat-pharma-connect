
import { Download, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import type { Subscriber } from "@/hooks/useSubscribers";

interface SubscribersListProps {
  subscribers: Subscriber[];
  isLoading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onDelete: (subscriber: Subscriber) => void;
}

export function SubscribersList({
  subscribers,
  isLoading,
  searchTerm,
  onSearchChange,
  onDelete,
}: SubscribersListProps) {
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
    <>
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
              onChange={(e) => onSearchChange(e.target.value)}
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
                          onClick={() => onDelete(subscriber)}
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
    </>
  );
}
