
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
        ค่าใช้จ่ายสำหรับการศึกษาในหลักสูตรต่าง ๆ ของ CPAT
      </p>
    </div>

    <div className="bg-white p-8 rounded-lg shadow-md text-gray-800 space-y-6 text-lg leading-relaxed">
      <p>
        <strong>17.1</strong> รายวิชาการฝึกอบรมระยะสั้นทางการบริหารเภสัชกิจ ไม่น้อยกว่า <strong>30,000 บาทต่อหลักสูตร</strong><br />
        (สถาบันหลักผู้รับผิดชอบหลักสูตรอบรมระยะสั้นเป็นผู้กำหนด)
      </p>
      <p>
        <strong>17.2</strong> รายวิชาปฏิบัติการทำโครงงานการบริหารเภสัชกิจ ค่าลงทะเบียน<strong>หน่วยกิตละ 2,500 บาท</strong>
      </p>
      <p>
        <strong>17.3</strong> ค่าใช้จ่ายอื่นนอกเหนือค่าธรรมเนียมการเรียน: 
        ค่าธรรมเนียมการสอบเพื่อรับวุฒิบัตรเป็นผู้มีความรู้ความชำนาญในการประกอบวิชาชีพเภสัชกรรมสาขาบริหารเภสัชกิจตามที่สภาเภสัชกรรมกำหนด, 
        ค่าใช้จ่ายกรณีที่มีความสมัครใจไปศึกษาดูงานต่างประเทศในบางกระบวนวิชาของหลักสูตรระยะสั้น, 
        ค่าตีพิมพ์ผลงานวิชาการ ขึ้นกับอัตราที่วารสารนั้นกำหนด
      </p>
    </div>
  </div>
</section>
        
        {/* Course Competencies */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">หลักสูตรพัฒนาสมรรถนะ</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                สมรรถนะที่ผู้เรียนจะได้รับการพัฒนาตลอดหลักสูตรการศึกษา
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">ด้านการจัดการธุรกิจ</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การวางแผนธุรกิจและการจัดทำงบประมาณ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การวิเคราะห์การเงินและบัญชีสำหรับธุรกิจเภสัชกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การบริหารความเสี่ยงและการปฏิบัติตามกฎระเบียบ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การตลาดสำหรับธุรกิจเภสัชกรรมและสุขภาพ</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">ด้านการบริหารจัดการทรัพยากร</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การบริหารทรัพยากรบุคคลและการพัฒนาทีม</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การบริหารคลังสินค้าและห่วงโซ่อุปทาน</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การจัดการคุณภาพและมาตรฐานในงานเภสัชกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การประยุกต์ใช้เทคโนโลยีสารสนเทศในงานเภสัชกรรม</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">ด้านภาวะผู้นำและการจัดการ</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การพัฒนาภาวะผู้นำและทักษะการตัดสินใจ</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การสื่อสารเชิงกลยุทธ์และการเจรจาต่อรอง</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การบริหารการเปลี่ยนแปลงและนวัตกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">จริยธรรมในการบริหารและความรับผิดชอบต่อสังคม</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-blue-900 mb-4">ด้านการวิจัยและพัฒนา</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การออกแบบและดำเนินการวิจัยด้านเภสัชกรรม</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การวิเคราะห์ข้อมูลและการตัดสินใจเชิงหลักฐาน</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การพัฒนานวัตกรรมและการจัดการทรัพย์สินทางปัญญา</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">การเขียนโครงการและการนำเสนอผลงานวิชาการ</span>
                  </li>
                </ul>
              </div>
            </div>
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
