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

const BarChartPKL = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/chart/barpkl");
      let json = await response.json();
      setChartData(json);
    } catch (error) {
      setChartData([]);
    }
  };

  // let inlabels = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'];
  let inlabels = [];
  let indata1 = [];
  let indata0 = [];
  let data = {};

  if (chartData.length != 0) {
    chartData[1].map((data) => {
      inlabels.push(data.angkatan);
    });
    let j = 0;
    for (let i = 0; i < inlabels.length; i++) {
      if (!chartData[0][j] || inlabels[i] !== chartData[0][j].angkatan) {
        indata1.push(0);
      } else {
        indata1.push(chartData[0][j].sudah);
        j++;
      }
    }
    for (let i = 0; i < inlabels.length; i++) {
      indata0.push(chartData[1][i].jumlah - indata1[i]);
    }
    data = {
      labels: inlabels,
      datasets: [
        {
          label: "Sudah",
          data: indata1,
          borderColor: "rgb(52,168,83)",
          backgroundColor: "rgb(52,168,83)",
          borderWidth: 1,
        },
        {
          label: "Belum",
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

export default BarChartPKL;
