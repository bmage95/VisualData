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

        {/* LEFT MAIN AREA */}
        <div className="left-area">

          {/* TOP CARDS */}
          <div className="info-row">
            <div className="card"><h3>Energy</h3><p>1,043 kWh</p></div>
            <div className="card"><h3>Consumption</h3><p>782 Units</p></div>
            <div className="card"><h3>Efficiency</h3><p>92%</p></div>
          </div>

          {/* BOTTOM 3 GRAPHS */}
          <div className="bottom-graphs">
            <div className="graph-card">
              <h3>Energy Trend</h3>
              <Line data={chartData} />
            </div>

            <div className="graph-card">
              <h3>Load Pattern</h3>
              <Line data={chartData} />
            </div>

            <div className="graph-card">
              <h3>Output Stability</h3>
              <Line data={chartData} />
            </div>
          </div>

          {/* Upload */}
          <form className="upload-form" onSubmit={uploadValue}>
            <input
              type="number"
              placeholder="Enter value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button type="submit">Upload</button>
          </form>
        </div>

        {/* RIGHT FIXED 3 BLOCKS */}
        <div className="right-stats">
          <div className="right-card">
            <h4>Voltage</h4>
            <p>220V</p>
          </div>

          <div className="right-card">
            <h4>Grid Load</h4>
            <p>56%</p>
          </div>

          <div className="right-card">
            <h4>Status</h4>
            <p>Stable</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
