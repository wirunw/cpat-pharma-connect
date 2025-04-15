
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 transition-transform hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 bg-gray-200">
        <img 
          src={post.image_url || "/placeholder.svg"} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-blue-600 font-medium">{post.category}</span>
          <span className="text-sm text-gray-500">{post.thai_date}</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-blue-900">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.excerpt}</p>
        <Link to={`/blog/${post.id}`} className="inline-flex items-center text-yellow-600 font-medium hover:text-yellow-700">
          อ่านเพิ่มเติม
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;
