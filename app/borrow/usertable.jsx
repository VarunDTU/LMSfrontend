"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SearchCheck, SendToBack, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { completeTransaction, newTransaction } from "../events/severActions";
export function Usertable({ TableData }) {
  const router = useRouter();
  const { data: session } = useSession();
  const data = TableData;
  const [publicationTable, setpublicationTable] = useState(null);
  const [openDialogId, setOpenDialogId] = useState(null);
  const [progress, setprogress] = useState(false);
  const [newPublication, setNewPublication] = useState({
    title: "",
    description: "",
    ssbn: "",
    author: "",
    pages: 0,
  });
  useEffect(() => {
    setpublicationTable(TableData);
  }, [TableData]);
  const handleBorrowing = async (bookId) => {
    try {
      setprogress(true);
      const res = await newTransaction({
        userId: session.user.id,
        bookId: bookId,
      });

      const updatedTable = await publicationTable.map((item) => {
        console.log("item", item._id == bookId);
        if (item._id == bookId) {
          return res;
        } else return item;
      });
      setpublicationTable(updatedTable);

      setOpenDialogId(null);
      toast.success("Book borrowed successfully");
      setprogress(false);
    } catch (error) {
      console.log("error", error.message);
      setprogress(false);
      toast.error("Something went wrong while borrowing");
    }
  };
  const handleReturning = async (bookId) => {
    try {
      setprogress(true);
      const res = await completeTransaction(session.user.id, bookId);

      const updatedTable = await publicationTable.map((item) => {
        console.log("item", item._id == bookId);
        if (item._id == bookId) {
          return { ...item, issued: null };
        } else return item;
      });
      setpublicationTable(updatedTable);
      setOpenDialogId(null);
      toast.success("Book borrowed successfully");
      setprogress(false);
    } catch (error) {
      console.log("error", error.message);
      setprogress(false);
      toast.error("Something went wrong while borrowing");
    }
  };
  return (
    <div>
      <Toaster />
      <div className="flex flex-row justify-between  m-2">
        <div className="flex items-center flex-row">
          <input
            placeholder="Search Title.. "
            className="w-full border rounded p-1 "
          ></input>
          <div className="border rounded p-1 flex flex-row mx-1 hover:border-black hover:bg-slate-200 cursor-pointer ">
            <SearchCheck className=""></SearchCheck>Search
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SSBN</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>title</TableHead>
            <TableHead className="text-right">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publicationTable?.map((invoice, index) => (
            <TableRow
              key={invoice._id}
              className={`${
                invoice &&
                invoice.issued != null &&
                invoice.issued != session.user.id
                  ? "hidden"
                  : ""
              }`}
            >
              <TableCell className="font-medium">{invoice.ssbn}</TableCell>
              <TableCell>{invoice.author}</TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell className="text-right table-fixed">
                {invoice?.description}
              </TableCell>
              <TableCell className="text-right">{}</TableCell>

              {/* issue publication */}

              <TableCell>
                <Dialog open={openDialogId === invoice._id}>
                  <DialogTrigger asChild>
                    {invoice.issued && invoice.issued == session.user.id ? (
                      <SendToBack
                        className={`${
                          invoice.issued ? "text-gray-600" : "text-black"
                        }`}
                        onClick={() => {
                          setOpenDialogId(invoice._id);
                        }}
                      />
                    ) : (
                      <User
                        className={`${
                          invoice.issued ? "text-gray-600" : "text-black"
                        }`}
                        onClick={() => {
                          setOpenDialogId(invoice._id);
                        }}
                      ></User>
                    )}
                  </DialogTrigger>
                  {!(invoice.issued && invoice.issued == session.user.id) ? (
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Borrow Book</DialogTitle>
                        <DialogDescription>Are you sure ?</DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => setOpenDialogId(null)}
                            variant="secondary"
                          >
                            Close
                          </Button>
                        </DialogClose>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => handleBorrowing(invoice._id)}
                        >
                          yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  ) : (
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Return Book</DialogTitle>
                        <DialogDescription>Are you sure ?</DialogDescription>
                      </DialogHeader>

                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            onClick={() => setOpenDialogId(null)}
                            variant="secondary"
                          >
                            Close
                          </Button>
                        </DialogClose>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => handleReturning(invoice._id)}
                        >
                          yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  )}
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {/* <TableFooter>
      <TableRow>
        <TableCell colSpan={3}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter> */}
      </Table>
    </div>
  );
}
