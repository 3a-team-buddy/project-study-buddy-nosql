"use client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-full h-screen bg-linear-to-b from-[#182130] to-[#030a14]">
        {children}
      </div>
    </div>
  );
}
