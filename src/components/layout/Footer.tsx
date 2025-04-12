
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย</h3>
            <p className="mb-4">
              College of Pharmacy Administration of Thailand (CPAT)
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/CPATThailand" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-400" aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">ลิงก์ด่วน</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-yellow-400">หน้าแรก</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-yellow-400">เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link to="/admission" className="hover:text-yellow-400">การรับสมัคร</Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-yellow-400">บทความ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-400">ติดต่อเรา</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">ติดต่อเรา</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>02-591-9992-5</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>info@cpat.ac.th</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                <span>อาคารมหิตลาธิเบศร ชั้น 9 สภาเภสัชกรรม 3 ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p>© {new Date().getFullYear()} วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย (CPAT). สงวนลิขสิทธิ์</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
