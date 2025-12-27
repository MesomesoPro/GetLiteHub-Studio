
import React from 'react';
import { BrandingConfig } from '../App';

interface FooterProps {
  branding: BrandingConfig;
}

const Footer: React.FC<FooterProps> = ({ branding }) => {
  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'hero' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer id="footer" className="bg-slate-900 text-slate-300 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <button 
              onClick={(e) => handleNavClick(e, 'hero')}
              className="text-2xl font-bold text-white mb-6 block hover:opacity-80 transition-opacity"
            >
              {branding.name}
            </button>
            <p className="text-slate-400 max-w-sm mb-6 font-medium">
              A dynamic research forum that brings together individuals from various fields to collaborate and share ideas. 
              Let's work together to create a better future!
            </p>
            <div className="flex space-x-6">
              <span className="hover:text-white transition-colors cursor-pointer">Twitter</span>
              <span className="hover:text-white transition-colors cursor-pointer">GitHub</span>
              <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={(e) => handleNavClick(e, 'about')} className="hover:text-white transition-colors text-left">About Us</button></li>
              <li><button onClick={(e) => handleNavClick(e, 'ai-tools')} className="hover:text-white transition-colors text-left">AI Lab Suite</button></li>
              <li><button onClick={(e) => handleNavClick(e, 'success-tools')} className="hover:text-white transition-colors text-left">Success Tools</button></li>
              <li><button onClick={(e) => handleNavClick(e, 'brainstormer')} className="hover:text-white transition-colors text-left">Brainstormer</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Explore</h4>
            <ul className="space-y-4 font-medium">
              <li><button onClick={(e) => handleNavClick(e, 'projects')} className="hover:text-white transition-colors text-left">Research Labs</button></li>
              <li><button onClick={(e) => handleNavClick(e, 'community')} className="hover:text-white transition-colors text-left">Community Forum</button></li>
              <li><button onClick={(e) => handleNavClick(e, 'features')} className="hover:text-white transition-colors text-left">Features</button></li>
              <li><span className="hover:text-white transition-colors cursor-pointer text-left">Help Center</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-12 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} {branding.name} Research Forum. All rights reserved.</p>
          <div className="flex gap-8 font-medium">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
