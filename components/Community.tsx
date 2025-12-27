
import React from 'react';
import { ResearchTopic } from '../types';
import { BrandingConfig } from '../App';

interface CommunityProps {
  branding: BrandingConfig;
}

const mockTopics: ResearchTopic[] = [
  {
    id: '1',
    title: 'Optimizing Crop Yield using Low-Cost IoT Sensors',
    author: 'Dr. Sarah Jenkins',
    tags: ['Agriculture', 'IoT', 'Sustainability'],
    description: 'A study on deploying ESP32 based soil sensors in rural farming communities to provide real-time irrigation alerts.',
    likes: 124
  },
  {
    id: '2',
    title: 'User-Centered Design in Mental Health Apps',
    author: 'Alex Rivera',
    tags: ['UX Design', 'Psychology', 'Mobile'],
    description: 'Investigating how simplified interfaces can reduce friction for elderly users seeking mental health support.',
    likes: 89
  },
  {
    id: '3',
    title: 'Decentralized Energy Grids using Blockchain',
    author: 'Priya Sharma',
    tags: ['Cloud', 'Blockchain', 'Energy'],
    description: 'Prototypes for peer-to-peer solar energy sharing in micro-communities using smart contracts.',
    likes: 156
  }
];

// Map tags to specific icons for visual flair
const getTopicIcon = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('agri')) return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
    </svg>
  );
  if (t.includes('ux') || t.includes('design')) return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
    </svg>
  );
  if (t.includes('cloud') || t.includes('energy')) return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
    </svg>
  );
};

const Community: React.FC<CommunityProps> = ({ branding }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="font-black text-xs uppercase tracking-[0.3em] mb-4" style={{ color: branding.color }}>The Global Network</div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Trending Research</h2>
          <p className="text-slate-500 mt-4 text-xl font-medium">See what our community is working on right now across the globe.</p>
        </div>
        <button className="inline-flex items-center px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95">
          View all discussions
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {mockTopics.map((topic) => (
          <div 
            key={topic.id} 
            className="group relative bg-white rounded-[3rem] p-10 border border-slate-100 flex flex-col hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 overflow-hidden"
          >
            {/* Background Accent Gradient */}
            <div 
              className="absolute top-0 left-0 w-full h-2 group-hover:h-3 transition-all duration-500"
              style={{ backgroundColor: branding.color }}
            ></div>
            
            {/* Soft background shape */}
            <div 
              className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-700"
              style={{ backgroundColor: branding.color }}
            ></div>

            <div className="flex items-start justify-between mb-8">
              <div 
                className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm border border-slate-50 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                style={{ backgroundColor: `${branding.color}10`, color: branding.color }}
              >
                {getTopicIcon(topic.tags[0])}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Impact</span>
                <span className="text-sm font-black text-slate-900">{(topic.likes / 10).toFixed(1)}/10</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {topic.tags.map((tag) => (
                <span 
                  key={tag} 
                  className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-slate-100 bg-slate-50 text-slate-500 group-hover:border-transparent group-hover:bg-white transition-colors"
                  style={{ color: branding.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 
              className="text-2xl font-black mb-4 tracking-tight leading-tight transition-colors duration-300 group-hover:translate-x-1"
              style={{ color: branding.color }}
            >
              {topic.title}
            </h3>
            
            <p className="text-slate-500 font-medium mb-10 flex-grow leading-relaxed text-sm">
              {topic.description}
            </p>
            
            <div className="flex items-center justify-between pt-8 border-t border-slate-50">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm border-2 border-white shadow-md transform -rotate-3 group-hover:rotate-0 transition-transform"
                  style={{ backgroundColor: branding.color }}
                >
                  {topic.author.charAt(0)}
                </div>
                <div>
                  <span className="block text-xs font-black text-slate-900 tracking-tight">{topic.author}</span>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Researcher</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-red-500 transition-colors flex items-center gap-1.5">
                   <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                  <span className="text-xs font-black">{topic.likes}</span>
                </button>
              </div>
            </div>

            {/* Hover Action Button */}
            <div className="absolute bottom-6 right-10 translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:pointer-events-auto">
              <button 
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 active:scale-95"
                style={{ backgroundColor: branding.color }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 relative group">
        <div className="absolute -inset-2 bg-gradient-to-r rounded-[3.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" style={{ backgroundImage: `linear-gradient(to r, ${branding.color}, #a855f7)` }}></div>
        <div className="relative bg-[#0a0a0b] rounded-[3rem] p-12 md:p-24 text-center text-white overflow-hidden border border-white/5">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px]" style={{ backgroundColor: branding.color }}></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-1 bg-white mx-auto mb-10 opacity-30 rounded-full"></div>
            <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter leading-none">Ready to contribute?</h3>
            <p className="text-slate-400 text-xl mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
              Whether you are a beginner or an experienced individual, {branding.name} welcomes you to join 
              our community and contribute your unique perspectives to real-world problems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="text-white px-12 py-5 rounded-2xl font-black text-lg hover:opacity-90 transition shadow-2xl active:scale-95"
                style={{ backgroundColor: branding.color }}
              >
                Join the Forum
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition active:scale-95">
                Explore Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
