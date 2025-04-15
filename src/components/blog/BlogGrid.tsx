
import React from 'react';
import BlogPostCard from './BlogPostCard';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogGridProps {
  posts: BlogPost[];
  isLoading: boolean;
  onRetry: () => void;
  error: string | null;
}

const BlogGrid = ({ posts, isLoading, error, onRetry }: BlogGridProps) => {
  if (isLoading) {
    return <div className="text-center py-12">กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">
        <p className="text-xl">เกิดข้อผิดพลาดในการโหลดข้อมูล</p>
        <p className="mt-2">{error}</p>
        <button 
          onClick={onRetry}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ลองใหม่อีกครั้ง
        </button>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">ยังไม่มีบทความในขณะนี้</p>
        <p className="mt-2 text-gray-400">โปรดกลับมาตรวจสอบในภายหลัง</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <BlogPostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;
