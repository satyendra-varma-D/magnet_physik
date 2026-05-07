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
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const lightBlue = "#5DA9DD";
const deepBlue = "#2D6F9F";

export function SettingsScreen() {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { icon: User, label: "Profile" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Security" },
    { icon: Database, label: "Data Source" },
    { icon: Monitor, label: "Interface" },
    { icon: Server, label: "Lab Connectivity" },
    { icon: Code, label: "API Configuration" },
  ];

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Configuration</h2>
          <p className="text-sm text-slate-500 font-medium">Configure global parameters, security protocols, and engineering workstation preferences.</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-6 py-2.5 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest">Reset Defaults</button>
           <button className="px-8 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all flex items-center gap-3 shadow-lg">
              <Save className="w-4 h-4" />
              Save Changes
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
        {/* Navigation Sidebar (Properly Sized) */}
        <div className="xl:col-span-1">
           <div className="bg-white border border-slate-200 rounded-xl p-2 shadow-sm sticky top-8">
              {tabs.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveTab(item.label)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-lg text-xs font-bold transition-all uppercase tracking-widest ${
                    activeTab === item.label 
                    ? "bg-slate-900 text-white shadow-md" 
                    : "text-slate-400 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </button>
              ))}
           </div>
        </div>

        {/* Content Area - Using all available space with 2 columns */}
        <div className="xl:col-span-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
           
           {/* Section 1: Identity & Profile */}
           <div className="space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                 <h3 className="text-xs font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4" style={{ color: deepBlue }} />
                    Profile Identity
                 </h3>
                 
                 <div className="space-y-8">
                    <div className="flex items-center gap-8">
                       <div className="w-24 h-24 bg-slate-900 rounded-2xl flex items-center justify-center shadow-xl group relative overflow-hidden">
                          <span className="text-white text-3xl font-bold italic z-10">MP</span>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                             <Plus className="w-6 h-6 text-white" />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-sm font-bold text-slate-800">Workstation Avatar</h4>
                          <p className="text-[11px] text-slate-400 font-medium">Standard MP-System profile photo.</p>
                          <button className="px-5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-100 transition-all uppercase tracking-widest">
                             Update Image
                          </button>
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Engineering Lead</label>
                          <input type="text" defaultValue="Admin Console" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Terminal ID</label>
                          <input type="text" defaultValue="MP-DRIVE-24" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all" />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Administrative Email</label>
                       <input type="email" defaultValue="admin@magnet-physik.de" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-xs font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all" />
                    </div>
                 </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                 <h3 className="text-xs font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-500" />
                    Access Protocols
                 </h3>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800">Multi-Factor Authentication</p>
                          <p className="text-[10px] text-slate-400 font-medium tracking-tight">Requirement for all lab workstations.</p>
                       </div>
                       <div className="w-12 h-6 bg-[#2D6F9F] rounded-full relative p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full absolute right-1" />
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                       <div className="space-y-1">
                          <p className="text-xs font-bold text-slate-800">Biometric Verification</p>
                          <p className="text-[10px] text-slate-400 font-medium tracking-tight">Active for Hall probe calibration zones.</p>
                       </div>
                       <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                          <div className="w-4 h-4 bg-white rounded-full" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Technical & Parameters */}
           <div className="space-y-8">
              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                 <h3 className="text-xs font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-4 h-4" style={{ color: lightBlue }} />
                    Neural Processing Parameters
                 </h3>
                 <div className="space-y-10">
                    {[
                      { label: "AI Confidence Threshold", value: 85, desc: "Minimum accuracy for automated ingestion." },
                      { label: "OCR Scan Resolution", value: 92, desc: "Deep parsing quality for technical drawings." },
                      { label: "Product Mapping Precision", value: 78, desc: "Level of detail for SKU cross-referencing." },
                    ].map((item, i) => (
                      <div key={i} className="space-y-4">
                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-widest">{item.label}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{item.desc}</p>
                          </div>
                          <span className="text-xs font-mono font-bold" style={{ color: deepBlue }}>{item.value}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-50 rounded-full border border-slate-100 relative overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${item.value}%` }}
                            className="h-full rounded-full" 
                            style={{ backgroundColor: i % 2 === 0 ? deepBlue : lightBlue }} 
                          />
                        </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-8 text-white shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                    <h3 className="text-xs font-bold mb-8 pb-4 border-b border-white/10 uppercase tracking-widest flex items-center gap-2">
                       <Activity className="w-4 h-4" style={{ color: lightBlue }} />
                       System Health Diagnostics
                    </h3>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Wait Time</p>
                          <p className="text-2xl font-bold text-white">~2 mins</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Active Nodes</p>
                          <p className="text-2xl font-bold text-[#5DA9DD]">14 / 14</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">IOPS Rate</p>
                          <p className="text-2xl font-bold text-white">8.4k</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Sync</p>
                          <p className="text-2xl font-bold text-green-400">Stable</p>
                       </div>
                    </div>
                    <div className="mt-10">
                       <button className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
                          Run Calibration Protocol
                       </button>
                    </div>
                 </div>
                 <Server className="absolute -bottom-10 -right-10 w-48 h-48 opacity-5 text-white" />
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
                 <h3 className="text-xs font-bold text-slate-900 mb-6 uppercase tracking-widest flex items-center gap-2">
                    <Trash2 className="w-4 h-4 text-red-500" />
                    Maintenance
                 </h3>
                 <p className="text-[11px] text-slate-400 font-medium mb-6 leading-relaxed">
                    Clear local workstation cache and temporary neural fragments to optimize performance.
                 </p>
                 <button className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">
                    Purge System Cache
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
