"use client";

import { useEffect, useState } from "react";
import { MockTopicType } from "@/lib/types";

export const useMockTopic = () => {
  const [mockTopics, setMockTopics] = useState<MockTopicType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getMockTopics = async () => {
    setLoading(true);

    const response = await fetch("api/mock-datas/create-mock-topic");
    const { data } = await response.json();
    setMockTopics(data);
    setLoading(false);
  };

  useEffect(() => {
    getMockTopics();
  }, []);

  return { mockTopics, loading, setLoading };
};
