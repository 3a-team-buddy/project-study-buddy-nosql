"use client";

import { useRef, useState } from "react";
import { Html } from "@react-three/drei";
import type * as THREE from "three";
import { useCard } from "./CardContext";
import { useFrame } from "@react-three/fiber";

interface CardChunkProps {
  category: string;
  isSelected: boolean;
  cardCount: number;
}

export default function CardChunk({
  category,
  isSelected,
  cardCount,
}: CardChunkProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { setSelectedChunk } = useCard();

  // Make label always face the camera
  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position);
    }
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSelectedChunk(isSelected ? null : category);
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

  return (
    <group ref={groupRef} position={[0, 12, 0]}>
      <Html
        transform
        distanceFactor={15}
        position={[0, 0, 0]}
        style={{
          pointerEvents: "auto",
          transition: "all 0.3s ease",
          transform: hovered || isSelected ? "scale(1.1)" : "scale(1)",
        }}
      >
        <div
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          className="px-6 py-3 rounded-full select-none cursor-pointer"
          style={{
            background: isSelected
              ? "linear-gradient(135deg, rgba(49, 184, 198, 0.9), rgba(49, 184, 198, 0.6))"
              : "rgba(31, 33, 33, 0.8)",
            border:
              hovered || isSelected
                ? "2px solid rgba(49, 184, 198, 0.8)"
                : "1px solid rgba(255, 255, 255, 0.2)",
            boxShadow:
              hovered || isSelected
                ? "0 10px 40px rgba(49, 184, 198, 0.5), 0 0 20px rgba(49, 184, 198, 0.3)"
                : "0 5px 15px rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="text-center">
            <p className="text-white font-bold text-base whitespace-nowrap">
              {category}
            </p>
            <p className="text-white/70 text-xs mt-1">{cardCount} sessions</p>
          </div>
        </div>
      </Html>
    </group>
  );
}
