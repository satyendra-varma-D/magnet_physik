import { useState, useEffect } from "react";
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
  Mail,
  Loader2,
  Search,
  ListChecks,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router";

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

type WorkflowState = 'idle' | 'processing' | 'completed';

export function KnowledgeUploadScreen() {
  const navigate = useNavigate();
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [supportingText, setSupportingText] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<{name: string, size: string}[]>([]);
  const [workflowState, setWorkflowState] = useState<WorkflowState>('idle');
  const [processingStep, setProcessingStep] = useState(0);

  const processingStages = [
    { label: "File Upload Complete", status: "complete" },
    { label: "OCR & Text Parsing", status: "complete" },
    { label: "Engineering Context Detection", status: "complete" },
    { label: "Q&A Intelligence Extraction", status: "current" },
    { label: "Datasheet Reference Mapping", status: "pending" },
    { label: "Final Intelligence Indexing", status: "pending" },
  ];

  const handleSubmit = () => {
    setWorkflowState('processing');
    setProcessingStep(0);
    
    // Simulate progression
    const timer = setInterval(() => {
      setProcessingStep(prev => {
        if (prev >= 5) {
          clearInterval(timer);
          setTimeout(() => setWorkflowState('completed'), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);
  };

  const handleReset = () => {
    setWorkflowState('idle');
    setSupportingText("");
    setUploadedFiles([]);
    setProcessingStep(0);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="border-b border-slate-200 pb-8 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Technical Knowledge Ingestion</h2>
          <p className="text-slate-500 text-sm max-w-3xl leading-relaxed font-medium">
            Upload technical datasheets, component manuals, and historical engineering conversations for technical extraction and validation.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded border border-slate-200">
           <Database className="w-4 h-4 text-slate-400" />
           <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Station: MP-DRIVE-24</span>
        </div>
      </div>

      {/* Main Layout - Expanded for better space utilization */}
      <div className="max-w-[1400px] mx-auto w-full">
        
        <div className="space-y-8">
          
          <AnimatePresence mode="wait">
            {workflowState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                        <Upload className="w-4 h-4 text-[#5DA9DD]" />
                      </div>
                      <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-widest">Knowledge Ingestion Input</h4>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Protocol v2.4</span>
                    </div>
                </div>
                
                <div className="p-10 space-y-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* File Upload Area */}
                      <div className="space-y-4">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Plus className="w-3.5 h-3.5" /> Resource Ingestion Area
                          </label>
                          <div className="border-2 border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-slate-50/10 group hover:border-[#5DA9DD] hover:bg-blue-50/10 transition-all border-dashed relative cursor-pointer">
                            <input 
                              type="file" 
                              id="file-browse" 
                              className="absolute inset-0 opacity-0 cursor-pointer" 
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                setUploadedFiles(files.map(f => ({ name: f.name, size: (f.size / 1024 / 1024).toFixed(2) + " MB" })));
                              }}
                            />
                            <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                <FileText className="w-7 h-7 text-slate-400 group-hover:text-[#5DA9DD] transition-colors" />
                            </div>
                            <h5 className="text-sm font-bold text-slate-800 mb-2 uppercase tracking-tight">Engineering Data Staging</h5>
                            <p className="text-[10px] text-slate-400 mb-8 font-bold uppercase tracking-wider">Drag & drop or browse technical files</p>
                            
                            <div className="px-8 py-3 bg-[#5DA9DD] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest group-hover:bg-[#4A98CC] transition-all shadow-md active:scale-95">
                              Select Document
                            </div>
                          </div>
                      </div>

                      {/* Supporting Text Area */}
                      <div className="space-y-4">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Sparkles className="w-3.5 h-3.5" /> Additional Technical Notes
                          </label>
                          <div className="relative h-full">
                            <textarea 
                              value={supportingText}
                              onChange={(e) => setSupportingText(e.target.value)}
                              placeholder="Specify product families, material properties, or measurement protocols to focus the extraction..."
                              className="w-full h-[240px] bg-slate-50 border border-slate-200 rounded-2xl p-6 text-sm text-slate-800 focus:bg-white focus:border-[#5DA9DD] focus:ring-4 focus:ring-blue-50 outline-none transition-all font-medium resize-none leading-relaxed shadow-inner"
                            />
                            <div className="absolute bottom-5 right-5 text-slate-300">
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
                        className="p-6 bg-blue-50/30 border border-blue-100 rounded-2xl"
                      >
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                              <FileSearch className="w-3.5 h-3.5 text-[#5DA9DD]" />
                            </div>
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Staged for Extraction ({uploadedFiles.length})</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {uploadedFiles.map((file, i) => (
                              <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-[#5DA9DD] transition-colors group">
                                <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-slate-400 group-hover:text-[#5DA9DD] transition-colors" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-slate-800">{file.name}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{file.size}</p>
                                </div>
                                <button onClick={() => setUploadedFiles([])} className="ml-2 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"><AlertCircle className="w-4 h-4" /></button>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-6 flex justify-center">
                      <button 
                        onClick={handleSubmit}
                        disabled={uploadedFiles.length === 0}
                        className={`px-16 py-4 rounded-xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-4 group ${
                          uploadedFiles.length === 0 
                          ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200 shadow-none' 
                          : 'bg-[#5DA9DD] text-white hover:bg-[#4A98CC] hover:shadow-[#5DA9DD]/20 hover:-translate-y-0.5 active:scale-[0.98]'
                        }`}
                      >
                          <Activity className={`w-5 h-5 ${uploadedFiles.length > 0 ? 'group-hover:animate-spin' : ''}`} />
                          Process Knowledge Package
                      </button>
                    </div>
                </div>
              </motion.div>
            )}

            {workflowState === 'processing' && (
              <motion.div 
                key="processing"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl"
              >
                <div className="px-10 py-8 border-b border-slate-100 bg-[#5DA9DD] text-white flex items-center justify-between">
                   <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
                         <Activity className="w-7 h-7 text-white animate-pulse" />
                      </div>
                      <div>
                         <h4 className="text-sm font-bold uppercase tracking-[0.2em]">Extraction Processing</h4>
                         <p className="text-[10px] text-blue-100 font-bold uppercase mt-1.5 opacity-80">Resource: {uploadedFiles[0]?.name || "Bulk Package"}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 px-5 py-2 bg-white/10 rounded-full border border-white/20">
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">Active Analysis</span>
                   </div>
                </div>

                <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                   {/* Structured Extraction Pipeline */}
                   <div className="space-y-8">
                      <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-3">
                         <ListChecks className="w-5 h-5 text-[#5DA9DD]" /> Extraction Pipeline Progress
                      </h5>
                      <div className="space-y-5">
                         {processingStages.map((stage, i) => {
                            const isComplete = i < processingStep;
                            const isCurrent = i === processingStep;
                            return (
                              <div key={i} className={`flex items-center gap-5 p-5 rounded-2xl border transition-all duration-500 ${
                                isCurrent ? 'bg-blue-50 border-[#5DA9DD] shadow-lg shadow-blue-500/5 translate-x-2' : 
                                isComplete ? 'bg-slate-50 border-slate-100 opacity-60' : 
                                'bg-white border-transparent opacity-30'
                              }`}>
                                 <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-500 ${
                                   isComplete ? 'bg-green-100 text-green-600' : 
                                   isCurrent ? 'bg-[#5DA9DD] text-white' : 
                                   'bg-slate-100 text-slate-400'
                                 }`}>
                                    {isComplete ? <CheckCircle2 className="w-4 h-4" /> : 
                                     isCurrent ? <Loader2 className="w-4 h-4 animate-spin" /> : 
                                     <Clock className="w-4 h-4" />}
                                 </div>
                                 <span className={`text-xs font-bold uppercase tracking-wide ${
                                   isCurrent ? 'text-slate-900' : isComplete ? 'text-slate-500' : 'text-slate-400'
                                 }`}>{stage.label}</span>
                              </div>
                            );
                         })}
                      </div>
                   </div>

                   {/* Live Extraction Summary Metrics */}
                   <div className="bg-slate-50 rounded-3xl border border-slate-100 p-10 space-y-10">
                      <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Live Insights Dashboard</h5>
                      <div className="grid grid-cols-1 gap-5">
                         {[
                            { label: "Technical Questions Detected", val: processingStep * 4 + (processingStep > 3 ? 8 : 0), icon: MessageSquare },
                            { label: "Engineering Responses Identified", val: processingStep * 3 + (processingStep > 4 ? 6 : 0), icon: CheckCircle2 },
                            { label: "Reference Mapping (Datasheet/Email)", val: processingStep > 2 ? (uploadedFiles[0]?.name.toLowerCase().includes('email') ? "Email Thread" : "Datasheet") : "Scanning...", icon: Database },
                            { label: "Potential Extraction Warnings", val: processingStep > 4 ? "2" : "0", color: "text-amber-500", icon: AlertCircle },
                            { label: "System Integrity Status", val: processingStep > 3 ? "Optimal" : "Checking", color: "text-green-500", icon: ShieldCheck },
                         ].map((m, i) => (
                           <div key={i} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 group-hover:bg-blue-50 transition-colors`}>
                                    <m.icon className={`w-5 h-5 ${m.color || 'text-slate-400 group-hover:text-[#5DA9DD]'}`} />
                                 </div>
                                 <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                              </div>
                              <span className={`text-2xl font-mono font-bold ${m.color || 'text-slate-900'}`}>{m.val}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {workflowState === 'completed' && (
              <motion.div 
                key="completed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                 {/* Search & Ingestion Stats Bar - Exactly matching Customer Queries */}
                 <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="relative w-96">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         type="text" 
                         placeholder="Filter technical extracts..." 
                         className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-[11px] font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                       />
                    </div>
                    <div className="flex items-center gap-6 px-6">
                       <div className="text-center">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Extracts</p>
                          <p className="text-lg font-bold text-slate-900 leading-none mt-1">12</p>
                       </div>
                       <div className="w-px h-8 bg-slate-200" />
                       <div className="text-center">
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Confidence Avg</p>
                          <p className="text-lg font-bold text-[#5DA9DD] leading-none mt-1">98%</p>
                       </div>
                    </div>
                 </div>

                 {/* High-Fidelity Listing Table - Exactly matching Customer Queries */}
                 <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left border-collapse table-fixed">
                       <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                             <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-24">S.No</th>
                             <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">Technical Question</th>
                             <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Extracted Answer</th>
                             <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-24 text-right">Action</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-50">
                          {[
                            {
                              id: "01",
                              q: "What is the maximum operating temperature for the FH55 sensor?",
                              a: "The FH55 sensor is rated for a maximum operating temperature of 125°C. Beyond this point, thermal compensation accuracy decreases significantly.",
                            },
                            {
                              id: "02",
                              q: "Does the sensor require recalibration after a high-voltage surge?",
                              a: "Yes, any voltage surge exceeding 150% of the nominal rating requires a full recalibration against a primary standard to ensure traceability.",
                            },
                            {
                              id: "03",
                              q: "Can the EZ4 series be used in vacuum environments?",
                              a: "The EZ4 series fluxmeters are compatible with vacuums up to 10^-6 mbar. For higher vacuum requirements, special outgassing-prepared sensors are available.",
                            }
                          ].map((qa, i) => (
                            <tr key={i} className="hover:bg-blue-50/20 transition-colors group">
                               <td className="px-6 py-5">
                                  <span className="text-[11px] font-mono font-bold text-[#5DA9DD]">{qa.id}</span>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                     <Sparkles className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#5DA9DD] transition-colors" />
                                     <span className="text-[11px] font-bold text-slate-600 line-clamp-2">{qa.q}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                     <FileSearch className="w-3.5 h-3.5 text-slate-300 group-hover:text-[#5DA9DD] transition-colors" />
                                     <span className="text-[11px] font-medium text-slate-500 line-clamp-2">{qa.a}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5 text-right">
                                  <button className="p-2 text-slate-300 hover:text-[#5DA9DD] hover:bg-white rounded-lg transition-all group-hover:shadow-sm">
                                     <ArrowRight className="w-4 h-4" />
                                  </button>
                               </td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 {/* Industrial Footer Detail Bar - Exactly matching Customer Queries */}
                 <div className="flex items-center justify-between px-4 pt-4 border-t border-slate-50">
                    <div className="flex items-center gap-8">
                       <div className="flex items-center gap-3">
                          <Database className="w-3.5 h-3.5 text-slate-300" />
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Intelligence Pool: 1.2k Segments</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Integrity Status: Verified</span>
                       </div>
                    </div>
                    <div className="text-[9px] font-bold text-slate-300 uppercase tracking-[0.2em]">
                       Station: MP-DRIVE-24 • Engine V1.4
                    </div>
                 </div>

                 <div className="flex items-center justify-center gap-6 pt-12">
                    <button 
                      onClick={() => navigate('/dashboard/knowledge-base')}
                      className="px-10 py-4 bg-[#5DA9DD] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-[#4A98CC] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-3"
                    >
                       <Database className="w-4 h-4" />
                       View Knowledge Base
                    </button>
                    <button 
                      onClick={handleReset}
                      className="px-8 py-4 bg-white border border-slate-200 text-slate-500 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-3"
                    >
                       <Plus className="w-4 h-4" />
                       New Upload Ingestion
                    </button>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
