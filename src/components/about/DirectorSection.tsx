
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from 'lucide-react';
import { useDirectorSection } from '@/hooks/useDirectorSection';

const DirectorSection = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { directorSection, isLoading, isAdmin, updateImage, isUploading } = useDirectorSection();

  const handleImageClick = () => {
    if (isAdmin && !isUploading) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      updateImage(file);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/3 relative group">
            <img 
              src={directorSection?.image_url || "/placeholder.svg"}
              alt="คณบดี CPAT" 
              className={`rounded-lg shadow-md w-full ${isAdmin ? 'cursor-pointer' : ''}`}
              onClick={handleImageClick}
            />
            {isAdmin && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <Upload className="text-white w-8 h-8" />
                </div>
              </>
            )}
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-bold text-blue-900 mb-6">{directorSection?.title}</h2>
            <div className="text-gray-700 space-y-4">
              <p>{directorSection?.description}</p>
              <p className="font-semibold">
                รศ.ดร.ภก. กร ศรเลิศล้ำวาณิช<br />
                ผู้อำนวยการวิทยาลัยการบริหารเภสัชกิจแห่งประเทศไทย
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DirectorSection;
