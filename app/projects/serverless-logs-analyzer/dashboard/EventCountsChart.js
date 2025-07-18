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
        backgroundColor: "rgba(228, 253, 253, 0.94)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EventCountsChart;
