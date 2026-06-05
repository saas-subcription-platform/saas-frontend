import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex bg-background">
      <AdminSidebar />

      <div className="flex-1">
        <AdminTopbar />

        <main className="p-8 bg-background min-h-screen">
            <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;