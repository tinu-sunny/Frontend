import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  X, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  Loader2, 
  Minimize2,
  Cpu,
  CornerDownLeft
} from 'lucide-react';
import { generateAIResponse } from '../../utils/aiEngine';
import { aiKnowledge } from '../../data/aiKnowledge';
import { AIMessageContent } from './AIMessageContent';
import { TinuDigitalClone } from './TinuDigitalClone';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const INITIAL_WELCOME = {
  id: 'welcome',
  sender: 'assistant',
  text: `Hello! 👋 I'm **MAX**, your standalone portfolio assistant.\n\n Ask me about Tinu's MERN projects, technology stack, internship experience, or availability!`,
  actions: [
    { type: 'navigate', label: 'Explore Projects Section', target: 'projects' },
    { type: 'navigate', label: 'View Skills Matrix', target: 'skills' }
  ],
  followUps: [
    "Tell me about Tinu",
    "Explore his projects",
    "What technologies does he use?",
    "Tell me about his experience",
    "How can I contact him?"
  ],
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const TinuAIChatModal = ({
  isOpen,
  onClose,
  onOpenResume,
  onSelectProject,
  onThinkingChange
}) => {
  const [messages, setMessages] = useState([INITIAL_WELCOME]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatContext, setChatContext] = useState({
    lastIntent: null,
    lastMatchedProjectId: null,
    lastTopic: null,
    turnCount: 0
  });
  const messagesEndRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const lastUserMessageRef = useRef(null);
  const inputRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Smart auto-scroll:
  // - When chat first opens with only the default message, keep it scrolled to the very top (scrollTop = 0).
  // - When user asks a question and AI responds, scroll to the top of the question/answer so the user reads from the beginning.
  useEffect(() => {
    if (!isOpen) return;

    // Initial welcome state: keep scroll at the very top
    if (messages.length <= 1 && !isTyping) {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      return;
    }

    if (isTyping) {
      // While typing, scroll down so typing indicator is visible
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg && lastMsg.sender === 'assistant' && messages.length > 1) {
        // Scroll so the prompt or top of the assistant's response is at the top of the viewport
        if (lastUserMessageRef.current) {
          lastUserMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputText).trim();
    if (!query || isTyping) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    onThinkingChange?.(true);

    // Natural brief local processing delay (350ms) to ensure smooth UX
    setTimeout(() => {
      const response = generateAIResponse(query, chatContext);
      if (response.context) {
        setChatContext(response.context);
      }

      const assistantMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: response.text,
        actions: response.actions || [],
        followUps: response.followUps || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      onThinkingChange?.(false);
    }, 380);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action) => {
    if (!action) return;

    if (action.type === 'navigate' && action.target) {
      const el = document.getElementById(action.target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.type === 'open_resume') {
      onOpenResume?.();
    } else if (action.type === 'view_project' && action.projectId) {
      const foundProject = aiKnowledge.projects.find((p) => p.id === action.projectId);
      if (foundProject) {
        onSelectProject?.(foundProject);
      } else {
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleClearChat = () => {
    setChatContext({
      lastIntent: null,
      lastMatchedProjectId: null,
      lastTopic: null,
      turnCount: 0
    });
    setMessages([
      {
        ...INITIAL_WELCOME,
        id: `welcome-${Date.now()}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-40 top-16 bottom-3 inset-x-3 sm:top-[85px] sm:bottom-6 sm:inset-x-auto sm:right-6 sm:w-[410px] sm:max-h-[calc(100vh-110px)] flex flex-col rounded-3xl bg-[#030914]/95 border border-cyan-500/40 shadow-[0_0_50px_rgba(0,0,0,0.85),0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-2xl overflow-hidden font-sans"
        role="dialog"
        aria-label="Tinu AI Chat Assistant"
        aria-modal="true"
      >
        {/* Futuristic Top Bar / Header (Pinned below navbar) */}
        <div className="shrink-0 relative px-4 py-3.5 border-b border-cyan-500/20 bg-gradient-to-r from-[#051129] via-[#040d21] to-[#030914] flex items-center justify-between select-none">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden bg-cyan-950/80 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.3)]">
              <TinuDigitalClone size={28} isHappy={true} avatarImage="/assets/tinu_digital_avatar.jpg" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black animate-pulse" />
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-heading text-xs sm:text-sm font-bold tracking-wider text-white">
                   MAX HERE
                </span>
                {/* <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold tracking-wider">
                  Assistant
                </span> */}
              </div>
              <span className="text-[10px] font-mono text-cyan-400/80 tracking-widest uppercase flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                How can i help You 
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleClearChat}
              title="Reset conversation transcript"
              aria-label="Reset chat transcript"
              className="p-2 rounded-xl text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 border border-transparent hover:border-cyan-500/30 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              title="Close assistant"
              aria-label="Close assistant"
              className="p-2 rounded-xl text-slate-400 hover:text-rose-300 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Message Transcript Container */}
        <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {messages.map((msg, index) => {
            const isLatestUserMessage =
              msg.sender === 'user' &&
              (index === messages.length - 1 || index === messages.length - 2);

            return (
              <motion.div
                key={msg.id}
                ref={isLatestUserMessage ? lastUserMessageRef : null}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
              <div
                className={`flex gap-2.5 max-w-[88%] ${
                  msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs border ${
                    msg.sender === 'user'
                      ? 'bg-cyan-900/60 border-cyan-400/50 text-cyan-300'
                      : 'bg-slate-900 border-cyan-500/30 text-cyan-400'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`rounded-2xl px-4 py-3 text-xs sm:text-sm ${
                    msg.sender === 'user'
                      ? 'bg-cyan-950/80 border border-cyan-400/50 text-white rounded-tr-sm shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'bg-[#06122b]/85 border border-cyan-500/25 text-slate-200 rounded-tl-sm shadow-md'
                  }`}
                >
                  {msg.sender === 'user' ? (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  ) : (
                    <AIMessageContent content={msg.text} />
                  )}

                  {/* Actions Attached to Message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3 pt-2.5 border-t border-cyan-500/20">
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          type="button"
                          onClick={() => handleActionClick(act)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/70 hover:bg-cyan-900 border border-cyan-400/40 hover:border-cyan-300 text-cyan-300 hover:text-white text-xs font-mono font-medium transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_0_12px_rgba(0,240,255,0.35)]"
                        >
                          <ChevronRight className="w-3 h-3 text-cyan-400" />
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Follow-up suggestions */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-cyan-500/15">
                      <span className="text-[10px] font-mono text-cyan-400/70 block mb-1.5 uppercase tracking-wider">
                        Suggested Inquiries:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.followUps.map((prompt, pIdx) => (
                          <button
                            key={pIdx}
                            type="button"
                            onClick={() => handleSend(prompt)}
                            className="text-[11px] font-mono text-slate-300 hover:text-cyan-200 bg-slate-900/90 hover:bg-cyan-950/90 border border-slate-800 hover:border-cyan-400/50 px-2.5 py-1 rounded-md transition-all cursor-pointer"
                          >
                            {prompt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <span className="text-[9px] font-mono text-slate-500 mt-1 px-10">
                {msg.timestamp}
              </span>
            </motion.div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 pl-2 text-cyan-400 text-xs font-mono"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </div>
              <div className="bg-[#06122b]/80 border border-cyan-500/20 rounded-xl px-3 py-1.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                <span>Consulting local portfolio records...</span>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar Form */}
        <div className="px-4 py-3 bg-[#020610] border-t border-cyan-500/20">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-slate-950/80 border border-slate-800 focus-within:border-cyan-400 focus-within:shadow-[0_0_15px_rgba(0,240,255,0.2)] rounded-2xl p-1.5 transition-all"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              placeholder="Ask about Tinu's projects, stack, or experience..."
              className="flex-1 bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
              aria-label="Send message to Tinu AI"
              className="w-9 h-9 rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 disabled:hover:bg-cyan-400 text-black flex items-center justify-center transition-all cursor-pointer shadow-[0_0_12px_rgba(0,240,255,0.4)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 mt-2 px-1">
            <span>Enter to send • Shift+Enter for newline</span>
            <span className="text-cyan-500/60">Deterministic rule engine</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
