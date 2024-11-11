"use client";
import { DeleteWorkflow } from "@/actions/workflows/deleteWorkFlow";
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
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  workflowName: string;
  workflowId: string;
};

const DeleteWorkFlowDialog = ({
  open,
  setOpen,
  workflowName,
  workflowId,
}: Props) => {
  const [confirmText, setConfirmText] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: DeleteWorkflow,
    onSuccess: () => {
      toast.success("Workflow deleted successfully", {
        id: workflowId,
      });
    },
    onError: () => {
      toast.error("Something went wrong", {
        id: workflowId,
      });
    },
  });
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
            disabled={confirmText !== workflowName || isPending}
            className="bg-destructive cursor-pointer text-destructive-foreground hover:bg-destructive/90"
            onClick={(e) => {
              e.preventDefault();
              toast.loading("Deleting workflow", { id: workflowId });
              mutate(workflowId);
            }}
          >
            {isPending ? "Deleting..." : "Delete"}
            {isPending && <Loader2 className="w-5 h-5 animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteWorkFlowDialog;
