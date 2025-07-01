// components/TotalSalesReport.jsx
import React, { useEffect, useState } from 'react';
import './ReportStyles.css';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function TotalSalesReport() {
  const [totalSales, setTotalSales] = useState(null);

  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tickets/TotalSales');
        const data = await response.json();
        setTotalSales(data);
      } catch (error) {
        console.error('Error fetching total sales:', error);
      }
    };

    fetchTotalSales();
  }, []);

  const monthlyData = [
    { month: 'Jul', revenue: 480000 },
    { month: 'Aug', revenue: 390000 },
    { month: 'Sep', revenue: 560000 },
    { month: 'Oct', revenue: 610000 },
    { month: 'Nov', revenue: 450000 },
    { month: 'Dec', revenue: 520000 },
    { month: 'Jan', revenue: 580000 },
    { month: 'Feb', revenue: 630000 },
    { month: 'Mar', revenue: 490000 },
    { month: 'Apr', revenue: 700000 },
    { month: 'May', revenue: 670000 },
    { month: 'Jun', revenue: 720000 },
  ];

  return (
    <div className="report-container">
      <h3>Total Sales Report</h3>
      {totalSales !== null ? (
        <>
          <div className="total-sales-box">
            <h1>LKR {totalSales.toFixed(2)}</h1>
            <p>Total Revenue from Tickets</p>
          </div>

          <h4 className="chart-title">Monthly Sales Overview</h4>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p>Loading total sales...</p>
      )}
    </div>
  );
}

export default TotalSalesReport;
