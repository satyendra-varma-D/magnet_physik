import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight, ShieldCheck, Database, Cpu, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans">
      {/* Background Image */}
      <img 
        src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
        alt="Industrial Background" 
        className="absolute inset-0 w-full h-full object-cover scale-105"
      />
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />

      <div className="w-full max-w-md relative z-10 px-6 sm:px-0">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           className="text-center mb-8 flex flex-col items-center"
        >
           <div className="w-16 h-16 bg-[#009EE3] rounded-2xl flex items-center justify-center shadow-lg border border-white/20 mb-5">
              <span className="text-white font-bold text-3xl italic tracking-tighter">MP</span>
           </div>
           <h1 className="text-2xl font-bold text-white tracking-tight leading-none uppercase mb-1">MAGNET-PHYSIK</h1>
           <p className="text-xs text-white/70 font-bold uppercase tracking-widest">Engineering Workstation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/95 backdrop-blur-xl p-10 border border-white/30 rounded-[2rem] shadow-2xl"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">System Login</h3>
            <p className="text-slate-500 text-xs mt-2 font-bold uppercase tracking-widest">Secure Technical Identity</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#009EE3] transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#009EE3]/50 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all font-bold"
                  placeholder="admin@magnet-physik.de"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Password</label>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 group-focus-within:text-[#009EE3] transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3.5 text-sm text-slate-900 focus:bg-white focus:border-[#009EE3]/50 focus:ring-4 focus:ring-blue-50/50 outline-none transition-all font-bold"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#009EE3] hover:bg-[#007AB0] text-white font-bold py-4 rounded-xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-3 group mt-8 tracking-widest uppercase text-sm"
            >
              Login
              <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </motion.div>

        {/* Login Credentials Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col gap-3"
        >
           <div className="flex items-center gap-2 mb-1">
              <Cpu className="w-4 h-4 text-white/70" />
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest">System Access Credentials</span>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-white/10 p-3 rounded-lg border border-white/10 flex items-center justify-between group">
                 <div className="overflow-hidden">
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Username</p>
                    <p className="text-xs font-bold text-white truncate">admin@magnet-physik.de</p>
                 </div>
                 <button 
                   onClick={() => copyToClipboard("admin@magnet-physik.de", "Username")}
                   className="p-1.5 text-white/50 hover:text-white transition-colors"
                 >
                    {copiedField === 'Username' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                 </button>
              </div>
              <div className="bg-white/10 p-3 rounded-lg border border-white/10 flex items-center justify-between group">
                 <div className="overflow-hidden">
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest mb-1">Password</p>
                    <p className="text-xs font-bold text-white truncate">magnet2024</p>
                 </div>
                 <button 
                   onClick={() => copyToClipboard("magnet2024", "Password")}
                   className="p-1.5 text-white/50 hover:text-white transition-colors"
                 >
                    {copiedField === 'Password' ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                 </button>
              </div>
           </div>
        </motion.div>

        <p className="mt-8 text-xs text-white/40 font-bold text-center uppercase tracking-[0.2em]">
          Magnet-Physik Dr. Steingroever GmbH <br /> 
          Engineering Station Protocol V4.2.0
        </p>
      </div>
    </div>
  );
}
