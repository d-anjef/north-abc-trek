import { gsap, ScrollTrigger, EASE } from './gsapConfig';

export function createTextReveal(element, options = {}) {
  const {
    type = 'lines',
    stagger = 0.08,
    duration = 1.2,
    delay = 0,
    scrollTrigger = null,
  } = options;

  if (type === 'lines') {
    const lines = element.querySelectorAll('.reveal-line');
    if (lines.length === 0) return;

    return gsap.fromTo(
      lines,
      {
        y: 80,
        opacity: 0,
        rotateX: -15,
      },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration,
        stagger,
        delay,
        ease: EASE.cinematic,
        scrollTrigger: scrollTrigger
          ? {
              trigger: element,
              start: 'top 80%',
              ...scrollTrigger,
            }
          : undefined,
      }
    );
  }

  if (type === 'chars') {
    const chars = element.querySelectorAll('.reveal-char');
    if (chars.length === 0) return;

    return gsap.fromTo(
      chars,
      {
        y: 40,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        delay,
        ease: EASE.text,
        scrollTrigger: scrollTrigger
          ? {
              trigger: element,
              start: 'top 80%',
              ...scrollTrigger,
            }
          : undefined,
      }
    );
  }

  if (type === 'words') {
    const words = element.querySelectorAll('.reveal-word');
    if (words.length === 0) return;

    return gsap.fromTo(
      words,
      {
        y: 50,
        opacity: 0,
        filter: 'blur(4px)',
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.05,
        delay,
        ease: EASE.cinematic,
        scrollTrigger: scrollTrigger
          ? {
              trigger: element,
              start: 'top 80%',
              ...scrollTrigger,
            }
          : undefined,
      }
    );
  }

  /* Fallback: simple fade up */
  return gsap.fromTo(
    element,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: EASE.cinematic,
      scrollTrigger: scrollTrigger
        ? {
            trigger: element,
            start: 'top 80%',
            ...scrollTrigger,
          }
        : undefined,
    }
  );
}

export function splitTextToLines(text) {
  return text.split('\n').map((line, i) => ({
    text: line,
    key: i,
  }));
}

export function splitTextToWords(text) {
  return text.split(' ').map((word, i) => ({
    text: word,
    key: i,
  }));
}