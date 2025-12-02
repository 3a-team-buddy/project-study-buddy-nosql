"use client";

import React, { useState } from "react";
import {
  CreateMockStudent,
  CreateMockTopic,
  CreateMockTutor,
} from "./_components";
import CreateMockUser from "./_components/CreateMockUser";

const MockDatasPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="w-full h-full bg-gray-700 text-white flex flex-col pt-10 px-50 gap-10">
      <CreateMockTopic setLoading={setLoading} loading={loading} />

      <CreateMockTutor setLoading={setLoading} loading={loading} />

      <CreateMockStudent setLoading={setLoading} loading={loading} />

      <CreateMockUser setLoading={setLoading} loading={loading} />

      <div>Test</div>
    </div>
  );
};
export default MockDatasPage;
