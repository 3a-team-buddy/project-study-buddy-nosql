// import React, { Dispatch, SetStateAction } from "react";
// import { SessionListGroup } from "../page";
// import { SessionCard } from "./SessionCard";
// import { useSession } from "@/app/_hooks/use-session";
// import { CreateSessionType } from "@/lib/types";
// import { Label } from "recharts";
// import { useCreatedSession } from "@/app/_hooks/use-created-session";

// type SessionTypeFilter = "created" | "joined" | "other";

// export const NoSession = ({
//   sessionList,
//   selectedType,
//   setSelectedType,
//   setSelectedSessionId,
// }: {
//   sessionList: SessionListGroup;
//   selectedType: SessionTypeFilter | undefined;
//   setSelectedType: Dispatch<SetStateAction<SessionTypeFilter | undefined>>;
//   setSelectedSessionId: Dispatch<SetStateAction<string>>;
// }) => {
//   const { allSessions } = useSession();
//   const handleSessionOnClick = (
//     sessionId: string,
//     type: "created" | "joined" | "other"
//   ) => {
//     setSelectedSessionId(sessionId);
//     setSelectedType(type);
//   };

//   return (
//     <div>
//       <div className="flex flex-col gap-3">
//         {!sessionList ? (
//           <div className="max-w-[480px] w-full h-full rounded-2xl px-8 py-6 bg-[#1b2e0e] shadow-xl text-white">
//             {" "}
//             <Label className="text-md text-center font-semibold pt-100">
//               no session{" "}
//             </Label>
//           </div>
//         ) : (
//           <div>
//             {sessionList.sessions?.map((session) => (
//               <div key={session._id}>
//                 <SessionCard
//                   selectedType={selectedType}
//                   session={session}
//                   handleSessionId={() =>
//                     handleSessionOnClick(
//                       session._id,
//                       sessionList.name === "Created Sessions"
//                         ? "created"
//                         : sessionList.name === "Joined Sessions"
//                         ? "joined"
//                         : "other"
//                     )
//                   }
//                 />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
