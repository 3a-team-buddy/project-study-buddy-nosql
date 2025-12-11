// import React, { useState, useRef } from "react";

// type Props = {
//   onSearch: (query: string) => void;
// };

// const VoiceSearch: React.FC<Props> = ({ onSearch }) => {
//   const [text, setText] = useState("");
//   const recognitionRef = useRef<any>(null);

//   const startListening = () => {
//     const SpeechRecognition =
//       (window as any).SpeechRecognition ||
//       (window as any).webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       alert("Your browser does not support voice recognition.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-US"; // ✔ ENGLISH VOICE DETECTION
//     recognition.continuous = false;
//     recognition.interimResults = false;

//     recognition.onresult = (event: any) => {
//       const spokenText = event.results[0][0].transcript;
//       setText(spokenText);
//       onSearch(spokenText);
//     };

//     recognition.onerror = (event: any) => {
//       console.error("Speech recognition error:", event);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   return (
//     <div className="w-full flex flex-col items-center gap-3 p-4 bg-white shadow rounded">
//       <button
//         onClick={startListening}
//         className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
//       >
//         🎤 Speak to Search
//       </button>

//       <div className="text-gray-700 text-sm">
//         {text ? `You said: "${text}"` : "Click the mic and start speaking"}
//       </div>
//     </div>
//   );
// };

// export default VoiceSearch;
