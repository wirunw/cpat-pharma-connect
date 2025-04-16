
import { EditableContent } from "@/components/content/EditableContent";
import { SiteContent } from "@/hooks/useSiteContent";

interface MissionVisionProps {
  visionContent?: SiteContent;
  missionContent?: SiteContent;
  isAdmin: boolean;
}

export const MissionVision = ({ visionContent, missionContent, isAdmin }: MissionVisionProps) => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">วิสัยทัศน์</h2>
            <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
              {visionContent && (
                <div className="text-gray-800 leading-relaxed">
                  <EditableContent content={visionContent} isAdmin={isAdmin} />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-bold text-blue-900 mb-6">พันธกิจ</h2>
            {missionContent && (
              <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <div className="text-gray-800 leading-relaxed">
                  <EditableContent content={missionContent} isAdmin={isAdmin} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
