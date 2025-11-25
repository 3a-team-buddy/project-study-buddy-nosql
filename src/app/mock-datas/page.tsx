"use client";
import React, { useState } from "react";
import { CreateMockTopic, CreateMockTutor } from "./_components";
import { CreateMockStudent } from "./_components/CreateMockStudent";
const MockDatasPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="w-full h-screen text-white flex flex-col bg-white/10 rounded-2xl p-5 gap-6">
      <CreateMockTopic setLoading={setLoading} loading={loading} />

      <div>
        <CreateMockTutor setLoading={setLoading} loading={loading} />
      </div>
      <div>
        <CreateMockStudent setLoading={setLoading} loading={loading} />
      </div>
    </div>
  );
};
export default MockDatasPage;
