import React from 'react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import Photo from '../components/Photo';

interface EventCardProps {
  to: string;
  chapter: string;
  date: string;
  title: string;
  description: string;
  image: string;
  dark?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({ to, chapter, date, title, description, image, dark = false }) => (
  <Link to={to} className={`chapter-card${dark ? ' chapter-card--dark' : ''}`}>
    <div className="chapter-card__photo arch">
      <Photo src={image} sizes="(min-width: 1080px) 520px, 100vw" priority />
    </div>
    <div className="chapter-card__body">
      <div className="chapter-card__meta eyebrow">
        <span>{chapter}</span>
        <span>{date}</span>
      </div>
      <h2 className="chapter-card__title">{title}</h2>
      <p className="chapter-card__text">{description}</p>
      <span className="chapter-card__cta">Open chapter →</span>
    </div>
  </Link>
);

const Catalogue: React.FC = () => {
  return (
    <div className="page page--cream archive">
      <FloatingHearts />

      <header className="archive__header">
        <div className="eyebrow eyebrow--wide">Afiq &amp; Huda · Est. 15 / 2</div>
        <h1 className="archive__title display">
          The Love <em>Archive</em>
        </h1>
        <p className="archive__subtitle script">for my beautiful Huda</p>
        <div className="flourish" aria-hidden="true">
          <span />♥<span />
        </div>
      </header>

      <main className="archive__grid">
        <EventCard
          to="/girlfriend"
          chapter="Chapter I"
          date="1 August 2025"
          title="National Girlfriend Day"
          description="A celebration of the girl who makes every day brighter — museum dates, silly laughs, and a letter."
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771041635/IMG_5613_ku4dro.jpg"
        />
        <EventCard
          to="/valentine"
          chapter="Chapter II"
          date="14 February 2026"
          title="Valentine's Day"
          description="One question, and the library of notes I've been keeping about you."
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771044041/IMG_8205_wxqpbb.jpg"
          dark
        />
      </main>

      <footer className="archive__footer script">always, Afiq &amp; Huda</footer>
    </div>
  );
};

export default Catalogue;
