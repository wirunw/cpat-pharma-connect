
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Edit2, FileText, Plus, Trash2, Upload } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BlogManager = () => {
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({
    title: "",
    excerpt: "",
    category: "",
    status: "draft" as "draft" | "published"
  });

  // Fetch blog posts from Supabase
  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBlogPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error.message);
      toast.error('ไม่สามารถดึงข้อมูลบทความได้');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `blog/${fileName}`;
      
      const { error } = await supabase.storage
        .from('images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error.message);
      toast.error('อัปโหลดรูปภาพไม่สำเร็จ');
      return null;
    }
  };

  const handleAddPost = async () => {
    if (!newPost.title || !newPost.excerpt || !newPost.category) {
      toast.error('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    try {
      let imageUrl = '/placeholder.svg';
      
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const today = new Date();
      const thaiDate = `${today.getDate()} ${getThaiMonth(today.getMonth())} ${today.getFullYear() + 543}`;
      
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title: newPost.title,
            excerpt: newPost.excerpt,
            category: newPost.category,
            status: newPost.status,
            image_url: imageUrl,
            thai_date: thaiDate
          }
        ])
        .select();
      
      if (error) throw error;
      
      await fetchBlogPosts();
      
      setNewPost({
        title: "",
        excerpt: "",
        category: "",
        status: "draft"
      });
      setImageFile(null);
      setImagePreview(null);
      setIsAddDialogOpen(false);
      toast.success('เพิ่มบทความใหม่สำเร็จ');
    } catch (error: any) {
      console.error('Error adding blog post:', error.message);
      toast.error('ไม่สามารถเพิ่มบทความได้');
    }
  };

  const handleUpdatePost = async () => {
    if (!selectedPost) return;
    
    try {
      let imageUrl = selectedPost.image_url;
      
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        }
      }
      
      const { error } = await supabase
        .from('blog_posts')
        .update({
          title: selectedPost.title,
          excerpt: selectedPost.excerpt,
          category: selectedPost.category,
          status: selectedPost.status,
          image_url: imageUrl
        })
        .eq('id', selectedPost.id);
      
      if (error) throw error;
      
      await fetchBlogPosts();
      setIsEditDialogOpen(false);
      setImageFile(null);
      setImagePreview(null);
      toast.success('อัปเดตบทความสำเร็จ');
    } catch (error: any) {
      console.error('Error updating blog post:', error.message);
      toast.error('ไม่สามารถอัปเดตบทความได้');
    }
  };

  const handleDeletePost = async () => {
    if (!selectedPost) return;
    
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', selectedPost.id);
      
      if (error) throw error;
      
      await fetchBlogPosts();
      setIsDeleteDialogOpen(false);
      toast.success('ลบบทความสำเร็จ');
    } catch (error: any) {
      console.error('Error deleting blog post:', error.message);
      toast.error('ไม่สามารถลบบทความได้');
    }
  };

  const handleEditClick = (post: any) => {
    setSelectedPost(post);
    setImagePreview(post.image_url);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (post: any) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  // Helper function for Thai month names
  const getThaiMonth = (month: number) => {
    const thaiMonths = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];
    return thaiMonths[month];
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">จัดการบทความ</h1>
            <p className="text-gray-500 mt-1">สร้าง แก้ไข และลบบทความบนเว็บไซต์</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            เพิ่มบทความใหม่
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">ทั้งหมด</TabsTrigger>
            <TabsTrigger value="published">เผยแพร่แล้ว</TabsTrigger>
            <TabsTrigger value="draft">ฉบับร่าง</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.length > 0 ? (
              <div className="space-y-4">
                {blogPosts.map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความ</div>
            )}
          </TabsContent>
          
          <TabsContent value="published">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.filter(post => post.status === 'published').length > 0 ? (
              <div className="space-y-4">
                {blogPosts.filter(post => post.status === 'published').map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความที่เผยแพร่</div>
            )}
          </TabsContent>
          
          <TabsContent value="draft">
            {isLoading ? (
              <div className="text-center py-8">กำลังโหลดข้อมูล...</div>
            ) : blogPosts.filter(post => post.status === 'draft').length > 0 ? (
              <div className="space-y-4">
                {blogPosts.filter(post => post.status === 'draft').map(post => (
                  <BlogPostCard 
                    key={post.id} 
                    post={post} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteClick} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">ยังไม่มีบทความฉบับร่าง</div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add New Post Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>เพิ่มบทความใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลบทความที่ต้องการเพิ่มลงในเว็บไซต์
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  หัวข้อ
                </Label>
                <Input
                  id="title"
                  className="col-span-3"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  หมวดหมู่
                </Label>
                <Input
                  id="category"
                  className="col-span-3"
                  value={newPost.category}
                  onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  สถานะ
                </Label>
                <select
                  id="status"
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newPost.status}
                  onChange={(e) => setNewPost({...newPost, status: e.target.value as "draft" | "published"})}
                >
                  <option value="draft">ฉบับร่าง</option>
                  <option value="published">เผยแพร่</option>
                </select>
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="excerpt" className="text-right pt-2">
                  เนื้อหาย่อ
                </Label>
                <Textarea
                  id="excerpt"
                  className="col-span-3"
                  rows={4}
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="image" className="text-right pt-2">
                  รูปภาพ
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center gap-4">
                    <div className="border border-dashed border-gray-300 rounded-md p-4 w-full">
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <label htmlFor="image" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-6 w-6 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">คลิกเพื่ออัปโหลดรูปภาพ</span>
                      </label>
                    </div>
                    {imagePreview && (
                      <div className="w-20 h-20 overflow-hidden rounded-md border">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                setImageFile(null);
                setImagePreview(null);
              }}>ยกเลิก</Button>
              <Button onClick={handleAddPost}>บันทึก</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Post Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>แก้ไขบทความ</DialogTitle>
              <DialogDescription>
                แก้ไขข้อมูลบทความที่เลือก
              </DialogDescription>
            </DialogHeader>
            {selectedPost && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-title" className="text-right">
                    หัวข้อ
                  </Label>
                  <Input
                    id="edit-title"
                    className="col-span-3"
                    value={selectedPost.title}
                    onChange={(e) => setSelectedPost({...selectedPost, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-category" className="text-right">
                    หมวดหมู่
                  </Label>
                  <Input
                    id="edit-category"
                    className="col-span-3"
                    value={selectedPost.category}
                    onChange={(e) => setSelectedPost({...selectedPost, category: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    สถานะ
                  </Label>
                  <select
                    id="edit-status"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={selectedPost.status}
                    onChange={(e) => setSelectedPost({...selectedPost, status: e.target.value})}
                  >
                    <option value="draft">ฉบับร่าง</option>
                    <option value="published">เผยแพร่</option>
                  </select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-excerpt" className="text-right pt-2">
                    เนื้อหาย่อ
                  </Label>
                  <Textarea
                    id="edit-excerpt"
                    className="col-span-3"
                    rows={4}
                    value={selectedPost.excerpt}
                    onChange={(e) => setSelectedPost({...selectedPost, excerpt: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-image" className="text-right pt-2">
                    รูปภาพ
                  </Label>
                  <div className="col-span-3">
                    <div className="flex items-center gap-4">
                      <div className="border border-dashed border-gray-300 rounded-md p-4 w-full">
                        <Input
                          id="edit-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label htmlFor="edit-image" className="flex flex-col items-center justify-center cursor-pointer">
                          <Upload className="h-6 w-6 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-500">คลิกเพื่ออัปโหลดรูปภาพใหม่</span>
                        </label>
                      </div>
                      {imagePreview && (
                        <div className="w-20 h-20 overflow-hidden rounded-md border">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsEditDialogOpen(false);
                setImageFile(null);
                setImagePreview(null);
              }}>ยกเลิก</Button>
              <Button onClick={handleUpdatePost}>บันทึกการเปลี่ยนแปลง</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>ยืนยันการลบบทความ</DialogTitle>
              <DialogDescription>
                คุณต้องการลบบทความนี้หรือไม่? การกระทำนี้ไม่สามารถยกเลิกได้
              </DialogDescription>
            </DialogHeader>
            {selectedPost && (
              <div className="py-4">
                <p className="font-medium">{selectedPost.title}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedPost.category} • {selectedPost.thai_date}</p>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>ยกเลิก</Button>
              <Button variant="destructive" onClick={handleDeletePost}>ลบบทความ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </AdminLayout>
    </ProtectedRoute>
  );
};

interface BlogPostCardProps {
  post: any;
  onEdit: (post: any) => void;
  onDelete: (post: any) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onEdit, onDelete }) => {
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

export default BlogManager;
