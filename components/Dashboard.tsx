
import React, { useState, useRef, useEffect } from 'react';
import { BrandingConfig } from '../App';

interface DashboardProps {
  onLogout: () => void;
  branding: BrandingConfig;
  onUpdateBranding: (newBranding: BrandingConfig) => void;
  defaultBranding: BrandingConfig;
}

interface Lab {
  title: string;
  status: string;
  members: number;
  tag: string;
  progress: number;
  category: string;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, branding, onUpdateBranding, defaultBranding }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [isDraggingFavicon, setIsDraggingFavicon] = useState(false);
  const [logoError, setLogoError] = useState(false);
  
  const [editBranding, setEditBranding] = useState<BrandingConfig>(branding);

  // Notification toggles
  const [notifs, setNotifs] = useState({
    alerts: true,
    public: false,
    report: true
  });

  useEffect(() => {
    setEditBranding(branding);
    setLogoError(false);
  }, [branding]);

  const [labs, setLabs] = useState<Lab[]>([
    { title: 'EcoPulse AI', status: 'Active', members: 6, tag: 'Env', progress: 75, category: 'Environment' },
    { title: 'NeuroLink UI', status: 'In Review', members: 4, tag: 'Health', progress: 40, category: 'Health' },
    { title: 'AquaSafe IoT', status: 'Planning', members: 3, tag: 'IoT', progress: 10, category: 'IoT' },
    { title: 'SolarMesh Grid', status: 'Archived', members: 5, tag: 'Energy', progress: 100, category: 'Energy' },
  ]);

  const [profile, setProfile] = useState({
    name: 'Jane Doe',
    email: 'jane@getlitehub.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    role: 'Lead Researcher',
    memberSince: 'March 2024'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sidebarItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { name: 'Research Labs', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { name: 'Collaborators', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
    { name: 'Profile', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const handleLogoFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditBranding(prev => ({ ...prev, logo: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleFaviconFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setEditBranding(prev => ({ ...prev, favicon: reader.result as string }));
      reader.readAsDataURL(file);
    }
  };

  const handleDropLogo = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingLogo(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleLogoFile(file);
  };

  const handleDropFavicon = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFavicon(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFaviconFile(file);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpdateBranding(editBranding);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      setShowCamera(false);
      alert("Could not access camera. Please check permissions.");
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      const dataUrl = canvas.toDataURL('image/png');
      setProfile(prev => ({ ...prev, avatar: dataUrl }));
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Settings':
        return (
          <div className="animate-fade-in space-y-6 max-w-[1100px] mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Workspace ID: GLH-2025-01</p>
              </div>
              {saveSuccess && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100 animate-fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Saved</span>
                </div>
              )}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column: Branding Assets */}
              <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
                {/* Workspace Name */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Workspace Name</label>
                  <input 
                    type="text" 
                    value={editBranding.name}
                    onChange={(e) => setEditBranding(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-[#f9fbff] border border-slate-100 rounded-[1rem] px-6 py-4 text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all font-bold text-base"
                    placeholder="Enter Workspace Name"
                  />
                </div>

                {/* Workspace Logo */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Main Workspace Logo</label>
                  <div className="flex items-center gap-6">
                    <div 
                      className={`w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-md transition-all relative ${isDraggingLogo ? 'ring-4 ring-blue-500/20 border-blue-400' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingLogo(true); }}
                      onDragLeave={() => setIsDraggingLogo(false)}
                      onDrop={handleDropLogo}
                    >
                      {editBranding.logo ? (
                        <img src={editBranding.logo} alt="Logo" className="w-full h-full object-contain p-2.5" onError={() => setLogoError(true)} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                           <span className="text-[10px] font-black text-slate-300">LOGO</span>
                        </div>
                      )}
                      {isDraggingLogo && (
                        <div className="absolute inset-0 bg-blue-500/10 flex items-center justify-center backdrop-blur-[2px]">
                          <svg className="w-6 h-6 text-blue-500 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                        </div>
                      )}
                    </div>
                    <div>
                      <button 
                        onClick={() => logoInputRef.current?.click()}
                        className="bg-[#edf3ff] text-blue-600 px-6 py-3 rounded-[1rem] text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all shadow-sm"
                      >
                        Select Image
                      </button>
                      <input 
                        type="file" 
                        ref={logoInputRef} 
                        className="hidden" 
                        accept="image/*" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleLogoFile(file);
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Workspace Favicon */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Browser Tab Favicon</label>
                  <div className="flex items-center gap-6">
                    <div 
                      className={`w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm transition-all relative ${isDraggingFavicon ? 'ring-4 ring-blue-500/20 border-blue-400' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setIsDraggingFavicon(true); }}
                      onDragLeave={() => setIsDraggingFavicon(false)}
                      onDrop={handleDropFavicon}
                    >
                      {editBranding.favicon ? (
                        <img src={editBranding.favicon} alt="Favicon" className="w-full h-full object-contain p-2" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                           <span className="text-[8px] font-black text-slate-300">ICON</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => faviconInputRef.current?.click()}
                        className="bg-[#f1f5f9] text-slate-700 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all"
                      >
                        Change Favicon
                      </button>
                      {editBranding.favicon && (
                        <button 
                          onClick={() => setEditBranding(prev => ({ ...prev, favicon: null }))}
                          className="text-red-500 text-[9px] font-black uppercase tracking-widest hover:underline text-left pl-1"
                        >
                          Reset to Default
                        </button>
                      )}
                      <input 
                        type="file" 
                        ref={faviconInputRef} 
                        className="hidden" 
                        accept="image/x-icon,image/png,image/svg+xml" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFaviconFile(file);
                        }} 
                      />
                    </div>
                  </div>
                </div>

                {/* Workspace Accent */}
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Workspace Accent</label>
                  <div className="flex items-center gap-4 bg-white">
                    <input 
                      type="color" 
                      value={editBranding.color}
                      onChange={(e) => setEditBranding(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-12 rounded-lg border-none cursor-pointer bg-transparent shadow-sm overflow-hidden" 
                    />
                    <span className="font-mono text-xs text-slate-500 font-bold uppercase tracking-wider">{editBranding.color}</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Toggles */}
              <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8 space-y-4">
                {[
                  { key: 'alerts', label: 'Real-time project alerts' },
                  { key: 'public', label: 'Show research status publicly' },
                  { key: 'report', label: 'Monthly hub contribution report' },
                ].map((notif) => (
                  <div key={notif.key} className="flex items-center justify-between p-6 bg-[#f9fbff] rounded-[1rem] group transition-all">
                    <span className="font-bold text-slate-700 text-base">{notif.label}</span>
                    <button 
                      onClick={() => setNotifs(prev => ({ ...prev, [notif.key]: !prev[notif.key as keyof typeof notifs] }))}
                      className={`w-12 h-7 rounded-full transition-all relative ${notifs[notif.key as keyof typeof notifs] ? 'bg-blue-600' : 'bg-slate-300'}`}
                    >
                      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-all shadow-sm ${notifs[notif.key as keyof typeof notifs] ? 'left-5.5' : 'left-0.5'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="text-white px-12 py-5 rounded-[1.25rem] font-black uppercase tracking-[0.15em] shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 text-sm"
                style={{ backgroundColor: branding.color }}
              >
                {isSaving ? 'Saving...' : 'Save Hub Settings'}
              </button>
            </div>
          </div>
        );
      case 'Profile':
        return (
          <div className="animate-fade-in space-y-8">
            <h2 className="text-2xl font-black text-slate-900">Member Profile</h2>
            <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-10">
               <div className="flex flex-col md:flex-row gap-12 items-start">
                 <div className="flex flex-col items-center gap-6">
                    <div className="w-48 h-48 rounded-[2rem] bg-slate-50 border-4 border-white shadow-2xl overflow-hidden relative">
                      <img src={profile.avatar} className="w-full h-full object-cover" />
                    </div>
                    <button onClick={() => fileInputRef.current?.click()} className="text-blue-600 font-black uppercase tracking-widest text-xs hover:underline">Change Avatar</button>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" />
                 </div>
                 <div className="flex-grow space-y-6 w-full">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Name</label>
                          <input type="text" value={profile.name} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Primary Discipline</label>
                          <input type="text" value={profile.role} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-900" />
                       </div>
                    </div>
                    <button className="text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl" style={{ backgroundColor: branding.color }}>Update Profile</button>
                 </div>
               </div>
            </div>
          </div>
        );
      case 'Dashboard':
      default:
        return (
          <div className="animate-fade-in space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Hub Capacity', value: '88%', change: 'Normal', color: branding.color },
                { label: 'Active Labs', value: labs.length.toString(), change: '+1', color: '#6366f1' },
                { label: 'Peers Online', value: '142', change: '+12', color: '#06b6d4' },
                { label: 'Impact Factor', value: '4.2', change: '+0.5', color: '#ef4444' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-lg" style={{ backgroundColor: stat.color }}>
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.change}</span>
                  </div>
                  <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase tracking-wider">Research Progress</h3>
                  <button className="text-blue-600 text-xs font-black uppercase tracking-widest">Add Milestone</button>
               </div>
               <div className="space-y-4">
                  {labs.slice(0, 3).map((lab, i) => (
                    <div key={i} className="p-5 bg-[#f9fbff] rounded-xl flex items-center justify-between group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-blue-100">
                       <div className="flex items-center gap-4">
                          <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-black text-blue-600 text-sm">{lab.tag.charAt(0)}</div>
                          <div>
                             <h4 className="font-black text-slate-900 text-base tracking-tight">{lab.title}</h4>
                             <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">{lab.category}</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-8">
                          <div className="hidden md:block w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <div className="h-full bg-blue-600 rounded-full" style={{ width: `${lab.progress}%` }}></div>
                          </div>
                          <span className="font-black text-slate-900 w-8 text-right text-sm">{lab.progress}%</span>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#f8faff] overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0a0b] text-white transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="relative h-10 w-10 flex items-center justify-center bg-white rounded-full overflow-hidden shadow-2xl">
              {branding.logo && !logoError ? (
                <img src={branding.logo} className="w-full h-full object-contain p-1" onError={() => setLogoError(true)} />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-xl" style={{ backgroundColor: branding.color }}>{branding.name.charAt(0)}</div>
              )}
            </div>
            <span className="text-lg font-black tracking-tight">{branding.name}</span>
          </div>

          <nav className="flex-grow space-y-1.5">
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all group ${activeTab === item.name ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
              >
                <span className={`${activeTab === item.name ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'}`}>{item.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-all group">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0">
        <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          
          <div className="hidden md:flex flex-col">
            <h1 className="text-xl font-black text-slate-900 tracking-tight">{activeTab}</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Workspace ID: GLH-2025-01</p>
          </div>

          <div className="flex items-center gap-5">
            <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-100 transition-all">
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </div>
            <div onClick={() => setActiveTab('Profile')} className="w-9 h-9 rounded-[0.75rem] overflow-hidden border-2 border-white shadow-md cursor-pointer hover:ring-4 ring-blue-500/10 transition-all">
              <img src={profile.avatar} className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 bg-[#f8faff] custom-scrollbar">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
