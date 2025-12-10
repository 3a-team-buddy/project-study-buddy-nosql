import { Button, Dialog, DialogTrigger } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import { SessionEditBtn } from "./SessionEditBtn";

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
