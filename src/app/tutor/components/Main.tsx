"use client";

import { useEffect, useState } from "react";
import { X, Calendar } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  name: string;
  image?: string;
}

interface ChristmasModalProps {
  title?: string;
  description?: string;
  footerText?: string;
}

export function Main({ title, description, footerText }: ChristmasModalProps) {
  const isOpen = true;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop with Snowfall */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 overflow-hidden ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Backdrop Snowflakes - Layer 1 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none ">
          {[...Array(20)].map((_, i) => (
            <div
              key={`backdrop-snow-large-${i}`}
              className="snowflake-large absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                fontSize: `${Math.random() * 8 + 20}px`,
                animationDuration: `${Math.random() * 3 + 6}s`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* Backdrop Snowflakes - Layer 2 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none ">
          {[...Array(25)].map((_, i) => (
            <div
              key={`backdrop-snow-medium-${i}`}
              className="snowflake-medium absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                fontSize: `${Math.random() * 6 + 14}px`,
                animationDuration: `${Math.random() * 3 + 6}s`,
              }}
            >
              ❄
            </div>
          ))}
        </div>

        {/* Backdrop Snowflakes - Layer 3 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={`backdrop-snow-small-${i}`}
              className="snowflake-small absolute text-white"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 4 + 8}px`,
                animationDuration: `${Math.random() * 3 + 7}s`,
              }}
            >
              ❄
            </div>
          ))}
        </div>
      </div>

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className={`relative w-full max-w-md pointer-events-auto transition-all duration-300 ease-out ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Layer 1: Large Snowflakes */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`snow-large-${i}`}
                className="snowflake-large absolute text-white"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 6 + 16}px`,
                  animationDuration: `${Math.random() * 2 + 6}s`,
                }}
              >
                ❄
              </div>
            ))}
          </div>

          {/* Layer 2: Medium Snowflakes */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none z-10">
            {[...Array(12)].map((_, i) => (
              <div
                key={`snow-medium-${i}`}
                className="snowflake-medium absolute text-white/80"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 4 + 12}px`,
                  animationDuration: `${Math.random() * 2 + 7}s`,
                }}
              >
                ❄
              </div>
            ))}
          </div>

          {/* Floating Ornaments */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(5)].map((_, i) => {
              const ornaments = ["🔴", "🟢", "⭐", "🎁", "🎄"];
              return (
                <div
                  key={`ornament-${i}`}
                  className="ornament absolute "
                  style={{
                    left: `${15 + Math.random() * 70}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.4}s`,
                    fontSize: `${Math.random() * 6 + 14}px`,
                  }}
                >
                  {ornaments[i]}
                </div>
              );
            })}
          </div>

          {/* Floating Holly Leaves */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={`holly-${i}`}
                className="holly-float absolute text-[#0F5D4A]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 6 + 12}px`,
                }}
              >
                🍃
              </div>
            ))}
          </div>

          {/* Twinkling Stars */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="twinkle-star absolute text-[#D9B96E]"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${Math.random() * 4 + 8}px`,
                }}
              >
                ✨
              </div>
            ))}
          </div>

          <div className="relative bg-linear-to-br from-white/95 via-white/90 to-white/95 dark:from-slate-900/95 dark:via-slate-800/90 dark:to-slate-900/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-white/40 dark:border-slate-700/40 overflow-hidden">
            <div className="h-2 bg-linear-to-br from-[#556B2F] via-[#8FA31E] via-50% via-[#C6D870] to-[#A72703] shimmer" />

            <div className="p-8 pt-12">
              <div className="flex justify-center mb-6">
                <div className="floating-avatar relative">
                  <div className="w-24 h-24 rounded-full bg-linear-to-br from-[#C53B3B] via-[#0F5D4A] to-[#D9B96E] flex items-center justify-center text-5xl shadow-2xl ring-4 ring-white/50 dark:ring-slate-700/50 pulse-scale">
                    🎄
                  </div>
                  <div className="absolute inset-0 rounded-full bg-[#0F5D4A]/30 blur-2xl animate-pulse" />
                  <div className="absolute inset-0 rounded-full bg-[#D9B96E]/20 blur-xl pulse-glow" />
                </div>
              </div>

              <h2
                className="text-3xl font-serif font-bold text-center mb-3 bg-linear-to-r from-[#C53B3B] via-[#0F5D4A] to-[#D9B96E] bg-size-[200%_auto] bg-clip-text text-transparent slide-in-up animate-gradient"
                style={{ animationDelay: "0.1s" }}
              >
                {title}
              </h2>

              {description === "You declined the session" ||
              description === "Your session was deleted" ? (
                <p
                  className="text-center font-extrabold  text-red-800 dark:text-slate-300 mb-6 slide-in-up leading-relaxed"
                  style={{ animationDelay: "0.2s" }}
                >
                  {description}
                </p>
              ) : (
                <p
                  className="text-center font-extrabold text-green-900 dark:text-slate-300 mb-6 slide-in-up leading-relaxed"
                  style={{ animationDelay: "0.2s" }}
                >
                  {description}
                </p>
              )}

              <div
                className="flex items-center justify-center gap-2 mb-4 slide-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="h-px w-16 bg-linear-to-r from-transparent via-[#0F5D4A]/60 to-transparent" />
                <span className="text-xl pulse-animation">🎄</span>
                <div className="h-px w-16 bg-linear-to-r from-transparent via-[#0F5D4A]/60 to-transparent" />
              </div>

              <div className="text-center">
                <p
                  className="text-sm text-slate-500 dark:text-slate-400 slide-in-up font-medium"
                  style={{ animationDelay: "0.6s" }}
                >
                  {footerText}
                </p>
              </div>
            </div>

            <div
              className="h-10 bg-linear-to-r from-[#0F5D4A]/10 via-[#C53B3B]/15 to-[#0F5D4A]/10 flex items-center justify-center gap-4 text-xl slide-in-up border-t border-[#0F5D4A]/10"
              style={{ animationDelay: "0.7s" }}
            >
              <span className="swing-animation">🎄</span>
              <span
                className="swing-animation"
                style={{ animationDelay: "0.2s" }}
              >
                🔔
              </span>
              <span
                className="swing-animation"
                style={{ animationDelay: "0.4s" }}
              >
                ⭐
              </span>
              <span
                className="swing-animation"
                style={{ animationDelay: "0.6s" }}
              >
                🎄
              </span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes snowfallLarge {
          0% {
            transform: translateY(-100%) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) translateX(50px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes snowfallMedium {
          0% {
            transform: translateY(-100%) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.9;
          }
          90% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(120vh) translateX(-30px) rotate(-360deg);
            opacity: 0;
          }
        }

        @keyframes snowfallSmall {
          0% {
            transform: translateY(-100%) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(120vh) translateX(20px) rotate(180deg);
            opacity: 0;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.05);
          }
        }

        @keyframes sparkle {
          0%,
          100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.15);
            filter: brightness(1.3);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes ornamentFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes hollyFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-15px) rotate(180deg) scale(1.1);
          }
        }

        @keyframes treeFloat {
          0%,
          100% {
            transform: translateY(0) scale(1) rotate(-5deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-10px) scale(1.15) rotate(5deg);
            opacity: 1;
          }
        }

        @keyframes pulseScale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.08);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes rotateAnimation {
          0%,
          100% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(8deg);
          }
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes swing {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(12deg);
          }
          75% {
            transform: rotate(-12deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        @keyframes gradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .snowflake-large {
          animation: snowfallLarge linear infinite;
          user-select: none;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.8));
        }

        .snowflake-medium {
          animation: snowfallMedium linear infinite;
          user-select: none;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.6));
        }

        .snowflake-small {
          animation: snowfallSmall linear infinite;
          user-select: none;
          filter: drop-shadow(0 0 2px rgba(255, 255, 255, 0.4));
        }

        .floating-avatar {
          animation: float 3s ease-in-out infinite;
        }

        .sparkle-avatar {
          animation: sparkle 2s ease-in-out infinite, slideInUp 0.5s ease-out;
        }

        .slide-in-up {
          animation: slideInUp 0.5s ease-out;
        }

        .shimmer {
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }

        .twinkle-star {
          animation: twinkle 1.5s ease-in-out infinite;
        }

        .ornament {
          animation: ornamentFloat 4s ease-in-out infinite;
        }

        .holly-float {
          animation: hollyFloat 5s ease-in-out infinite;
        }

        .tree-float {
          animation: treeFloat 4s ease-in-out infinite;
        }

        .pulse-scale {
          animation: pulseScale 2s ease-in-out infinite;
        }

        .pulse-glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }

        .rotate-animation {
          animation: rotateAnimation 2s ease-in-out infinite;
        }

        .rotate-animation-reverse {
          animation: rotateAnimation 2s ease-in-out infinite reverse;
        }

        .bounce-animation {
          animation: bounce 1s ease-in-out infinite;
        }

        .swing-animation {
          animation: swing 2s ease-in-out infinite;
          display: inline-block;
          transform-origin: top center;
        }

        .pulse-animation {
          animation: pulse 1.5s ease-in-out infinite;
          display: inline-block;
        }

        .animate-gradient {
          animation: gradientShift 3s ease infinite;
          background-size: 200% auto;
        }

        .border-gradient {
          border-image: linear-gradient(
              90deg,
              rgba(197, 59, 59, 0.5),
              rgba(15, 93, 74, 0.5),
              rgba(217, 185, 110, 0.5)
            )
            1;
        }
      `}</style>
    </>
  );
}
