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
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/dashboard/email-review", icon: Mail, label: "Email Review" },
  { to: "/dashboard/knowledge-base", icon: Database, label: "Knowledge Base" },
  { to: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardLayout() {
  const [language, setLanguage] = useState<"EN" | "DE">("EN");
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-700 font-sans">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-slate-200 z-50 hidden lg:flex flex-col">
        <div className="p-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#009EE3] rounded-lg flex items-center justify-center shadow-md border border-white/20">
               <span className="text-white font-bold text-lg italic tracking-tighter">MP</span>
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 leading-none">MAGNET-PHYSIK</h1>
              <p className="text-[10px] text-slate-400 font-medium mt-1">Technical Station</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto premium-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-[#009EE3] bg-slate-50 font-semibold"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-[#009EE3]" : "text-slate-400 group-hover:text-slate-600"}`} />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="nav-pill"
                      className="ml-auto w-1 h-4 bg-[#009EE3] rounded-full" 
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={() => {
              // Add any logout logic here (clearing tokens, etc.)
              navigate("/");
            }}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
          >
            <LogOut className="w-4.5 h-4.5" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
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
                <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
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
      </div>
    </div>
  );
}
