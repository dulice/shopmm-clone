/* eslint-disable no-unused-vars */
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

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Shopmm Admin Dashboard MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Shopmm Admin Dashboard MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import CategoriesList from "examples/Lists/CategoriesList";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Shopmm Admin Dashboard MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import categoriesListData from "layouts/dashboard/data/categoriesListData";

import { useSummaryQuery } from "api/summaryApi";
import PolarChart from "examples/Charts/PolarChart";

function Default() {
  const { data, isLoading } = useSummaryQuery();

  const gradientLineChartData = {
    labels: data?.dailyOrders.map(order => order._id),
    datasets: [
      {
        label: "Number of orders",
        color: "info",
        data: data?.dailyOrders.map(order => order.numberOfOrders),
      },
    ],
  };
  let date = new Date();
  let month = date.getMonth()+1 > 10 ? date.getMonth() + 1 : `0${date.getMonth + 1}`;
  let today = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
  let todayDate = `${date.getFullYear()}-${month}-${today}`;

  const todayOrders = data?.dailyOrders.find(el => el._id === todayDate);

  const { size } = typography;
  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? <div>Loading...</div> : (

      <ArgonBox py={3}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="today's money"
              count={`Ks ${!isLoading && todayOrders ? todayOrders.totalSale : 0}`}
              icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="total products"
              count={!isLoading && data.totalProducts[0] && data?.totalProducts[0].numberOfProducts}
              icon={{ color: "error", component: <i className="ni ni-world" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="total users"
              count={!isLoading && data.users[0] && data?.users[0].numberOfUsers}
              icon={{ color: "success", component: <i className="ni ni-paper-diploma" /> }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="sales"
              count={`Ks ${!isLoading && data.orders[0] && data?.orders[0].totalSale}`}
              icon={{ color: "warning", component: <i className="ni ni-cart" /> }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={7}>
            <GradientLineChart
              title="Sales Overview"              
              chart={gradientLineChartData}
            />
          </Grid>
          <Grid item xs={12} lg={5}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={5}>
            <PolarChart title="Categories List" />
          </Grid>
          <Grid item xs={12} md={7}>
            <CategoriesList title="categories" categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox>
      )}
    </DashboardLayout>
  );
}

export default Default;
