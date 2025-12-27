
import React from 'react';
import { BrandingConfig } from '../App';

interface CTAProps {
  branding: BrandingConfig;
}

const CTA: React.FC<CTAProps> = ({ branding }) => {
  return (
    <section className="py-40 bg-white relative overflow-hidden">
      {/* Subtle Mesh Glows */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-50/50 rounded-full blur-3xl opacity-60"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
        <div className="max-w-4xl mx-auto lg:mx-0">
          <h2 className="text-6xl md:text-8xl font-black text-[#0f172a] mb-10 tracking-tighter leading-[0.95]">
            Empowering Research <br className="hidden md:block" />
            <span style={{ color: branding.color }}>and Innovation.</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-500 mb-14 max-w-2xl leading-relaxed font-medium mx-auto lg:mx-0">
            Join a vibrant community of creators and collaborators. Discover projects, share resources, and bring your ideas to life.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
            <a 
              href="#brainstormer" 
              className="inline-flex items-center justify-center px-12 py-6 text-white text-lg font-black rounded-2xl hover:opacity-90 transition-all shadow-2xl transform hover:-translate-y-1 active:scale-95 group"
              style={{ 
                backgroundColor: branding.color,
                boxShadow: `0 20px 40px -10px ${branding.color}40`
              }}
            >
              Get Started for Free
              <svg className="w-5 h-5 ml-3 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            
            <a href="#about" className="inline-flex items-center justify-center px-12 py-6 bg-[#f1f5f9] text-slate-800 text-lg font-black rounded-2xl hover:bg-[#e2e8f0] transition-all">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
