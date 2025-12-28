
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import SuccessTools from './components/SuccessTools';
import Brainstormer from './components/Brainstormer';
import AIToolsSlider from './components/AIToolsSlider';
import Community from './components/Community';
import ProjectShowcase from './components/ProjectShowcase';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import CTA from './components/CTA';

export interface BrandingConfig {
  name: string;
  logo: string | null;
  favicon: string | null;
  color: string;
}

export interface User {
  username: string;
  email: string;
  fullName: string;
  password?: string;
  avatar?: string;
}

const STORAGE_KEY = 'getlitehub_branding_v6';
const SESSION_KEY = 'getlitehub_session_v1';
const USER_DATA_KEY = 'getlitehub_current_user_v1';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(USER_DATA_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem(SESSION_KEY) === 'true';
  });

  const [view, setView] = useState<'landing' | 'dashboard'>(() => {
    return localStorage.getItem(SESSION_KEY) === 'true' ? 'dashboard' : 'landing';
  });
  
  const LOCAL_LOGO_PATH = './logo.png';

  const DEFAULT_BRANDING: BrandingConfig = {
    name: 'GetLiteHub',
    logo: LOCAL_LOGO_PATH,
    favicon: LOCAL_LOGO_PATH,
    color: '#0052FF'
  };

  const [branding, setBranding] = useState<BrandingConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const isCustomUpload = parsed.logo && parsed.logo.startsWith('data:');
        
        return { 
          ...DEFAULT_BRANDING, 
          ...parsed,
          logo: isCustomUpload ? parsed.logo : LOCAL_LOGO_PATH,
          favicon: (parsed.favicon && parsed.favicon.startsWith('data:')) ? parsed.favicon : LOCAL_LOGO_PATH
        };
      } catch (e) {
        console.error("Failed to parse saved branding", e);
      }
    }
    return DEFAULT_BRANDING;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(branding));
  }, [branding]);

  useEffect(() => {
    document.title = `${branding.name} | Research & Innovation Forum`;

    const faviconPath = branding.favicon || branding.logo || LOCAL_LOGO_PATH;
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = faviconPath;

    let metaTheme: HTMLMetaElement | null = document.querySelector('meta[name="theme-color"]');
    if (!metaTheme) {
      metaTheme = document.createElement('meta');
      metaTheme.name = 'theme-color';
      document.getElementsByTagName('head')[0].appendChild(metaTheme);
    }
    metaTheme.content = branding.color;

    document.documentElement.style.setProperty('--brand-color', branding.color);
  }, [branding.name, branding.favicon, branding.logo, branding.color]);

  useEffect(() => {
    if (view === 'dashboard') return;

    const revealCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(revealCallback, observerOptions);
    const elements = document.querySelectorAll('.reveal');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [view]);

  const handleLogin = (user: User, remember: boolean) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setView('dashboard');
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
    if (remember) {
      localStorage.setItem(SESSION_KEY, 'true');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setView('landing');
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_DATA_KEY);
  };

  const handleGoToHome = () => {
    setView('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToDashboard = () => {
    setView('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(updatedUser));
  };

  if (isLoggedIn && view === 'dashboard') {
    return (
      <Dashboard 
        user={currentUser}
        onUpdateUser={handleUpdateUser}
        onLogout={handleLogout} 
        onGoToHome={handleGoToHome}
        branding={branding}
        onUpdateBranding={setBranding}
        defaultBranding={DEFAULT_BRANDING}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 bg-white">
      <Navbar 
        onLogin={handleLogin} 
        onGoToDashboard={handleGoToDashboard}
        isLoggedIn={isLoggedIn}
        branding={branding} 
      />
      <main className="flex-grow">
        <section id="hero">
          <Hero branding={branding} />
        </section>
        
        <section id="about" className="py-24 md:py-32 bg-white relative overflow-hidden">
          <About />
        </section>

        <section id="features" className="py-24 md:py-32 bg-slate-50/50">
          <Features />
        </section>

        <section id="brainstormer" className="py-24 md:py-32 bg-[#0a0a0b] text-white">
          <Brainstormer />
        </section>

        <section id="ai-tools" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center mb-16 reveal">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">AI Lab Suite</h2>
            <p className="text-slate-500 mt-4 text-lg">Next-generation research assistance at your fingertips.</p>
          </div>
          <div className="reveal delay-200">
            <AIToolsSlider />
          </div>
        </section>

        <section id="success-tools" className="py-24 md:py-32 bg-slate-50/50 border-y border-slate-100">
          <SuccessTools branding={branding} />
        </section>

        <section id="projects" className="py-24 md:py-32 bg-white">
          <ProjectShowcase />
        </section>

        <section id="community" className="py-24 md:py-32 bg-white border-t border-slate-50">
          <Community branding={branding} />
        </section>

        <CTA branding={branding} />
      </main>
      <Footer branding={branding} />
    </div>
  );
};

export default App;
