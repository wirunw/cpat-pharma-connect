
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // First check if there's an active session
    const checkSession = async () => {
      try {
        console.log("Checking session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error.message);
          navigate("/admin/login");
          return;
        }
        
        if (!session) {
          console.log("No active session, redirecting to login");
          navigate("/admin/login");
          return;
        }
        
        console.log("Session found, user is authenticated");
        setIsLoading(false);
      } catch (error: any) {
        console.error("Session check error:", error.message);
        navigate("/admin/login");
      }
    };

    // Then set up the auth state listener for future changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      
      if (event === 'SIGNED_OUT') {
        console.log("User signed out, redirecting to login");
        navigate("/admin/login");
      }
    });

    checkSession();

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
