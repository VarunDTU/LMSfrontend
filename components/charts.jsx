"use client";

import {
  dashboardRecentRegistedUserPerMonth,
  getAllPublications,
} from "@/app/events/severActions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Label,
  Pie,
  PieChart,
  XAxis,
} from "recharts";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
];

export function RegistedUserPerMonth() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const res = await dashboardRecentRegistedUserPerMonth();

      console.log("resData", res);
      setdata(res);
    };
    getData();
  }, []);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Number of New Users</CardTitle>
          <CardDescription>
            Showing new users per month for the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              desktop: {
                label: "Users",
                color: "hsl(var(--chart-2))",
              },
            }}
          >
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={1}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="desktop"
                type="natural"
                fill="var(--color-desktop)"
                fillOpacity={0.4}
                stroke="var(--color-desktop)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            {/* <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              January - June 2024
            </div>
          </div> */}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export function DashboardPieChart() {
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await getAllPublications();
      const hashmap = {
        borrowed: 0,
        available: 0,
      };
      res.forEach((element) => {
        if (element.issued) {
          hashmap.borrowed++;
        } else {
          hashmap.available++;
        }
      });
      const chartData = [];
      const chartConfig = {};
      var i = 1;
      for (let key in hashmap) {
        chartConfig[key] = {
          label: key,
          color: `hsl(var(--chart-${i}))`,
        };
        chartData.push({
          browser: key,
          visitors: hashmap[key],
          fill: chartConfig[key].color,
        });
        i++;
      }
      console.log("chartData", chartData);
      setData({ chartData, chartConfig, totalVisitors: res.length });
    };
    getData();
  }, []);
  const totalVisitors = useMemo(() => {
    return data
      ? data.chartData.reduce((acc, curr) => acc + curr.visitors, 0)
      : 0;
  }, []);

  return (
    <div className="w-full">
      {data ? (
        <Card className="flex flex-col h-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>Number Of Books</CardTitle>
            <CardDescription>Available vs Borrowed</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={data.chartConfig}
              className="mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={data.chartData}
                  dataKey="visitors"
                  nameKey="browser"
                  innerRadius={60}
                  strokeWidth={5}
                >
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text
                            x={viewBox.cx}
                            y={viewBox.cy}
                            textAnchor="middle"
                            dominantBaseline="middle"
                          >
                            <tspan
                              x={viewBox.cx}
                              y={viewBox.cy}
                              className="fill-foreground text-3xl font-bold"
                            >
                              {data.totalVisitors}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 24}
                              className="fill-muted-foreground"
                            >
                              Books
                            </tspan>
                          </text>
                        );
                      }
                    }}
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            {/* <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div> */}
          </CardFooter>
        </Card>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
