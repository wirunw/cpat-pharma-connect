
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlogPostCard } from "./BlogPostCard";
import { Database } from "@/integrations/supabase/types";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostTabsProps {
  isLoading: boolean;
  blogPosts: BlogPost[];
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

export const BlogPostTabs = ({ isLoading, blogPosts, onEdit, onDelete }: BlogPostTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList className="mb-4">
        <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
        <TabsTrigger value="published">เผยแพร่แล้ว</TabsTrigger>
        <TabsTrigger value="draft">ฉบับร่าง</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all">
        <BlogPostList 
          posts={blogPosts}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TabsContent>
      
      <TabsContent value="published">
        <BlogPostList 
          posts={blogPosts.filter(post => post.status === 'published')}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyMessage="ยังไม่มีบทความที่เผยแพร่"
        />
      </TabsContent>
      
      <TabsContent value="draft">
        <BlogPostList 
          posts={blogPosts.filter(post => post.status === 'draft')}
          isLoading={isLoading}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyMessage="ยังไม่มีบทความฉบับร่าง"
        />
      </TabsContent>
    </Tabs>
  );
};

interface BlogPostListProps {
  posts: BlogPost[];
  isLoading: boolean;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
  emptyMessage?: string;
}

const BlogPostList = ({ posts, isLoading, onEdit, onDelete, emptyMessage = "ยังไม่มีบทความ" }: BlogPostListProps) => {
  if (isLoading) {
    return <div className="text-center py-8">กำลังโหลดข้อมูล...</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-8 text-gray-500">{emptyMessage}</div>;
  }

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <BlogPostCard 
          key={post.id} 
          post={post} 
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};
