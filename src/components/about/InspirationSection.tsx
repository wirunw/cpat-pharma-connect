
import { Card, CardContent } from "@/components/ui/card";
import { EditableContent } from "@/components/content/EditableContent";
import { SiteContent } from "@/hooks/useSiteContent";

interface InspirationSectionProps {
  founderQuote?: SiteContent;
  isAdmin: boolean;
}

export const InspirationSection = ({ founderQuote, isAdmin }: InspirationSectionProps) => {
  if (!founderQuote) return null;

  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">แรงบันดาลใจ</h2>
          <p className="text-xl text-blue-700 max-w-3xl mx-auto">
            ประโยคที่สร้างแรงบันดาลใจให้กับเราในการพัฒนาการศึกษาด้านการบริหารเภสัชกิจ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <Card className="bg-white">
            <CardContent className="p-8">
              <div className="text-gray-800 leading-relaxed">
                <EditableContent content={founderQuote} isAdmin={isAdmin} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
