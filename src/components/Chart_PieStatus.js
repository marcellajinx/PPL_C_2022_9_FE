import React, { useState, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

const PieChartStatus = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getChartData();
  }, []);

  const getChartData = async () => {
    try {
      const response = await fetch("http://localhost:5000/chart/piestatus");
      let json = await response.json();
      setChartData(json);
    } catch (error) {
      setChartData([]);
    }
  };

  let indata = [];
  let data = {};

  if (chartData.length != 0) {
    for (let i in chartData[0]) {
      indata.push(chartData[0][i]);
    }

    console.log(indata);

    data = {
      labels: ["Cuti", "Aktif"],
      datasets: [
        {
          label: "# of Students",
          data: indata,
          backgroundColor: ["rgb(234,67,53)", "rgb(66,133,244)"],
        },
      ],
    };
    return (
      <>
        <Pie data={data} options={options} />
      </>
    );
  }
};

export default PieChartStatus;
