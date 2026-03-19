/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Handshake, 
  BrainCircuit, 
  Settings, 
  Search, 
  Bell, 
  Zap, 
  TrendingUp, 
  UserPlus, 
  ShieldCheck,
  Plus,
  ArrowUpRight,
  MoreVertical,
  History,
  ShieldAlert,
  FolderOpen,
  Trophy,
  Globe,
  FileText,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// --- Types ---

type Tab = 'dashboard' | 'contacts' | 'deals' | 'insights' | 'settings' | 'projects' | 'achievements';

// --- Mock Data ---

const salesData = [
  { name: 'JAN', value: 400 },
  { name: 'FEB', value: 300 },
  { name: 'MAR', value: 500 },
  { name: 'APR', value: 450 },
  { name: 'MAY', value: 700 },
  { name: 'JUN', value: 650 },
  { name: 'JUL', value: 800 },
];

const recentDeals = [
  { id: 1, company: 'Vortex Dynamics', value: '$450,000', status: 'ANALYZING', lead: 'https://i.pravatar.cc/150?u=vortex', initial: 'V', color: 'text-purple-400' },
  { id: 2, company: 'Sovereign Labs', value: '$125,000', status: 'CLOSED', lead: 'https://i.pravatar.cc/150?u=sovereign', initial: 'S', color: 'text-cyan-400' },
  { id: 3, company: 'Prism Forge', value: '$82,500', status: 'IN PROGRESS', lead: 'https://i.pravatar.cc/150?u=prism', initial: 'P', color: 'text-amber-400' },
];

const projects = [
  { id: 1, name: 'Project Phoenix', status: 'IN PROGRESS', desc: 'Self-optimizing neural backbone designed to reduce latency in cross-continental data shards by 42%.', progress: 78, icon: <Zap className="w-5 h-5" /> },
  { id: 2, name: 'Neural Nexus', status: 'OPTIMIZING', desc: 'Generative intelligence layer for automated resource allocation across decentralized hybrid clouds.', progress: 94, icon: <BrainCircuit className="w-5 h-5" /> },
  { id: 3, name: 'Aegis Core', status: 'IN PROGRESS', desc: 'Real-time threat detection and autonomous remediation protocol for enterprise security infrastructures.', progress: 35, icon: <ShieldCheck className="w-5 h-5" /> },
];

const achievements = [
  { id: 1, title: 'Series B Funding Secured', tag: 'FINANCE MILESTONE', desc: 'Successfully closed $85M round to accelerate the Kinetic Oracle neural architecture.', icon: <Handshake className="w-6 h-6" />, link: 'READ PRESS RELEASE' },
  { id: 2, title: 'Top 10 AI Innovators 2025', tag: 'GLOBAL RECOGNITION', desc: 'Recognized by Global Tech Index for breakthrough advancements in predictive analytics.', icon: <Trophy className="w-6 h-6" />, link: 'VIEW RANKINGS' },
  { id: 3, title: '1M Active Nodes Reached', tag: 'SCALE ACHIEVEMENT', desc: 'Our global edge network successfully scaled to one million concurrent processing units.', icon: <Globe className="w-6 h-6" />, link: 'NETWORK STATS' },
];

// --- Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-cyan-500/10 text-cyan-400 border-l-2 border-cyan-400' 
        : 'text-zinc-500 hover:text-zinc-200 hover:bg-white/5'
    }`}
  >
    <Icon className={`w-5 h-5 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`} />
    <span className="font-semibold text-sm tracking-tight">{label}</span>
  </button>
);

const StatCard = ({ label, value, subtext, icon: Icon, trend, trendColor }: { label: string, value: string, subtext: string, icon?: any, trend?: string, trendColor?: string }) => (
  <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors" />
    <div className="flex flex-col gap-1 relative z-10">
      <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{label}</span>
      <h2 className={`text-4xl font-extrabold tracking-tighter ${trendColor === 'cyan' ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.3)]' : 'text-white'}`}>
        {value}
      </h2>
      <div className="mt-4 flex items-center gap-2 text-xs font-bold">
        {Icon && <Icon className={`w-4 h-4 ${trendColor === 'cyan' ? 'text-cyan-400' : 'text-zinc-500'}`} />}
        <span className={trendColor === 'cyan' ? 'text-cyan-400' : 'text-zinc-500'}>{subtext}</span>
      </div>
    </div>
  </div>
);

