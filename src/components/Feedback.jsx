import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import "./Feedback.css";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchFeedback = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/feedback/View");
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setReviews(sorted);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };

    fetchFeedback();
  }, []);

  const midpoint = Math.ceil(reviews.length / 2);
  const firstHalf = reviews.slice(0, midpoint);
  const secondHalf = reviews.slice(midpoint);

  return (
    <div className="feedback-section">
      <h2 className="feedback-title" data-aos="fade-up">
        What Our Customers Say
      </h2>

      <div className="feedback-slider">
        <div className="feedback-cards feedback-cards-left">
          {firstHalf.map((review, index) => (
            <div
              className="feedback-card"
              key={review.id || index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="feedback-card-header">
                <div className="customer-name">{review.name}</div>
              </div>
              <p className="customer-review">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feedback-slider">
        <div className="feedback-cards feedback-cards-right">
          {secondHalf.map((review, index) => (
            <div
              className="feedback-card"
              key={review.id || index}
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="feedback-card-header">
                <div className="customer-name">{review.name}</div>
              </div>
              <p className="customer-review">{review.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
