import React, { useEffect, useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCommentDots } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactUs.css';
import { useAuth } from '../context/AuthContext'; 

const ContactUs = () => {
  const { user } = useAuth(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [feedbackData, setFeedbackData] = useState({
    name: '',
    feedback: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFeedbackChange = (e) => {
    setFeedbackData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactPayload = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      user: {
        userID: user?.userID 
      }
    };

    try {
      await axios.post('http://localhost:8080/api/contact/Add', contactPayload);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Something went wrong. Please try again later.');
    }
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8080/api/feedback/add', feedbackData);
      alert('Feedback sent successfully!');
      setFeedbackData({ name: '', feedback: '' });
    } catch (error) {
      console.error('Error sending feedback:', error);
      alert('Something went wrong while sending feedback.');
    }
  };

  return (
    <div className="contact-us">
      <Header />
      <div className="contact-container">
        <div className="contact-info" data-aos="fade-up">
          <br /><br />
          <p>
            Have any questions or need assistance? We’re here to help! Whether it’s about movie schedules,
            ticket bookings, or any other inquiries, feel free to reach out to us.
            Our team is always ready to assist you.
          </p>
          <br />
          <div className="contact-details">
            <div className="contact-item" data-aos="fade-up" data-aos-delay="200">
              <FaMapMarkerAlt className="icon" />
              <p>122 Main Street, Kegalle, Sri Lanka</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="300">
              <FaPhoneAlt className="icon" />
              <p>035 222 1222</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="400">
              <FaEnvelope className="icon" />
              <p>support@milanocineplex.com</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="500">
              <FaClock className="icon" />
              <p>Monday - Sunday: 9 AM - 10 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form" data-aos="fade-up" data-aos-delay="600">
          <h2>Send Us a Message</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group" data-aos="fade-up" data-aos-delay="700">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="800">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="900">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" data-aos="fade-up" data-aos-delay="1000">Send Message</button>
          </form>
        </div>

        <div className="feedback-form" data-aos="fade-up" data-aos-delay="1100">
          <h2>Write Feedback</h2>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="input-group" data-aos="fade-up" data-aos-delay="1200">
              <label htmlFor="feedbackName">Your Name</label>
              <input
                type="text"
                id="feedbackName"
                name="name"
                required
                value={feedbackData.name}
                onChange={handleFeedbackChange}
              />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="1300">
              <label htmlFor="feedback">Your Feedback</label>
              <textarea
                id="feedback"
                name="feedback"
                rows="4"
                required
                value={feedbackData.feedback}
                onChange={handleFeedbackChange}
              ></textarea>
            </div>
            <button type="submit" data-aos="fade-up" data-aos-delay="1400">Submit Feedback</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
