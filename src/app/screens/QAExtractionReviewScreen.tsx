import {
   CheckCircle2,
   XCircle,
   Clock,
   ChevronRight,
   MessageSquare,
   ArrowRight,
   ShieldCheck,
   FileText,
   Database,
   History,
   FileSearch,
   BookOpen,
   Mail,
   Edit3,
   Eye,
   ArrowLeft,
   Search,
   Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const mockConversations = [
   {
      id: "EXT-4291",
      sourceFile: "History_Customer_Support_2023.csv",
      sourceType: "Email Record",
      originalEmail: `From: Hans Müller <h.mueller@techcorp.de>\nSent: Tuesday, March 14, 2023 10:15 AM\nTo: Magnet-Physik Support\nSubject: FH 55 Thermal Drift\n\nDear Support Team,\n\nWe are experiencing some thermal drift issues with the FH 55 fluxmeter when operating above 35°C. Is there a specific compensation coefficient we should be applying in the software settings?\n\nBest regards,\nHans`,
      extractedQuestion: "What is the recommended thermal drift compensation for the FH 55 fluxmeter when operating above 35°C?",
      extractedAnswer: "For operating temperatures above 35°C, the FH 55 requires a compensation coefficient of 0.02%/K. This can be adjusted in the 'Advanced Sensor Settings' menu under 'Thermal Calibration'. Ensure the sensor has been at ambient temperature for at least 30 minutes before calibration.",
      productRef: "FH 55 Fluxmeter",
      materialRef: "Fluxgate Sensor",
      workflowRef: "Thermal Calibration Protocol",
      status: "Pending Review"
   },
   {
      id: "EXT-4292",
      sourceFile: "History_Customer_Support_2023.csv",
      sourceType: "Email Record",
      originalEmail: `From: Sarah Jenkins <s.jenkins@magnetics.uk>\nSent: Monday, April 03, 2023 2:45 PM\nTo: Magnet-Physik Support\nSubject: Calibration for Unit #4521\n\nHi,\n\nWe just received Unit #4521 back from repair. Does this unit require a full recalibration against the primary standard, or is the factory certificate still valid for the remainder of the year?\n\nThanks,\nSarah`,
      extractedQuestion: "Does Unit #4521 require a full recalibration after repair if the factory certificate is still within its valid date range?",
      extractedAnswer: "Any hardware repair on the MP-740 series (including Unit #4521) voids the previous factory certificate. A full recalibration against a primary standard is mandatory before returning the unit to operational service to ensure measurement traceability.",
      productRef: "MP-740 Calibration Unit",
      materialRef: "Traceability Standard",
      workflowRef: "Recalibration Protocol",
      status: "Pending Review"
   }
];

export function QAExtractionReviewScreen() {
   const navigate = useNavigate();
   const [selectedConv, setSelectedConv] = useState<typeof mockConversations[0] | null>(null);
   const [editableQuestion, setEditableQuestion] = useState("");
   const [editableAnswer, setEditableAnswer] = useState("");
   const [isProcessing, setIsProcessing] = useState(false);
   const [showSuccess, setShowSuccess] = useState(false);

   const selectConversation = (conv: typeof mockConversations[0]) => {
      setSelectedConv(conv);
      setEditableQuestion(conv.extractedQuestion);
      setEditableAnswer(conv.extractedAnswer);
   };

   const handleAction = (type: 'approve' | 'reject' | 'edit') => {
      setIsProcessing(true);
      setTimeout(() => {
         setIsProcessing(false);
         if (type !== 'reject') {
            setShowSuccess(true);
            toast.success("Knowledge Base Updated", {
               description: "Engineering entry has been validated and synchronized with the master repository.",
            });
         } else {
            setSelectedConv(null);
            toast.error("Extraction Rejected", {
               description: "Segment has been discarded and removed from the review queue.",
            });
         }
      }, 1000);
   };

   return (
      <div className="w-full space-y-6 animate-in fade-in duration-700">
         {/* Header */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
            <div>
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Q&A Extraction Review</h2>
               <p className="text-sm text-slate-500 font-medium mt-1 italic">Administrative Governance: Validating extracted technical intelligence from historical records.</p>
            </div>
            <div className="flex items-center gap-3">
               <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded shadow-sm">
                  <History className="w-4 h-4 text-[#009EE3]" />
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Queue: {mockConversations.length} Segments</span>
               </div>
               <button
                  onClick={() => navigate('/dashboard')}
                  className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors"
               >
                  <ArrowLeft className="w-5 h-5" />
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch min-h-[700px]">

            {/* PANEL 1: Source Selection & Preview (3 Cols) */}
            <div className="xl:col-span-3 flex flex-col gap-6">
               <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
                  <div className="px-5 py-3 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Review Queue</h3>
                     </div>
                     <Search className="w-3.5 h-3.5 text-slate-300" />
                  </div>
                  <div className="flex-1 overflow-y-auto premium-scrollbar">
                     {mockConversations.map((conv) => (
                        <button
                           key={conv.id}
                           onClick={() => selectConversation(conv)}
                           className={`w-full text-left p-5 border-b border-slate-50 transition-all group ${selectedConv?.id === conv.id
                                 ? 'bg-blue-50/80 border-l-4 border-l-[#009EE3]'
                                 : 'hover:bg-slate-50'
                              }`}
                        >
                           <div className="flex justify-between items-start mb-1">
                              <span className="text-sm font-bold text-slate-400 uppercase tracking-tighter">{conv.id}</span>
                              <span className="text-sm font-bold text-slate-300 uppercase italic">{conv.sourceType}</span>
                           </div>
                           <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-[#009EE3] transition-colors">{conv.productRef}</h4>
                           <p className="text-sm text-slate-400 mt-1 line-clamp-1 italic">{conv.sourceFile}</p>
                        </button>
                     ))}
                  </div>
               </div>

               {selectedConv && (
                  <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden flex flex-col h-[280px]">
                     <div className="px-4 py-2 bg-slate-800 flex items-center gap-2">
                        <Eye className="w-3 h-3 text-slate-400" />
                        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Original Record Viewer</span>
                     </div>
                     <div className="flex-1 p-5 overflow-y-auto premium-scrollbar text-slate-400 font-mono text-sm leading-relaxed italic whitespace-pre-wrap">
                        {selectedConv.originalEmail}
                     </div>
                  </div>
               )}
            </div>

            {/* PANEL 2: Extracted Intelligence (6 Cols) */}
            <div className="xl:col-span-6 flex flex-col gap-6">
               <div className="bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col flex-1 overflow-hidden">
                  {selectedConv ? (
                     <div className="flex-1 flex flex-col">
                        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-[#009EE3] rounded flex items-center justify-center text-white shadow-md">
                                 <Sparkles className="w-3.5 h-3.5" />
                              </div>
                              <div>
                                 <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Extracted Knowledge Draft</h3>
                                 <p className="text-sm text-slate-400 font-bold uppercase tracking-tight">System Ref: {selectedConv.id}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="px-2 py-1 bg-blue-100 text-[#009EE3] border border-[#009EE3]/20 rounded text-sm font-bold uppercase">{selectedConv.productRef}</span>
                           </div>
                        </div>

                        <div className="flex-1 p-8 space-y-8 overflow-y-auto premium-scrollbar">
                           {/* Technical Question */}
                           <div className="space-y-3">
                              <div className="flex items-center justify-between ml-1">
                                 <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" /> Technical Question
                                 </label>
                                 <span className="text-sm font-bold text-slate-300 uppercase tracking-tighter">Confidence: High</span>
                              </div>
                              <textarea
                                 value={editableQuestion}
                                 onChange={(e) => setEditableQuestion(e.target.value)}
                                 className="w-full p-5 bg-slate-50 border border-slate-100 rounded-lg text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all resize-none leading-relaxed"
                                 rows={3}
                              />
                           </div>

                           {/* Expert Answer */}
                           <div className="space-y-3">
                              <div className="flex items-center justify-between ml-1">
                                 <label className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-[#009EE3]" /> Expert-Validated Answer
                                 </label>
                                 <span className="text-sm font-bold text-slate-300 uppercase tracking-tighter">Edit Required for Context</span>
                              </div>
                              <textarea
                                 value={editableAnswer}
                                 onChange={(e) => setEditableAnswer(e.target.value)}
                                 className="w-full p-6 bg-slate-50 border border-slate-100 rounded-lg text-sm font-medium text-slate-600 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80 outline-none transition-all resize-none leading-relaxed italic"
                                 rows={12}
                              />
                           </div>

                           {/* Additional Metadata */}
                           <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-50">
                              <div>
                                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Material / Sensor Ref</p>
                                 <input
                                    type="text"
                                    defaultValue={selectedConv.materialRef}
                                    className="w-full bg-slate-50 border border-slate-100 rounded px-3 py-2 text-sm font-bold text-slate-700"
                                 />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Workflow / Protocol</p>
                                 <input
                                    type="text"
                                    defaultValue={selectedConv.workflowRef}
                                    className="w-full bg-slate-50 border border-slate-100 rounded px-3 py-2 text-sm font-bold text-slate-700"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  ) : (
                     <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
                        <div className="w-16 h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-100 mb-6 shadow-sm">
                           <FileSearch className="w-8 h-8" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Awaiting Selection</h4>
                        <p className="text-sm text-slate-300 font-medium max-w-[240px] leading-relaxed">Select a knowledge segment from the queue to initiate governance validation.</p>
                     </div>
                  )}
               </div>
            </div>

            {/* PANEL 3: Governance Actions & Decisions (3 Cols) */}
            <div className="xl:col-span-3 flex flex-col gap-6">
               <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm space-y-8 flex flex-col flex-1">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b border-slate-100 pb-4 flex items-center gap-2">
                     <ShieldCheck className="w-4 h-4 text-[#009EE3]" />
                     Decision Protocol
                  </h3>

                  <div className="space-y-4 flex-1">
                     <button
                        onClick={() => handleAction('approve')}
                        disabled={!selectedConv || isProcessing}
                        className="w-full py-4 bg-[#009EE3] text-white rounded text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#007AB0] transition-all shadow-lg flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                     >
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                        Final Approve
                     </button>

                     <button
                        onClick={() => handleAction('edit')}
                        disabled={!selectedConv || isProcessing}
                        className="w-full py-4 bg-white border border-slate-200 text-slate-900 rounded text-sm font-bold uppercase tracking-[0.2em] hover:bg-slate-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                     >
                        <Edit3 className="w-4 h-4 text-[#009EE3]" />
                        Update & Sync
                     </button>

                     <div className="py-4 flex items-center gap-4">
                        <div className="flex-1 h-px bg-slate-100" />
                        <span className="text-sm font-bold text-slate-300 uppercase">Conflict Logic</span>
                        <div className="flex-1 h-px bg-slate-100" />
                     </div>

                     <button
                        onClick={() => handleAction('reject')}
                        disabled={!selectedConv || isProcessing}
                        className="w-full py-4 bg-white border border-slate-200 text-red-500 rounded text-sm font-bold uppercase tracking-[0.2em] hover:bg-red-50 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-95"
                     >
                        <XCircle className="w-4 h-4" />
                        Reject Extraction
                     </button>
                  </div>

                  <div className="p-5 bg-slate-50 rounded-lg border border-slate-100">
                     <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Quality Checklist</h4>
                     </div>
                     <div className="space-y-2.5">
                        {[
                           "Check technical drift units",
                           "Confirm sensor series compatibility",
                           "Redact customer contact data",
                        ].map((check, i) => (
                           <div key={i} className="flex items-center gap-2">
                              <div className="w-1 h-1 bg-[#009EE3] rounded-full" />
                              <span className="text-sm font-bold text-slate-400 uppercase tracking-tight leading-none">{check}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="bg-[#009EE3]/5 border border-[#009EE3]/10 rounded-lg p-6">
                  <p className="text-sm font-bold text-[#009EE3] uppercase tracking-widest mb-2">Audit Compliance</p>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                     All approvals are digitally signed by Station: **DRIVE-24** and logged for engineering compliance.
                  </p>
               </div>
            </div>
         </div>

         {/* Workflow Status Bar */}
         <div className="bg-white border border-slate-200 rounded-lg p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Intelligence Lifecycle Status</h3>
               <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">Active Pipeline</span>
               </div>
            </div>
            <div className="flex items-center justify-between max-w-4xl mx-auto px-10">
               {[
                  { label: "Ingested", status: "complete", icon: FileText },
                  { label: "Extraction", status: "complete", icon: FileSearch },
                  { label: "Validation", status: "current", icon: ShieldCheck },
                  { label: "Production KB", status: "pending", icon: Database },
               ].map((step, i, arr) => (
                  <div key={i} className="flex items-center flex-1 last:flex-none">
                     <div className="flex flex-col items-center gap-3 relative group">
                        <div className={`w-12 h-12 rounded flex items-center justify-center border-2 transition-all duration-500 ${step.status === 'complete' ? 'bg-green-50 border-green-500 text-green-600' :
                              step.status === 'current' ? 'bg-[#009EE3] border-[#009EE3] text-white shadow-xl scale-110' :
                                 'bg-slate-50 border-slate-100 text-slate-200'
                           }`}>
                           <step.icon className="w-5 h-5" />
                        </div>
                        <span className={`text-sm font-bold uppercase tracking-[0.1em] absolute -bottom-7 whitespace-nowrap transition-colors ${step.status === 'current' ? 'text-slate-900' : 'text-slate-400'
                           }`}>
                           {step.label}
                        </span>
                     </div>
                     {i < arr.length - 1 && (
                        <div className={`h-[1px] flex-1 mx-6 ${step.status === 'complete' ? 'bg-green-500' : 'bg-slate-100'
                           }`} />
                     )}
                  </div>
               ))}
            </div>
            <div className="h-6" />
         </div>

         {/* Success Modal */}
         <AnimatePresence>
            {showSuccess && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6"
               >
                  <motion.div
                     initial={{ scale: 0.95, y: 10 }}
                     animate={{ scale: 1, y: 0 }}
                     className="max-w-md w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200"
                  >
                     <div className="p-12 text-center space-y-8">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-white shadow-inner">
                           <CheckCircle2 className="w-12 h-12 text-green-500" />
                        </div>
                        <div className="space-y-2">
                           <h3 className="text-xl font-bold text-slate-900 uppercase tracking-tight">Intelligence Verified</h3>
                           <p className="text-sm text-slate-400 font-medium leading-relaxed">
                              The extraction protocol has been completed. Segment **{selectedConv?.id}** is now operational in the **Approved Knowledge Base**.
                           </p>
                        </div>
                        <button
                           onClick={() => { setShowSuccess(false); setSelectedConv(null); }}
                           className="w-full py-5 bg-[#009EE3] text-white rounded text-sm font-bold uppercase tracking-[0.2em] hover:bg-[#007AB0] transition-all shadow-lg active:scale-95"
                        >
                           Continue Queue Review
                        </button>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   );
}
