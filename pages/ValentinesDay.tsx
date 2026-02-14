import React, { useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import { Heart, Music, Sparkles, MapPin, Send, MessageCircleHeart, ScrollText } from 'lucide-react';
import { VALENTINE_DAY_DATA } from '../data/config';

const ValentinesDay: React.FC = () => {
  const { title, subTitle, date, heroImage, gallery, signature, relationshipNotes } = VALENTINE_DAY_DATA;
  const [response, setResponse] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setResponse('YES');
    // Give state time to render the content then scroll
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="relative min-h-screen bg-[#1a0b0b] text-rose-50 overflow-hidden selection:bg-rose-500/30">
      <FloatingHearts color="text-rose-900" />
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-900/20 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center px-4 z-10">
        <div className="text-center space-y-6 animate-in fade-in zoom-in duration-1000">
          <div className="inline-block px-4 py-1.5 border border-rose-800/50 rounded-full bg-rose-900/30 text-rose-300 text-xs font-medium tracking-widest uppercase mb-4">
            {date}
          </div>
          <h1 className="font-serif-elegant text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-tight">
            {title.split('?')[0]} <br />
            <span className="font-romantic text-rose-500 italic lowercase">?</span>
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-4 pt-8 h-20 relative">
            <button 
              onClick={handleYes}
              className="px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white rounded-full font-medium transition-all duration-300 shadow-lg shadow-rose-900/40 hover:-translate-y-1 z-20"
            >
              Yes, Always ♡
            </button>
            {response !== 'YES' && (
              <button 
                className="px-8 py-4 bg-transparent border border-rose-800 hover:border-rose-600 text-rose-300 rounded-full font-medium transition-all duration-300"
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.position = 'fixed';
                  btn.style.left = `${Math.random() * 80 + 10}%`;
                  btn.style.top = `${Math.random() * 80 + 10}%`;
                }}
              >
                No
              </button>
            )}
          </div>

          {response === 'YES' && (
            <div className="animate-in fade-in slide-in-from-top-4 duration-700 mt-12">
              <p className="font-romantic text-4xl text-rose-400">I knew you'd say yes! hehe</p>
              <p className="text-rose-300/50 mt-2 text-sm animate-pulse">Scroll down to see what I've been keeping for you...</p>
            </div>
          )}
        </div>
      </section>

      {/* Gated Content */}
      {response === 'YES' && (
        <div ref={contentRef} className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
          
          {/* Notes Reveal Section */}
          <section className="max-w-4xl mx-auto px-6 py-24 z-10 relative">
            <div className="text-center mb-12 space-y-4">
              <h2 className="font-serif-elegant text-4xl text-white flex items-center justify-center gap-3">
                <ScrollText className="text-rose-500" />
                The Promised Reveal
              </h2>
              <p className="text-rose-300/70 font-light italic">Every little detail I've noticed, just like I promised.</p>
            </div>

            <div className="bg-rose-950/40 border border-rose-800/50 rounded-[2.5rem] p-8 md:p-12 shadow-2xl backdrop-blur-md">
              <div className="max-h-[600px] overflow-y-auto pr-4 custom-scrollbar">
                <div className="whitespace-pre-wrap font-serif-elegant text-rose-100/90 text-lg leading-relaxed italic">
                  {relationshipNotes}
                </div>
              </div>
              <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: rgba(144, 15, 41, 0.1);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: rgba(225, 29, 72, 0.3);
                  border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: rgba(225, 29, 72, 0.5);
                }
              `}</style>
            </div>
          </section>

          {/* Profile Card Section */}
          <section className="max-w-xl mx-auto px-6 py-12 z-10 relative">
            <div className="bg-rose-950/50 p-10 rounded-3xl border border-rose-800/50 flex flex-col items-center justify-center space-y-6 text-center shadow-2xl">
              <div className="relative">
                <div className="absolute -inset-2 bg-rose-500/20 blur-lg rounded-full animate-pulse"></div>
                <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-rose-500/30 relative">
                  <img src={heroImage} className="w-full h-full object-cover" alt="Us" />
                </div>
              </div>
              <div>
                <h3 className="font-romantic text-4xl text-rose-400">"{subTitle}"</h3>
                <p className="text-rose-100/60 mt-3 max-w-sm">I could never imagine my life without you sayang.</p>
              </div>
              <div className="flex gap-6 pt-4">
                <a 
                  href="https://www.youtube.com/watch?v=qjMLXjTUc8Y" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-4 bg-rose-900/50 rounded-full hover:bg-rose-600 transition-all duration-300 hover:scale-110"
                  title="Our Song"
                >
                  <Music className="text-rose-500 hover:text-white" />
                </a>
              </div>
            </div>
          </section>

          {/* Romantic Grid */}
          <section className="max-w-6xl mx-auto px-6 py-24 pb-40">
            <div className="text-center mb-16">
              <h2 className="font-romantic text-4xl text-rose-300">Snapshots of Us</h2>
              <div className="h-0.5 w-24 bg-rose-900 mx-auto mt-4 rounded-full"></div>
            </div>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {gallery.map((img, i) => (
                <div key={i} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-2xl shadow-rose-950/20">
                  <img 
                    src={img} 
                    alt="Gallery" 
                    className="w-full hover:scale-110 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-rose-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex items-end">
                    <p className="font-romantic text-xl text-rose-100">Forever</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <footer className="text-center py-20 border-t border-rose-900/30 bg-rose-950/20">
            <div className="flex items-center justify-center gap-2 text-rose-400 mb-4 animate-pulse">
              <Heart fill="currentColor" size={20} />
              <Heart fill="currentColor" size={20} />
              <Heart fill="currentColor" size={20} />
            </div>
            <p className="font-serif-elegant text-rose-300 text-xl">Happy Valentine's Day, Huda</p>
            <p className="text-rose-900 text-xs mt-4 tracking-widest uppercase font-bold">{signature}</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ValentinesDay;