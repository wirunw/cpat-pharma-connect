
import { Member } from '@/types/member';
import MemberCard from './MemberCard';

interface MembersSectionProps {
  title: string;
  members: Member[];
}

const MembersSection = ({ title, members }: MembersSectionProps) => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersSection;
