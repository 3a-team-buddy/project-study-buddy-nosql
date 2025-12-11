// import React from "react";
// import { Mic } from "lucide-react";

// type Props = {
//   onClick: () => void;
// };

// const VoiceFloatingButton: React.FC<Props> = ({ onClick }) => {
//   return (
//     <div className="w-screen h-screen absolute bottom-10 left-10">
//       <button
//         onClick={onClick}
//         className="
//         fixed bottom-6 right-6 z-50
//         bg-blue-600 hover:bg-blue-700
//         text-white p-4 rounded-full
//         shadow-xl transition-all
//       "
//       >
//         <Mic size={34} />
//       </button>
//     </div>
//   );
// };

// export default VoiceFloatingButton;

import { Mic } from "lucide-react";

export default function VoiceFloatingButton({ onClick }: any) {
  return (
    <div className="w-screen h-screen absolute bottom-10 left-10">
      <button
        onClick={() => {
          console.log("Mic button clicked!");
          onClick();
        }}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl"
      >
        <Mic size={24} />
      </button>
    </div>
  );
}
