
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
        
        {/* Placeholder for other sections that will be implemented later */}
        <div className="py-16 px-4 text-center text-gray-700">
          <p className="text-xl">หน้าการรับสมัครอยู่ระหว่างการพัฒนา จะเสร็จสมบูรณ์เร็วๆ นี้</p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admission;
