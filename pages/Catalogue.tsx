import React from 'react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import PhotoSlot from '../components/PhotoSlot';
import { BIRTHDAY_DATA, GIRLFRIEND_DAY_DATA, VALENTINE_DAY_DATA } from '../data/config';
import { useCountdown } from '../hooks/useCountdown';

const NEW_FOR_DAYS = 7;

// A chapter counts as new from its release until NEW_FOR_DAYS later.
const isNewRelease = (releasedAt: number, now = Date.now()) =>
  now >= releasedAt && now < releasedAt + NEW_FOR_DAYS * 864e5;

interface EventCardProps {
  to: string;
  chapter: string;
  date: string;
  title: string;
  description: string;
  image: string;
  tone?: 'light' | 'dark' | 'gold';
  cta?: string;
  sealed?: boolean;
  // Release time in ms since epoch; the card wears a "New" badge for its first week.
  releasedAt?: number;
}

const EventCard: React.FC<EventCardProps> = ({
  to,
  chapter,
  date,
  title,
  description,
  image,
  tone = 'light',
  cta = 'Open chapter →',
  sealed = false,
  releasedAt,
}) => (
  <Link to={to} className={`chapter-card chapter-card--${tone}`}>
    {!sealed && releasedAt !== undefined && isNewRelease(releasedAt) && <span className="chapter-card__new">New</span>}
    <div className={`chapter-card__photo arch${sealed ? ' chapter-card__photo--sealed' : ''}`}>
      <PhotoSlot src={image} label={`${title} cover`} priority />
      {sealed && (
        <div className="chapter-card__seal">
          <span className="wax-seal">H</span>
          <span className="eyebrow">Sealed until 21 · 10</span>
        </div>
      )}
    </div>
    <div className="chapter-card__body">
      <div className="chapter-card__meta eyebrow">
        <span>{chapter}</span>
        <span>{date}</span>
      </div>
      <h2 className="chapter-card__title">{title}</h2>
      <p className="chapter-card__text">{description}</p>
      <span className="chapter-card__cta">{cta}</span>
    </div>
  </Link>
);

const Catalogue: React.FC = () => {
  const countdown = useCountdown(BIRTHDAY_DATA.unlockAt);
  const { units } = countdown;
  const unlocked = countdown.reached || BIRTHDAY_DATA.forceUnlock;

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

      <section className="countdown-panel">
        <div className="eyebrow eyebrow--wide">
          {unlocked ? 'Today is the day' : 'Until her birthday · 21 October'}
        </div>
        {unlocked ? (
          <Link to="/birthday" className="countdown-panel__open script">
            It’s your day, Huda — open it ♡
          </Link>
        ) : (
          <div className="countdown" role="timer">
            {units.map((u) => (
              <div key={u.label} className="countdown__unit">
                <span className="countdown__value">{u.value}</span>
                <span className="eyebrow">{u.label}</span>
              </div>
            ))}
          </div>
        )}
      </section>

      <main className="archive__grid">
        <EventCard
          to="/girlfriend"
          chapter="Chapter I"
          date="1 August 2025"
          title="National Girlfriend Day"
          description="A celebration of the girl who makes every day brighter, museum dates, silly laughs, and a letter."
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771041635/IMG_5613_ku4dro.jpg"
          releasedAt={GIRLFRIEND_DAY_DATA.releasedAt}
        />
        <EventCard
          to="/valentine"
          chapter="Chapter II"
          date="14 February 2026"
          title="Valentine's Day"
          description="One question, and the library of notes I've been keeping about you."
          image="https://res.cloudinary.com/dtl72yrin/image/upload/v1771044041/IMG_8205_wxqpbb.jpg"
          tone="dark"
          releasedAt={VALENTINE_DAY_DATA.releasedAt}
        />
        <EventCard
          to="/birthday"
          chapter={BIRTHDAY_DATA.chapter}
          date={BIRTHDAY_DATA.date}
          title="Her Birthday"
          description="A whole chapter just for the birthday girl, a year of photos, and a letter."
          image={BIRTHDAY_DATA.coverPhoto}
          tone="gold"
          sealed={!unlocked}
          releasedAt={BIRTHDAY_DATA.unlockAt}
          cta={unlocked ? 'Open chapter →' : `Sealed · ${units[0].value} days to go`}
        />
      </main>

      <footer className="archive__footer script">always, Afiq &amp; Huda</footer>
    </div>
  );
};

export default Catalogue;
