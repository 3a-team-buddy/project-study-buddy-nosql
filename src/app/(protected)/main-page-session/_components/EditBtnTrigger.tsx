import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { SessionEditBtn } from "./SessionEditBtn";
import { CreateSessionType } from "@/lib/types";

export const EditBtnTrigger = ({ session }: { session: CreateSessionType }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-1/2 text-accent-foreground cursor-pointer"
          >
            Edit
          </Button>
        </DialogTrigger>
        <SessionEditBtn session={session} />
      </Dialog>
    </>
  );
};
