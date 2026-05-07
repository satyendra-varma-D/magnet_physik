import {
  FileText,
  Search,
  Filter,
  MoreVertical,
  Download,
  Trash2,
  ExternalLink,
  Layers,
  Database,
  Shield,
  FileCode,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const documents = [
  { id: "1", name: "EZ4-Series Technical Manual", type: "Manuals", size: "12.4 MB", date: "2024-03-15", confidence: 98 },
  { id: "2", name: "Hall Effect Sensor Specs v2", type: "Data Sheets", size: "1.2 MB", date: "2024-03-12", confidence: 95 },
  { id: "3", name: "Calibration Log: Unit #4521", type: "Logs", size: "450 KB", date: "2024-03-10", confidence: 92 },
  { id: "4", name: "Magnetic Shielding Guidelines", type: "Internal Documentation", size: "2.8 MB", date: "2024-03-08", confidence: 99 },
  { id: "5", name: "Fluxgate Magnetometer Overview", type: "Data Sheets", size: "5.1 MB", date: "2024-03-05", confidence: 96 },
  { id: "6", name: "System Maintenance Schedule 2024", type: "Internal Documentation", size: "850 KB", date: "2024-03-01", confidence: 94 },
];

const categories = [
  { name: "Manuals", count: 142, icon: FileText },
  { name: "Data Sheets", count: 89, icon: FileCode },
  { name: "Logs", count: 567, icon: Layers },
  { name: "Internal", count: 34, icon: Shield },
];

export function KnowledgeBaseScreen() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Knowledge Base</h2>
          <p className="text-sm text-slate-500">Explore and manage the indexed engineering knowledge system.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-1 focus:ring-slate-200 w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-all text-xs font-semibold text-slate-600">
            <Filter className="w-3.5 h-3.5" />
            Filter
          </button>
          <button 
            onClick={() => navigate("/dashboard/upload")}
            className="flex items-center gap-2 px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all text-xs font-bold shadow-lg"
          >
            <Plus className="w-4 h-4" />
            Add Knowledge
          </button>
        </div>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-sm transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                <cat.icon className="w-4.5 h-4.5 text-slate-400 group-hover:text-[#009EE3] transition-colors" />
              </div>
              <span className="text-xl font-bold text-slate-900">{cat.count}</span>
            </div>
            <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{cat.name}</h4>
          </motion.div>
        ))}
      </div>

      {/* Document Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Document</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Confidence</th>
                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc, i) => (
                <motion.tr 
                  key={doc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => navigate(`/dashboard/knowledge-base/${doc.id}`)}
                  className="group hover:bg-slate-50/50 transition-colors cursor-pointer"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-[#009EE3]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-none">{doc.name}</p>
                        <p className="text-[10px] text-slate-400 mt-1.5">{doc.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">{doc.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                       <div className="w-20 h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                          <div className="h-full bg-[#009EE3]" style={{ width: `${doc.confidence}%` }} />
                       </div>
                       <span className="text-[10px] font-bold text-slate-700">{doc.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">{doc.date}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <button className="p-2 text-slate-300 hover:text-[#009EE3] hover:bg-white rounded-md transition-all"><Download className="w-4 h-4" /></button>
                       <button className="p-2 text-slate-300 hover:text-red-500 hover:bg-white rounded-md transition-all"><Trash2 className="w-4 h-4" /></button>
                       <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-white rounded-md transition-all"><MoreVertical className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
