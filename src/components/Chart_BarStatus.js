import React, { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: "y",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "right",
    },
  },
};

const BarChartStatus = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/chart/barstatus");
      let json = await response.json();
      setChartData(json);
    } catch (error) {
      setChartData([]);
    }
  };

  let inlabels = [];
  let indata1 = [];
  let indata0 = [];
  let data = {};

  if (chartData.length != 0) {
    chartData.map((data) => {
      inlabels.push(data.angkatan);
      indata1.push(data.aktif);
      indata0.push(data.nonaktif);
    });

    data = {
      labels: inlabels,
      datasets: [
        {
          label: "Aktif",
          data: indata1,
          borderColor: "rgb(52,168,83)",
          backgroundColor: "rgb(52,168,83)",
          borderWidth: 1,
        },
        {
          label: "Non-aktif",
          data: indata0,
          borderColor: "rgb(234,67,53)",
          backgroundColor: "rgb(234,67,53)",
          borderWidth: 1,
        },
      ],
    };
    return (
      <>
        <Bar options={options} data={data} />
      </>
    );
  }
};

export default BarChartStatus;
