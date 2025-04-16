
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { Database } from '@/integrations/supabase/types';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  onRetry: () => void;
  error: string | null;
}

const BlogGrid = ({ posts, isLoading, error, onRetry }: BlogGridProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-100">
            <Skeleton className="h-48 w-full" />
            <div className="p-6">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-full mb-4" />
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>เกิดข้อผิดพลาดในการโหลดข้อมูล</AlertTitle>
        <AlertDescription className="flex flex-col">
          <p>{error}</p>
          <button 
            onClick={onRetry}
            className="mt-4 self-start flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            <RefreshCw className="h-4 w-4" /> 
            ลองใหม่อีกครั้ง
          </button>
        </AlertDescription>
      </Alert>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-2xl font-semibold text-gray-700 mb-2">ยังไม่มีบทความในขณะนี้</p>
        <p className="text-gray-500">โปรดกลับมาตรวจสอบในภายหลัง เรากำลังเตรียมเนื้อหาที่น่าสนใจสำหรับคุณ</p>
      </div>
    );
  }

  console.log(`Rendering ${posts.length} blog posts in grid`);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;
