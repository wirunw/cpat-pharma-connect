
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MembersSection from "@/components/about/MembersSection";
import DirectorSection from "@/components/about/DirectorSection";
import { executiveMembers, foundingMembers } from "@/data/members";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { EditableContent } from "@/components/content/EditableContent";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

const About = () => {
  const { content, isLoading, getContentBySection, getContentById } = useSiteContent('about');
  const { data: isAdmin = false } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;
      
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });
      
      if (error) throw error;
      return !!data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const heroContent = getContentBySection('hero')[0];
  const historyContent = getContentBySection('history');
  const headerContent = getContentById('about_header');
  const missionContent = getContentById('about_mission');
  const visionContent = getContentById('about_vision');
  const founderQuote = getContentById('founder_quote');
  const testimonialContent = getContentById('testimonial');

  // Update board members to match the Member type
  const boardMembers = executiveMembers.map(member => ({
    name: member.name,
    title: member.title || "",
    image: member.image,
    email: "", // Add empty email as per Member type
    avatarUrl: member.image
  }));

  // Update founding members similarly
  const foundingMemberList = foundingMembers.map(member => ({
    name: member.name,
    image: member.image,
    email: "", // Add empty email
    avatarUrl: member.image
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        {headerContent && (
          <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <EditableContent content={headerContent} isAdmin={isAdmin} />
            </div>
          </section>
        )}
        
        {/* Dean's Message */}
        <DirectorSection />
        
        {/* Organization Story */}
        <section className="py-16 px-4 bg-blue-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">ประวัติความเป็นมา</h2>
              <p className="text-xl text-blue-700">ก่อตั้งเมื่อ พ.ศ. 2560</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {historyContent.map((content) => (
                <div key={content.id} className="bg-white p-8 rounded-lg shadow-md">
                  <EditableContent content={content} isAdmin={isAdmin} />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Executive Committee Section */}
        <MembersSection 
          title="คณะกรรมการบริหารวิทยาลัย" 
          members={boardMembers}
        />
        
        {/* Founding Members Section */}
        <MembersSection 
          title="สมาชิกผู้ร่วมก่อตั้ง" 
          members={foundingMemberList}
        />
        
        {/* Mission and Vision */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">วิสัยทัศน์</h2>
                <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                  {visionContent && (
                    <EditableContent content={visionContent} isAdmin={isAdmin} />
                  )}
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-6">พันธกิจ</h2>
                {missionContent && (
                  <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                    <EditableContent content={missionContent} isAdmin={isAdmin} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        
        {/* Key Statistics */}
        <section className="py-16 px-4 bg-blue-900 text-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">ตัวเลขภายใน CPAT</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50+</p>
                <p className="text-lg">ผู้สำเร็จการศึกษา</p>
              </div>
              
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">12</p>
                <p className="text-lg">หลักสูตรที่เปิดสอน</p>
              </div>
              
              <div>
                <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">48+</p>
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
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              {founderQuote && (
                <Card className="bg-white">
                  <CardContent className="p-8">
                    <EditableContent content={founderQuote} isAdmin={isAdmin} />
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">เสียงจากศิษย์เก่า</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
              {testimonialContent && (
                <div className="bg-blue-50 p-6 rounded-lg">
                  <EditableContent content={testimonialContent} isAdmin={isAdmin} />
                </div>
              )}
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
