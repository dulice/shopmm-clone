import { colors } from "../../config/color";

export const options = (titleText) => ({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        usePointStyle: true,
      },
    },
    title: {
      display: true,
      text: titleText,
    },
  },
});

export const chartData = (bottomData, leftData, label) => ({
  labels: bottomData,
  datasets: [
    {
      label,
      data: leftData,
      borderColor: colors.secondary,
      backgroundColor: colors.secondary,
      full: true,
      lineTension: 0.4,
    },
  ],
});
