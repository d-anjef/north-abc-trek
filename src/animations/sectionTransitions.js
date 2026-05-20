import { gsap, EASE } from './gsapConfig';

export function createCinematicEntry(section) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top 80%',
      end: 'top 20%',
      scrub: 0.5,
    },
  });

  const title = section.querySelector('.section-title');
  const subtitle = section.querySelector('.section-subtitle');
  const content = section.querySelector('.section-content');
  const visual = section.querySelector('.section-visual');

  if (visual) {
    tl.fromTo(
      visual,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: EASE.cinematic }
    );
  }

  if (title) {
    tl.fromTo(
      title,
      { y: 80, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: EASE.text },
      '-=1'
    );
  }

  if (subtitle) {
    tl.fromTo(
      subtitle,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.cinematic },
      '-=0.8'
    );
  }

  if (content) {
    tl.fromTo(
      content,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.smooth },
      '-=0.6'
    );
  }

  return tl;
}

export function createEnvironmentTransition(from, to, options = {}) {
  const tl = gsap.timeline(options);

  tl.to(from, {
    opacity: 0,
    scale: 0.95,
    filter: 'blur(8px)',
    duration: 0.8,
    ease: EASE.smooth,
  });

  tl.fromTo(
    to,
    {
      opacity: 0,
      scale: 1.05,
      filter: 'blur(8px)',
    },
    {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1,
      ease: EASE.cinematic,
    },
    '-=0.3'
  );

  return tl;
}