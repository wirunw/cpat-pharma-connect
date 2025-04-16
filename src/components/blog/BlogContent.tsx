
import React from 'react';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogContentProps {
  post: BlogPost;
}

const BlogContent = ({ post }: BlogContentProps) => {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {post.image_url && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.image_url} 
              alt={post.title} 
              className="w-full h-auto max-h-[400px] object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 leading-relaxed mb-8">{post.excerpt}</p>
          
          {post.content ? (
            <div 
              className="prose prose-lg max-w-none overflow-hidden"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <div className="bg-blue-50 p-6 rounded-md mb-8">
              <p className="text-blue-800 font-medium mb-2">หมายเหตุ:</p>
              <p className="text-gray-700">
                ขณะนี้เรากำลังพัฒนาระบบเพื่อแสดงเนื้อหาบทความเต็มรูปแบบ 
                โปรดติดตามการอัปเดตในเร็วๆ นี้
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
