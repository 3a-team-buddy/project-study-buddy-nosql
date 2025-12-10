"use client";

import { useRef, useState } from "react";
import { Html, Plane } from "@react-three/drei";
import type * as THREE from "three";
import { Users, Calendar, Clock } from "lucide-react";
import type { SessionCardData } from "@/lib/types";
import { useCard } from "./CardContext";
import { useFrame } from "@react-three/fiber";

interface FloatingCardProps {
  card: SessionCardData;
  position: {
    x: number;
    y: number;
    z: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
  };
}

export default function FloatingCard({ card, position }: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedCard } = useCard();

  // Make cards always face the camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedCard(card);
  };

  const handlePointerOver = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = "auto";
  };

  const getStatusColor = (status?: string) => {
    if (status === "WAITING") return "text-orange-400";
    if (status === "ACCEPTED") return "text-green-400";
    return "text-gray-400";
  };

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      {/* Invisible clickable plane for better click detection */}
      <Plane
        ref={meshRef}
        args={[5.5, 7]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>

      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "none",
        }}
      >
        <div
          className="w-48 rounded-lg overflow-hidden shadow-2xl bg-linear-to-b from-[#082629] to-[#061e20] p-4 select-none"
          style={{
            boxShadow: hovered
              ? "0 25px 50px rgba(49, 184, 198, 0.5), 0 0 30px rgba(49, 184, 198, 0.3)"
              : "0 15px 30px rgba(0, 0, 0, 0.6)",
            border: hovered
              ? "2px solid rgba(49, 184, 198, 0.5)"
              : "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Session Title */}
          <h3 className="text-white text-sm font-semibold mb-3 line-clamp-2 min-h-10">
            {card.sessionTopicTitle}
          </h3>

          {/* Session Details */}
          <div className="space-y-2 text-xs text-white/70 mb-3">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-purple-400" />
              <span className="text-purple-300">{card.value}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-purple-400" />
              <span className="text-purple-300">{card.time}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-3 h-3 text-blue-400" />
              <span className="text-blue-300">{card.selectedSessionType}</span>
            </div>
          </div>

          {/* Participants and Status */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 bg-black/20 px-2 py-1 rounded-full">
              <Users className="w-3 h-3 text-blue-400" />
              <span className="text-xs text-white font-medium">
                {card.studentCount?.length || 0}/{card.maxMember}
              </span>
            </div>
            {(card.category === "Created Sessions" ||
              card.category === "Joined Sessions") &&
              card.status && (
                <span
                  className={`text-xs font-medium ${getStatusColor(
                    card.status
                  )}`}
                >
                  {card.status.toLowerCase()}
                </span>
              )}
          </div>

          {/* Assigned Tutor (if exists) */}
          {card.assignedTutor && (
            <div className="flex items-center gap-2 bg-black/20 px-2 py-1.5 rounded mb-3">
              <img
                src={card.assignedTutor.image || "/placeholder.svg"}
                alt={card.assignedTutor.name}
                className="w-5 h-5 rounded-full"
              />
              <span className="text-xs text-white/80 truncate">
                {card.assignedTutor.name}
              </span>
            </div>
          )}

          {/* Invite Button */}
          <button
            className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white text-xs font-medium py-1.5 px-3 rounded-full transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              console.log("[v0] Invite clicked for:", card.sessionTopicTitle);
            }}
          >
            Invite
          </button>
        </div>
      </Html>
    </group>
  );
}
