
import { Database } from "@/integrations/supabase/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, FileText, Trash2 } from "lucide-react";

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

export const BlogPostCard = ({ post, onEdit, onDelete }: BlogPostCardProps) => {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-48 h-48 bg-gray-100">
            <img 
              src={post.image_url || '/placeholder.svg'} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <Badge variant={post.status === "published" ? "default" : "outline"}>
                  {post.status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
                </Badge>
                <span className="text-sm text-blue-600">{post.category}</span>
              </div>
              <span className="text-sm text-gray-500">{post.thai_date}</span>
            </div>
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 text-sm flex-grow mb-4">{post.excerpt}</p>
            <div className="flex justify-between items-center mt-auto">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>ดูตัวอย่าง</span>
              </Button>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                  onClick={() => onEdit(post)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => onDelete(post)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
