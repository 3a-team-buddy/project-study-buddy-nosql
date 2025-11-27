"use client";

import { TierCard } from "./TierCard";

const data = [
  {
    tier: 2,
    image:
      "https://talent.pinebaatars.mn/_next/image?url=https%3A%2F%2Fpub-484fddb2ef2146b4b0466a1e883f492b.r2.dev%2Fsticker.png&w=384&q=75",
  },
  {
    tier: 3,
    image:
      "https://talent.pinebaatars.mn/_next/image?url=https%3A%2F%2Fpub-484fddb2ef2146b4b0466a1e883f492b.r2.dev%2Fhoodie.png&w=384&q=75",
  },
  {
    tier: 4,
    image:
      "https://talent.pinebaatars.mn/_next/image?url=https%3A%2F%2Fpub-484fddb2ef2146b4b0466a1e883f492b.r2.dev%2Fhoodie.png&w=384&q=75",
    locked: true,
  },
  {
    tier: 5,
    image:
      "https://talent.pinebaatars.mn/_next/image?url=https%3A%2F%2Fpub-484fddb2ef2146b4b0466a1e883f492b.r2.dev%2Fhoodie.png&w=384&q=75",
    locked: true,
  },
  {
    tier: 6,
    image:
      "https://talent.pinebaatars.mn/_next/image?url=https%3A%2F%2Fpub-484fddb2ef2146b4b0466a1e883f492b.r2.dev%2Fhoodie.png&w=384&q=75",
    locked: true,
  },
];

export const TierMapRewards = () => {
  return (
    <div className="w-full h-fit bg-[#092B4F66] p-6 rounded-lg text-white">
      <div className="flex justify-between mb-4">
        <div className="text-lg font-semibold">Tier map rewards</div>
        <div className="underline cursor-pointer">View all</div>
      </div>

      <div className="flex gap-6 p-4">
        {data.map((item) => (
          <TierCard key={item.tier} {...item} />
        ))}
      </div>
    </div>
  );
};
