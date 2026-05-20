import { gsap, ScrollTrigger, EASE } from './gsapConfig';

export function createParallax(element, speed = 0.5, scrollTrigger = {}) {
  return gsap.to(element, {
    y: () => speed * 200,
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      ...scrollTrigger,
    },
  });
}

export function createPinnedSection(trigger, options = {}) {
  const {
    duration = '200%',
    onUpdate,
    onEnter,
    onLeave,
  } = options;

  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: `+=${duration}`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => onUpdate && onUpdate(self.progress),
    onEnter,
    onLeave,
  });
}

export function createFadeInOnScroll(elements, options = {}) {
  const { stagger = 0.15, y = 60, duration = 1.2 } = options;

  return gsap.fromTo(
    elements,
    { y, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: EASE.cinematic,
      scrollTrigger: {
        trigger: elements[0] || elements,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createScaleReveal(element, options = {}) {
  const { duration = 1.5 } = options;

  return gsap.fromTo(
    element,
    {
      scale: 0.85,
      opacity: 0,
      filter: 'blur(10px)',
    },
    {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      ease: EASE.dramatic,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );
}

export function createHorizontalScroll(container, panels, options = {}) {
  const totalWidth = panels.length * 100;

  return gsap.to(panels, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      snap: 1 / (panels.length - 1),
      end: () => `+=${totalWidth}%`,
      ...options,
    },
  });
}