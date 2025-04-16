
import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
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
import { AboutMembers } from "@/components/about/AboutMembers";
import { DirectorSectionWrapper } from "@/components/about/DirectorSectionWrapper";
import { Spinner } from "@/components/shared/Spinner";

const About = () => {
  const { content, isLoading, getContentBySection, getContentById } = useSiteContent('about');
  const { data: isAdmin = false, isLoading: isAdminLoading } = useQuery({
    queryKey: ['isAdmin'],
    queryFn: async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Session:', session);
        
        if (!session?.user) {
          console.log('No session found, user is not logged in');
          return false;
        }
        
        // Check if user is admin
        const { data, error } = await supabase.rpc('is_admin', {
          user_id: session.user.id
        });
        
        if (error) {
          console.error('Error checking admin status:', error);
          throw error;
        }
        
        console.log('Admin status:', !!data);
        return !!data;
      } catch (error) {
        console.error('Error in isAdmin query:', error);
        return false;
      }
    }
  });

  // For debugging
  useEffect(() => {
    console.log('About page - isAdmin:', isAdmin);
  }, [isAdmin]);

  if (isLoading || isAdminLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex justify-center items-center">
          <Spinner />
        </div>
        <Footer />
      </div>
    );
  }

  const historyContent = getContentBySection('history');
  const headerContent = getContentById('about_header');
  const missionContent = getContentById('about_mission');
  const visionContent = getContentById('about_vision');
  const founderQuote = getContentById('founder_quote');
  const testimonialContent = getContentById('testimonial');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <HeaderSection headerContent={headerContent} isAdmin={isAdmin} />
        <DirectorSectionWrapper isAdmin={isAdmin} />
        <OrganizationStory historyContent={historyContent} isAdmin={isAdmin} />
        <AboutMembers isAdmin={isAdmin} />
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
