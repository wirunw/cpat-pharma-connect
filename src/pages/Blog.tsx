
import React, { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const Blog = () => {
  const { blogPosts, isLoading, fetchBlogPosts, fetchError } = useBlogPosts();

  useEffect(() => {
    console.log("Blog component mounted, fetching blog posts...");
    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <BlogHeader />
        
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <BlogGrid 
              posts={blogPosts}
              isLoading={isLoading}
              error={fetchError}
              onRetry={fetchBlogPosts}
            />
          </div>
        </section>
        
        <NewsletterSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
