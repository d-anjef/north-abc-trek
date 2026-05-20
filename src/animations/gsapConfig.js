import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ===== GLOBAL GSAP DEFAULTS ===== */
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
});

/* ===== CUSTOM EASING ===== */
export const EASE = {
  smooth: 'power2.inOut',
  cinematic: 'power3.out',
  dramatic: 'expo.out',
  elastic: 'elastic.out(1, 0.5)',
  bounce: 'back.out(1.4)',
  slowMo: 'slow(0.7, 0.7, false)',
  text: 'power4.out',
  camera: 'power2.inOut',
};

/* ===== SCROLL TRIGGER DEFAULTS ===== */
export const createScrollTrigger = (trigger, options = {}) => ({
  trigger,
  start: 'top 80%',
  end: 'bottom 20%',
  toggleActions: 'play none none reverse',
  ...options,
});

/* ===== BATCH REFRESH ===== */
export const refreshScrollTriggers = () => {
  ScrollTrigger.refresh();
};

export { gsap, ScrollTrigger };