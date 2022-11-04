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
  responsive: true,
};
const LineChartPerwalian = ({ kode_wali }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/chart/lineperwalian/${kode_wali}`
      );
      let json = await response.json();
      setChartData(json);
    } catch (error) {
      setChartData([]);
    }
  };

  let inlabels = [];
  let indata = [];
  let data = {};

  if (chartData.length != 0) {
    chartData.map((data) => {
      inlabels.push(data.angkatan);
      indata.push(data.jumlah);
    });

    data = {
      labels: inlabels,
      datasets: [
        {
          label: "jumlah mahasiswa",
          data: indata,
          borderColor: "rgb(52,168,83)",
          backgroundColor: "rgb(52,168,83)",
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

export default LineChartPerwalian;
