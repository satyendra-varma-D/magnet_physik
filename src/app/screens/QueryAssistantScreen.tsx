import {
  Send,
  Plus,
  Search,
  MoreVertical,
  History,
  Settings,
  Paperclip,
  Mic,
  Smile,
  Bot,
  User,
  Trash2,
  Share2,
  ChevronRight,
  Maximize2,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Database,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const recentChats = [
  { id: "1", title: "Calibration of EZ4 sensors with MP-740 flux controller", time: "2h ago" },
  { id: "2", title: "Hall Effect temperature drift analysis at 50Hz", time: "3h ago" },
  { id: "3", title: "Fluxgate magnetometer driver installation procedure", time: "5h ago" },
  { id: "4", title: "Magnetic shielding guidelines for high-frequency lab", time: "1d ago" },
  { id: "5", title: "Sensor sensitivity mapping in vacuum chambers", time: "2d ago" },
];

export function QueryAssistantScreen() {
  const [message, setMessage] = useState("");

  return (
    <div className="h-[calc(100vh-160px)] flex gap-10 animate-in fade-in duration-500">
      {/* Chat Sidebar */}
      <div className="w-[400px] hidden xl:flex flex-col gap-8">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm flex-1 flex flex-col min-h-0">
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 tracking-tight">Recent Technical Queries</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Session History</p>
            </div>
            <button className="p-2 bg-slate-50 border border-slate-100 rounded-lg text-slate-400 hover:text-[#009EE3] transition-all">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 premium-scrollbar pr-2">
            {recentChats.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left p-4 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100"
              >
                <p className="text-xs font-bold text-slate-700 leading-tight group-hover:text-[#009EE3] transition-colors">{chat.title}</p>
                <p className="text-[10px] text-slate-400 mt-2 font-medium">{chat.time} • Station Node 01</p>
              </button>
            ))}
          </div>

          <div className="pt-8 mt-8 border-t border-slate-100 space-y-4">
             <div className="flex items-center justify-between px-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Storage Node</span>
                <span className="text-[10px] font-bold text-green-600 uppercase">Synced</span>
             </div>
             <button className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-[11px] font-bold text-white rounded-xl transition-all shadow-lg">
                Saved Technical Responses
             </button>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden min-w-0">
        {/* Chat Header */}
        <div className="px-10 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center shadow-sm">
               <Bot className="w-6 h-6 text-[#009EE3]" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">Engineering Assistant</h3>
                <span className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 text-green-600 rounded text-[9px] font-bold uppercase tracking-widest border border-green-100">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Technical Active
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 font-medium">Neural Engine: Magnet-Physik GPT-4o Optimized</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button className="p-3 text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"><Search className="w-5 h-5" /></button>
             <button className="p-3 text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"><Maximize2 className="w-5 h-5" /></button>
             <button className="p-3 text-slate-300 hover:text-slate-900 hover:bg-white rounded-xl transition-all border border-transparent hover:border-slate-100"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-12 space-y-12 premium-scrollbar bg-white">
          <div className="flex gap-6 max-w-4xl mx-auto w-full">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
               <Bot className="w-5 h-5 text-[#009EE3]" />
            </div>
            <div className="space-y-4 flex-1">
               <div className="text-base text-slate-600 leading-relaxed font-medium">
                  Hello! I'm your Magnet-Physik technical advisor. I have access to all your local station documentation, model specifications, and historical calibration logs. 
                  <br /><br />
                  How can I assist your engineering process today?
               </div>
               <div className="flex items-center gap-6 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                     <Database className="w-3.5 h-3.5" /> Neural Node V2.4
                  </div>
                  <div className="flex items-center gap-4">
                     <button className="p-1.5 text-slate-200 hover:text-[#009EE3] transition-colors"><ThumbsUp className="w-4 h-4" /></button>
                     <button className="p-1.5 text-slate-200 hover:text-red-500 transition-colors"><ThumbsDown className="w-4 h-4" /></button>
                     <button className="p-1.5 text-slate-200 hover:text-slate-900 transition-colors"><Share2 className="w-4 h-4" /></button>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-10 border-t border-slate-100 bg-slate-50/30">
          <div className="relative max-w-5xl mx-auto">
             <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-2.5 text-slate-300 hover:text-[#009EE3] hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all"><Paperclip className="w-5 h-5" /></button>
             </div>
             <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Submit a technical query to the neural engine..."
                className="w-full bg-white border border-slate-200 rounded-2xl pl-16 pr-36 py-6 h-18 resize-none focus:ring-1 focus:ring-slate-100 transition-all font-medium text-sm text-slate-800 shadow-sm"
             />
             <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <button className="p-3 text-slate-300 hover:text-slate-600 transition-all"><Mic className="w-5 h-5" /></button>
                <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xl active:scale-95 flex items-center gap-3 group">
                   Analyze
                   <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
          <div className="mt-6 max-w-5xl mx-auto flex items-center justify-between px-2">
             <div className="flex items-center gap-6">
                <button className="flex items-center gap-2.5 text-[10px] font-bold text-slate-300 hover:text-slate-500 transition-colors uppercase tracking-widest">
                   <ShieldCheck className="w-4 h-4" /> Secure Session
                </button>
             </div>
             <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Shift + Enter for new line • Ctrl + Enter to send</p>
          </div>
        </div>
      </div>
    </div>
  );
}
