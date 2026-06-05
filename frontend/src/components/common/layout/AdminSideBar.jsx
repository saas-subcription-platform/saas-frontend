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
  return (
    <aside className="w-64 bg-white border-r border-border min-h-screen">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">
          SaaS Subscription
        </h1>
      </div>

      <nav className="p-4 space-y-2">
        {/* Active Item */}
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-secondary/20 cursor-pointer">
          <Users size={18} />
          <span>Users</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <CreditCard size={18} />
          <span>Membership Plans</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <RefreshCw size={18} />
          <span>Subscriptions</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <Receipt size={18} />
          <span>Payments</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <FileText size={18} />
          <span>Invoices</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <BarChart3 size={18} />
          <span>Reports</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <Bell size={18} />
          <span>Notifications</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <Building2 size={18} />
          <span>Company Profile</span>
        </div>

        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-secondary/10 cursor-pointer">
          <Settings size={18} />
          <span>Settings</span>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;