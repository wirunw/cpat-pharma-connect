
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
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "ข่าวสารล่าสุด",
    description: "ติดตามข่าวสารและกิจกรรมล่าสุดของวิทยาลัย",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "การอบรมที่กำลังมาถึง",
    description: "โปรแกรมการอบรมเพื่อพัฒนาทักษะวิชาชีพ",
    image: "https://images.unsplash.com/photo-1573166953714-bfdac0fb9b36?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "ผู้ได้รับประกาศนียบัตรเฉพาะทาง",
    description: "บุคลากรที่ได้รับการรับรองจากวิทยาลัย",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1280&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "พื้นที่ชุมชนของเรา",
    description: "เครือข่ายและชุมชนของวิทยาลัย",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1280&auto=format&fit=crop",
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
