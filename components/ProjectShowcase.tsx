
import React from 'react';

const projects = [
  {
    title: "EcoPulse AI",
    tag: "Environment",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    description: "An AI-driven dashboard for city-wide energy optimization created by a team of 4 students and 2 experts."
  },
  {
    title: "NeuroLink UI",
    tag: "HealthTech",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    description: "A brain-computer interface focused on accessibility for individuals with limited mobility."
  },
  {
    title: "AquaSafe IoT",
    tag: "IoT",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    description: "Real-time water quality monitoring for rural communities using affordable mesh-network sensors."
  }
];

const ProjectShowcase: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 reveal">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Innovation Showcase</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
          Explore breakthrough programs and products developed within the GetLiteHub community.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <div 
            key={idx} 
            className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 reveal delay-${(idx + 1) * 100}`}
          >
            <div className="h-56 overflow-hidden relative bg-slate-100">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-1.5 bg-white/95 backdrop-blur text-indigo-600 text-[10px] font-black rounded-full shadow-md uppercase tracking-widest">
                  {project.tag}
                </span>
              </div>
            </div>
            <div className="p-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
              <p className="text-slate-500 text-base leading-relaxed mb-8 font-medium">
                {project.description}
              </p>
              <a href="#projects" className="text-indigo-600 font-extrabold text-sm uppercase tracking-widest hover:text-indigo-700 flex items-center group/btn">
                Read Case Study
                <svg className="w-5 h-5 ml-2 group-hover/btn:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;
