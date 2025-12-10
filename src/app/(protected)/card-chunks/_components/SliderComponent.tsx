"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import type { CreateSessionType, JoinedStudentType } from "@/lib/types";

import {
  InviteBtnDialog,
  JoinBtn,
} from "@/app/(protected)/main-page-session/_components";

import { FlippingCardDetail } from "./FlippingCardDetail";

type Card = CreateSessionType & { id: number };

export default function SliderComponent() {
  const [cardsSet1, setCardsSet1] = useState<Card[]>([]);

  const [cardsSet2, setCardsSet2] = useState<Card[]>([]);

  const [cardsSet3, setCardsSet3] = useState<Card[]>([]);

  const [expandedCard, setExpandedCard] = useState<Card | null>(null);

  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  useEffect(() => {
    const createCards = (startId: number, sessionType: string): Card[] => {
      return Array.from({ length: 8 }, (_, index) => ({
        id: startId + index,

        sessionTopicTitle: `${sessionType} ${index + 1}`,

        date: `Dec ${10 + index}, 2025`,

        time: `${10 + index}:00 AM`,

        status: index % 2 === 0 ? "ACCEPTED" : "WAITING",

        participantsLimit: 20,

        _id: `${startId + index}`,

        description: `Description for ${sessionType} ${index + 1}`,

        minMember: 1,

        maxMember: 20,

        value: 0,

        createdAt: new Date().toISOString(),
      })) as unknown as Card[];
    };

    setCardsSet1(createCards(1, "Created"));

    setCardsSet2(createCards(11, "Joined"));

    setCardsSet3(createCards(21, "Other"));

    const handleScroll = () => {
      const scrollPos = window.scrollY;

      const sliders = document.querySelectorAll(".slider");

      sliders.forEach((slider) => {
        const htmlSlider = slider as HTMLElement;

        const baseTransform =
          "translate3d(100, 0, 50) rotateX(20deg) rotateY(800deg) rotateZ(100deg)";

        const zOffset = scrollPos * 0.15;

        htmlSlider.style.transform = `${baseTransform} translateY(${zOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCardClick = (card: Card) => {
    setExpandedCard(card);
  };

  const renderSlider = (
    cards: Card[],

    sliderIndex: number,

    title: string,

    type: "created" | "joined" | "other"
  ) => (
    <div className="relative flex flex-col items-center">
      <h2 className="absolute top-0 left-1/2 transform -translate-x-1/2 z-15 text-white/95 text-2xl font-bold pointer-events-none mb-4">
        {title}
      </h2>
      <div
        className="slider relative pointer-events-auto select-none transform-3d transition-transform duration-3000 ease-[cubic-bezier(0.075,0.82,0.165,1)]"
        data-slider-index={sliderIndex}
      >
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`relative w-60 h-70 bg-linear-to-br from-slate-800/95 to-slate-900/95 border-2 border-white/25 rounded-xl overflow-hidden cursor-pointer

              transition-transform duration-500 ease-out transform-3d

              transform-[rotateX(20deg)_rotateY(-10deg)_rotateZ(-75deg)]

              hover:transform-[rotateX(20deg)_rotateY(-10deg)_rotateZ(-75deg)_scale(1.35)_translateX(-40px)]!

              ${index !== 0 ? "mt-[210px]" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            <div className="relative w-full h-full p-6 flex flex-col justify-between">
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="hover:bg-gray-600 hover:text-white rounded-full text-white text-xl"
                >
                  {card.sessionTopicTitle}
                </Button>

                {(type === "created" || type === "joined") && (
                  <span
                    className={`text-sm font-medium ${
                      card.status === "WAITING"
                        ? "text-orange-300"
                        : "text-green-400"
                    }`}
                  >
                    {card.status?.toLowerCase()}
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                {type === "other" && <JoinBtn session={card} />}
                <InviteBtnDialog />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 w-screen h-[800vh] bg-black -z-10" />
      <div className="fixed top-0 left-0 w-2/3 h-screen flex justify-evenly items-center pointer-events-none">
        {renderSlider(cardsSet1, 0, "Created", "created")}

        {renderSlider(cardsSet2, 1, "Joined", "joined")}

        {renderSlider(cardsSet3, 2, "Other", "other")}
      </div>

      {expandedCard && (
        <FlippingCardDetail
          session={expandedCard}
          sessionListType="created"
          joinedStudents={joinedStudents}
          onClose={() => setExpandedCard(null)}
        />
      )}
    </>
  );
}

// "use client";

// import { useState, useRef } from "react";

// export default function Page() {
//   const [flippedCard, setFlippedCard] = useState<number | null>(null);
//   const [cardOrigin, setCardOrigin] = useState<{ x: number; y: number } | null>(
//     null
//   );
//   const cardRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

//   const CARD_SPACING = {
//     horizontal: 40,
//     vertical: 60,
//   };

//   const handleCardClick = (cardId: number) => {
//     const cardElement = cardRefs.current[cardId];
//     if (cardElement) {
//       const rect = cardElement.getBoundingClientRect();
//       setCardOrigin({ x: rect.left, y: rect.top });
//     }
//     setFlippedCard(cardId);
//   };

//   const handleClose = () => {
//     setFlippedCard(null);
//     setTimeout(() => setCardOrigin(null), 700); // Clear after animation
//   };

//   const cards = [
//     {
//       id: 1,
//       title: "Card One",
//       description: "This is the first card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 2,
//       title: "Card Two",
//       description: "This is the second card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 3,
//       title: "Card Three",
//       description: "This is the third card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 4,
//       title: "Card Four",
//       description: "This is the fourth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 5,
//       title: "Card Five",
//       description: "This is the fifth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 6,
//       title: "Card Six",
//       description: "This is the sixth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 7,
//       title: "Card Seven",
//       description: "This is the seventh card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 8,
//       title: "Card Eight",
//       description: "This is the eighth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 9,
//       title: "Card Nine",
//       description: "This is the ninth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//     {
//       id: 10,
//       title: "Card Ten",
//       description: "This is the tenth card",
//       gradient: "from-blue-500 to-blue-700",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-8">
//       {flippedCard !== null && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
//           onClick={handleClose}
//         />
//       )}

//       <div
//         className="relative w-full max-w-md"
//         style={{
//           paddingTop: `${CARD_SPACING.vertical * (cards.length - 1) + 50}px`,
//         }}
//       >
//         <h1
//           className="absolute text-4xl font-bold text-foreground text-center z-0"
//           style={{
//             top: `${(cards.length - 2) * CARD_SPACING.vertical + 450}px`,
//             left: "0px",
//             right: "0px",
//           }}
//         >
//           Created Sessions
//         </h1>

//         {cards.map((card, index) => {
//           const offsetX = index * CARD_SPACING.horizontal;
//           const offsetY = (cards.length - 1 - index) * CARD_SPACING.vertical;
//           const zIndex = cards.length - index;
//           const isFlipped = flippedCard === card.id;

//           const centerX =
//             typeof window !== "undefined" ? window.innerWidth / 2 : 0;
//           const centerY =
//             typeof window !== "undefined" ? window.innerHeight / 2 : 0;

//           // Calculate the translation needed to move from original position to center
//           const translateX =
//             isFlipped && cardOrigin ? centerX - cardOrigin.x - 192 : offsetX;
//           const translateY =
//             isFlipped && cardOrigin ? centerY - cardOrigin.y - 192 : 0;

//           return (
//             <div
//               key={card.id}
//               ref={(el) => (cardRefs.current[card.id] = el)}
//               className="absolute left-0 right-0 transition-all duration-700"
//               style={{
//                 transform: `translateX(${translateX}px) translateY(${translateY}px)`,
//                 top: `${offsetY}px`,
//                 zIndex: isFlipped ? 50 : zIndex,
//               }}x
//               onClick={() => !isFlipped && handleCardClick(card.id)}
//             >
//               <div
//                 className="relative w-full h-96 transition-transform duration-700 [transform-style:preserve-3d]"
//                 style={{
//                   transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
//                 }}
//               >
//                 {/* Front of card */}
//                 <div
//                   className={`absolute inset-0 bg-gradient-to-br ${card.gradient} rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:scale-105 hover:-translate-y-8 cursor-pointer [backface-visibility:hidden] [transform-origin:center_center]`}
//                   style={{
//                     transform: isFlipped
//                       ? "rotateY(0deg)"
//                       : `rotateY(-20deg) rotateX(5deg)`,
//                   }}
//                 >
//                   <div>
//                     <h2 className="text-3xl font-bold text-white mb-2">
//                       {card.title}
//                     </h2>
//                     <p className="text-white/90">{card.description}</p>
//                   </div>
//                   <div className="text-white/80 text-sm">
//                     <p>Click to flip the card</p>
//                   </div>
//                 </div>

//                 {/* Back of card */}
//                 <div
//                   className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl overflow-hidden h-96 p-8 flex flex-col justify-between cursor-pointer [backface-visibility:hidden]"
//                   style={{
//                     transform: "rotateY(180deg)",
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleClose();
//                   }}
//                 >
//                   <div>
//                     <h2 className="text-3xl font-bold text-white mb-4">
//                       Session Details
//                     </h2>
//                     <div className="space-y-3 text-white/90">
//                       <p>
//                         <strong>Status:</strong> Active
//                       </p>
//                       <p>
//                         <strong>Participants:</strong> 12
//                       </p>
//                       <p>
//                         <strong>Duration:</strong> 45 minutes
//                       </p>
//                       <p>
//                         <strong>Type:</strong> Study Group
//                       </p>
//                     </div>
//                   </div>
//                   <div className="text-white/80 text-sm">
//                     <p>Click to flip back</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
