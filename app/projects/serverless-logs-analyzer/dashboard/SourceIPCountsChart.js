"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const SourceIPCountsChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(1024); 

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    setWindowWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ordena os IPs por contagem e pega os 8 primeiros para desktop, 5 para mobile
  const maxItems = windowWidth < 640 ? 5 : 8;
  const sortedIPCounts = Object.entries(data.source_ip_counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxItems);

  const chartData = {
    labels: sortedIPCounts.map(([key]) => key),
    datasets: [
      {
        label: "Requisições por IP",
        data: sortedIPCounts.map(([, value]) => value),
        backgroundColor: "#FF6B8A",
        borderColor: "#FF5722",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#d5d7db',
          font: {
            size: windowWidth < 640 ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#d5d7db',
          maxRotation: windowWidth < 640 ? 90 : 45,
          font: {
            size: windowWidth < 640 ? 8 : 11
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#d5d7db',
          font: {
            size: windowWidth < 640 ? 10 : 12
          }
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
      height: windowWidth < 640 ? '300px' : windowWidth < 1024 ? '350px' : '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: windowWidth < 640 ? '8px' : '16px'
    }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SourceIPCountsChart; 