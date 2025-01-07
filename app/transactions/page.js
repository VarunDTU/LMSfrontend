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
import { getAllTransactions } from "../events/severActions";

export default function Page() {
  const [transactionData, settransactionData] = useState(null);
  useEffect(() => {
    async function getData() {
      try {
        const res = await getAllTransactions();
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
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>userId</TableHead>
              <TableHead>bookId</TableHead>
              <TableHead className="text-right">Return Date</TableHead>
              <TableHead className="text-right">Borrow Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactionData.map((invoice, index) => (
              <TableRow key={invoice._id}>
                <TableCell className="font-medium">{invoice._id}</TableCell>
                <TableCell>{invoice.userId}</TableCell>
                <TableCell>{invoice.bookId}</TableCell>
                <TableCell className="text-right">
                  {invoice.returnDate.slice(0, 10)}
                </TableCell>
                <TableCell className="text-right">
                  {invoice.borrowDate.slice(0, 10)}
                </TableCell>
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
