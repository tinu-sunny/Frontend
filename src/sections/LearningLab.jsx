import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Beaker, Sparkles, Flame, CheckCircle, ArrowRight, Code } from 'lucide-react';
import { learningLabData } from '../data/extras';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const LearningLab = () => {
  const [filter, setFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredExperiments = filter === 'All'
    ? learningLabData.activeExperiments
    : learningLabData.activeExperiments.filter(item => item.status === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="lab" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Beaker className="w-3.5 h-3.5 text-cyan-400" />
            <span>R&D Space</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            LEARNING LAB
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Experimenting • Exploring • Building
          </p>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {['All', 'Learning', 'Experimenting', 'Building'].map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === item
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-300 hover:text-cyan-300 border border-slate-800'
              }`}
            >
              {item}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Active Experiments List (8 cols) */}
          <motion.div
            key={filter}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {filteredExperiments.map((exp) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                whileHover={{
                  y: shouldReduceMotion ? 0 : -3,
                  borderColor: 'rgba(0, 240, 255, 0.45)',
                }}
                className="glass-card p-5 rounded-2xl border border-cyan-500/20 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                      {exp.category}
                    </span>
                    <span
                      className={`text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${
                        exp.status === 'Learning'
                          ? 'border-emerald-500/40 text-emerald-400 bg-emerald-950/40'
                          : exp.status === 'Experimenting'
                          ? 'border-cyan-500/40 text-cyan-400 bg-cyan-950/40'
                          : 'border-amber-500/40 text-amber-400 bg-amber-950/40'
                      }`}
                    >
                      {exp.status}
                    </span>
                  </div>

                  <h3 className="font-heading text-base font-bold text-white mb-2">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {exp.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 pt-2 border-t border-slate-800/80">
                  <Code className="w-3.5 h-3.5" />
                  <span>In Active Practice</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Next Up Target Card (4 cols) matching Panel 8 */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 glass-card p-6 rounded-2xl border border-cyan-500/30 bg-gradient-to-b from-slate-900 to-slate-950"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">
              <Flame className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personal R&D Target</span>
            </div>

            <h3 className="font-heading text-lg font-bold text-white mb-2">
              {learningLabData.nextGoal.title}
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              {learningLabData.nextGoal.description}
            </p>

            {/* Progress Radar */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-xs font-mono text-slate-400">
                <span>Architecture Target</span>
                <span className="text-cyan-400 font-bold">{learningLabData.nextGoal.progress}% In Progress</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${learningLabData.nextGoal.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full shadow-[0_0_10px_#00f0ff]"
                ></motion.div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] font-mono text-slate-400">
              Target: Deploying reactive agent workflows on AWS / Vercel.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
