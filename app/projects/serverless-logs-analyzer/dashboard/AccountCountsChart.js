"use client";
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AccountCountsChart = ({ data }) => {
  const accountData = Object.entries(data.account_counts);

  const chartData = {
    labels: accountData.map(([key]) => key),
    datasets: [
      {
        data: accountData.map(([, value]) => value),
        backgroundColor: [
          '#FF6B8A',
          '#45B7D1',
          '#FFEAA7',
          '#4ECDC4',
          '#DDA0DD',
        ],
        borderColor: [
          '#FF5722',
          '#2196F3',
          '#FFC107',
          '#26A69A',
          '#9C27B0',
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#d5d7db',
          font: {
            size: window.innerWidth < 640 ? 10 : 12
          },
          padding: window.innerWidth < 640 ? 8 : 15,
          usePointStyle: window.innerWidth < 640 ? true : false,
          boxWidth: window.innerWidth < 640 ? 8 : 12
        }
      },
      tooltip: {
        backgroundColor: 'rgba(13, 14, 18, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#4f5157',
        borderWidth: 1,
        cornerRadius: 8
      }
    }
  };

  return (
    <div style={{ 
      height: window.innerWidth < 640 ? '280px' : window.innerWidth < 1024 ? '320px' : '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: window.innerWidth < 640 ? '8px' : '16px'
    }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default AccountCountsChart; 