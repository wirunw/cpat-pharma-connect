
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Subscriber {
  id: string;
  email: string;
  thai_date: string | null;
  source: string | null;
  created_at: string;
}

export function useSubscribers() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscribers = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching subscribers...");
      const { data, error } = await supabase
        .from('subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching subscribers:', error);
        throw error;
      }
      
      console.log("Subscribers data:", data);
      setSubscribers(data || []);
    } catch (error: any) {
      console.error('Error fetching subscribers:', error.message);
      toast.error('ไม่สามารถดึงข้อมูลผู้รับข่าวสารได้');
    } finally {
      setIsLoading(false);
    }
  };

  const addSubscriber = async (email: string) => {
    try {
      const { data: existingData, error: checkError } = await supabase
        .from('subscribers')
        .select('id')
        .eq('email', email.toLowerCase())
        .maybeSingle();
        
      if (checkError) {
        console.error("Error checking existing email:", checkError);
        throw checkError;
      }

      if (existingData) {
        toast.error("อีเมลนี้มีอยู่ในระบบแล้ว");
        return false;
      }
      
      const today = new Date();
      const day = today.getDate();
      const thaiMonths = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
        "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
      ];
      const month = thaiMonths[today.getMonth()];
      const year = today.getFullYear() + 543;
      const formattedDate = `${day} ${month} ${year}`;
      
      const { error: insertError } = await supabase
        .from('subscribers')
        .insert([{
          email: email.toLowerCase(),
          thai_date: formattedDate,
          source: "เพิ่มโดยผู้ดูแลระบบ"
        }]);
      
      if (insertError) {
        console.error("Error inserting subscriber:", insertError);
        throw insertError;
      }
      
      await fetchSubscribers();
      return true;
    } catch (error: any) {
      console.error('Error adding subscriber:', error.message);
      toast.error('ไม่สามารถเพิ่มผู้รับข่าวสารได้');
      return false;
    }
  };

  const deleteSubscriber = async (id: string) => {
    try {
      const { error } = await supabase
        .from('subscribers')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error("Error deleting subscriber:", error);
        throw error;
      }
      
      await fetchSubscribers();
      return true;
    } catch (error: any) {
      console.error('Error deleting subscriber:', error.message);
      toast.error('ไม่สามารถลบผู้รับข่าวสารได้');
      return false;
    }
  };

  return {
    subscribers,
    isLoading,
    fetchSubscribers,
    addSubscriber,
    deleteSubscriber
  };
}
