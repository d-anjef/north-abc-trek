import { motion } from 'framer-motion';
import './NavDots.css';

const DOTS = ['Hero','Crew','Timeline','Map','Gallery','Pokhara','End'];

export default function NavDots({ section, visible }) {
  if (!visible) return null;
  return (
    <motion.nav className="ndots"
      initial={{ opacity:0, x:20 }}
      animate={{ opacity:1, x:0 }}
      transition={{ duration:.8, delay:.5 }}
    >
      {DOTS.map((label, i) => (
        <div key={label} className={`ndot ${i===section?'ndot--on':''}`} title={label}>
          <div className="ndot__c" />
          <span className="ndot__l">{label}</span>
        </div>
      ))}
    </motion.nav>
  );
}