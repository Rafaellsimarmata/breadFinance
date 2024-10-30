/* eslint-disable react/prop-types */
// src/components/PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

function PieChart({ chartData, title }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: title
            }
          }
        }}
      />
    </div>
  );
}
export default PieChart;