import React, { useEffect, useState } from 'react';
import './ReportStyles.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function TicketsPerDayReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tickets/TicketsPerDay');
        const result = await response.json();
        const formatted = result.map(d => ({
          date: d.showDate,
          tickets: d.ticketCount
        }));
        setData(formatted);
      } catch (error) {
        console.error('Error fetching tickets per day:', error);
      }
    };

    fetchReport();
  }, []);

  if (data.length === 0) return <p>No tickets sold data available.</p>;

  return (
    <div className="report-container">
      <h3>Tickets Sold Per Day</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="tickets" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TicketsPerDayReport;
