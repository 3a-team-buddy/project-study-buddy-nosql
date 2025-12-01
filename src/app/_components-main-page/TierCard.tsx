"use client";
interface TierCardProps {
  image: string;
  tier: number;
  locked?: boolean;
}

export const TierCard = ({ image, tier, locked = false }: TierCardProps) => {
  return (
    <div className="relative w-28 h-28 flex justify-center items-center border border-[#2563EB99] rounded-xl bg-[#0e2644]">
      <img
        src={image}
        alt="Tier reward"
        width={80}
        height={80}
        className="object-contain"
      />

      {locked && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl">
          <span className="text-white text-xl">🔒</span>
        </div>
      )}

      <div className="absolute -bottom-3 flex gap-2">
        <div className="w-7 h-7 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-bold">
          {tier}
        </div>
        <div className="w-7 h-7 rounded-full bg-[#FFB347] text-white flex items-center justify-center text-sm">
          ⭐
        </div>
      </div>
    </div>
  );
};
