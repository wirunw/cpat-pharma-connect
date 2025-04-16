
import React, { useEffect } from 'react';
import { type SiteContent } from '@/hooks/useSiteContent';
import { ImageContent } from './ImageContent';
import { TextContent } from './TextContent';

interface EditableContentProps {
  content: SiteContent;
  isAdmin: boolean;
}

export const EditableContent = ({ content, isAdmin }: EditableContentProps) => {
  // For debugging
  useEffect(() => {
    console.log('EditableContent component:', content.id);
    console.log('isAdmin status:', isAdmin);
  }, [content.id, isAdmin]);

  if (content.content_type === 'image') {
    return <ImageContent content={content} isAdmin={isAdmin} />;
  }

  if (content.content_type === 'text' || content.content_type === 'html') {
    return <TextContent content={content} isAdmin={isAdmin} />;
  }

  return null;
};
