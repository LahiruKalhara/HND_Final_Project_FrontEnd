import React, { useEffect } from "react";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 
import "./Feedback.css";

const Feedback = () => {
  useEffect(() => {
    AOS.init(); 
  }, []);

  const reviews = [
    {
      name: "John Doe",
      review: "An amazing experience! The cinema feels so immersive with the latest technology.",
      rating: 5,
    },
    {
      name: "Jane Smith",
      review: "I love the modern design and the comfort of the seats. Great service too!",
      rating: 4,
    },
    {
      name: "Alice Johnson",
      review: "The best cinema experience I've ever had! Highly recommend it!",
      rating: 5,
    },
    {
      name: "Michael Brown",
      review: "The atmosphere was fantastic, and the sound system is top-notch!",
      rating: 4,
    },
    {
      name: "Sophia Williams",
      review: "I had a blast here with my friends. The best cinema I've visited!",
      rating: 5,
    },
    {
      name: "Ethan Davis",
      review: "Service was great, and the food was delicious. The movie experience was top-tier!",
      rating: 5,
    },
    {
      name: "Olivia Lee",
      review: "Fantastic place for movie lovers! Highly recommend it to everyone!",
      rating: 4,
    },
    {
      name: "Lucas White",
      review: "Had a great time with my family. Comfortable seats and great view!",
      rating: 5,
    },
    {
      name: "Amelia Clark",
      review: "Perfect place to watch the latest movies. The audio was amazing!",
      rating: 5,
    },
    {
      name: "Daniel Martin",
      review: "The staff was very friendly, and the experience was top-notch!",
      rating: 4,
    },
    {
      name: "Isabella Davis",
      review: "Such a wonderful cinema! I’ll definitely return soon.",
      rating: 5,
    },
    {
      name: "Liam Harris",
      review: "A great place to catch the latest releases. Comfortable and modern!",
      rating: 4,
    },
    // Additional reviews for the second row
    {
      name: "Mia Brown",
      review: "Great location and great seats. Would love to come back!",
      rating: 4,
    },
    {
      name: "Oliver Lee",
      review: "Absolutely fantastic! Best movie theater in town.",
      rating: 5,
    },
    {
      name: "Charlotte Green",
      review: "The service is always on point, and I love the ambiance.",
      rating: 5,
    },
    {
      name: "Noah Johnson",
      review: "Comfortable seats and the best movie experience ever!",
      rating: 4,
    },
    {
      name: "Lily White",
      review: "I enjoyed every moment of my visit here. Great food and atmosphere!",
      rating: 5,
    },
    {
      name: "James Black",
      review: "Perfect cinema for movie enthusiasts. Loved it!",
      rating: 4,
    },
  ];

  return (
    <div className="feedback-section">
      <h2 className="feedback-title" data-aos="fade-up">What Our Customers Say</h2>

      <div className="feedback-slider">
        <div className="feedback-cards feedback-cards-left">
          {reviews.slice(0, 6).map((review, index) => (
            <div
              className="feedback-card"
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
            >
              <div className="feedback-card-header">
                <div className="customer-name">{review.name}</div>
                <div className="rating">
                  {"⭐".repeat(review.rating)} {/* Display star rating */}
                </div>
              </div>
              <p className="customer-review">{review.review}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="feedback-slider">
        <div className="feedback-cards feedback-cards-right">
          {reviews.slice(6).map((review, index) => (
            <div
              className="feedback-card"
              key={index}
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay={index * 200}
            >
              <div className="feedback-card-header">
                <div className="customer-name">{review.name}</div>
                <div className="rating">
                  {"⭐".repeat(review.rating)} {/* Display star rating */}
                </div>
              </div>
              <p className="customer-review">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
