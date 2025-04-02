import React, { useState, useEffect, useRef } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import "./TheatreInfo.css";
import theatre1v1 from "../assets/theatre1version1.jpg";
import theatre1v2 from "../assets/theatre1version2.jpg";
import theatre1v3 from "../assets/theatre1version3.jpg";
import theatre1v4 from "../assets/theatre1version4.jpg";
import theatre1v5 from "../assets/theatre1version5.jpg";
import theatre2v1 from "../assets/theatre2version1.jpg";
import theatre2v2 from "../assets/theatre2version2.jpg";
import theatre2v3 from "../assets/theatre2version3.jpg";
import theatre2v4 from "../assets/theatre2version4.jpg";
import theatre2v5 from "../assets/theatre2version5.jpg";

const TheatreInfo = () => {
  const [theatre1Index, setTheatre1Index] = useState(0);
  const [theatre2Index, setTheatre2Index] = useState(0);
  const [glow1, setGlow1] = useState(false);
  const [glow2, setGlow2] = useState(false);
  
  const theatre1Ref = useRef(null);
  const theatre2Ref = useRef(null);

  const theatre1Images = [theatre1v1, theatre1v2, theatre1v3, theatre1v4, theatre1v5];
  const theatre2Images = [theatre2v1, theatre2v2, theatre2v3, theatre2v4, theatre2v5];

  useEffect(() => {
    AOS.init({
      duration: 1000, 
      once: true,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === theatre1Ref.current) {
              setGlow1(true);
              setTimeout(() => {
                animateImage(setTheatre1Index, theatre1Images.length);
              }, 1000);
            } else if (entry.target === theatre2Ref.current) {
              setGlow2(true);
              setTimeout(() => {
                animateImage(setTheatre2Index, theatre2Images.length);
              }, 1000);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    if (theatre1Ref.current) observer.observe(theatre1Ref.current);
    if (theatre2Ref.current) observer.observe(theatre2Ref.current);

    return () => observer.disconnect();
  }, []);

  const animateImage = (setIndex, length) => {
    let index = 0;
    const interval = setInterval(() => {
      setIndex(index);
      index++;
      if (index === length) {
        clearInterval(interval);
      }
    }, 400);
  };

  return (
    <div className="theatre-section">
      <h2 className="theatre-title" data-aos="fade-up">Experience Milano Cineplex</h2>

      <div className="theatre-row">
        <div
          className={`theatre-image ${glow1 ? "glowing" : ""}`}
          ref={theatre1Ref}
          data-aos="fade-right"
        >
          <img src={theatre1Images[theatre1Index]} alt="Milano Cineplex Interior" />
        </div>
        <div className="theatre-text" data-aos="fade-left">
          <h3>Immersive Experience</h3>
          <p>
            Step into a world of unparalleled cinematic excellence at Milano Cineplex, where cutting-edge technology meets comfort.
          </p>
        </div>
      </div>

      <div className="theatre-divider"></div>

      <div className="theatre-row theatre-row2">
        <div className="theatre-text" data-aos="fade-right">
          <h3>State-of-the-Art Facilities</h3>
          <p>
            Enjoy high-quality Dolby Atmos sound, crystal-clear 4K visuals, and luxurious seating for the ultimate movie experience.
          </p>
        </div>
        <div
          className={`theatre-image ${glow2 ? "glowing" : ""}`}
          ref={theatre2Ref}
          data-aos="fade-left"
        >
          <img src={theatre2Images[theatre2Index]} alt="Milano Cineplex Exterior" />
        </div>
      </div>
    </div>
  );
};

export default TheatreInfo;
