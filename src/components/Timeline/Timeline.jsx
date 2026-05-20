import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { DAYS } from '../../data/timeline';
import './Timeline.css';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const secRef   = useRef(null);
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const items = secRef.current.querySelectorAll('.tl__item');
    items.forEach(item => {
      gsap.fromTo(item,
        { x:-60, opacity:0 },
        {
          x:0, opacity:1, duration:1.1, ease:'power3.out',
          scrollTrigger:{
            trigger:item, start:'top 82%',
            toggleActions:'play none none reverse',
          },
        }
      );
    });

    const spine = secRef.current.querySelector('.tl__spine');
    gsap.fromTo(spine,
      { scaleY:0, transformOrigin:'top center' },
      {
        scaleY:1, duration:1, ease:'none',
        scrollTrigger:{
          trigger:secRef.current,
          start:'top 80%', end:'bottom 20%', scrub:1,
        },
      }
    );
  }, []);

  return (
    <section ref={secRef} className="tl" id="timeline">
      <div className="tl__inner">
        <div className="tl__header">
          <span className="tl__label">THE JOURNEY</span>
          <h2 className="tl__title">Day by <em>Day</em></h2>
          <p className="tl__sub">5 days that changed everything</p>
        </div>

        {/* Day selector tabs */}
        <div className="tl__tabs">
          {DAYS.map((d,i) => (
            <button
              key={d.day}
              className={`tl__tab ${active===i?'tl__tab--on':''}`}
              onClick={() => setActive(i)}
            >
              <span className="tl__tab-emoji">{d.emoji}</span>
              <span className="tl__tab-day">{d.date}</span>
            </button>
          ))}
        </div>

        <div className="tl__track">
          <div className="tl__spine" />

          {DAYS.map((day, i) => (
            <div
              key={day.day}
              className={`tl__item ${active===i?'tl__item--active':''}`}
              onClick={() => setActive(i)}
            >
              {/* Node */}
              <div className="tl__node-wrap">
                <div className="tl__node">
                  <span>{day.emoji}</span>
                </div>
                {i < DAYS.length - 1 && <div className="tl__connector" />}
              </div>

              {/* Content */}
              <div className="tl__content" style={{ '--day-color': day.color }}>
                <div className="tl__content-header">
                  <span className="tl__day-badge">{day.date}</span>
                  <span className="tl__location">{day.location}</span>
                </div>
                <h3 className="tl__day-title">{day.title}</h3>
                <p className="tl__story">{day.story}</p>

                {/* Highlights */}
                <AnimatePresence>
                  {active === i && (
                    <motion.div
                      className="tl__highlights"
                      initial={{ height:0, opacity:0 }}
                      animate={{ height:'auto', opacity:1 }}
                      exit={{ height:0, opacity:0 }}
                      transition={{ duration:.5 }}
                    >
                      <ul>
                        {day.highlights.map((h,j) => (
                          <li key={j} className="tl__highlight">
                            <span className="tl__highlight-dot" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Photo strip */}
                {day.photos.length > 0 && (
                  <div className="tl__photos">
                    {day.photos.map((ph, j) => (
                      <div
                        key={j}
                        className="tl__photo"
                        onClick={e => { e.stopPropagation(); setLightbox(ph); }}
                      >
                        <img src={ph.src} alt={ph.caption} />
                        <span className="tl__photo-cap">{ph.caption}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="tl__lightbox"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="tl__lightbox-inner"
              initial={{ scale:.85 }}
              animate={{ scale:1 }}
              exit={{ scale:.85 }}
              transition={{ duration:.4, ease:[.16,1,.3,1] }}
            >
              <img src={lightbox.src} alt={lightbox.caption} />
              <p>{lightbox.caption}</p>
              <button onClick={() => setLightbox(null)}>✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}