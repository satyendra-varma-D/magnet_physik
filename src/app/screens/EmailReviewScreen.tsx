import {
  Mail,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  AlertCircle,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Send,
  Upload,
  FileText,
  Search,
  BookOpen,
  Zap,
  Terminal,
  Paperclip,
  Sparkles,
  Server,
  Inbox,
  FileSearch,
  Database,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { toast } from "sonner";

const lightBlue = "#5DA9DD";
const deepBlue = "#2D6F9F";

const mockQueue = [
  {
    id: "1",
    subject: "Torque Specs for EZ4 Motor",
    user: "Engineering Team",
    time: "15 mins ago",
    content: "We need the maximum torque values for the EZ4 assembly running at 50Hz for the upcoming laboratory trial. Can you provide the thermal limits as well?",
  },
  {
    id: "2",
    subject: "Hall Sensor Calibration #400",
    user: "Dr. Schmidt",
    time: "1 hour ago",
    content: "The series #400 sensors are showing slight drift at 25°C. Please provide the recommended calibration sequence from the MP-740 manual.",
  },
];

export function EmailReviewScreen() {
  const location = useLocation();
  const [activeMode, setActiveMode] = useState<"auto" | "manual">("auto");

  useEffect(() => {
    if (location.state?.mode) {
      setActiveMode(location.state.mode);
    }
  }, [location.state]);

  const [isGenerating, setIsGenerating] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [mailContent, setMailContent] = useState("");
  const [editableResponse, setEditableResponse] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<{name: string, size: string}[]>([]);
  const [selectedQueueItem, setSelectedQueueItem] = useState<typeof mockQueue[0] | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      let content = "";
      // ... (rest of content logic)
      if (activeMode === 'auto') {
        if (selectedQueueItem?.id === '1') {
          content = `Subject: Technical Specification Review - EZ4 Motor Assembly [Performance @ 50Hz]\n\nDear Engineering Team,\n\nFollowing a comprehensive review of the EZ4 motor assembly technical documentation and recent laboratory trial data, we have finalized the performance parameters for your upcoming 50Hz application.\n\n1. Torque Specifications:\nThe EZ4 unit is rated for a peak torque output of 4.2Nm under nominal 50Hz operating conditions. Please note that torque ripple remains within the +/- 0.5% tolerance threshold, ensuring stability during high-precision cycles.\n\n2. Thermal Stabilization & Ambient Constraints:\nOur thermal mapping indicates that under continuous operation at a 100% duty cycle, stabilization occurs at 85°C (185°F). For laboratory environments exceeding 30°C ambient temperature, we strongly recommend the implementation of active forced-air cooling.\n\n3. Magnetic Flux Integrity:\nTo maintain optimal flux density, the internal operating temperature should not exceed the Curie point threshold of the specialized SmCo magnet arrays. Prolonged exposure to temperatures >95°C may lead to irreversible partial demagnetization.\n\nRecommendations:\n- Implement the MC-200 series flux stabilizers if the application requires mapping precision < 0.1%.\n- Calibrate the hall sensor array using the MP-740 protocol before high-torque stress tests.\n\nWe remain at your disposal for further technical clarification regarding the integration of these units into your test bench.\n\nBest regards,\nTechnical Engineering Division\nMagnet-Physik Station ID: MP-DRIVE-24`;
        } else {
          content = `Subject: Calibration Protocol Analysis - Series #400 Hall Sensors [Drift Correction]\n\nDear Dr. Schmidt,\n\nIn response to your inquiry regarding the thermal drift observed in the Series #400 Hall sensors at 25°C, our Technical Station has extracted the relevant calibration procedures from the MP-740 Master Manual [Rev. 2024].\n\nObserved Drift Analysis:\nThe reported drift of 0.02% per Kelvin is mathematically consistent with the standard temperature coefficient of the GaAs sensing elements used in this series. However, to eliminate secondary residual noise, a full-scale reference mapping is required.\n\nValidated Calibration Sequence (Ref: MP-740 Section 8.2):\n1. Zero-Point Adjustment: Ensure the sensor is shielded in a zero-gauss chamber. Perform a hardware-level nulling via the station interface.\n2. Reference Calibration: Utilize the certified Gauss-Standard (1.5 Tesla) for gain adjustment.\n3. Thermal Compensation: Enable the 'Active Neural-Sync' feature in your station settings to apply real-time linear interpolation based on the integrated NTC thermistor data.\n\nReference Material:\nPlease refer to Section 4.2 of the attached Calibration Protocol for specific voltage-to-flux conversion tables optimized for the #400 series.\n\nIf the drift persists beyond the 0.05% threshold after following this sequence, a laboratory-level hardware diagnostic may be necessary.\n\nRespectfully,\nHead of Technical Diagnostics\nMagnet-Physik Enterprise Platform`;
        }
      } else {
        content = `TECHNICAL ANALYSIS REPORT [MANUAL INGESTION]\nGenerated: ${new Date().toLocaleDateString()}\nContext: ${attachedFiles[0]?.name || 'Manual Technical Thread'}\n\nEXECUTIVE SUMMARY:\nBased on the manual technical requirements ingested, the system has identified a potential misalignment in the flux stabilization parameters for your high-precision mapping array.\n\nDETAILED TECHNICAL FINDINGS:\nAnalysis of the requirement document suggests that the current cooling configuration is insufficient for the high-frequency pulsed magnetic fields described in your specifications. The 'Thermal Efficiency Protocol' [Ref: Section 5] indicates a high probability of saturation if the MC-200 series stabilizers are not utilized.\n\nPROPOSED ENGINEERING PATHWAY:\n1. Integration of MC-200 Flux Stabilizers: Required for stability at <0.05% error margins.\n2. Implementation of Section 5 Protocols: Focus on the 'Active Gradient Compensation' algorithm.\n3. Verification Cycle: A 48-hour burn-in at 75% peak field intensity is recommended to validate long-term signal-to-noise ratios.\n\nAI VALIDATION STATUS:\n- Knowledge Base Cross-Reference: COMPLETE (MP-KB-882, MP-KB-901)\n- Parameter Mapping: 96.8% Accuracy\n- Compliance Check: VERIFIED [ISO-MAGNET-2024]\n\nThis draft is ready for final engineering review and transmission.`;
      }
      setEditableResponse(content);
      setIsGenerating(false);
      setHasResult(true);
    }, 2500);
  };

  const handleSendMail = () => {
    setShowSuccess(true);
    setTimeout(() => {
      toast.success("Technical Response Transmitted Successfully");
    }, 500);
  };

  const handleReset = () => {
    setHasResult(false);
    setShowSuccess(false);
    setMailContent("");
    setEditableResponse("");
    setAttachedFiles([]);
    setSelectedQueueItem(null);
  };

  const selectQueueItem = (item: typeof mockQueue[0]) => {
    setSelectedQueueItem(item);
    setMailContent(item.content);
    setHasResult(false);
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Header Area */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-8">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Technical Response Center</h2>
          <p className="text-sm text-slate-500 font-medium">Generate precise engineering responses using automated mail threads or manual technical uploads.</p>
        </div>
        <div className="flex items-center gap-4">
           {/* Mode Selector */}
           <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1">
              <button 
                onClick={() => { setActiveMode("auto"); handleReset(); }}
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeMode === 'auto' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                 Auto Queue
              </button>
              <button 
                onClick={() => { setActiveMode("manual"); handleReset(); }}
                className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeMode === 'manual' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                 Manual Upload
              </button>
           </div>
           <div className="h-6 w-px bg-slate-200 mx-2" />
           <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-lg shadow-sm">
             <ShieldCheck className="w-4 h-4 text-green-500" />
             <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Validated Mode</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch min-h-[700px]">
        
        {/* Left Panel: Mode Specific Input */}
        <div className="bg-white border border-slate-200 rounded-2xl flex flex-col shadow-sm overflow-hidden">
          <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
            <div className="flex items-center gap-3">
               {activeMode === 'auto' ? <Inbox className="w-4 h-4 text-[#5DA9DD]" /> : <Upload className="w-4 h-4 text-[#2D6F9F]" />}
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                 {activeMode === 'auto' ? 'Incoming Technical Queries' : 'Manual Technical Context'}
               </h3>
            </div>
            <button onClick={handleReset} className="text-[9px] font-bold text-slate-400 uppercase hover:text-red-500 transition-colors">Reset Interaction</button>
          </div>
          
          <div className="flex-1 overflow-y-auto premium-scrollbar p-8">
             {activeMode === 'auto' ? (
               <div className="space-y-6">
                  <div className="flex items-center justify-between px-2 mb-4">
                     <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Awaiting Response</span>
                     <span className="text-[10px] font-bold text-[#5DA9DD] uppercase tracking-widest">2 Items</span>
                  </div>
                  {mockQueue.map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => selectQueueItem(item)}
                      className={`w-full text-left p-6 rounded-xl border transition-all ${
                        selectedQueueItem?.id === item.id 
                        ? 'border-[#5DA9DD] bg-blue-50/30 shadow-md' 
                        : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                       <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-bold text-[#2D6F9F] uppercase tracking-widest">{item.user}</span>
                          <span className="text-[9px] font-bold text-slate-300 uppercase">{item.time}</span>
                       </div>
                       <h4 className="text-sm font-bold text-slate-800 mb-2">{item.subject}</h4>
                       <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">{item.content}</p>
                    </button>
                  ))}
               </div>
             ) : (
               <div className="space-y-8 animate-in slide-in-from-left-4 duration-500">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Communication Thread</label>
                    <textarea 
                      value={mailContent}
                      onChange={(e) => setMailContent(e.target.value)}
                      placeholder="Paste the email thread or specific technical requirements here..."
                      className="w-full h-64 bg-slate-50 border border-slate-100 rounded-xl p-6 text-sm text-slate-800 focus:bg-white focus:border-[#5DA9DD] outline-none transition-all font-medium resize-none leading-relaxed shadow-inner"
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Contextual Threads</label>
                      <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-all group min-h-[140px]">
                         <input 
                           type="file" 
                           multiple
                           className="hidden" 
                           id="thread-file-input"
                           onChange={(e) => {
                             const files = Array.from(e.target.files || []);
                             setAttachedFiles([...attachedFiles, ...files.map(f => ({ name: `Thread: ${f.name}`, size: (f.size / 1024 / 1024).toFixed(2) + " MB" }))]);
                           }}
                         />
                         <label htmlFor="thread-file-input" className="cursor-pointer flex flex-col items-center">
                           <MessageSquare className="w-5 h-5 text-slate-300 group-hover:text-[#5DA9DD] mb-2 transition-colors" />
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upload Thread PDFs</span>
                         </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Requirement Documents</label>
                      <div className="border-2 border-dashed border-slate-100 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-50 transition-all group min-h-[140px]">
                         <input 
                           type="file" 
                           multiple
                           className="hidden" 
                           id="req-file-input"
                           onChange={(e) => {
                             const files = Array.from(e.target.files || []);
                             setAttachedFiles([...attachedFiles, ...files.map(f => ({ name: `Req: ${f.name}`, size: (f.size / 1024 / 1024).toFixed(2) + " MB" }))]);
                           }}
                         />
                         <label htmlFor="req-file-input" className="cursor-pointer flex flex-col items-center">
                           <FileSearch className="w-5 h-5 text-slate-300 group-hover:text-[#2D6F9F] mb-2 transition-colors" />
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Upload Requirement PDFs</span>
                         </label>
                      </div>
                    </div>
                  </div>

                  {attachedFiles.length > 0 && (
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Staged Context ({attachedFiles.length})</label>
                      <div className="grid grid-cols-1 gap-3">
                         {attachedFiles.map((file, i) => (
                           <div key={i} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#5DA9DD] transition-all">
                              <div className="flex items-center gap-3">
                                 <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${file.name.startsWith('Thread') ? 'bg-blue-100' : 'bg-slate-200'}`}>
                                    <FileText className={`w-4 h-4 ${file.name.startsWith('Thread') ? 'text-[#5DA9DD]' : 'text-slate-500'}`} />
                                 </div>
                                 <div>
                                    <p className="text-[11px] font-bold text-slate-800">{file.name}</p>
                                    <p className="text-[9px] text-slate-400 font-bold uppercase">{file.size}</p>
                                 </div>
                              </div>
                              <button onClick={() => setAttachedFiles(attachedFiles.filter((_, idx) => idx !== i))} className="p-2 text-slate-300 hover:text-red-500 transition-colors"><XCircle className="w-3.5 h-3.5" /></button>
                           </div>
                         ))}
                      </div>
                    </div>
                  )}
               </div>
             )}
          </div>

          <div className="p-8 border-t border-slate-100 bg-slate-50/30">
             <button 
               onClick={handleGenerate}
               disabled={(activeMode === 'manual' && !mailContent && attachedFiles.length === 0) || (activeMode === 'auto' && !selectedQueueItem) || isGenerating}
               className={`w-full py-5 rounded-xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-4 ${
                 ((activeMode === 'manual' && !mailContent && attachedFiles.length === 0) || (activeMode === 'auto' && !selectedQueueItem) || isGenerating) 
                 ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none border border-slate-200' 
                 : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] border border-slate-900'
               }`}
             >
                {isGenerating ? (
                  <>
                    <Zap className="w-5 h-5 animate-pulse text-[#5DA9DD]" />
                    Processing Technical Context...
                  </>
                ) : (
                  <>
                    <Sparkles className={`w-5 h-5 ${(!mailContent && attachedFiles.length === 0) ? 'text-slate-300' : 'text-[#5DA9DD]'}`} />
                    Generate Technical Draft
                  </>
                )}
             </button>
          </div>
        </div>

        {/* Right Panel: AI Generation & Result */}
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
           <AnimatePresence mode="wait">
             {!hasResult && !isGenerating ? (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-6"
               >
                  <div className="w-20 h-20 bg-slate-800/50 rounded-2xl flex items-center justify-center border border-slate-700/50">
                    <Terminal className="w-10 h-10 text-slate-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">System Agent Ready</h3>
                    <p className="text-xs text-slate-500 max-w-[280px] leading-relaxed uppercase tracking-wider font-bold">
                      Select a query from the auto queue or upload manual context to generate a KB-validated engineering response.
                    </p>
                  </div>
               </motion.div>
             ) : isGenerating ? (
               <motion.div 
                 key="generating"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="flex-1 flex flex-col items-center justify-center p-12 space-y-12"
               >
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-[#5DA9DD]/20 border-t-[#5DA9DD] rounded-full animate-spin" />
                    <Zap className="w-10 h-10 text-[#5DA9DD] absolute inset-0 m-auto animate-pulse" />
                  </div>
                  <div className="space-y-6 w-full max-w-xs">
                     {[
                       "Scanning communication thread...",
                       "Cross-referencing technical manuals...",
                       "Validating engineering parameters...",
                       "Finalizing technical draft..."
                     ].map((step, i) => (
                       <div key={i} className="flex items-center gap-4 opacity-50">
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                          <span className="text-[10px] font-bold text-white uppercase tracking-widest">{step}</span>
                       </div>
                     ))}
                  </div>
               </motion.div>
             ) : (
               <motion.div 
                 key="result"
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="flex-1 flex flex-col"
               >
                  <div className="px-10 py-6 border-b border-white/10 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4 text-[#5DA9DD]" />
                        <h3 className="text-[10px] font-bold text-white uppercase tracking-widest">Generated Response Draft</h3>
                     </div>
                     <div className="flex items-center gap-2 bg-green-400/10 px-3 py-1 rounded-lg">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">96.8% Validated</span>
                     </div>
                  </div>

                  <div className="flex-1 p-10 overflow-y-auto premium-scrollbar space-y-10">
                     <div className="p-8 bg-white/5 border border-white/10 rounded-2xl relative group">
                        <textarea 
                          value={editableResponse}
                          onChange={(e) => setEditableResponse(e.target.value)}
                          className="w-full h-80 bg-transparent text-sm text-white/90 leading-relaxed font-medium outline-none resize-none scrollbar-hide border-none"
                        />
                        <div className="absolute top-4 right-4 p-2 bg-white/5 rounded opacity-0 group-hover:opacity-100 transition-all">
                           <ExternalLink className="w-4 h-4 text-white/40" />
                        </div>
                     </div>

                     <div className="space-y-6">
                        <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest flex items-center gap-2">
                           <BookOpen className="w-4 h-4" />
                           Validated Knowledge Sources
                        </h4>
                        <div className="grid grid-cols-1 gap-4">
                           <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/[0.08] transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 bg-[#5DA9DD]/20 rounded-lg flex items-center justify-center">
                                    <FileSearch className="w-4 h-4 text-[#5DA9DD]" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-white">EZ4_Technical_Specs.pdf</p>
                                    <p className="text-[9px] text-white/40 font-bold uppercase">Section 4.1 • Torque Profiles</p>
                                 </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-all" />
                           </div>
                           <div className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-white/[0.08] transition-all">
                              <div className="flex items-center gap-4">
                                 <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                                    <Database className="w-4 h-4 text-green-400" />
                                 </div>
                                 <div>
                                    <p className="text-xs font-bold text-white">MP-740_Calibration_Protocol</p>
                                    <p className="text-[9px] text-white/40 font-bold uppercase">Ref: Zero-Point_Adjust_Sequence</p>
                                 </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-white/20 group-hover:translate-x-1 transition-all" />
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="p-10 border-t border-white/10 bg-black/20">
                     <button 
                       onClick={handleSendMail}
                       className="w-full py-5 bg-[#5DA9DD] rounded-xl text-xs font-bold text-white uppercase tracking-[0.2em] hover:bg-[#4D99CD] transition-all shadow-xl flex items-center justify-center gap-4 active:scale-[0.98]"
                     >
                        <Send className="w-5 h-5" />
                        Send Technical Response
                     </button>
                  </div>
               </motion.div>
             )}
           </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6"
          >
             <motion.div 
               initial={{ scale: 0.9, y: 20 }}
               animate={{ scale: 1, y: 0 }}
               className="max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
             >
                <div className="bg-slate-50 p-12 flex flex-col items-center text-center border-b border-slate-100">
                   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8 relative">
                      <CheckCircle2 className="w-12 h-12 text-green-600 relative z-10" />
                      <motion.div 
                        animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute inset-0 bg-green-200 rounded-full"
                      />
                   </div>
                   <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Transmission Successful</h3>
                   <p className="text-sm text-slate-500 font-medium max-w-[320px] leading-relaxed">
                      Technical response has been dispatched to the station queue and archived for future calibration.
                   </p>
                </div>
                <div className="p-10 space-y-8">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</span>
                         <p className="text-xs font-bold text-slate-800">{new Date().toLocaleString()}</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Station ID</span>
                         <p className="text-xs font-bold text-[#5DA9DD]">MP-DRIVE-24</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Audit Status</span>
                         <p className="text-xs font-bold text-green-600 uppercase">Verified</p>
                      </div>
                      <div className="space-y-1 text-right">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target Node</span>
                         <p className="text-xs font-bold text-slate-800 uppercase">MAINFRAME_G2</p>
                      </div>
                   </div>
                   <button 
                     onClick={handleReset}
                     className="w-full py-5 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98]"
                   >
                      Return to Command
                   </button>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
