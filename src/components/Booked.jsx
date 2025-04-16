import React, { useEffect, useState } from "react";
import axios from "axios";
import "./booked.css";
import { useAuth } from "../context/AuthContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Booked = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchTickets();
    fetchMovies();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/tickets/View");
      const filtered = res.data.filter((t) => t.userID === user.userID);
      setTickets(filtered);
    } catch (err) {
      console.error("Error fetching tickets:", err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/movies/View");
      setMovies(res.data);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  const getMovieName = (id) => {
    const movie = movies.find((m) => m.movieID === id);
    return movie ? movie.movieName : "Loading...";
  };

  const cancelTicket = async (ticketID) => {
    const confirm = window.confirm("Are you sure you want to cancel this ticket?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:8080/api/tickets/Delete?id=${ticketID}`);
      setTickets((prev) => prev.filter((t) => t.ticketID !== ticketID));
    } catch (err) {
      console.error("Failed to cancel ticket:", err);
    }
  };

  return (
    <div className="booked-container">
      <h1 data-aos="fade-up">Your Booked Tickets</h1>
      {tickets.length === 0 ? (
        <p data-aos="fade-up" className="no-tickets">You haven't booked any tickets yet.</p>
      ) : (
        <div className="tickets-list">
          {tickets.map((ticket) => (
            <div className="ticket-card" data-aos="fade-up" key={ticket.ticketID}>
              <h2>{getMovieName(ticket.movieID)}</h2>
              <p><strong>Seats:</strong> {JSON.parse(ticket.seatNumbers).join(", ")}</p>
              <p><strong>Show Date:</strong> {ticket.showDate}</p>
              <p><strong>Show Time:</strong> {ticket.showTime}</p>
              <p><strong>Ticket Count:</strong> {ticket.ticketCount}</p>
              <p><strong>Total Price:</strong> Rs. {ticket.totalPrice}</p>
              <button onClick={() => cancelTicket(ticket.ticketID)} className="cancel-btn">Cancel Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Booked;
