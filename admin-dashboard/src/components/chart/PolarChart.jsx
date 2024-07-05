import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  RadialLinearScale,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';
import { options } from '../../data/chart/options';
import { colors } from '../../config/color';

ChartJS.register(
  CategoryScale,
  ArcElement,
  RadialLinearScale
);
function randomRGB() {
  return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
    Math.random() * 255
  )}, ${Math.floor(Math.random() * 255)}, 0.8)`;
}

const chartData = (bottomData, leftData, label) => ({
  labels: bottomData,
  datasets: [
    {
      label,
      data: leftData,
      borderColor: randomRGB(),
      backgroundColor: bottomData.map(() => randomRGB()),
      full: true,
      lineTension: 0.4,
    },
  ],
});

const PolarChart = ({labels, data, title, tooltip}) => {
  return (
    <PolarArea options={options(title)} data={chartData(labels, data, tooltip)}/>
  )
}

export default PolarChart