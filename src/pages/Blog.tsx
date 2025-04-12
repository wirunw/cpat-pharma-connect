
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Sample blog post data - to be replaced with real data later
const blogPosts = [
  {
    id: 1,
    title: "การพัฒนาความรู้ด้านการบริหารเภสัชกิจในยุคดิจิทัล",
    excerpt: "บทความนี้กล่าวถึงความสำคัญของการพัฒนาทักษะการบริหารเภสัชกิจในยุคที่เทคโนโลยีดิจิทัลกำลังเปลี่ยนแปลงวงการเภสัชกรรม",
    date: "10 มีนาคม 2025",
    imageUrl: "/placeholder.svg",
    category: "การศึกษา"
  },
  {
    id: 2,
    title: "บทบาทของเภสัชกรในการพัฒนาระบบสาธารณสุขไทย",
    excerpt: "เภสัชกรมีบทบาทสำคัญในการพัฒนาระบบสาธารณสุขของประเทศไทย บทความนี้จะอธิบายถึงความสำคัญและโอกาสในการมีส่วนร่วม",
    date: "25 กุมภาพันธ์ 2025",
    imageUrl: "/placeholder.svg",
    category: "วิชาชีพ"
  },
  {
    id: 3,
    title: "แนวโน้มใหม่ในการบริหารร้านยาให้ประสบความสำเร็จ",
    excerpt: "การบริหารร้านยาในปัจจุบันต้องปรับตัวให้ทันกับการเปลี่ยนแปลง บทความนี้รวบรวมเทคนิคการบริหารร้านยาสมัยใหม่",
    date: "15 มกราคม 2025",
    imageUrl: "/placeholder.svg",
    category: "ธุรกิจ"
  },
  {
    id: 4,
    title: "โครงการฝึกอบรมพิเศษสำหรับเภสัชกรประจำปี 2025",
    excerpt: "CPAT เตรียมจัดโครงการฝึกอบรมพิเศษสำหรับเภสัชกรที่สนใจพัฒนาทักษะด้านการบริหาร รายละเอียดและกำหนดการ",
    date: "5 มกราคม 2025",
    imageUrl: "/placeholder.svg",
    category: "ข่าวสาร"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">บทความและข่าวสาร</h1>
            <p className="text-xl max-w-3xl">
              ติดตามข่าวสาร บทความวิชาการ และความรู้ใหม่ๆ ด้านการบริหารเภสัชกิจจากผู้เชี่ยวชาญของเรา
            </p>
          </div>
        </section>
        
        {/* Blog posts grid */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
                  <div className="h-48 bg-gray-200">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-blue-600 font-medium">{post.category}</span>
                      <span className="text-sm text-gray-500">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-blue-900">{post.title}</h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700">
                      อ่านเพิ่มเติม
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter signup */}
        <section className="bg-blue-50 py-16 px-4">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">รับข่าวสารและบทความใหม่ๆ</h2>
            <p className="text-gray-600 mb-8">ลงทะเบียนรับจดหมายข่าวของเราเพื่อติดตามบทความ ข่าวสาร และกิจกรรมล่าสุดจาก CPAT</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <input 
                type="email" 
                placeholder="อีเมลของคุณ" 
                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium">
                สมัครรับข่าวสาร
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
