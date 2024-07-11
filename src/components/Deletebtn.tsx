"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";

const Deletebtn = (bdayid: { bdayid: string }) => {
  const deleteBday = async () => {
    const resp = await fetch("/api/addbd", {
      method: "DELETE",
      body: JSON.stringify({ id: bdayid }),
    });
    if (resp.ok) {
      toast.success("Birthday reminder deleted successfully");
      window.location.reload();
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className="bg-destructive" asChild>
        <Button variant={"destructive"}>
          Delete{" "}
          <span>
            <Trash size={18} className="ml-2" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            birthday reminder from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteBday}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Deletebtn;
