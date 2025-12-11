"use client";
import { SignIn } from "@clerk/nextjs";
import { FloatingCoins } from "./_components/FloatingCoins";
import { usePrefersReducedMotion } from "./_hook/usePrefersReducedMotion";

const LoginPage = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {!reduced && (
        <div className="absolute inset-0 z-0">
          <FloatingCoins reduced={reduced} />
        </div>
      )}

      <div className="relative z-10">
        <SignIn routing={"hash"} />
      </div>
    </div>
  );
};

export default LoginPage;
