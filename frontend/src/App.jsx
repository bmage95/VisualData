import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [dataList, setDataList] = useState([10, 20, 15, 30, 50]);

  const uploadValue = (e) => {
    e.preventDefault();
    if (!value) return;
    setDataList([...dataList, Number(value)]);
    setValue("");
  };

  const chartData = {
    labels: dataList.map((_, i) => i + 1),
    datasets: [
      {
        label: "",
        data: dataList,
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  };

  return (
    <div className="dashboard">

  <video autoPlay loop muted className="bg-video">
    <source src="/bg.mp4" type="video/mp4" />
  </video>

  <div className="overlay">

    {/* RIGHT SIDE CARDS */}
    <div className="info-row">
      <div className="card"><h3>Energy</h3><p>1,043 kWh</p></div>
      <div className="card"><h3>Consumption</h3><p>782 Units</p></div>
      <div className="card"><h3>Efficiency</h3><p>92%</p></div>
    </div>

    {/* BOTTOM CHARTS */}
    <div className="chart-row">
      <div className="chart-box">
        <Line data={{ labels: dataList.map((_,i) => i+1),
          datasets: [{ data: dataList, borderWidth: 2 }]
        }} />
      </div>

      <div className="chart-box">
        <h4>Chart 2</h4>
      </div>

      <div className="chart-box">
        <h4>Chart 3</h4>
      </div>
    </div>

  </div>
</div>

  );
}

export default App;
