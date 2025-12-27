
import React, { useState } from 'react';
import { brainstormProblem } from '../services/geminiService';
import { BrainstormResult } from '../types';

const Brainstormer: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BrainstormResult | null>(null);

  const handleBrainstorm = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanProblem = problem.trim();
    if (!cleanProblem || cleanProblem.length < 10) {
      alert('Please provide a more detailed problem description (min 10 characters).');
      return;
    }

    setLoading(true);
    setResult(null); // Clear previous result to show clean loading state
    try {
      const data = await brainstormProblem(cleanProblem);
      setResult(data);
    } catch (error) {
      console.error('Brainstorming error:', error);
      alert('Failed to generate ideas. This could be due to network issues or API limits. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <span className="inline-block px-4 py-1.5 bg-cyan-400/20 text-cyan-300 text-sm font-bold rounded-full mb-4 uppercase tracking-widest border border-cyan-400/30">
          AI-Powered Research Engine
        </span>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Collaborative Brainstormer</h2>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
          Input your research challenge, and GetLiteHub's AI will synthesize a collaborative roadmap and technical framework for your next project.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 blur-3xl rounded-full"></div>
        
        <form onSubmit={handleBrainstorm} className="mb-12 relative z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative group">
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="Describe a problem you want to solve..."
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-5 focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-indigo-300 text-white text-lg transition-all"
                required
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50 group-focus-within:opacity-100 transition-opacity hidden md:block">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-900 font-black px-10 py-5 rounded-2xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:active:scale-100 flex items-center justify-center min-w-[180px] shadow-xl shadow-cyan-900/40"
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin h-6 w-6 text-slate-900 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </div>
              ) : (
                'Synthesize'
              )}
            </button>
          </div>
          <p className="mt-3 text-indigo-300/60 text-xs text-center md:text-left ml-2 italic">
            Powered by Gemini 3 Pro — Experimental Research Assistant
          </p>
        </form>

        {loading && (
          <div className="space-y-10 animate-pulse">
            <div className="bg-white/5 rounded-3xl p-8 border border-white/5 shimmer">
              <div className="h-4 w-24 bg-white/10 rounded mb-4"></div>
              <div className="h-10 bg-white/10 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-white/10 rounded w-1/2"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 h-48 shimmer"></div>
              <div className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 h-48 shimmer"></div>
            </div>
          </div>
        )}

        {result && !loading && (
          <div className="animate-fade-in space-y-10 relative z-10">
            <div className="bg-white/10 rounded-3xl p-8 border border-white/10 shadow-inner">
              <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-4 flex items-center">
                <span className="w-8 h-[2px] bg-cyan-400 mr-3"></span> Strategic Synthesis
              </h3>
              <p className="text-2xl md:text-3xl font-bold leading-tight text-white">{result.suggestedSolution}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-6 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Tech Stack Framework
                </h3>
                <div className="flex flex-wrap gap-3">
                  {result.technologies.map((tech, i) => (
                    <span key={i} className="bg-cyan-500/10 px-4 py-2 rounded-xl text-sm font-medium border border-cyan-500/20 text-cyan-100 hover:bg-cyan-500/20 transition cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors">
                <h3 className="text-xs font-black uppercase tracking-widest text-cyan-400 mb-6 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Collaborative Roadmap
                </h3>
                <div className="space-y-4">
                  {result.collaborativeSteps.map((step, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-sm font-bold group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300">
                        {i + 1}
                      </div>
                      <p className="text-slate-300 text-base leading-relaxed group-hover:text-white transition-colors">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/5 text-center">
              <button 
                onClick={() => window.print()}
                className="text-cyan-400 hover:text-cyan-300 text-sm font-bold uppercase tracking-widest flex items-center justify-center mx-auto transition-all group"
              >
                <svg className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Research Plan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brainstormer;
