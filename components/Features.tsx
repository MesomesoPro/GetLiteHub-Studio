
import React from 'react';

const features = [
  {
    title: 'User-Centered Design',
    description: 'We prioritize end-user needs to create intuitive and effective programs.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    color: 'bg-blue-500'
  },
  {
    title: 'Advanced Research',
    description: 'Leveraging systematic methodologies to uncover solutions for complex problems.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.989-2.386l-.548-.547z" />
      </svg>
    ),
    color: 'bg-purple-500'
  },
  {
    title: 'IoT & Cloud',
    description: 'Integrating connected devices and scalable cloud infrastructure.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    color: 'bg-cyan-500'
  },
  {
    title: 'Global Collaboration',
    description: 'Connect with a community that shares your passion for innovation.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    color: 'bg-indigo-500'
  }
];

const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16 reveal">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose GetLiteHub?</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
          We combine human creativity with rigorous methodology to address the challenges of tomorrow.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div 
            key={idx} 
            className={`bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group reveal delay-${(idx + 1) * 100}`}
          >
            <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-6 group-hover:scale-110 transition`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
            <p className="text-slate-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
