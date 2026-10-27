import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, FileText, Send, ChevronRight } from 'lucide-react';
import { profile } from '../data/profile';

export const Navbar = ({ onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Lab', href: '#lab' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030712]/85 backdrop-blur-md border-b border-cyan-500/20 py-3 shadow-lg shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_12px_rgba(0,240,255,0.5)] transition-all">
              <Terminal className="w-4 h-4 text-cyan-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-sm sm:text-base font-bold tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                {profile.name}
              </span>
              <span className="text-[10px] text-cyan-400/80 tracking-widest uppercase flex items-center gap-1 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Available for Work
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/40 backdrop-blur-md border border-cyan-500/15 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-wider font-mono text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 px-3 py-1.5 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/30 hover:border-cyan-400 px-3.5 py-2 rounded-lg transition-all shadow-[0_0_10px_rgba(0,240,255,0.1)] hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>

            <a
              href="#contact"
              className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black bg-cyan-400 hover:bg-cyan-300 font-semibold px-4 py-2 rounded-lg transition-all shadow-[0_0_15px_rgba(0,240,255,0.4)] hover:shadow-[0_0_20px_rgba(0,240,255,0.7)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Let's Talk</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900/60 border border-cyan-500/30 text-cyan-400 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#030712]/95 backdrop-blur-xl border-b border-cyan-500/20 px-6 py-6 transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between text-sm uppercase font-mono tracking-wider text-slate-200 hover:text-cyan-400 py-2 border-b border-slate-800/80"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-cyan-400/50" />
              </a>
            ))}
            <div className="flex flex-col gap-2.5 pt-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-cyan-500/40 text-cyan-300 bg-cyan-950/40 font-mono text-xs uppercase tracking-wider"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-cyan-400 text-black font-semibold font-mono text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,240,255,0.4)]"
              >
                <Send className="w-4 h-4" />
                <span>Let's Talk</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
