
import { useState, useEffect } from "react";
import { MailPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import { AddSubscriberDialog } from "@/components/admin/subscribers/AddSubscriberDialog";
import { DeleteSubscriberDialog } from "@/components/admin/subscribers/DeleteSubscriberDialog";
import { SubscribersList } from "@/components/admin/subscribers/SubscribersList";
import { useSubscribers, type Subscriber } from "@/hooks/useSubscribers";

const SubscriptionsManager = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { 
    subscribers, 
    isLoading, 
    fetchSubscribers, 
    addSubscriber, 
    deleteSubscriber 
  } = useSubscribers();

  useEffect(() => {
    console.log("SubscriptionsManager component mounted");
    fetchSubscribers();
  }, []);

  const handleDeleteClick = (subscriber: Subscriber) => {
    setSelectedSubscriber(subscriber);
    setIsDeleteDialogOpen(true);
  };

  return (
    <ProtectedRoute>
      <AdminLayout>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">สมาชิกรับข่าวสาร</h1>
            <p className="text-gray-500 mt-1">จัดการรายชื่ออีเมลสำหรับการส่งข่าวสาร</p>
          </div>
          <div>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <MailPlus className="h-4 w-4 mr-2" />
              เพิ่มผู้รับข่าวสาร
            </Button>
          </div>
        </div>

        <SubscribersList
          subscribers={subscribers}
          isLoading={isLoading}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onDelete={handleDeleteClick}
        />

        <AddSubscriberDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={addSubscriber}
        />

        <DeleteSubscriberDialog
          isOpen={isDeleteDialogOpen}
          onClose={() => setIsDeleteDialogOpen(false)}
          onDelete={deleteSubscriber}
          subscriber={selectedSubscriber}
        />
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default SubscriptionsManager;
