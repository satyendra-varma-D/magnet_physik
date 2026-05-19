import {
   Zap,
   FileText,
   Trash2,
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
   Download,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export function QueryAssistantScreen() {

   const [query, setQuery] = useState("");
   const [isGenerating, setIsGenerating] = useState(false);
   const [suggestedResponse, setSuggestedResponse] = useState("");
   const [showResult, setShowResult] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [draftLanguage, setDraftLanguage] = useState<'EN' | 'DE'>('EN');

   const englishDraft = `ENGINEERING RESPONSE RECOMMENDATION\n\nReference Code: MP-R-2024-0511\nProduct Group: FH Series Fluxmeters\n\nTECHNICAL DRAFT:\n\nRegarding the customer inquiry about sensor drift in the FH 55 series fluxmeter at elevated operating temperatures (>35°C):\n\n1. OPERATIONAL PARAMETERS:\nThe FH 55 fluxmeter is calibrated for standard laboratory conditions (20°C - 25°C). For applications in high-temperature environments, a thermal compensation factor of 0.02%/K must be configured in the system firmware.\n\n2. CORRECTIVE ACTION:\nInstruct the customer to navigate to 'Sensor Configuration' -> 'Compensation Matrix' and update the T-Coefficient to 0.0002. This adjustment will normalize the flux readings across the 35°C - 50°C range.\n\n3. VERIFICATION:\nRecommend a post-configuration verification using the MP-740 Reference Standard to ensure measurement traceability.\n\n[DRAFT END]`;
   const germanDraft = `EMPFEHLUNG FÜR TECHNISCHE ANTWORT\n\nReferenzcode: MP-R-2024-0511\nProduktgruppe: FH Serie Fluxmeter\n\nTECHNISCHER ENTWURF:\n\nBezüglich der Kundenanfrage zur Sensordrift im Fluxmeter der FH 55-Serie bei erhöhten Betriebstemperaturen (>35°C):\n\n1. BETRIEBSPARAMETER:\nDas Fluxmeter FH 55 ist auf Standard-Laborbedingungen (20°C - 25°C) kalibriert. Für Anwendungen in Hochtemperaturumgebungen muss in der Systemfirmware ein thermischer Kompensationsfaktor von 0,02%/K konfiguriert werden.\n\n2. KORREKTURMASSNAHME:\nWeisen Sie den Kunden an, zu 'Sensorkonfiguration' -> 'Kompensationsmatrix' zu navigieren und den T-Koeffizienten auf 0,0002 zu aktualisieren. Durch diese Anpassung werden die Flussmesswerte im Bereich von 35°C bis 50°C normalisiert.\n\n3. VERIFIZIERUNG:\nEmpfehlen Sie eine Verifizierung nach der Konfiguration mit dem Referenzstandard MP-740, um die Rückverfolgbarkeit der Messung sicherzustellen.\n\n[ENTWURF ENDE]`;

   useEffect(() => {
      if (showResult && !isEditing) {
         setSuggestedResponse(draftLanguage === 'EN' ? englishDraft : germanDraft);
      }
   }, [draftLanguage, showResult, isEditing]);
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
         setSuggestedResponse(draftLanguage === 'EN' ? englishDraft : germanDraft);
         setIsGenerating(false);
         setShowResult(true);
         setIsEditing(false);
      }, 1800);
   };

   const handleCopy = () => {
      navigator.clipboard.writeText(suggestedResponse);
      toast.success("Response copied to clipboard");
   };

   const handleDiscard = () => {
      setQuery("");
      setSuggestedResponse("");
      setShowResult(false);
      setUploadedFiles([]);
      toast.success("Draft and query discarded");
   };

   return (
      <div className="h-full flex flex-col gap-4 animate-in fade-in duration-700 pb-4">
         {/* Header Section */}
         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="space-y-1">
               <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Create AI Response</h2>
               <p className="text-sm text-slate-500 font-medium max-w-2xl leading-relaxed">
                 Engineering intelligence station for processing technical inquiries and generating validated customer responses.
               </p>
            </div>
         </div>

         <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-8 min-h-[600px]">
                {/* LEFT SIDE: Engineering Input Protocol */}
                <div className="xl:col-span-5 flex flex-col bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
                   <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                            <Terminal className="w-4 h-4 text-[#009EE3]" />
                         </div>
                         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">AI Response Protocol</h3>
                      </div>

                   </div>

                   <div className="flex-1 p-5 flex flex-col space-y-4 overflow-y-auto premium-scrollbar">
                      <div className="flex-1 flex flex-col space-y-4">
                         <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <MessageSquare className="w-3.5 h-3.5" /> Primary Technical Query
                         </label>
                         <textarea
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Paste customer engineering inquiry or specific measurement requirement..."
                            className="flex-1 w-full p-8 bg-slate-50/50 border border-slate-100 rounded-2xl text-sm font-bold text-slate-800 focus:bg-white focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50 outline-none transition-all resize-none leading-relaxed shadow-inner"
                         />
                      </div>


                   </div>

                   <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                      <button
                         onClick={handleGenerate}
                         disabled={!query || isGenerating}
                         className="w-full py-3 bg-[#009EE3] text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-blue-500/10 hover:bg-[#007AB0] flex items-center justify-center gap-4 transition-all disabled:opacity-50 active:scale-[0.98]"
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
                <div className="xl:col-span-7 flex flex-col bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden relative">
                   <div className="px-8 py-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-[#009EE3]" />
                         </div>
                         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Proposed Response Draft</h3>
                      </div>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center p-1 bg-slate-100/80 rounded-lg">
                            <button
                               onClick={() => setDraftLanguage('EN')}
                               className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-widest transition-all ${draftLanguage === 'EN' ? 'bg-white shadow-sm text-[#009EE3]' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                               EN
                            </button>
                            <button
                               onClick={() => setDraftLanguage('DE')}
                               className={`px-4 py-1.5 rounded-md text-sm font-bold uppercase tracking-widest transition-all ${draftLanguage === 'DE' ? 'bg-white shadow-sm text-[#009EE3]' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                               DE
                            </button>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 p-5 overflow-y-auto premium-scrollbar flex flex-col">
                      {showResult ? (
                         <div className="space-y-4 animate-in slide-in-from-right-4 duration-700 pb-4">
                            <div className="relative group">
                               <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                  <span className="px-3 py-1 bg-blue-100 text-[#009EE3] border border-blue-100 rounded-full text-sm font-bold uppercase">Technical Draft v1.0</span>
                               </div>
                               <textarea
                                  value={suggestedResponse}
                                  readOnly={false}
                                  onChange={(e) => setSuggestedResponse(e.target.value)}
                                  className="w-full p-4 border border-slate-200 rounded-2xl text-xs font-medium leading-relaxed outline-none transition-all resize-none shadow-sm bg-white text-slate-800 focus:border-[#009EE3] focus:ring-4 focus:ring-blue-50/80"
                                  rows={22}
                               />
                            </div>

                            <div className="space-y-3 pt-3 border-t border-slate-100">
                               <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                  <Database className="w-4 h-4 text-[#009EE3]" /> Traceability Base
                               </h4>

                               <div className="grid grid-cols-2 gap-3">
                                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#009EE3]/30 transition-all hover:bg-white hover:shadow-sm">
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Primary Source</p>
                                     <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700">FH_55_Specs.pdf</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-[#009EE3] translate-x-0 group-hover:translate-x-1 transition-transform" />
                                     </div>
                                  </div>
                                  <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl group hover:border-[#009EE3]/30 transition-all hover:bg-white hover:shadow-sm">
                                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Validation Ref</p>
                                     <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-700">KB-001: Thermal Drift</span>
                                        <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                     </div>
                                  </div>
                               </div>

                               <div className="p-3 bg-blue-100/50 border border-blue-100 rounded-2xl relative overflow-hidden">
                                  <div className="relative z-10">
                                    <p className="text-[10px] font-bold text-[#009EE3] uppercase tracking-widest mb-1">Engineering Insight Applied</p>
                                    <p className="text-xs text-slate-600 leading-relaxed italic">
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
                               <p className="text-sm text-slate-300 font-bold uppercase tracking-tight max-w-[280px] leading-relaxed">
                                  Submit a technical inquiry on the left to activate the AI-assisted response drafting protocol.
                               </p>
                            </div>
                         </div>
                      )}
                   </div>

                   {showResult && (
                      <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex items-center gap-6">
                         <button
                             onClick={handleDiscard}
                             className="flex-1 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-3 bg-white border border-slate-200 text-rose-500 hover:bg-rose-50 hover:border-rose-200 shadow-sm"
                          >
                             <Trash2 className="w-4 h-4" />
                             Discard
                          </button>
                         <button
                            onClick={handleCopy}
                            className="flex-1 py-3 bg-[#009EE3] text-white rounded-2xl text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#007AB0] transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3 active:scale-95"
                         >
                            <Clipboard className="w-4 h-4" />
                            Copy Response
                         </button>
                      </div>
                   )}
                </div>
         </div>


      </div>
   );
}
