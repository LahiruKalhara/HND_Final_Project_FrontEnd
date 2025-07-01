import React, { useEffect, useState } from 'react';
import './ReportStyles.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function SalesPerMovieReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tickets/SalesPerMovie');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching movie sales data:', error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div className="report-container">
      <h3>Sales Per Movie Report</h3>
      <ResponsiveContainer width="100%" height={450}>
        <BarChart data={data} margin={{ top: 0, right: 30, left: 20, bottom: 90 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="movieName" angle={-45} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8884d8" name="Revenue (LKR)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SalesPerMovieReport;
