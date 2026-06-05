import { Search , Bell } from "lucide-react";

const AdminTopBar = () =>{
    return (
        <header className="h-20 bg-white border-b border-border shadow-sm px-8 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-dark">
                Dashboard
            </h2>
            <div className="flex items-center gap-6">
                <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark/50" />
                    <input type="text" placeholder="search..." className=" pl-10 pr-4 py-2 border border-border rounded-lg" />
                </div>
                    <Bell size={20}/>
                    <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center">
                        JD
                    </div>

                    <span>John Doe</span>
                </div>
            </div>
        </header>
    );
}

export default AdminTopBar;

