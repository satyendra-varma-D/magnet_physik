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
   FileCode,
   ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function QueryAssistantScreen() {
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
      <div className="h-full flex flex-col gap-6 animate-in fade-in duration-700">
         {/* Header */}
         <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="space-y-1">
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Engineering Response Workspace</h2>
               <p className="text-sm text-slate-500 font-medium">Technical drafting station for generating validated customer responses from approved engineering resources.</p>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded">
                  <ShieldCheck className="w-4 h-4 text-[#5DA9DD]" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Approved Knowledge Base: Online</span>
               </div>
            </div>
         </div>

         <div className="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-8 min-h-0 pb-10">
            {/* LEFT SIDE: Engineering Input Protocol */}
            <div className="flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <Terminal className="w-4 h-4 text-slate-400" />
                     <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inquiry Ingestion Protocol</h3>
                  </div>
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Input Layer: V4.1</span>
               </div>

               <div className="flex-1 p-8 flex flex-col space-y-8 overflow-y-auto premium-scrollbar">
                  <div className="flex-1 flex flex-col space-y-3">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Primary Technical Query</label>
                     <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Paste customer engineering inquiry or specific measurement requirement..."
                        className="flex-1 w-full p-6 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all resize-none leading-relaxed shadow-inner"
                     />
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Supporting Technical Evidence</label>
                     <div className="grid grid-cols-2 gap-4">
                        <input 
                           type="file" 
                           id="email-upload" 
                           className="hidden" 
                           multiple 
                           onChange={handleFileUpload} 
                        />
                        <label 
                           htmlFor="email-upload"
                           className="border-2 border-dashed border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group"
                        >
                           <UploadCloud className="w-6 h-6 text-slate-300 group-hover:text-[#5DA9DD] mb-3" />
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#5DA9DD]">Upload Customer Email</span>
                        </label>

                        <input 
                           type="file" 
                           id="schematic-upload" 
                           className="hidden" 
                           multiple 
                           onChange={handleFileUpload} 
                        />
                        <label 
                           htmlFor="schematic-upload"
                           className="border-2 border-dashed border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-blue-200 transition-all cursor-pointer group"
                        >
                           <FileSearch className="w-6 h-6 text-slate-300 group-hover:text-[#5DA9DD] mb-3" />
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-[#5DA9DD]">Technical Schematics</span>
                        </label>
                     </div>

                     {uploadedFiles.length > 0 && (
                        <div className="pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-500">
                           <div className="flex items-center gap-2 mb-3">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Staged Context Resources</span>
                           </div>
                           <div className="space-y-2">
                              {uploadedFiles.map((file, i) => (
                                 <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg">
                                    <div className="flex items-center gap-3">
                                       <FileText className="w-4 h-4 text-[#5DA9DD]" />
                                       <div className="flex flex-col">
                                          <span className="text-[10px] font-bold text-slate-700">{file.name}</span>
                                          <span className="text-[8px] text-slate-400 font-bold uppercase">{file.size}</span>
                                       </div>
                                    </div>
                                    <button 
                                      onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))}
                                      className="text-slate-300 hover:text-red-500 transition-colors"
                                    >
                                       <History className="w-3.5 h-3.5" />
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               <div className="p-8 border-t border-slate-100 bg-slate-50/30">
                  <button
                     onClick={handleGenerate}
                     disabled={!query || isGenerating}
                     className="w-full py-4 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4A98CC] shadow-xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 active:scale-95"
                  >
                     {isGenerating ? (
                        <>
                           <RefreshCw className="w-4 h-4 animate-spin text-blue-100" />
                           Consulting Engineering Base...
                        </>
                     ) : (
                        <>
                           <Zap className="w-4 h-4" />
                           Generate Recommendation
                        </>
                     )}
                  </button>
               </div>
            </div>

            {/* RIGHT SIDE: Technical Response Recommendation */}
            <div className="flex flex-col bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <BookOpen className="w-4 h-4 text-slate-400" />
                     <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Proposed Recommendation</h3>
                  </div>
                  <div className="flex items-center gap-2">
                     <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Validated Accuracy</span>
                  </div>
               </div>

               <div className="flex-1 p-8 overflow-y-auto premium-scrollbar flex flex-col">
                  {showResult ? (
                     <div className="space-y-8 animate-in slide-in-from-right-4 duration-700 pb-10">
                        {/* Response Drafting Area */}
                        <div className="relative group">
                           <div className="absolute top-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <span className="text-[8px] font-bold text-[#5DA9DD] bg-blue-50 px-2 py-1 rounded border border-blue-100 uppercase">Consultative Draft</span>
                           </div>
                           <textarea
                              value={suggestedResponse}
                              readOnly={!isEditing}
                              onChange={(e) => setSuggestedResponse(e.target.value)}
                              className={`w-full p-8 border rounded-xl text-sm font-medium leading-relaxed outline-none transition-all resize-none shadow-sm ${isEditing ? 'bg-white border-[#5DA9DD] text-slate-900 ring-4 ring-blue-50/50' : 'bg-slate-50 border-slate-100 text-slate-600 italic'
                                 }`}
                              rows={14}
                           />
                        </div>

                        {/* Provenance & References Grid */}
                        <div className="space-y-6 pt-6 border-t border-slate-100">
                           <h4 className="text-[10px] font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                              <Database className="w-4 h-4 text-[#5DA9DD]" />
                              Traceability & Evidence Base
                           </h4>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg group hover:border-blue-200 transition-all">
                                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Technical Datasheet</p>
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-700">FH_55_Specs.pdf</span>
                                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:translate-x-1 transition-transform" />
                                 </div>
                              </div>
                              <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg group hover:border-blue-200 transition-all">
                                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Historical Validation</p>
                                 <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold text-slate-700 italic">KB-001: Thermal Drift</span>
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                 </div>
                              </div>
                           </div>

                           <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-lg">
                              <p className="text-[9px] font-bold text-[#5DA9DD] uppercase tracking-widest mb-2">Engineering Context Applied</p>
                              <p className="text-[10px] text-slate-500 leading-relaxed italic">
                                 Applied "Advanced Sensor Settings" protocol from MP-DRIVE-24 baseline. Thermal coefficients adjusted per ISO-17025 standard measurement protocols.
                              </p>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm">
                           <FileSearch className="w-10 h-10 text-slate-200" />
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Drafting Area Standby</h4>
                           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter max-w-[280px] leading-relaxed">
                              Consult the engineering knowledge base by submitting a technical inquiry and supporting evidence.
                           </p>
                        </div>
                     </div>
                  )}
               </div>

               {showResult && (
                  <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center gap-4">
                     <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`flex-1 py-4 rounded text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${isEditing ? 'bg-[#5DA9DD] text-white shadow-xl hover:bg-[#4A98CC]' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
                           }`}
                     >
                        <Edit3 className="w-4 h-4" />
                        {isEditing ? "Save Protocol Draft" : "Modify Recommendation"}
                     </button>
                     <button
                        onClick={handleCopy}
                        className="flex-1 py-4 bg-[#5DA9DD] text-white rounded text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4A98CC] transition-all shadow-xl flex items-center justify-center gap-3 active:scale-95"
                     >
                        <Clipboard className="w-4 h-4" />
                        Copy Final Draft
                     </button>
                  </div>
               )}
            </div>
         </div>

         {/* Footer Info */}
         <div className="flex items-center justify-between px-4 py-6 border-t border-slate-100">
            <div className="flex items-center gap-8">
               <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <Database className="w-4 h-4 text-slate-300" /> Intelligence Pool: 1.2k Segments
               </div>
               <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                  <ShieldCheck className="w-4 h-4 text-green-500/50" /> Protocol Integrity: Verified
               </div>
            </div>
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest italic">Magnet-Physik Engineering Station • Recommendation Engine V1.4</p>
         </div>
      </div>
   );
}
