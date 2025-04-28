import React, { useEffect, useState } from 'react';
import './ManageMessages.css';

function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [editedMessage, setEditedMessage] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Added state for search query

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/contact/View');
        if (response.ok) {
          const data = await response.json();
          setMessages(data);
        } else {
          console.error('Failed to fetch messages');
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleEdit = (message) => {
    setEditedMessage({ ...message });
  };

  const handleChange = (e) => {
    setEditedMessage({
      ...editedMessage,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/contact/Update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedMessage),
      });

      if (response.ok) {
        alert('Message updated successfully');
        setMessages(messages.map(m => m.id === editedMessage.id ? editedMessage : m));
        setEditedMessage(null);
      } else {
        alert('Failed to update message');
      }
    } catch (error) {
      alert('Error updating message');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/contact/Delete?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Message deleted successfully');
        setMessages(messages.filter(message => message.id !== id));
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      alert('Error deleting message');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMessages = messages.filter((message) => {
    return (
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="manage-messages">
      <h3>Manage Messages</h3>

      {/* Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search messages..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <i className="search-icon fa fa-search"></i>
      </div>

      <table className="manage-messages-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th>Timestamp</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredMessages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>
                {editedMessage && editedMessage.id === message.id ? (
                  <input type="text" name="name" value={editedMessage.name} onChange={handleChange} />
                ) : (
                  message.name
                )}
              </td>
              <td>
                {editedMessage && editedMessage.id === message.id ? (
                  <input type="email" name="email" value={editedMessage.email} onChange={handleChange} />
                ) : (
                  message.email
                )}
              </td>
              <td>
                {editedMessage && editedMessage.id === message.id ? (
                  <textarea name="message" value={editedMessage.message} onChange={handleChange}></textarea>
                ) : (
                  message.message
                )}
              </td>
              <td>{message.timestamp}</td>
              <td>{message.user ? message.user.userName : 'N/A'}</td>
              <td>
                {editedMessage && editedMessage.id === message.id ? (
                  <button className="save-btn" onClick={handleSave}>Save</button>
                ) : (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(message)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(message.id)}>Delete</button>
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

export default ManageMessages;
