
import React from "react";
import { CheckCircle, ArrowRight, FileBadge, Calendar, BookOpen, Pencil } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Admission = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">การรับสมัครเรียน</h1>
            <p className="text-xl max-w-3xl">
              ระเบียบการรับสมัครเข้าศึกษาต่อในหลักสูตรการบริหารเภสัชกิจของวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย
            </p>
          </div>
        </section>
        
        {/* Application Process */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">ขั้นตอนการสมัคร</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                กระบวนการสมัครเข้าศึกษาต่อที่ CPAT มีขั้นตอนง่ายๆ ดังนี้
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <FileBadge className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">1. ตรวจสอบคุณสมบัติ</h3>
                <p className="text-gray-700">
                  ตรวจสอบคุณสมบัติเบื้องต้นและเอกสารที่ต้องใช้ในการสมัคร
                </p>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Pencil className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">2. กรอกใบสมัคร</h3>
                <p className="text-gray-700">
                  กรอกข้อมูลในใบสมัครออนไลน์และอัพโหลดเอกสารประกอบ
                </p>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">3. สอบสัมภาษณ์</h3>
                <p className="text-gray-700">
                  เข้ารับการสัมภาษณ์กับคณะกรรมการเพื่อประเมินความพร้อม
                </p>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-blue-900 mb-2">4. ลงทะเบียน</h3>
                <p className="text-gray-700">
                  เมื่อผ่านการคัดเลือก ดำเนินการลงทะเบียนและชำระค่าเล่าเรียน
                </p>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                ดาวน์โหลดคู่มือการสมัคร
              </Button>
            </div>
          </div>
        </section>
        
        {/* Tuition & Fees */}
      <section className="py-16 px-4 bg-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">ค่าธรรมเนียมการศึกษา</h2>
            <p className="text-xl text-blue-700 max-w-3xl mx-auto">
              รายละเอียดค่าใช้จ่ายในหลักสูตรต่าง ๆ ของ CPAT
            </p>
          </div>
      
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <Card className="overflow-hidden">
              <div className="bg-blue-700 text-white p-4 text-center">
                <h3 className="text-xl font-bold">หลักสูตรอบรมระยะสั้น</h3>
                <p className="text-sm">ตามที่สถาบันกำหนด</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-3xl font-bold text-blue-900 text-center">เริ่มต้น 30,000 บาท</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ค่าใช้จ่ายกำหนดโดยสถาบันหลักที่รับผิดชอบหลักสูตร
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ครอบคลุมวิชาการบริหารเภสัชกิจเฉพาะด้าน
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ระยะเวลาอบรมโดยทั่วไปอยู่ที่ 16 สัปดาห์ แต่ทั้งนี้ ขึ้นกับหลักสูตร
                  </li>
                </ul>
              </CardContent>
            </Card>
      
            {/* Card 2 */}
            <Card className="overflow-hidden border-2 border-yellow-500 relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-blue-900 py-1 px-3 text-sm font-bold">
                สำหรับโครงงาน
              </div>
              <div className="bg-blue-800 text-white p-4 text-center">
                <h3 className="text-xl font-bold">โครงงานการบริหารเภสัชกิจ</h3>
                <p className="text-sm">วิชาปฏิบัติการ</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-3xl font-bold text-blue-900 text-center">2,500 บาท / หน่วยกิต</p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ใช้กับรายวิชาที่เป็นโครงงานจริง
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ลงทะเบียนหน่วยกิตตามจำนวนที่เรียน
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    เหมาะสำหรับผู้ต้องการทำวิจัย / พัฒนา
                  </li>
                </ul>
              </CardContent>
            </Card>
      
            {/* Card 3 */}
            <Card className="overflow-hidden">
              <div className="bg-blue-900 text-white p-4 text-center">
                <h3 className="text-xl font-bold">ค่าใช้จ่ายอื่น ๆ</h3>
                <p className="text-sm">นอกเหนือค่าธรรมเนียมหลัก</p>
              </div>
              <CardContent className="p-6 space-y-4">
                <ul className="space-y-3 text-gray-700 text-base">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ค่าธรรมเนียมสอบวุฒิบัตรตามที่สภาเภสัชกรรมกำหนด
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ค่าเดินทางศึกษาดูงานต่างประเทศ (ถ้ามี)
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-1" />
                    ค่าตีพิมพ์ผลงานวิชาการ (ขึ้นกับวารสาร)
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
         {/* Call to Action after tuition cards */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-semibold text-blue-900 mb-4">
          สนใจเข้าเรียนกับเรา?
        </h3>
        <p className="text-lg text-gray-700 mb-6 max-w-xl mx-auto">
          วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย (CPAT) ยินดีต้อนรับผู้เรียนทุกท่านที่ต้องการพัฒนาทักษะด้านการบริหารในวงการเภสัชกรรม
        </p>
        <Button
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-8 py-3"
        >
          สมัครเรียน
        </Button>
      </div>
      </section>

       
        
                {/* Cpat Program Overview */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">📘 หลักสูตรวุฒิบัตรฯ สาขาการบริหารเภสัชกิจ</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                หลักสูตรจากวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย สภาเภสัชกรรม พ.ศ. 2566
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* ชื่อหลักสูตรและวุฒิบัตร */}
              <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-xl shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🎓 1. ชื่อหลักสูตรและวุฒิบัตร</h3>
                <ul className="text-gray-700 space-y-2 list-inside">
                  <li><strong>ชื่อหลักสูตร:</strong> วุฒิบัตรเป็นผู้มีความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรม สาขาการบริหารเภสัชกิจ</li>
                  <li><strong>ชื่อย่อวุฒิบัตร:</strong> ว.ภ. (การบริหารเภสัชกิจ) / FCPA</li>
                  <li><strong>ชื่อเต็ม (อังกฤษ):</strong> Fellow of College of Pharmacy Administration</li>
                  <li><strong>หน่วยงาน:</strong> วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย สภาเภสัชกรรม</li>
                </ul>
              </div>

              {/* ปรัชญาและวัตถุประสงค์ */}
              <div className="bg-gradient-to-br from-blue-100 to-white p-6 rounded-xl shadow hover:shadow-md transition">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🌱 2. ปรัชญาและวัตถุประสงค์</h3>
                <p className="text-gray-700 mb-3">
                  <strong>📌 ปรัชญา:</strong> สร้างเภสัชกรที่เชี่ยวชาญด้านการบริหารเภสัชกิจตลอดห่วงโซ่คุณค่า เพื่อประชาชนเข้าถึงยาและบริการสุขภาพอย่างปลอดภัย คุ้มค่า
                </p>
                <p className="text-gray-700">
                  <strong>🎯 วัตถุประสงค์:</strong> เป็นผู้นำการเปลี่ยนแปลง มีทักษะผู้ประกอบการ เรียนรู้ตลอดชีวิต เชี่ยวชาญในอย่างน้อย 1 ด้านของการบริหารเภสัชกิจ พร้อม Personalized Education
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Functional Competency */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🧩 3. ความเชี่ยวชาญหลัก (Functional Competency - FC)</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>🔹 FC1: การจัดการนวัตกรรมด้านยา</li>
                  <li>🔹 FC2: การจัดการห่วงโซ่อุปทานด้านยาและผลิตภัณฑ์สุขภาพ</li>
                  <li>🔹 FC3: การประเมินเทคโนโลยีด้านสุขภาพ และสิทธิประโยชน์ทางเภสัชกรรม</li>
                  <li>🔹 FC4: เภสัชสารสนเทศและการจัดการข้อมูล</li>
                  <li>🔹 FC5: การออกแบบระบบและบริหารนโยบายด้านยาและสุขภาพ</li>
                </ul>
              </div>

              {/* Core Competency */}
              <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow">
                <h3 className="text-xl font-bold text-blue-900 mb-4">🧠 4. สมรรถนะหลัก (Core Competency - CC)</h3>
                <ul className="text-gray-700 space-y-2 list-disc list-inside">
                  <li>🟢 CC1: Lead & Entrepreneurship – การคิดเชิงระบบ, การแก้ปัญหา</li>
                  <li>🟢 CC2: Professional Liaison – การนำเสนอ, การสื่อสาร, การเขียนเชิงวิชาการ</li>
                  <li>🟢 CC3: Global Perspective – มุมมองระดับนานาชาติ</li>
                  <li>🟢 CC4: Professional Anchor – ธรรมาภิบาล, การเรียนรู้ตลอดชีวิต</li>
                  <li>🟢 CC5: Digital Transformation – ความรู้ดิจิทัลและการจัดการข้อมูล</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

              {/* Call to Action Section */}
        <section className="py-20 px-4 bg-blue-900 text-white text-center">
          <h2 className="text-4xl font-bold mb-4">🚀 พร้อมที่จะเริ่มต้นการเดินทางกับเรา?</h2>
          <p className="text-xl mb-8">เปิดโอกาสให้ตัวคุณได้พัฒนาทักษะการบริหารและก้าวสู่การเป็นผู้นำในวงการเภสัชกรรม</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-6 py-3 rounded-lg transition shadow-md">ดูหลักสูตรทั้งหมด</button>
            <button className="bg-white hover:bg-gray-100 text-blue-900 font-semibold px-6 py-3 rounded-lg transition shadow-md">ติดต่อผู้เชี่ยวชาญ</button>
          </div>
        </section>
        
        {/* FAQ */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">คำถามที่พบบ่อย</h2>
              <p className="text-xl text-blue-700">
                เรารวบรวมคำถามที่ผู้สนใจสมัครเรียนมักถามบ่อยๆ
              </p>
            </div>
            
            <Accordion type="single" collapsible className="bg-white rounded-lg shadow-sm">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">คุณสมบัติของผู้สมัครเรียนมีอะไรบ้าง?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    ผู้สมัครต้องเป็นเภสัชกรที่มีใบประกอบวิชาชีพเภสัชกรรม หรือผู้ที่สำเร็จการศึกษาระดับปริญญาตรีด้านเภสัชศาสตร์ และมีประสบการณ์การทำงานอย่างน้อย 1 ปี (ขึ้นอยู่กับหลักสูตรที่สมัคร)
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">หลักสูตรเรียนวันไหนบ้าง? สามารถทำงานไปด้วยได้หรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    หลักสูตรส่วนใหญ่เรียนในวันเสาร์-อาทิตย์ หรือวันศุกร์เย็น-เสาร์-อาทิตย์ ทำให้ผู้เรียนสามารถทำงานประจำไปพร้อมกับการเรียนได้ นอกจากนี้ยังมีบางรายวิชาที่เรียนผ่านระบบออนไลน์ได้อีกด้วย
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">มีทุนการศึกษาหรือการผ่อนชำระค่าเล่าเรียนหรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    CPAT มีทุนการศึกษาสำหรับผู้ที่มีผลการเรียนดีเด่นและมีความจำเป็นด้านการเงิน และเรายังมีโครงการผ่อนชำระค่าเล่าเรียนโดยไม่มีดอกเบี้ยตลอดระยะเวลาการศึกษา สามารถสอบถามรายละเอียดเพิ่มเติมได้ที่ฝ่ายรับสมัคร
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">หลักสูตรของ CPAT ได้รับการรับรองจากหน่วยงานใดบ้าง?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    หลักสูตรของ CPAT ได้รับการรับรองจากสภาเภสัชกรรม และบางหลักสูตรได้รับการรับรองจากสำนักงานคณะกรรมการการอุดมศึกษา (สกอ.) ซึ่งทำให้วุฒิการศึกษาสามารถนำไปใช้ในการเลื่อนตำแหน่งหรือศึกษาต่อได้
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-5">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">มีการจัดการเรียนการสอนออนไลน์หรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    ใช่ เรามีการจัดการเรียนการสอนแบบผสมผสาน (Blended Learning) โดยบางรายวิชาจะเรียนผ่านระบบออนไลน์ และบางรายวิชาจะเรียนในชั้นเรียน รวมถึงมีการฝึกปฏิบัติและการศึกษาดูงานนอกสถานที่
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">พร้อมเริ่มต้นการเดินทางสู่ความสำเร็จ?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              สมัครเข้าศึกษาในหลักสูตรที่ตรงกับเป้าหมายของคุณวันนี้ หรือติดต่อเราเพื่อสอบถามข้อมูลเพิ่มเติม
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                สมัครเรียนทันที
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                ขอคำปรึกษา
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admission;
