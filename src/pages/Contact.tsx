
import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Download, Send } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast({
      title: "ข้อความถูกส่งเรียบร้อยแล้ว",
      description: "เราจะติดต่อกลับภายใน 24 ชั่วโมง",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">ติดต่อเรา</h1>
            <p className="text-xl max-w-3xl">
              หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับหลักสูตรและการสมัครเรียน 
              สามารถติดต่อเราได้ตามช่องทางด้านล่าง
            </p>
          </div>
        </section>
        
        {/* Contact Info Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Phone Contact */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">โทรศัพท์</h3>
                  <p className="text-gray-700 mb-4">ติดต่อเราโดยตรงทางโทรศัพท์</p>
                  <a href="tel:025919992" className="text-blue-600 font-medium">02-591-9992-5</a>
                </CardContent>
              </Card>
              
              {/* Email Contact */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">อีเมล</h3>
                  <p className="text-gray-700 mb-4">ส่งข้อความถึงเราทางอีเมล</p>
                  <a href="mailto:info@cpat.ac.th" className="text-blue-600 font-medium">info@cpat.ac.th</a>
                </CardContent>
              </Card>
              
              {/* Office Hours */}
              <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">เวลาทำการ</h3>
                  <p className="text-gray-700 mb-4">วันจันทร์ - วันศุกร์</p>
                  <p className="text-blue-600 font-medium">8:30 - 16:30 น.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Map & Form Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Map & Address */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">ที่ตั้งของเรา</h2>
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                  <div className="w-full h-80 bg-gray-200 rounded mb-4">
                    {/* Replace with actual map embed */}
                    <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                      <p>แผนที่ Google Maps จะปรากฏที่นี่</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0 mt-1" />
                    <p className="text-gray-700">
                      อาคารมหิตลาธิเบศร ชั้น 9 สภาเภสัชกรรม 3 ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000
                    </p>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-blue-900 mb-4">การเดินทาง</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">รถประจำทาง</h4>
                    <p className="text-gray-700">สาย 32, 51, 104, 166, 203, 351</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-bold text-blue-800 mb-2">รถไฟฟ้า MRT</h4>
                    <p className="text-gray-700">สถานีกระทรวงสาธารณสุข แล้วต่อรถแท็กซี่หรือรถประจำทางประมาณ 10 นาที</p>
                  </div>
                </div>
              </div>
              
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-bold text-blue-900 mb-6">ส่งข้อความถึงเรา</h2>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">ชื่อ-นามสกุล *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">อีเมล *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">เบอร์โทรศัพท์</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">เรื่อง *</label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">-- เลือกหัวข้อ --</option>
                        <option value="admission">สอบถามการรับสมัคร</option>
                        <option value="course">ข้อมูลหลักสูตร</option>
                        <option value="payment">การชำระเงิน</option>
                        <option value="other">อื่นๆ</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-gray-700 font-medium mb-2">ข้อความ *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto flex items-center justify-center">
                    <Send className="mr-2 h-4 w-4" />
                    ส่งข้อความ
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">คำถามที่พบบ่อย</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                รวบรวมคำถามและคำตอบที่พบบ่อยเกี่ยวกับการติดต่อและการสมัครเรียน
              </p>
            </div>
            
            <Accordion type="single" collapsible className="bg-blue-50 rounded-lg">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">จะขอเยี่ยมชมสถาบันได้อย่างไร?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    ท่านสามารถนัดหมายเพื่อเข้าเยี่ยมชมสถาบันได้โดยโทรมาที่เบอร์ 02-591-9992-5 หรือส่งอีเมลมาที่ info@cpat.ac.th ล่วงหน้าอย่างน้อย 3 วันทำการ เพื่อให้เราสามารถจัดเตรียมการต้อนรับและนำชมได้อย่างเหมาะสม
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">มีที่จอดรถสำหรับผู้มาติดต่อหรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    มีที่จอดรถสำหรับผู้มาติดต่อโดยเฉพาะ แต่มีจำนวนจำกัด แนะนำให้แจ้งล่วงหน้าหากต้องการใช้บริการที่จอดรถ หรือท่านสามารถใช้บริการที่จอดรถของกระทรวงสาธารณสุขซึ่งอยู่ใกล้เคียงได้
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">มีบริการให้คำปรึกษาเกี่ยวกับหลักสูตรหรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    เรามีทีมงานให้คำปรึกษาเกี่ยวกับหลักสูตรโดยเฉพาะ ท่านสามารถนัดหมายเพื่อขอรับคำปรึกษาแบบตัวต่อตัวได้ทั้งที่สถาบันหรือผ่านทาง Zoom Meeting โดยไม่มีค่าใช้จ่าย กรุณาติดต่อฝ่ายรับสมัครเพื่อนัดหมายล่วงหน้า
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-4">
                <AccordionTrigger className="px-6 py-4">
                  <span className="text-left">ต้องมาติดต่อด้วยตนเองเพื่อสมัครเรียนหรือไม่?</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4">
                  <p className="text-gray-700">
                    ไม่จำเป็น ท่านสามารถสมัครเรียนออนไลน์ผ่านทางเว็บไซต์ของเราได้ โดยกรอกข้อมูลและอัพโหลดเอกสารที่จำเป็น อย่างไรก็ตาม ในขั้นตอนการสัมภาษณ์ ท่านอาจต้องมาพบกับคณะกรรมการด้วยตนเองหรือผ่านระบบการประชุมทางไกล
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
        
        {/* Downloads Section */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">เอกสารดาวน์โหลด</h2>
              <p className="text-xl text-blue-700 max-w-3xl mx-auto">
                ดาวน์โหลดเอกสารสำคัญเกี่ยวกับการสมัครและข้อมูลหลักสูตร
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Download Item 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">คู่มือการสมัคร</h3>
                <p className="text-gray-700 mb-4 flex-grow">รายละเอียดขั้นตอนการสมัครและเอกสารที่ต้องใช้</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
              
              {/* Download Item 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">แผ่นพับหลักสูตร</h3>
                <p className="text-gray-700 mb-4 flex-grow">ข้อมูลโดยย่อของหลักสูตรทั้งหมดที่เปิดสอน</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
              
              {/* Download Item 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">แบบฟอร์มใบสมัคร</h3>
                <p className="text-gray-700 mb-4 flex-grow">แบบฟอร์มสำหรับกรอกข้อมูลสมัครเรียน</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
              
              {/* Download Item 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">ตารางค่าธรรมเนียม</h3>
                <p className="text-gray-700 mb-4 flex-grow">รายละเอียดค่าธรรมเนียมการศึกษาทุกหลักสูตร</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
              
              {/* Download Item 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">ปฏิทินการศึกษา</h3>
                <p className="text-gray-700 mb-4 flex-grow">กำหนดการเรียนการสอนและกิจกรรมสำคัญประจำปี</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
              
              {/* Download Item 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col">
                <h3 className="text-lg font-bold text-blue-900 mb-2">รายละเอียดหลักสูตร</h3>
                <p className="text-gray-700 mb-4 flex-grow">โครงสร้างหลักสูตรและคำอธิบายรายวิชา</p>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  ดาวน์โหลด PDF
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
