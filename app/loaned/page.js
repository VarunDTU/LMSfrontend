"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getAllBorrowedPublications } from "../events/severActions";

export default function Page() {
  const [transactionData, settransactionData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllBorrowedPublications();
        console.log("res", res);
        settransactionData(res);
      } catch (error) {
        console.log("error", error);
      }
    }
    getData();
  }, []);

  return (
    <div className="w-full p-5">
      {transactionData != null ? (
        <Table>
          {transactionData.length == 0 ? (
            <TableCaption>No pending transactions</TableCaption>
          ) : (
            <TableCaption>A list of Current Borrowings</TableCaption>
          )}
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SSBN</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Author</TableHead>
              <TableHead className="text-right">Borrowed By</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionData.map((invoice, index) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">{invoice.ssbn}</TableCell>
                <TableCell>{invoice.title}</TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell className="text-right">{invoice.author}</TableCell>
                <TableCell className="text-right">{invoice.issued}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
