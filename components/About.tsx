
import React, { useState, useEffect, useRef } from 'react';

const AnimatedNumber: React.FC<{ value: number; duration?: number }> = ({ value, duration = 2000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return <span ref={elementRef}>{displayValue}</span>;
};

const coreValues = [
  {
    title: 'Collaboration',
    description: 'We believe teamwork multiplies ideas and impact.',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Innovation',
    description: 'We embrace creativity and the latest technologies to solve problems.',
    iconColor: 'text-indigo-500'
  },
  {
    title: 'User-Centered Design',
    description: 'We prioritize solutions that are accessible, simple, and effective for end-users.',
    iconColor: 'text-cyan-500'
  },
  {
    title: 'Integrity',
    description: 'We uphold transparency, trust, and ethical research practices.',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Continuous Learning',
    description: 'We foster growth, skill development, and knowledge sharing.',
    iconColor: 'text-indigo-600'
  },
  {
    title: 'Impact',
    description: 'We aim to create tangible results that positively affect communities and industries.',
    iconColor: 'text-cyan-600'
  }
];

const About: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* About Us Title Section */}
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-4">About Us</h2>
        <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
      </div>

      {/* Top Section */}
      <div className="lg:flex lg:items-center lg:gap-24 mb-32">
        <div className="lg:w-1/2 mb-16 lg:mb-0">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] bg-indigo-50 text-indigo-600 mb-8 border border-indigo-100">
            The GetLiteHub Mission
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1]">
            Driving Solutions Through <span className="text-indigo-600">Collaborative Research</span>
          </h2>
          <p className="text-slate-500 text-xl mb-8 leading-relaxed font-medium">
            GetLiteHub is a dynamic research ecosystem where minds from diverse fields converge. From expert researchers to creative students, we facilitate the sharing of ideas that lead to impactful products.
          </p>
          <p className="text-slate-500 text-xl mb-12 leading-relaxed font-medium">
            Our philosophy centers on <strong className="text-slate-900">user-centered design</strong>. We prioritize the needs of end-users, ensuring technology is not just powerful, but also accessible and intuitive.
          </p>
          
          <div className="flex items-center gap-12">
            <div>
              <span className="block text-6xl font-black text-indigo-600 tracking-tight">
                <AnimatedNumber value={500} />+
              </span>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 block">Researchers</span>
            </div>
            <div className="w-px h-16 bg-slate-100"></div>
            <div>
              <span className="block text-6xl font-black text-blue-500 tracking-tight">
                <AnimatedNumber value={120} />+
              </span>
              <span className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-2 block">Active Labs</span>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 relative">
          <div className="relative z-10">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Research collaboration" 
              className="rounded-[3rem] shadow-2xl border border-white"
            />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600 rounded-3xl -z-10 opacity-10 animate-pulse"></div>
          </div>
          {/* Decorative floating stats/badge */}
          <div className="absolute top-10 -right-8 glass-morphism p-6 rounded-3xl shadow-xl z-20 hidden md:block border border-white/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <div>
                <span className="block text-slate-900 font-black text-lg">98% Impact</span>
                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Research Efficacy</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vision/Mission Cards - Re-styled to match provided reference */}
      <div className="grid md:grid-cols-2 gap-10">
        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-[#4f46e5] rounded-[1.5rem] flex items-center justify-center mb-10 shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-6 tracking-tight">Our Mission</h3>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            To bring together individuals from diverse fields to collaborate, share ideas, and develop simple, effective solutions that address real-world problems using research and innovation.
          </p>
        </div>

        <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-xl transition-all duration-500 group">
          <div className="w-16 h-16 bg-[#3b82f6] rounded-[1.5rem] flex items-center justify-center mb-10 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold text-[#0f172a] mb-6 tracking-tight">Our Vision</h3>
          <p className="text-slate-500 text-lg leading-relaxed font-medium">
            To become a leading platform for research, creativity, and technology, empowering innovators to connect, learn, and make a positive impact in the world.
          </p>
        </div>
      </div>

      {/* Value Chips */}
      <div className="mt-32">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Our Core Values</h3>
          <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {coreValues.map((value, idx) => (
            <div key={idx} className="flex gap-6 group p-4 rounded-3xl hover:bg-slate-50 transition-colors">
              <div className="flex-shrink-0">
                <div className={`w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${value.iconColor}`}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{value.title}</h4>
                <p className="text-slate-500 font-medium leading-relaxed">{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
