
import React from 'react';
import FloatingHearts from '../components/FloatingHearts';
import { Camera, Heart, Mail, Calendar, Quote } from 'lucide-react';
import { GIRLFRIEND_DAY_DATA } from '../data/config';

const GalleryItem: React.FC<{ src: string; caption: string; rotation: string }> = ({ src, caption, rotation }) => (
  <div className={`bg-white p-4 rounded-xl shadow-lg transition-all duration-500 hover:scale-105 hover:rotate-0 hover:z-10 cursor-default ${rotation}`}>
    <div className="aspect-[4/5] overflow-hidden rounded-lg mb-4 bg-pink-50">
      <img 
        src={src} 
        alt={caption} 
        className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
      />
    </div>
    <p className="font-romantic text-lg text-pink-800 text-center leading-tight">{caption}</p>
  </div>
);

const GirlfriendDay: React.FC = () => {
  const { title, subTitle, date, photos, favoritePhoto, letter } = GIRLFRIEND_DAY_DATA;

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-white to-teal-50 pb-32">
      <FloatingHearts />
      
      {/* Hero */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute top-10 left-10 text-pink-300 rotate-12"><Heart size={80} /></div>
           <div className="absolute bottom-20 right-20 text-teal-200 -rotate-12"><Heart size={120} /></div>
        </div>
        
        <div className="z-10 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <p className="flex items-center justify-center gap-2 text-amber-600 font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm">
            <Calendar size={14} /> {date}
          </p>
          <h1 className="font-romantic text-6xl sm:text-8xl text-pink-700 drop-shadow-sm">
            {title}
          </h1>
          <p className="font-serif-elegant italic text-2xl sm:text-4xl text-teal-800">
            {subTitle}
          </p>
        </div>
      </header>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif-elegant text-4xl text-gray-800 flex items-center justify-center gap-3">
            <Camera className="text-pink-500" />
            Our Beautiful Moments
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-200 via-pink-400 to-pink-200 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {photos.map((photo, index) => (
            <GalleryItem key={index} {...photo} />
          ))}
        </div>
      </section>

      {/* Featured Favorite */}
      <section className="bg-white/40 backdrop-blur-sm py-24 my-20 border-y border-pink-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="font-serif-elegant text-4xl text-gray-800 mb-12">My Favorite Photo of You</h2>
          <div className="relative group max-w-md mx-auto">
             <div className="absolute -inset-4 bg-gradient-to-tr from-pink-200 via-amber-100 to-teal-100 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
             <div className="relative bg-white p-6 rounded-[2rem] shadow-2xl">
                <img 
                  src={favoritePhoto.src} 
                  alt="Favorite" 
                  className="rounded-2xl w-full aspect-[3/4] object-cover mb-6"
                />
                <Quote className="text-pink-300 mb-2 mx-auto" size={32} />
                <p className="font-romantic text-2xl text-pink-900 leading-relaxed px-4">
                  "{favoritePhoto.caption}"
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Love Letter */}
      <section className="max-w-3xl mx-auto px-6 py-20">
        <div className="relative bg-white p-10 sm:p-16 rounded-[2.5rem] shadow-xl border border-pink-50 overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-pink-50 opacity-20"><Mail size={120} /></div>
          
          <div className="relative space-y-8">
            <h2 className="font-romantic text-4xl text-pink-700">{letter.greeting}</h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed font-light">
              {letter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="pt-6 text-right">
              <p className="font-romantic text-3xl text-pink-700">{letter.signature}</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="text-center py-12 text-pink-300 font-romantic text-xl">
        made with love for {subTitle.replace('My ', '')} • 2025
      </footer>
    </div>
  );
};

export default GirlfriendDay;
