"use client";
import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const AccountCountsChart = ({ data }) => {
  const [windowWidth, setWindowWidth] = useState(1024); // valor padrão para SSR

  useEffect(() => {
    // Só executa no cliente
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Define o valor inicial
    setWindowWidth(window.innerWidth);

    // Adiciona listener de resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            size: windowWidth < 640 ? 10 : 12
          },
          padding: windowWidth < 640 ? 8 : 15,
          usePointStyle: windowWidth < 640 ? true : false,
          boxWidth: windowWidth < 640 ? 8 : 12
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
      height: windowWidth < 640 ? '280px' : windowWidth < 1024 ? '320px' : '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: windowWidth < 640 ? '8px' : '16px'
    }}>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default AccountCountsChart; 