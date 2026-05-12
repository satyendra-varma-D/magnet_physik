import {
   Zap,
   FileText,
   ShieldCheck,
   RefreshCw,
   Terminal,
   Database,
   Search,
   BookOpen,
   Clipboard,
   Edit3,
   UploadCloud,
   FileSearch,
   History,
   CheckCircle2,
   Plus,
   ArrowRight,
   LayoutList,
   Clock,
   User,
   MessageSquare,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const mockQueries = [
  { id: "CQ-7712", customer: "TechCorp GmbH", product: "FH 55 Fluxmeter", date: "2024-05-12", status: "Drafting", priority: "High" },
  { id: "CQ-7711", customer: "Magnetics UK Ltd", product: "MP-740 Calibration", date: "2024-05-11", status: "Validated", priority: "Medium" },
  { id: "CQ-7710", customer: "Sensor Solutions", product: "EZ4 Series", date: "2024-05-10", status: "Sent", priority: "Low" },
  { id: "CQ-7709", customer: "Precision Mag", product: "FH 55 Fluxmeter", date: "2024-05-09", status: "Archived", priority: "Medium" },
];

export function QueryAssistantScreen() {
   const [view, setView] = useState<'list' | 'create'>('list');
   const [query, setQuery] = useState("");
   const [isGenerating, setIsGenerating] = useState(false);
   const [suggestedResponse, setSuggestedResponse] = useState("");
   const [showResult, setShowResult] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([]);

   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
     const files = Array.from(e.target.files || []);
     const newFiles = files.map(f => ({ 
       name: f.name, 
       size: (f.size / 1024 / 1024).toFixed(2) + " MB" 
     }));
     setUploadedFiles(prev => [...prev, ...newFiles]);
     toast.success(`${newFiles.length} file(s) staged for context analysis`);
   };

   const handleGenerate = () => {
      setIsGenerating(true);
      setTimeout(() => {
         setSuggestedResponse(`ENGINEERING RESPONSE RECOMMENDATION\n\nReference Code: MP-R-2024-0511\nProduct Group: FH Series Fluxmeters\n\nTECHNICAL DRAFT:\n\nRegarding the customer inquiry about sensor drift in the FH 55 series fluxmeter at elevated operating temperatures (>35°C):\n\n1. OPERATIONAL PARAMETERS:\nThe FH 55 fluxmeter is calibrated for standard laboratory conditions (20°C - 25°C). For applications in high-temperature environments, a thermal compensation factor of 0.02%/K must be configured in the system firmware.\n\n2. CORRECTIVE ACTION:\nInstruct the customer to navigate to 'Sensor Configuration' -> 'Compensation Matrix' and update the T-Coefficient to 0.0002. This adjustment will normalize the flux readings across the 35°C - 50°C range.\n\n3. VERIFICATION:\nRecommend a post-configuration verification using the MP-740 Reference Standard to ensure measurement traceability.\n\n[DRAFT END]`);
         setIsGenerating(false);
         setShowResult(true);
         setIsEditing(false);
      }, 1800);
   };

   const handleCopy = () => {
      navigator.clipboard.writeText(suggestedResponse);
      toast.success("Response copied to clipboard");
   };

   return (
      <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700 pb-10">
         {/* Header Section */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-200 pb-8">
            <div className="space-y-1">
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Customer Queries</h2>
               <p className="text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
                 Engineering intelligence station for processing technical inquiries and generating validated customer responses.
               </p>
            </div>
            
            <div className="flex items-center gap-3">
               {view === 'list' ? (
                 <button 
                   onClick={() => setView('create')}
                   className="px-6 py-3 bg-[#5DA9DD] text-white rounded-xl text-[11px] font-bold uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:bg-[#4A98CC] hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2"
                 >
                   <Plus className="w-4 h-4" />
                   Add New Inquiry
                 </button>
               ) : (
                 <button 
                   onClick={() => setView('list')}
                   className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-[11px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2"
                 >
                   <LayoutList className="w-4 h-4" />
                   Back to Listing
                 </button>
               )}
            </div>
         </div>

         <AnimatePresence mode="wait">
           {view === 'list' ? (
             <motion.div 
               key="list"
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               className="space-y-6"
             >
                {/* Search & Stats Bar */}
                <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <div className="relative w-96">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Filter by ID or Product..." 
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2 text-[11px] font-medium focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                      />
                   </div>
                   <div className="flex items-center gap-6 px-6">
                      <div className="text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Active Drafts</p>
                         <p className="text-lg font-bold text-slate-900 leading-none mt-1">08</p>
                      </div>
                      <div className="w-px h-8 bg-slate-200" />
                      <div className="text-center">
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Sent Today</p>
                         <p className="text-lg font-bold text-slate-900 leading-none mt-1">24</p>
                      </div>
                   </div>
                </div>

                {/* Listing Table */}
                <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                   <table className="w-full text-left border-collapse">
                      <thead>
                         <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol ID</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Product Reference</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                            <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                         {mockQueries.map((item) => (
                            <tr key={item.id} className="hover:bg-blue-50/20 transition-colors group">
                               <td className="px-6 py-5">
                                  <span className="text-[11px] font-mono font-bold text-[#5DA9DD]">{item.id}</span>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                     <Database className="w-3.5 h-3.5 text-slate-300" />
                                     <span className="text-[11px] font-bold text-slate-600">{item.product}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-2">
                                     <Clock className="w-3.5 h-3.5 text-slate-300" />
                                     <span className="text-[11px] font-bold text-slate-500 uppercase">{item.date}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5">
                                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border ${
                                    item.status === 'Drafting' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                    item.status === 'Validated' ? 'bg-green-50 text-green-600 border-green-100' :
                                    item.status === 'Sent' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                    'bg-slate-50 text-slate-500 border-slate-100'
                                  }`}>
                                     {item.status}
                                  </span>
                               </td>
                               <td className="px-6 py-5 text-right">
                                  <button 
                                    onClick={() => setView('create')}
                                    className="p-2 text-slate-300 hover:text-[#5DA9DD] hover:bg-white rounded-lg transition-all group-hover:shadow-sm"
                                  >
                                     <ArrowRight className="w-4 h-4" />
                                  </button>
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </motion.div>
           ) : (
             <motion.div 
               key="create"
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -20 }}
               className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 min-h-[600px]"
             >
                {/* LEFT SIDE: Engineering Input Protocol */}
                <div className="flex flex-col bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                   <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                            <Terminal className="w-4 h-4 text-[#5DA9DD]" />
                         </div>
                         <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Ingestion Protocol</h3>
                      </div>
                      <div className="px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                        <span className="text-[9px] font-bold text-[#5DA9DD] uppercase tracking-widest">Input Layer: V4.1</span>
                      </div>
                   </div>

                   <div className="flex-1 p-10 flex flex-col space-y-10 overflow-y-auto premium-scrollbar">
                      <div className="flex-1 flex flex-col space-y-4">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <MessageSquare className="w-3.5 h-3.5" /> Primary Technical Query
                         </label>
                         <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Paste customer engineering inquiry or specific measurement requirement..."
                            className="flex-1 w-full p-8 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none leading-relaxed shadow-inner"
                         />
                      </div>

                      <div className="space-y-5">
                         <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <UploadCloud className="w-3.5 h-3.5" /> Supporting Technical Evidence
                         </label>
                         <div className="grid grid-cols-2 gap-6">
                            <input type="file" id="email-upload" className="hidden" multiple onChange={handleFileUpload} />
                            <label htmlFor="email-upload" className="border-2 border-dashed border-slate-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-blue-50/30 hover:border-[#5DA9DD] transition-all cursor-pointer group bg-slate-50/30">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
                                  <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-[#5DA9DD]" />
                               </div>
                               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#5DA9DD]">Upload Email</span>
                            </label>

                            <input type="file" id="schematic-upload" className="hidden" multiple onChange={handleFileUpload} />
                            <label htmlFor="schematic-upload" className="border-2 border-dashed border-slate-100 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-blue-50/30 hover:border-[#5DA9DD] transition-all cursor-pointer group bg-slate-50/30">
                               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform mb-4">
                                  <FileSearch className="w-6 h-6 text-slate-300 group-hover:text-[#5DA9DD]" />
                               </div>
                               <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#5DA9DD]">Schematics</span>
                            </label>
                         </div>

                         {uploadedFiles.length > 0 && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-6 border-t border-slate-100">
                               <div className="flex items-center gap-2 mb-4">
                                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Staged Resources ({uploadedFiles.length})</span>
                               </div>
                               <div className="grid grid-cols-1 gap-3">
                                  {uploadedFiles.map((file, i) => (
                                     <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-[#5DA9DD] transition-colors">
                                        <div className="flex items-center gap-3">
                                           <FileText className="w-4 h-4 text-[#5DA9DD]" />
                                           <div className="flex flex-col">
                                              <span className="text-[11px] font-bold text-slate-700">{file.name}</span>
                                              <span className="text-[9px] text-slate-400 font-bold uppercase">{file.size}</span>
                                           </div>
                                        </div>
                                        <button onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="p-2 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                                           <History className="w-4 h-4" />
                                        </button>
                                     </div>
                                  ))}
                               </div>
                            </motion.div>
                         )}
                      </div>
                   </div>

                   <div className="p-10 border-t border-slate-100 bg-slate-50/50">
                      <button
                         onClick={handleGenerate}
                         disabled={!query || isGenerating}
                         className="w-full py-5 bg-[#5DA9DD] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 hover:bg-[#4A98CC] flex items-center justify-center gap-4 transition-all disabled:opacity-50 active:scale-[0.98]"
                      >
                         {isGenerating ? (
                            <>
                               <RefreshCw className="w-5 h-5 animate-spin text-blue-100" />
                               Consulting Knowledge Base...
                            </>
                         ) : (
                            <>
                               <Zap className="w-5 h-5" />
                               Generate recommendation
                            </>
                         )}
                      </button>
                   </div>
                </div>

                {/* RIGHT SIDE: Technical Response Recommendation */}
                <div className="flex flex-col bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden relative">
                   <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#5DA9DD]" />
                         </div>
                         <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Proposed Response Draft</h3>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
                         <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                         <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest">Validated Accuracy</span>
                      </div>
                   </div>

                   <div className="flex-1 p-10 overflow-y-auto premium-scrollbar flex flex-col">
                      {showResult ? (
                         <div className="space-y-10 animate-in slide-in-from-right-4 duration-700 pb-10">
                            <div className="relative group">
                               <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <span className="px-3 py-1 bg-blue-50 text-[#5DA9DD] border border-blue-100 rounded-full text-[9px] font-bold uppercase">Technical Draft v1.0</span>
                               </div>
                               <textarea
                                  value={suggestedResponse}
                                  readOnly={!isEditing}
                                  onChange={(e) => setSuggestedResponse(e.target.value)}
                                  className={`w-full p-10 border rounded-2xl text-sm font-medium leading-relaxed outline-none transition-all resize-none shadow-sm ${isEditing ? 'bg-white border-[#5DA9DD] text-slate-900 ring-8 ring-blue-50/50' : 'bg-slate-50 border-slate-100 text-slate-600 italic'
                                     }`}
                                  rows={15}
                               />
                            </div>

                            <div className="space-y-8 pt-8 border-t border-slate-100">
                               <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                  <Database className="w-4 h-4 text-[#5DA9DD]" /> Traceability Base
                               </h4>

                               <div className="grid grid-cols-2 gap-6">
                                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#5DA9DD]/30 transition-all hover:bg-white hover:shadow-sm">
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Primary Source</p>
                                     <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-700">FH_55_Specs.pdf</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-[#5DA9DD] translate-x-0 group-hover:translate-x-1 transition-transform" />
                                     </div>
                                  </div>
                                  <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#5DA9DD]/30 transition-all hover:bg-white hover:shadow-sm">
                                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">Validation Ref</p>
                                     <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold text-slate-700">KB-001: Thermal Drift</span>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                     </div>
                                  </div>
                               </div>

                               <div className="p-6 bg-blue-50/30 border border-blue-100 rounded-2xl relative overflow-hidden">
                                  <div className="relative z-10">
                                    <p className="text-[10px] font-bold text-[#5DA9DD] uppercase tracking-widest mb-3">Engineering Insight Applied</p>
                                    <p className="text-[11px] text-slate-600 leading-relaxed italic">
                                       Cross-referenced with MP-DRIVE-24 calibration baseline. Thermal drift coefficients verified against ISO-17025 secondary standards for sensor range 35-50°C.
                                    </p>
                                  </div>
                                  <Database className="absolute -bottom-4 -right-4 w-24 h-24 text-blue-500/5 rotate-12" />
                               </div>
                            </div>
                         </div>
                      ) : (
                         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-700">
                               <FileSearch className="w-12 h-12 text-slate-200" />
                            </div>
                            <div className="space-y-3">
                               <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Drafting Area Idle</h4>
                               <p className="text-[11px] text-slate-300 font-bold uppercase tracking-tight max-w-[280px] leading-relaxed">
                                  Submit a technical inquiry on the left to activate the AI-assisted response drafting protocol.
                               </p>
                            </div>
                         </div>
                      )}
                   </div>

                   {showResult && (
                      <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center gap-6">
                         <button
                            onClick={() => setIsEditing(!isEditing)}
                            className={`flex-1 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isEditing ? 'bg-[#5DA9DD] text-white shadow-xl hover:bg-[#4A98CC]' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                               }`}
                         >
                            <Edit3 className="w-4 h-4" />
                            {isEditing ? "Save Draft" : "Manual Edit"}
                         </button>
                         <button
                            onClick={handleCopy}
                            className="flex-1 py-5 bg-[#5DA9DD] text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#4A98CC] transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3 active:scale-95"
                         >
                            <Clipboard className="w-4 h-4" />
                            Copy Response
                         </button>
                      </div>
                   )}
                </div>
             </motion.div>
           )}
         </AnimatePresence>

         {/* Footer Info */}
         <div className="flex items-center justify-between px-4 py-8 border-t border-slate-100 mt-auto">
            <div className="flex items-center gap-10">
               <div className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                  <Database className="w-4 h-4 text-slate-300" /> Intelligence Pool: 1.2k Segments
               </div>
               <div className="flex items-center gap-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em]">
                  <ShieldCheck className="w-4 h-4 text-green-500/40" /> Integrity Status: Verified
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] italic">Station: MP-DRIVE-24 • Engine V1.4</p>
         </div>
      </div>
   );
}
