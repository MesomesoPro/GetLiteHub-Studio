
import React, { useState, useEffect, useCallback } from 'react';
import SmartFramework from './SmartFramework';
import TopicSuggester from './TopicSuggester';

const AIToolsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    { id: 'framework', component: <SmartFramework /> },
    { id: 'suggester', component: <TopicSuggester /> }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      className="py-8 bg-[#fcfdff] relative group overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
          <button 
            onClick={prevSlide}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
            aria-label="Previous Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
          <button 
            onClick={nextSlide}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 shadow-lg flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all"
            aria-label="Next Slide"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Slides Container */}
        <div className="relative min-h-[500px] flex items-center justify-center">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                index === currentSlide 
                ? 'opacity-100 translate-x-0 scale-100 z-10' 
                : 'opacity-0 translate-x-12 scale-95 -z-10 pointer-events-none'
              }`}
            >
              {slide.component}
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-6">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-indigo-600' : 'w-1.5 bg-slate-200 hover:bg-slate-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIToolsSlider;
