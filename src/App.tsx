
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { initializeStorageBucket } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import Admission from "./pages/Admission";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import BlogManager from "./pages/admin/BlogManager";
import MessagesManager from "./pages/admin/MessagesManager";
import SubscriptionsManager from "./pages/admin/SubscriptionsManager";
import ProtectedRoute from "./components/admin/ProtectedRoute";

// Create a query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const [storageInitialized, setStorageInitialized] = useState(false);
  const [initAttempts, setInitAttempts] = useState(0);

  // Initialize the storage bucket when the app loads
  useEffect(() => {
    const maxAttempts = 5; // Maximum number of retry attempts
    
    const init = async () => {
      try {
        console.log(`Storage initialization attempt ${initAttempts + 1}/${maxAttempts}...`);
        const result = await initializeStorageBucket();
        console.log("Storage bucket initialization result:", result);
        
        if (result.success) {
          console.log("Storage bucket initialized successfully");
          setStorageInitialized(true);
        } else {
          console.error("Storage bucket initialization failed:", result.error);
          // Try again if we haven't reached the maximum number of attempts
          if (initAttempts < maxAttempts - 1) {
            setInitAttempts(prev => prev + 1);
            setTimeout(() => init(), 3000);
          } else {
            console.error(`Failed to initialize storage bucket after ${maxAttempts} attempts`);
          }
        }
      } catch (error) {
        console.error("Error initializing storage bucket:", error);
        // Try again if we haven't reached the maximum number of attempts
        if (initAttempts < maxAttempts - 1) {
          setInitAttempts(prev => prev + 1);
          setTimeout(() => init(), 3000);
        } else {
          console.error(`Failed to initialize storage bucket after ${maxAttempts} attempts`);
        }
      }
    };
    
    if (!storageInitialized) {
      init();
    }
  }, [initAttempts, storageInitialized]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/admission" element={<Admission />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/blog" element={
              <ProtectedRoute>
                <BlogManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/messages" element={
              <ProtectedRoute>
                <MessagesManager />
              </ProtectedRoute>
            } />
            <Route path="/admin/subscriptions" element={
              <ProtectedRoute>
                <SubscriptionsManager />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route for 404 */}
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
