import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CREW } from '../../data/crew';
import './Ending.css';

gsap.registerPlugin(ScrollTrigger);

export default function Ending() {
  const secRef = useRef(null);

  useEffect(() => {
    const els = secRef.current.querySelectorAll('.end__animate');
    gsap.fromTo(els,
      { y:50, opacity:0 },
      {
        y:0, opacity:1, stagger:.18, duration:1.3, ease:'power3.out',
        scrollTrigger:{ trigger:secRef.current, start:'top 65%', toggleActions:'play none none reverse' },
      }
    );
    /* Stars twinkling */
    const names = secRef.current.querySelectorAll('.end__name');
    gsap.fromTo(names,
      { opacity:0, y:20 },
      {
        opacity:1, y:0, stagger:.1, duration:.8, ease:'power3.out',
        scrollTrigger:{ trigger:secRef.current, start:'top 60%' },
      }
    );
  }, []);

  return (
    <section ref={secRef} className="end" id="ending">
      {/* Stars */}
      <div className="end__stars">
        {Array.from({length:200},(_,i)=>(
          <div key={i} className="end__star" style={{
            left:`${Math.random()*100}%`,
            top:`${Math.random()*100}%`,
            width:`${.5+Math.random()*2}px`,
            height:`${.5+Math.random()*2}px`,
            animationDelay:`${Math.random()*8}s`,
            animationDuration:`${2+Math.random()*5}s`,
          }}/>
        ))}
      </div>

      {/* Final group photo */}
      <div className="end__photo-wrap">
        <img src="/images/group-photo.jpg" alt="North ABC Expedition" className="end__photo" />
        <div className="end__photo-overlay" />
      </div>

      {/* Content */}
      <div className="end__content">
        <span className="end__animate end__label">
          North ABC Expedition · Myagdi, Nepal
        </span>

        <h2 className="end__animate end__title">
          10 friends walked into<br/>
          <em>the mountains.</em>
        </h2>

        <p className="end__animate end__sub">
          All 10 came back. Mostly dry.
        </p>

        <div className="end__animate end__rule" />

        <p className="end__animate end__quote">
          "From the chaos of Thamel to the silence of Panchakunda,
          from terrifying jeep roads to sacred lakes at altitude —
          this was never just a trek. It was 10 people choosing
          the hard thing together, and being better for it."
        </p>

        {/* Stats */}
        <div className="end__animate end__stats">
          {[
            ['5','Days'],
            ['4,130m','Highest Point'],
            ['67+ km','Walked'],
            ['10','Friends'],
            ['2','Fell in Lake'],
            ['∞','Memories'],
          ].map(([v,l]) => (
            <div key={l} className="end__stat">
              <span className="end__stat-v">{v}</span>
              <span className="end__stat-l">{l}</span>
            </div>
          ))}
        </div>

        {/* Names */}
        <div className="end__animate end__names-wrap">
          <p className="end__names-title">The Expedition</p>
          <div className="end__names">
            {CREW.map((person, i) => (
              <div key={person.id} className="end__name" style={{ animationDelay:`${i*.08}s` }}>
                <span className="end__name-text" style={{ color:person.color }}>
                  {person.name}
                </span>
                <span className="end__name-role">{person.role}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="end__animate end__closing">
          <p>Until the next mountain. 🏔️</p>
        </div>
      </div>
    </section>
  );
}