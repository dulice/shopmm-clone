/**
=========================================================
* Shopmm Admin Dashboard MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
import { PolarArea } from "react-chartjs-2";

// @mui material components
import Card from "@mui/material/Card";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// PolarChart configurations
import { useSummaryQuery } from "api/summaryApi";
import colors from "assets/theme/base/colors";

const { gradients, dark } = colors;

function PolarChart() {
  const { data: categories } = useSummaryQuery();
  const backgroundColors =  [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ];

  const data = {
    labels: categories?.products.map((product) => product._id),
    datasets: [
      {
        label: categories?.products.map((product) => product._id),
        backgroundColor: backgroundColors,
        data: categories?.products.map((product) => product.numberOfProducts),
      },
    ],
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <ArgonBox p={2}>
      <ArgonBox mb={1}>
          <ArgonTypography variant="h6">Categories List</ArgonTypography>
        </ArgonBox>
      <ArgonBox p={4}>
        <PolarArea data={data} options={options} />
      </ArgonBox>
    </ArgonBox>
  );
}

export default PolarChart;
