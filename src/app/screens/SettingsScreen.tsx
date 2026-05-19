import {
   User,
   Bell,
   Shield,
   Database,
   Globe,
   Monitor,
   Zap,
   Save,
   Trash2,
   Cpu,
   Lock,
   Eye,
   Key,
   HardDrive,
   Cloud,
   FileSearch,
   Activity,
   Server,
   Code,
   Plus,
   RefreshCw,
   Fingerprint,
   Smartphone,
   ShieldAlert,
   Mail,
   Phone,
   MapPin,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lightBlue = "#009EE3";
const deepBlue = "#005C8A";

export function SettingsScreen() {
   const [activeTab, setActiveTab] = useState("Profile");
   const [isSaving, setIsSaving] = useState(false);

   const tabs = [
      { icon: User, label: "Profile", sub: "User Identity & Preferences" },
      { icon: Bell, label: "Notifications", sub: "System Alerts & Broadcasts" },
      { icon: Code, label: "API Configuration", sub: "Developer Endpoints" },
   ];

   const handleSave = () => {
      setIsSaving(true);
      setTimeout(() => setIsSaving(false), 2000);
   };

   return (
      <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
         {/* Premium Header Area */}
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-10">
            <div className="space-y-1">
               <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-blue-100 text-[#009EE3] text-sm font-bold rounded border border-blue-100 uppercase tracking-widest">Global Node Settings</span>
               </div>
               <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Settings</h2>
               <p className="text-sm text-slate-500 font-medium italic">Configure global parameters, security protocols, and engineering workstation preferences.</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="px-6 py-3 text-sm font-bold text-slate-400 hover:text-[#009EE3] uppercase tracking-[0.2em] transition-colors">Reset Defaults</button>
               <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-10 py-3 bg-[#009EE3] text-white rounded text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#007AB0] shadow-xl hover:shadow-blue-300/50 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
               >
                  {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {isSaving ? "Syncing..." : "Save Changes"}
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
            {/* Navigation Sidebar (Industrial Grade) */}
            <div className="xl:col-span-3">
               <div className="bg-white border border-slate-200 rounded-2xl p-3 shadow-xl shadow-slate-200/40 sticky top-8 space-y-1">
                  {tabs.map((item) => (
                     <button
                        key={item.label}
                        onClick={() => setActiveTab(item.label)}
                        className={`w-full flex flex-col items-start px-5 py-4 rounded-xl transition-all group ${activeTab === item.label
                           ? "bg-[#009EE3] text-white shadow-lg shadow-blue-300"
                           : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                           }`}
                     >
                        <div className="flex items-center gap-3 mb-1">
                           <item.icon className={`w-4 h-4 ${activeTab === item.label ? "text-white" : "text-slate-400 group-hover:text-[#009EE3]"}`} />
                           <span className="text-sm font-bold uppercase tracking-widest">{item.label}</span>
                        </div>
                        <span className={`text-sm font-medium transition-colors ${activeTab === item.label ? "text-white/70" : "text-slate-400"}`}>
                           {item.sub}
                        </span>
                     </button>
                  ))}
               </div>
            </div>

            {/* Content Area - Optimized for Engineering Focus */}
            <div className="xl:col-span-9">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeTab}
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -10 }}
                     transition={{ duration: 0.3 }}
                     className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
                  >
                     {activeTab === "Profile" && (
                        <>
                           {/* Section 1: Identity & Profile */}
                           <div className="lg:col-span-2 space-y-8">
                              <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm border-t-4 border-t-[#009EE3]">
                                 <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                                       <User className="w-5 h-5 text-[#009EE3]" />
                                       Profile Identity
                                    </h3>
                                 </div>

                                 <div className="space-y-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                       <div className="space-y-3">
                                          <label className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                          <div className="relative group">
                                             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#009EE3] transition-colors" />
                                             <input type="text" defaultValue="Admin Console" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                       <div className="space-y-3">
                                          <label className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                          <div className="relative group">
                                             <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#009EE3] transition-colors" />
                                             <input type="email" defaultValue="admin@magnet-physik.de" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                       <div className="space-y-3">
                                          <label className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                          <div className="relative group">
                                             <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#009EE3] transition-colors" />
                                             <input type="tel" defaultValue="+49 (0) 221 123456" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                       <div className="space-y-3">
                                          <label className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Address</label>
                                          <div className="relative group">
                                             <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#009EE3] transition-colors" />
                                             <input type="text" defaultValue="Emil-Hoffmann-Straße 27, 50996 Köln" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </>
                     )}
                     {activeTab !== "Profile" && (
                        <div className="lg:col-span-2 flex flex-col items-center justify-center py-40 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6 border border-slate-100">
                              <RefreshCw className="w-8 h-8 text-slate-300 animate-spin-slow" />
                           </div>
                           <h4 className="text-base font-bold text-slate-800 uppercase tracking-[0.2em] mb-2">{activeTab} Modules</h4>
                           <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">Module content is currently being calibrated for Phase 1.1 Deployment.</p>
                        </div>
                     )}
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
}