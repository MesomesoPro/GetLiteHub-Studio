
import React, { useState } from 'react';
import { suggestTopics } from '../services/geminiService';

const TopicSuggester: React.FC = () => {
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!interests.trim()) return;

    setLoading(true);
    try {
      const suggestions = await suggestTopics(interests);
      setResults(suggestions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-full flex items-center">
      <div className="bg-indigo-50/50 rounded-[2.5rem] border border-indigo-100 p-8 md:p-12 shadow-sm relative overflow-hidden w-full">
        {/* Background Sparkle Decoration */}
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <svg className="w-32 h-32 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
            Research Topic Suggester
          </h2>
          <p className="text-slate-600 text-lg mb-8 max-w-2xl">
            Enter a few of your interests, and we'll generate some ideas to get you started.
          </p>

          <form onSubmit={handleSuggest} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <input
                type="text"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                placeholder="e.g., machine learning, IoT, cloud computing"
                className="w-full bg-white border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-lg"
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                </svg>
              )}
              Suggest Topics
            </button>
          </form>

          <p className="text-slate-500 text-center md:text-left mb-6 italic text-[14px]">
            Use our AI to brainstorm research topics. Just input your fields of interest, and get a list of relevant, inspiring ideas to explore.
          </p>

          {results.length > 0 && (
            <div className="animate-fade-in space-y-4 pt-6 border-t border-indigo-100 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
              <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">AI Suggestions</h3>
              <div className="grid gap-3">
                {results.map((topic, i) => (
                  <div key={i} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-indigo-200 transition-colors flex items-start group">
                    <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0 mr-4 font-bold text-xs">
                      {i + 1}
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed group-hover:text-indigo-700 transition-colors text-sm md:text-base">
                      {topic}
                    </p>
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

export default TopicSuggester;
