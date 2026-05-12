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
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lightBlue = "#5DA9DD";
const deepBlue = "#2D6F9F";

export function SettingsScreen() {
   const [activeTab, setActiveTab] = useState("Profile");
   const [isSaving, setIsSaving] = useState(false);

   const tabs = [
      { icon: User, label: "Profile", sub: "User Identity & Preferences" },
      { icon: Bell, label: "Notifications", sub: "System Alerts & Broadcasts" },
      { icon: Shield, label: "Security", sub: "IAM & Access Protocols" },
      { icon: Database, label: "Data Source", sub: "Ingestion & API Hooks" },
      { icon: Monitor, label: "Interface", sub: "Visual Design & Display" },
      { icon: Server, label: "Lab Connectivity", sub: "Local Network Mesh" },
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
                  <span className="px-2 py-0.5 bg-blue-50 text-[#5DA9DD] text-[9px] font-bold rounded border border-blue-100 uppercase tracking-widest">Global Node Settings</span>
               </div>
               <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">System Configuration</h2>
               <p className="text-sm text-slate-500 font-medium italic">Configure global parameters, security protocols, and engineering workstation preferences.</p>
            </div>
            <div className="flex items-center gap-4">
               <button className="px-6 py-3 text-[10px] font-bold text-slate-400 hover:text-[#5DA9DD] uppercase tracking-[0.2em] transition-colors">Reset Defaults</button>
               <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-10 py-3 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4A98CC] shadow-xl hover:shadow-blue-200/50 flex items-center gap-3 transition-all active:scale-95 disabled:opacity-50"
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
                              ? "bg-[#5DA9DD] text-white shadow-lg shadow-blue-200"
                              : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                           }`}
                     >
                        <div className="flex items-center gap-3 mb-1">
                           <item.icon className={`w-4 h-4 ${activeTab === item.label ? "text-white" : "text-slate-400 group-hover:text-[#5DA9DD]"}`} />
                           <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
                        </div>
                        <span className={`text-[9px] font-medium transition-colors ${activeTab === item.label ? "text-white/70" : "text-slate-400"}`}>
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
                           <div className="space-y-8">
                              <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm border-t-4 border-t-[#5DA9DD]">
                                 <div className="flex items-center justify-between mb-10">
                                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-3">
                                       <User className="w-5 h-5 text-[#5DA9DD]" />
                                       Profile Identity
                                    </h3>
                                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">ID: MP-ADMIN-001</span>
                                 </div>

                                 <div className="space-y-10">
                                    <div className="flex items-center gap-8">
                                       <div className="w-28 h-28 bg-slate-50 border-4 border-white rounded-3xl flex items-center justify-center shadow-2xl group relative overflow-hidden ring-1 ring-slate-200">
                                          <div className="absolute inset-0 bg-[#5DA9DD] opacity-10 group-hover:opacity-20 transition-opacity" />
                                          <span className="text-[#5DA9DD] text-4xl font-black italic z-10 drop-shadow-sm">MP</span>
                                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                                             <Plus className="w-8 h-8 text-white" />
                                          </div>
                                       </div>
                                       <div className="space-y-4">
                                          <div>
                                             <h4 className="text-lg font-bold text-slate-800 tracking-tight">Station Identifier</h4>
                                             <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Magnet-Physik Engineering Lead</p>
                                          </div>
                                          <button className="px-6 py-2.5 bg-[#5DA9DD]/5 border border-[#5DA9DD]/20 rounded text-[10px] font-bold text-[#5DA9DD] hover:bg-[#5DA9DD] hover:text-white transition-all uppercase tracking-widest active:scale-95">
                                             Update Terminal Avatar
                                          </button>
                                       </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                       <div className="space-y-3">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Engineering Lead</label>
                                          <div className="relative group">
                                             <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#5DA9DD] transition-colors" />
                                             <input type="text" defaultValue="Admin Console" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                       <div className="space-y-3">
                                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Terminal ID</label>
                                          <div className="relative group">
                                             <Monitor className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#5DA9DD] transition-colors" />
                                             <input type="text" defaultValue="MP-DRIVE-24" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all shadow-inner" />
                                          </div>
                                       </div>
                                    </div>

                                    <div className="space-y-3">
                                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] ml-1">Administrative Email</label>
                                       <div className="relative group">
                                          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-[#5DA9DD] transition-colors" />
                                          <input type="email" defaultValue="admin@magnet-physik.de" className="w-full bg-slate-50/50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] focus:ring-4 focus:ring-blue-50/50 outline-none transition-all shadow-inner" />
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm">
                                 <h3 className="text-xs font-bold text-slate-900 mb-10 pb-4 border-b border-slate-100 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Lock className="w-5 h-5 text-amber-500" />
                                    Access Protocols
                                 </h3>
                                 <div className="space-y-5">
                                    {[
                                       { label: "Multi-Factor Authentication", sub: "Requirement for all lab workstations.", icon: Smartphone, active: true },
                                       { label: "Biometric Verification", sub: "Active for Hall probe calibration zones.", icon: Fingerprint, active: false },
                                       { label: "Hardware Key Required", sub: "Physical YubiKey for ingestion approval.", icon: Key, active: false },
                                    ].map((item, i) => (
                                       <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${item.active ? "bg-blue-50/30 border-blue-100" : "bg-white border-slate-100"}`}>
                                          <div className="flex items-center gap-4">
                                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.active ? "bg-white text-[#5DA9DD] shadow-sm" : "bg-slate-50 text-slate-300"}`}>
                                                <item.icon className="w-5 h-5" />
                                             </div>
                                             <div className="space-y-0.5">
                                                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                                                <p className="text-[10px] text-slate-400 font-medium tracking-tight">{item.sub}</p>
                                             </div>
                                          </div>
                                          <div
                                             className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${item.active ? "bg-[#5DA9DD]" : "bg-slate-200"}`}
                                          >
                                             <motion.div
                                                animate={{ x: item.active ? 24 : 0 }}
                                                className="w-4 h-4 bg-white rounded-full shadow-sm"
                                             />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           <div className="space-y-8">
                              <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm border-t-4 border-t-blue-800">
                                 <h3 className="text-xs font-bold text-slate-900 mb-10 pb-4 border-b border-slate-100 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <Cpu className="w-5 h-5 text-blue-800" />
                                    Knowledge Processing
                                 </h3>
                                 <div className="space-y-12">
                                    {[
                                       { label: "Extraction Confidence Threshold", value: 85, desc: "Minimum verification score for autonomous ingestion." },
                                       { label: "OCR Scan Resolution", value: 92, desc: "Deep parsing quality for technical schematics." },
                                       { label: "Technical Asset Mapping", value: 78, desc: "Level of detail for SKU cross-referencing." },
                                    ].map((item, i) => (
                                       <div key={i} className="space-y-5">
                                          <div className="flex justify-between items-end">
                                             <div className="space-y-1">
                                                <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">{item.label}</p>
                                                <p className="text-[10px] text-slate-400 font-medium italic">{item.desc}</p>
                                             </div>
                                             <span className="text-xs font-mono font-bold text-blue-800 bg-blue-50 px-2 py-1 rounded border border-blue-100">{item.value}%</span>
                                          </div>
                                          <div className="h-2 w-full bg-slate-50 rounded-full border border-slate-100 relative overflow-hidden">
                                             <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                className="h-full rounded-full bg-gradient-to-r from-[#5DA9DD] to-blue-800"
                                             />
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              </div>

                              {/* Interactive Diagnostics Widget */}
                              <div className="bg-slate-900 rounded-2xl p-10 text-white shadow-2xl relative overflow-hidden group">
                                 <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Activity className="w-32 h-32 group-hover:scale-110 transition-transform duration-1000" />
                                 </div>
                                 <div className="relative z-10">
                                    <h3 className="text-xs font-bold mb-10 pb-4 border-b border-white/10 uppercase tracking-[0.2em] flex items-center gap-3 text-[#5DA9DD]">
                                       <Activity className="w-5 h-5" />
                                       Operational Status
                                    </h3>
                                    <div className="grid grid-cols-2 gap-10">
                                       <div className="space-y-2">
                                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Processing Latency</p>
                                          <p className="text-3xl font-bold text-white tabular-nums tracking-tighter">~2.4 ms</p>
                                       </div>
                                       <div className="space-y-2">
                                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Units</p>
                                          <p className="text-3xl font-bold text-[#5DA9DD] tabular-nums tracking-tighter">14 <span className="text-sm font-medium text-slate-600">/ 14</span></p>
                                       </div>
                                       <div className="space-y-2">
                                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Throughput Rate</p>
                                          <p className="text-3xl font-bold text-white tabular-nums tracking-tighter">12.8 <span className="text-xs font-medium text-slate-600 uppercase">GB/s</span></p>
                                       </div>
                                       <div className="space-y-2">
                                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Sync</p>
                                          <div className="flex items-center gap-2">
                                             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                             <p className="text-2xl font-bold text-green-400 uppercase tracking-tighter">Optimal</p>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="mt-12">
                                       <button className="w-full py-4 bg-[#5DA9DD] hover:bg-[#4A98CC] text-white rounded text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                                          Execute System Calibration
                                       </button>
                                    </div>
                                 </div>
                              </div>

                              <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm group hover:border-red-100 transition-colors">
                                 <h3 className="text-xs font-bold text-slate-900 mb-8 uppercase tracking-[0.2em] flex items-center gap-3">
                                    <ShieldAlert className="w-5 h-5 text-red-500" />
                                    Workstation Maintenance
                                 </h3>
                                 <p className="text-xs text-slate-500 font-medium mb-8 leading-relaxed italic">
                                    Flush local workstation cache and temporary data segments to optimize workstation performance. This action will reset local session states.
                                 </p>
                                 <button className="flex items-center gap-3 px-8 py-3 bg-red-50 text-red-600 border border-red-100 rounded text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm active:scale-95">
                                    <Trash2 className="w-4 h-4" />
                                    Flush Station Cache
                                 </button>
                              </div>
                           </div>
                        </>
                     )}
                     {activeTab !== "Profile" && (
                        <div className="lg:col-span-2 flex flex-col items-center justify-center py-40 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                           <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6 border border-slate-100">
                              <RefreshCw className="w-8 h-8 text-slate-300 animate-spin-slow" />
                           </div>
                           <h4 className="text-lg font-bold text-slate-800 uppercase tracking-[0.2em] mb-2">{activeTab} Modules</h4>
                           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Module content is currently being calibrated for Phase 1.1 Deployment.</p>
                        </div>
                     )}
                  </motion.div>
               </AnimatePresence>
            </div>
         </div>
      </div>
   );
}
