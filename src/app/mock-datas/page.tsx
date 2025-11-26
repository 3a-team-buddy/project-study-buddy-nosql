"use client";
import React, { useState } from "react";
import { CreateMockTopic, CreateMockTutor } from "./_components";
import { CreateMockStudent } from "./_components/CreateMockStudent";
const MockDatasPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-full h-screen bg-gray-700 text-white flex flex-col pt-10 px-50 gap-10">
      <CreateMockTopic setLoading={setLoading} loading={loading} />

      <CreateMockTutor setLoading={setLoading} loading={loading} />

      <CreateMockStudent setLoading={setLoading} loading={loading} />
    </div>
  );
};
export default MockDatasPage;
