
import React from "react";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "CPAT แนะนำวิทยาลัย",
    description: "วิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "ข่าวสารล่าสุด",
    description: "ติดตามข่าวสารและกิจกรรมล่าสุดของวิทยาลัย",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "การอบรมที่กำลังมาถึง",
    description: "โปรแกรมการอบรมเพื่อพัฒนาทักษะวิชาชีพ",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    title: "ผู้ได้รับประกาศนียบัตรเฉพาะทาง",
    description: "บุคลากรที่ได้รับการรับรองจากวิทยาลัย",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    title: "พื้นที่ชุมชนของเรา",
    description: "เครือข่ายและชุมชนของวิทยาลัย",
    image: "/placeholder.svg",
  },
];

const HeroSlider = () => {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <Carousel className="w-full" opts={{ loop: true }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold">{slide.title}</h3>
                  <p className="text-lg">{slide.description}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
};

export default HeroSlider;
