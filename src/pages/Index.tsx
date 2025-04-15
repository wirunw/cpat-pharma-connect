
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import HeroSlider from "@/components/landing/HeroSlider";
import ValueProposition from "@/components/landing/ValueProposition";
import CoursesPreview from "@/components/landing/CoursesPreview";
import FlexibilitySection from "@/components/landing/FlexibilitySection";
import TestimonialSection from "@/components/landing/TestimonialSection";
import CPATIntroduction from "@/components/landing/CPATIntroduction";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Slider - Auto-flip banners */}
        <HeroSlider />
        
        {/* Hero Section - Step 1 */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 md:px-10">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              CPAT: เริ่มต้นการศึกษาด้านเภสัชกรสู่ผู้นำด้านการบริหารเภสัชกิจ
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              พัฒนาทักษะ ผสานองค์ความรู้หลากหลายด้าน ต่อยอดสู่ความสำเร็จในอุตสาหกรรมยา
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/admission">
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  หลักสูตรที่เหมาะกับคุณ
                </Button>
              </Link>
              <Link to="/admission">
                <Button size="lg" variant="outline" className="border-white text-blue-900 hover:bg-white/10">
                  สมัครเรียน CPAT วันนี้
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Value Proposition - Step 2 */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-green-50 p-8 rounded-lg border-l-4 border-green-500">
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-6">
                  หลักสูตรที่ออกแบบมาเพื่อเภสัชกรที่ต้องการเติบโตในสายงานการบริหารเภสัชกิจ
                </h2>
                <p className="text-gray-700 mb-4">
                  พัฒนาทักษะอาชีพในระยะเวลาสั้น และสะดวกกว่าการศึกษาแบบเดิม
                </p>
                <p className="text-gray-700 mb-6">
                  หลักสูตรของ CPAT ได้รับการออกแบบโดยผู้เชี่ยวชาญจากอุตสาหกรรมสุขภาพและการตลาด ให้คุณได้เรียนรู้จากกรณีศึกษาจริง วิเคราะห์กลยุทธ์บริหารเภสัชกิจ และเชื่อมต่อเครือข่ายระดับมืออาชีพ เพื่อขับเคลื่อนอาชีพของคุณไปสู่ความสำเร็จ
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    ค่าเล่าเรียนและการรับสมัคร
                  </h3>
                  <p className="text-gray-700 mb-4">
                    โอกาสเข้าถึงที่ปรึกษาจากบริษัทชั้นนำและองค์กรเภสัชกรรมระดับโลก
                  </p>
                  <Link to="/admission" className="text-blue-600 font-medium flex items-center">
                    ดูรายละเอียด <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
                
                <div className="bg-blue-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold text-blue-900 mb-2">
                    ค้นหาหลักสูตรที่เหมาะกับคุณ
                  </h3>
                  <p className="text-gray-700 mb-4">
                    โอกาสเข้าถึงที่ปรึกษาจากบริษัทชั้นนำและองค์กรเภสัชกรรมระดับโลก
                  </p>
                  <Link to="/admission" className="text-blue-600 font-medium flex items-center">
                    ดูรายละเอียด <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Courses Preview - Step 3 */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">
              หลักสูตร และ รายวิชาสำหรับทุกสาขา
            </h2>
            <p className="text-lg text-gray-700 mb-12 max-w-4xl mx-auto text-center">
              CPAT: สร้างผู้นำด้านการบริหารระบบยาและนวัตกรรมสุขภาพ บูรณาการความรู้จากการจัดการนวัตกรรม ระบบอุปทานยา การประเมินเทคโนโลยีสุขภาพ จนถึงการออกแบบนโยบายสุขภาพ หลักสูตรเพื่อเภสัชกรที่มุ่งเป็นผู้นำการเปลี่ยนแปลงในระบบสุขภาพ เรียนรู้จากผู้เชี่ยวชาญและประยุกต์ใช้ในวิชาชีพ
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">หลักสูตรการศึกษา</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• การบริหารการศึกษาเภสัชศาสตร์</li>
                  <li>• การพัฒนาหลักสูตรและการสอน</li>
                  <li>• การประเมินผลการเรียนรู้</li>
                  <li>• เทคโนโลยีการศึกษาทางเภสัชศาสตร์</li>
                  <li>• การวิจัยทางการศึกษาเภสัชศาสตร์</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">การจัดการนวัตกรรมด้านยา</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• การพัฒนายาใหม่</li>
                  <li>• ทรัพย์สินทางปัญญาด้านยา</li>
                  <li>• การประเมินเทคโนโลยีด้านยา</li>
                  <li>• การบริหารโครงการวิจัยและพัฒนา</li>
                  <li>• นวัตกรรมในอุตสาหกรรมยา</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">การจัดการระบบอุปทานยาและผลิตภัณฑ์สุขภาพ</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• การจัดการห่วงโซ่อุปทานยา</li>
                  <li>• การบริหารคลังยา</li>
                  <li>• ระบบโลจิสติกส์ทางเภสัชกรรม</li>
                  <li>• การบริหารจัดการความเสี่ยง</li>
                  <li>• มาตรฐานคุณภาพในห่วงโซ่อุปทาน</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">การประเมินเทคโนโลยีด้านสุขภาพและการจัดการสิทธิประโยชน์</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• หลักการประเมินเทคโนโลยีสุขภาพ</li>
                  <li>• การประเมินความคุ้มค่าทางเศรษฐศาสตร์</li>
                  <li>• การบริหารชุดสิทธิประโยชน์</li>
                  <li>• การพัฒนานโยบายด้านยา</li>
                  <li>• จริยธรรมในการจัดสรรทรัพยากร</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">เภสัชสารสนเทศและการจัดการข้อมูล</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• ระบบสารสนเทศทางเภสัชกรรม</li>
                  <li>• การวิเคราะห์ข้อมูลขนาดใหญ่</li>
                  <li>• การใช้ AI ในงานเภสัชกรรม</li>
                  <li>• การจัดการฐานข้อมูลยา</li>
                  <li>• ความปลอดภัยของข้อมูลสุขภาพ</li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold text-blue-900 mb-4">การออกแบบระบบและบริหารนโยบายด้านยาและสุขภาพ</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• นโยบายสาธารณะด้านยา</li>
                  <li>• การค้าระหว่างประเทศและทรัพย์สินทางปัญญา</li>
                  <li>• ระบบประกันสุขภาพ</li>
                  <li>• การพัฒนานโยบายสุขภาพโลก</li>
                  <li>• การวิเคราะห์ผลกระทบด้านกฎระเบียบ</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/admission">
                <Button size="lg" className="bg-blue-700 hover:bg-blue-800">
                  ดูหลักสูตรทั้งหมด
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Flexibility Section - Step 4 */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                  หลักสูตรที่ปรับให้เหมาะกับเภสัชกรยุคใหม่ เรียนรู้จากมืออาชีพ ใช้ได้จริง
                </h2>
                <p className="text-lg text-gray-700 mb-8">
                  เรียนรู้ผ่านรูปแบบที่หลากหลายในรูปแบบ Online หรือ On-site และ Workshop เข้มข้น ยืดหยุ่นและสะดวก ช่วยให้คุณเรียนรู้ได้แม้มีเวลาจำกัด การศึกษาที่เข้าถึงง่าย ด้วยค่าใช้จ่ายที่เหมาะสม
                </p>
                <Link to="/admission">
                  <Button className="bg-blue-700 hover:bg-blue-800">
                    เรียนรู้เพิ่มเติม
                  </Button>
                </Link>
              </div>
              <div className="flex justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1280&auto=format&fit=crop" 
                  alt="รูปแบบการเรียนที่ยืดหยุ่น" 
                  className="rounded-lg shadow-lg max-w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonial Section - Step 5 */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">
              คณาจารย์และศิษย์เก่า
            </h2>
            
            <div className="bg-white p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <img 
                  src="/lovable-uploads/968b12a5-5483-4af4-a1e3-b2e2f2ed881f.png" 
                  alt="รศ.ดร.ภก. กร ศรเลิศล้ำวานิช" 
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <p className="text-xl italic text-gray-700 mb-6">
                    "หลักสูตรของที่นี่เปลี่ยนชีวิตอย่างสิ้นเชิง" เรียนรู้ประสบการณ์จากเภสัชกร วิทยาลัยบริหารเภสัชกิจแห่งประเทศไทย
                  </p>
                  <div>
                    <p className="font-bold text-blue-900">รศ.ดร.ภก. กร ศรเลิศล้ำวานิช</p>
                    <p className="text-gray-600">ผู้อำนวยการวิทยาลัยบริหารเภสัชกิจแห่งประเทศไทย; CPAT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CPAT Introduction - Step 6 */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">ทำความรู้จัก CPAT</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">เกี่ยวกับ CPAT</h3>
                <p className="text-gray-700 mb-6">
                  เรียนรู้เพิ่มเติมเกี่ยวกับวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย ประวัติความเป็นมา วิสัยทัศน์ และพันธกิจของเรา
                </p>
                <Link to="/about" className="inline-block">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    ไปสู่ About <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">ช่องทางติดต่อ</h3>
                <p className="text-gray-700 mb-6">
                  ติดต่อสอบถามข้อมูลเพิ่มเติมเกี่ยวกับหลักสูตรหรือการสมัครเรียน เราพร้อมให้คำปรึกษาและช่วยเหลือคุณทุกขั้นตอน
                </p>
                <Link to="/contact" className="inline-block">
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                    ไปสู่ Contact <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="mt-16 bg-gradient-to-r from-blue-900 to-blue-800 text-white p-10 rounded-lg text-center">
              <h3 className="text-2xl font-bold mb-4">
                โอกาสสู่ความเป็นเลิศด้านการบริหารเภสัชกิจ ร่วมเป็นส่วนหนึ่งกับสถาบันชั้นนำเพื่อความสำเร็จในวิชาชีพของคุณ
              </h3>
              <Link to="/admission">
                <Button size="lg" className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  สมัครเรียนทันที
                </Button>
              </Link>
            </div>
            
            <div className="mt-16 text-center">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">ข่าวสารและบทความ เกี่ยวกับ CPAT</h3>
              <Link to="/home">
                <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50">
                  ไปสู่ Home <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
