import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  FileDown
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from '../components/SocialIcons';
import { profile } from '../data/profile';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Contact = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    // Verified client-side validation state
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10 cyber-grid overflow-hidden">
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
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Open Transmission</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
            LET'S CONNECT
          </h2>
          <p className="font-mono text-cyan-400 text-sm tracking-wider uppercase">
            Have a project in mind or just want to say hi?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Socials (Panel 12) */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div className="glass-card p-8 rounded-3xl border border-cyan-500/20">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
                Coordinates & Direct Line
              </span>
              <h3 className="font-heading text-2xl font-bold text-white mb-6">
                Better Ideas Together
              </h3>

              <div className="space-y-5 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 text-slate-300 hover:text-cyan-300 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Email Address
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {profile.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Phone (Placeholder)
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {profile.phone}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-500 block">
                      Location
                    </span>
                    <span className="font-mono text-xs sm:text-sm font-semibold">
                      {profile.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-8 mt-8 border-t border-slate-800">
                <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-3">
                  Digital Footprint
                </span>
                <div className="flex items-center gap-3">
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={profile.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={profile.socials.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                    aria-label="Twitter / X"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.1, y: -2 }}
                    href={profile.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 flex items-center justify-center text-slate-300 hover:text-cyan-300 transition-all cursor-pointer"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onOpenResume}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-wider bg-cyan-950/30 hover:bg-cyan-950/70 transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Transmission Form */}
          <motion.div
            initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="glass-card p-8 rounded-3xl border border-cyan-500/20 shadow-2xl">
              <h3 className="font-heading text-xl font-bold text-white mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 font-mono mb-6">
                Fill in the transmission parameters below to start a conversation.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl bg-cyan-950/40 border border-cyan-400/50 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-400 mx-auto shadow-[0_0_20px_#00f0ff]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-heading text-xl font-bold text-white">
                    Transmission Validated!
                  </h4>
                  <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-cyan-300">{formData.name}</strong>. Your message details have been validated client-side. You can also reach me directly at <a href={`mailto:${profile.email}`} className="text-cyan-400 underline font-mono">{profile.email}</a>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition-all cursor-pointer"
                  >
                    <span>Send Another Message</span>
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full bg-slate-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                          errors.name
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        }`}
                      />
                      {errors.name && (
                        <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full bg-slate-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all ${
                          errors.email
                            ? 'border-rose-500 focus:border-rose-400'
                            : 'border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        }`}
                      />
                      {errors.email && (
                        <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="Project collaboration / Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-slate-900/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Share details about your project or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className={`w-full bg-slate-900/80 border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all resize-none ${
                        errors.message
                          ? 'border-rose-500 focus:border-rose-400'
                          : 'border-slate-800 focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                      }`}
                    ></textarea>
                    {errors.message && (
                      <span className="text-[11px] text-rose-400 font-mono flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.message}
                      </span>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
                    whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-4 rounded-xl font-heading text-sm font-bold tracking-widest uppercase text-black bg-cyan-400 hover:bg-cyan-300 transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.5)] hover:shadow-[0_0_30px_rgba(0,240,255,0.8)] disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <span>Validating Transmission...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-black" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
