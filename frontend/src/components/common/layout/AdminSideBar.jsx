import { Link, useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  RefreshCw,
  Receipt,
  FileText,
  BarChart3,
  Bell,
  Building2,
  Settings,
} from "lucide-react";

const AdminSidebar = () => {
  const navigate = useNavigate();
  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen">
      <div className="p-6 border-b border-border text-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-primary cursor-pointer hover:opacity-80 transition">
            SaaS Platform
          </h1>
        </Link>
      </div>
      <nav className="p-4 space-y-2">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/home")}
        >
          <Users size={18} />
          <span>Home</span>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/users")}
        >
          <Users size={18} />
          <span>Users</span>
        </div>
        <Link
          to="/admin/subscriptions"
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
        >
          <RefreshCw size={18} />
          <span>Subscriptions</span>
        </Link>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/payments")}
        >
          <Receipt size={18} />
          <span>Payments</span>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/invoices")}
        >
          <FileText size={18} />
          <span>Invoices</span>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/notifications")}
        >
          <Bell size={18} />
          <span>Notifications</span>
        </div>

        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer"
          onClick={() => navigate("/admin/company")}
        >
          <Building2 size={18} />
          <span>Company Profile</span>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
