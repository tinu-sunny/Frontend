import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { blogData } from '../data/extras';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Blog = () => {
  const [filter, setFilter] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredPosts = filter === 'All'
    ? blogData
    : blogData.filter(post => post.tag === filter);

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
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Articles & Notes</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            TECH JOURNAL
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Thoughts • Learnings • Builds
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-10"
        >
          {['All', 'Development', 'Data', 'Security'].map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                filter === tag
                  ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-slate-900/60 text-slate-300 hover:text-cyan-300 border border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Blog Posts Grid with Staggered Viewport Reveals */}
        <motion.div
          key={filter}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="space-y-4"
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              whileHover={{
                y: shouldReduceMotion ? 0 : -3,
                borderColor: 'rgba(0, 240, 255, 0.45)',
              }}
              className="glass-card p-6 rounded-2xl border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-all"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-400">
                    {post.tag}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    • {post.date}
                  </span>
                </div>

                <h3 className="font-heading text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl leading-relaxed">
                  {post.snippet}
                </p>
              </div>

              <div className="flex-shrink-0 self-start md:self-center">
                <a
                  href={post.link}
                  className="inline-flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-cyan-400 group-hover:text-cyan-300 font-semibold cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
