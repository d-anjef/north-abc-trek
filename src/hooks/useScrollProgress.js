import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [section,  setSection]  = useState(0);
  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        setProgress(self.progress);
        setSection(Math.floor(self.progress * 10));
      },
    });
    return () => st.kill();
  }, []);
  return { progress, section };
}