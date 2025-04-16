
export const StatsSection = () => {
  return (
    <section className="py-16 px-4 bg-blue-900">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center text-white">ตัวเลขภายใน CPAT</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">50+</p>
            <p className="text-lg text-white">ผู้สำเร็จการศึกษา</p>
          </div>
          
          <div>
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">12</p>
            <p className="text-lg text-white">หลักสูตรที่เปิดสอน</p>
          </div>
          
          <div>
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">48+</p>
            <p className="text-lg text-white">อาจารย์ผู้เชี่ยวชาญ</p>
          </div>
          
          <div>
            <p className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">95%</p>
            <p className="text-lg text-white">อัตราความพึงพอใจ</p>
          </div>
        </div>
      </div>
    </section>
  );
};
