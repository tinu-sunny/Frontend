import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code, 
  Cpu, 
  Layout, 
  Layers, 
  Palette, 
  Sparkles, 
  Server, 
  Terminal, 
  Network, 
  ShieldCheck, 
  Sliders, 
  Database, 
  HardDrive, 
  Grid, 
  GitBranch, 
  GitFork, 
  Code2, 
  Zap, 
  Package, 
  Send 
} from 'lucide-react';
import { skillsData } from '../data/skills';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Skills = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [activeMernNode, setActiveMernNode] = useState('React');
  const shouldReduceMotion = useReducedMotion();

  const iconMap = {
    Code,
    Cpu,
    Layout,
    Layers,
    Palette,
    Sparkles,
    Server,
    Terminal,
    Network,
    ShieldCheck,
    Sliders,
    Database,
    HardDrive,
    Grid,
    GitBranch,
    GitFork,
    Code2,
    Zap,
    Package,
    Send
  };

  const filteredCategories = activeTab === 'all' 
    ? skillsData.categories 
    : skillsData.categories.filter(cat => cat.id === activeTab);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 cyber-grid overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tech Arsenal</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            SKILLS & TECHNOLOGIES
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Tools I Use to Build
          </p>
        </motion.div>

        {/* Central MERN Core Orbital Visualization (Panel 6) */}
        <motion.div
          initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 glass-card p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
              Core Architecture
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">
              Full-Stack MERN Ecosystem
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
              Click on an orbital node to inspect each layer of the MERN architecture.
            </p>
          </div>

          {/* Interactive MERN Node Graph with animated SVG laser connectors */}
          <div className="relative w-full max-w-2xl mx-auto h-72 sm:h-96 flex items-center justify-center">
            {/* SVG Connecting laser lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="1.5" strokeDasharray="4 6" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(14,165,233,0.1)" strokeWidth="1" />
              
              {/* Lines from center to 4 nodes with animate-in */}
              <motion.line
                x1="200" y1="200" x2="200" y2="70"
                stroke={activeMernNode === 'React' ? '#00f0ff' : 'rgba(0,240,255,0.4)'}
                strokeWidth={activeMernNode === 'React' ? '2.5' : '1.5'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />
              <motion.line
                x1="200" y1="200" x2="330" y2="200"
                stroke={activeMernNode === 'Node.js' ? '#22c55e' : 'rgba(34,197,94,0.4)'}
                strokeWidth={activeMernNode === 'Node.js' ? '2.5' : '1.5'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <motion.line
                x1="200" y1="200" x2="200" y2="330"
                stroke={activeMernNode === 'MongoDB' ? '#10b981' : 'rgba(16,185,129,0.4)'}
                strokeWidth={activeMernNode === 'MongoDB' ? '2.5' : '1.5'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.line
                x1="200" y1="200" x2="70" y2="200"
                stroke={activeMernNode === 'Express.js' ? '#38bdf8' : 'rgba(56,189,248,0.4)'}
                strokeWidth={activeMernNode === 'Express.js' ? '2.5' : '1.5'}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </svg>

            {/* Central MERN Core Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative z-20 w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-cyan-950 via-slate-900 to-black border-2 border-cyan-400 flex flex-col items-center justify-center shadow-[0_0_35px_rgba(0,240,255,0.5)] cursor-default select-none"
            >
              <span className="font-heading text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-blue-400">
                MERN
              </span>
              <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest">
                CORE
              </span>
            </motion.div>

            {/* Top Node: React */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMernNode('React')}
              className={`absolute top-2 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeMernNode === 'React'
                  ? 'bg-cyan-950 border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.7)] scale-105'
                  : 'bg-slate-900/80 border border-cyan-500/30 hover:border-cyan-400'
              }`}
            >
              <span className="font-heading text-xs sm:text-sm font-bold text-cyan-300">React.js</span>
              <span className="text-[10px] font-mono text-slate-400">Frontend UI</span>
            </motion.button>

            {/* Right Node: Node.js */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMernNode('Node.js')}
              className={`absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeMernNode === 'Node.js'
                  ? 'bg-emerald-950 border-2 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.7)] scale-105'
                  : 'bg-slate-900/80 border border-emerald-500/30 hover:border-emerald-400'
              }`}
            >
              <span className="font-heading text-xs sm:text-sm font-bold text-emerald-300">Node.js</span>
              <span className="text-[10px] font-mono text-slate-400">Server Runtime</span>
            </motion.button>

            {/* Bottom Node: MongoDB */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMernNode('MongoDB')}
              className={`absolute bottom-2 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeMernNode === 'MongoDB'
                  ? 'bg-teal-950 border-2 border-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.7)] scale-105'
                  : 'bg-slate-900/80 border border-teal-500/30 hover:border-teal-400'
              }`}
            >
              <span className="font-heading text-xs sm:text-sm font-bold text-teal-300">MongoDB</span>
              <span className="text-[10px] font-mono text-slate-400">NoSQL Database</span>
            </motion.button>

            {/* Left Node: Express.js */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveMernNode('Express.js')}
              className={`absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                activeMernNode === 'Express.js'
                  ? 'bg-sky-950 border-2 border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.7)] scale-105'
                  : 'bg-slate-900/80 border border-sky-500/30 hover:border-sky-400'
              }`}
            >
              <span className="font-heading text-xs sm:text-sm font-bold text-sky-300">Express.js</span>
              <span className="text-[10px] font-mono text-slate-400">API Framework</span>
            </motion.button>
          </div>

          {/* Node detail display strip */}
          <motion.div
            key={activeMernNode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-4 rounded-xl bg-slate-900/70 border border-cyan-500/20 text-center max-w-xl mx-auto"
          >
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-wider">
              Layer Inspection: <strong className="text-white">{activeMernNode}</strong>
            </span>
            <p className="text-xs text-slate-300 mt-1">
              {activeMernNode === 'React' && 'Component-driven user interfaces, state synchronization, virtual DOM reconciliation, and modern responsive design.'}
              {activeMernNode === 'Node.js' && 'Asynchronous, event-driven JavaScript server environment powering scalable, low-latency microservices.'}
              {activeMernNode === 'Express.js' && 'Lightweight RESTful API routing, middleware authentication, request validation, and error management.'}
              {activeMernNode === 'MongoDB' && 'Flexible document-oriented data storage with Mongoose ODM schemas, indexing, and aggregation pipelines.'}
            </p>
          </motion.div>
        </motion.div>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                : 'bg-slate-900/60 text-slate-300 hover:text-cyan-300 border border-slate-800'
            }`}
          >
            All Skills
          </button>
          {skillsData.categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-300 hover:text-cyan-300 border border-slate-800'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Categorized Skills Grid with Staggered Viewport Reveals */}
        <motion.div
          key={activeTab}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {filteredCategories.map((cat) => (
            <motion.div
              key={cat.id}
              variants={cardVariants}
              whileHover={{ y: -3, borderColor: 'rgba(0, 240, 255, 0.4)' }}
              className="glass-card p-6 rounded-2xl border border-cyan-500/20"
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800">
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  {cat.title}
                </h3>
                <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest">
                  {cat.skills.length} Tools
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cat.skills.map((skill) => {
                  const Icon = iconMap[skill.icon] || Code;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.04, borderColor: '#00f0ff' }}
                      className="group p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:bg-slate-900 transition-all flex flex-col items-center text-center cursor-default"
                    >
                      <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:text-cyan-300 transition-all mb-2">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 mt-1">
                        {skill.level}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
