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
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
};

const DeleteWorkFlowDialog = ({ open, setOpen, workflowName }: Props) => {
  const [confirmText, setConfirmText] = useState("");
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are u absolutely sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          If you delete the workflow, you will not be able to recover it.
          <div className="flex flex-col py-4 gap-2">
            <p>
              If you are sure, enter <b>{workflowName}</b> to confirm
            </p>
            <Input
              value={confirmText}
              type="text"
              onChange={(e) => setConfirmText(e.target.value)}
            />
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={confirmText !== workflowName}
            className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkFlowDialog;
