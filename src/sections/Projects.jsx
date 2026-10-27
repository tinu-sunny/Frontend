import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Search, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { GithubIcon } from '../components/SocialIcons';
import { projectsData } from '../data/projects';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Projects = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const categories = ['All', 'Full Stack', 'Web Apps', 'AI & Security'];

  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.09,
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
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
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
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            MY PROJECTS
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Ideas • Code • Impact
          </p>
        </motion.div>

        {/* Filter and Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12"
        >
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-cyan-400 text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-slate-900/60 text-slate-300 hover:text-cyan-300 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tech, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/70 border border-cyan-500/20 focus:border-cyan-400 rounded-xl pl-10 pr-4 py-2 text-xs font-mono text-slate-200 placeholder-slate-500 focus:outline-none transition-colors"
            />
          </div>
        </motion.div>

        {/* Projects Grid with Staggered Viewport Reveals */}
        <motion.div
          key={selectedCategory + searchQuery}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: shouldReduceMotion ? 0 : -5,
                borderColor: 'rgba(0, 240, 255, 0.55)',
                boxShadow: '0 12px 35px -10px rgba(0, 240, 255, 0.25)',
              }}
              className="glass-card rounded-2xl overflow-hidden border border-cyan-500/20 flex flex-col justify-between group transition-all duration-300 h-full"
            >
              <div>
                {/* Visual Header / Banner */}
                <div className="relative h-44 w-full bg-gradient-to-br from-cyan-950/40 via-slate-900 to-black overflow-hidden border-b border-cyan-500/20 flex items-center justify-center p-6">
                  {/* Futuristic decorative grid */}
                  <div className="absolute inset-0 cyber-grid opacity-30"></div>
                  
                  {/* Subtle glowing circuit orb with hover expand */}
                  <div className="w-20 h-20 rounded-full bg-cyan-500/15 blur-xl group-hover:scale-150 transition-transform duration-500"></div>

                  <div className="relative z-10 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                      {project.category}
                    </span>
                    <h4 className="font-heading text-lg font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h4>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="p-1.5 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 hover:text-white hover:bg-cyan-500 transition-colors cursor-pointer"
                      title="Inspect Details"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.tagline}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/80 text-[10px] font-mono text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-0.5 rounded-md bg-slate-900/50 text-[10px] font-mono text-slate-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-slate-800/80 mt-auto">
                <button
                  onClick={() => onSelectProject(project)}
                  className="text-xs font-mono uppercase tracking-wider text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold group/btn cursor-pointer"
                >
                  <span>View Details</span>
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 transition-colors"
                    aria-label="Live Demo Link"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12 glass-card rounded-2xl border border-slate-800">
            <p className="text-slate-400 font-mono text-sm">
              No projects found matching "{searchQuery}" in category "{selectedCategory}".
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
