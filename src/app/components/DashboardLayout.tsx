import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Upload,
  Mail,
  Database,
  MessageSquare,
  History,
  BarChart3,
  Settings,
  Globe,
  ChevronRight,
  LogOut,
  Bell,
  Search,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Operational Overview", end: true },
  { to: "/dashboard/upload", icon: Upload, label: "Technical Knowledge Ingestion" },
  { to: "/dashboard/extraction-review", icon: Mail, label: "Q&A Extraction Review" },
  { to: "/dashboard/knowledge-base", icon: Database, label: "Approved Knowledge Base" },
  { to: "/dashboard/query-assistant", icon: MessageSquare, label: "Technical Response Workspace" },
  { to: "/dashboard/settings", icon: Settings, label: "System Administration" },
];

export function DashboardLayout() {
  const [language, setLanguage] = useState<"EN" | "DE">("EN");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans">
      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="fixed left-0 top-0 h-screen bg-white border-r border-slate-200 z-50 hidden lg:flex flex-col overflow-hidden"
      >
        <div className="p-6 h-20 flex items-center justify-between border-b border-slate-50">
          <div className={`flex items-center gap-3 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            <div className="w-8 h-8 bg-[#5DA9DD] rounded-lg flex items-center justify-center shadow-md border border-white/20 flex-shrink-0">
               <span className="text-white font-bold text-base italic tracking-tighter">MP</span>
            </div>
            <div className="whitespace-nowrap">
              <h1 className="text-sm font-black tracking-tight text-slate-900 leading-none">MAGNET-PHYSIK</h1>
              <p className="text-[8px] text-slate-400 font-bold mt-1 uppercase tracking-wider">Engineering Station</p>
            </div>
          </div>
          
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-[#5DA9DD] transition-all ${isCollapsed ? 'mx-auto' : ''}`}
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto premium-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              title={isCollapsed ? item.label : ""}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 relative ${
                  isActive
                    ? "text-[#5DA9DD] bg-blue-50/50 font-bold border border-blue-100 shadow-sm"
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${isActive ? "text-[#5DA9DD]" : "text-slate-400 group-hover:text-[#5DA9DD]"} ${isCollapsed ? 'mx-auto' : ''}`} />
                  <motion.span 
                    initial={false}
                    animate={{ opacity: isCollapsed ? 0 : 1, x: isCollapsed ? -10 : 0 }}
                    className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0' : 'w-auto'}`}
                  >
                    {item.label}
                  </motion.span>
                  
                  {isActive && !isCollapsed && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="ml-auto w-1 h-5 bg-[#5DA9DD] rounded-full" 
                    />
                  )}
                  {isActive && isCollapsed && (
                    <div className="absolute left-0 w-1 h-6 bg-[#5DA9DD] rounded-r-full" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-100">
          <button 
            onClick={() => navigate("/")}
            title={isCollapsed ? "Logout" : ""}
            className={`w-full flex items-center gap-3 px-3 py-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <motion.span 
              initial={false}
              animate={{ opacity: isCollapsed ? 0 : 1 }}
              className={`text-[11px] font-bold uppercase tracking-widest whitespace-nowrap overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0' : 'w-auto'}`}
            >
              Logout
            </motion.span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <motion.div 
        animate={{ paddingLeft: isCollapsed ? 80 : 256 }}
        className="flex flex-col min-h-screen transition-all duration-300"
      >
        {/* Header */}
        <header className="sticky top-0 z-40 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative max-w-sm w-full hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search station knowledge..."
                className="w-full bg-slate-50 border-transparent rounded-lg pl-10 pr-4 py-2 text-sm focus:bg-white focus:ring-1 focus:ring-slate-200 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <div className="h-6 w-px bg-slate-200 mx-2" />

            <div className="flex items-center gap-3">
              <button
                onClick={() => setLanguage(language === "EN" ? "DE" : "EN")}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-slate-50 rounded-lg border border-slate-200 transition-all"
              >
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <span className="text-xs font-semibold text-slate-600">{language}</span>
              </button>

              <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-slate-900 leading-none">Admin Console</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">MP-DRIVE-24</p>
                </div>
                <div className="w-9 h-9 bg-[#5DA9DD] rounded-lg flex items-center justify-center shadow-sm">
                  <span className="text-white text-xs font-bold italic">MP</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </motion.div>
    </div>
  );
}
