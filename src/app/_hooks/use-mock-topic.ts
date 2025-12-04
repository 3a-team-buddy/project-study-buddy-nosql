"use client";

import { useEffect, useState } from "react";
import { MockTopicType } from "@/lib/types";
import { useSession } from "./use-session";

export const useMockTopic = () => {
  const { setIsLoading } = useSession();
  const [mockTopics, setMockTopics] = useState<MockTopicType[]>([]);

  const getMockTopics = async () => {
    setIsLoading(true);

    const response = await fetch("/api/mock-datas/create-mock-topic");
    const { data } = await response.json();
    setMockTopics(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getMockTopics();
  }, []);

  return { mockTopics };
};
