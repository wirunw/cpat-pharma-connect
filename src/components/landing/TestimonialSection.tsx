
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialSection = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">
          เสียงจากผู้เชี่ยวชาญ
        </h2>
        
        <Card className="bg-white shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-blue-900">
                <img 
                  src="/placeholder.svg" 
                  alt="รศ.ดร.ภก.กร ศรเลิศล้ำวานิช" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="md:w-2/3 p-8 flex flex-col justify-center">
                <div className="text-yellow-500 text-5xl font-serif mb-4">"</div>
                <p className="text-gray-700 text-lg italic mb-6">
                  หลักสูตรของวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทยได้รับการออกแบบมาเพื่อเสริมสร้างศักยภาพของเภสัชกรในด้านการบริหารจัดการ เพื่อตอบสนองความต้องการที่เปลี่ยนแปลงของระบบสาธารณสุขและอุตสาหกรรมยาในยุคปัจจุบัน
                </p>
                <div>
                  <p className="font-bold text-blue-900">รศ.ดร.ภก.กร ศรเลิศล้ำวานิช</p>
                  <p className="text-gray-600">ผู้อำนวยการวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TestimonialSection;
