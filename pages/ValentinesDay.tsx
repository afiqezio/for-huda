
import React, { useState, useRef, useEffect } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import { Heart, Music, Sparkles, MapPin, ScrollText, ChevronDown } from 'lucide-react';
import { VALENTINE_DAY_DATA } from '../data/config';

const ValentinesDay: React.FC = () => {
  const { title, subTitle, date, heroImage, gallery, signature, relationshipNotes } = VALENTINE_DAY_DATA;
  const [response, setResponse] = useState<string | null>(null);
  const [noPos, setNoPos] = useState({ left: 'auto', top: 'auto', position: 'relative' as any });
  const contentRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setResponse('YES');
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    // Avoid default behavior to prevent double trigger on mobile
    if (e.type === 'touchstart') e.preventDefault();
    
    const randomX = Math.random() * 70 + 15; // Keep away from edges
    const randomY = Math.random() * 70 + 15;
    setNoPos({
      left: `${randomX}%`,
      top: `${randomY}%`,
      position: 'fixed'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#120505] text-rose-50 overflow-x-hidden selection:bg-rose-500/30">
      <FloatingHearts color="text-rose-900" />
      
      {/* Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-900/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-950/20 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 z-10 text-center">
        <div className="space-y-6 animate-in fade-in zoom-in duration-1000 max-w-lg">
          <div className="inline-block px-3 py-1 border border-rose-800/30 rounded-full bg-rose-900/20 text-rose-400 text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase mb-4">
            {date}
          </div>
          <h1 className="font-serif-elegant text-4xl sm:text-7xl lg:text-8xl tracking-tight leading-tight">
            {title.split('?')[0]} <br />
            <span className="font-romantic text-rose-500 italic lowercase text-5xl sm:text-8xl">?</span>
          </h1>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 min-h-[160px] relative w-full">
            <button 
              onClick={handleYes}
              className="w-full sm:w-auto px-10 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-bold transition-all duration-300 shadow-xl shadow-rose-950/50 active:scale-95 z-20"
            >
              Yes, Always ♡
            </button>
            
            {response !== 'YES' && (
              <button 
                className="w-full sm:w-auto px-10 py-4 bg-transparent border border-rose-900 text-rose-300 rounded-full font-medium transition-all duration-500 z-10 touch-none"
                style={{
                  position: noPos.position,
                  left: noPos.left,
                  top: noPos.top,
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
              >
                No
              </button>
            )}
          </div>

          {response === 'YES' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-700 pt-8">
              <p className="font-romantic text-3xl text-rose-400">I knew you'd say yes! hehe</p>
              <div className="mt-8 animate-bounce text-rose-500/50">
                <ChevronDown size={28} className="mx-auto" />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Gated Content */}
      {response === 'YES' && (
        <div ref={contentRef} className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Notes Reveal Section */}
          <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 z-10 relative">
            <div className="text-center mb-8 sm:mb-12 space-y-3">
              <h2 className="font-serif-elegant text-3xl sm:text-4xl text-white flex items-center justify-center gap-3">
                <ScrollText className="text-rose-500" size={24} />
                The Library of Us
              </h2>
              <p className="text-rose-400/60 font-light italic text-sm sm:text-base">Every little thing I noticed, as promised.</p>
            </div>

            <div className="bg-rose-950/30 border border-rose-800/20 rounded-[2rem] p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
              <div className="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="whitespace-pre-wrap font-serif-elegant text-rose-100/90 text-base sm:text-lg leading-relaxed italic">
                  {relationshipNotes}
                </div>
              </div>
            </div>
          </section>

          {/* Profile Card */}
          <section className="max-w-md mx-auto px-4 py-12 z-10 relative">
            <div className="bg-gradient-to-b from-rose-950/40 to-black/20 p-8 rounded-3xl border border-rose-900/30 flex flex-col items-center text-center shadow-2xl">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden ring-2 ring-rose-500/20 mb-6">
                <img src={heroImage} className="w-full h-full object-cover" alt="Us" />
              </div>
              <h3 className="font-romantic text-3xl text-rose-400 mb-2">"{subTitle}"</h3>
              <p className="text-rose-200/50 text-sm mb-8 italic">Valentine's Day 2026</p>
              
              <div className="flex gap-4">
                <a 
                  href="https://www.youtube.com/watch?v=qjMLXjTUc8Y" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 bg-rose-600/20 rounded-full text-rose-500 hover:bg-rose-600 hover:text-white transition-all"
                >
                  <Music size={20} />
                </a>
              </div>
            </div>
          </section>

          {/* Romantic Grid */}
          <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
            <div className="columns-2 lg:columns-3 gap-3 sm:gap-6 space-y-3 sm:space-y-6">
              {gallery.map((img, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-xl overflow-hidden shadow-lg border border-rose-900/10">
                  <img src={img} alt="Gallery" className="w-full" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="font-romantic text-rose-100 text-lg">Always you</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="text-center py-20 bg-black/20">
            <Heart fill="currentColor" className="text-rose-600 mx-auto mb-4 animate-pulse" />
            <p className="font-serif-elegant text-rose-300 text-lg mb-2">My Valentine, Huda</p>
            <p className="text-rose-900 text-[10px] tracking-widest uppercase font-black">{signature}</p>
          </footer>
        </div>
      )}
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(225, 29, 72, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ValentinesDay;
