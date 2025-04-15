
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogDetailHeaderProps {
  post: BlogPost;
}

const BlogDetailHeader = ({ post }: BlogDetailHeaderProps) => {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-4">
          <Link to="/blog" className="inline-flex items-center text-blue-100 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            กลับไปยังบทความทั้งหมด
          </Link>
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{post.title}</h1>
            <div className="flex items-center gap-3">
              <span className="bg-blue-700 text-sm px-3 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-sm text-blue-100">
                {post.thai_date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailHeader;
