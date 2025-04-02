import React, { useEffect } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ContactUs.css';

const ContactUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="contact-us">
      <Header />
      <div className="contact-container">
        <div className="contact-info" data-aos="fade-up">
          <br></br>
          <br></br>
          <p>
            Have any questions or need assistance? We’re here to help! Whether it’s about movie schedules, ticket bookings, or any other inquiries, feel free to reach out to us.
            Our team is always ready to assist you.
          </p>
          <br></br>

          <div className="contact-details">
            <div className="contact-item" data-aos="fade-up" data-aos-delay="200">
              <FaMapMarkerAlt className="icon" />
              <p>123 Milano Street, Colombo, Sri Lanka</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="300">
              <FaPhoneAlt className="icon" />
              <p>+94 77 123 4567</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="400">
              <FaEnvelope className="icon" />
              <p>support@milanocineplex.com</p>
            </div>
            <div className="contact-item" data-aos="fade-up" data-aos-delay="500">
              <FaClock className="icon" />
              <p>Monday - Sunday: 10 AM - 11 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form" data-aos="fade-up" data-aos-delay="600">
          <h2>Send Us a Message</h2>
          <form>
            <div className="input-group" data-aos="fade-up" data-aos-delay="700">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="800">
              <label htmlFor="email">Your Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="900">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4" required></textarea>
            </div>
            <button type="submit" data-aos="fade-up" data-aos-delay="1000">Send Message</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
