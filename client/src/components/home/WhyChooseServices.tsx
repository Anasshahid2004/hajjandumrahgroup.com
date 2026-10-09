import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame = 0;
    const startedAt = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setValue(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = window.requestAnimationFrame(animate);
    };

    frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [active, duration, target]);

  return value;
}

export function WhyChooseServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const rentals = useCountUp(10, 1400, hasEntered);
  const rating = useCountUp(4.9, 1400, hasEntered);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="section why-choose"
      ref={sectionRef}
      aria-labelledby="why-choose-title"
    >
      <div className="container why-choose__grid">
        <div className="why-choose__copy">
          <span className="eyebrow">Why Choose Us Services</span>
          <h2 id="why-choose-title">
            Comfortable, reliable travel
            <br />
            <em>for every pilgrim.</em>
          </h2>
          <p className="why-choose__intro">
            From airport arrivals to city and intercity journeys, we help make
            travel plans clear, comfortable, and easier to coordinate.
          </p>

          <div className="why-choose__service-panel">
            <span className="why-choose__watermark" aria-hidden="true">
              01
            </span>
            <h3>Right vehicle for every group</h3>
            <p>
              Share your route, dates, and group size. Explore the fleet and
              contact our team to confirm a suitable option and availability.
            </p>
            <Link className="gold-button" href="/fleet">
              Explore Fleet <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <div className="why-choose__benefits">
              <div>Easy WhatsApp booking</div>
              <div>Comfortable city and intercity travel</div>
              <div>Clear trip coordination</div>
            </div>
          </div>
        </div>

        <div className="why-choose__visuals">
          <img
            className="why-choose__interior"
            src="/images/why-choose-interior.jpg"
            alt="Comfortable vehicle interior prepared for a journey"
            loading="lazy"
          />
          <img
            className="why-choose__hotel"
            src="/images/why-choose-hotel.jpg"
            alt="Private vehicles parked outside a hotel"
            loading="lazy"
          />
          <div className="why-choose__ratings">
            <div className="why-choose__members" aria-label="Our team">
              {[1, 2, 3, 4].map(member => (
                <img
                  key={member}
                  src={`/images/team-member-${member}.jpg`}
                  alt=""
                  loading="lazy"
                />
              ))}
            </div>
            <div className="why-choose__metric">
              <strong aria-label="10,000 successful car rentals">
                {Math.round(rentals)}K+
              </strong>
              <span>Successful Car Rentals</span>
            </div>
            <div className="why-choose__rating">
              <img src="/images/google-g.webp" alt="Google" loading="lazy" />
              <div>
                <strong aria-label="4.9 out of 5">{rating.toFixed(1)}</strong>
                <span>Ratings</span>
              </div>
              <small>Based on 25K reviews</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
