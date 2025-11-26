"use client";

import React from "react";
import { SignIn } from "@clerk/nextjs";

const LoginPage = () => {
  // console.log("rendering");
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SignIn routing={"hash"} />
    </div>
  );
};

export default LoginPage;
