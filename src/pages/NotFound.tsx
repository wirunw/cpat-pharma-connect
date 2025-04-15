
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
            <p className="text-xl text-gray-700 mb-6">ไม่พบหน้าที่คุณกำลังค้นหา</p>
            <p className="text-gray-500 mb-8">
              หน้าที่คุณพยายามเข้าถึง <span className="font-medium text-red-500">{location.pathname}</span> อาจถูกย้าย ลบ หรือไม่เคยมีอยู่
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild variant="outline">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft size={16} />
                  กลับไปหน้าหลัก
                </Link>
              </Button>
              <Button asChild>
                <Link to="/blog">
                  ดูบทความทั้งหมด
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
