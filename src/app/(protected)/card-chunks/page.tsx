"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Environment } from "@react-three/drei";
import { CardProvider } from "./_components";
import StarfieldBackground from "./_components/StarfieldBackground";
import CardGalaxy from "./_components/CardGalaxy";
import SessionCreationCard from "./_components/SessionCreationCard";
import CardModal from "./_components/CardModal";

export default function Page() {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-black flex">
        <StarfieldBackground />

        <div className="w-2/3 h-full relative">
          <Canvas
            camera={{ position: [0, 0, 15], fov: 60 }}
            className="absolute inset-0 z-10"
            onCreated={({ gl }) => {
              gl.domElement.style.pointerEvents = "auto";
            }}
          >
            <Suspense fallback={null}>
              <Environment preset="night" />
              <ambientLight intensity={0.4} />
              <pointLight position={[10, 10, 10]} intensity={0.6} />
              <pointLight position={[-10, -10, -10]} intensity={0.3} />

              <CardGalaxy />

              <OrbitControls
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                minDistance={5}
                maxDistance={50}
                autoRotate={false}
                rotateSpeed={0.5}
                zoomSpeed={1.2}
                panSpeed={0.8}
                target={[0, 0, 0]}
              />
            </Suspense>
          </Canvas>
        </div>

        <div className="w-1/3 h-full relative z-20 flex items-center justify-center p-4">
          <SessionCreationCard />
        </div>

        <CardModal />
      </div>
    </CardProvider>
  );
}
