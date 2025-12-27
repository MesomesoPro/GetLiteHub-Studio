
import React from 'react';
import InspireSlider from './InspireSlider';
import { BrandingConfig } from '../App';

interface HeroProps {
  branding: BrandingConfig;
}

const Hero: React.FC<HeroProps> = ({ branding }) => {
  const getLightColor = (hex: string) => `${hex}15`;

  const researchFields = [
    'Artificial Intelligence', 'IoT Systems', 'Sustainable Agriculture', 
    'HealthTech', 'Renewable Energy', 'Blockchain', 'UX Research'
  ];

  return (
    <div className="relative bg-white overflow-hidden min-h-screen flex flex-col">
      {/* Premium Background Mesh */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[1000px] h-[1000px] bg-slate-50 rounded-full blur-[160px] opacity-40 pointer-events-none animate-pulse" style={{ backgroundColor: getLightColor(branding.color) }}></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[800px] h-[800px] bg-blue-50 rounded-full blur-[140px] opacity-30 pointer-events-none" style={{ backgroundColor: getLightColor(branding.color) }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 lg:pt-56 lg:pb-32 relative z-10 flex-grow">
        <div className="flex flex-col lg:flex-row lg:items-center gap-20">
          {/* Headline Content */}
          <div className="lg:w-3/5 text-center lg:text-left">
            <div 
              className="inline-flex items-center px-4 py-2 rounded-full text-xs font-black mb-10 animate-fade-in border transition-all shadow-sm tracking-widest uppercase"
              style={{ 
                backgroundColor: getLightColor(branding.color),
                color: branding.color,
                borderColor: `${branding.color}20`
              }}
            >
              <span className="flex h-2 w-2 rounded-full mr-3 animate-ping" style={{ backgroundColor: branding.color }}></span>
              Researcher Network 2025
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-black text-[#0f172a] mb-10 tracking-tighter leading-[0.9] transition-all">
              Empowering <br />
              <span 
                className="text-transparent bg-clip-text" 
                style={{ 
                  backgroundImage: `linear-gradient(135deg, ${branding.color} 0%, #3b82f6 100%)`,
                  WebkitBackgroundClip: 'text'
                }}
              >
                Innovation.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
              A dynamic research ecosystem where minds converge to build the future. Join {branding.name} to share ideas, collaborate on labs, and design user-centered solutions.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-16">
              <a 
                href="#brainstormer" 
                className="inline-flex items-center justify-center px-10 py-5 text-white text-lg font-black rounded-2xl hover:opacity-95 transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95 group"
                style={{ 
                  backgroundColor: branding.color,
                  boxShadow: `0 20px 40px -10px ${branding.color}40`
                }}
              >
                Launch Your Idea
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              
              <a href="#about" className="inline-flex items-center justify-center px-10 py-5 bg-white border border-slate-200 text-slate-700 text-lg font-black rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
                Learn More
              </a>
            </div>

            {/* Fields Ticker - Added for "Completeness" */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 opacity-60">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 w-full mb-2 text-center lg:text-left">Core Research Disciplines</span>
              {researchFields.slice(0, 5).map(field => (
                <span key={field} className="px-3 py-1 bg-slate-100/50 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider border border-slate-200/50">
                  {field}
                </span>
              ))}
            </div>
          </div>

          {/* Side Abstract Element */}
          <div className="hidden lg:block lg:w-2/5 relative">
            <div className="w-full aspect-square rounded-[4rem] bg-gradient-to-br from-slate-50 to-white border border-slate-100 shadow-inner flex items-center justify-center group overflow-hidden">
               <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10"></div>
               <div className="text-center p-12 transition-transform duration-700 group-hover:scale-105">
                 <div className="w-24 h-24 rounded-[2rem] mx-auto mb-8 shadow-2xl flex items-center justify-center text-white text-4xl font-black" style={{ backgroundColor: branding.color }}>
                   {branding.name.charAt(0)}
                 </div>
                 <h3 className="text-2xl font-black text-slate-900 mb-2">Research. Forge.</h3>
                 <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">The GetLiteHub Standard</p>
               </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Discover</span>
          <div className="w-[2px] h-12 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-full h-1/2 bg-blue-500 animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Interactive Inspiration Module - Re-designed for high impact */}
      <div className="relative mt-20 pt-32 pb-32 bg-[#fafbff] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-24">
            <div className="inline-flex items-center justify-center space-x-12 mb-12">
              <span className="h-[2px] w-24 sm:w-48 bg-gradient-to-r from-transparent to-slate-200 rounded-full"></span>
              <span className="font-black text-base sm:text-2xl uppercase tracking-[0.6em] whitespace-nowrap" style={{ color: branding.color }}>Ignite Your Mind</span>
              <span className="h-[2px] w-24 sm:w-48 bg-gradient-to-l from-transparent to-slate-200 rounded-full"></span>
            </div>
            
            <h2 className="text-5xl md:text-8xl lg:text-[8rem] font-black text-slate-900 mb-10 tracking-tighter leading-none">
              Fuel Your <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to r, ${branding.color}, #6366f1)`, WebkitBackgroundClip: 'text' }}>Curiosity</span>
            </h2>
            
            <p className="text-xl md:text-3xl text-slate-400 font-medium max-w-3xl mx-auto italic leading-relaxed">
              "Transforming abstract ideas into tangible innovations through disciplined research."
            </p>
          </div>
          
          <InspireSlider />
        </div>
      </div>
    </div>
  );
};

export default Hero;
