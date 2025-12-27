
import React, { useState, useEffect } from 'react';
import { BrandingConfig } from '../App';

interface NavbarProps {
  onLogin?: () => void;
  branding: BrandingConfig;
}

const Navbar: React.FC<NavbarProps> = ({ onLogin, branding }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setLogoError(false);
  }, [branding.logo]);

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Labs', id: 'projects' },
    { name: 'Community', id: 'community' },
    { name: 'FAQ', id: 'footer' },
    { name: 'Contact', id: 'footer' },
  ];

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjust for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'hero' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(false);
    if (onLogin) onLogin();
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-morphism py-2 shadow-sm border-b border-slate-200/50' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            <div 
              className="flex-shrink-0 flex items-center mr-4 sm:mr-8 gap-2 sm:gap-3 cursor-pointer group"
              onClick={(e) => handleNavClick(e, 'hero')}
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full overflow-hidden bg-white shadow-sm transition-transform group-hover:scale-105">
                {branding.logo && !logoError ? (
                  <img 
                    src={branding.logo} 
                    alt={branding.name} 
                    className="h-full w-full object-contain p-1" 
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div 
                    className="w-full h-full flex items-center justify-center font-black text-white text-lg sm:text-xl"
                    style={{ backgroundColor: branding.color }}
                  >
                    {branding.name.charAt(0)}
                  </div>
                )}
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter">
                <span className="gradient-text" style={{ backgroundImage: `linear-gradient(135deg, ${branding.color} 0%, #06b6d4 100%)` }}>{branding.name}</span>
              </span>
            </div>
            
            <div className="hidden xl:flex items-center space-x-7 flex-grow">
              {navItems.map((item) => (
                <button 
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className="text-slate-600 hover:text-blue-600 text-[13px] font-bold transition-colors whitespace-nowrap uppercase tracking-widest"
                >
                  {item.name}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-5">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-slate-700 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors whitespace-nowrap"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => setShowModal(true)}
                  className="text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition shadow-lg whitespace-nowrap active:scale-95"
                  style={{ backgroundColor: branding.color }}
                >
                  Join the Hub
                </button>
              </div>
            </div>

            <div className="xl:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-600 p-2 focus:outline-none bg-white/50 backdrop-blur rounded-lg"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M12 12h8M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={`xl:hidden absolute w-full bg-white border-b border-slate-100 transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-screen opacity-100 shadow-2xl' : 'max-h-0 opacity-0'}`}>
          <div className="px-4 pt-4 pb-8 space-y-2">
            {navItems.map((item) => (
              <button 
                key={item.name}
                onClick={(e) => handleNavClick(e, item.id)} 
                className="w-full text-left px-3 py-4 text-slate-800 font-bold uppercase tracking-widest border-b border-slate-50 last:border-none"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-6 space-y-3 px-3">
              <button 
                onClick={() => { setIsOpen(false); setShowModal(true); }}
                className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl active:scale-95"
                style={{ backgroundColor: branding.color }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 max-w-md w-full relative z-10 shadow-2xl animate-fade-in border border-white/20">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex justify-center mb-6">
               <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-md border-2 border-slate-50 bg-white">
                 {branding.logo && !logoError ? (
                    <img src={branding.logo} className="w-full h-full object-contain p-1" onError={() => setLogoError(true)} />
                 ) : (
                    <div className="w-full h-full text-white font-black flex items-center justify-center text-2xl" style={{ backgroundColor: branding.color }}>{branding.name.charAt(0)}</div>
                 )}
               </div>
            </div>
            <h2 className="text-2xl font-black mb-2 text-slate-900 text-center tracking-tight">Access {branding.name}</h2>
            <p className="text-slate-500 mb-8 text-center font-medium text-sm">Research. Innovate. Collaborate. The future is built together.</p>
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <input required type="text" placeholder="Full Name" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" />
              <input required type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" />
              <button type="submit" className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl transform active:scale-95 mt-4 text-sm" style={{ backgroundColor: branding.color }}>
                Enter Workspace
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
