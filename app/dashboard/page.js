"use client";

import { DashboardPieChart, RegistedUserPerMonth } from "@/components/charts";
import { DashboardBarChart } from "./barchartint";

export default function Page() {
  return (
    <div className="w-full h-screen grid grid-cols-2 p-10 gap-10">
      <div className="h-1/4">
        <RegistedUserPerMonth className=""></RegistedUserPerMonth>
      </div>

      <DashboardPieChart className=""></DashboardPieChart>

      <div className="col-span-2 h-1/2">
        <DashboardBarChart></DashboardBarChart>
      </div>
    </div>
  );
}
