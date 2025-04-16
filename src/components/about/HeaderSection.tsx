
import { EditableContent } from "@/components/content/EditableContent";
import { SiteContent } from "@/hooks/useSiteContent";

interface HeaderSectionProps {
  headerContent?: SiteContent;
  isAdmin: boolean;
}

export const HeaderSection = ({ headerContent, isAdmin }: HeaderSectionProps) => {
  if (!headerContent) return null;
  
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-white">
          <EditableContent content={headerContent} isAdmin={isAdmin} />
        </div>
      </div>
    </section>
  );
};
