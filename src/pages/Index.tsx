
import React from "react";
import { Button } from "@/components/ui/button";
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
        {/* Hero Slider */}
        <HeroSlider />
        
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 md:px-10">
          <div className="container mx-auto max-w-6xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              CPAT: เริ่มต้นการศึกษาด้านเภสัชกรสู่ผู้นำด้านการบริหารเภสัชกิจ
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              พัฒนาทักษะเพื่อความเป็นเลิศในวิชาชีพเภสัชกรรมและอุตสาหกรรมยา
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                หลักสูตรที่เหมาะกับคุณ
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                สมัครเรียน CPAT วันนี้
              </Button>
            </div>
          </div>
        </section>
        
        {/* Value Proposition */}
        <ValueProposition />
        
        {/* Courses Preview */}
        <CoursesPreview />
        
        {/* Flexibility Section */}
        <FlexibilitySection />
        
        {/* Testimonial Section */}
        <TestimonialSection />
        
        {/* CPAT Introduction */}
        <CPATIntroduction />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
