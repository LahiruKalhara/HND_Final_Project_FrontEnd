import React, { useEffect, useState } from 'react';
import './ReportStyles.css';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList
} from 'recharts';

function MostActiveUsersReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tickets/TopActiveUsers');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching active users:', error);
      }
    };

    fetchActiveUsers();
  }, []);

  return (
    <div className="report-container">
      <h3>Most Active Users</h3>
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>Top users by ticket purchases</p>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={8000}>
          <BarChart
            layout="vertical"
            data={data}
            margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="userName" type="category" width={150} />
            <Tooltip />
            <Bar dataKey="totalTickets" fill="#8884d8">
              <LabelList dataKey="totalTickets" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default MostActiveUsersReport;
