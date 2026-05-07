import {
  History,
  Search,
  Filter,
  MessageSquare,
  ChevronRight,
  Clock,
  User,
  MoreVertical,
  Calendar,
  Tag,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const history = [
  { id: "1", query: "Calibration of EZ4 sensors in low temp", user: "Dr. Schmidt", time: "2h ago", status: "Success", rating: 5 },
  { id: "2", query: "Hall Effect temperature drift coefficients", user: "M. Weber", time: "5h ago", status: "Success", rating: 4 },
  { id: "3", query: "Fluxgate magnetometer driver installation", user: "Admin", time: "1d ago", status: "Review", rating: null },
  { id: "4", query: "Magnetic shielding for high frequency coils", user: "J. Mueller", time: "2d ago", status: "Success", rating: 5 },
  { id: "5", query: "EZ4 motor torque curve at peak load", user: "Engineering", time: "3d ago", status: "Success", rating: 4 },
];

export function QueryHistoryScreen() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white font-heading tracking-tight">Query History</h2>
          <p className="text-slate-400 mt-2">Access and re-evaluate past interactions with the AI assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search history..."
              className="bg-white/5 border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:ring-blue-500/50 w-64 transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold text-slate-300 transition-all">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
      </div>

      {/* History Feed */}
      <div className="space-y-4">
        {history.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-6 hover:border-white/20 transition-all group cursor-pointer"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center border border-blue-500/20 shrink-0">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-blue-400 transition-colors leading-tight">
                    {item.query}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <User className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.user}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        item.status === 'Success' ? 'text-green-400 bg-green-500/10 border border-green-500/20' : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < item.rating! ? 'text-blue-400 fill-blue-400' : 'text-slate-700'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"><Tag className="w-4 h-4" /></button>
                 <button className="p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-center pt-8">
         <button className="flex items-center gap-2 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white rounded-xl transition-all text-sm font-bold uppercase tracking-widest">
            Load More History
         </button>
      </div>
    </div>
  );
}
