"use client";

import { useMemo, useRef, useEffect } from "react";
import { Sphere } from "@react-three/drei";
import { useCard } from "./CardContext";
import CardChunk from "./CardChunk";
import FloatingCard from "./FloatingCard";
import { useThree } from "@react-three/fiber";

export default function CardGalaxy() {
  const { cards, selectedChunk } = useCard();
  const { camera } = useThree();
  const cameraTargetRef = useRef({ x: 0, y: 0, z: 0 });

  const cardsByCategory = useMemo(() => {
    return {
      "Created Sessions": cards.filter(
        (card) => card.category === "Created Sessions"
      ),
      "Joined Sessions": cards.filter(
        (card) => card.category === "Joined Sessions"
      ),
      "More Sessions": cards.filter(
        (card) => card.category === "More Sessions"
      ),
    };
  }, [cards]);

  const chunkPositions = {
    "Created Sessions": { x: 5, y: -5, z: -18 }, // Along x-axis (right)
    "Joined Sessions": { x: -10, y: 3, z: 15 }, // Along y-axis (up in 3D space)
    "More Sessions": { x: 15, y: -3, z: 10 }, // Along z-axis (forward)
  };

  useEffect(() => {
    if (selectedChunk) {
      const chunkPos =
        chunkPositions[selectedChunk as keyof typeof chunkPositions];
      cameraTargetRef.current = { x: chunkPos.x, y: chunkPos.y, z: chunkPos.z };
    } else {
      cameraTargetRef.current = { x: 0, y: 0, z: 0 };
    }
  }, [selectedChunk]);

  const getCardPositionsInChunk = (numCards: number) => {
    const positions = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < numCards; i++) {
      const y = 1 - (i / (numCards - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Smaller radius for cards within a chunk
      const layerRadius = 5 + (i % 2) * 2;

      positions.push({
        x: x * layerRadius,
        y: y * layerRadius,
        z: z * layerRadius,
        rotationX: Math.atan2(z, Math.sqrt(x * x + y * y)),
        rotationY: Math.atan2(x, z),
        rotationZ: (Math.random() - 0.5) * 0.2,
      });
    }

    return positions;
  };

  return (
    <>
      {Object.entries(cardsByCategory).map(([category, categoryCards]) => {
        const chunkPos =
          chunkPositions[category as keyof typeof chunkPositions];
        const cardPositions = getCardPositionsInChunk(categoryCards.length);
        const isSelected = selectedChunk === category;

        const zOffset = isSelected ? 5 : selectedChunk ? -20 : 0;
        const scale = isSelected ? 1.2 : selectedChunk ? 0.7 : 1;

        return (
          <group
            key={category}
            position={[chunkPos.x, chunkPos.y, chunkPos.z + zOffset]}
            scale={scale}
          >
            {/* Chunk label and boundary */}
            <CardChunk
              category={category}
              isSelected={isSelected}
              cardCount={categoryCards.length}
            />

            {/* Cards within this chunk */}
            {categoryCards.map((card, index) => (
              <FloatingCard
                key={card.id}
                card={card}
                position={cardPositions[index]}
              />
            ))}

            {/* Reference sphere for this chunk */}
            <Sphere args={[8, 32, 32]} position={[0, 0, 0]}>
              <meshStandardMaterial
                color={isSelected ? "#31b8c6" : "#1a1a2e"}
                transparent
                opacity={isSelected ? 0.15 : 0.05}
                wireframe
              />
            </Sphere>
          </group>
        );
      })}
    </>
  );
}
