
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "การบริหารเภสัชกรรมชุมชน",
    description: "พัฒนาทักษะการบริหารร้านยาและการให้บริการชุมชน",
    icon: "🏥",
  },
  {
    id: 2,
    title: "การบริหารเภสัชกรรมโรงพยาบาล",
    description: "เรียนรู้การจัดการระบบยาและบริหารทรัพยากรในโรงพยาบาล",
    icon: "🏢",
  },
  {
    id: 3,
    title: "การบริหารการตลาดเภสัชภัณฑ์",
    description: "กลยุทธ์การตลาดและการพัฒนาผลิตภัณฑ์ยา",
    icon: "📈",
  },
  {
    id: 4,
    title: "การบริหารองค์กรเภสัชกรรม",
    description: "ภาวะผู้นำและการจัดการองค์กรในอุตสาหกรรมยา",
    icon: "👥",
  },
  {
    id: 5,
    title: "นวัตกรรมและเทคโนโลยีเภสัชกรรม",
    description: "การประยุกต์ใช้เทคโนโลยีสมัยใหม่ในวงการเภสัชกรรม",
    icon: "💻",
  },
  {
    id: 6,
    title: "การจัดการห่วงโซ่อุปทานเภสัชกรรม",
    description: "การบริหารจัดการระบบโลจิสติกส์และห่วงโซ่อุปทานยา",
    icon: "🔄",
  },
];

const CoursesPreview = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">
            หลักสูตร และ รายวิชาสำหรับทุกสาขา
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            หลักสูตรของ CPAT ได้รับการออกแบบเพื่อพัฒนาทักษะและความรู้ที่จำเป็นสำหรับเภสัชกรที่ต้องการก้าวหน้าในสายงานบริหาร ผู้เรียนจะได้รับความรู้ทั้งภาคทฤษฎีและปฏิบัติจากผู้เชี่ยวชาญในวงการ พร้อมสร้างเครือข่ายกับผู้ประกอบวิชาชีพในสาขาเดียวกัน
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{course.icon}</span>
                  <span className="text-blue-900">{course.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{course.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button className="bg-blue-900 hover:bg-blue-800">
            ดูหลักสูตรทั้งหมด
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CoursesPreview;
