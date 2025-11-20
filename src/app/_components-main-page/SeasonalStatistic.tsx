import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function SeasonalStatistic() {
  return (
    <div className="w-full max-w-md mx-auto mt-6">
      <Card className="bg-[#0F2343] text-white rounded-2xl p-4 shadow-xl">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center gap-4">
            <img
              src="/avatar.png"
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <p className="text-lg font-semibold">Г. Анар</p>
              <p className="text-sm opacity-70">556XP үлдсэн</p>
            </div>
          </div>

          {/* Level progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">
                6-р түвшин
              </span>
              <span className="text-sm opacity-80">3324/3880XP</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: "85%" }}
              />
            </div>
          </div>

          {/* XP боломжууд */}
          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="text-sm opacity-80 mb-3">XP цуглуулах боломжууд</p>

            <div className="flex justify-between py-1 text-sm">
              <span>Төсөл оруулах</span>
              <span className="opacity-70">100XP</span>
            </div>

            <div className="flex justify-between py-1 text-sm">
              <span>Судалгаа бөглөх</span>
              <span className="opacity-70">100XP</span>
            </div>

            <div className="flex justify-between py-1 text-sm">
              <span>Хичээлийн ирц</span>
              <span className="opacity-70">Өдөрт~20XP</span>
            </div>

            <div className="flex justify-between py-1 text-sm">
              <span>Тэмцээн уралдаан</span>
              <span className="opacity-70">Бүгд~400XP</span>
            </div>

            <div className="flex justify-between py-1 text-sm">
              <span>NPS</span>
              <span className="opacity-70">1 удаа~100XP</span>
            </div>
          </div>

          {/* Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-xl mt-6 transition">
            Улирлын статистик
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
