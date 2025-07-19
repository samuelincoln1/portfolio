"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResourceCountsChart = ({ data }) => {
  const resourceData = Object.entries(data.resource_counts);

  const chartData = {
    labels: resourceData.map(([key]) => key),
    datasets: [
      {
        data: resourceData.map(([, value]) => value),
        backgroundColor: [
          '#FF6B8A', 
          '#4ECDC4',
          '#45B7D1',
          '#96CEB4', 
          '#FFEAA7', 
          '#DDA0DD', 
          '#98D8C8', 
          '#F7DC6F',
        ],
        borderColor: [
          '#FF5722', 
          '#26A69A', 
          '#2196F3', 
          '#4CAF50', 
          '#FFC107',
          '#9C27B0',
          '#009688', 
          '#FF9800', 
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
        position: window.innerWidth < 640 ? 'bottom' : 'bottom',
        labels: {
          color: '#ffffff',
          font: {
            size: window.innerWidth < 640 ? 9 : 12,
            weight: 'bold'
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
        cornerRadius: 8,
        displayColors: true
      }
    }
  };

  return (
    <div style={{ 
      height: window.innerWidth < 640 ? '280px' : window.innerWidth < 1024 ? '350px' : '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: window.innerWidth < 640 ? '8px' : '16px'
    }}>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default ResourceCountsChart; 