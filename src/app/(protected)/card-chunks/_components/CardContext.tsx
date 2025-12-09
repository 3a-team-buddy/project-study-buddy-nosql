"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { SessionCardData, JoinedStudentType } from "@/lib/types";

interface CardContextType {
  selectedCard: SessionCardData | null;
  setSelectedCard: (card: SessionCardData | null) => void;
  cards: SessionCardData[];
  selectedChunk: string | null;
  setSelectedChunk: (chunk: string | null) => void;
  joinedStudents: JoinedStudentType[];
  setJoinedStudents: (students: JoinedStudentType[]) => void;
}

const CardContext = createContext<CardContextType | undefined>(undefined);

export function CardProvider({ children }: { children: ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<SessionCardData | null>(
    null
  );
  const [selectedChunk, setSelectedChunk] = useState<string | null>(null);
  const [joinedStudents, setJoinedStudents] = useState<JoinedStudentType[]>([]);

  const cards: SessionCardData[] = [
    // Created Sessions
    {
      id: "1",
      _id: "1",
      sessionTopicTitle: "Advanced React Patterns",
      description:
        "Deep dive into advanced React patterns including compound components, render props, and hooks.",
      value: "2024-01-15",
      time: "10:00 AM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 8,
      category: "Created Sessions",
      assignedTutor: {
        name: "Dr. Sarah Johnson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "2",
      _id: "2",
      sessionTopicTitle: "TypeScript Best Practices",
      description:
        "Learn industry-standard TypeScript patterns and type safety techniques.",
      value: "2024-01-16",
      time: "2:00 PM",
      selectedSessionType: "One-on-One",
      status: "ACCEPTED",
      studentCount: ["s1"],
      maxMember: 1,
      category: "Created Sessions",
    },
    {
      id: "3",
      _id: "3",
      sessionTopicTitle: "Node.js Backend Development",
      description:
        "Build scalable backend applications with Node.js and Express.",
      value: "2024-01-17",
      time: "11:00 AM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2"],
      maxMember: 6,
      category: "Created Sessions",
    },
    {
      id: "4",
      _id: "4",
      sessionTopicTitle: "Database Design Fundamentals",
      description: "Master database design principles and SQL optimization.",
      value: "2024-01-18",
      time: "3:00 PM",
      selectedSessionType: "Group",
      status: "ACCEPTED",
      studentCount: ["s1", "s2", "s3", "s4"],
      maxMember: 10,
      category: "Created Sessions",
      assignedTutor: {
        name: "Prof. Michael Chen",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "5",
      _id: "5",
      sessionTopicTitle: "UI/UX Design Principles",
      description: "Create beautiful and intuitive user interfaces.",
      value: "2024-01-19",
      time: "1:00 PM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 8,
      category: "Created Sessions",
    },
    {
      id: "6",
      _id: "6",
      sessionTopicTitle: "API Development with REST",
      description: "Build robust RESTful APIs following industry standards.",
      value: "2024-01-20",
      time: "9:00 AM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2"],
      maxMember: 5,
      category: "Created Sessions",
    },

    // Joined Sessions
    {
      id: "7",
      _id: "7",
      sessionTopicTitle: "Machine Learning Basics",
      description: "Introduction to ML algorithms and practical applications.",
      value: "2024-01-21",
      time: "10:00 AM",
      selectedSessionType: "Group",
      status: "ACCEPTED",
      studentCount: ["s1", "s2", "s3", "s4", "s5"],
      maxMember: 12,
      category: "Joined Sessions",
      assignedTutor: {
        name: "Dr. Emily Watson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "8",
      _id: "8",
      sessionTopicTitle: "Docker & Containerization",
      description: "Master Docker and container orchestration with Kubernetes.",
      value: "2024-01-22",
      time: "2:00 PM",
      selectedSessionType: "Group",
      status: "ACCEPTED",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 8,
      category: "Joined Sessions",
    },
    {
      id: "9",
      _id: "9",
      sessionTopicTitle: "GraphQL Essentials",
      description: "Build modern APIs with GraphQL and Apollo.",
      value: "2024-01-23",
      time: "11:00 AM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2", "s3", "s4"],
      maxMember: 10,
      category: "Joined Sessions",
      assignedTutor: {
        name: "Alex Martinez",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "10",
      _id: "10",
      sessionTopicTitle: "AWS Cloud Services",
      description: "Deploy and manage applications on AWS cloud platform.",
      value: "2024-01-24",
      time: "3:00 PM",
      selectedSessionType: "Group",
      status: "ACCEPTED",
      studentCount: ["s1", "s2", "s3", "s4", "s5", "s6"],
      maxMember: 15,
      category: "Joined Sessions",
    },
    {
      id: "11",
      _id: "11",
      sessionTopicTitle: "Testing Strategies",
      description: "Learn unit testing, integration testing, and E2E testing.",
      value: "2024-01-25",
      time: "1:00 PM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2"],
      maxMember: 6,
      category: "Joined Sessions",
    },
    {
      id: "12",
      _id: "12",
      sessionTopicTitle: "Web Security Fundamentals",
      description: "Protect your applications from common security threats.",
      value: "2024-01-26",
      time: "10:00 AM",
      selectedSessionType: "Group",
      status: "ACCEPTED",
      studentCount: ["s1", "s2", "s3", "s4"],
      maxMember: 10,
      category: "Joined Sessions",
      assignedTutor: {
        name: "James Wilson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "13",
      _id: "13",
      sessionTopicTitle: "React Native Mobile Dev",
      description: "Build cross-platform mobile apps with React Native.",
      value: "2024-01-27",
      time: "2:00 PM",
      selectedSessionType: "Group",
      status: "WAITING",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 8,
      category: "Joined Sessions",
    },

    // More Sessions to join
    {
      id: "14",
      _id: "14",
      sessionTopicTitle: "Python for Data Science",
      description: "Analyze and visualize data using Python libraries.",
      value: "2024-01-28",
      time: "11:00 AM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2", "s3", "s4"],
      maxMember: 12,
      category: "More Sessions",
      assignedTutor: {
        name: "Dr. Lisa Anderson",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "15",
      _id: "15",
      sessionTopicTitle: "Vue.js Framework",
      description: "Build reactive web applications with Vue.js 3.",
      value: "2024-01-29",
      time: "3:00 PM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2"],
      maxMember: 8,
      category: "More Sessions",
    },
    {
      id: "16",
      _id: "16",
      sessionTopicTitle: "Git & Version Control",
      description: "Master Git workflows and collaboration strategies.",
      value: "2024-01-30",
      time: "10:00 AM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 10,
      category: "More Sessions",
    },
    {
      id: "17",
      _id: "17",
      sessionTopicTitle: "Microservices Architecture",
      description: "Design and implement microservices-based systems.",
      value: "2024-01-31",
      time: "2:00 PM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2", "s3", "s4", "s5"],
      maxMember: 15,
      category: "More Sessions",
      assignedTutor: {
        name: "Robert Taylor",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
    {
      id: "18",
      _id: "18",
      sessionTopicTitle: "MongoDB & NoSQL",
      description: "Work with document databases and NoSQL concepts.",
      value: "2024-02-01",
      time: "11:00 AM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2", "s3"],
      maxMember: 8,
      category: "More Sessions",
    },
    {
      id: "19",
      _id: "19",
      sessionTopicTitle: "CI/CD Pipelines",
      description:
        "Automate deployment with continuous integration and delivery.",
      value: "2024-02-02",
      time: "1:00 PM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2"],
      maxMember: 6,
      category: "More Sessions",
    },
    {
      id: "20",
      _id: "20",
      sessionTopicTitle: "Progressive Web Apps",
      description: "Build offline-capable web applications with PWA features.",
      value: "2024-02-03",
      time: "3:00 PM",
      selectedSessionType: "Group",
      studentCount: ["s1", "s2", "s3", "s4"],
      maxMember: 10,
      category: "More Sessions",
      assignedTutor: {
        name: "Jessica Brown",
        image: "/placeholder.svg?height=40&width=40",
      },
    },
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
  if (context === undefined) {
    throw new Error("useCard must be used within a CardProvider");
  }
  return context;
}
