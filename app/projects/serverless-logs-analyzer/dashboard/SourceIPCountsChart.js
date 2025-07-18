"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, CategoryScale, BarElement, Tooltip, Legend);

const SourceIPCountsChart = ({ data }) => {
  // Ordena os IPs por contagem e pega os 8 primeiros
  const sortedIPCounts = Object.entries(data.source_ip_counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8);

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
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#d5d7db'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#d5d7db',
          maxRotation: 45
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#d5d7db'
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
      height: '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: '16px'
    }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SourceIPCountsChart; 