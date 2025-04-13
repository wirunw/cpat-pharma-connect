
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { FileText, MessageSquare, Mail, Users } from "lucide-react";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">แดชบอร์ด</h1>
          <p className="text-gray-500 mt-1">ภาพรวมการจัดการระบบ CPAT</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard 
            title="บทความทั้งหมด" 
            value="4" 
            description="บทความที่เผยแพร่บนเว็บไซต์" 
            icon={<FileText className="h-8 w-8 text-blue-600" />} 
          />
          <DashboardCard 
            title="ข้อความติดต่อ" 
            value="12" 
            description="ข้อความจากแบบฟอร์มติดต่อ" 
            icon={<MessageSquare className="h-8 w-8 text-green-600" />} 
          />
          <DashboardCard 
            title="สมาชิกรับข่าวสาร" 
            value="86" 
            description="อีเมลที่ลงทะเบียนรับข่าวสาร" 
            icon={<Mail className="h-8 w-8 text-yellow-600" />} 
          />
          <DashboardCard 
            title="ผู้เยี่ยมชมเว็บไซต์" 
            value="1,245" 
            description="จำนวนผู้เข้าชมเว็บไซต์ในเดือนนี้" 
            icon={<Users className="h-8 w-8 text-purple-600" />} 
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>บทความล่าสุด</CardTitle>
              <CardDescription>
                บทความที่เพิ่มล่าสุดบนเว็บไซต์
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-2">
                  <div>การพัฒนาความรู้ด้านการบริหารเภสัชกิจในยุคดิจิทัล</div>
                  <div className="text-sm text-gray-500">10 มีนาคม 2025</div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div>บทบาทของเภสัชกรในการพัฒนาระบบสาธารณสุขไทย</div>
                  <div className="text-sm text-gray-500">25 กุมภาพันธ์ 2025</div>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <div>แนวโน้มใหม่ในการบริหารร้านยาให้ประสบความสำเร็จ</div>
                  <div className="text-sm text-gray-500">15 มกราคม 2025</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>ข้อความติดต่อล่าสุด</CardTitle>
              <CardDescription>
                ข้อความจากแบบฟอร์มติดต่อล่าสุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <div className="font-medium">สมชาย ใจดี</div>
                    <div className="text-sm text-gray-500">1 วันที่แล้ว</div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">สนใจสมัครเรียนหลักสูตรการบริหารเภสัชกิจ มีรายละเอียดเพิ่มเติมไหมครับ</div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <div className="font-medium">สมศรี มีสุข</div>
                    <div className="text-sm text-gray-500">3 วันที่แล้ว</div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">อยากสอบถามเกี่ยวกับค่าใช้จ่ายในหลักสูตร</div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between">
                    <div className="font-medium">วิชัย สุขสงวน</div>
                    <div className="text-sm text-gray-500">1 สัปดาห์ที่แล้ว</div>
                  </div>
                  <div className="text-sm text-gray-600 truncate">ขอสอบถามเรื่องการสมัครเรียนค่ะ มีเรียนออนไลน์หรือไม่</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
};

interface DashboardCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, description, icon }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-3xl font-bold mt-1">{value}</h3>
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          </div>
          <div>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
