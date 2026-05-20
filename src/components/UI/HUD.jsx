import { motion, AnimatePresence } from 'framer-motion';
import './HUD.css';

const SECTION_NAMES = ['','Hero','Crew','Journey','Map','Waterfall','Camp','Base Camp','Gallery','Pokhara','End'];

export default function HUD({ progress, section, visible }) {
  const pct = Math.round(progress * 100);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hud"
          initial={{ opacity:0, x:-30 }}
          animate={{ opacity:1, x:0 }}
          exit={{ opacity:0, x:-30 }}
          transition={{ duration:.8, ease:[.16,1,.3,1] }}
        >
          <div className="hud__section">
            {SECTION_NAMES[Math.min(section, SECTION_NAMES.length-1)] || 'North ABC'}
          </div>
          <div className="hud__bar">
            <div className="hud__bar-fill" style={{ width:`${pct}%` }} />
          </div>
          <div className="hud__pct">{pct}%</div>
          <div className="hud__label">EXPEDITION PROGRESS</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}