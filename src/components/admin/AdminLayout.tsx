
import React, { ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Briefcase, FileText, LogOut, Mail, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = async () => {
    try {
      // First check if we have a session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log("No active session found, redirecting to login");
        toast.info("ไม่พบเซสชันที่ใช้งาน กำลังนำไปสู่หน้าเข้าสู่ระบบ");
        navigate("/admin/login");
        return;
      }
      
      // If we have a session, try to sign out
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      toast.success("ออกจากระบบสำเร็จ");
      navigate("/admin/login");
    } catch (error: any) {
      console.error("Logout error:", error.message);
      toast.error(`ไม่สามารถออกจากระบบได้: ${error.message}`);
      
      // Even if there's an error, try to redirect to login
      navigate("/admin/login");
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "bg-blue-100 text-blue-800" : "";
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-white border-r border-gray-200 w-full md:w-64 p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-900">CPAT Admin</h1>
          <p className="text-gray-500 text-sm">ระบบผู้ดูแล</p>
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin/dashboard" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 ${isActive("/admin/dashboard")}`}
              >
                <Briefcase size={20} />
                <span>แดชบอร์ด</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/blog" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 ${isActive("/admin/blog")}`}
              >
                <FileText size={20} />
                <span>จัดการบทความ</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/messages" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 ${isActive("/admin/messages")}`}
              >
                <MessageSquare size={20} />
                <span>ข้อความติดต่อ</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/subscriptions" 
                className={`flex items-center gap-2 p-2 rounded-md hover:bg-blue-50 ${isActive("/admin/subscriptions")}`}
              >
                <Mail size={20} />
                <span>สมาชิกรับข่าวสาร</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full flex items-center gap-2 justify-center"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            <span>ออกจากระบบ</span>
          </Button>
          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-blue-600 hover:text-blue-800">
              กลับสู่หน้าเว็บไซต์
            </Link>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
