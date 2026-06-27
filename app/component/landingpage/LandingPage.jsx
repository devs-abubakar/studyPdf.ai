"use client"

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  MessageSquare, 
  Zap, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen,
  Menu,
  X,
  Cat
} from 'lucide-react';
import Link from 'next/link';

// --- Shared Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFCFB]/80 backdrop-blur-md border-b border-[#FF70BF]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center shadow-lg">
              <BookOpen size={18} className="text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#831C91]">
              studyPdf<span className="text-[#D552A3]">.ai</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-[#D552A3] hover:text-[#831C91] transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-semibold text-[#D552A3] hover:text-[#831C91] transition-colors">How it works</a>
            <a 
              href="https://github.com/devs-abubakar/studyPdf.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-semibold text-[#D552A3] hover:text-[#831C91] transition-colors"
            >
              <Cat size={16} />
              Source
            </a>
            <Link href="/signIn">
              <button className="px-6 py-2.5 border-2 border-[#D552A3] rounded-full text-[#D552A3] font-bold text-sm hover:bg-[#D552A3] hover:text-white transition-all">
                Sign In
              </button>
            </Link>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-b border-gray-100 px-6 py-6"
        >
          <div className="flex flex-col gap-5">
            <a href="#features" className="text-base font-semibold text-[#D552A3]" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-base font-semibold text-[#D552A3]" onClick={() => setIsOpen(false)}>How it works</a>
            <a href="https://github.com/devs-abubakar/studyPdf.ai" target="_blank" rel="noopener noreferrer" className="text-base font-semibold text-[#D552A3]">GitHub</a>
            <Link href="/signIn">
              <button className="bg-gradient-to-r from-[#FF70BF] to-[#831C91] text-white px-6 py-3 rounded-xl font-semibold text-center w-full">
                Sign In
              </button>
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

// --- Landing Page Sections ---

const Hero = () => {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#831C91]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FF70BF]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left"
          >
            {/* Honest badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF70BF]/10 text-[#D552A3] text-xs font-bold uppercase tracking-[0.15em] mb-8 border border-[#FF70BF]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D552A3] animate-pulse" />
              Open Source · Built with LangChain + Supabase
            </div>
            
            <h1 className="text-5xl lg:text-[68px] font-black text-[#831C91] leading-[1.05] mb-6">
              Don't just read. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91]">
                Understand.
              </span>
            </h1>
            
            <p className="text-lg text-[#5a2d6e] mb-10 leading-relaxed max-w-lg opacity-80">
              Upload any PDF and ask questions in plain language. 
              Answers are grounded in your document — not hallucinated — 
              using RAG with Max Marginal Relevance retrieval.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-14">
              <Link href="/signIn">
                <button className="bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91] text-white px-9 py-4 rounded-2xl font-black text-base hover:scale-105 active:scale-95 transition-all shadow-[0_16px_40px_rgba(255,112,191,0.3)]">
                  Try it free →
                </button>
              </Link>
              <a 
                href="https://github.com/devs-abubakar/studyPdf.ai"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2 bg-transparent border-2 border-[#FF70BF]/30 text-[#D552A3] px-9 py-4 rounded-2xl font-black text-base hover:bg-[#FF70BF]/5 transition-all">
                  <Cat size={18} />
                  View Source
                </button>
              </a>
            </div>

            {/* Honest tech stack pills instead of fake stats */}
            <div className="flex flex-wrap gap-2">
              {['Next.js', 'LangChain', 'Supabase', 'OpenAI', 'RAG + MMR', 'Streaming'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full bg-[#831C91]/8 border border-[#FF70BF]/15 text-[#831C91] text-xs font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Mockup card — unchanged, it's good */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative w-full max-w-[460px] ml-auto p-4 bg-white rounded-[36px] shadow-[0_32px_64px_-16px_rgba(131,28,145,0.15)] border border-[#FF70BF]/10">
              <div className="flex items-center space-x-4 mb-6 border-b border-gray-50 pb-5 p-4">
                <div className="w-11 h-11 bg-[#FF70BF]/10 rounded-2xl flex items-center justify-center text-[#FF70BF]">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-sm font-black text-[#831C91]">quantum_mechanics.pdf</div>
                  <div className="text-[10px] font-bold text-[#D552A3]/50 uppercase tracking-tighter">8.2 MB • 38 Pages</div>
                </div>
              </div>
              
              <div className="space-y-5 px-4 pb-4">
                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-[#831C91] shrink-0 flex items-center justify-center text-[9px] text-white font-bold">AI</div>
                  <div className="bg-[#FF70BF]/5 p-4 rounded-3xl rounded-tl-none text-xs text-[#831C91] leading-relaxed border border-[#FF70BF]/10">
                    Based on page 14, the Schrödinger equation describes how quantum state evolves over time. Here's the key part relevant to your question...
                  </div>
                </div>
                <div className="flex items-start justify-end gap-3">
                  <div className="bg-gradient-to-r from-[#FF70BF] to-[#D552A3] p-4 rounded-3xl rounded-tr-none text-xs text-white leading-relaxed font-semibold shadow-lg shadow-pink-100 max-w-[75%]">
                    Explain the wave function collapse in simple terms.
                  </div>
                </div>
                <div className="h-1.5 bg-[#FF70BF]/8 w-full rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "66%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#FF70BF] via-[#D552A3] to-[#831C91]" 
                  />
                </div>
              </div>
            </div>
            
            <div className="absolute top-8 -right-2 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#FF70BF]/15 flex items-center space-x-2 z-30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-[10px] font-black uppercase text-[#831C91] tracking-wider">Streaming response...</span>
            </div>

            {/* Source citation badge — shows real feature */}
            <div className="absolute -bottom-4 left-4 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#FF70BF]/15 flex items-center space-x-2 z-30">
              <CheckCircle2 size={12} className="text-[#D552A3]" />
              <span className="text-[10px] font-black uppercase text-[#831C91] tracking-wider">Source: page 14</span>
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
      whileHover={{ y: -8 }}
      className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
        <Icon className="text-white" size={22} />
      </div>
      <h3 className="font-bold text-xl mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-500 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
};

const Features = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#831C91] mb-5">
            Built different
          </h2>
          <p className="max-w-xl mx-auto text-base text-[#5a2d6e]/70 leading-relaxed">
            Most PDF tools repeat irrelevant chunks. This one uses MMR retrieval 
            to reduce repetition and keep answers grounded in what you actually uploaded.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Upload} 
            color="bg-[#FF70BF]"
            title="Upload any PDF" 
            description="Drop in research papers, textbooks, or long reports. Text is chunked and embedded for accurate retrieval — not just keyword search."
          />
          <FeatureCard 
            icon={MessageSquare} 
            color="bg-[#D552A3]"
            title="Ask real questions" 
            description="Ask about specific tables, arguments, or paragraphs. Answers include the exact source chunk so you can verify them yourself."
          />
          <FeatureCard 
            icon={Zap} 
            color="bg-[#831C91]"
            title="Streaming responses" 
            description="Answers stream in real-time like ChatGPT — no waiting for a full response before you start reading."
          />
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Upload your PDF",
      description: "Your document is parsed, split into semantic chunks, and embedded using OpenAI's embedding model."
    },
    {
      number: "02", 
      title: "Ask a question",
      description: "Your query is embedded and compared against document chunks using vector similarity search with MMR to reduce repetition."
    },
    {
      number: "03",
      title: "Get a grounded answer",
      description: "The most relevant chunks are passed as context to the LLM. Answers stay within your document — no hallucination."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-[#FFFCFB]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#831C91] mb-5">
            How it works
          </h2>
          <p className="max-w-xl mx-auto text-base text-[#5a2d6e]/70">
            RAG architecture — Retrieval Augmented Generation. Your document is the source of truth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-8 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-gradient-to-r from-[#FF70BF]/30 via-[#D552A3]/50 to-[#831C91]/30" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className="relative flex flex-col items-start"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center mb-6 shadow-lg shadow-pink-100 z-10">
                <span className="text-white font-black text-sm">{step.number}</span>
              </div>
              <h3 className="font-black text-lg text-[#831C91] mb-3">{step.title}</h3>
              <p className="text-[#5a2d6e]/70 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Architecture — honest and technical */}
        <div className="mt-16 p-8 bg-white rounded-3xl border border-[#FF70BF]/10 shadow-sm">
          <p className="text-xs font-black uppercase tracking-widest text-[#D552A3]/60 mb-6">Architecture</p>
          <div className="flex flex-wrap items-center gap-2 text-sm font-mono text-[#831C91]">
            {[
              'PDF Upload',
              '→',
              'Text Extraction',
              '→',
              'Chunking',
              '→',
              'OpenAI Embeddings',
              '→',
              'Supabase pgvector',
              '→',
              'MMR Retrieval',
              '→',
              'LangChain LLM',
              '→',
              'Streaming Answer'
            ].map((item, i) => (
              <span 
                key={i} 
                className={item === '→' 
                  ? 'text-[#FF70BF] font-bold' 
                  : 'px-3 py-1.5 bg-[#FF70BF]/8 rounded-lg text-xs border border-[#FF70BF]/15'
                }
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-gradient-to-br from-[#831C91] to-[#5a1065] rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF70BF]/15 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FF70BF]/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Stop skimming.<br />Start understanding.
            </h2>
            <p className="max-w-md mx-auto text-[#FF70BF]/80 text-base mb-10 leading-relaxed">
              Upload a PDF and ask your first question in under 30 seconds. 
              No credit card. No setup. Just answers from your document.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signIn">
                <button className="bg-white text-[#831C91] px-10 py-4 rounded-full font-black text-base hover:scale-105 active:scale-95 transition-all shadow-lg">
                  Try it free →
                </button>
              </Link>
              <a href="https://github.com/devs-abubakar/studyPdf.ai" target="_blank" rel="noopener noreferrer">
                <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-full font-black text-base hover:bg-white/10 transition-all">
                  <Cat size={18} />
                  Star on GitHub
                </button>
              </a>
            </div>

            <p className="mt-8 text-white/30 text-xs font-semibold uppercase tracking-wider">
              Open source · Built by Abubakar · Self-taught · Pre-university
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-white border-t border-[#FF70BF]/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF70BF] to-[#831C91] flex items-center justify-center">
            <BookOpen size={15} className="text-white" />
          </div>
          <span className="font-bold text-lg text-[#831C91]">studyPdf<span className="text-[#D552A3]">.ai</span></span>
        </div>
        
        <div className="flex gap-8 text-xs font-bold uppercase tracking-widest text-[#D552A3]/60">
          <a href="https://github.com/devs-abubakar/studyPdf.ai" target="_blank" rel="noopener noreferrer" className="hover:text-[#831C91] transition-colors flex items-center gap-1">
            <Cat size={12} /> Source
          </a>
          <a href="#" className="hover:text-[#831C91] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#831C91] transition-colors">Contact</a>
        </div>
        
        <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest">
          © 2026 studyPdf.ai
        </p>
      </div>
    </footer>
  );
};

export default function LandingPage() {
  return (
    <div className="w-full min-h-screen font-sans overflow-hidden bg-[#FFFCFB]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}