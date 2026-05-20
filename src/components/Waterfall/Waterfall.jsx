import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Waterfall.css';

gsap.registerPlugin(ScrollTrigger);

export default function Waterfall() {
  const secRef   = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const els = secRef.current.querySelectorAll('.wf__animate');
    gsap.fromTo(els,
      { y:60, opacity:0 },
      {
        y:0, opacity:1, stagger:.15, duration:1.2, ease:'power3.out',
        scrollTrigger:{
          trigger:secRef.current,
          start:'top 70%',
          toggleActions:'play none none reverse',
        },
      }
    );

    /* Auto play/pause video based on scroll visibility */
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={secRef} className="wf" id="waterfall">
      <div className="wf__inner">
        {/* Text side */}
        <div className="wf__text">
          <span className="wf__animate wf__label">DAY 2 · 12:45 PM</span>
          <h2 className="wf__animate wf__title">
            Phutphute<br/>
            <em>Waterfall</em>
          </h2>
          <div className="wf__animate wf__rule" />
          <p className="wf__animate wf__desc">
            After two hours of trekking from Humkhola through terrain that
            tested every step, the trail opened. The sound came first  distant
            thunder of falling water. Then the sight: Phutphute Waterfall.
          </p>
          <p className="wf__animate wf__desc">
            We stopped. Took tea. Took photos. Took breath. This is the moment
            every Annapurna trekker remembers the first reward.
          </p>

          <div className="wf__animate wf__meta">
            <div className="wf__meta-item">
              <span className="wf__meta-label">Location</span>
              <span className="wf__meta-value">Phutphute Jharana</span>
            </div>
            <div className="wf__meta-item">
              <span className="wf__meta-label">Arrived</span>
              <span className="wf__meta-value">12:45 PM</span>
            </div>
            <div className="wf__meta-item">
              <span className="wf__meta-label">Activity</span>
              <span className="wf__meta-value">Tea Break · Photos · Videos</span>
            </div>
          </div>
        </div>

        {/* Video side */}
        <div className="wf__animate wf__video-wrap">
          <video
            ref={videoRef}
            className="wf__video"
            src="/videos/waterfall.mp4"
            poster="/images/day2/phutphute-1.jpg"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="wf__video-overlay" />
          <div className="wf__video-badge">
            <span className="wf__video-dot" />
            LIVE FROM PHUTPHUTE
          </div>
          <div className="wf__video-caption">
            <span>🎬 Real footage from the trail</span>
          </div>
        </div>
      </div>

      {/* Real photos */}
      <div className="wf__photos wf__animate">
        {[
          { src:'/images/day2/phutphute-1.jpg', cap:'First sight of the falls' },
          { src:'/images/day2/phutphute-2.jpg', cap:'Up close with the water' },
          { src:'/images/day2/phutphute-3.jpg', cap:'Squad at Phutphute' },
        ].map((ph, i) => (
          <div key={i} className="wf__photo">
            <img src={ph.src} alt={ph.cap} />
            <span className="wf__photo-cap">{ph.cap}</span>
          </div>
        ))}
      </div>
    </section>
  );
}