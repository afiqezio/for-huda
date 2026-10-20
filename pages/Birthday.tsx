import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import Confetti from '../components/Confetti';
import PhotoSlot from '../components/PhotoSlot';
import { BIRTHDAY_DATA } from '../data/config';
import { useCountdown } from '../hooks/useCountdown';

const CANDLE_COUNT = 5;
const TITLE = 'Happy Birthday';
// Letters animate one by one, but each word stays together so the title never breaks mid-word on phones.
const TITLE_WORDS = TITLE.split(' ').map((word) => ({ word, start: TITLE.indexOf(word) }));
const STAR_CARDS = [
  { className: 'star-card star-card--left', px: 0.12, base: 'rotate(-7deg)' },
  { className: 'star-card star-card--right', px: -0.12, base: 'rotate(6deg)' },
  { className: 'star-card star-card--bottom', px: -0.28, base: 'rotate(-1deg)' },
];

const GALLERY_RATIOS = ['3 / 4', '1 / 1', '4 / 5', '3 / 2', '2 / 3', '1 / 1'];

// The film-leader countdown runs first; everything in the opening scene is timed to start once it ends.
const LEADER = [3, 2, 1];
const LEADER_STEP_MS = 700;
const INTRO_MS = LEADER.length * LEADER_STEP_MS + 300;

const delay = (ms: number) => ({ '--delay': `${ms}ms` } as React.CSSProperties);
const afterIntro = (ms: number) => delay(INTRO_MS + ms);

const tilt = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  el.style.transform = `perspective(900px) rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.04)`;
};

const untilt = (e: React.MouseEvent<HTMLElement>) => {
  e.currentTarget.style.transform = '';
};

// Scroll-driven reveals, parallax and pinned scenes, applied directly to the DOM to avoid re-rendering on every frame.
const useCinematicScroll = (rootRef: React.RefObject<HTMLDivElement | null>, active: boolean) => {
  useEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return;

    const reveals = root.querySelectorAll<HTMLElement>('[data-reveal]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach((el) => el.classList.add('is-revealed'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          io.unobserve(entry.target);
        }),
      { threshold: 0.12 }
    );
    reveals.forEach((el) => io.observe(el));

    const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-px],[data-pxx]')).map((el) => ({
      el,
      scene: el.closest<HTMLElement>('[data-scene]') ?? el.parentElement!,
      y: Number(el.dataset.px ?? 0),
      x: Number(el.dataset.pxx ?? 0),
    }));
    const fades = Array.from(root.querySelectorAll<HTMLElement>('[data-fade]')).map((el) => ({
      el,
      scene: el.parentElement!,
      p: -1,
    }));
    const pins = Array.from(root.querySelectorAll<HTMLElement>('[data-pin]')).map((el) => ({
      el,
      track: el.querySelector<HTMLElement>('[data-track]'),
      ring: el.querySelector<HTMLElement>('[data-ring]'),
      bar: el.querySelector<HTMLElement>('[data-bar]'),
    }));

    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      // Phone scenes (upright or sideways) are tall relative to the screen, so full-strength parallax would push photos out of view.
      const depth = vw < 600 || vh < 500 ? 0.4 : 1;

      layers.forEach(({ el, scene, x, y }) => {
        const r = scene.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) return;
        const off = (r.top + r.height / 2 - vh / 2) * depth;
        el.style.transform = `translate3d(${-off * x}px,${-off * y}px,0)`;
      });

      pins.forEach(({ el, track, ring, bar }) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        const p = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
        if (track) track.style.transform = `translate3d(${-p * Math.max(0, track.scrollWidth - vw)}px,0,0)`;
        if (ring) ring.style.transform = `translateZ(calc(-1 * var(--ring-r))) rotateX(-6deg) rotateY(${p * -330}deg)`;
        if (bar) bar.style.transform = `scaleX(${p})`;
      });

      // Each scene fades to black as its last screen scrolls away, like a cut between shots.
      fades.forEach((f) => {
        const p = Math.min(1, Math.max(0, 1 - f.scene.getBoundingClientRect().bottom / vh));
        if (p === f.p) return;
        f.p = p;
        f.el.style.opacity = String(p * 0.85);
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    frame();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [rootRef, active]);
};

const SceneLabel: React.FC<{ num: string; label: string }> = ({ num, label }) => (
  <div className="scene-label reveal" data-reveal>
    <span>Scene {num}</span>
    <span className="scene-label__rule" />
    <span>{label}</span>
  </div>
);

const Fade: React.FC = () => <div className="cine-fade" data-fade aria-hidden="true" />;

// Photos are uncovered from the bottom up while the image settles from a slight zoom. The clip sits on an inner
// element because IntersectionObserver treats a fully clipped target as invisible, so it would never reveal.
const Wipe: React.FC<{ ms?: number; children: React.ReactNode }> = ({ ms = 0, children }) => (
  <div className="wipe reveal reveal--wipe" data-reveal style={delay(ms)}>
    <div className="wipe__inner">{children}</div>
  </div>
);

