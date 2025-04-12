
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import MobileNav from "./MobileNav";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header className="bg-white py-4 px-4 md:px-10 shadow-md">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/">
            <img 
              src="/placeholder.svg" 
              alt="CPAT Logo" 
              className="h-16 w-auto"
            />
          </Link>
          <div className="hidden md:block">
            <h1 className="text-blue-900 font-bold text-lg">วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย</h1>
            <p className="text-blue-700 text-sm">College of Pharmacy Administration of Thailand</p>
          </div>
        </div>
        
        <nav className="hidden md:flex gap-6 text-blue-900">
          <Link to="/" className="hover:text-yellow-500 font-medium">หน้าหลัก</Link>
          <Link to="/about" className="hover:text-yellow-500 font-medium">เกี่ยวกับเรา</Link>
          <Link to="/admission" className="hover:text-yellow-500 font-medium">การรับสมัคร</Link>
          <Link to="/blog" className="hover:text-yellow-500 font-medium">บทความ</Link>
          <Link to="/contact" className="hover:text-yellow-500 font-medium">ติดต่อเรา</Link>
        </nav>
        
        <button 
          className="md:hidden text-blue-900"
          onClick={() => setMobileNavOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      <MobileNav 
        isOpen={mobileNavOpen} 
        onClose={() => setMobileNavOpen(false)} 
      />
    </header>
  );
};

export default Header;
