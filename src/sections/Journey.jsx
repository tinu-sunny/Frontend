import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Milestone, Calendar, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { journeyData } from '../data/journey';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Journey = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for drawing the vertical timeline line
  const { scrollYProgress: lineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 70%', 'end 70%'],
  });

  const lineHeight = useTransform(lineProgress, [0, 1], ['0%', '100%']);

  // Gentle parallax background movement
  const { scrollYProgress: bgProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    bgProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-4%', '4%']
  );

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden"
    >
      {/* Background with futuristic highway matching Panel 7 with subtle Parallax */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none -z-10 opacity-25 scale-105"
      >
        <img
          src="/assets/journey_highway.jpg"
          alt="Future Highway"
          className="w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/90 to-[#030712]"></div>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-3">
            <Milestone className="w-3.5 h-3.5 text-cyan-400" />
            <span>Evolution & Road</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            MY JOURNEY
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Learning • Building • Growing
          </p>
        </motion.div>

        {/* Timeline Container with dynamic line drawing */}
        <div
          ref={timelineRef}
          className="relative ml-4 sm:ml-8 md:ml-32 pl-6 sm:pl-10 space-y-12"
        >
          {/* Static track line */}
          <div className="absolute left-0 top-2 bottom-4 w-[2px] bg-cyan-500/15"></div>

          {/* Animated active glowing drawn line driven by scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-0 top-2 w-[2px] bg-gradient-to-b from-cyan-400 via-blue-500 to-teal-300 shadow-[0_0_12px_#00f0ff] origin-top"
          ></motion.div>

          {journeyData.map((milestone, idx) => {
            const isCurrent = milestone.status === 'Current';
            const isFuture = milestone.status === 'Upcoming';

            return (
              <div key={idx} className="relative group">
                {/* Glowing Node on Timeline Line with Scroll Illumination */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.5 }}
                  whileInView={{
                    scale: 1,
                    opacity: 1,
                  }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.4 }}
                  className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-5 h-5 rounded-full border-2 transition-transform duration-300 group-hover:scale-125 z-10 ${
                    isCurrent
                      ? 'bg-cyan-400 border-white shadow-[0_0_18px_#00f0ff]'
                      : isFuture
                      ? 'bg-slate-900 border-cyan-400/60'
                      : 'bg-cyan-950 border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.5)]'
                  }`}
                ></motion.div>

                {/* Left Year Label for Desktop */}
                <motion.div
                  initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="hidden md:block absolute -left-36 top-1 text-right w-24"
                >
                  <span
                    className={`font-mono text-xs font-bold uppercase tracking-wider block ${
                      isCurrent ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  >
                    {milestone.year}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {milestone.status}
                  </span>
                </motion.div>

                {/* Milestone Card with Scroll Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{
                    y: shouldReduceMotion ? 0 : -3,
                    borderColor: isCurrent
                      ? 'rgba(0, 240, 255, 0.8)'
                      : 'rgba(0, 240, 255, 0.45)',
                  }}
                  className={`glass-card p-6 sm:p-7 rounded-2xl border transition-all duration-300 ${
                    isCurrent
                      ? 'border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.2)] bg-slate-900/90'
                      : 'border-cyan-500/20 hover:border-cyan-500/40'
                  }`}
                >
                  {/* Mobile Year Badge */}
                  <div className="md:hidden flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-cyan-400 uppercase tracking-widest">
                      {milestone.year}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                      {milestone.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {milestone.title}
                    </h3>
                    <span className="text-xs font-mono text-cyan-400/90 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-1 rounded-md">
                      {milestone.highlight}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 block mb-3">
                    {milestone.subtitle}
                  </span>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {milestone.description}
                  </p>

                  {/* Skills tags for this period */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
                    {milestone.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] font-mono text-slate-300 bg-slate-950/70 border border-slate-800 px-2.5 py-1 rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