const Leader: React.FC = () => (
  <div className="cine-leader" aria-hidden="true">
    <div className="cine-leader__dial">
      <span className="cine-leader__sweep" />
      {LEADER.map((n, i) => (
        <span key={n} className="cine-leader__num" style={delay(i * LEADER_STEP_MS)}>
          {n}
        </span>
      ))}
    </div>
  </div>
);

const Sealed: React.FC<{ units: { label: string; value: string }[] }> = ({ units }) => (
  <section className="bday-sealed">
    <span className="wax-seal wax-seal--large">H</span>
    <div className="eyebrow eyebrow--wide">{BIRTHDAY_DATA.chapter} · Sealed</div>
    <h1 className="bday-sealed__title display">
      Not yet, <em>sayang</em>.
    </h1>
    <p className="bday-sealed__text">This page opens itself on the 21st of October. No peeking — just a little longer.</p>
    <div className="bday-sealed__countdown" role="timer">
      {units.map((u) => (
        <div key={u.label} className="bday-sealed__unit">
          <span className="countdown__value">{u.value}</span>
          <span className="eyebrow">{u.label}</span>
        </div>
      ))}
    </div>
  </section>
);

const Birthday: React.FC = () => {
  const { date, openingPhoto, tagline, starPhotos, months, everyVersion, gallery, letter, credits, unlockAt, forceUnlock } =
    BIRTHDAY_DATA;
  const [searchParams] = useSearchParams();
  const { reached, units } = useCountdown(unlockAt);
  const locked = !reached && !forceUnlock && !searchParams.has('preview');

  const [blown, setBlown] = useState<number[]>([]);
  const [giftOpen, setGiftOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  useCinematicScroll(rootRef, !locked);

  const wished = blown.length >= CANDLE_COUNT;
  const blow = (i: number) => setBlown((b) => (b.includes(i) ? b : [...b, i]));

  return (
    <div className="page page--bday">
      {locked ? <FloatingHearts /> : wished && <Confetti />}

      <Link to="/" className="back-link back-link--gold">← Archive</Link>

      {locked ? (
        <Sealed units={units} />
      ) : (
        <div ref={rootRef} className="cine" style={{ '--intro': `${INTRO_MS}ms` } as React.CSSProperties}>
          <Leader />
          <div className="cine-grain" aria-hidden="true" />

          <section className="cine-opening" data-scene>
            <div className="cine-opening__photo" data-px="0.35">
              <div className="cine-opening__shot">
                <PhotoSlot src={openingPhoto} label="Full-screen hero photo of her" priority />
              </div>
            </div>
            <div className="cine-opening__vignette" />
            <div className="cine-opening__leak" />
            <div className="cine-letterbox cine-letterbox--top" />
            <div className="cine-letterbox cine-letterbox--bottom" />
            <div className="cine-opening__text" data-px="-0.2">
              <div className="cine-opening__presents reveal reveal--blur" data-reveal style={afterIntro(500)}>
                Afiq presents
              </div>
              <h1 className="cine-opening__title">
                {TITLE_WORDS.map(({ word, start }) => (
                  <span key={word} className="cine-opening__word">
                    {[...word].map((ch, i) => (
                      <span key={i} className="reveal reveal--blur" data-reveal style={afterIntro(900 + (start + i) * 70)}>
                        {ch}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>
              <p className="cine-opening__name script reveal reveal--blur" data-reveal style={afterIntro(2100)}>Huda</p>
              <p className="cine-opening__date reveal" data-reveal style={afterIntro(2700)}>{date}</p>
            </div>
            <div className="cine-opening__hint">Scroll to begin ↓</div>
            <Fade />
          </section>

          <section className="cine-star" data-scene>
            <div className="cine-star__outline" data-pxx="0.5" aria-hidden="true">twenty-one</div>
            <div className="cine-star__text">
              <SceneLabel num="02" label="The birthday girl" />
              <h2 className="cine-heading reveal reveal--blur" data-reveal style={delay(120)}>
                The star <em>of the show</em>
              </h2>
              <p className="cine-star__tagline reveal" data-reveal style={delay(240)}>{tagline}</p>
            </div>
            <div className="cine-star__stack">
              {STAR_CARDS.map((card, i) => (
                <div key={card.className} className={card.className} data-px={card.px}>
                  <div
                    className="star-card__frame"
                    style={{ '--base': card.base } as React.CSSProperties}
                    onMouseMove={tilt}
                    onMouseLeave={untilt}
                  >
                    <Wipe ms={200 + i * 180}>
                      <PhotoSlot src={starPhotos[i]} />
                    </Wipe>
                  </div>
                </div>
              ))}
            </div>
            <Fade />
          </section>

          <section className="cine-year" data-pin>
            <div className="cine-pinned">
              <div className="cine-year__head">
                <SceneLabel num="03" label="A year of you" />
                <h2 className="cine-heading cine-heading--small reveal reveal--blur" data-reveal style={delay(120)}>
                  Twelve months, <em>one girl</em>
                </h2>
              </div>
              <div className="cine-year__track" data-track>
                {months.map((m, i) => {
                  const num = String(i + 1).padStart(2, '0');
                  return (
                    <figure key={m.name} className="month-card">
                      <span className="month-card__num" aria-hidden="true">{num}</span>
                      <div className="month-card__photo" onMouseMove={tilt} onMouseLeave={untilt}>
                        <Wipe>
                          <PhotoSlot src={m.src} label={m.name} />
                        </Wipe>
                      </div>
                      <figcaption>
                        <span className="script">{m.name}</span>
                        <span>{num} / 12</span>
                      </figcaption>
                    </figure>
                  );
                })}
              </div>
              <div className="cine-progress">
                <div className="cine-progress__bar" data-bar />
              </div>
            </div>
            <Fade />
          </section>

          <section className={`cine-wish${wished ? ' is-wished' : ''}`} data-scene>
            <div className="cine-wish__glow" />
            <SceneLabel num="04" label="Make a wish" />
            <h2 className="cine-wish__title reveal reveal--blur" data-reveal style={delay(120)}>
              {wished ? 'Your wish is safe with me ✦' : 'Make a wish, Huda'}
            </h2>
            <div className="cake reveal" data-reveal style={delay(200)}>
              <div className="cake__candles">
                {Array.from({ length: CANDLE_COUNT }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`candle${blown.includes(i) ? ' is-out' : ''}`}
                    onClick={() => blow(i)}
                    aria-label="Blow candle"
                  >
                    <span className="candle__flame" />
                    <span className="candle__wick" />
                    <span className="candle__stick" />
                  </button>
                ))}
              </div>
              <div className="cake__top" />
              <div className="cake__bottom" />
              <div className="cake__plate" />
            </div>
            <p className="cine-wish__label eyebrow eyebrow--wide">
              {wished ? 'Wish made' : 'Tap each candle to blow it out'}
            </p>
            <Fade />
          </section>

          <section className="cine-ring" data-pin>
            <div className="cine-pinned cine-pinned--center">
              <div className="cine-ring__head">
                <SceneLabel num="05" label="Every version of her" />
                <h2 className="cine-heading cine-heading--small reveal reveal--blur" data-reveal style={delay(120)}>
                  Keep scrolling, <em>she keeps going</em>
                </h2>
              </div>
              <div className="cine-ring__stage">
                <div className="cine-ring__wheel" data-ring>
                  {everyVersion.map((src, i) => (
                    <div
                      key={i}
                      className="cine-ring__card"
                      style={{ transform: `rotateY(${i * 30}deg) translateZ(var(--ring-r))` }}
                    >
                      <PhotoSlot src={src} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="cine-progress cine-progress--short">
                <div className="cine-progress__bar" data-bar />
              </div>
            </div>
            <Fade />
          </section>

          <section className="cine-gallery">
            <div className="cine-gallery__head">
              <SceneLabel num="06" label="The gallery" />
              <h2 className="cine-heading cine-heading--small reveal reveal--blur" data-reveal style={delay(120)}>
                Every <em>little moment</em>
              </h2>
            </div>
            <div className="cine-gallery__grid">
              {gallery.map((src, i) => (
                <div
                  key={src}
                  className="cine-gallery__item"
                  style={{ aspectRatio: GALLERY_RATIOS[i % GALLERY_RATIOS.length] }}
                >
                  <Wipe ms={(i % 3) * 120}>
                    <PhotoSlot src={src} />
                  </Wipe>
                </div>
              ))}
            </div>
            <Fade />
          </section>

          <section className="cine-letter">
            <SceneLabel num="07" label="The letter" />
            <button
              type="button"
              className={`gift${giftOpen ? ' is-open' : ''}`}
              onClick={() => setGiftOpen(true)}
              aria-label="Open gift"
            >
              <span className="gift__box" />
              <span className="gift__ribbon" />
              <span className="gift__lid">
                <span className="gift__ribbon gift__ribbon--lid" />
              </span>
            </button>
            <p className="cine-letter__hint">{giftOpen ? 'For you, birthday girl' : 'Tap the box to unwrap'}</p>
            {giftOpen && (
              <article className="bday-letter bday-letter--unfold">
                <h3 className="letter__greeting script" style={delay(700)}>{letter.greeting}</h3>
                {letter.paragraphs.map((p, i) => (
                  <p key={i} className="letter__para" style={delay(1000 + i * 300)}>{p}</p>
                ))}
                <p className="letter__sig script" style={delay(1000 + letter.paragraphs.length * 300)}>
                  {letter.signature}
                </p>
              </article>
            )}
            <Fade />
          </section>

          <section className="cine-credits">
            <SceneLabel num="08" label="Credits" />
            {credits.map((c) => (
              <div key={c.role} className="credit reveal" data-reveal>
                <span className="eyebrow eyebrow--wide">{c.role}</span>
                <span className="credit__name">{c.name}</span>
              </div>
            ))}
            <p className="cine-credits__end script reveal" data-reveal>To be continued…</p>
            <p className="eyebrow eyebrow--wide reveal" data-reveal style={delay(200)}>every 21st of October</p>
          </section>
        </div>
      )}
    </div>
  );
};

export default Birthday;
