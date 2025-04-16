
import React from 'react';
import DirectorSection from './DirectorSection';

interface DirectorSectionWrapperProps {
  isAdmin: boolean;
}

export const DirectorSectionWrapper = ({ isAdmin }: DirectorSectionWrapperProps) => {
  // Debug isAdmin prop
  console.log('DirectorSectionWrapper - isAdmin:', isAdmin);
  
  // Pass the isAdmin prop to the DirectorSection
  return <DirectorSection />;
};
