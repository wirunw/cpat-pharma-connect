
import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast.error("กรุณาเข้าสู่ระบบก่อน");
      navigate("/admin/login");
    }
  }, [navigate]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
