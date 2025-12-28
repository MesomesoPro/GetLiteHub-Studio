
import React, { useState, useEffect } from 'react';
import { BrandingConfig, User } from '../App';

interface NavbarProps {
  onLogin?: (user: User, remember: boolean) => void;
  onGoToDashboard?: () => void;
  isLoggedIn?: boolean;
  branding: BrandingConfig;
}

const USERS_DB_KEY = 'getlitehub_users_db_v1';

const Navbar: React.FC<NavbarProps> = ({ onLogin, onGoToDashboard, isLoggedIn, branding }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form states
  const [identifier, setIdentifier] = useState(''); // Email or Username for login
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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

  // Clear errors when switching modes or typing
  useEffect(() => {
    setErrorMsg('');
  }, [isRegistering, identifier, password, username, email]);

  const getUsersFromDB = (): User[] => {
    const data = localStorage.getItem(USERS_DB_KEY);
    return data ? JSON.parse(data) : [];
  };

  const saveUserToDB = (user: User) => {
    const users = getUsersFromDB();
    users.push(user);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const db = getUsersFromDB();

    if (isRegistering) {
      // Check if user exists
      const emailExists = db.find(u => u.email.toLowerCase() === email.toLowerCase());
      const userExists = db.find(u => u.username.toLowerCase() === username.toLowerCase());
      
      if (emailExists) {
        setErrorMsg('An account with this email already exists.');
        return;
      }
      if (userExists) {
        setErrorMsg('This username is already taken. Please choose another.');
        return;
      }

      const newUser: User = { 
        username: username.trim(), 
        email: email.toLowerCase().trim(), 
        fullName: fullName.trim(), 
        password 
      };
      saveUserToDB(newUser);
      
      setShowModal(false);
      if (onLogin) onLogin(newUser, rememberMe);
    } else {
      // Step 1: Find if the user exists at all (compare by email or username)
      const userRecord = db.find(u => 
        u.email.toLowerCase() === identifier.toLowerCase().trim() || 
        u.username.toLowerCase() === identifier.toLowerCase().trim()
      );
      
      if (!userRecord) {
        setErrorMsg('Account not found. Please check your username or email.');
        return;
      }

      // Step 2: Compare the password
      if (userRecord.password !== password) {
        setErrorMsg('Incorrect password. Please verify your credentials and try again.');
        return;
      }

      // If both pass, log in
      setShowModal(false);
      if (onLogin) onLogin(userRecord, rememberMe);
    }
  };

  const renderFallbackAvatar = (name: string, color: string) => (
    <div 
      className="w-full h-full flex items-center justify-center font-black text-white text-xl shadow-inner"
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` 
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );

  return (
    <>
      <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'glass-morphism py-2 shadow-sm border-b border-slate-200/50' : 'bg-transparent py-4'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            
            <div 
              className="flex-shrink-0 flex items-center mr-4 sm:mr-8 gap-2 sm:gap-3 cursor-pointer group"
              onClick={() => {
                 const el = document.getElementById('hero');
                 if (el) window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="relative h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-full overflow-hidden bg-white shadow-md border border-white transition-transform group-hover:scale-105">
                {branding.logo && !logoError ? (
                  <img 
                    src={branding.logo} 
                    alt={branding.name} 
                    className="h-full w-full object-contain p-1" 
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  renderFallbackAvatar(branding.name, branding.color)
                )}
              </div>
              <span className="text-xl sm:text-2xl font-black tracking-tighter">
                <span className="gradient-text" style={{ backgroundImage: `linear-gradient(135deg, ${branding.color} 0%, #06b6d4 100%)` }}>{branding.name}</span>
              </span>
            </div>
            
            <div className="hidden xl:flex items-center space-x-7 flex-grow">
              {['Home', 'About', 'Labs', 'Community'].map((name) => (
                <button 
                  key={name}
                  onClick={() => {
                    const id = name.toLowerCase() === 'home' ? 'hero' : name.toLowerCase() === 'labs' ? 'projects' : name.toLowerCase();
                    const el = document.getElementById(id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-slate-600 hover:text-blue-600 text-[13px] font-bold transition-colors whitespace-nowrap uppercase tracking-widest"
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-5">
              <div className="flex items-center space-x-6">
                {!isLoggedIn ? (
                  <>
                    <button 
                      onClick={() => { setShowModal(true); setIsRegistering(false); }}
                      className="text-slate-700 text-xs font-black uppercase tracking-widest hover:text-blue-600 transition-colors whitespace-nowrap"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => { setShowModal(true); setIsRegistering(true); }}
                      className="text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition shadow-lg whitespace-nowrap active:scale-95"
                      style={{ backgroundColor: branding.color }}
                    >
                      Join the Hub
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={onGoToDashboard}
                    className="text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:opacity-90 transition shadow-lg whitespace-nowrap active:scale-95 flex items-center gap-2"
                    style={{ backgroundColor: branding.color }}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                    Dashboard
                  </button>
                )}
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
            {['Home', 'About', 'Labs', 'Community'].map((name) => (
              <button 
                key={name}
                onClick={() => {
                  const id = name.toLowerCase() === 'home' ? 'hero' : name.toLowerCase() === 'labs' ? 'projects' : name.toLowerCase();
                  const el = document.getElementById(id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
                }} 
                className="w-full text-left px-3 py-4 text-slate-800 font-bold uppercase tracking-widest border-b border-slate-50 last:border-none"
              >
                {name}
              </button>
            ))}
            <div className="pt-6 space-y-3 px-3">
              {!isLoggedIn ? (
                <button 
                  onClick={() => { setIsOpen(false); setShowModal(true); setIsRegistering(true); }}
                  className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl active:scale-95"
                  style={{ backgroundColor: branding.color }}
                >
                  Get Started
                </button>
              ) : (
                <button 
                  onClick={() => { setIsOpen(false); if(onGoToDashboard) onGoToDashboard(); }}
                  className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl active:scale-95"
                  style={{ backgroundColor: branding.color }}
                >
                  Dashboard
                </button>
              )}
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
                    renderFallbackAvatar(branding.name, branding.color)
                 )}
               </div>
            </div>
            <h2 className="text-2xl font-black mb-2 text-slate-900 text-center tracking-tight">
              {isRegistering ? 'Create Your Account' : `Access ${branding.name}`}
            </h2>
            <p className="text-slate-500 mb-6 text-center font-medium text-sm">
              {isRegistering ? 'Join a global community of innovators.' : 'Research. Innovate. Collaborate. The future is built together.'}
            </p>
            
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold mb-6 border border-red-100 flex items-center gap-3 animate-fade-in">
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {errorMsg}
              </div>
            )}
            
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {!isRegistering ? (
                // Login Fields
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username or Email</label>
                    <input 
                      required 
                      type="text" 
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      placeholder="e.g., jane_doe or jane@example.com" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                    />
                  </div>
                </>
              ) : (
                // Register Fields
                <>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g., Dr. Jane Smith" 
                      className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Username</label>
                      <input 
                        required 
                        type="text" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="jane_smith" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
                      <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="jane@example.com" 
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
                <input 
                  required 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="•••••••••" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                />
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 transition-all cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-700 transition-colors">Remember this device</span>
                </label>
              </div>

              <button type="submit" className="w-full text-white py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl transform active:scale-95 mt-4 text-sm" style={{ backgroundColor: branding.color }}>
                {isRegistering ? 'Join the Network' : 'Enter Workspace'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => setIsRegistering(!isRegistering)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                {isRegistering ? 'Already have an account? Sign In' : 'New to the Hub? Create an Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
