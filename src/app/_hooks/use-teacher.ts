"use client";

import { useEffect, useState } from "react";
import { MockUserType } from "@/lib/types";

export const useTeacher = () => {
  const [teachers, setTeachers] = useState<MockUserType[]>([]);

  const getTeachers = async () => {
    const result = await fetch("/api/get-teachers");
    const { data } = await result.json();
    setTeachers(data);
  };

  useEffect(() => {
    getTeachers();
  }, []);

  return { teachers };
};
