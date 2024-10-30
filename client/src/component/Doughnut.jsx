/* eslint-disable react/prop-types */
// src/components/PieChart.js
import React from "react";
import { Doughnut } from "react-chartjs-2";

const plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         var fontSize = (height / 160).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         var text = "Foo-bar",
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillText(text, textX, textY);
         ctx.save();
    } 
  }]

function DoughnutChart({ chartData, title }) {
  return (
    <div className="chart-container">
      <Doughnut
        data={chartData}
        options={{
          plugins: {
            plugins,
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
export default DoughnutChart;