
import { EditableContent } from "@/components/content/EditableContent";
import { SiteContent } from "@/hooks/useSiteContent";

interface OrganizationStoryProps {
  historyContent: SiteContent[];
  isAdmin: boolean;
}

export const OrganizationStory = ({ historyContent, isAdmin }: OrganizationStoryProps) => {
  return (
    <section className="py-16 px-4 bg-blue-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900 mb-4">ประวัติความเป็นมา</h2>
          <p className="text-xl text-blue-700">ก่อตั้งเมื่อ พ.ศ. 2560</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {historyContent.map((content) => (
            <div key={content.id} className="bg-white p-8 rounded-lg shadow-md">
              <EditableContent content={content} isAdmin={isAdmin} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
