import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import ManageUsers from '../components/ManageUsers';
import ManageTickets from '../components/ManageTickets';
import ManageMovies from '../components/ManageMovies';
import ManageMessages from '../components/ManageMessages';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
  const [activeSection, setActiveSection] = useState('ManageUsers');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userRole !== 'admin') {
      alert("Access denied. You must be an admin to view this page.");
      navigate('/');
    }
  }, [user, navigate]);

  const renderContent = () => {
    switch (activeSection) {
      case 'ManageUsers':
        return <ManageUsers />;
      case 'ManageTickets':
        return <ManageTickets />;
      case 'ManageMovies':
        return <ManageMovies />;
      case 'ManageReviews':
        return <ManageMessages />;
      default:
        return <div><h3>Welcome to the Admin Panel</h3></div>;
    }
  };

  return (
    <>
      <Header />
      <div className="admin-panel">
        <div className="side-menu">
          <ul>
            <li
              className={activeSection === 'ManageUsers' ? 'active' : ''}
              onClick={() => setActiveSection('ManageUsers')}
            >
              Manage Users
            </li>
            <li
              className={activeSection === 'ManageTickets' ? 'active' : ''}
              onClick={() => setActiveSection('ManageTickets')}
            >
              Manage Tickets
            </li>
            <li
              className={activeSection === 'ManageMovies' ? 'active' : ''}
              onClick={() => setActiveSection('ManageMovies')}
            >
              Manage Movies
            </li>
            <li
              className={activeSection === 'ManageReviews' ? 'active' : ''}
              onClick={() => setActiveSection('ManageReviews')}
            >
              Manage Messages
            </li>
          </ul>
        </div>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
