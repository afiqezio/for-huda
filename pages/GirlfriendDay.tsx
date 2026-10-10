import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import Photo from '../components/Photo';
import { GIRLFRIEND_DAY_DATA } from '../data/config';

const GirlfriendDay: React.FC = () => {
  const { chapter, date, intro, photos, favoritePhoto, letter } = GIRLFRIEND_DAY_DATA;
  const [letterOpen, setLetterOpen] = useState(false);

  return (
    <div className="page page--cream">
      <FloatingHearts />

      <Link to="/" className="back-link">← Archive</Link>

      <header className="gf-hero">
        <div className="gf-hero__text rise">
          <div className="eyebrow eyebrow--wide">{chapter} · {date}</div>
          <h1 className="gf-hero__title display">
            Happy National <em>Girlfriend</em> Day
          </h1>
          <p className="gf-hero__name script">my Huda</p>
          <p className="gf-hero__intro">{intro}</p>
        </div>
        <div className="gf-hero__portrait rise rise--late">
          <div className="arch arch--tall">
            <Photo src={favoritePhoto.src} sizes="(min-width: 480px) 440px, 100vw" alt="Huda" priority />
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2 className="section-head__title display">
            Our <em>moments</em>
          </h2>
          <span className="eyebrow">Six frames</span>
        </div>
        <div className="polaroids">
          {photos.map((photo, i) => (
            <figure
              key={photo.src}
              className="polaroid"
              style={{ '--rot': `${photo.rotation}deg` } as React.CSSProperties}
            >
              <div className="polaroid__photo">
                <Photo src={photo.src} sizes="(min-width: 1180px) 360px, (min-width: 600px) 50vw, 100vw" alt={photo.caption} />
              </div>
              <figcaption>
                <span className="polaroid__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="polaroid__caption">{photo.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="favourite">
        <div className="favourite__inner">
          <div className="favourite__photo">
            <Photo src={favoritePhoto.src} sizes="(min-width: 460px) 460px, 100vw" alt="My favourite frame" />
          </div>
          <div className="favourite__text">
            <div className="eyebrow eyebrow--wide">My favourite frame</div>
            <p className="favourite__quote">“{favoritePhoto.caption}”</p>
            <span className="favourite__sig script">— A.</span>
          </div>
        </div>
      </section>

      <section className="letter-wrap">
        {letterOpen ? (
          <article className="letter rise">
            <h3 className="letter__greeting script">{letter.greeting}</h3>
            {letter.paragraphs.map((p, i) => (
              <p key={i} className="letter__para">{p}</p>
            ))}
            <p className="letter__sig script">{letter.signature}</p>
          </article>
        ) : (
          <div className="envelope">
            <div className="eyebrow eyebrow--wide">A letter, sealed for you</div>
            <button type="button" className="seal" onClick={() => setLetterOpen(true)} aria-label="Open the letter">
              A
            </button>
            <p className="envelope__hint">Tap the seal to open</p>
          </div>
        )}
      </section>

      <footer className="page-footer eyebrow eyebrow--wide">Made with love · 2025</footer>
    </div>
  );
};

export default GirlfriendDay;
