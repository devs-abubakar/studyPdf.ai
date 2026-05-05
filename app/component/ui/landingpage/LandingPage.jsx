"use client"

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Upload, 
  MessageSquare, 
  Zap, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Search,
  BookOpen,
  Layout,
  Menu,
  X
} from 'lucide-react';
import Link from 'next/link';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFCFB]/80 backdrop-blur-md border-b border-[#FF70BF]/10">
      <div className="max-w-7xl mx-auto px-12">
        <div className="flex justify-between h-24 items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center shadow-lg">
              <BookOpen size={20} className="text-white" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tighter text-[#831C91]">
              studyPdf<span className="text-[#D552A3]">.ai</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-bold text-[#D552A3] hover:text-[#831C91] transition-colors uppercase tracking-wider">Features</a>
            <a href="#how-it-works" className="text-sm font-bold text-[#D552A3] hover:text-[#831C91] transition-colors uppercase tracking-wider">How it works</a>
            <button className="px-8 py-2.5 border-2 border-[#D552A3] rounded-full text-[#D552A3] font-bold text-sm hover:bg-[#D552A3] hover:text-white transition-all">
              <Link href="/signUp">
                Login
                </Link>
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-4 py-6"
        >
          <div className="flex flex-col gap-4">
            <a href="#features" className="text-lg font-medium text-gray-600">Features</a>
            <a href="#how-it-works" className="text-lg font-medium text-gray-600">How it works</a>
            <a href="#pricing" className="text-lg font-medium text-gray-600">Pricing</a>
            <button className="bg-brand-purple text-white px-6 py-3 rounded-xl font-semibold text-center">
              Get Started
            </button>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- Landing Page Sections ---

const Hero = () => {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Artistic Background Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#831C91]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF70BF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            <div className="inline-block px-4 py-1 rounded-full bg-[#FF70BF]/10 text-[#D552A3] text-xs font-black uppercase tracking-[0.2em] mb-8 border border-[#FF70BF]/20">
              AI-Powered Research Assistant
            </div>
            
            <h1 className="font-display text-6xl lg:text-[72px] font-black text-[#831C91] leading-[1.05] mb-8">
              Don't just read. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91]">
                Understand.
              </span>
            </h1>
            
            <p className="text-xl text-[#D552A3] mb-10 leading-relaxed font-sans max-w-lg opacity-90">
              Upload any PDF and start a conversation. Summarize complex chapters, clarify obscure topics, and extract insights in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-16">
              <button className="bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91] text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,112,191,0.3)]">
                Upload your PDF
              </button>
              <button className="bg-transparent border-2 border-[#FF70BF]/30 text-[#D552A3] px-10 py-5 rounded-2xl font-black text-lg hover:bg-[#FF70BF]/5 transition-all">
                Watch Demo
              </button>
            </div>

            {/* Micro Metrics */}
            <div className="flex items-center space-x-12 border-t border-[#FF70BF]/10 pt-10">
              <div>
                <div className="text-3xl font-black text-[#831C91]">1.2M+</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-[#D552A3] mt-1">Documents Parsed</div>
              </div>
              <div className="w-px h-10 bg-[#FF70BF]/20"></div>
              <div>
                <div className="text-3xl font-black text-[#831C91]">99.8%</div>
                <div className="text-[10px] uppercase font-black tracking-widest text-[#D552A3] mt-1">Accuracy Rate</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 relative"
          >
             {/* Central Mockup Card from Theme */}
            <div className="relative w-full max-w-[480px] ml-auto p-4 bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(131,28,145,0.15)] border border-[#FF70BF]/10">
              <div className="flex items-center space-x-4 mb-8 border-b border-gray-50 pb-6 p-4">
                <div className="w-12 h-12 bg-[#FF70BF]/10 rounded-2xl flex items-center justify-center text-[#FF70BF]">
                  <FileText />
                </div>
                <div>
                  <div className="text-sm font-black text-[#831C91]">quantum_physics_v3.pdf</div>
                  <div className="text-[10px] font-bold text-[#D552A3]/50 uppercase tracking-tighter">12.4 MB • 42 Pages</div>
                </div>
              </div>
              
              <div className="space-y-6 px-4 pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#831C91] shrink-0 flex items-center justify-center text-[10px] text-white font-bold">AI</div>
                  <div className="bg-[#FF70BF]/5 p-4 rounded-3xl rounded-tl-none text-xs text-[#831C91] leading-relaxed border border-[#FF70BF]/10">
                    I've analyzed the core arguments. You'll find three main components regarding quantum entanglement on page 14.
                  </div>
                </div>
                <div className="flex items-start justify-end gap-4">
                  <div className="bg-gradient-to-r from-[#FF70BF] to-[#D552A3] p-4 rounded-3xl rounded-tr-none text-xs text-white leading-relaxed font-bold shadow-lg shadow-pink-100">
                    Summarize the paradox in simple terms.
                  </div>
                </div>
                <div className="h-2 bg-[#FF70BF]/5 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    className="h-full bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91]" 
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Tags */}
            <div className="absolute top-10 right-0 bg-white px-5 py-3 rounded-2xl shadow-xl border border-[#FF70BF]/20 flex items-center space-x-3 z-30">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-[11px] font-black uppercase text-[#831C91] tracking-wider">AI Summarizing...</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon: Icon, title, description, color }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" size={28} />
      </div>
      <h3 className="font-display font-bold text-xl mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Master your materials <span className="text-brand-pink">faster</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 font-sans">
            Designed for students, researchers, and professionals who need to process deep information without the overwhelm.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={Upload} 
            color="bg-brand-pink"
            title="Instant Upload" 
            description="Drag and drop any PDF. We support research papers, textbooks, and multi-page reports with OCR capabilities."
          />
          <FeatureCard 
            icon={MessageSquare} 
            color="bg-brand-pink-dark"
            title="Contextual Chat" 
            description="Ask specific questions about charts, tables, or complex paragraphs. Get answers with direct source citations."
          />
          <FeatureCard 
            icon={Zap} 
            color="bg-brand-purple"
            title="Smart Summaries" 
            description="Generate executive summaries, key takeaways, or study questions instantly using advanced language models."
          />
        </div>
      </div>
    </section>
  );
};

const InteractiveSVGSection = () => {
  return (
    <section className="py-24 bg-brand-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight">
              Visual Learning <br />
              <span className="text-brand-purple">Reinforced by AI</span>
            </h2>
            
            <div className="space-y-6">
              {[
                { title: "Deep Analysis", desc: "Our AI reads between the lines to find hidden patterns." },
                { title: "Citation Engine", desc: "Every answer comes with page numbers and highlights." },
                { title: "Multi-Language Support", desc: "Upload in any language, chat in your own." }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-brand-pink/20 flex items-center justify-center text-brand-pink shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-10 inline-flex items-center gap-2 font-bold text-brand-purple hover:gap-4 transition-all">
              Learn about our engine <ArrowRight size={20} />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square w-full max-w-md mx-auto"
            >
              {/* Complex Interactive SVG Illustration */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
                <defs>
                  <filter id="shadow">
                    <feDropShadow dx="0" dy="10" stdDeviation="15" floodOpacity="0.1" />
                  </filter>
                </defs>
                
                {/* Background Shapes */}
                <motion.rect 
                  animate={{ 
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  x="50" y="50" width="300" height="300" rx="60" fill="#FF70BF" fillOpacity="0.05" 
                />
                
                {/* The "PDF" */}
                <rect x="120" y="100" width="160" height="200" rx="12" fill="white" filter="url(#shadow)" />
                <rect x="140" y="130" width="120" height="8" rx="4" fill="#eee" />
                <rect x="140" y="150" width="90" height="8" rx="4" fill="#eee" />
                <rect x="140" y="170" width="110" height="8" rx="4" fill="#eee" />
                
                {/* AI "Pulse" */}
                <motion.circle 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  cx="280" cy="280" r="40" fill="#831C91" fillOpacity="0.1" 
                />
                
                {/* Chat Bubble */}
                <motion.g
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <path d="M250 240 C 250 220, 350 220, 350 240 C 350 260, 310 260, 300 280 C 290 260, 250 260, 250 240" fill="white" filter="url(#shadow)" />
                  <path d="M280 240 H320 M280 250 H305" stroke="#FF70BF" strokeWidth="4" strokeLinecap="round" />
                </motion.g>

                {/* Connections */}
                <motion.path 
                  d="M180 180 L 280 240" 
                  stroke="#FF70BF" 
                  strokeWidth="2" 
                  strokeDasharray="5 5"
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-purple rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Accent Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-pink/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-pink-dark/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-8">
              Ready to learn smarter?
            </h2>
            <p className="max-w-xl mx-auto text-brand-pink/80 text-lg md:text-xl mb-12">
              Join 50,000+ students and researchers saving hours every week. Upload your first PDF in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand-purple px-10 py-5 rounded-full font-bold text-lg hover:scale-105 active:scale-95 transition-all">
                Get Started for Free
              </button>
              <button className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                View Enterprise Plans
              </button>
            </div>
            
            <p className="mt-8 text-white/40 text-sm">
              No credit card required • GDPR Compliant • AES-256 Encryption
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 bg-white/50 backdrop-blur-md border-t border-[#FF70BF]/10">
      <div className="max-w-7xl mx-auto px-12 mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-[10px] uppercase tracking-[0.3em] font-black text-[#D552A3]/50">Trusted by researchers at</div>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-30 items-center">
            <span className="font-serif text-xl font-black">STANFORD</span>
            <span className="font-serif text-xl font-black">MIT</span>
            <span className="font-serif text-xl font-black">HARVARD</span>
            <span className="font-serif text-xl font-black">OXFORD</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-12 pt-12 border-t border-[#FF70BF]/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center">
            <BookOpen size={16} className="text-white" />
          </div>
          <span className="font-display font-bold text-xl text-[#831C91]">studyPdf<span className="text-[#D552A3]">.ai</span></span>
        </div>
        
        <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-[#D552A3]/60">
          <a href="#" className="hover:text-[#831C91] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#831C91] transition-colors">Terms</a>
          <a href="#" className="hover:text-[#831C91] transition-colors">Twitter</a>
          <a href="#" className="hover:text-[#831C91] transition-colors">Contact</a>
        </div>
        
        <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
          © 2026 studyPdf.ai.
        </p>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen font-sans overflow-hidden">
      <Navbar />
      <Hero />
      <Features />
      <InteractiveSVGSection />
      <CTA />
      <Footer />
    </div>
  );
}
