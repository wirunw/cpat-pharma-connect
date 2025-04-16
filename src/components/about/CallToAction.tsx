
import { Button } from "@/components/ui/button";

export const CallToAction = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-900 to-blue-800">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold mb-6 text-white">พร้อมที่จะเริ่มต้นการเดินทางกับเรา?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-white">
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
  );
};
