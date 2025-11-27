"use client";

import React, { useEffect, useState } from "react";
import { MockTutorType } from "@/lib/types";

export const useMockTutor = () => {
  const [mockTutors, setMockTutors] = useState<MockTutorType[]>([]);

  const getMockTutors = async () => {
    const result = await fetch("api/mock-datas/create-mock-tutor");
    const responseData = await result.json();
    const { mockTutors } = responseData;
    console.log(mockTutors, "GET data");
    setMockTutors(mockTutors);
  };

  useEffect(() => {
    getMockTutors();
  }, []);

  return { mockTutors };
};
