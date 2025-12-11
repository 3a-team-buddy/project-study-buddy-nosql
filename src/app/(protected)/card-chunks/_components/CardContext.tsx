"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SessionCardData, JoinedStudentType1 } from "@/lib/types";

interface CardContextType {
  selectedCard: SessionCardData | null;
  setSelectedCard: (card: SessionCardData | null) => void;
  cards: SessionCardData[];
  selectedChunk: string | null;
  setSelectedChunk: (chunk: string | null) => void;
  joinedStudents: JoinedStudentType1[];
  setJoinedStudents: (students: JoinedStudentType1[]) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<SessionCardData | null>(
    null
  );
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);

  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType1[]>(
    []
  );

  const cards: SessionCardData[] = [
    // your big data unchanged...
  ];

  return (
    <CardContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        cards,
        selectedChunk,
        setSelectedChunk,
        joinedStudents,
        setJoinedStudents,
      }}
    >
      {children}
    </CardContext.Provider>
  );
}

export function useCard() {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCard must be used within a CardProvider");
  return context;
}
