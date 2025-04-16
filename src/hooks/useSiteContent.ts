
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from "@/integrations/supabase/client";

export type SiteContent = {
  id: string;
  page: string;
  section: string;
  content_type: 'text' | 'image' | 'html';
  content: string | null;
  image_url: string | null;
  title: string | null;
  description: string | null;
};

export function useSiteContent(page: string) {
  const { data: content, isLoading } = useQuery({
    queryKey: ['site-content', page],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .eq('page', page);
      
      if (error) throw error;
      return data as SiteContent[];
    }
  });

  const getContentBySection = (section: string): SiteContent[] => {
    return content?.filter(item => item.section === section) || [];
  };

  const getContentById = (id: string): SiteContent | undefined => {
    return content?.find(item => item.id === id);
  };

  return {
    content,
    isLoading,
    getContentBySection,
    getContentById
  };
}
