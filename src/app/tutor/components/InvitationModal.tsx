"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, Briefcase, X } from "lucide-react";
type InvitationModalprops = {
  title: String;
  description: String;
  text: String;
};
export function InvitationModal({
  title,
  description,
  text,
}: InvitationModalprops) {
  const [isOpen, setIsOpen] = useState(true);
  // Snowflake positions
  const [snowflakes, setSnowflakes] = useState<
    Array<{
      id: number;
      left: string;
      delay: string;
      duration: string;
    }>
  >([]);

  const teamMembers = [
    { name: "Sarah Chen", avatar: "/diverse-woman-portrait.png" },
    { name: "Marcus Lee", avatar: "/man.jpg" },
    { name: "Emma Wilson", avatar: "/diverse-woman-portrait.png" },
    { name: "James Park", avatar: "/man.jpg" },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${8 + Math.random() * 4}s`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes breathe {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.9;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes snowfall {
          0% {
            transform: translateY(-10px) translateX(0px);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(20px);
            opacity: 0;
          }
        }

        @keyframes modalIn {
          from {
            opacity: 0;
            transform: scale(0.96);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(15, 93, 74, 0.5),
              0 0 40px rgba(15, 93, 74, 0.2);
          }
          50% {
            box-shadow: 0 0 30px rgba(15, 93, 74, 0.7),
              0 0 60px rgba(15, 93, 74, 0.3);
          }
        }

        .animate-breathe {
          animation: breathe 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-snowfall {
          animation: snowfall linear infinite;
        }

        .animate-modal-in {
          animation: modalIn 0.3s ease-out;
        }

        .animate-slide-in {
          animation: slideIn 0.4s ease-out;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pb-safe pt-safe">
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          {snowflakes.map((snow) => (
            <div
              key={snow.id}
              className="absolute w-2 h-2 bg-white/30 rounded-full animate-snowfall"
              style={{
                left: snow.left,
                animationDelay: snow.delay,
                animationDuration: snow.duration,
              }}
            />
          ))}
        </div>

        <div className="relative w-full max-w-[420px] min-w-[300px] mx-auto animate-modal-in">
          <div className="bg-card/95 backdrop-blur-xl rounded-[28px] shadow-2xl border-2 border-[#0F5D4A]/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-[#C53B3B] via-[#D9B96E] to-[#0F5D4A]" />

            <div className="p-6 xs:p-8 space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#0F5D4A]/30 rounded-full animate-breathe blur-xl" />
                  <Avatar className="w-16 h-16 xs:w-20 xs:h-20 border-4 border-[#D9B96E] shadow-lg relative">
                    <AvatarImage src="/project-management-team.png" />
                    <AvatarFallback className="bg-[#0F5D4A] text-white text-2xl"></AvatarFallback>
                  </Avatar>
                </div>
              </div>

              <div
                className="text-center space-y-2 animate-slide-in"
                style={{ animationDelay: "0.1s" }}
              >
                <h2 className="text-[17px] xs:text-[20px] font-semibold text-foreground text-balance">
                  {title}
                </h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-[#C53B3B]" />
                  <span className="text-sm">{"Dec 25, 2024"}</span>
                </div>
              </div>

              <div
                className="text-center text-[15px] leading-relaxed text-foreground/80 px-2 animate-slide-in"
                style={{ animationDelay: "0.2s" }}
              >
                <p className="text-balance">
                  {description}
                  <span className="font-semibold text-[#0F5D4A]">
                    project name
                  </span>
                </p>
              </div>

              <div
                className="flex justify-center items-center gap-1 animate-slide-in"
                style={{ animationDelay: "0.3s" }}
              >
                <Users className="w-4 h-4 text-[#0F5D4A] mr-2" />
                <div className="flex -space-x-2">
                  {teamMembers.map((member, index) => (
                    <Avatar
                      key={member.name}
                      className="w-9 h-9 border-2 border-card shadow-md hover:z-10 hover:scale-110 transition-transform"
                      style={{
                        animationDelay: `${0.4 + index * 0.1}s`,
                      }}
                    >
                      <AvatarImage
                        src={member.avatar || "/placeholder.svg"}
                        alt={member.name}
                      />
                      <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
                <span className="ml-3 text-sm text-muted-foreground">
                  // total student
                </span>
              </div>

              <p
                className="text-center text-xs text-muted-foreground animate-slide-in"
                style={{ animationDelay: "0.6s" }}
              >
                {text}
              </p>
            </div>
            <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-[#D9B96E]/5 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </>
  );
}
