import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert'];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }
    
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }
    
    // Validate phone number (simple validation)
    const phoneRegex = /^\d{9,10}$/;
    if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
      toast.error("รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format Thai date and time
      const today = new Date();
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543; // Convert to Buddhist Era
      
      const hours = today.getHours().toString().padStart(2, '0');
      const minutes = today.getMinutes().toString().padStart(2, '0');
      
      const thaiDate = `${day} ${month} ${year}`;
      const thaiTime = `${hours}:${minutes} น.`;
      
      // Create message object
      const newMessage: ContactMessageInsert = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        read: false,
        thai_date: thaiDate,
        thai_time: thaiTime
      };
      
      const { error } = await supabase
        .from('contact_messages')
        .insert([newMessage]);
      
      if (error) throw error;
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      toast.success("ส่งข้อความสำเร็จ เราจะติดต่อกลับโดยเร็วที่สุด");
    } catch (error: any) {
      console.error('Error sending message:', error.message);
      toast.error("ไม่สามารถส่งข้อความได้ โปรดลองอีกครั้ง");
    } finally {
      setIsSubmitting(false);
    }
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
              มีคำถามหรือข้อสงสัย? ติดต่อเราได้เลย เราพร้อมให้คำปรึกษาและบริการ
            </p>
          </div>
        </section>
        
        {/* Contact Form */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">ส่งข้อความถึงเรา</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                      ชื่อ-นามสกุล
                    </label>
                    <Input 
                      type="text" 
                      id="name" 
                      name="name"
                      placeholder="กรอกชื่อ-นามสกุล" 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                      อีเมล
                    </label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email"
                      placeholder="กรอกอีเมล" 
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <Input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    placeholder="กรอกเบอร์โทรศัพท์" 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
                    ข้อความ
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="กรอกข้อความ"
                    rows={5}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
