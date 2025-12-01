"use client";

import React, { useEffect, useState } from "react";
import { JoinedStudentType } from "@/lib/types";
import { toast } from "sonner";

export const useJoinedStudents = () => {
  const [allJoinedStudents, setAllJoinedStudents] = useState<
    JoinedStudentType[]
  >([]);

  console.log({ allJoinedStudents });

  const getJoinedStudents = async () => {
    const response = await fetch("/api/joined-students");
    const { data } = await response.json();

    if (!response.ok) {
      toast.error("No joined students!");
    }

    setAllJoinedStudents(data);
  };

  useEffect(() => {
    getJoinedStudents();
  }, []);

  return { allJoinedStudents };
};
