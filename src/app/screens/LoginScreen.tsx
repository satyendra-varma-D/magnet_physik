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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-hidden font-sans">
      {/* Left Side: Industrial Hero Section */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden">
        <img 
          src="/magnet_physik_lab_hero_1778172077473.png" 
          alt="Magnet-Physik Laboratory" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        
        <div className="relative z-10 p-16 flex flex-col justify-between h-full w-full">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-[#009EE3] rounded-lg flex items-center justify-center shadow-lg border border-white/20">
                <span className="text-white font-bold text-2xl italic tracking-tighter">MP</span>
             </div>
             <div>
                <h1 className="text-xl font-bold text-white tracking-tight leading-none uppercase">MAGNET-PHYSIK</h1>
                <p className="text-sm text-white/50 font-bold uppercase tracking-widest mt-1">Dr. Steingroever GmbH</p>
             </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md"
          >
            <h2 className="text-6xl font-bold text-white tracking-tight leading-[1.05] mb-8">
              Engineering <br />
              <span className="text-[#009EE3]">Excellence.</span>
            </h2>
            <p className="text-base text-white/70 leading-relaxed font-medium">
              Engineering Knowledge Platform for magnetics research, technical documentation, and technical response recommendation workflow.
            </p>
          </motion.div>

          <div className="flex gap-12">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-6 h-6 text-[#009EE3]" />
              <span className="text-sm font-bold text-white/60 uppercase tracking-[0.2em]">Industrial Grade Security</span>
            </div>
            <div className="flex items-center gap-4">
              <Database className="w-6 h-6 text-[#009EE3]" />
              <span className="text-sm font-bold text-white/60 uppercase tracking-[0.2em]">Validated Knowledge Base</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Login Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-20 bg-slate-50 relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#009EE3 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <div className="w-full max-w-md relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-12 border border-slate-200 rounded-[2rem] shadow-2xl shadow-slate-200/60"
          >
            <div className="text-center mb-12">
              <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                 <div className="w-10 h-10 bg-[#009EE3] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold italic tracking-tighter">MP</span>
                 </div>
                 <h1 className="text-base font-bold text-slate-900 tracking-tight">MAGNET-PHYSIK</h1>
              </div>
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">Workstation Login</h3>
              <p className="text-slate-400 text-sm mt-3 font-medium uppercase tracking-wider">Access established via secure technical identity</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-widest ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#009EE3] transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm text-slate-900 focus:bg-white focus:border-[#009EE3]/30 outline-none transition-all font-medium"
                    placeholder="admin@magnet-physik.de"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-widest">Password</label>
                  <button type="button" className="text-sm font-bold text-[#009EE3] hover:underline uppercase tracking-widest">Recover Access</button>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300 group-focus-within:text-[#009EE3] transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl pl-12 pr-4 py-4 text-sm text-slate-900 focus:bg-white focus:border-[#009EE3]/30 outline-none transition-all font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#009EE3] hover:bg-[#007AB0] text-white font-bold py-5 rounded-xl transition-all shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 group mt-10 tracking-[0.1em] uppercase text-sm"
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
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-blue-50/80 border border-blue-100/50 rounded-2xl flex flex-col gap-4"
          >
             <div className="flex items-center gap-2 mb-1">
                <Cpu className="w-4 h-4 text-[#009EE3]" />
                <span className="text-sm font-bold text-[#009EE3] uppercase tracking-widest">System Access Credentials</span>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white/60 p-3 rounded-lg border border-white flex items-center justify-between group">
                   <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Username</p>
                      <p className="text-sm font-bold text-slate-700 truncate">admin@magnet-physik.de</p>
                   </div>
                   <button 
                     onClick={() => copyToClipboard("admin@magnet-physik.de", "Username")}
                     className="p-1.5 text-slate-300 hover:text-[#009EE3] transition-colors"
                   >
                      {copiedField === 'Username' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                   </button>
                </div>
                <div className="bg-white/60 p-3 rounded-lg border border-white flex items-center justify-between group">
                   <div className="overflow-hidden">
                      <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter mb-0.5">Password</p>
                      <p className="text-sm font-bold text-slate-700 truncate">magnet2024</p>
                   </div>
                   <button 
                     onClick={() => copyToClipboard("magnet2024", "Password")}
                     className="p-1.5 text-slate-300 hover:text-[#009EE3] transition-colors"
                   >
                      {copiedField === 'Password' ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                   </button>
                </div>
             </div>
          </motion.div>

          <p className="mt-12 text-sm text-slate-400 font-medium text-center uppercase tracking-[0.2em] opacity-60">
            Magnet-Physik Dr. Steingroever GmbH <br /> 
            Engineering Station Protocol V4.2.0
          </p>
        </div>
      </div>
    </div>
  );
}
