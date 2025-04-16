
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MembersSection from "@/components/about/MembersSection";
import DirectorSection from "@/components/about/DirectorSection";
import { useSiteContent } from "@/hooks/useSiteContent";
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";
import { HeaderSection } from "@/components/about/HeaderSection";
import { OrganizationStory } from "@/components/about/OrganizationStory";
import { MissionVision } from "@/components/about/MissionVision";
import { StatsSection } from "@/components/about/StatsSection";
import { InspirationSection } from "@/components/about/InspirationSection";
import { TestimonialSection } from "@/components/about/TestimonialSection";
import { CallToAction } from "@/components/about/CallToAction";
import { executiveMembers, foundingMembers } from "@/data/members";

const About = () => {
  const { content, isLoading, getContentBySection, getContentById } = useSiteContent('about');
  const { data: isAdmin = false } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return false;
      
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: session.user.id
      });
      
      if (error) throw error;
      return !!data;
    }
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const historyContent = getContentBySection('history');
  const headerContent = getContentById('about_header');
  const missionContent = getContentById('about_mission');
  const visionContent = getContentById('about_vision');
  const founderQuote = getContentById('founder_quote');
  const testimonialContent = getContentById('testimonial');

  // Update board members to match the Member type
  const boardMembers = executiveMembers.map(member => ({
    name: member.name,
    title: member.title || "",
    image: member.image,
    email: "",
    avatarUrl: member.image
  }));

  // Update founding members similarly
  const foundingMemberList = foundingMembers.map(member => ({
    name: member.name,
    image: member.image,
    email: "",
    avatarUrl: member.image
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeaderSection headerContent={headerContent} isAdmin={isAdmin} />
        <DirectorSection />
        <OrganizationStory historyContent={historyContent} isAdmin={isAdmin} />
        <MembersSection title="คณะกรรมการบริหารวิทยาลัย" members={boardMembers} />
        <MembersSection title="สมาชิกผู้ร่วมก่อตั้ง" members={foundingMemberList} />
        <MissionVision 
          visionContent={visionContent} 
          missionContent={missionContent} 
          isAdmin={isAdmin}
        />
        <StatsSection />
        <InspirationSection founderQuote={founderQuote} isAdmin={isAdmin} />
        <TestimonialSection testimonialContent={testimonialContent} isAdmin={isAdmin} />
        <CallToAction />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
