
import React from "react";
import { Button } from "@/components/ui/button";

const ValueProposition = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-green-100 border-l-4 border-green-500 p-6 rounded-lg mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            หลักสูตรที่ได้รับการออกแบบเพื่อความเป็นเลิศในการบริหารเภสัชกิจ
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              ค่าเล่าเรียนและการรับสมัคร
            </h3>
            <p className="text-gray-700 mb-6">
              CPAT มุ่งมั่นที่จะให้การศึกษาที่มีคุณภาพในราคาที่เข้าถึงได้สำหรับเภสัชกรทุกคน ค่าเล่าเรียนของเราได้รับการออกแบบให้มีความยืดหยุ่นและคุ้มค่า พร้อมตัวเลือกการชำระเงินหลายรูปแบบเพื่อตอบสนองความต้องการของผู้เรียน
            </p>
            <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
              ดูรายละเอียดค่าเล่าเรียน
            </Button>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              ค้นหาหลักสูตรที่เหมาะกับคุณ
            </h3>
            <p className="text-gray-700 mb-6">
              หลักสูตรของ CPAT ได้รับการพัฒนาโดยผู้เชี่ยวชาญในวงการเภสัชกรรมเพื่อตอบสนองความต้องการที่หลากหลายของวิชาชีพ ไม่ว่าคุณจะเป็นเภสัชกรที่เพิ่งเริ่มต้นหรือผู้มีประสบการณ์ที่ต้องการต่อยอดความเชี่ยวชาญ เรามีหลักสูตรที่เหมาะสมสำหรับคุณ
            </p>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
              ดูหลักสูตรทั้งหมด
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
