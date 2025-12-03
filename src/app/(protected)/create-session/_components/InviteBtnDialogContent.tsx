import React, { useState } from "react";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
} from "@/components/ui";
import { IoPersonAdd } from "react-icons/io5";
import { toast } from "sonner";
import { SelectedStudentType } from "@/lib/types";

export const InviteBtnDialogContent = ({}: {}) => {
  const [selectedStudents, setSelectedStudents] = useState<
    SelectedStudentType[]
  >([]);
  const [emailInputValue, setEmailInputValue] = useState<string>("");

  const handleAddStudentEmail = () => {
    const newSelectedStudents = [
      ...selectedStudents,
      { email: emailInputValue },
    ];
    if (newSelectedStudents) {
      setSelectedStudents(newSelectedStudents);
    }
    setEmailInputValue("");
  };

  const deleteSelectedStudent = (studentEmail: string) => {
    const remainedSelectedStudent = selectedStudents.filter(
      (selectedStudent) => selectedStudent.email !== studentEmail
    );

    if (remainedSelectedStudent) {
      setSelectedStudents(remainedSelectedStudent);
    }
  };

  const handleInviteToast = () => {
    toast.success("Invite sent successfully");
    // setEmailInputValue("");
  };

  return (
    <DialogContent className="px-8 py-6 gap-10 border-0 rounded-2xlå">
      <DialogHeader>
        <DialogTitle>Invite students</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <div className="flex gap-3 items-center">
          <Input
            type="email"
            placeholder="Enter student email address..."
            value={emailInputValue}
            onChange={(e) => setEmailInputValue(e.target.value)}
          />
          <Button
            disabled={selectedStudents.length > 2}
            onClick={handleAddStudentEmail}
            className="cursor-pointer"
          >
            <IoPersonAdd />
          </Button>
        </div>
      </div>

      {selectedStudents && (
        <div>
          {selectedStudents.map((student, index) => {
            return (
              <div key={index} className="flex justify-between items-center">
                <Label className="font-normal">{student.email}</Label>
                <Button
                  variant={"ghost"}
                  onClick={() => deleteSelectedStudent(student.email)}
                >
                  x
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Label htmlFor="link">Link to send</Label>
        <Input
          id="link"
          defaultValue="http://localhost:3000/create-session"
          readOnly
        />
      </div>

      <DialogFooter className="sm:justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
        <Button type="submit" onClick={handleInviteToast}>
          Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
