import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  Download,
  ExternalLink,
  Database,
  ShieldCheck,
  FileCode,
  Plus,
  Mail,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSearch,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import { useState } from "react";

const knowledgeEntries = [
  { 
    id: "KB-001", 
    question: "What is the recommended thermal drift compensation for FH 55?", 
    sourceDoc: "History_Customer_Support_2023.csv",
    reference: "FH_55_Specs.pdf",
    type: "Email Conversations", 
    status: "Approved", 
    lastReviewed: "2024-05-10" 
  },
  { 
    id: "KB-002", 
    question: "Maximum torque values for EZ4 assembly at 50Hz?", 
    sourceDoc: "EZ4_Manual_Master.pdf",
    reference: "EZ4_Datasheet_v2.pdf",
    type: "Datasheets", 
    status: "Approved", 
    lastReviewed: "2024-05-08" 
  },
  { 
    id: "KB-003", 
    question: "Calibration sequence for series #400 Hall Sensors?", 
    sourceDoc: "Support_Log_Q1.xlsx",
    reference: "MP-740_Manual.pdf",
    type: "Email Conversations", 
    status: "Pending Review", 
    lastReviewed: "2024-05-11" 
  },
  { 
    id: "KB-004", 
    question: "Magnetic shielding requirements for high-frequency labs?", 
    sourceDoc: "Shielding_Guidelines_2024.pdf",
    reference: "MP_Shielding_Standard.pdf",
    type: "Datasheets", 
    status: "Approved", 
    lastReviewed: "2024-05-05" 
  }
];

const categoryStats = [
  { name: "Datasheets", count: 142, icon: FileCode, color: "text-blue-600" },
  { name: "Email Conversations", count: 864, icon: Mail, color: "text-amber-600" },
  { name: "Approved Entries", count: 986, icon: CheckCircle2, color: "text-green-600" },
  { name: "Pending Review", count: 12, icon: Clock, color: "text-red-600" },
];

export function KnowledgeBaseScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filters = ["All", "Datasheets", "Email Conversations", "Approved Entries", "Pending Review"];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Approved Knowledge Base</h2>
          <p className="text-sm text-slate-500 font-medium italic">Master repository of validated engineering intelligence and technical references.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search approved knowledge..."
              className="bg-white border border-slate-200 rounded pl-10 pr-4 py-2.5 text-xs font-bold focus:border-[#5DA9DD] outline-none w-64 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => navigate("/dashboard/upload")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A98CC] transition-all shadow-md active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            New Ingestion
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categoryStats.map((cat, i) => (
          <div
            key={i}
            className="bg-white border border-slate-200 p-5 rounded-lg shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-9 h-9 bg-slate-50 rounded flex items-center justify-center border border-slate-100`}>
                <cat.icon className={`w-4 h-4 ${cat.color}`} />
              </div>
              <span className="text-xl font-bold text-slate-900 tabular-nums">{cat.count}</span>
            </div>
            <h4 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{cat.name}</h4>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded text-[9px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
              activeFilter === filter 
              ? 'bg-[#5DA9DD] border-[#5DA9DD] text-white shadow-md' 
              : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Approved Engineering Inventory</h3>
           <button className="flex items-center gap-2 text-[9px] font-bold text-[#5DA9DD] uppercase hover:underline">
              <Download className="w-3.5 h-3.5" /> Export Data Logs
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Approved Q&A Entry</th>
                <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Source Document</th>
                <th className="px-6 py-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Datasheet Ref</th>
                <th className="px-6 py-4 text-center text-[9px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-[9px] font-bold text-slate-400 uppercase tracking-widest">Last Reviewed</th>
              </tr>
            </thead>
                    <tbody className="divide-y divide-slate-100">
                      {knowledgeEntries.filter(entry => {
                        if (activeFilter === "All") return true;
                        if (activeFilter === "Datasheets") return entry.type === "Datasheets";
                        if (activeFilter === "Email Conversations") return entry.type === "Email Conversations";
                        if (activeFilter === "Approved Entries") return entry.status === "Approved";
                        if (activeFilter === "Pending Review") return entry.status === "Pending Review";
                        return true;
                      }).map((entry, i) => (
                        <AnimatePresence key={entry.id}>
                          <tr 
                            className={`group hover:bg-slate-50 transition-all cursor-pointer ${expandedRow === entry.id ? 'bg-blue-50/30' : ''}`}
                            onClick={() => setExpandedRow(expandedRow === entry.id ? null : entry.id)}
                          >
                            <td className="px-6 py-5 max-w-md">
                              <div className="flex flex-col gap-1">
                                <span className="text-[8px] font-bold text-[#5DA9DD] uppercase tracking-tighter">{entry.id}</span>
                                <p className="text-[11px] font-bold text-slate-800 leading-snug group-hover:text-[#5DA9DD] transition-colors">{entry.question}</p>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600" />
                                <span className="text-[10px] font-bold text-slate-600">{entry.sourceDoc}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                <FileSearch className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-bold italic">{entry.reference}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border ${
                                entry.status === 'Approved' 
                                ? 'bg-green-50 border-green-100 text-green-600' 
                                : 'bg-amber-50 border-amber-100 text-amber-600'
                              }`}>
                                 {entry.status === 'Approved' ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                 <span className="text-[9px] font-bold uppercase tracking-widest">{entry.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex flex-col items-end gap-1">
                                 <span className="text-[10px] font-bold text-slate-400 uppercase tabular-nums">{entry.lastReviewed}</span>
                                 <ChevronRight className={`w-3 h-3 text-slate-300 transition-transform ${expandedRow === entry.id ? 'rotate-90' : ''}`} />
                              </div>
                            </td>
                          </tr>
                          
                          {expandedRow === entry.id && (
                            <motion.tr 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-slate-50/50"
                            >
                               <td colSpan={5} className="px-12 py-8 border-l-4 border-l-[#5DA9DD]">
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                     <div className="lg:col-span-2 space-y-4">
                                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                           <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                           Approved Engineering Answer
                                        </h5>
                                        <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                           <p className="text-xs font-medium text-slate-700 leading-relaxed italic">
                                              "For operating temperatures above 35°C, the FH 55 requires a compensation coefficient of 0.02%/K. This can be adjusted in the 'Advanced Sensor Settings' menu under 'Thermal Calibration'. Ensure the sensor has been at ambient temperature for at least 30 minutes before calibration."
                                           </p>
                                        </div>
                                     </div>
                                     <div className="space-y-6">
                                        <div>
                                           <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Resource Traceability</h5>
                                           <div className="space-y-2">
                                              <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded">
                                                 <span className="text-[9px] font-bold text-slate-400 uppercase">Primary Source</span>
                                                 <span className="text-[10px] font-bold text-[#5DA9DD] underline cursor-pointer">{entry.sourceDoc}</span>
                                              </div>
                                              <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded">
                                                 <span className="text-[9px] font-bold text-slate-400 uppercase">Tech Reference</span>
                                                 <span className="text-[10px] font-bold text-[#5DA9DD] underline cursor-pointer">{entry.reference}</span>
                                              </div>
                                           </div>
                                        </div>
                                        <button className="w-full py-3 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A98CC] transition-all flex items-center justify-center gap-2">
                                           <ExternalLink className="w-3.5 h-3.5" /> View Full Protocol
                                        </button>
                                     </div>
                                  </div>
                               </td>
                            </motion.tr>
                          )}
                        </AnimatePresence>
                      ))}
                    </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
