
import React from 'react';
import MembersSection from '@/components/about/MembersSection';
import { executiveMembers, foundingMembers } from '@/data/members';

interface AboutMembersProps {
  isAdmin: boolean;
}

export const AboutMembers = ({ isAdmin }: AboutMembersProps) => {
  // Convert executive members to match Member type
  const boardMembers = executiveMembers.map(member => ({
    name: member.name,
    title: member.title || "",
    image: member.image,
    email: "",
    avatarUrl: member.image
  }));

  // Convert founding members to match Member type
  const foundingMemberList = foundingMembers.map(member => ({
    name: member.name,
    image: member.image,
    email: "",
    avatarUrl: member.image
  }));

  return (
    <>
      <MembersSection title="คณะกรรมการบริหารวิทยาลัย" members={boardMembers} />
      <MembersSection title="สมาชิกผู้ร่วมก่อตั้ง" members={foundingMemberList} />
    </>
  );
};
