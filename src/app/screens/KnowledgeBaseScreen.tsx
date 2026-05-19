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
  },
  { 
    id: "KB-005", 
    question: "What causes erratic readings on the EF 14 Fluxmeter below 10mT?", 
    sourceDoc: "Tech_Support_April.csv",
    reference: "EF14_Troubleshooting.pdf",
    type: "Email Conversations", 
    status: "Approved", 
    lastReviewed: "2024-05-12" 
  },
  { 
    id: "KB-006", 
    question: "Does the PC-interface cable for MC 1 support USB-C adapters?", 
    sourceDoc: "Hardware_Inquiries_2023.xlsx",
    reference: "MC1_Connectivity_Guide.pdf",
    type: "Email Conversations", 
    status: "Pending Review", 
    lastReviewed: "2024-05-14" 
  },
  { 
    id: "KB-007", 
    question: "Permability range for standard reference magnets type M-100?", 
    sourceDoc: "M100_Spec_Sheet.pdf",
    reference: "M100_Datasheet.pdf",
    type: "Datasheets", 
    status: "Approved", 
    lastReviewed: "2024-05-02" 
  },
  { 
    id: "KB-008", 
    question: "Procedure to reset the zero-drift offset on digital Gaussmeters?", 
    sourceDoc: "Client_Email_Export.csv",
    reference: "Gaussmeter_UserManual.pdf",
    type: "Email Conversations", 
    status: "Approved", 
    lastReviewed: "2024-05-15" 
  },
  { 
    id: "KB-009", 
    question: "Can the RM-30 rack mount module be installed in a standard 19-inch rack?", 
    sourceDoc: "RM30_Installation.pdf",
    reference: "RM30_Datasheet.pdf",
    type: "Datasheets", 
    status: "Approved", 
    lastReviewed: "2024-04-28" 
  },
  { 
    id: "KB-010", 
    question: "What is the typical battery life for the portable FH 52 under continuous logging?", 
    sourceDoc: "Support_Desk_Tickets.csv",
    reference: "FH52_Power_Specs.pdf",
    type: "Email Conversations", 
    status: "Pending Review", 
    lastReviewed: "2024-05-16" 
  },
  { 
    id: "KB-011", 
    question: "Recommended recalibration interval for industrial demagnetization units?", 
    sourceDoc: "Maintenance_Guide_v3.pdf",
    reference: "Demag_Service_Manual.pdf",
    type: "Datasheets", 
    status: "Approved", 
    lastReviewed: "2024-05-01" 
  },
  { 
    id: "KB-012", 
    question: "How to export logged magnetic flux data directly to MATLAB?", 
    sourceDoc: "Software_Integration_Thread.csv",
    reference: "API_Documentation.pdf",
    type: "Email Conversations", 
    status: "Approved", 
    lastReviewed: "2024-05-17" 
  }
];

const categoryStats = [
  { name: "Total Knowledge", count: 998, icon: Database, color: "text-[#009EE3]" },
  { name: "Approved Entries", count: 986, icon: CheckCircle2, color: "text-green-600" },
  { name: "Pending Review", count: 12, icon: Clock, color: "text-red-600" },
];

