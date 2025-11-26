import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import AdminPanel from "./AdminPanel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import "./App.css";

const FloatingLabel = ({ top, left, label, value, subtext }) => (
  <div className="floating-label" style={{ top, left }}>
    <div className="dot"></div>
    <div className="line"></div>
    <div className="content">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
      {subtext && <span className="subtext">{subtext}</span>}
    </div>
  </div>
);

function App() {
  const [dataList, setDataList] = useState([10, 20, 15, 30, 50, 40, 60]);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "dashboard", "main-data"), (doc) => {
      if (doc.exists() && doc.data().chartData) {
        setDataList(doc.data().chartData);
      }
    });
    return () => unsub();
  }, []);

  const lineChartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Power",
        data: dataList,
        borderColor: "#00f2ff",
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, "rgba(0, 242, 255, 0.5)");
          gradient.addColorStop(1, "rgba(0, 242, 255, 0)");
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 3,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: "#8b9bb4", font: { size: 11 } } },
      y: { display: false }, // Hide Y axis for cleaner look
    },
  };

  return (
    <div className="dashboard">
      <video autoPlay loop muted className="bg-video">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* Centered Admin Panel */}
      {showAdmin && <div className="admin-wrapper"><AdminPanel /></div>}

      <div className="video-overlays">
        <FloatingLabel top="30%" left="22%" label="Battery" value="52%" />
        <FloatingLabel top="50%" left="50%" label="Output" value="120 kW" subtext="Normal" />
        <FloatingLabel top="68%" left="35%" label="Grid" value="Active" />
      </div>

      <div className="ui-layer">
        
        {/* TOP HEADER (Left side only) */}
        <div className="top-bar">
          <div className="stat-item">
            <div className="icon-circle">⚡</div>
            <div><span className="label">Total Energy</span><h3>1,054.792</h3></div>
          </div>
          <div className="stat-item">
            <div className="icon-circle">🔋</div>
            <div><span className="label">Stored</span><h3>4,792</h3></div>
          </div>
          <div className="stat-item">
            <div className="icon-circle">☁️</div>
            <div><span className="label">Co2 Saved</span><h3>792</h3></div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Full Height) */}
        <div className="right-sidebar">
          
          <button className="admin-btn-internal" onClick={() => setShowAdmin(!showAdmin)}>
            ⚙
          </button>

          {/* Section 1: System Status */}
          <div className="sidebar-section">
             <h4 className="section-title">SYSTEM STATUS</h4>
             <div className="status-grid">
                <div>
                   <span className="label">Running Time</span>
                   <div className="val">2067 Hours</div>
                </div>
                <div>
                   <span className="label">Efficiency</span>
                   <div className="val">92%</div>
                </div>
             </div>
             <p className="status-ok">● All Systems Normal</p>
          </div>

          {/* Section 2: Consumption */}
          <div className="sidebar-section">
            <h4 className="section-title">REAL-TIME CONSUMPTION</h4>
            <div className="list-item">
              <span className="dot cyan"></span><span>Station A</span><span className="val">1,254.79</span>
            </div>
            <div className="list-item">
              <span className="dot yellow"></span><span>Station B</span><span className="val">1,154.79</span>
            </div>
          </div>
          
          {/* Section 3: Main Graph (Flex grows to fill bottom) */}
          <div className="sidebar-section flex-grow">
             <h4 className="section-title">OPERATING POWER CURVE</h4>
             <div className="chart-container">
                <Line data={lineChartData} options={lineChartOptions} />
             </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;