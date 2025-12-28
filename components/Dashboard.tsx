
import React, { useState, useRef, useEffect } from 'react';
import { BrandingConfig, User } from '../App';

interface DashboardProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
  onLogout: () => void;
  onGoToHome: () => void;
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
  description?: string;
}

const USERS_DB_KEY = 'getlitehub_users_db_v1';

const Dashboard: React.FC<DashboardProps> = ({ user, onUpdateUser, onLogout, onGoToHome, branding, onUpdateBranding, defaultBranding }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // New Lab Modal State
  const [showNewLabModal, setShowNewLabModal] = useState(false);
  const [newLabData, setNewLabData] = useState({
    title: '',
    description: '',
    tag: '',
    category: 'General'
  });

  const [editBranding, setEditBranding] = useState<BrandingConfig>(branding);
  const avatarInputRef = useRef<HTMLInputElement>(null);

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

  const logoInputRef = useRef<HTMLInputElement>(null);

  const sidebarItems = [
    { name: 'Dashboard', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg> },
    { name: 'Research Labs', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> },
    { name: 'Profile', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { name: 'Settings', icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
  ];

  const handleLogoFile = (file: File) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoError(false);
        setEditBranding(prev => ({ ...prev, logo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarFile = (file: File) => {
    if (file && user) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        const updatedUser = { ...user, avatar: base64 };
        
        // Update mock DB
        const dbData = localStorage.getItem(USERS_DB_KEY);
        if (dbData) {
          const db: User[] = JSON.parse(dbData);
          const userIdx = db.findIndex(u => u.email === user.email);
          if (userIdx !== -1) {
            db[userIdx] = updatedUser;
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
          }
        }
        
        onUpdateUser(updatedUser);
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleAvatarFile(file);
    }
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    onUpdateBranding(editBranding);
    setIsSaving(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateLab = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabData.title) return;
    
    const newLab: Lab = {
      ...newLabData,
      status: 'Active',
      members: 1,
      progress: 0,
      tag: newLabData.tag || 'General'
    };
    
    setLabs([newLab, ...labs]);
    setShowNewLabModal(false);
    setNewLabData({ title: '', description: '', tag: '', category: 'General' });
  };

  const renderFallbackAvatar = (name: string, color: string, size: 'sm' | 'lg' = 'sm') => (
    <div 
      className={`w-full h-full flex items-center justify-center font-black text-white ${size === 'lg' ? 'text-3xl' : 'text-xl'} shadow-inner`}
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)` 
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile':
        return (
          <div className="animate-fade-in max-w-2xl mx-auto py-12">
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden relative">
               <div className="h-32 bg-slate-900 relative">
                  <div 
                    className={`absolute -bottom-12 left-12 w-24 h-24 rounded-[2rem] border-4 border-white overflow-hidden shadow-lg bg-white cursor-pointer group transition-all ${isDragging ? 'scale-110 ring-4 ring-blue-500/30' : ''}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    {user?.avatar ? (
                      <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      renderFallbackAvatar(user?.fullName || 'U', branding.color, 'lg')
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                    </div>
                    {isDragging && (
                      <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-sm flex items-center justify-center">
                         <span className="text-white font-black text-[10px] uppercase tracking-widest text-center px-2">Drop Image Here</span>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={avatarInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => handleAvatarFile(e.target.files?.[0] as File)} 
                  />
               </div>
               
               <div className="pt-16 pb-12 px-12">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user?.fullName || 'Researcher'}</h2>
                      <p className="text-slate-500 font-bold text-sm">@{user?.username || 'user'}</p>
                    </div>
                    {saveSuccess && (
                      <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100 animate-fade-in">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-[10px] font-black uppercase tracking-wider">Profile Updated</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-10 space-y-4">
                    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Account Information</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Email</span>
                         <span className="font-bold text-slate-900 block truncate">{user?.email || 'Not provided'}</span>
                      </div>
                      <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                         <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Status</span>
                         <span className="font-bold text-green-600">Active Expert</span>
                      </div>
                    </div>

                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-3xl text-center group hover:border-blue-300 transition-colors cursor-pointer" onClick={() => avatarInputRef.current?.click()}>
                       <div className="w-12 h-12 bg-slate-100 rounded-2xl mx-auto mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500 transition-all">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                       </div>
                       <p className="text-slate-900 font-bold text-sm">Upload or drag & drop a profile photo</p>
                       <p className="text-slate-400 text-xs mt-1">PNG, JPG or WEBP up to 5MB</p>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'Settings':
        return (
          <div className="animate-fade-in space-y-6 max-w-[1100px] mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex flex-col">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Settings</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-0.5">Workspace ID: GLH-2025-01</p>
              </div>
              {saveSuccess && (activeTab === 'Settings') && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-xl border border-green-100 animate-fade-in">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-xs font-bold uppercase tracking-wider">Saved</span>
                </div>
              )}
            </div>
            
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-[1.5rem] border border-slate-100 shadow-sm p-8 space-y-8">
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

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Main Workspace Logo</label>
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-full bg-white border border-slate-100 flex items-center justify-center overflow-hidden shadow-md">
                      {editBranding.logo && !logoError ? (
                        <img 
                          src={editBranding.logo} 
                          alt="Logo" 
                          className="w-full h-full object-contain p-2.5" 
                          onError={() => setLogoError(true)} 
                        />
                      ) : (
                        renderFallbackAvatar(editBranding.name || 'G', editBranding.color, 'lg')
                      )}
                    </div>
                    <button 
                      onClick={() => logoInputRef.current?.click()}
                      className="bg-[#edf3ff] text-blue-600 px-6 py-3 rounded-[1rem] text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all shadow-sm"
                    >
                      Change Logo
                    </button>
                    <input type="file" ref={logoInputRef} className="hidden" accept="image/*" onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleLogoFile(file);
                    }} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 block ml-1">Workspace Accent</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="color" 
                      value={editBranding.color}
                      onChange={(e) => setEditBranding(prev => ({ ...prev, color: e.target.value }))}
                      className="w-12 h-12 rounded-lg border-none cursor-pointer bg-transparent" 
                    />
                    <span className="font-mono text-xs text-slate-500 font-bold">{editBranding.color}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end pt-4">
              <button onClick={handleSaveSettings} disabled={isSaving} className="text-white px-12 py-5 rounded-[1.25rem] font-black uppercase tracking-widest shadow-xl hover:opacity-90 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 text-sm" style={{ backgroundColor: branding.color }}>
                {isSaving ? 'Saving...' : 'Save Hub Settings'}
              </button>
            </div>
          </div>
        );
      case 'Research Labs':
      case 'Dashboard':
      default:
        return (
          <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome, {user?.fullName.split(' ')[0] || 'Researcher'}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mt-1">Global Research Network ID: GLH-{user?.username.toUpperCase() || '0001'}</p>
              </div>
              <button 
                onClick={() => setShowNewLabModal(true)}
                className="text-white px-6 py-3 rounded-xl font-black uppercase tracking-widest shadow-lg hover:opacity-90 transition transform hover:-translate-y-1 active:scale-95 text-xs flex items-center gap-2"
                style={{ backgroundColor: branding.color }}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
                New Lab
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Hub Capacity', value: '88%', color: branding.color },
                { label: 'Active Labs', value: labs.length.toString(), color: '#6366f1' },
                { label: 'Peers Online', value: '142', color: '#06b6d4' },
                { label: 'Impact Factor', value: '4.2', color: '#ef4444' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[1.5rem] border border-slate-100 shadow-sm">
                  <div className="w-10 h-10 rounded-xl text-white flex items-center justify-center mb-6" style={{ backgroundColor: stat.color }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  </div>
                  <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.label}</h3>
                  <p className="text-3xl font-black text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm">Laboratory Overview</h3>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{labs.length} Projects Total</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Lab Title</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Category</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Members</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Status</th>
                      <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {labs.map((lab, i) => (
                      <tr key={i} className="hover:bg-slate-50/30 transition-colors group">
                        <td className="px-8 py-5">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{lab.title}</span>
                            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-0.5">#{lab.tag}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="text-xs font-bold text-slate-600">{lab.category}</span>
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex -space-x-2">
                            {[...Array(Math.min(lab.members, 3))].map((_, i) => (
                              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
                            ))}
                            {lab.members > 3 && (
                              <div className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500">
                                +{lab.members - 3}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                            lab.status === 'Active' ? 'bg-green-50 text-green-600 border-green-100' :
                            lab.status === 'In Review' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            lab.status === 'Archived' ? 'bg-slate-100 text-slate-500 border-slate-200' :
                            'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                            {lab.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 min-w-[140px]">
                          <div className="flex items-center gap-3">
                            <div className="flex-grow h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lab.progress}%` }} />
                            </div>
                            <span className="text-[10px] font-black text-slate-400">{lab.progress}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
            <div className="h-10 w-10 flex items-center justify-center bg-white rounded-full overflow-hidden">
              {branding.logo && !logoError ? (
                <img src={branding.logo} className="w-full h-full object-contain p-1" onError={() => setLogoError(true)} />
              ) : (
                renderFallbackAvatar(branding.name || 'G', branding.color)
              )}
            </div>
            <span className="text-lg font-black tracking-tight">{branding.name}</span>
          </div>

          <nav className="flex-grow space-y-1.5">
            {sidebarItems.map((item) => (
              <button key={item.name} onClick={() => { setActiveTab(item.name); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${activeTab === item.name ? 'bg-white/10 text-white shadow-lg' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                <span className={`${activeTab === item.name ? 'text-blue-400' : 'text-slate-600'}`}>{item.icon}</span>
                <span className="text-xs font-black uppercase tracking-widest">{item.name}</span>
              </button>
            ))}
            
            <div className="pt-4 mt-4 border-t border-white/5">
              <button onClick={onGoToHome} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="text-xs font-black uppercase tracking-widest">Home Page</span>
              </button>
            </div>
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-400 transition-all group">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
              <span className="text-xs font-black uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 text-slate-600">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <h1 className="text-xl font-black text-slate-900">{activeTab}</h1>
          <div onClick={() => setActiveTab('Profile')} className="w-9 h-9 rounded-xl overflow-hidden cursor-pointer border-2 border-white shadow-sm flex items-center justify-center bg-white">
            {user?.avatar ? (
              <img src={user.avatar} className="w-full h-full object-cover" />
            ) : (
              renderFallbackAvatar(user?.fullName || 'U', branding.color)
            )}
          </div>
        </header>

        <div className="flex-grow overflow-y-auto p-8 custom-scrollbar">
          {renderContent()}
        </div>
      </main>

      {/* New Lab Modal */}
      {showNewLabModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setShowNewLabModal(false)}></div>
          <div className="bg-white rounded-[2rem] p-8 sm:p-10 max-w-lg w-full relative z-10 shadow-2xl animate-fade-in border border-white/20">
            <button onClick={() => setShowNewLabModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white" style={{ backgroundColor: branding.color }}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Initiate New Lab</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Research Proposal Phase 1</p>
              </div>
            </div>
            
            <form onSubmit={handleCreateLab} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Lab Title</label>
                <input 
                  required 
                  type="text" 
                  value={newLabData.title}
                  onChange={(e) => setNewLabData({...newLabData, title: e.target.value})}
                  placeholder="e.g., Quantum Computing UI Framework" 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Category</label>
                  <select 
                    value={newLabData.category}
                    onChange={(e) => setNewLabData({...newLabData, category: e.target.value})}
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm appearance-none"
                  >
                    <option>General</option>
                    <option>Environment</option>
                    <option>Health</option>
                    <option>IoT</option>
                    <option>Energy</option>
                    <option>AI/ML</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Tag (No #)</label>
                  <input 
                    type="text" 
                    value={newLabData.tag}
                    onChange={(e) => setNewLabData({...newLabData, tag: e.target.value})}
                    placeholder="e.g., UI, Tech, Eco" 
                    className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Brief Description</label>
                <textarea 
                  rows={4}
                  value={newLabData.description}
                  onChange={(e) => setNewLabData({...newLabData, description: e.target.value})}
                  placeholder="Describe the research goals and core problems being addressed..." 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none text-slate-900 font-bold transition-all text-sm resize-none" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setShowNewLabModal(false)}
                  className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-slate-200 transition-all text-sm"
                >
                  Discard
                </button>
                <button 
                  type="submit" 
                  className="flex-1 text-white py-4 rounded-xl font-black uppercase tracking-widest hover:opacity-90 transition-all shadow-xl transform active:scale-95 text-sm" 
                  style={{ backgroundColor: branding.color }}
                >
                  Create Lab
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
