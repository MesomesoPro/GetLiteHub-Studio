
import React from 'react';
import { BrandingConfig } from '../App';

interface SuccessToolsProps {
  branding: BrandingConfig;
}

const tools = [
  {
    title: 'Collaborative Projects',
    description: 'Organize tasks, track progress, and collaborate with your team in real-time on innovative projects.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6" />
      </svg>
    ),
    link: '#projects'
  },
  {
    title: 'Community Forum',
    description: 'Engage in discussions, ask questions, and connect with experts and peers in your field.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    link: '#community'
  },
  {
    title: 'Resource Sharing',
    description: 'Share and discover datasets, articles, and tools to accelerate your research and development.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    link: '#ai-tools'
  }
];

const SuccessTools: React.FC<SuccessToolsProps> = ({ branding }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 reveal">
        <p className="text-slate-500 text-lg md:text-xl max-w-4xl mx-auto font-medium mb-4">
          {branding.name} provides a powerful suite of tools to help you connect, create, and innovate.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {tools.map((tool, idx) => (
          <div 
            key={idx} 
            className={`bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start group reveal delay-${(idx + 1) * 100}`}
          >
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-300"
              style={{ backgroundColor: `${branding.color}15`, color: branding.color }}
            >
              {tool.icon}
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              {tool.title}
            </h3>
            
            <p className="text-slate-500 leading-relaxed mb-10 flex-grow text-lg">
              {tool.description}
            </p>
            
            <a 
              href={tool.link} 
              className="inline-flex items-center font-extrabold text-sm uppercase tracking-widest group/link transition-all"
              style={{ color: branding.color }}
            >
              LEARN MORE
              <svg className="w-5 h-5 ml-2 group-hover/link:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuccessTools;
