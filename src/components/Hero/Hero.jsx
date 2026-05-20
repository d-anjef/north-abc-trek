import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const secRef  = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    /* Wait for layout to settle */
    const ctx = gsap.context(() => {
      /* Set initial state explicitly */
      gsap.set(bodyRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      });

      /* Create scroll-driven fade out */
      gsap.to(bodyRef.current, {
        y: -150,
        opacity: 0,
        scale: 0.92,
        filter: 'blur(12px)',
        ease: 'none',
        scrollTrigger: {
          trigger: secRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          /* No pinning — let it scroll naturally */
        },
      });
    }, secRef);

    /* Refresh after a tick to ensure everything is measured */
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: .12, delayChildren: .3 } },
  };

  const item = {
    hidden: { opacity: 0, y: 60, filter: 'blur(6px)' },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [.16, 1, .3, 1] },
    },
  };

  return (
    <section ref={secRef} className="hero" id="hero">
      {/* Real photo background */}
      <div className="hero__bg">
        <img
          src="/images/hero-bg.jpg"
          alt="North ABC"
          className="hero__bg-img"
          loading="eager"
        />
        <div className="hero__bg-overlay" />
      </div>

      {/* Video background (optional — comment out if not using) */}
      <video
        className="hero__video"
        src="/videos/hero-reel.mp4"
        autoPlay muted loop playsInline
        onError={e => { e.target.style.display = 'none'; }}
      />

      {/* Content */}
      <motion.div
        ref={bodyRef}
        className="hero__content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item} className="hero__eyebrow">
          <span className="hero__eye-line" />
          <span>Myagdi District, Nepal</span>
          <span className="hero__eye-line" />
        </motion.div>

        <motion.h1 variants={item} className="hero__title">
          North ABC<br />
          <em>Expedition</em>
        </motion.h1>

        <motion.p variants={item} className="hero__sub">
          10 Friends &nbsp;·&nbsp; 5 Days &nbsp;·&nbsp; 4,130 Metres
        </motion.p>

        <motion.p variants={item} className="hero__desc">
          From the chaos of Taukhel to the silence of the Himalayas —<br />
          this is our story.
        </motion.p>

        <motion.div variants={item} className="hero__crew-preview">
          {['AD', 'NM', 'DM', 'SM', 'SBD', 'RM', 'AM', 'SM', 'ShM', 'BS'].map((init, i) => (
            <div key={i} className="hero__avatar" style={{ animationDelay: `${i * .08}s` }}>
              {init}
            </div>
          ))}
        </motion.div>

        <motion.div variants={item} className="hero__scroll">
          <div className="hero__scroll-mouse">
            <div className="hero__scroll-dot" />
          </div>
          <span>Scroll to explore</span>
        </motion.div>
      </motion.div>
    </section>
  );
}