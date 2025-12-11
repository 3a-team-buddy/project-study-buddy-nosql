"use client";
import { CreateSessionType, JoinedStudentType } from "@/lib/types";
import { ParticipantsList } from "../../main-page-session/_components";
import { useEffect, useState } from "react";

type FlippingCardDetailProps = {
  session: CreateSessionType;
  sessionListType: "created" | "joined" | "other" | undefined;
  joinedStudents: JoinedStudentType[];
  onClose: () => void;
};

export const FlippingCardDetail = ({
  session,
  sessionListType,
  joinedStudents,
  onClose,
}: FlippingCardDetailProps) => {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsFlipping(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen bg-black/85 backdrop-blur-[10px] flex items-center justify-center z-1000"
      onClick={onClose}
    >
      <div
        className="relative w-[600px] h-[600px] perspective-[2000px] cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative w-full h-full transform-3d transition-transform duration-800 ease-in-out ${
            isFlipping ? "transform-[rotateY(180deg)]" : ""
          }`}
        >
          {/* FRONT SIDE */}
          <div className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-linear-to-br from-slate-800/95 to-slate-900/95 border-2 border-white/25 p-12">
            <div className="w-full h-full flex flex-col justify-between">
              <h3 className="text-white text-4xl font-bold">
                {session.sessionTopicTitle}
              </h3>
              <p className="text-white/80">
                {session.value} - {session.time}
              </p>
              <div>{session.maxMember} participants</div>
            </div>
          </div>

          {/* BACK SIDE */}
          <div className="absolute w-full h-full backface-hidden transform-[rotateY(180deg)] bg-linear-to-br from-slate-800/98 to-blue-900/98 border-2 border-white/20 flex flex-col p-6 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-auto">
            <div className="flex flex-col gap-4">
              <h3 className="text-white text-2xl font-bold">
                {session.sessionTopicTitle}
              </h3>
              <p className="text-white/90">{session.description}</p>
              <ParticipantsList
                session={session}
                joinedStudents={joinedStudents}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-8">
//       <div className="relative w-full max-w-md" style={{ perspective: "1200px" }}>
//         {/* Card 2 - Back card - positioned behind with only title peeking */}
//         <div
//           className="absolute top-0 left-0 right-0 z-10 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-8"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateY(20deg)",
//           }}
//         >
//           <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">Card Two</h2>
//               <p className="text-purple-100">I'm partially hidden behind the first card</p>
//             </div>
//             <div className="text-white/80 text-sm">
//               <p>Hover over me to bring me forward</p>
//             </div>
//           </div>
//         </div>

//         {/* Card 1 - Front card */}
//         <div
//           className="relative z-20 mt-16 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-8"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateY(20deg)",
//           }}
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">Card One</h2>
//               <p className="text-blue-100">Hover over me to see the effect</p>
//             </div>
//             <div className="text-white/80 text-sm">
//               <p>This card will scale up and move upward on hover</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Page() {
//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-8">
//       <div className="relative w-full max-w-md" style={{ perspective: "1200px" }}>
//         {/* Card 2 - Back card - positioned behind with only title peeking */}
//         <div
//           className="absolute top-0 left-0 right-0 z-10 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-8"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateY(-20deg) translateX(20px)",
//           }}
//         >
//           <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">Card Two</h2>
//               <p className="text-purple-100">I'm partially hidden behind the first card</p>
//             </div>
//             <div className="text-white/80 text-sm">
//               <p>Hover over me to bring me forward</p>
//             </div>
//           </div>
//         </div>

//         {/* Card 1 - Front card */}
//         <div
//           className="relative z-20 mt-16 transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-8"
//           style={{
//             transformStyle: "preserve-3d",
//             transform: "rotateY(-20deg)", // mirrored rotation to the left side
//           }}
//         >
//           <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between">
//             <div>
//               <h2 className="text-3xl font-bold text-white mb-2">Card One</h2>
//               <p className="text-blue-100">Hover over me to see the effect</p>
//             </div>
//             <div className="text-white/80 text-sm">
//               <p>This card will scale up and move upward on hover</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
