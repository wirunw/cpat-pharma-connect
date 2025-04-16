
import React from 'react';
import { Button } from "@/components/ui/button";

interface EditorToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  icon: React.ReactNode;
}

export const EditorToolbarButton = ({ 
  onClick, 
  isActive, 
  icon 
}: EditorToolbarButtonProps) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={isActive ? 'bg-slate-200' : ''}
    >
      {icon}
    </Button>
  );
};
