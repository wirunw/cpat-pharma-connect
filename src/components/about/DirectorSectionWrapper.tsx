
import React from 'react';
import DirectorSection from './DirectorSection';

interface DirectorSectionWrapperProps {
  isAdmin: boolean;
}

export const DirectorSectionWrapper = ({ isAdmin }: DirectorSectionWrapperProps) => {
  return <DirectorSection />;
};
