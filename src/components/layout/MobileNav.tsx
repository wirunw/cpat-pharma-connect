
import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-blue-900 text-white z-50 flex flex-col">
      <div className="flex justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <img 
            src="/placeholder.svg" 
            alt="CPAT Logo" 
            className="h-12 w-auto"
          />
          <h2 className="text-lg font-bold">CPAT</h2>
        </div>
        <Button variant="ghost" onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </Button>
      </div>
      
      <nav className="flex flex-col gap-4 p-6 text-xl">
        <Link to="/" className="py-3 border-b border-blue-800" onClick={onClose}>หน้าแรก</Link>
        <Link to="/about" className="py-3 border-b border-blue-800" onClick={onClose}>เกี่ยวกับเรา</Link>
        <Link to="/admission" className="py-3 border-b border-blue-800" onClick={onClose}>การรับสมัคร</Link>
        <Link to="/blog" className="py-3 border-b border-blue-800" onClick={onClose}>บทความ</Link>
        <Link to="/contact" className="py-3 border-b border-blue-800" onClick={onClose}>ติดต่อเรา</Link>
      </nav>
      
      <div className="mt-auto p-6">
        <Button className="w-full mb-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
          สมัครเข้าร่วมหลักสูตร
        </Button>
      </div>
    </div>
  );
};

export default MobileNav;