const DashboardView = () => (
  <div className="space-y-8">
    {/* Stats Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard 
        label="Active Deals" 
        value="$1.2M" 
        subtext="+12.5% vs last month" 
        icon={TrendingUp} 
        trendColor="cyan"
      />
      <StatCard 
        label="New Leads" 
        value="14" 
        subtext="3 waiting for AI audit" 
        icon={UserPlus} 
      />
      <StatCard 
        label="AI Prediction Accuracy" 
        value="98.5%" 
        subtext="Enterprise Grade Confidence" 
        icon={Zap} 
        trendColor="cyan"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Chart & Table Area */}
      <div className="lg:col-span-2 space-y-8">
        {/* Sales Growth Chart */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-2xl h-[400px] flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-start mb-8 relative z-10">
            <div>
              <h3 className="text-xl font-bold text-white">Sales Growth Trends</h3>
              <p className="text-xs text-zinc-500 mt-1">Projected revenue vs actual performance</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-zinc-800 rounded-full text-[10px] font-bold text-cyan-400 border border-cyan-400/20">REAL-TIME</span>
              <span className="px-3 py-1 bg-zinc-800/50 rounded-full text-[10px] font-bold text-zinc-500">MONTHLY</span>
            </div>
          </div>
          
          <div className="flex-1 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00E5FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  itemStyle={{ color: '#00E5FF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00E5FF" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} dy={10} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Deals Table */}
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-zinc-900/20">
            <h3 className="text-lg font-bold text-white">Recent Deals</h3>
            <button className="text-xs font-bold text-cyan-400 hover:underline">View All Pipeline</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-zinc-900/40">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Company</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Value</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">AI Status</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Lead</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentDeals.map((deal) => (
                  <tr key={deal.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded bg-zinc-800 flex items-center justify-center font-bold ${deal.color}`}>{deal.initial}</div>
                        <span className="font-bold text-sm text-white">{deal.company}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-mono text-sm text-zinc-300">{deal.value}</td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        deal.status === 'ANALYZING' ? 'bg-cyan-500/10 text-cyan-400' : 
                        deal.status === 'CLOSED' ? 'bg-emerald-500/10 text-emerald-400' : 
                        'bg-purple-500/10 text-purple-400'
                      }`}>
                        {deal.status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <img src={deal.lead} alt="Lead" className="w-6 h-6 rounded-full border border-zinc-700" referrerPolicy="no-referrer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights Panel */}
      <div className="space-y-6">
        <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex flex-col h-full bg-gradient-to-br from-zinc-900/60 to-black/40">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-5 h-5 text-cyan-400 fill-cyan-400" />
            <h3 className="text-lg font-bold text-white">Oracle Insights</h3>
          </div>
          
          <div className="space-y-6 flex-1">
            {/* AI Insight Card */}
            <div className="p-4 rounded-xl bg-cyan-400/5 border-l-2 border-cyan-400 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-400/5 rounded-full blur-2xl" />
              <div className="flex flex-col gap-2 relative z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-black uppercase text-cyan-400 tracking-widest">High Probability</span>
                  <span className="text-[10px] text-zinc-500">2m ago</span>
                </div>
                <p className="text-sm font-medium leading-relaxed text-zinc-200">
                  <span className="text-white font-bold">Vortex Dynamics</span> is likely to convert this week. AI suggests immediate follow-up on technical docs.
                </p>
                <button className="w-fit text-[10px] font-bold py-1.5 px-4 bg-cyan-400 text-black rounded-full mt-2 hover:opacity-80 transition-opacity">
                  Take Action
                </button>
              </div>
            </div>

            {/* Activity Feed */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Activity Feed</h4>
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-400" />
                  <div className="w-px h-12 bg-white/5 my-1" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">Deal Updated</p>
                  <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">Alex Rivera moved Sovereign Labs to 'Closed'.</p>
                  <span className="text-[10px] text-zinc-600 mt-1 block">15m ago</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-400" />
                  <div className="w-px h-12 bg-white/5 my-1" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">New Lead Detected</p>
                  <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">Found 3 matching entities for 'Nebula Corp' from AI Search.</p>
                  <span className="text-[10px] text-zinc-600 mt-1 block">45m ago</span>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-700" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-white">Report Generated</p>
                  <p className="text-[11px] text-zinc-500 leading-snug mt-0.5">Q3 Predictive Growth Analysis is ready for review.</p>
                  <span className="text-[10px] text-zinc-600 mt-1 block">2h ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Status */}
          <div className="mt-8 p-4 rounded-xl bg-zinc-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-pulse" />
                <div className="absolute inset-0 w-2.5 h-2.5 bg-cyan-400 rounded-full blur-[4px]" />
              </div>
              <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">Oracle Online</span>
            </div>
            <Settings className="w-4 h-4 text-zinc-600" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProjectsView = () => (
  <div className="space-y-16">
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="h-px w-8 bg-cyan-400" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-cyan-400">Status: Synchronized</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter text-white">Innovation & Milestones</h1>
      </div>
      <div className="text-right">
        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs ml-auto">
          Tracking the convergence of neural architectures and enterprise scaling. Last updated: <span className="text-purple-400">08:00 AM UTC</span>.
        </p>
      </div>
    </div>

    {/* Active AI Projects */}
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Cpu className="w-6 h-6 text-cyan-400" />
          Active AI Projects
        </h2>
        <button className="text-sm font-bold text-cyan-400 hover:underline tracking-tight">View Archive</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-zinc-900/40 backdrop-blur-xl p-6 rounded-2xl border border-white/5 hover:border-cyan-400/30 transition-all group relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-400/5 blur-3xl rounded-full" />
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white">{project.name}</h3>
                <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded ${
                  project.status === 'OPTIMIZING' ? 'bg-purple-500/10 text-purple-400' : 'bg-cyan-500/10 text-cyan-400'
                }`}>
                  {project.status}
                </span>
              </div>
              <div className="text-zinc-600 group-hover:text-cyan-400 transition-colors">
                {project.icon}
              </div>
            </div>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              {project.desc}
            </p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold uppercase text-zinc-600">
                <span>{project.status === 'OPTIMIZING' ? 'Core Stability' : 'Sync Progress'}</span>
                <span className="text-white">{project.progress}%</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    project.status === 'OPTIMIZING' ? 'bg-purple-500' : 'bg-gradient-to-r from-cyan-400 to-purple-500'
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* Company Achievements */}
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <Trophy className="w-6 h-6 text-purple-400" />
          Company Achievements
        </h2>
      </div>
      
      <div className="bg-zinc-900/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/5">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="p-8 flex flex-col gap-6 group hover:bg-white/5 transition-colors">
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                <div className="text-cyan-400">{achievement.icon}</div>
              </div>
              <div className="space-y-2">
                <div className={`inline-block px-3 py-1 text-[10px] font-black uppercase rounded-full tracking-tighter ${
                  achievement.id === 2 ? 'bg-purple-500/20 text-purple-400' : 'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {achievement.tag}
                </div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">{achievement.title}</h3>
                <p className="text-zinc-500 text-sm">{achievement.desc}</p>
              </div>
              <div className={`mt-auto flex items-center gap-2 font-bold text-xs cursor-pointer group-hover:translate-x-1 transition-transform ${
                achievement.id === 2 ? 'text-purple-400' : 'text-cyan-400'
              }`}>
                {achievement.link} <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* AI Analysis Overlay */}
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-black border border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05),transparent_70%)] opacity-50" />
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(0,229,255,1)]" />
            <span className="text-xs font-black tracking-widest text-cyan-400 uppercase">AI Executive Analysis</span>
          </div>
          <h2 className="text-3xl font-extrabold leading-tight text-white">Strategic Milestone Velocity is <span className="text-cyan-400">Exceeding Projections</span></h2>
          <p className="text-zinc-400 leading-relaxed max-w-2xl">
            Current analysis indicates a 22% increase in deployment speed over the last quarter. Achievement velocity correlates positively with the new Series B resource allocation. Recommendation: Aggressively target 'Project Phoenix' completion by Q4.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="px-8 py-4 bg-cyan-400 text-black font-black uppercase text-xs tracking-widest rounded-xl shadow-[0_10px_40px_-10px_rgba(0,229,255,0.4)] hover:scale-105 active:scale-95 transition-all">
            Generate Full Report
          </button>
        </div>
      </div>
    </div>

    {/* Footer */}
    <footer className="mt-auto pt-12 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-black tracking-tighter text-zinc-700">Kinetic Oracle</span>
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">v4.0.2 Stable</span>
        </div>
        <div className="flex gap-8">
          {['System Protocol', 'Privacy Neural Net', 'Infrastructure Log'].map((link) => (
            <a key={link} className="text-[10px] font-bold text-zinc-500 hover:text-cyan-400 uppercase tracking-widest transition-colors" href="#">{link}</a>
          ))}
        </div>
      </div>
    </footer>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0d0d0d] border-r border-white/5 flex flex-col p-6 z-50 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="mb-10 px-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <h1 className="text-xl font-black text-white tracking-tighter leading-none">Kinetic Oracle</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-600 mt-1">Active Intelligence</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SidebarItem icon={FolderOpen} label="Projects" active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} />
          <SidebarItem icon={Users} label="Contacts" active={activeTab === 'contacts'} onClick={() => setActiveTab('contacts')} />
          <SidebarItem icon={Handshake} label="Deals" active={activeTab === 'deals'} onClick={() => setActiveTab('deals')} />
          <SidebarItem icon={BrainCircuit} label="AI Insights" active={activeTab === 'insights'} onClick={() => setActiveTab('insights')} />
          <div className="pt-4 mt-4 border-t border-white/5">
            <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
          </div>
        </nav>

        <div className="mt-auto">
          <button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 rounded-xl text-sm mb-6 shadow-lg shadow-cyan-500/10 active:scale-95 transition-transform">
            New Analysis
          </button>
          
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-center gap-3">
            <img 
              src="https://i.pravatar.cc/150?u=alex" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border border-zinc-700" 
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white">Alex Rivera</span>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Director</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-xl z-40">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Query the Oracle..." 
                className="w-full bg-zinc-900/50 border-none rounded-xl pl-12 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:ring-1 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <button className="p-2.5 text-zinc-500 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full border-2 border-[#0a0a0a]" />
              </button>
              <button className="p-2.5 text-zinc-500 hover:text-white transition-colors">
                <History className="w-5 h-5" />
              </button>
            </div>
            
            <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 text-cyan-400 text-sm font-bold rounded-xl border border-cyan-400/20 hover:bg-zinc-800 transition-all">
              <Zap className="w-4 h-4 fill-cyan-400" />
              AI Sync
            </button>
            
            <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center">
              <UserPlus className="w-4 h-4 text-zinc-400" />
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'dashboard' && <DashboardView />}
              {activeTab === 'projects' && <ProjectsView />}
              {activeTab !== 'dashboard' && activeTab !== 'projects' && (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-zinc-900 flex items-center justify-center">
                    <ShieldAlert className="w-8 h-8 text-zinc-700" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Module Under Construction</h2>
                  <p className="text-zinc-500 max-w-sm">This section of the Kinetic Oracle is currently being synchronized with the neural backbone.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-cyan-400 to-purple-600 text-white rounded-full shadow-[0_10px_30px_rgba(0,229,255,0.3)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
        <Plus className="w-6 h-6" />
        <span className="absolute right-full mr-4 px-3 py-1.5 bg-zinc-900 text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/5">
          NEW DEAL
        </span>
      </button>
    </div>
  );
}
