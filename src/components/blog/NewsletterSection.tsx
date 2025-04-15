
import React, { useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type SubscriberInsert = Database['public']['Tables']['subscribers']['Insert'];

const NewsletterSection = () => {
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subscriberEmail) {
      toast.error("กรุณากรอกอีเมล");
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail)) {
      toast.error("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    }
    
    try {
      const { data: existingData } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', subscriberEmail.toLowerCase())
        .single();

      if (existingData) {
        toast.info("อีเมลนี้ได้ลงทะเบียนไว้แล้ว");
        setSubscriberEmail("");
        return;
      }
      
      const today = new Date();
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543;
      const formattedDate = `${day} ${month} ${year}`;
      
      const newSubscriber: SubscriberInsert = {
        email: subscriberEmail.toLowerCase(),
        thai_date: formattedDate,
        source: "หน้าบทความ"
      };
      
      const { error } = await supabase
        .from('subscribers')
        .insert([newSubscriber]);
      
      if (error) throw error;
      
      toast.success("ลงทะเบียนรับข่าวสารสำเร็จ");
      setSubscriberEmail("");
    } catch (error: any) {
      console.error('Error subscribing:', error.message);
      toast.error("ไม่สามารถลงทะเบียนได้ โปรดลองอีกครั้ง");
    }
  };

  return (
    <section className="bg-blue-50 py-16 px-4">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">รับข่าวสารและบทความใหม่ๆ</h2>
        <p className="text-gray-600 mb-8">ลงทะเบียนรับจดหมายข่าวของเราเพื่อติดตามบทความ ข่าวสาร และกิจกรรมล่าสุดจาก CPAT</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 justify-center">
          <input 
            type="email" 
            placeholder="อีเมลของคุณ" 
            className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={subscriberEmail}
            onChange={(e) => setSubscriberEmail(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
          >
            สมัครรับข่าวสาร
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
