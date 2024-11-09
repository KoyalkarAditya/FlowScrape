import { GetWorkflowsForUser } from "@/actions/workflows/getWorkflowsForUser";
import { Skeleton } from "@/components/ui/skeleton";
import { waitFor } from "@/lib/helper/waitFor";
import { Suspense } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, InboxIcon } from "lucide-react";
import CreateWorkflowDialog from "./_components/CreateWorkFlowDialog";
const page = () => {
  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="flex  justify-between ">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
};

function UserWorkflowsSkeleton() {
  return (
    <div className="space-y-2 w-full">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-[32px] w-full" />
      ))}
    </div>
  );
}

async function UserWorkflows() {
  try {
    const workflows = await GetWorkflowsForUser();
    if (workflows.length == 0) {
      return (
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="rounded-full bg-accent w-20 h-20 flex items-center justify-center">
            <InboxIcon size={40} className="stroke-primary" />
          </div>
          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No workflow created yet</p>
            <p className="text-sm text-muted-foreground ">
              Click the button below to create your workflow
            </p>
          </div>
          <CreateWorkflowDialog triggerText="Create your first Workflow" />
        </div>
      );
    }
    return <div></div>;
  } catch (e) {
    console.log(e);
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong try again later
        </AlertDescription>
      </Alert>
    );
  }
}

export default page;