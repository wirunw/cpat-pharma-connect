
import { Member } from '@/types/member';
import { Mail } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-lg text-blue-900">{member.name}</h3>
      <p className="text-gray-600 mt-1">{member.title}</p>
      <div className="flex items-center mt-2 text-gray-500">
        <Mail className="w-4 h-4 mr-2" />
        <a href={`mailto:${member.email}`} className="text-sm hover:text-blue-600 transition-colors">
          {member.email}
        </a>
      </div>
    </div>
  );
};

export default MemberCard;
