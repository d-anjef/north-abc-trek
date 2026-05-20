import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

export default function Loader({ onComplete }) {
  const [pct,  setPct]  = useState(0);
  const [done, setDone] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setPct(p => {
        const next = Math.min(p + Math.random() * 3.5 + 0.8, 100);
        if (next >= 100) {
          clearInterval(timer.current);
          setTimeout(() => { setDone(true); setTimeout(onComplete, 900); }, 400);
        }
        return next;
      });
    }, 55);
    return () => clearInterval(timer.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="ldr"
          exit={{ opacity:0, scale:1.03 }}
          transition={{ duration:1, ease:[.16,1,.3,1] }}
        >
          {/* Background photo with overlay */}
          <div className="ldr__bg">
            <img src="/images/hero-bg.jpg" alt="" className="ldr__bg-img" />
            <div className="ldr__bg-overlay" />
          </div>

          {/* Stars */}
          <div className="ldr__stars">
            {Array.from({length:60},(_,i)=>(
              <div key={i} className="ldr__star" style={{
                left:`${Math.random()*100}%`,
                top:`${Math.random()*70}%`,
                width:`${.8+Math.random()*2}px`,
                height:`${.8+Math.random()*2}px`,
                animationDelay:`${Math.random()*5}s`,
                animationDuration:`${2+Math.random()*4}s`,
              }}/>
            ))}
          </div>

          {/* Content */}
          <motion.div
            className="ldr__content"
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:.3, duration:1.2, ease:[.16,1,.3,1] }}
          >
            <p className="ldr__eyebrow">North ABC Expedition · Nepal</p>
            <h1 className="ldr__title">North ABC</h1>
            <p className="ldr__subtitle">Expedition</p>
            <p className="ldr__tagline">10 Friends &nbsp;·&nbsp; 1 Mountain &nbsp;·&nbsp; Unforgettable</p>

            {/* Progress */}
            <div className="ldr__prog-wrap">
              <div className="ldr__prog-bar">
                <motion.div
                  className="ldr__prog-fill"
                  animate={{ width:`${pct}%` }}
                  transition={{ duration:.15 }}
                />
              </div>
              <span className="ldr__prog-pct">{Math.round(pct)}%</span>
            </div>
            <p className="ldr__loading-txt">Loading the expedition...</p>
          </motion.div>

          {/* Bottom names */}
          <motion.div
            className="ldr__names"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1, duration:1 }}
          >
            {['Anjef','Nabin','David','Salim','Sau Bhagya','Rishav','Azay','Sabin','Shreeshan','Biju'].map((n,i)=>(
              <span key={n} className="ldr__name" style={{ animationDelay:`${i*.1}s` }}>{n}</span>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}