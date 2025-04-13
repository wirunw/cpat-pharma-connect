
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  เปิดประตูสู่ความก้าวหน้าในวิชาชีพเภสัชกรรม
                </h1>
                <p className="text-xl mb-8">
                  เสริมความรู้ พัฒนาทักษะ ก้าวทันอุตสาหกรรมยาและเภสัชกรรมยุคใหม่
                </p>
                <Link to="/admission">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                    ดูหลักสูตร
                  </Button>
                </Link>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/placeholder.svg" 
                  alt="CPAT Hero Image" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 1 - Highlight section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">ไฮไลท์และข่าวสาร</h2>
            
            <div className="relative overflow-hidden">
              <div className="flex space-x-6 animate-carousel">
                {/* Auto-slide images */}
                <div className="min-w-[300px] md:min-w-[400px]">
                  <img 
                    src="/placeholder.svg" 
                    alt="รูปข่าวสารและกิจกรรม" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-medium text-gray-800">ข่าวสารและกิจกรรม</p>
                </div>
                <div className="min-w-[300px] md:min-w-[400px]">
                  <img 
                    src="/placeholder.svg" 
                    alt="รูปประชาสัมพันธ์หลักสูตร" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-medium text-gray-800">ประชาสัมพันธ์หลักสูตร</p>
                </div>
                <div className="min-w-[300px] md:min-w-[400px]">
                  <img 
                    src="/placeholder.svg" 
                    alt="ภาพกิจกรรมล่าสุด" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-medium text-gray-800">กิจกรรมล่าสุด</p>
                </div>
                <div className="min-w-[300px] md:min-w-[400px]">
                  <img 
                    src="/placeholder.svg" 
                    alt="ภาพศิษย์เก่าที่ประสบความสำเร็จ" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-medium text-gray-800">ศิษย์เก่าที่ประสบความสำเร็จ</p>
                </div>
                <div className="min-w-[300px] md:min-w-[400px]">
                  <img 
                    src="/placeholder.svg" 
                    alt="ข่าวสารวงการเภสัชกรรม" 
                    className="w-full h-64 object-cover rounded-lg shadow-md"
                  />
                  <p className="mt-2 font-medium text-gray-800">ข่าวสารวงการเภสัชกรรม</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 2 - Our Academic Philosophy */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">
                หลักสูตรเภสัชกรรมที่เน้นคุณภาพและนวัตกรรม เพื่อให้เภสัชกรไทยก้าวทันโลก
              </h2>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                หลักสูตรของเราได้รับการออกแบบโดยผู้เชี่ยวชาญในวงการเภสัชกรรม มุ่งเน้นการพัฒนาทักษะที่จำเป็นสำหรับเภสัชกรยุคใหม่ เพื่อตอบสนองความต้องการที่เปลี่ยนแปลงของวงการสาธารณสุขและอุตสาหกรรมยา
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรการบริหารเภสัชกิจ</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการพัฒนาทักษะด้านการบริหารจัดการในองค์กรเภสัชกรรม</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรการจัดการนวัตกรรมด้านยา</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการเชี่ยวชาญด้านการพัฒนาและบริหารนวัตกรรม</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรการจัดการระบบอุปทานยา</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการเชี่ยวชาญด้านห่วงโซ่อุปทานและโลจิสติกส์</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรการประเมินเทคโนโลยีสุขภาพ</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการเชี่ยวชาญด้านการประเมินความคุ้มค่าและเทคโนโลยี</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรเภสัชสารสนเทศ</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการเชี่ยวชาญด้านการจัดการข้อมูลและเทคโนโลยีสารสนเทศ</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-3">หลักสูตรการออกแบบนโยบายสุขภาพ</h3>
                  <p className="text-gray-700 mb-4">สำหรับเภสัชกรที่ต้องการเชี่ยวชาญด้านนโยบายสาธารณะและระบบสุขภาพ</p>
                  <div className="flex items-center text-amber-500 mb-2">
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                    <Star className="h-5 w-5 fill-amber-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="text-center">
              <Link to="/admission">
                <Button className="bg-blue-700 hover:bg-blue-800">
                  ดูรายละเอียดทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Section 3 - Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
              เสียงจากศิษย์เก่า
            </h2>
            
            <div className="bg-blue-50 p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img 
                  src="/placeholder.svg" 
                  alt="นางสาวสมใจ สมหวัง" 
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <p className="text-xl italic text-gray-700 mb-6">
                    "หลักสูตรนี้ช่วยให้ฉันพัฒนาทักษะที่สำคัญต่อวิชาชีพในระยะเวลาอันสั้น"
                  </p>
                  <div>
                    <p className="font-bold text-blue-900">นางสาวสมใจ สมหวัง</p>
                    <p className="text-gray-600">เภสัชกรการตลาด</p>
                    <p className="text-gray-600">จบการศึกษาปี 2565</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section 4 - Final Call-to-Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">เริ่มต้นเส้นทางการเรียนรู้ของคุณวันนี้!</h2>
            <p className="text-xl mb-8">
              สมัครเลย! เราพร้อมสนับสนุนคุณในทุกย่างก้าวของการเรียนรู้และความสำเร็จ
            </p>
            <Link to="/admission">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                สมัครเข้าร่วมหลักสูตร
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Section 5 - Contact Us */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
              Contact us
            </h2>
            
            <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
              <img 
                src="/placeholder.svg" 
                alt="CPAT Logo" 
                className="w-36 h-36 object-contain"
              />
              
              <div className="space-y-4">
                <p className="flex items-center text-gray-700">
                  <span className="font-bold mr-2">ที่อยู่:</span> อาคารมหิตลาธิเบศร ชั้น 9 สภาเภสัชกรรม กระทรวงสาธารณสุข
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-bold mr-2">อีเมล:</span> info@cpat.ac.th
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-bold mr-2">เบอร์โทร:</span> 02-591-9992-5
                </p>
                <p className="flex items-center text-gray-700">
                  <span className="font-bold mr-2">Facebook:</span> 
                  <a href="https://www.facebook.com/CPATThailand" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    CPATThailand
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
