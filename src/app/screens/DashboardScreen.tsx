import {
  FileText,
  Mail,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ClipboardCheck,
  FileSearch,
  Database,
  History,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const queryTrendData = [
  { name: "05/04", q: 12 },
  { name: "05/05", q: 18 },
  { name: "05/06", q: 15 },
  { name: "05/07", q: 25 },
  { name: "05/08", q: 22 },
  { name: "05/09", q: 30 },
  { name: "05/10", q: 28 },
];

const recentActivities = [
  { id: "1", type: "upload", action: "Datasheet uploaded", detail: "FH55_Magnetic_Flux_Manual.pdf", time: "10m ago" },
  { id: "2", type: "process", action: "Email conversation processed", detail: "Customer_Inquiry_Log_0424.csv", time: "45m ago" },
  { id: "3", type: "extraction", action: "12 Q&A segments extracted", detail: "Source: FH55 Datasheet", time: "2h ago" },
  { id: "4", type: "approval", action: "8 entries approved", detail: "Added to master knowledge base", time: "3h ago" },
  { id: "5", type: "response", action: "Technical response generated", detail: "Ref: Calibration Protocol Inquiry", time: "5h ago" },
];

export function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Operational Overview</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Magnet-Physik Engineering Intelligence Platform • Phase 1 PoC</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => navigate('/dashboard/upload')}
             className="px-6 py-2.5 bg-white border border-[#5DA9DD]/20 text-[#5DA9DD] rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#5DA9DD]/5 transition-all shadow-sm flex items-center gap-2"
           >
              <Database className="w-3.5 h-3.5" />
              Technical Ingestion
           </button>
           <button 
             onClick={() => navigate('/dashboard/query-assistant')}
             className="px-8 py-2.5 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A98CC] transition-all shadow-lg flex items-center gap-3"
           >
              <Zap className="w-3.5 h-3.5" />
              Response Workspace
           </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        {/* 1. Documents Uploaded */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ingested Documents</h3>
             <FileText className="w-4 h-4 text-[#5DA9DD]" />
          </div>
          <div className="space-y-4">
             <div className="flex items-end justify-between border-b border-slate-50 pb-2">
                <span className="text-[11px] font-bold text-slate-600 uppercase">Datasheets</span>
                <span className="text-2xl font-bold text-slate-900 mono-value">42</span>
             </div>
             <div className="flex items-end justify-between">
                <span className="text-[11px] font-bold text-slate-600 uppercase">Email Conversations</span>
                <span className="text-2xl font-bold text-slate-900 mono-value">128</span>
             </div>
          </div>
        </div>

        {/* 2. Extraction Summary */}
        <div className="md:col-span-1 xl:col-span-2 bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Knowledge Extraction Summary</h3>
             <ClipboardCheck className="w-4 h-4 text-[#5DA9DD]" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
             {[
               { label: "Questions", value: "842", color: "text-slate-900" },
               { label: "Answers", value: "842", color: "text-slate-900" },
               { label: "Pending", value: "24", color: "text-amber-500" },
               { label: "Approved", value: "798", color: "text-green-600" },
               { label: "Rejected", value: "20", color: "text-red-500" },
             ].map((stat, i) => (
               <div key={i} className="flex flex-col p-3 bg-slate-50 rounded border border-slate-100">
                  <span className={`text-lg font-bold mb-1 mono-value ${stat.color}`}>{stat.value}</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{stat.label}</span>
               </div>
             ))}
          </div>
        </div>

        {/* 3. AI Response Activity */}
        <div className="bg-white border border-slate-200 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response Recommendation</h3>
             <Activity className="w-4 h-4 text-[#5DA9DD]" />
          </div>
          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Generated</span>
                <span className="text-xl font-bold text-slate-900 mono-value">312</span>
             </div>
             <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase">Approved</span>
                <span className="text-xl font-bold text-[#5DA9DD] mono-value">284</span>
             </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Trend Visualization */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-bold text-slate-900 tracking-widest uppercase flex items-center gap-2">
               <TrendingUp className="w-4 h-4 text-[#5DA9DD]" />
               Daily Activity Trend
            </h3>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={queryTrendData}>
                <defs>
                  <linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5DA9DD" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5DA9DD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 'bold' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 'bold' }} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="q" stroke="#5DA9DD" strokeWidth={3} fill="url(#colorQ)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* System Activity Logs */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between mb-8">
             <h3 className="text-[10px] font-bold text-slate-900 tracking-widest uppercase flex items-center gap-2">
                <History className="w-4 h-4 text-slate-400" />
                Recent System Log
             </h3>
             <button className="text-[8px] font-bold text-[#5DA9DD] uppercase tracking-widest hover:underline">Full Audit</button>
          </div>
          <div className="space-y-3">
             {[
               { icon: FileText, action: "Datasheet Ingested", detail: "FH55_Magnetic_Flux_Manual.pdf", time: "10m ago" },
               { icon: Mail, action: "Email Record Processed", detail: "Customer_Inquiry_Log_0424.csv", time: "45m ago" },
               { icon: ClipboardCheck, action: "12 Q&A Segments Extracted", detail: "Source: FH55 Datasheet", time: "2h ago" },
               { icon: CheckCircle2, action: "8 Entries Validated", detail: "Added to master knowledge base", time: "3h ago" },
               { icon: Zap, action: "Response Generated", detail: "Ref: Calibration Protocol Inquiry", time: "5h ago" },
             ].map((log, i) => (
               <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded group hover:border-[#5DA9DD] transition-all">
                  <div className="flex justify-between items-start mb-1">
                     <p className="text-[10px] font-bold text-slate-800 leading-tight group-hover:text-[#5DA9DD] transition-colors">{log.action}</p>
                     <span className="text-[8px] font-bold text-slate-300 uppercase shrink-0 ml-4">{log.time}</span>
                  </div>
                  <p className="text-[9px] font-medium text-slate-400 line-clamp-1">{log.detail}</p>
               </div>
             ))}
          </div>
        </div>
      </div>
      
      {/* Operational Status Footer */}
      <div className="flex items-center justify-between px-4 py-6 border-t border-slate-100">
         <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> System Node: Active
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full" /> Extraction Engine: Standby
            </div>
         </div>
         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Magnet-Physik Engineering Intelligence • Station Node: DRIVE-24</p>
      </div>
    </div>
  );
}
