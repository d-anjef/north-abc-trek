import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Pokhara.css';

gsap.registerPlugin(ScrollTrigger);

export default function Pokhara() {
  const secRef = useRef(null);

  useEffect(() => {
    const els = secRef.current.querySelectorAll('.pkh__animate');
    gsap.fromTo(els,
      { y:60, opacity:0 },
      {
        y:0, opacity:1, stagger:.15, duration:1.2, ease:'power3.out',
        scrollTrigger:{ trigger:secRef.current, start:'top 70%', toggleActions:'play none none reverse' },
      }
    );
  }, []);

  return (
    <section ref={secRef} className="pkh" id="pokhara">
      <div className="pkh__inner">
        <div className="pkh__header">
          <span className="pkh__animate pkh__label">DAY 5 · POKHARA</span>
          <h2 className="pkh__animate pkh__title">The <em>Finale</em></h2>
          <p className="pkh__animate pkh__sub">When the mountains were done with us, the lake had other plans.</p>
        </div>

        <div className="pkh__layout">
          {/* Video section */}
          <div className="pkh__animate pkh__video-wrap">
            <video
              className="pkh__video"
              src="/videos/boating-incident.mp4"
              controls
              playsInline
              poster="/images/day5/boating-1.jpg"
            />
            <div className="pkh__video-label">
              <span>🎬 The Boating Incident — Phewa Lake</span>
            </div>
          </div>

          {/* Story */}
          <div className="pkh__story">
            <div className="pkh__animate pkh__incident">
              <h3>The Incident 😂</h3>
              <p>
                We thought the hardest part was behind us. Five days of trekking,
                dangerous jeep roads, altitude headaches — all done. Just a relaxing
                2 hours on Phewa Lake. Three boats. One big boat for most of us.
                A kayak. And a paddle boat.
              </p>
              <p>
                The paddle boat duo decided standing up was a good idea.
                Playing around. Laughing. Then — splash. One person in the water.
              </p>
              <p>
                The kayaker, ever the hero, rows over to help. Gets too close.
                Tips the kayak. Also in the water.
              </p>
              <p>
                Meanwhile, from our big boat — we watched the whole thing happen.
                Too far to help. Too busy laughing to try.
              </p>
              <p className="pkh__highlight">
                Both had life jackets. Both could swim. Both got themselves back
                into their boats without any help from us whatsoever. 
                We are, objectively, great friends.
              </p>
            </div>

            {/* Photos grid */}
            <div className="pkh__animate pkh__photos">
              {[
                { src:'/images/day5/boating-1.jpg',   cap:'Phewa Lake — peaceful, before the incident' },
                { src:'/images/day5/boating-fall.jpg', cap:'The moment 😂' },
                { src:'/images/day5/pokhara-lake.jpg', cap:'Phewa Lake' },
                { src:'/images/day5/hotel-dejavu.jpg', cap:'Hotel DejaVu — earned this' },
              ].map((ph,i) => (
                <div key={i} className="pkh__photo">
                  <img src={ph.src} alt={ph.cap} />
                  <span>{ph.cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}