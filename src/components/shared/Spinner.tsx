
import React from 'react';

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <span className="sr-only">กำลังโหลด...</span>
    </div>
  );
};
