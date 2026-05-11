import {
  FileText,
  Clock,
  Database,
  Shield,
  ArrowLeft,
  Download,
  Trash2,
  ExternalLink,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertCircle,
  Activity,
  Server,
  Hash,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";

export function KnowledgeDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock detail data
  const doc = {
    id: id || "1",
    name: "EZ4-Series Technical Manual",
    type: "Manuals",
    size: "12.4 MB",
    uploadedBy: "Dr. Schmidt",
    date: "2024-03-15",
    confidence: 98.4,
    status: "Verified",
    version: "v2.1.0",
    hash: "sha256:8f4a...e31b",
    indexedFragments: 1420,
    lastAccessed: "2h ago",
    description: "Comprehensive technical manual for the EZ4-Series flux sensors, covering calibration procedures, temperature compensation algorithms, and electrical specifications.",
    metadata: [
      { key: "Sensor Type", value: "Magnetic Flux" },
      { key: "Max Range", value: "2.5 Tesla" },
      { key: "Operating Temp", value: "-40°C to 125°C" },
      { key: "Compliance", value: "ISO-9001:2015" },
    ],
    history: [
      { event: "Knowledge Indexed", user: "System", time: "2024-03-15 14:20", type: "success" },
      { event: "Expert Validation", user: "Dr. Schmidt", time: "2024-03-15 16:45", type: "info" },
      { event: "Version v2.1.0 Released", user: "Admin", time: "2024-03-16 09:12", type: "success" },
    ]
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Breadcrumbs & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/dashboard/knowledge-base")}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400 hover:text-slate-900"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <span>Knowledge Base</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900">Document Detail</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
           <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-xs font-bold text-slate-600 transition-all">
              <Download className="w-4 h-4" />
              Download Source
           </button>
           <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 border border-red-100 hover:bg-red-100 rounded-lg text-xs font-bold transition-all">
              <Trash2 className="w-4 h-4" />
              Deprecate
           </button>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Primary Info */}
        <div className="lg:col-span-2 space-y-6">
           {/* Document Header Card */}
           <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
              <div className="flex items-start gap-6">
                 <div className="w-16 h-16 bg-[#5DA9DD] rounded-2xl flex items-center justify-center text-white shadow-lg">
                    <FileText className="w-8 h-8" />
                 </div>
                 <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{doc.name}</h2>
                       <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] font-bold rounded border border-green-100 uppercase tracking-wider">
                          {doc.status}
                       </span>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed max-w-xl">{doc.description}</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-10 pt-8 border-t border-slate-50">
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Confidence Score</p>
                    <div className="flex items-center gap-3">
                       <span className="text-xl font-bold text-slate-900">{doc.confidence}%</span>
                       <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#5DA9DD]" style={{ width: `${doc.confidence}%` }} />
                       </div>
                    </div>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Indexed Fragments</p>
                    <p className="text-xl font-bold text-slate-900">{doc.indexedFragments.toLocaleString()}</p>
                 </div>
                 <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Version Control</p>
                    <p className="text-xl font-bold text-slate-900">{doc.version}</p>
                 </div>
              </div>
           </div>

           {/* Metadata & Extraction Details */}
           <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Database className="w-4 h-4 text-[#5DA9DD]" />
                    Extracted Metadata
                 </h3>
                 <button className="text-[10px] font-bold text-[#5DA9DD] uppercase hover:underline">Edit Fields</button>
              </div>
              <div className="grid grid-cols-2 gap-px bg-slate-100">
                 {doc.metadata.map((meta, i) => (
                    <div key={i} className="bg-white px-8 py-6">
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{meta.key}</p>
                       <p className="text-sm font-semibold text-slate-800">{meta.value}</p>
                    </div>
                 ))}
              </div>
           </div>

           {/* AI Insight Breakdown */}
           <div className="bg-[#5DA9DD] text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
              <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-6">
                    <Activity className="w-5 h-5 text-white" />
                    <h3 className="text-sm font-bold uppercase tracking-widest">Neural Analysis Breakdown</h3>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-xs">
                          <span className="opacity-60">Entity Recognition</span>
                          <span className="text-[#5DA9DD] font-bold">99.2%</span>
                       </div>
                       <div className="h-1 bg-white/10 rounded-full">
                          <div className="h-full bg-[#5DA9DD] w-[99.2%]" />
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center text-xs">
                          <span className="opacity-60">Contextual Linkage</span>
                          <span className="text-green-400 font-bold">94.8%</span>
                       </div>
                       <div className="h-1 bg-white/10 rounded-full">
                          <div className="h-full bg-green-400 w-[94.8%]" />
                       </div>
                    </div>
                 </div>
              </div>
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Server className="w-32 h-32" />
              </div>
           </div>
        </div>

        {/* Right Column: Sidebar Stats */}
        <div className="space-y-6">
           {/* System Properties */}
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Document Identity</h3>
              <div className="space-y-5">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Hash className="w-4 h-4 text-slate-300" />
                       <span className="text-[11px] font-bold text-slate-500 uppercase">System ID</span>
                    </div>
                    <span className="text-xs font-mono text-slate-900 font-bold bg-slate-50 px-2 py-1 rounded border border-slate-100">DOC-{doc.id.padStart(4, '0')}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Shield className="w-4 h-4 text-slate-300" />
                       <span className="text-[11px] font-bold text-slate-500 uppercase">Data Class</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 uppercase">{doc.type}</span>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <Clock className="w-4 h-4 text-slate-300" />
                       <span className="text-[11px] font-bold text-slate-500 uppercase">Last Sync</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-900 uppercase">{doc.lastAccessed}</span>
                 </div>
              </div>
           </div>

           {/* Event History */}
           <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6">Audit Trail</h3>
              <div className="space-y-6">
                 {doc.history.map((event, i) => (
                    <div key={i} className="flex gap-4 relative">
                       {i !== doc.history.length - 1 && (
                          <div className="absolute left-1.5 top-5 bottom-[-15px] w-px bg-slate-100" />
                       )}
                       <div className={`w-3 h-3 rounded-full mt-1.5 z-10 border-2 border-white shadow-sm ${
                          event.type === 'success' ? 'bg-green-500' : 'bg-[#5DA9DD]'
                       }`} />
                       <div className="flex-1">
                          <p className="text-[11px] font-bold text-slate-800">{event.event}</p>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-[9px] font-bold text-slate-400 uppercase">{event.user}</span>
                             <span className="text-[8px] font-medium text-slate-300 uppercase">{event.time}</span>
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Quick Actions Card */}
           <div className="bg-[#5DA9DD] rounded-xl p-6 text-white shadow-lg shadow-blue-200/50">
              <h4 className="text-sm font-bold mb-2">Need to update this knowledge?</h4>
              <p className="text-[10px] opacity-80 mb-6 leading-relaxed">
                 You can upload a new version or manually correct neural fragments to improve accuracy.
              </p>
              <button className="w-full py-2.5 bg-white text-[#5DA9DD] rounded-lg text-xs font-bold hover:bg-slate-50 transition-all shadow-sm">
                 Upload New Version
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
