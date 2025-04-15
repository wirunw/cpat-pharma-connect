
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error.message);
          toast.error("เซสชันไม่ถูกต้อง กรุณาเข้าสู่ระบบใหม่");
          navigate("/admin/login");
          return;
        }
        
        if (!session) {
          console.log("No active session, redirecting to login");
          navigate("/admin/login");
          return;
        }
        
        setIsLoading(false);
      } catch (error: any) {
        console.error("Session check error:", error.message);
        navigate("/admin/login");
      }
    };

    checkSession();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin/login");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">กำลังโหลด...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
