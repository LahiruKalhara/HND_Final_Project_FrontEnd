import React, { useEffect, useState } from 'react';
import './ManageTickets.css';

function ManageTickets() {
  const [tickets, setTickets] = useState([]);
  const [editedTicket, setEditedTicket] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tickets/View');
        if (response.ok) {
          const data = await response.json();
          setTickets(data);
        } else {
          console.error('Failed to fetch tickets');
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTickets();
  }, []);

  const handleEdit = (ticket) => {
    setEditedTicket({ ...ticket });
  };

  const handleChange = (e) => {
    setEditedTicket({
      ...editedTicket,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/tickets/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTicket),
      });

      if (response.ok) {
        alert('Ticket updated successfully');
        setTickets(tickets.map(t => t.ticketID === editedTicket.ticketID ? editedTicket : t));
        setEditedTicket(null);
      } else {
        alert('Failed to update ticket');
      }
    } catch (error) {
      alert('Error updating ticket');
    }
  };

  const handleDelete = async (ticketID) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tickets/Delete?id=${ticketID}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Ticket deleted successfully');
        setTickets(tickets.filter(ticket => ticket.ticketID !== ticketID));
      } else {
        alert('Failed to delete ticket');
      }
    } catch (error) {
      alert('Error deleting ticket');
    }
  };

  return (
    <div className="manage-tickets">
      <h3>Manage Tickets</h3>
      <table className="manage-tickets-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Movie ID</th>
            <th>User ID</th>
            <th>Seat Numbers</th>
            <th>Count</th>
            <th>Booking Time</th>
            <th>Total Price</th>
            <th>Show Date</th>
            <th>Show Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.ticketID}>
              <td>{ticket.ticketID}</td>
              <td>{ticket.movieID}</td>
              <td>{ticket.userID}</td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <input type="text" name="seatNumbers" value={editedTicket.seatNumbers} onChange={handleChange} />
                ) : (
                  ticket.seatNumbers
                )}
              </td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <input type="number" name="ticketCount" value={editedTicket.ticketCount} onChange={handleChange} />
                ) : (
                  ticket.ticketCount
                )}
              </td>
              <td>{new Date(ticket.bookingDateTime).toLocaleString()}</td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <input type="number" name="totalPrice" value={editedTicket.totalPrice} onChange={handleChange} />
                ) : (
                  ticket.totalPrice
                )}
              </td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <input type="text" name="showDate" value={editedTicket.showDate} onChange={handleChange} />
                ) : (
                  ticket.showDate
                )}
              </td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <input type="text" name="showTime" value={editedTicket.showTime} onChange={handleChange} />
                ) : (
                  ticket.showTime
                )}
              </td>
              <td>
                {editedTicket && editedTicket.ticketID === ticket.ticketID ? (
                  <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(ticket)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(ticket.ticketID)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageTickets;
