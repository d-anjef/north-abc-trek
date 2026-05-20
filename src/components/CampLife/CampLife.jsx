import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import './CampLife.css';

gsap.registerPlugin(ScrollTrigger);

const CAMP_MOMENTS = [
  {
    id: 1,
    icon: '⛺',
    title: 'The Tent Inequality',
    subtitle: 'Day 2 · Busket Mela Camp',
    story: 'Two tents. Ten people. Some slept like kings — others spent the night folded like origami. We laughed about it the next morning. (Well, the comfortable ones did.)',
    photos: ['/images/day2/busket-mela-camp.jpg',],
    color: '#e8956a',
  },
  {
    id: 2,
    icon: '🍳',
    title: 'Mountain Kitchen Chaos',
    subtitle: 'Day 2 · Cooking Together',
    story: 'Cooking dinner at altitude with 10 people trying to help (and getting in the way). Somehow Azay made it taste like a 5-star restaurant. The food disappeared in minutes.',
    photos: ['/images/day3/cooking.jpg'],
    color: '#f5b97a',
  },
  {
    id: 3,
    icon: '🃏',
    title: 'UNO Championships',
    subtitle: 'Day 3 · Panchakunda',
    story: 'The cold wind kicked in by afternoon. Everyone retreated into the tents. UNO came out. Cards flew. Voices rose. Friendships were tested. It was glorious.',
    photos: ['/images/uno.jpg'],
    color: '#a8c8d8',
  },
  {
    id: 4,
    icon: '🌌',
    title: 'Sleepless at Altitude',
    subtitle: 'Day 3 · The Long Night',
    story: 'Some of us couldn\'t sleep. The altitude, the cold, the thin pillows — or maybe just the realization that we were in the middle of the Himalayas. Worth every restless minute.',
    photos: ['/images/galaxy.jpg'],
    color: '#c8d8a8',
  },
];

export default function CampLife() {
  const secRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const els = secRef.current.querySelectorAll('.cl__animate');
    gsap.fromTo(els,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, stagger: 0.12, duration: 1.9, ease: 'power3.out',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  /* Auto-cycle through moments */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % CAMP_MOMENTS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const current = CAMP_MOMENTS[activeIdx];

  return (
    <section ref={secRef} className="cl" id="camplife">
      {/* Subtle stars background */}
      <div className="cl__stars">
        {Array.from({ length: 80 }, (_, i) => (
          <div
            key={i}
            className="cl__star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${0.5 + Math.random() * 2}px`,
              height: `${0.5 + Math.random() * 2}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${2 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Campfire effect (decorative) */}
      <div className="cl__campfire">
        <div className="cl__flame cl__flame--1" />
        <div className="cl__flame cl__flame--2" />
        <div className="cl__flame cl__flame--3" />
        <div className="cl__fire-glow" />
      </div>

      <div className="cl__inner">
        {/* Header */}
        <div className="cl__header">
          <span className="cl__animate cl__label">DAY 2 — 3 · CAMP LIFE</span>
          <h2 className="cl__animate cl__title">
            When the trail ended,<br />
            <em>the stories began</em>
          </h2>
          <p className="cl__animate cl__sub">
            What happens in the mountains stays in the mountains.<br />
            (Except for these stories — they live here forever.)
          </p>
        </div>

        {/* Main layout */}
        <div className="cl__animate cl__layout">
          {/* Left: Moment selector */}
          <div className="cl__moments">
            {CAMP_MOMENTS.map((moment, i) => (
              <button
                key={moment.id}
                className={`cl__moment-btn ${activeIdx === i ? 'cl__moment-btn--on' : ''}`}
                onClick={() => setActiveIdx(i)}
                style={{ '--moment-color': moment.color }}
              >
                <span className="cl__moment-icon">{moment.icon}</span>
                <div className="cl__moment-text">
                  <span className="cl__moment-title">{moment.title}</span>
                  <span className="cl__moment-sub">{moment.subtitle}</span>
                </div>
                <span className="cl__moment-num">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>

          {/* Right: Active moment display */}
          <div className="cl__display">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                className="cl__display-content"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Photo */}
                <div
                  className="cl__photo-main"
                  onClick={() => setLightbox(current.photos[0])}
                >
                  <img src={current.photos[0]} alt={current.title} />
                  <div className="cl__photo-overlay" />
                  <div className="cl__photo-badge" style={{ background: current.color }}>
                    {current.icon}
                  </div>
                </div>

                {/* Story */}
                <div className="cl__story-box">
                  <span
                    className="cl__story-tag"
                    style={{ color: current.color }}
                  >
                    {current.subtitle}
                  </span>
                  <h3 className="cl__story-title">{current.title}</h3>
                  <p className="cl__story-text">{current.story}</p>
                </div>

                {/* Additional photos */}
                {current.photos.length > 1 && (
                  <div className="cl__photo-strip">
                    {current.photos.slice(1).map((src, i) => (
                      <div
                        key={i}
                        className="cl__photo-thumb"
                        onClick={() => setLightbox(src)}
                      >
                        <img src={src} alt={`${current.title} ${i + 2}`} />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="cl__dots">
              {CAMP_MOMENTS.map((_, i) => (
                <button
                  key={i}
                  className={`cl__dot ${activeIdx === i ? 'cl__dot--on' : ''}`}
                  onClick={() => setActiveIdx(i)}
                  aria-label={`Moment ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quote */}
        <div className="cl__animate cl__quote">
          <p>
            "We came for the mountains.<br />
            We left with stories that will outlast them."
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="cl__lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox}
              alt="Camp life"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="cl__lightbox-close"
              onClick={() => setLightbox(null)}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}