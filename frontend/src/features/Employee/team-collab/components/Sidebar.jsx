import { MessageSquare, Users, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-20 bg-slate-800 text-white flex flex-col justify-between items-center py-6">

      {/* Top */}
      <div className="flex flex-col items-center gap-8">

        {/* Logo */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl font-bold shadow">
          TC
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-5">

          <button className="w-12 h-12 rounded-xl  hover:bg-white/10 flex items-center justify-center shadow-lg">
            <MessageSquare size={22} />
          </button>

          <button className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center transition">
            <Users size={22} />
          </button>

        </div>
      </div>

      {/* Bottom */}
      <button className="w-12 h-12 rounded-xl hover:bg-white/10 flex items-center justify-center transition">
        <Settings size={22} />
      </button>

    </aside>
  );
};

export default Sidebar;