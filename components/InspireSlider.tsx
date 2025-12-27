
import React, { useState, useEffect } from 'react';

const inspireSlides = [
  {
    title: "Collaborate.",
    subtitle: "Innovation thrives on diversity.",
    tip: "Tip: Connect with experts outside your field to gain fresh perspectives.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1200",
    color: "from-blue-600 to-indigo-600"
  },
  {
    title: "Innovate.",
    subtitle: "Turn ideas into reality.",
    tip: "Tip: Prototype early. A physical model clarifies thoughts better than a thousand words.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
    color: "from-indigo-600 to-purple-600"
  },
  {
    title: "Create the Future.",
    subtitle: "Design for a better world.",
    tip: "Tip: Stay user-centered. The most powerful tech is the one people can actually use.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
    color: "from-purple-600 to-pink-600"
  }
];

const InspireSlider: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % inspireSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] bg-white border border-slate-100">
      <div className="relative h-[550px] md:h-[650px]">
        {inspireSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80 mix-blend-multiply`}></div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative h-full flex flex-col justify-center px-10 md:px-20 text-left">
              <h3 className="text-white text-6xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                {slide.title}
              </h3>
              <p className="text-white/95 text-3xl md:text-4xl font-bold mb-10 drop-shadow-xl">
                {slide.subtitle}
              </p>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/30 p-8 rounded-3xl max-w-2xl group shadow-2xl">
                <p className="text-white font-semibold text-xl md:text-2xl leading-relaxed italic">
                  {slide.tip}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 right-12 z-20 flex gap-4">
        {inspireSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              index === current ? 'w-14 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
      
      {/* Label/Badge */}
      <div className="absolute top-12 left-12 z-20">
        <span className="px-6 py-2 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-sm font-black uppercase tracking-[0.3em] rounded-full shadow-lg">
          GetLiteHub Inspiration
        </span>
      </div>
    </div>
  );
};

export default InspireSlider;
