
import React from "react";
import { ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">เกี่ยวกับ CPAT</h1>
            <p className="text-xl max-w-3xl">
              เรามุ่งมั่นที่จะสร้างโอกาสการเรียนรู้และพัฒนาทักษะการบริหารเภสัชกิจให้แก่เภสัชกรทุกคน
              เพื่อเตรียมความพร้อมสู่การเป็นผู้นำในวงการเภสัชกรรมของประเทศไทย
            </p>
          </div>
        </section>
        
        {/* Dean's Message */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/3">
                <img 
                  src="/placeholder.svg" 
                  alt="คณบดี CPAT" 
                  className="rounded-lg shadow-md w-full"
                />
              </div>
              <div className="md:w-2/3">
                <h2 className="text-3xl font-bold text-blue-900 mb-6">สารจากคณบดี</h2>
                <div className="text-gray-700 space-y-4">
                  <p>
                    สวัสดีครับ ในนามของวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย ผมขอต้อนรับทุกท่านเข้าสู่แหล่งการเรียนรู้ที่จะพัฒนาศักยภาพของเภสัชกรไทยสู่ความเป็นเลิศทางการบริหาร
                  </p>
                  <p>
                    วิทยาลัยของเราเป็นสถาบันที่มุ่งเน้นการผสมผสานความรู้ทางเภสัชศาสตร์เข้ากับทักษะการบริหารจัดการสมัยใหม่ เพื่อสร้างผู้นำในวงการเภสัชกรรมที่พร้อมรับมือกับความท้าทายในยุคที่เทคโนโลยีและนวัตกรรมเปลี่ยนแปลงอย่างรวดเร็ว
                  </p>
                  <p>
                    เราเชื่อว่าการศึกษาที่มีคุณภาพจะเป็นรากฐานสำคัญในการพัฒนาระบบสาธารณสุขของประเทศ ผ่านการสร้างบุคลากรที่มีทั้งความรู้และความสามารถในการบริหารจัดการทรัพยากรอย่างมีประสิทธิภาพ
                  </p>
                  <p className="font-semibold">
                    ศ.ภก.ดร. สมชาย วัชรประยูร<br />
                    คณบดีวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Organization Story */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">ประวัติความเป็นมา</h2>
              <p className="text-xl text-blue-700">ก่อตั้งเมื่อ พ.ศ. 2560</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-900 mb-4">จุดเริ่มต้น</h3>
                <p className="text-gray-700">
                  วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย (CPAT) ก่อตั้งขึ้นจากความร่วมมือระหว่างสภาเภสัชกรรมและผู้เชี่ยวชาญด้านการบริหารเภสัชกิจจากทั่วประเทศ ด้วยวิสัยทัศน์ที่ต้องการยกระดับวิชาชีพเภสัชกรรมไทยให้ก้าวทันการเปลี่ยนแปลงของโลก
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-900 mb-4">การเติบโต</h3>
                <p className="text-gray-700">
                  ตลอดระยะเวลาที่ผ่านมา CPAT ได้พัฒนาหลักสูตรที่ตอบโจทย์ความต้องการของวงการเภสัชกรรมไทย โดยเน้นการผสมผสานระหว่างทฤษฎีและการปฏิบัติจริง ปัจจุบันเรามีเครือข่ายความร่วมมือกับองค์กรทั้งภาครัฐและเอกชนทั่วประเทศ
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mission and Vision */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">วิสัยทัศน์</h2>
                <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  <p className="text-lg text-gray-700">
                    เป็นสถาบันชั้นนำด้านการบริหารเภสัชกิจที่สร้างผู้นำและนวัตกรในวงการเภสัชกรรมเพื่อพัฒนาระบบสุขภาพของประเทศไทยอย่างยั่งยืน
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">พันธกิจ</h2>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">1</span>
                    <p className="text-gray-700">พัฒนาหลักสูตรการศึกษาที่ตอบสนองต่อความต้องการของวงการเภสัชกรรมในปัจจุบันและอนาคต</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">2</span>
                    <p className="text-gray-700">สร้างเครือข่ายความร่วมมือกับองค์กรทั้งในและต่างประเทศเพื่อแลกเปลี่ยนความรู้และประสบการณ์</p>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-1 flex-shrink-0">3</span>
                    <p className="text-gray-700">ส่งเสริมการวิจัยและพัฒนานวัตกรรมทางการบริหารเภสัชกิจที่ตอบสนองต่อความท้าทายของระบบสาธารณสุขไทย</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Statistics */}
        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">CPAT ในตัวเลข</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">500+</p>
                <p className="text-lg">ผู้สำเร็จการศึกษา</p>
              </div>
              
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">12</p>
                <p className="text-lg">หลักสูตรที่เปิดสอน</p>
              </div>
              
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">30+</p>
                <p className="text-lg">อาจารย์ผู้เชี่ยวชาญ</p>
              </div>
              
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">95%</p>
                <p className="text-lg">อัตราความพึงพอใจ</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Inspiration Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">แรงบันดาลใจ</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                ประโยคที่สร้างแรงบันดาลใจให้กับเราในการพัฒนาการศึกษาด้านการบริหารเภสัชกิจ
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-white">
                <CardContent className="p-8">
                  <p className="text-xl italic text-gray-700 mb-4">
                    "การศึกษาไม่ได้หยุดเพียงแค่ในห้องเรียน แต่เป็นเส้นทางตลอดชีวิตที่จะพัฒนาคุณให้เติบโตและปรับตัวในโลกที่เปลี่ยนแปลงอยู่เสมอ"
                  </p>
                  <p className="font-semibold text-right">- ศ.ภก.ดร. วิชัย สันติมาลีวรกุล</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white">
                <CardContent className="p-8">
                  <p className="text-xl italic text-gray-700 mb-4">
                    "ความรู้ทางเภสัชศาสตร์เมื่อผสานกับทักษะการบริหาร จะสร้างผู้นำที่สามารถยกระดับระบบสาธารณสุขของประเทศได้อย่างแท้จริง"
                  </p>
                  <p className="font-semibold text-right">- รศ.ภญ.ดร. สุนทรี วิทยานารถไพศาล</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">เสียงจากศิษย์เก่า</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="ภาพศิษย์เก่า" 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-blue-900">ภก. สมชาย ใจดี</h4>
                    <p className="text-sm text-gray-600">เจ้าของร้านยา, รุ่น 2</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "หลักสูตรของ CPAT ช่วยให้ผมมีมุมมองใหม่ๆ ในการบริหารร้านยา ทำให้ธุรกิจเติบโตขึ้นอย่างมากในช่วง 2 ปีที่ผ่านมา ทั้งเรื่องการบริหารสต็อก การตลาด และการสร้างความสัมพันธ์กับลูกค้า"
                </p>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="ภาพศิษย์เก่า" 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-blue-900">ภญ. วรรณา รักเรียน</h4>
                    <p className="text-sm text-gray-600">ผู้จัดการฝ่ายเภสัชกรรม โรงพยาบาลเอกชน, รุ่น 1</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "ความรู้ด้านการบริหารทรัพยากรและการพัฒนาทีมงานที่ได้จาก CPAT ช่วยให้ฉันสามารถนำพาแผนกเภสัชกรรมผ่านช่วงการเปลี่ยนแปลงครั้งใหญ่ได้อย่างราบรื่น การเรียนที่นี่คุ้มค่ามาก"
                </p>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src="/placeholder.svg" 
                    alt="ภาพศิษย์เก่า" 
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-bold text-blue-900">ภญ. มนัสนันท์ พัฒนา</h4>
                    <p className="text-sm text-gray-600">ผู้บริหารบริษัทยา, รุ่น 3</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "การเรียนที่ CPAT ไม่เพียงให้ความรู้ด้านการบริหาร แต่ยังสร้างเครือข่ายวิชาชีพที่กว้างขวาง ทำให้ฉันมีโอกาสได้ร่วมงานกับผู้เชี่ยวชาญหลากหลายสาขา ซึ่งเป็นประโยชน์อย่างมากในการทำงาน"
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">พร้อมที่จะเริ่มต้นการเดินทางกับเรา?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              เปิดโอกาสให้ตัวคุณได้พัฒนาทักษะการบริหารและก้าวสู่การเป็นผู้นำในวงการเภสัชกรรม
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                ดูหลักสูตรทั้งหมด
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                ติดต่อผู้เชี่ยวชาญ
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