export function KnowledgeBaseScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"Emails" | "Datasheets">("Emails");
  const [activeFilter, setActiveFilter] = useState("All");
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const filters = ["All", "Approved", "Pending Review"];

  const filteredEntries = knowledgeEntries.filter(entry => {
    if (activeTab === "Datasheets") {
       return entry.type === "Datasheets";
    } else {
       if (entry.type !== "Email Conversations") return false;
       if (activeFilter === "All") return true;
       if (activeFilter === "Approved") return entry.status === "Approved";
       if (activeFilter === "Pending Review") return entry.status === "Pending Review";
       return true;
    }
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-200 pb-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Knowledge Base</h2>
          <p className="text-sm text-slate-500 font-medium italic">Master repository of validated engineering intelligence and technical references.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search approved knowledge..."
              className="bg-white border border-slate-200 rounded pl-10 pr-4 py-2.5 text-sm font-bold focus:border-[#009EE3] outline-none w-64 transition-all shadow-sm"
            />
          </div>
          <button 
            onClick={() => navigate("/dashboard/upload")}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#009EE3] text-white rounded text-sm font-bold uppercase tracking-widest hover:bg-[#007AB0] transition-all shadow-md active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            Add New Knowledge
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">{cat.name}</h4>
          </div>
        ))}
      </div>

      {/* Top Level Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200">
         <button 
           onClick={() => setActiveTab("Emails")}
           className={`text-sm font-bold uppercase tracking-widest pb-4 border-b-2 transition-all flex items-center gap-2 ${
             activeTab === "Emails" ? 'border-[#009EE3] text-[#009EE3]' : 'border-transparent text-slate-400 hover:text-slate-600'
           }`}
         >
            <Mail className="w-4 h-4" />
            Email Conversations
         </button>
         <button 
           onClick={() => setActiveTab("Datasheets")}
           className={`text-sm font-bold uppercase tracking-widest pb-4 border-b-2 transition-all flex items-center gap-2 ${
             activeTab === "Datasheets" ? 'border-[#009EE3] text-[#009EE3]' : 'border-transparent text-slate-400 hover:text-slate-600'
           }`}
         >
            <FileText className="w-4 h-4" />
            Technical Datasheets
         </button>
      </div>

      {/* Filter Bar - Only for Emails */}
      {activeTab === "Emails" && (
        <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded text-sm font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                activeFilter === filter 
                ? 'bg-[#009EE3] border-[#009EE3] text-white shadow-md' 
                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      )}

      {/* Main Content Area */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-100 flex items-center justify-between">
           <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Approved Engineering Inventory</h3>
           <button className="flex items-center gap-2 text-sm font-bold text-[#009EE3] uppercase hover:underline">
              <Download className="w-3.5 h-3.5" /> Export Data Logs
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/20">
                <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-widest">Approved Q&A Entry</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Source Document</th>
                <th className="px-6 py-4 text-sm font-bold text-slate-400 uppercase tracking-widest text-center">Datasheet Ref</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-slate-400 uppercase tracking-widest">Last Reviewed</th>
              </tr>
            </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredEntries.map((entry, i) => (
                        <AnimatePresence key={entry.id}>
                          <tr 
                            className={`group hover:bg-slate-50 transition-all cursor-pointer ${expandedRow === entry.id ? 'bg-blue-100/50' : ''}`}
                            onClick={() => setExpandedRow(expandedRow === entry.id ? null : entry.id)}
                          >
                            <td className="px-6 py-5 max-w-xs">
                              <div className="flex flex-col gap-1">
                                <span className="text-sm font-bold text-[#009EE3] uppercase tracking-tighter">{entry.id}</span>
                                <p className="text-sm font-bold text-slate-800 leading-snug group-hover:text-[#009EE3] transition-colors">{entry.question}</p>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <span className={`px-2 py-1 rounded text-sm font-bold uppercase tracking-widest border ${
                                entry.type === 'Datasheets' 
                                ? 'bg-blue-100 text-blue-600 border-blue-100' 
                                : 'bg-amber-50 text-amber-600 border-amber-100'
                              }`}>{entry.type}</span>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <FileText className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-600" />
                                <span className="text-sm font-bold text-slate-600">{entry.sourceDoc}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <div className="flex items-center justify-center gap-2 text-slate-400 group-hover:text-slate-600 transition-colors">
                                <FileSearch className="w-3.5 h-3.5" />
                                <span className="text-sm font-bold italic">{entry.reference}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-center">
                              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border ${
                                entry.status === 'Approved' 
                                ? 'bg-green-50 border-green-100 text-green-600' 
                                : 'bg-amber-50 border-amber-100 text-amber-600'
                              }`}>
                                 {entry.status === 'Approved' ? <ShieldCheck className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                 <span className="text-sm font-bold uppercase tracking-widest">{entry.status}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5 text-right">
                              <div className="flex flex-col items-end gap-1">
                                 <span className="text-sm font-bold text-slate-400 uppercase tabular-nums">{entry.lastReviewed}</span>
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
                               <td colSpan={6} className="px-12 py-8 border-l-4 border-l-[#009EE3]">
                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                     <div className="lg:col-span-2 space-y-4">
                                        <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                           <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                           Approved Engineering Answer
                                        </h5>
                                        <div className="p-6 bg-white border border-slate-200 rounded-lg shadow-sm">
                                           <p className="text-sm font-medium text-slate-700 leading-relaxed italic">
                                              "For operating temperatures above 35°C, the FH 55 requires a compensation coefficient of 0.02%/K. This can be adjusted in the 'Advanced Sensor Settings' menu under 'Thermal Calibration'. Ensure the sensor has been at ambient temperature for at least 30 minutes before calibration."
                                           </p>
                                        </div>
                                     </div>
                                     <div className="space-y-6">
                                        <div>
                                           <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Resource Traceability</h5>
                                           <div className="space-y-2">
                                              <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded">
                                                 <span className="text-sm font-bold text-slate-400 uppercase">Primary Source</span>
                                                 <span className="text-sm font-bold text-[#009EE3] underline cursor-pointer">{entry.sourceDoc}</span>
                                              </div>
                                              <div className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded">
                                                 <span className="text-sm font-bold text-slate-400 uppercase">Tech Reference</span>
                                                 <span className="text-sm font-bold text-[#009EE3] underline cursor-pointer">{entry.reference}</span>
                                              </div>
                                           </div>
                                        </div>
                                        <button className="w-full py-3 bg-[#009EE3] text-white rounded text-sm font-bold uppercase tracking-widest hover:bg-[#007AB0] transition-all flex items-center justify-center gap-2">
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
