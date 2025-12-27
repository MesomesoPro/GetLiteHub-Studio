
import React, { useState } from 'react';
import { generateFramework } from '../services/geminiService';

const SmartFramework: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{methodology: string, phases: {title: string, details: string}[]} | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem.trim()) return;

    setLoading(true);
    try {
      const data = await generateFramework(problem);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex items-center">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 md:p-12 shadow-xl shadow-slate-100 relative overflow-hidden w-full">
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">Smart Project Framework</h2>
          </div>

          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            Stuck on how to start? Enter your research problem, and our AI will generate a structured methodology for you.
          </p>

          <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="e.g., How to reduce plastic waste..."
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#0066ff] hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-2xl flex items-center justify-center transition-all disabled:opacity-50 whitespace-nowrap shadow-lg shadow-blue-200"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
              Generate Framework
            </button>
          </form>

          <p className="text-slate-500 text-center md:text-left mb-6 text-[14px] leading-relaxed">
            Our AI can help you structure your project. Provide a problem statement, and get a clear, step-by-step framework to guide your research.
          </p>

          {result && !loading && (
            <div className="animate-fade-in mt-8 space-y-6 pt-8 border-t border-slate-100 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Core Methodology</h3>
                <p className="text-slate-800 text-lg font-medium leading-relaxed">{result.methodology}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {result.phases.map((phase, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <h4 className="font-bold text-slate-900">{phase.title}</h4>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">{phase.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartFramework;
