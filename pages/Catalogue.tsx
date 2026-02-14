
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Calendar } from 'lucide-react';
import FloatingHearts from '../components/FloatingHearts';

const EventCard = ({ to, title, date, description, themeColor, icon: Icon, image }: any) => (
  <Link to={to} className="group relative block w-full">
    <div className={`relative overflow-hidden rounded-[2rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${themeColor}`}>
      <div className="aspect-[16/10] sm:aspect-video overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
      </div>
      <div className="p-6 sm:p-8 space-y-3">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-60">
            <Calendar size={12} /> {date}
          </span>
          <Icon size={20} className="opacity-40 group-hover:opacity-100 transition-opacity" />
        </div>
        <h3 className="font-serif-elegant text-2xl sm:text-3xl">{title}</h3>
        <p className="text-sm opacity-70 font-light leading-relaxed">{description}</p>
        <div className="pt-4 flex items-center gap-2 font-bold text-xs uppercase tracking-tighter">
          Enter Experience <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  </Link>
);

const Catalogue: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-slate-900 pb-20">
      <FloatingHearts color="text-pink-100" />
      
      <header className="pt-20 pb-12 px-6 text-center space-y-4">
        <div className="inline-block p-3 bg-white rounded-full shadow-sm mb-4 animate-bounce">
          <Heart className="text-pink-500" fill="currentColor" size={24} />
        </div>
        <h1 className="font-serif-elegant text-4xl sm:text-6xl tracking-tight">The Love Archive</h1>
        <p className="font-romantic text-2xl text-pink-600">For my beautiful Huda</p>
        <div className="w-12 h-0.5 bg-slate-200 mx-auto mt-6"></div>
      </header>

      <main className="max-w-5xl mx-auto px-6 grid gap-8 sm:grid-cols-2 mt-8">
        <EventCard 
          to="/girlfriend"
          title="National Girlfriend Day"
          date="August 1st, 2025"
          description="A celebration of the girl who makes every day brighter. Our first museum dates, museum trips, and silly laughs."
          themeColor="bg-pink-50 border-pink-100 text-pink-900"
          icon={Heart}
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771041635/IMG_5613_ku4dro.jpg"
        />
        
        <EventCard 
          to="/valentine"
          title="Valentine's Day"
          date="February 14, 2025"
          description="The special library of notes I've been keeping for you. A deeper look into everything I love about us."
          themeColor="bg-rose-950 border-rose-900 text-rose-50"
          icon={Sparkles}
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771044041/IMG_8205_wxqpbb.jpg"
        />
      </main>

      <footer className="mt-24 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] opacity-30 font-bold">Afiq & Huda • Always</p>
      </footer>
    </div>
  );
};

export default Catalogue;
