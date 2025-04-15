
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";

type ContactMessage = Database['public']['Tables']['contact_messages']['Insert'];

const formSchema = z.object({
  name: z.string().min(2, { message: "กรุณากรอกชื่อที่มีความยาวอย่างน้อย 2 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  phone: z.string().min(10, { message: "กรุณากรอกเบอร์โทรศัพท์ที่ถูกต้อง" }),
  message: z.string().min(10, { message: "กรุณากรอกข้อความที่มีความยาวอย่างน้อย 10 ตัวอักษร" }),
});

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const today = new Date();
      
      // Format Thai date
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543; // Convert to Buddhist Era
      const thaiDate = `${day} ${month} ${year}`;
      
      // Format Thai time
      const hours = today.getHours().toString().padStart(2, '0');
      const minutes = today.getMinutes().toString().padStart(2, '0');
      const thaiTime = `${hours}:${minutes} น.`;
      
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          { 
            name: values.name,
            email: values.email,
            phone: values.phone,
            message: values.message,
            read: false,
            thai_date: thaiDate,
            thai_time: thaiTime
          }
        ]);
      
      if (error) throw error;
      
      form.reset();
      toast.success("ส่งข้อความสำเร็จ ขอบคุณสำหรับการติดต่อ");
    } catch (error: any) {
      console.error('Error submitting contact form:', error);
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
              หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติมเกี่ยวกับหลักสูตรของเรา โปรดติดต่อเราผ่านช่องทางด้านล่าง
            </p>
          </div>
        </section>
        
        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>ส่งข้อความถึงเรา</CardTitle>
                    <CardDescription>กรอกแบบฟอร์มด้านล่างเพื่อติดต่อกับทีมงานของเรา</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ชื่อ-นามสกุล</FormLabel>
                              <FormControl>
                                <Input placeholder="กรอกชื่อและนามสกุลของคุณ" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>อีเมล</FormLabel>
                                <FormControl>
                                  <Input placeholder="example@domain.com" type="email" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>เบอร์โทรศัพท์</FormLabel>
                                <FormControl>
                                  <Input placeholder="081-234-5678" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ข้อความ</FormLabel>
                              <FormControl>
                                <Textarea placeholder="กรอกข้อความที่คุณต้องการส่งถึงเรา" rows={5} {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                          {isSubmitting ? "กำลังส่ง..." : "ส่งข้อความ"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span>วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">College of Pharmacy Administration of Thailand</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">ข้อมูลการติดต่อ</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">ที่อยู่</p>
                        <p className="text-gray-600">123 ถนนสุขุมวิท แขวงคลองเตยเหนือ เขตวัฒนา กรุงเทพมหานคร 10110</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">โทรศัพท์</p>
                        <p className="text-gray-600">02-123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium">อีเมล</p>
                        <p className="text-gray-600">info@cpat.co.th</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">แผนที่</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] bg-gray-200 rounded-md overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5613193911!2d100.56569491483024!3d13.741893990351267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29ee109dab6e1%3A0xfd15aa1c632d9677!2sSukhumvit%20Rd%2C%20Khlong%20Toei%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1650123456789!5m2!1sen!2sth" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
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
