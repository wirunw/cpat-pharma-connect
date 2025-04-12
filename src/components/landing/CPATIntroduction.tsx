
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const CPATIntroduction = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              เกี่ยวกับ CPAT
            </h2>
            <p className="text-gray-700 mb-6">
              วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย (CPAT) ก่อตั้งขึ้นเมื่อวันที่ 13 พฤษภาคม 2564 
              โดยมีวัตถุประสงค์เพื่อเป็นศูนย์กลางในการพัฒนาองค์ความรู้และทักษะด้านการบริหารเภสัชกิจ
              สำหรับเภสัชกรและบุคลากรในวงการเภสัชกรรม เพื่อสร้างผู้นำที่มีวิสัยทัศน์และความสามารถ
              ในการบริหารจัดการในทุกภาคส่วนของวงการเภสัชกรรม
            </p>
            <p className="text-gray-700 mb-6">
              เรามุ่งมั่นที่จะสร้างหลักสูตรที่ทันสมัยและตอบโจทย์ความต้องการของตลาดแรงงาน 
              ด้วยทีมอาจารย์ผู้ทรงคุณวุฒิและผู้เชี่ยวชาญจากหลากหลายสาขาในวงการเภสัชกรรม
              ที่พร้อมถ่ายทอดประสบการณ์และองค์ความรู้ให้แก่นักศึกษาทุกคน
            </p>
            <Link to="/about">
              <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white">
                อ่านเพิ่มเติมเกี่ยวกับเรา
              </Button>
            </Link>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              ช่องทางติดต่อ
            </h2>
            <Card className="mb-6">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-blue-900 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">โทรศัพท์</p>
                      <p className="text-gray-700">02-591-9992-5</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-blue-900 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">อีเมล</p>
                      <p className="text-gray-700">info@cpat.ac.th</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-blue-900 mr-3 mt-0.5" />
                    <div>
                      <p className="font-semibold">ที่อยู่</p>
                      <p className="text-gray-700">
                        อาคารมหิตลาธิเบศร ชั้น 9 สภาเภสัชกรรม 3 ตำบลตลาดขวัญ อำเภอเมือง จังหวัดนนทบุรี 11000
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Link to="/contact">
              <Button className="w-full bg-blue-900 hover:bg-blue-800">
                ติดต่อเรา
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold">
            สมัครเรียนทันที
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CPATIntroduction;
