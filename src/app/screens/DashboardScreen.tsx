import {
  FileText,
  CheckCircle2,
  Clock,
  Target,
  MessageSquare,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Users,
  Search,
  Layers,
  Activity,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const stats = [
  { label: "Documents", value: "1,247", change: "+12%", trend: "up", icon: FileText, color: "#5DA9DD" },
  { label: "Validated", value: "3,891", change: "+8%", trend: "up", icon: CheckCircle2, color: "#10B981" },
  { label: "Resolution", value: "1.4s", change: "-15%", trend: "down", icon: Clock, color: "#F59E0B" },
  { label: "Accuracy", value: "94.2%", change: "+2%", trend: "up", icon: Target, color: "#6366F1" },
];

const data = [
  { name: "Mon", q: 400 }, { name: "Tue", q: 600 }, { name: "Wed", q: 500 },
  { name: "Thu", q: 900 }, { name: "Fri", q: 700 }, { name: "Sat", q: 300 }, { name: "Sun", q: 400 },
];

const categoryData = [
  { name: "Manuals", value: 400 }, { name: "Specs", value: 300 },
  { name: "Logs", value: 300 }, { name: "Internal", value: 200 },
];

const COLORS = ["#5DA9DD", "#6366F1", "#10B981", "#F59E0B"];

const recentActivity = [
  { id: "1", user: "Schmidt", action: "Validated: Hall Sensors", time: "12m", status: "success" },
  { id: "2", user: "Engineering", action: "New Manual: EZ4", time: "1h", status: "info" },
  { id: "3", user: "Weber", action: "Gen: Calibration Log", time: "2h", status: "warning" },
];

export function DashboardScreen() {
  const navigate = useNavigate();

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      {/* Header - Compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Technical Command</h2>
          <p className="text-xs text-slate-400 font-medium mt-1">Station ID: MP-DRIVE-24 • System Nominal</p>
        </div>
        <div className="flex items-center gap-3">
           <button 
             onClick={() => navigate('/dashboard/email-review', { state: { mode: 'manual' } })}
             className="px-6 py-2.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-all shadow-lg flex items-center gap-3 active:scale-[0.98]"
           >
              <Zap className="w-4 h-4 text-[#5DA9DD]" />
              Process Manual Inquiries
           </button>
        </div>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-200 p-5 rounded-xl hover:shadow-md transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 group-hover:bg-blue-50">
                <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                stat.trend === "up" ? "text-green-600 bg-green-50" : "text-amber-600 bg-amber-50"
              }`}>
                {stat.change}
              </span>
            </div>
            <div>
              <div className="text-xl font-bold text-slate-900 leading-tight">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Grid - Optimized Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Analytics Chart - Reduced Height */}
        <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-2">
               <Activity className="w-4 h-4 text-[#5DA9DD]" />
               Utilization Trend
            </h3>
            <div className="flex bg-slate-50 p-1 rounded-lg">
               <button className="px-3 py-1 text-[10px] font-bold bg-white text-slate-900 rounded shadow-sm">Volume</button>
               <button className="px-3 py-1 text-[10px] font-bold text-slate-400">Latency</button>
            </div>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorQ" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#5DA9DD" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#5DA9DD" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 10 }} />
                <Tooltip contentStyle={{ border: "none", borderRadius: "8px", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Area type="monotone" dataKey="q" stroke="#5DA9DD" strokeWidth={2} fill="url(#colorQ)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Knowledge Distribution - Compact */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-tight">Source Distribution</h3>
          <div className="h-[140px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={40} outerRadius={55} paddingAngle={4} dataKey="value">
                  {categoryData.map((e, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <span className="text-xs font-bold text-slate-900">1.2k</span>
               <span className="text-[8px] font-bold text-slate-400 uppercase">Docs</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-6 pt-6 border-t border-slate-50">
             {categoryData.map((cat, i) => (
               <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{cat.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Bottom Row - Activity & Health Side-by-Side */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
         {/* Operational Feed - Tighter */}
         <div className="xl:col-span-2 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-tight">Recent Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentActivity.map((activity, idx) => (
                <button 
                  key={idx} 
                  onClick={() => navigate(`/dashboard/knowledge-base/${activity.id}`)}
                  className="text-left p-4 bg-slate-50 border border-slate-100 rounded-xl group transition-all hover:bg-white hover:shadow-lg hover:border-[#5DA9DD] hover:-translate-y-1 active:scale-[0.98]"
                >
                   <div className="flex justify-between mb-3">
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-widest ${
                        activity.status === 'success' ? 'bg-green-100 text-green-700' :
                        activity.status === 'info' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                      }`}>{activity.status}</span>
                      <span className="text-[8px] font-bold text-slate-300 uppercase">{activity.time}</span>
                   </div>
                   <p className="text-[11px] font-bold text-slate-800 leading-tight mb-3 line-clamp-1 group-hover:text-[#5DA9DD] transition-colors">{activity.action}</p>
                   <div className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-slate-900 rounded-md flex items-center justify-center text-[8px] text-white font-bold italic">{activity.user.charAt(0)}</div>
                      <span className="text-[9px] font-bold text-slate-400">{activity.user}</span>
                   </div>
                </button>
              ))}
            </div>
         </div>

         {/* System Health - Extremely Compact */}
         <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 mb-6 tracking-tight">Node Topology</h3>
            <div className="space-y-3">
               {[
                 { label: "Mainframe", status: "Active", color: "text-green-600" },
                 { label: "Lab Node 01", status: "Active", color: "text-green-600" },
               ].map((node, i) => (
                 <div key={i} className="flex justify-between items-center px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{node.label}</span>
                    <span className={`text-[9px] font-bold ${node.color}`}>{node.status}</span>
                 </div>
               ))}
               <div className="pt-3">
                  <div className="flex justify-between mb-2">
                     <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Neural Sync</span>
                     <span className="text-[9px] font-bold text-[#5DA9DD]">100%</span>
                  </div>
                  <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden">
                     <div className="h-full bg-[#5DA9DD] w-full" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
