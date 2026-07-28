import { useEffect, useState } from "react";

import AdminSidebar from "./AdminSideBar";
import AdminTopbar from "./AdminTopBar";

import { getDashboardDetails } from "../../../features/Auth/services/companyService";

const AdminLayout = ({ children }) => {
  const [dashboard, setDashboard] = useState({
    adminName: "",
    companyName: "",
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardDetails();
        setDashboard(data);
      } catch (error) {
        console.error("Error fetching dashboard details:", error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex bg-background">
      <AdminSidebar />

      <div className="flex-1">
        <AdminTopbar adminName={dashboard.adminName} />

        <main className="p-8 bg-background min-h-screen">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;