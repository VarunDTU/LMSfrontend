"use client";
import { TablePublications } from "@/components/table";
import { useEffect, useState } from "react";
import { getAllPublications } from "../events/severActions";

export default function Page() {
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllPublications();
      res.reverse();
      console.log("res", res);

      setdata(res);
    };
    fetchData();
  }, []);
  return (
    <div className="w-full ">
      <TablePublications className="w-full" TableData={data} />
    </div>
  );
}
