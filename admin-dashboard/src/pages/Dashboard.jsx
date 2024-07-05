import React, { useEffect, useState } from "react";
import Linechart from "../components/chart/Linechart";
import { BarChart, MapChart, PolarChart } from "../components/chart";
import { Tooltip } from "react-tooltip";
import { sale, view } from "../data/chart/data";
import { useSummaryQuery, useUsersQuery } from "../api/summaryApi";
import { Loading } from "../components";
import SummaryCard from "../components/SummaryCard";
import {
  mdiAccount,
  mdiCalendarToday,
  mdiCart,
  mdiMonitorDashboard,
} from "@mdi/js";
import Members from "./Members";

const Dashboard = () => {
  const { data, isLoading } = useSummaryQuery();
  const { data: users } = useUsersQuery();
  const [tooltipContent, setTooltipContent] = useState("");
  const [todayOrders, setTodayOrders] = useState(null);

  useEffect(() => {
    let date = new Date();
    let month =
      date.getMonth() + 1 > 10 ? date.getMonth() + 1 : `0${date.getMonth + 1}`;
    let today = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
    let todayDate = `${date.getFullYear()}-${month}-${today}`;

    const todayOrders = data?.dailyOrders.find((el) => el._id === todayDate);
    setTodayOrders(todayOrders);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div>
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 text-center pt-4 px-4">
        <SummaryCard
          name="Users"
          icon={mdiAccount}
          count={data.users[0].numberOfUsers}
        />
        <SummaryCard
          name="Products"
          icon={mdiCart}
          count={data.totalProducts[0].numberOfProducts}
        />
        <SummaryCard
          name="Sales"
          icon={mdiMonitorDashboard}
          count={`Ks ${data.orders[0].totalSale.toLocaleString()}`}
        />
        <SummaryCard
          name="Today sales"
          icon={mdiCalendarToday}
          count={`Ks ${
            todayOrders ? todayOrders.totalSale.toLocaleString() : 0
          }`}
        />
      </div>

      <div className="grid grid-cols-12 gap-4 mx-4">
        <div className="lg:col-span-8 col-span-12">
          <div className="card">
            <Linechart
              labels={data.dailyOrders.map((order) => order._id)}
              data={data.dailyOrders.map((order) => order.numberOfOrders)}
              title="Sales Overview"
              tooltip="Number Of Order"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="card lg:col-span-1 col-span-2">
              <BarChart
                labels={sale.labels}
                data={sale.data}
                title={sale.title}
                tooltip={sale.tooltip}
              />
            </div>
            <div className="card lg:col-span-1 col-span-2">
              <BarChart
                labels={view.labels}
                data={view.data}
                title={view.title}
                tooltip={view.tooltip}
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="card">
            <PolarChart
              labels={data.products.map((product) => product._id)}
              data={data.products.map((product) => product.numberOfProducts)}
              title="Categories List"
              tooltip="items"
            />
          </div>
          <div className="card">
            <p className="text-center font-bold text-sm text-gray-500">
              Customers
            </p>
            <MapChart setTooltipContent={setTooltipContent} />
            <Tooltip id="my-tooltip-1" place="top" content={tooltipContent} />
          </div>
        </div>
      </div>
      <Members />
    </div>
  );
};

export default Dashboard;
