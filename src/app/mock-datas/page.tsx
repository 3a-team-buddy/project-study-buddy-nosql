"use client";

import React, { useState } from "react";
import { CreateMockTopic, CreateMockUser } from "./_components";

const MockDatasPage = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="w-full h-full bg-gray-700 text-white flex flex-col pt-10 px-50 gap-10">
      <CreateMockTopic setLoading={setLoading} loading={loading} />

      <CreateMockUser setLoading={setLoading} loading={loading} />

      <div>Test</div>
    </div>
  );
};
export default MockDatasPage;
