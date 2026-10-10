import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import Photo from '../components/Photo';
import { VALENTINE_DAY_DATA } from '../data/config';

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

const ValentinesDay: React.FC = () => {
  const { chapter, date, subTitle, songUrl, profile, relationshipNotes, heroImage, gallery, signature } = VALENTINE_DAY_DATA;
  const [saidYes, setSaidYes] = useState(false);
  const [noPos, setNoPos] = useState<{ left: string; top: string } | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setSaidYes(true);
    setTimeout(() => {
      contentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  const moveNoButton = (e: React.MouseEvent | React.TouchEvent) => {
    if (e.type === 'touchstart') e.preventDefault();
    setNoPos({
      left: `${10 + Math.random() * 70}%`,
      top: `${15 + Math.random() * 70}%`,
    });
  };

  return (
    <div className="page page--night">
      <FloatingHearts tone="dark" />

      <Link to="/" className="back-link back-link--dark">← Archive</Link>

      <section className="val-hero">
        <div className="eyebrow eyebrow--wide rise">{chapter} · {date}</div>
        <h1 className="val-hero__title display rise rise--late">
          Will you be my <em>Valentine</em>?
        </h1>
        {saidYes ? (
          <div className="val-hero__yes rise">
            <p className="script">I knew you'd say yes, hehe</p>
            <p className="eyebrow">Scroll down ↓</p>
          </div>
        ) : (
          <div className="val-hero__actions">
            <button type="button" className="pill pill--solid" onClick={handleYes}>
              Yes, always ♡
            </button>
            <button
              type="button"
              className="pill pill--ghost pill--dodge"
              style={noPos ? { position: 'fixed', left: noPos.left, top: noPos.top } : undefined}
              onMouseEnter={moveNoButton}
              onTouchStart={moveNoButton}
              onClick={moveNoButton}
            >
              No
            </button>
          </div>
        )}
      </section>

      {saidYes && (
        <div ref={contentRef} className="rise">
          <section className="section">
            <div className="library-head">
              <div className="library-head__title">
                <div className="eyebrow eyebrow--wide">Every little thing I noticed</div>
                <h2 className="display">
                  The Library <em>of Us</em>
                </h2>
              </div>
              <dl className="library-head__facts">
                <div>
                  <dt>Name</dt>
                  <dd>{profile.name}</dd>
                </div>
                <div>
                  <dt>Official date</dt>
                  <dd>{profile.officialDate}</dd>
                </div>
              </dl>
            </div>
            <div className="notes">
              {relationshipNotes.map((note, i) => (
                <div key={note.title} className="note">
                  <div className="note__head">
                    <span className="note__num">{ROMAN[i] ?? i + 1}</span>
                    <h3>{note.title}</h3>
                  </div>
                  <ul>
                    {note.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section className="section section--tight">
            <div className="song">
              <div className="song__photo arch arch--tall">
                <Photo src={heroImage} sizes="(min-width: 360px) 360px, 100vw" alt="Us" />
              </div>
              <div className="song__text">
                <p className="song__title script">{subTitle}</p>
                <p className="song__caption">Valentine's Day 2026 — press play, this one's ours.</p>
                <a href={songUrl} target="_blank" rel="noopener noreferrer" className="pill pill--solid">
                  ▶ Play our song
                </a>
              </div>
            </div>
          </section>

          <section className="section section--tight">
            <h2 className="section-title display">
              Always <em>you</em>
            </h2>
            <div className="masonry">
              {gallery.map((img) => (
                <div key={img} className="masonry__item">
                  <Photo src={img} sizes="(min-width: 1180px) 380px, (min-width: 520px) 50vw, 100vw" />
                </div>
              ))}
            </div>
          </section>

          <footer className="val-footer">
            <span className="val-footer__heart" aria-hidden="true">♥</span>
            <p className="val-footer__title">My Valentine, Huda</p>
            <p className="eyebrow eyebrow--wide">{signature}</p>
          </footer>
        </div>
      )}
    </div>
  );
};

export default ValentinesDay;
