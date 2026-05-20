import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { GALLERY } from '../../data/gallery';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

const FILTERS = ['All', 'Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

export default function Gallery() {
  const secRef   = useRef(null);
  const [filter, setFilter]   = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [lbIdx, setLbIdx]     = useState(0);

  const filtered = filter === 'All'
    ? GALLERY
    : GALLERY.filter(g => g.day === filter);

  useEffect(() => {
    const imgs = secRef.current.querySelectorAll('.gal__item');
    gsap.fromTo(imgs,
      { y:60, opacity:0, scale:.92 },
      {
        y:0, opacity:1, scale:1,
        duration:1, stagger:.06, ease:'power3.out',
        scrollTrigger:{
          trigger:secRef.current, start:'top 70%',
          toggleActions:'play none none reverse',
        },
      }
    );
  }, [filter]);

  const openLightbox = (img, idx) => {
    setLightbox(img);
    setLbIdx(idx);
  };

  const navLightbox = (dir) => {
    const next = (lbIdx + dir + filtered.length) % filtered.length;
    setLightbox(filtered[next]);
    setLbIdx(next);
  };

  return (
    <section ref={secRef} className="gal" id="gallery">
      <div className="gal__inner">
        <div className="gal__header">
          <span className="gal__label">MEMORIES</span>
          <h2 className="gal__title">The <em>Photos</em></h2>
          <p className="gal__sub">Real moments from the real journey</p>
        </div>

        {/* Filters */}
        <div className="gal__filters">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`gal__filter ${filter===f?'gal__filter--on':''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="gal__grid">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className={`gal__item gal__item--${img.aspect}`}
              onClick={() => openLightbox(img, i)}
            >
              <img src={img.src} alt={img.caption} loading="lazy" />
              <div className="gal__item-overlay">
                <span className="gal__item-cap">{img.caption}</span>
                <span className="gal__item-day">{img.day}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="gal__lb"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            exit={{ opacity:0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="gal__lb-inner"
              initial={{ scale:.88, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              exit={{ scale:.88, opacity:0 }}
              transition={{ duration:.45, ease:[.16,1,.3,1] }}
              onClick={e => e.stopPropagation()}
            >
              <img src={lightbox.src} alt={lightbox.caption} />
              <div className="gal__lb-info">
                <p className="gal__lb-cap">{lightbox.caption}</p>
                <span className="gal__lb-day">{lightbox.day}</span>
              </div>
              <button className="gal__lb-close" onClick={() => setLightbox(null)}>✕</button>
              <button className="gal__lb-nav gal__lb-nav--prev" onClick={() => navLightbox(-1)}>‹</button>
              <button className="gal__lb-nav gal__lb-nav--next" onClick={() => navLightbox(1)}>›</button>
              <span className="gal__lb-counter">{lbIdx+1} / {filtered.length}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}