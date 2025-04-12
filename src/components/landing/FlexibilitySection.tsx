
import React from "react";
import { Button } from "@/components/ui/button";

const FlexibilitySection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="/placeholder.svg" 
              alt="ความยืดหยุ่นในการเรียน" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          
          <div>
            <h2 className="text-3xl font-bold mb-6">
              หลักสูตรที่ปรับให้เหมาะกับเภสัชกรยุคใหม่ที่มีตารางงานยุ่ง
            </h2>
            <p className="text-lg mb-8">
              เราเข้าใจถึงความท้าทายของเภสัชกรที่ต้องทำงานเต็มเวลาและต้องการพัฒนาตนเอง จึงได้ออกแบบหลักสูตรที่มีความยืดหยุ่นผสมผสานระหว่างการเรียนออนไลน์และการเข้าชั้นเรียน ช่วยให้คุณสามารถเรียนรู้ได้ทุกที่ทุกเวลาตามความสะดวก
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>การเรียนออนไลน์ที่ยืดหยุ่นเรียนได้ทุกที่ทุกเวลา</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>ชั้นเรียนสุดสัปดาห์สำหรับผู้ที่ทำงานเต็มเวลา</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>โมดูลการเรียนรู้ที่ออกแบบมาเพื่อการเรียนรู้ทีละขั้น</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-400 mr-2">✓</span>
                <span>การสนับสนุนและให้คำปรึกษาตลอด 24/7</span>
              </li>
            </ul>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
              เรียนรู้เพิ่มเติม
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlexibilitySection;
