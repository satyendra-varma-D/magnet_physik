import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  Download,
  Calendar,
  Layers,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const queryData = [
  { name: "Week 1", count: 400 },
  { name: "Week 2", count: 300 },
  { name: "Week 3", count: 600 },
  { name: "Week 4", count: 800 },
  { name: "Week 5", count: 500 },
  { name: "Week 6", count: 900 },
];

const categoryData = [
  { name: "Manuals", value: 400 },
  { name: "Specs", value: 300 },
  { name: "Logs", value: 300 },
  { name: "Internal", value: 200 },
];

const COLORS = ["#009EE3", "#6366F1", "#10B981", "#F59E0B"];

export function AnalyticsScreen() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">System Analytics</h2>
          <p className="text-sm text-slate-500">Deep dive into knowledge base performance and AI utility metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg text-xs font-semibold text-slate-600 transition-all">
            <Calendar className="w-4 h-4 text-slate-400" />
            Last 30 Days
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Queries", value: "8,234", change: "+24%", icon: Search, color: "#009EE3" },
          { label: "Active Nodes", value: "156", change: "+12%", icon: Users, color: "#6366F1" },
          { label: "Avg. Resolution", value: "1.4s", change: "-15%", icon: Clock, color: "#10B981" },
          { label: "Success Rate", value: "94.2%", change: "+2%", icon: Zap, color: "#F59E0B" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white border border-slate-200 p-6 rounded-xl group hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-6">
               <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                  <stat.icon className="w-4.5 h-4.5 text-slate-400 group-hover:text-[#009EE3]" />
               </div>
               <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded border border-green-100">
                  <ArrowUpRight className="w-3 h-3" /> {stat.change}
               </div>
            </div>
            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 p-8 rounded-xl">
          <div className="flex items-center justify-between mb-10">
            <h3 className="text-lg font-bold text-slate-900">Query Volume Trend</h3>
            <div className="flex bg-slate-50 p-1 rounded-lg">
               <button className="px-4 py-1.5 text-xs font-bold text-slate-400">Daily</button>
               <button className="px-4 py-1.5 text-xs font-bold bg-white text-[#009EE3] rounded shadow-sm">Weekly</button>
            </div>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={queryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: "#fff", border: "1px solid #e2e8f0", borderRadius: "8px" }} />
                <Bar dataKey="count" fill="#009EE3" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white border border-slate-200 p-8 rounded-xl flex flex-col">
          <h3 className="text-lg font-bold text-slate-900 mb-8">Knowledge Sources</h3>
          <div className="flex-1 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
             {categoryData.map((cat, i) => (
               <div key={i} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{cat.name}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
