"use client";

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
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import { getAllPublications } from "../events/severActions";
const chartData = [
  { browser: "chrome", visitors: 187, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 275, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
};
export function DashboardBarChart() {
  console.log("chartData", chartData, "chartConfig", chartConfig);
  const [data, setData] = useState(null);
  useEffect(() => {
    const getData = async () => {
      const res = await getAllPublications();
      const hashmap = {};
      res.forEach((element) => {
        if (hashmap[element.author] == undefined) {
          hashmap[element.author] = 1;
        } else {
          hashmap[element.author] += 1;
        }
      });
      const chartData = [];
      const chartConfig = {
        visitors: {
          label: "Visitors",
        },
      };
      var i = 0;
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
      console.log("chartData", chartData, "chartConfig", chartConfig);
      setData({ chartData, chartConfig });
    };
    getData();
  }, []);
  return (
    <div>
      {data ? (
        <Card>
          <CardHeader>
            <CardTitle>Number of books</CardTitle>
            <CardDescription>By Authors</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={data.chartConfig}>
              <BarChart accessibilityLayer data={data.chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="browser"
                  tickLine={false}
                  tickMargin={1}
                  axisLine={false}
                  tickFormatter={(value) => chartConfig[value]?.label || value}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Bar
                  dataKey="visitors"
                  strokeWidth={2}
                  radius={4}
                  activeIndex={2}
                  activeBar={({ ...props }) => {
                    return (
                      <Rectangle
                        {...props}
                        fillOpacity={0.8}
                        stroke={props.payload.fill}
                        strokeDasharray={2}
                        strokeDashoffset={4}
                      />
                    );
                  }}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            {/* <div className="flex gap-2 font-medium leading-none">
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
