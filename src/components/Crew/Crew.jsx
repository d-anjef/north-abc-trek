import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { CREW } from '../../data/crew';
import './Crew.css';

gsap.registerPlugin(ScrollTrigger);

export default function Crew() {
  const secRef = useRef(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const cards = secRef.current.querySelectorAll('.crew__card');
    gsap.fromTo(cards,
      { y: 80, opacity: 0, scale: 0.9 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 1, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  /* Lock body scroll when modal is open */
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <section ref={secRef} className="crew" id="crew">
      <div className="crew__inner">
        {/* Header */}
        <div className="crew__header">
          <span className="crew__label">THE TEAM</span>
          <h2 className="crew__title">Meet the <em>Squad</em></h2>
          <p className="crew__sub">10 people who said yes to the mountains</p>
        </div>

        {/* Group photo */}
        <div className="crew__group-wrap">
          <img
            src="/images/group-photo.jpg"
            alt="North ABC Expedition Group"
            className="crew__group-img"
          />
          <div className="crew__group-overlay">
            <span>All 10 — North ABC Base Camp</span>
          </div>
        </div>

        {/* Cards */}
        <div className="crew__grid">
          {CREW.map((person) => (
            <article
              key={person.id}
              className="crew__card"
              onClick={() => setSelected(person)}
            >
              <div className="crew__card-photo-wrap">
                <div className="crew__card-photo">
                  <img
                    src={person.photo}
                    alt={person.name}
                    className="crew__card-img"
                    onError={e => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="crew__card-initial"
                    style={{
                      display: 'none',
                      background: `${person.color}20`,
                      borderColor: `${person.color}40`,
                    }}
                  >
                    {person.initial}
                  </div>
                </div>

                {/* Photo overlay on hover */}
                <div className="crew__card-overlay">
                  <span className="crew__card-view">View Profile</span>
                </div>

                <div className="crew__card-number" style={{ color: person.color }}>
                  {String(person.id).padStart(2, '0')}
                </div>
              </div>

              <div className="crew__card-info">
                <h3 className="crew__card-name">{person.name}</h3>
                <span className="crew__card-role" style={{ color: person.color }}>
                  {person.role}
                </span>
                <p className="crew__card-profession">
                  💼 {person.profession}
                </p>
                <p className="crew__card-fun">{person.fun}</p>

                {/* Instagram link */}
                <a
                  href={`https://instagram.com/${person.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="crew__card-ig"
                  onClick={e => e.stopPropagation()}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                  </svg>
                  <span>@{person.instagram}</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Detailed Profile Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="crew__modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="crew__modal-inner"
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="crew__modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                ✕
              </button>

              {/* Photo side */}
              <div className="crew__modal-photo-wrap">
                <img src={selected.photo} alt={selected.name} className="crew__modal-photo" />
                <div className="crew__modal-photo-overlay" style={{ background: `linear-gradient(180deg, transparent, ${selected.color}20)` }}/>
                <div className="crew__modal-number" style={{ color: selected.color }}>
                  {String(selected.id).padStart(2, '0')} / 10
                </div>
              </div>

              {/* Info side */}
              <div className="crew__modal-info">
                <span
                  className="crew__modal-role"
                  style={{ color: selected.color }}
                >
                  {selected.role}
                </span>
                <h2 className="crew__modal-name">{selected.name}</h2>

                <div className="crew__modal-meta">
                  <div className="crew__modal-meta-item">
                    <span className="crew__modal-meta-label">Profession</span>
                    <span className="crew__modal-meta-value">{selected.profession}</span>
                  </div>
                  <div className="crew__modal-meta-item">
                    <span className="crew__modal-meta-label">From</span>
                    <span className="crew__modal-meta-value">📍 {selected.hometown}</span>
                  </div>
                </div>

                <p className="crew__modal-bio">{selected.bio}</p>

                <div className="crew__modal-funfact">
                  <span className="crew__modal-funfact-label">FUN FACT</span>
                  <span className="crew__modal-funfact-value">{selected.funFact}</span>
                </div>

                {/* Social links */}
                <div className="crew__modal-social">
                  <a
                    href={`https://instagram.com/${selected.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="crew__modal-social-btn"
                    style={{ borderColor: `${selected.color}60` }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>
                    </svg>
                    Follow on Instagram
                    <span className="crew__modal-social-handle">@{selected.instagram}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}