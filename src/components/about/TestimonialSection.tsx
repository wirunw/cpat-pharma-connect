
import { EditableContent } from "@/components/content/EditableContent";
import { SiteContent } from "@/hooks/useSiteContent";

interface TestimonialSectionProps {
  testimonialContent?: SiteContent;
  isAdmin: boolean;
}

export const TestimonialSection = ({ testimonialContent, isAdmin }: TestimonialSectionProps) => {
  if (!testimonialContent) return null;

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-12 text-center">เสียงจากศิษย์เก่า</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md border-l-4 border-blue-600">
            <EditableContent content={testimonialContent} isAdmin={isAdmin} />
          </div>
        </div>
      </div>
    </section>
  );
};
