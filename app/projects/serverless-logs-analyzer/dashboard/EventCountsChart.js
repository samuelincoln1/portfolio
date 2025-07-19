"use client";
import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement } from 'chart.js';

// Registra as escalas e elementos necessários
ChartJS.register(LinearScale, CategoryScale, BarElement);

const EventCountsChart = ({ data }) => {
  // Ordena os eventos por contagem e pega os 10 primeiros
  const sortedEventCounts = Object.entries(data.event_counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  const chartData = {
    labels: sortedEventCounts.map(([key]) => key),
    datasets: [
      {
        label: "Event Counts",
        data: sortedEventCounts.map(([, value]) => value),
        backgroundColor: "#4ECDC4",
        borderColor: "#26A69A",
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
            size: window.innerWidth < 640 ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: '#d5d7db',
          maxRotation: window.innerWidth < 640 ? 90 : 45,
          font: {
            size: window.innerWidth < 640 ? 9 : 11
          }
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#d5d7db',
          font: {
            size: window.innerWidth < 640 ? 10 : 12
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
      height: window.innerWidth < 640 ? '300px' : window.innerWidth < 1024 ? '350px' : '400px', 
      width: '100%',
      backgroundColor: '#0d0e12',
      borderRadius: '8px',
      padding: window.innerWidth < 640 ? '8px' : '16px'
    }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EventCountsChart;
