"use client";
import {
  addPublicationsService,
  deletePublicationsService,
  updatePublicationsService,
} from "@/app/events/severActions";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
export function TablePublications({ TableData }) {
  var data = TableData;
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
  function handleUpdate(index, str, update) {
    const nextCounters = publicationTable.map((publication, i) => {
      if (i === index) {
        if (str == "author") {
          return { ...publication, author: update };
        } else if (str == "description") {
          return { ...publication, description: update };
        } else if (str == "title") {
          return { ...publication, title: update };
        } else if (str == "ssbn") {
          return { ...publication, ssbn: update };
        }
      } else {
        return publication;
      }
    });
    setpublicationTable(nextCounters);
  }

  async function updatePublication(id, publication) {
    setprogress(true);
    try {
      console.log("publication", publication);
      const res = await updatePublicationsService(id, publication);
      toast.success("Publication updated successfully");
      console.log("res", "helllo");
      setprogress(false);
      setOpenDialogId(null);
    } catch (error) {
      setpublicationTable(TableData);
      toast.error("Error updating publication");
      setprogress(false);
    }
  }

  async function addPublication() {
    setprogress(true);
    try {
      const newPub = await addPublicationsService(newPublication);

      console.log("resssss", newPub);
      setpublicationTable([...publicationTable, newPub]);
      setNewPublication({
        title: "",
        description: "",
        ssbn: "",
        author: "",
        pages: 0,
      });
      toast.success("Publication added successfully");

      setprogress(false);
    } catch (error) {
      toast.error("Error adding publication");
      setprogress(false);
    }
  }

  async function deletePublication(id) {
    setprogress(true);
    try {
      const res = await deletePublicationsService(id);
      setpublicationTable(
        publicationTable.filter((publication) => publication._id !== id)
      );
      setprogress(false);
      toast.success("Publication deleted successfully");
    } catch (error) {
      toast.error("Error deleting publication");
      setprogress(false);
    }
  }
  return (
    <div>
      <Toaster />
      <div className="flex flex-row justify-end  m-2">
        {/* <div className="flex items-center flex-row">
          <input
            placeholder="Search Title.. "
            className="w-full border rounded p-1 "
          ></input>
          <div className="border rounded p-1 flex flex-row mx-1 hover:border-black hover:bg-slate-200 cursor-pointer ">
            <SearchCheck className=""></SearchCheck>Search
          </div>
        </div> */}
        <div className="border rounded px-2 py-1 flex flex-row mx-1 hover:border-black hover:bg-slate-200 cursor-pointer ">
          {/* add new publication */}
          <Dialog title="Edit publication">
            <DialogTrigger asChild>
              <div variant="outline">
                <Plus></Plus>
                Add
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add publication</DialogTitle>
                <DialogDescription>
                  Add New publication here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Author
                  </Label>
                  <Input
                    id="author"
                    value={newPublication.author}
                    onChange={(e) =>
                      setNewPublication({
                        ...newPublication,
                        author: e.target.value,
                      })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="text" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newPublication.description}
                    className="col-span-3"
                    onChange={(e) =>
                      setNewPublication({
                        ...newPublication,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="text" className="text-right">
                    SSBN
                  </Label>
                  <Input
                    id="ss"
                    value={newPublication.ssbn}
                    className="col-span-3"
                    onChange={(e) =>
                      setNewPublication({
                        ...newPublication,
                        ssbn: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="add"
                    value={newPublication.title}
                    className="col-span-3"
                    onChange={(e) =>
                      setNewPublication({
                        ...newPublication,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Pages
                  </Label>
                  <Input
                    id="ss"
                    type="number"
                    value={newPublication.pages}
                    className="col-span-3"
                    onChange={(e) =>
                      setNewPublication({
                        ...newPublication,
                        pages: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                {progress ? (
                  <Button disabled>Updating</Button>
                ) : (
                  <Button
                    onClick={() => {
                      addPublication();
                    }}
                  >
                    Save changes
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
            <TableRow key={invoice._id}>
              <TableCell className="font-medium">{invoice.ssbn}</TableCell>
              <TableCell>{invoice.author}</TableCell>
              <TableCell>{invoice.title}</TableCell>
              <TableCell className="text-right table-fixed">
                {invoice?.description}
              </TableCell>
              <TableCell className="text-right">{}</TableCell>
              <TableCell>
                {/* edit publication */}
                <Dialog
                  open={openDialogId === invoice.ssbn}
                  title="Edit publication"
                >
                  <DialogTrigger asChild>
                    <div
                      variant="outline"
                      onClick={() => {
                        setOpenDialogId(invoice.ssbn),
                          console.log("openDialogId", openDialogId);
                      }}
                    >
                      <Edit className="hover:text-slate-500" />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit publication</DialogTitle>
                      <DialogDescription>
                        Make changes to your publication here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Author
                        </Label>
                        <Input
                          id="author"
                          value={invoice.author}
                          onChange={(e) =>
                            handleUpdate(index, "author", e.target.value)
                          }
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="text" className="text-right">
                          Description
                        </Label>
                        <Input
                          id="description"
                          value={invoice.description}
                          className="col-span-3"
                          onChange={(e) =>
                            handleUpdate(index, "description", e.target.value)
                          }
                        />
                      </div>
                      {/* <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="text" className="text-right">
                      SSBN
                    </Label>
                    <Input
                      id="ss"
                      value={invoice.ssbn}
                      className="col-span-3"
                      onChange={(e) =>
                        handleUpdate(index, "ssbn", e.target.value)
                      }
                    />
                  </div> */}
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="ss"
                          value={invoice.title}
                          className="col-span-3"
                          onChange={(e) =>
                            handleUpdate(index, "title", e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="outline"
                        onClick={() => {
                          setpublicationTable(data);
                          console.log("data", data[index].author);
                          setOpenDialogId(null);
                        }}
                      >
                        Cancel
                      </Button>
                      {progress ? (
                        <Button disabled>Updating</Button>
                      ) : (
                        <Button
                          onClick={async () => {
                            await updatePublication(invoice._id, invoice);
                          }}
                        >
                          Save changes
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              {/* delete publication */}
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Trash className="text-red-400 hover:text-red-800"></Trash>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Are you sure?</DialogTitle>
                      <DialogDescription>
                        Confirm to proceed with this action
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button
                          type="button"
                          className="border-red-600"
                          variant="secondary"
                        >
                          Close
                        </Button>
                      </DialogClose>

                      {progress ? (
                        <Button
                          type="button"
                          className="border-2 border-red-500 hover:bg-red-500 hover:text-slate-950"
                          variant="outline"
                          onClick={() => deletePublication(invoice._id)}
                        >
                          loading
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          className="border-2 border-red-500 hover:bg-red-500 hover:text-slate-950"
                          variant="outline"
                          onClick={() => deletePublication(invoice._id)}
                        >
                          Confirm
                        </Button>
                      )}
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell>
              {/* issue publication */}
              {/* <TableCell >
                <Dialog>
                  <DialogTrigger asChild>
                    <User
                      className={`${
                        invoice.issued ? "text-gray-600" : "text-black"
                      }`}
                    ></User>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Share link</DialogTitle>
                      <DialogDescription>
                        Anyone who has this link will be able to view this.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2">
                      <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                          Link
                        </Label>
                        <Input
                          id="link"
                          defaultValue="https://ui.shadcn.com/docs/installation"
                          readOnly
                        />
                      </div>
                      <Button type="submit" size="sm" className="px-3">
                        <span className="sr-only">Copy</span>
                        <Copy></Copy>
                      </Button>
                    </div>
                    <DialogFooter className="sm:justify-start">
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </TableCell> */}
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
