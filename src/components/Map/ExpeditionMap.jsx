import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { MAP_POINTS } from '../../data/mapPoints';
import './ExpeditionMap.css';

gsap.registerPlugin(ScrollTrigger);

/* SVG path connecting all points */
const buildPath = (points) => {
  return points.map((p, i) => {
    const x = (p.x / 100) * 900;
    const y = (p.y / 100) * 600;
    return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
};

export default function ExpeditionMap() {
  const secRef   = useRef(null);
  const pathRef  = useRef(null);
  const [selected, setSelected] = useState(null);
  const [photoIdx, setPhotoIdx] = useState(0);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray:len, strokeDashoffset:len });

    gsap.to(path, {
      strokeDashoffset:0,
      ease:'none',
      scrollTrigger:{
        trigger:secRef.current,
        start:'top 60%', end:'bottom 30%', scrub:1,
      },
    });

    /* Animate points in */
    const pts = secRef.current.querySelectorAll('.map__point');
    gsap.fromTo(pts,
      { scale:0, opacity:0 },
      {
        scale:1, opacity:1, stagger:.15, duration:.6, ease:'back.out(2)',
        scrollTrigger:{ trigger:secRef.current, start:'top 55%', toggleActions:'play none none reverse' },
      }
    );
  }, []);

  const handleSelect = (point) => {
    setSelected(point);
    setPhotoIdx(0);
  };

  return (
    <section ref={secRef} className="xmap" id="map">
      <div className="xmap__inner">
        <div className="xmap__header">
          <span className="xmap__label">THE ROUTE</span>
          <h2 className="xmap__title">Our <em>Path</em></h2>
          <p className="xmap__sub">Click any location to see real photos from that spot</p>
        </div>

        <div className="xmap__layout">
          {/* Map SVG */}
          <div className="xmap__map-wrap">
            <svg
              className="xmap__svg"
              viewBox="0 0 900 600"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Hand-drawn terrain lines */}
              {[
                'M 0,580 C 150,540 300,520 450,500 C 600,480 750,460 900,440',
                'M 0,560 C 200,510 350,490 500,470 C 650,450 800,420 900,400',
                'M 50,540 C 180,490 320,460 470,440 C 620,420 770,380 900,360',
              ].map((d,i) => (
                <path key={i} d={d} fill="none"
                  stroke="rgba(168,200,216,.06)" strokeWidth="1" />
              ))}

              {/* Mountain peaks (decorative triangles) */}
              {[
                [12,12],[20,20],[30,15],[8,25],
              ].map(([x,y],i) => {
                const sx = (x/100)*900, sy = (y/100)*600;
                return (
                  <polygon key={i}
                    points={`${sx},${sy-20} ${sx-15},${sy+5} ${sx+15},${sy+5}`}
                    fill="rgba(168,200,216,.1)"
                    stroke="rgba(168,200,216,.2)"
                    strokeWidth=".5"
                  />
                );
              })}

              {/* Animated route path */}
              <path
                ref={pathRef}
                d={buildPath(MAP_POINTS)}
                fill="none"
                stroke="var(--c-gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="8 4"
              />

              {/* Glow path */}
              <path
                d={buildPath(MAP_POINTS)}
                fill="none"
                stroke="var(--c-gold)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity=".08"
                style={{ filter:'blur(4px)' }}
              />

              {/* Location markers */}
              {MAP_POINTS.map((pt) => {
                const x = (pt.x / 100) * 900;
                const y = (pt.y / 100) * 600;
                const isActive = selected?.id === pt.id;

                return (
                  <g
                    key={pt.id}
                    className="map__point"
                    transform={`translate(${x},${y})`}
                    onClick={() => handleSelect(pt)}
                    style={{ cursor:'pointer' }}
                  >
                    {/* Pulse ring */}
                    {pt.isHighlight && (
                      <circle r="18" fill="none"
                        stroke={pt.color} strokeWidth="1"
                        opacity=".3"
                        style={{ animation:'ripple 2s ease-out infinite' }}
                      />
                    )}

                    {/* Outer ring */}
                    <circle
                      r={pt.isSummit ? 14 : pt.isHighlight ? 10 : 7}
                      fill="rgba(8,8,16,.8)"
                      stroke={isActive ? '#fff' : pt.color}
                      strokeWidth={isActive ? 2 : 1}
                    />

                    {/* Inner dot */}
                    <circle
                      r={pt.isSummit ? 6 : pt.isHighlight ? 4 : 3}
                      fill={pt.color}
                    />

                    {/* Summit star */}
                    {pt.isSummit && (
                      <text
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10" fill="#fff"
                        style={{ userSelect:'none' }}
                      >
                        ★
                      </text>
                    )}

                    {/* Label */}
                    <text
                      x="0"
                      y={pt.y < 30 ? 22 : -16}
                      textAnchor="middle"
                      fill={isActive ? '#fff' : 'rgba(240,236,228,.8)'}
                      fontSize="11"
                      fontFamily="'Space Grotesk', sans-serif"
                      fontWeight={isActive ? '600' : '400'}
                    >
                      {pt.label}
                    </text>
                    <text
                      x="0"
                      y={pt.y < 30 ? 35 : -4}
                      textAnchor="middle"
                      fill={pt.color}
                      fontSize="8"
                      fontFamily="'Space Mono', monospace"
                    >
                      {pt.day}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map legend */}
            <div className="xmap__legend">
              <div className="xmap__legend-item">
                <div className="xmap__legend-dot" style={{ background:'var(--c-gold)' }}/>
                <span>Route</span>
              </div>
              <div className="xmap__legend-item">
                <div className="xmap__legend-dot" style={{ background:'#4a90d8' }}/>
                <span>Water</span>
              </div>
              <div className="xmap__legend-item">
                <div className="xmap__legend-dot xmap__legend-dot--star"/>
                <span>Summit</span>
              </div>
            </div>
          </div>

          {/* Photo panel */}
          <div className="xmap__panel">
            <AnimatePresence mode="wait">
              {selected ? (
                <motion.div
                  key={selected.id}
                  className="xmap__detail"
                  initial={{ opacity:0, x:30 }}
                  animate={{ opacity:1, x:0 }}
                  exit={{ opacity:0, x:-30 }}
                  transition={{ duration:.5, ease:[.16,1,.3,1] }}
                >
                  <div className="xmap__detail-header">
                    <div>
                      <span className="xmap__detail-day" style={{ color:selected.color }}>
                        {selected.day}
                      </span>
                      <h3 className="xmap__detail-title">{selected.label}</h3>
                      <p className="xmap__detail-sub">{selected.sublabel}</p>
                    </div>
                    <button className="xmap__close" onClick={() => setSelected(null)}>✕</button>
                  </div>

                  <p className="xmap__detail-desc">{selected.description}</p>

                  {/* Photos */}
                  {selected.photos.length > 0 && (
                    <div className="xmap__detail-photos">
                      <div className="xmap__main-photo">
                        <img
                          src={selected.photos[photoIdx].src}
                          alt={selected.photos[photoIdx].caption}
                        />
                        <span className="xmap__main-cap">
                          {selected.photos[photoIdx].caption}
                        </span>
                      </div>
                      {selected.photos.length > 1 && (
                        <div className="xmap__thumbs">
                          {selected.photos.map((ph,i) => (
                            <div
                              key={i}
                              className={`xmap__thumb ${photoIdx===i?'xmap__thumb--on':''}`}
                              onClick={() => setPhotoIdx(i)}
                            >
                              <img src={ph.src} alt={ph.caption} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  className="xmap__placeholder"
                  initial={{ opacity:0 }}
                  animate={{ opacity:1 }}
                  exit={{ opacity:0 }}
                >
                  <div className="xmap__placeholder-icon">📍</div>
                  <p>Click any location on the map<br/>to see our real photos from there</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}