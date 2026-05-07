import { useState } from "react";
import {
  Upload,
  FileText,
  ArrowRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  FileSearch,
  Database,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Plus,
  Eye,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const lightBlue = "#5DA9DD";
const deepBlue = "#2D6F9F";

const documents = [
  { 
    id: "1", 
    name: "FH55_Datasheet.pdf", 
    type: "Datasheet", 
    date: "2024-03-20", 
    status: "OCR Complete", 
    qa: "12", 
    products: "FH55, Hall Probe",
    review: "Pending Review"
  },
  { 
    id: "2", 
    name: "HallProbe_EmailConversation.pdf", 
    type: "Email Export", 
    date: "2024-03-19", 
    status: "Q&A Extracted", 
    qa: "45", 
    products: "Custom Probe X",
    review: "Pending Review"
  },
  { 
    id: "3", 
    name: "CalibrationManual_v2.pdf", 
    type: "Manual", 
    date: "2024-03-18", 
    status: "Approved", 
    qa: "89", 
    products: "EZ4 Series",
    review: "Approved"
  },
];

export function KnowledgeUploadScreen() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [supportingText, setSupportingText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);

  const handleSubmit = () => {
    toast.success("Knowledge Package Submitted", {
      description: "Document and technical context have been queued for AI extraction.",
      duration: 5000,
    });
    setSupportingText("");
    setUploadedFiles([]);
  };

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="border-b border-slate-200 pb-8">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Engineering Knowledge Ingestion</h2>
        <p className="text-slate-500 text-sm max-w-3xl leading-relaxed font-medium">
          Upload technical datasheets, manuals, and historical customer conversations. Provide additional context to improve AI extraction accuracy.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: Input & Queue (3 Cols) */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* Simplified Knowledge Input Section */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
             <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <Upload className="w-4 h-4 text-[#2D6F9F]" />
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ingestion Input</h4>
                </div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Magnet-Physik Protocol</span>
             </div>
             
             <div className="p-10 space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                   {/* File Upload Area */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Technical Document</label>
                      <div className="border-2 border-dashed border-slate-100 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/30 group hover:border-[#5DA9DD] transition-all">
                         <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                            <Upload className="w-6 h-6 text-[#2D6F9F]" />
                         </div>
                         <h5 className="text-sm font-bold text-slate-800 mb-2">Select Engineering File</h5>
                         <p className="text-[10px] text-slate-400 mb-8 font-medium uppercase tracking-wider">PDF, DOCX, OR EMAIL EXPORT</p>
                         
                         <input 
                           type="file" 
                           id="file-browse" 
                           className="hidden" 
                           onChange={(e) => {
                             const files = Array.from(e.target.files || []);
                             setUploadedFiles(files.map(f => ({ name: f.name, size: (f.size / 1024 / 1024).toFixed(2) + " MB" })));
                           }}
                         />
                         <label 
                           htmlFor="file-browse"
                           className="px-8 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg cursor-pointer active:scale-95"
                         >
                           Browse Files
                         </label>
                      </div>
                   </div>

                   {/* Supporting Text Area */}
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Supporting Technical Context</label>
                      <div className="relative">
                        <textarea 
                          value={supportingText}
                          onChange={(e) => setSupportingText(e.target.value)}
                          placeholder="Provide additional details about the document, specific products involved, or manual references..."
                          className="w-full h-[230px] bg-slate-50 border border-slate-100 rounded-2xl p-6 text-sm text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all font-medium resize-none leading-relaxed"
                        />
                        <div className="absolute bottom-4 right-4 text-slate-300">
                           <MessageSquare className="w-5 h-5" />
                        </div>
                      </div>
                   </div>
                </div>

                {/* Staged Files Display */}
                {uploadedFiles.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-6 border-t border-slate-100"
                  >
                     <div className="flex items-center gap-3 mb-4">
                        <FileSearch className="w-4 h-4 text-[#5DA9DD]" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staged for Processing</span>
                     </div>
                     <div className="flex flex-wrap gap-4">
                        {uploadedFiles.map((file, i) => (
                          <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl">
                             <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                                <FileText className="w-4 h-4 text-[#2D6F9F]" />
                             </div>
                             <div>
                                <p className="text-xs font-bold text-slate-800">{file.name}</p>
                                <p className="text-[9px] text-slate-400 font-bold uppercase">{file.size}</p>
                             </div>
                             <button onClick={() => setUploadedFiles([])} className="ml-2 p-1 text-slate-300 hover:text-red-500"><AlertCircle className="w-4 h-4" /></button>
                          </div>
                        ))}
                     </div>
                  </motion.div>
                )}

                <div className="pt-4">
                   <button 
                     onClick={handleSubmit}
                     disabled={uploadedFiles.length === 0}
                     className={`w-full py-5 rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-4 ${
                       uploadedFiles.length === 0 
                       ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                       : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
                     }`}
                   >
                      <Sparkles className={`w-5 h-5 ${uploadedFiles.length === 0 ? 'text-slate-200' : 'text-[#5DA9DD]'}`} />
                      Submit Knowledge Package
                   </button>
                </div>
             </div>
          </div>

          {/* Active Document Processing Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
             <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-slate-400" />
                   <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Processing Queue</h4>
                </div>
                <button className="text-[10px] font-bold text-[#2D6F9F] uppercase hover:underline">View All Documents</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-white border-b border-slate-100">
                      <tr>
                         <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">File Name</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Type</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Date</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Q&A</th>
                         <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Review</th>
                         <th className="px-8 py-4 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <tr 
                          key={doc.id} 
                          className={`hover:bg-slate-50 transition-all cursor-pointer group ${selectedDoc === doc.id ? 'bg-blue-50/30' : ''}`}
                          onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                        >
                           <td className="px-8 py-5">
                              <div className="flex items-center gap-3">
                                 <FileText className="w-4.5 h-4.5 text-slate-300 group-hover:text-[#2D6F9F]" />
                                 <span className="text-xs font-bold text-slate-800">{doc.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded uppercase">{doc.type}</span>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">{doc.date}</span>
                           </td>
                           <td className="px-6 py-5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                 <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Approved' ? 'bg-green-500' : 'bg-[#5DA9DD]'}`} />
                                 <span className="text-[10px] font-bold text-slate-600 uppercase">{doc.status}</span>
                              </div>
                           </td>
                           <td className="px-6 py-5 text-center font-mono text-xs font-bold text-slate-900">{doc.qa}</td>
                           <td className="px-6 py-5 text-center">
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                                doc.review === 'Approved' 
                                ? 'text-green-600 bg-green-50 border-green-100' 
                                : 'text-amber-600 bg-amber-50 border-amber-100'
                              }`}>{doc.review}</span>
                           </td>
                           <td className="px-8 py-5 text-right">
                              <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>

          <AnimatePresence>
            {selectedDoc && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md"
              >
                <div className="p-10 space-y-8">
                   <div className="flex items-center justify-between border-b border-slate-100 pb-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                            <Eye className="w-5 h-5" />
                         </div>
                         <div>
                            <h5 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Extraction Preview: FH55_Datasheet.pdf</h5>
                            <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Detected Product: FH55 Teslameter</p>
                         </div>
                      </div>
                      <button onClick={() => setSelectedDoc(null)} className="p-2 hover:bg-slate-50 rounded-lg">
                         <ChevronUp className="w-5 h-5 text-slate-400" />
                      </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                         <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative">
                            <p className="text-[9px] font-bold text-[#2D6F9F] uppercase tracking-widest mb-3">Extracted Customer Question</p>
                            <p className="text-sm font-semibold text-slate-800 leading-relaxed">"What is the maximum operating temperature for the FH55 Hall Probe in a vacuum environment?"</p>
                            <div className="absolute -left-1 top-6 w-1.5 h-10 bg-[#2D6F9F] rounded-full" />
                         </div>
                         <div className="p-6 bg-white rounded-2xl border border-slate-200 relative shadow-sm">
                            <p className="text-[9px] font-bold text-green-600 uppercase tracking-widest mb-3">Extracted Expert Answer</p>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"The FH55 compatible Hall probes are rated for vacuum up to 125°C. For temperatures exceeding this, active cooling or ceramic-housed variants are required."</p>
                            <div className="absolute -left-1 top-6 w-1.5 h-10 bg-green-500 rounded-full" />
                         </div>
                      </div>
                      <div className="space-y-6">
                         <h6 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Engineering Keywords</h6>
                         <div className="flex flex-wrap gap-2">
                            {["Vacuum Compatibility", "Thermal Drift", "Hall Probe", "High Temperature", "FH55 Series", "Flux Mapping"].map(tag => (
                              <span key={tag} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-tighter">{tag}</span>
                            ))}
                         </div>
                         <div className="pt-6">
                            <button className="w-full py-4 bg-[#2D6F9F] text-white rounded-xl text-xs font-bold hover:bg-[#1D5F8F] transition-all shadow-xl uppercase tracking-widest">
                               Approve Extraction Segment
                            </button>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Insights & Governance (1 Col) */}
        <div className="space-y-6">
           <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <Activity className="w-5 h-5" style={{ color: deepBlue }} />
                 <h4 className="text-sm font-bold text-slate-900 tracking-tight">AI Extraction Insights</h4>
              </div>
              
              <div className="space-y-6">
                 {[
                   { label: "Questions Detected", val: "245", trend: "+12" },
                   { label: "Answers Extracted", val: "189", trend: "+5" },
                   { label: "Products Identified", val: "34", trend: "0" },
                   { label: "Pending Reviews", val: "12", trend: "-2", color: "text-amber-500" },
                 ].map((metric, i) => (
                   <div key={i} className="flex justify-between items-end pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                      <div>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{metric.label}</p>
                         <p className={`text-xl font-bold ${metric.color || 'text-slate-900'}`}>{metric.val}</p>
                      </div>
                      <span className="text-[10px] font-bold text-slate-300 uppercase">{metric.trend} Today</span>
                   </div>
                 ))}
              </div>

              <div className="mt-10 space-y-4">
                 <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Technical Categories</h5>
                 <div className="space-y-3">
                    {[
                      { name: "Hall Probes", conf: "High" },
                      { name: "Calibration", conf: "High" },
                      { name: "Magnetization", conf: "Med" },
                      { name: "Flux Measurement", conf: "Review" },
                    ].map(cat => (
                      <div key={cat.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                         <span className="text-xs font-bold text-slate-700">{cat.name}</span>
                         <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-tighter ${
                           cat.conf === 'High' ? 'bg-green-100 text-green-700' :
                           cat.conf === 'Med' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                         }`}>{cat.conf}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                 <ShieldCheck className="w-5 h-5" style={{ color: lightBlue }} />
                 <h4 className="text-sm font-bold tracking-tight">Human Validation</h4>
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed font-medium mb-8">
                 AI extracted knowledge enters the knowledge base only after expert admin review and technical validation.
              </p>
              <div className="space-y-4">
                 {[
                   { label: "AI Suggested", count: 42, color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
                   { label: "Human Verified", count: 1240, color: "bg-green-500/20 text-green-300 border-green-500/30" },
                   { label: "Pending Approval", count: 18, color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
                 ].map(badge => (
                   <div key={badge.label} className={`flex items-center justify-between px-4 py-3 rounded-xl border ${badge.color}`}>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{badge.label}</span>
                      <span className="text-xs font-mono font-bold">{badge.count}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-[#5DA9DD]/10 border border-[#5DA9DD]/20 rounded-2xl">
              <p className="text-[11px] font-bold text-[#2D6F9F] uppercase tracking-widest mb-4">Ingestion Policy</p>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                 All documents must be in original format. OCR processing will occur automatically on scan-based PDFs.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
