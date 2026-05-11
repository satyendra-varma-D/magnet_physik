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
    { label: "Validation Queue Preparation", status: "pending" },
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

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Column: Workflow States (3 Cols) */}
        <div className="xl:col-span-3 space-y-8">
          
          <AnimatePresence mode="wait">
            {workflowState === 'idle' && (
              <motion.div 
                key="idle"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm"
              >
                <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-3">
                      <Upload className="w-4 h-4 text-slate-400" />
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Knowledge Ingestion Input</h4>
                    </div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Engineering Protocol v2.4</span>
                </div>
                
                <div className="p-8 space-y-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      {/* File Upload Area */}
                      <div className="space-y-3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Resource Ingestion Area</label>
                          <div className="border border-slate-200 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-slate-50/20 group hover:border-blue-400 transition-all border-dashed">
                            <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
                                <FileText className="w-5 h-5 text-slate-400" />
                            </div>
                            <h5 className="text-xs font-bold text-slate-700 mb-1 uppercase">Engineering Data Staging</h5>
                            <p className="text-[9px] text-slate-400 mb-6 font-bold uppercase tracking-wider">Datasheets • Manuals • Email Records</p>
                            
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
                              className="px-6 py-2.5 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-widest hover:bg-[#4A98CC] transition-all shadow-md cursor-pointer active:scale-95"
                            >
                              Select Document
                            </label>
                          </div>
                      </div>

                      {/* Supporting Text Area */}
                      <div className="space-y-3">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Additional Technical Notes</label>
                          <div className="relative">
                            <textarea 
                              value={supportingText}
                              onChange={(e) => setSupportingText(e.target.value)}
                              placeholder="Specify product families, material properties, or measurement protocols to focus the extraction..."
                              className="w-full h-[180px] bg-slate-50 border border-slate-200 rounded-lg p-5 text-sm text-slate-800 focus:bg-white focus:border-blue-400 outline-none transition-all font-medium resize-none leading-relaxed"
                            />
                            <div className="absolute bottom-4 right-4 text-slate-300">
                              <MessageSquare className="w-4 h-4" />
                            </div>
                          </div>
                      </div>
                    </div>

                    {/* Staged Files Display */}
                    {uploadedFiles.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="pt-6 border-t border-slate-100"
                      >
                        <div className="flex items-center gap-3 mb-4">
                            <FileSearch className="w-4 h-4 text-[#5DA9DD]" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Staged for Extraction</span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {uploadedFiles.map((file, i) => (
                              <div key={i} className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded shadow-sm">
                                <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center">
                                    <FileText className="w-4 h-4 text-slate-500" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold text-slate-800">{file.name}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">{file.size}</p>
                                </div>
                                <button onClick={() => setUploadedFiles([])} className="ml-2 p-1 text-slate-300 hover:text-red-500"><AlertCircle className="w-3.5 h-3.5" /></button>
                              </div>
                            ))}
                        </div>
                      </motion.div>
                    )}

                    <div className="pt-4 flex justify-end">
                      <button 
                        onClick={handleSubmit}
                        disabled={uploadedFiles.length === 0}
                        className={`px-10 py-3 rounded text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all flex items-center justify-center gap-3 ${
                          uploadedFiles.length === 0 
                          ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-slate-200 shadow-none' 
                          : 'bg-[#5DA9DD] text-white hover:bg-[#4A98CC] active:scale-[0.98]'
                        }`}
                      >
                          <Database className="w-4 h-4" />
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
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xl"
              >
                <div className="px-8 py-6 border-b border-slate-100 bg-[#5DA9DD] text-white flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-500/20 rounded flex items-center justify-center border border-blue-500/30">
                         <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
                      </div>
                      <div>
                         <h4 className="text-xs font-bold uppercase tracking-widest">Extraction Processing State</h4>
                         <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Resource: {uploadedFiles[0]?.name || "Bulk Package"}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-3">
                      <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                      <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Active Processing</span>
                   </div>
                </div>

                <div className="p-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
                   {/* Structured Extraction Pipeline */}
                   <div className="space-y-6">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <ListChecks className="w-4 h-4" /> Extraction Pipeline
                      </h5>
                      <div className="space-y-4">
                         {processingStages.map((stage, i) => {
                            const isComplete = i < processingStep;
                            const isCurrent = i === processingStep;
                            return (
                              <div key={i} className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                                isCurrent ? 'bg-blue-50/50 border-blue-200 shadow-sm' : 
                                isComplete ? 'bg-slate-50/50 border-slate-100 opacity-60' : 
                                'bg-white border-transparent opacity-30'
                              }`}>
                                 <div className={`w-6 h-6 rounded flex items-center justify-center ${
                                   isComplete ? 'bg-green-100 text-green-600' : 
                                   isCurrent ? 'bg-blue-100 text-blue-600' : 
                                   'bg-slate-100 text-slate-400'
                                 }`}>
                                    {isComplete ? <CheckCircle2 className="w-3.5 h-3.5" /> : 
                                     isCurrent ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 
                                     <Clock className="w-3.5 h-3.5" />}
                                 </div>
                                 <span className={`text-[11px] font-bold uppercase tracking-tight ${
                                   isCurrent ? 'text-blue-700' : isComplete ? 'text-slate-500' : 'text-slate-400'
                                 }`}>{stage.label}</span>
                              </div>
                            );
                         })}
                      </div>
                   </div>

                   {/* Live Extraction Summary Metrics */}
                   <div className="bg-slate-50 rounded-xl border border-slate-100 p-8 space-y-8">
                      <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Live Extraction Summary</h5>
                      <div className="grid grid-cols-1 gap-6">
                         {[
                           { label: "Technical Questions Detected", val: processingStep * 4 + (processingStep > 3 ? 8 : 0), icon: MessageSquare },
                           { label: "Engineering Responses Identified", val: processingStep * 3 + (processingStep > 4 ? 6 : 0), icon: CheckCircle2 },
                           { label: "Datasheet References Found", val: processingStep > 2 ? "3" : "0", icon: Database },
                           { label: "Extraction Warnings", val: processingStep > 4 ? "2" : "0", color: "text-amber-500", icon: AlertCircle },
                           { label: "Validation Flags", val: processingStep > 3 ? "1" : "0", color: "text-red-500", icon: ShieldCheck },
                         ].map((m, i) => (
                           <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-100 shadow-sm">
                              <div className="flex items-center gap-3">
                                 <m.icon className={`w-4 h-4 ${m.color || 'text-slate-400'}`} />
                                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                              </div>
                              <span className={`text-lg font-mono font-bold ${m.color || 'text-slate-900'}`}>{m.val}</span>
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
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-2xl"
              >
                <div className="p-16 text-center space-y-10">
                   <div className="w-24 h-24 bg-green-50 rounded-full border-4 border-white shadow-xl flex items-center justify-center mx-auto ring-8 ring-green-50/50">
                      <CheckCircle2 className="w-12 h-12 text-green-500" />
                   </div>
                   
                   <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Extraction Completed</h3>
                      <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">Resource analysis and mapping protocol finalized</p>
                   </div>

                   <div className="max-w-md mx-auto grid grid-cols-3 gap-4 py-8 border-y border-slate-100">
                      <div className="text-center">
                         <p className="text-2xl font-mono font-bold text-slate-900">12</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Extracted Q&A</p>
                      </div>
                      <div className="text-center border-x border-slate-100">
                         <p className="text-2xl font-mono font-bold text-slate-900">3</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Datasheet Refs</p>
                      </div>
                      <div className="text-center">
                         <p className="text-2xl font-mono font-bold text-amber-500">2</p>
                         <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter mt-1">Validation Flags</p>
                      </div>
                   </div>

                   <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button 
                        onClick={() => navigate('/dashboard/extraction-review')}
                        className="px-10 py-4 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-[#4A98CC] transition-all active:scale-95 flex items-center gap-3"
                      >
                         <ShieldCheck className="w-4 h-4 text-blue-100" />
                         Open Validation Queue
                      </button>
                      <button 
                        onClick={() => setSelectedDoc("1")}
                        className="px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all active:scale-95"
                      >
                         Review Extracted Entries
                      </button>
                      <button 
                        onClick={handleReset}
                        className="px-6 py-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-900 transition-colors"
                      >
                         New Upload
                      </button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Active Document Processing Table */}
          <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
             <div className="px-8 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-slate-400" />
                   <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Knowledge Processing Queue</h4>
                </div>
                <button className="text-[10px] font-bold text-[#5DA9DD] uppercase hover:underline">Full Audit Log</button>
             </div>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead className="bg-white border-b border-slate-100">
                      <tr>
                         <th className="px-8 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest">Resource Name</th>
                         <th className="px-6 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Document Type</th>
                         <th className="px-6 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Ingestion Date</th>
                         <th className="px-6 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Extraction Status</th>
                         <th className="px-6 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Segments</th>
                         <th className="px-6 py-3 text-[9px] font-bold text-slate-400 uppercase tracking-widest text-center">Validation</th>
                         <th className="px-8 py-3 text-right"></th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {documents.map((doc) => (
                        <tr 
                           key={doc.id} 
                           className={`hover:bg-slate-50 transition-all cursor-pointer group ${selectedDoc === doc.id ? 'bg-blue-50/30' : ''}`}
                           onClick={() => setSelectedDoc(selectedDoc === doc.id ? null : doc.id)}
                        >
                           <td className="px-8 py-4">
                              <div className="flex items-center gap-3">
                                 <FileText className="w-4 h-4 text-slate-300 group-hover:text-[#5DA9DD]" />
                                 <span className="text-[11px] font-bold text-slate-700">{doc.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className="status-badge bg-slate-100 text-slate-500 border-slate-200">{doc.type}</span>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className="text-[10px] font-bold text-slate-400 uppercase mono-value">{doc.date}</span>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                 <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Approved' ? 'bg-green-500' : 'bg-blue-400'}`} />
                                 <span className="text-[10px] font-bold text-slate-600 uppercase">{doc.status}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-center mono-value text-[11px] font-bold text-slate-900">{doc.qa}</td>
                           <td className="px-6 py-4 text-center">
                              <span className={`status-badge ${
                                doc.review === 'Approved' 
                                ? 'text-green-600 bg-green-50 border-green-100' 
                                : 'text-amber-600 bg-amber-50 border-amber-100'
                              }`}>{doc.review}</span>
                           </td>
                           <td className="px-8 py-4 text-right">
                              <button className="p-1.5 text-slate-300 hover:text-slate-900 transition-colors">
                                 <MoreVertical className="w-3.5 h-3.5" />
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
                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-md"
              >
                <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                       <div className="flex items-center gap-4">
                          <div className="w-9 h-9 bg-[#5DA9DD] rounded flex items-center justify-center text-white shadow-lg">
                             <Eye className="w-4 h-4" />
                          </div>
                          <div>
                             <h5 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest">Extraction Preview: {documents.find(d => d.id === selectedDoc)?.name}</h5>
                             <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5 tracking-tight">System Status: Analysis Protocols Complete</p>
                          </div>
                       </div>
                       <button onClick={() => setSelectedDoc(null)} className="p-2 hover:bg-slate-50 rounded">
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                       </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                       {/* Q&A Content */}
                       <div className="lg:col-span-7 space-y-6">
                          <div className="p-6 bg-slate-50 rounded border border-slate-200 relative group">
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <MessageSquare className="w-3 h-3" /> Extracted Technical Question
                             </p>
                             <p className="text-sm font-bold text-slate-800 leading-relaxed italic">"What is the maximum operating temperature for the FH55 Hall Probe in a vacuum environment?"</p>
                          </div>
                          <div className="p-6 bg-white rounded border border-slate-200 relative shadow-sm group border-l-4 border-l-[#5DA9DD]">
                             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Sparkles className="w-3 h-3 text-[#5DA9DD]" /> System Proposed Answer
                             </p>
                             <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"The FH55 compatible Hall probes are rated for vacuum up to 125°C. For temperatures exceeding this, active cooling or ceramic-housed variants are required."</p>
                          </div>
                       </div>
                       
                       {/* Metadata & Classifiers */}
                       <div className="lg:col-span-5 space-y-6">
                          <div className="space-y-4">
                             <h6 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Technical Classifiers</h6>
                             <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                <div>
                                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter mb-2">Product Mentions</p>
                                   <div className="flex flex-wrap gap-1.5">
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">FH55 Series</span>
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">Hall Probe</span>
                                   </div>
                                </div>
                                <div>
                                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter mb-2">Material Context</p>
                                   <div className="flex flex-wrap gap-1.5">
                                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] font-bold rounded">Ceramic Housing</span>
                                   </div>
                                </div>
                                <div className="col-span-2">
                                   <p className="text-[8px] font-bold text-slate-300 uppercase tracking-tighter mb-2">Engineering Workflow</p>
                                   <div className="flex flex-wrap gap-1.5">
                                      <span className="px-2 py-0.5 bg-[#5DA9DD]/10 text-[#5DA9DD] text-[9px] font-bold rounded uppercase">Active Cooling Protocol</span>
                                      <span className="px-2 py-0.5 bg-[#5DA9DD]/10 text-[#5DA9DD] text-[9px] font-bold rounded uppercase">Vacuum Calibration</span>
                                   </div>
                                </div>
                             </div>
                          </div>
                          
                          <div className="pt-4">
                             <button 
                               onClick={() => navigate('/dashboard/review')}
                               className="w-full py-3 bg-[#5DA9DD] text-white rounded text-[10px] font-bold hover:bg-[#4A98CC] transition-all shadow-lg uppercase tracking-[0.2em] flex items-center justify-center gap-2"
                             >
                                <ArrowRight className="w-4 h-4" /> Proceed to Governance Review
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
                 <div className="w-8 h-8 bg-slate-50 border border-slate-100 rounded flex items-center justify-center">
                    <Activity className="w-4 h-4 text-slate-400" />
                 </div>
                 <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Extraction Queue Summary</h4>
              </div>
              
              <div className="space-y-5">
                 {[
                   { label: "Documents Uploaded", val: "142", icon: FileText },
                   { label: "Datasheets Uploaded", val: "84", icon: Database },
                   { label: "Email Records Uploaded", val: "58", icon: Mail },
                   { label: "Pending Review Queue", val: "12", valColor: "text-amber-500" },
                   { label: "Approved Knowledge", val: "986", valColor: "text-green-600" },
                   { label: "Rejected Entries", val: "04", valColor: "text-red-500" },
                   { label: "Awaiting Extraction", val: "03" },
                 ].map((metric, i) => (
                   <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0 last:pb-0">
                      <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
                      <p className={`text-xs font-bold font-mono ${metric.valColor || 'text-slate-900'}`}>{metric.val}</p>
                   </div>
                 ))}
              </div>

              <div className="mt-10 pt-6 border-t border-slate-50 space-y-4">
                 <div>
                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-3">Last Processed Resource</p>
                    <div className="p-3 bg-slate-50 rounded border border-slate-100 flex items-center justify-between">
                       <span className="text-[10px] font-bold text-slate-600 truncate max-w-[140px]">FH55_Specs_V2.pdf</span>
                       <CheckCircle2 className="w-3 h-3 text-green-500" />
                    </div>
                 </div>
                 <div>
                    <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-3">Extraction Failures</p>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase">None Detected</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="bg-[#5DA9DD] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                 <ShieldCheck className="w-5 h-5 text-blue-400" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest">Human Governance</h4>
              </div>
              <p className="text-[11px] opacity-60 leading-relaxed font-medium mb-8 relative z-10">
                 Validated intelligence is synchronized to the knowledge base only after expert engineering audit.
              </p>
              <div className="space-y-3 relative z-10">
                 {[
                   { label: "Pending Audit", count: 12, color: "text-amber-400" },
                   { label: "Approved (KB)", count: 986, color: "text-green-400" },
                 ].map(item => (
                   <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0">
                      <span className="text-[9px] font-bold uppercase tracking-widest opacity-50">{item.label}</span>
                      <span className={`text-[11px] font-mono font-bold ${item.color}`}>{item.count}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                 <Clock className="w-3.5 h-3.5 text-[#5DA9DD]" />
                 <p className="text-[9px] font-bold text-[#5DA9DD] uppercase tracking-widest">Audit Protocol</p>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                 "All processed records are stored for measurement traceability and engineering compliance."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
