
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Banner */}
        <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  เปิดประตูสู่ความก้าวหน้าในวิชาชีพเภสัชกรรม
                </h1>
                <p className="text-xl mb-8">
                  เสริมความรู้และพัฒนาทักษะการบริหารเพื่อเภสัชกรรมยุคใหม่
                </p>
                <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
                  ดูหลักสูตร
                </Button>
              </div>
              <div className="hidden md:block">
                <img 
                  src="/placeholder.svg" 
                  alt="CPAT Hero Image" 
                  className="rounded-lg shadow-lg w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Placeholder for other sections that will be implemented later */}
        <div className="py-16 px-4 text-center text-gray-700">
          <p className="text-xl">หน้าหลักอยู่ระหว่างการพัฒนา จะเสร็จสมบูรณ์เร็วๆ นี้</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
