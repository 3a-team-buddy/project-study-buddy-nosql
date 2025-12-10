"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Users,
  Star,
  Edit,
  Trash2,
  LogOut,
  UserPlus,
} from "lucide-react";
import type { JoinedStudentType, JoinedStudentType1 } from "@/lib/types";
import { useCard } from "./CardContext";

export default function CardModal() {
  const { selectedCard, setSelectedCard, joinedStudents, setJoinedStudents } =
    useCard();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedCard) {
      fetchJoinedStudents();
    }
  }, [selectedCard]);

  const fetchJoinedStudents = async () => {
    setIsLoading(true);
    // Mock data for demonstration - replace with actual API call
    const mockStudents: JoinedStudentType1[] = [
      {
        _id: "1",
        studentId: {
          mockUserName: "John Doe",
          mockUserImage: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        _id: "2",
        studentId: {
          mockUserName: "Jane Smith",
          mockUserImage: "/placeholder.svg?height=40&width=40",
        },
      },
      {
        _id: "3",
        studentId: {
          mockUserName: "Mike Johnson",
          mockUserImage: "/placeholder.svg?height=40&width=40",
        },
      },
    ];

    setTimeout(() => {
      setJoinedStudents(mockStudents);
      setIsLoading(false);
    }, 500);
  };

  if (!selectedCard) return null;

  const handleClose = () => {
    setSelectedCard(null);
    setJoinedStudents([]);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleEdit = () => {
    console.log("[v0] Edit session:", selectedCard._id);
  };

  const handleDelete = () => {
    console.log("[v0] Delete session:", selectedCard._id);
  };

  const handleLeave = () => {
    console.log("[v0] Leave session:", selectedCard._id);
  };

  const handleJoin = () => {
    console.log("[v0] Join session:", selectedCard._id);
  };

  const handleInvite = () => {
    console.log("[v0] Invite to session:", selectedCard._id);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
        >
          <X className="w-8 h-8" />
        </button>

        <div className="bg-linear-to-b from-[#061e20]/95 to-[#0a2426]/95 rounded-2xl p-6 backdrop-blur-sm border border-white/10">
          {/* Title and Description */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-white mb-3">
              {selectedCard.sessionTopicTitle}
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              {selectedCard.description}
            </p>
          </div>

          {/* Separator */}
          <div className="h-px bg-gray-800 mb-6" />

          {/* Session Details */}
          <div className="mb-6">
            <h3 className="text-base font-semibold text-white mb-3">
              Session Details
            </h3>
            <div className="space-y-2 text-sm text-white/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  Date:{" "}
                  <span className="font-semibold text-purple-300">
                    {selectedCard.value}
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>
                  Start time:{" "}
                  <span className="font-semibold text-purple-300">
                    {selectedCard.time}
                  </span>{" "}
                  (1 hour)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>
                  Session type:{" "}
                  <span className="text-purple-300 font-semibold">
                    {selectedCard.selectedSessionType}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Assigned Tutor (if exists) */}
          {selectedCard.assignedTutor && (
            <>
              <div className="h-px bg-gray-800 mb-6" />
              <div className="mb-6">
                <h3 className="text-base font-semibold text-white mb-3">
                  Assigned Tutor
                </h3>
                <div className="flex items-center gap-3 bg-black/20 p-3 rounded-lg">
                  <img
                    src={selectedCard.assignedTutor.image || "/placeholder.svg"}
                    alt={selectedCard.assignedTutor.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-white">
                    {selectedCard.assignedTutor.name}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Separator */}
          <div className="h-px bg-gray-800 mb-6" />

          {/* Participants */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-base font-semibold text-white">
                Participants
              </h3>
              <button className="rounded-full font-semibold text-sm px-3 py-1 text-[#2563EB] bg-black/20 border border-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-colors">
                {selectedCard.studentCount?.length || 0} /{" "}
                {selectedCard.maxMember}
              </button>
            </div>

            {isLoading ? (
              <div className="text-sm text-white/60">
                Loading participants...
              </div>
            ) : (
              <div className="flex flex-col gap-2 text-sm text-white/60">
                {joinedStudents.map((student, i) => (
                  <div key={student._id} className="flex gap-2 items-center">
                    <img
                      src={
                        student.studentId.mockUserImage || "/placeholder.svg"
                      }
                      alt={student.studentId.mockUserName}
                      className="w-6 h-6 rounded-full bg-slate-900"
                    />
                    <span>{student.studentId.mockUserName}</span>
                    {i === 0 && (
                      <div className="flex gap-0.5 text-xs items-center text-amber-200">
                        <Star
                          size={11}
                          className="text-amber-200 fill-amber-200"
                        />
                        Creator
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons based on category */}
          {selectedCard.category === "Created Sessions" ? (
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex-1 bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Session
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          ) : selectedCard.category === "Joined Sessions" ? (
            <button
              onClick={handleLeave}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Leave Session
            </button>
          ) : (
            <button
              onClick={handleJoin}
              className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Join Session
            </button>
          )}

          {/* Invite Button (always shown) */}
          <button
            onClick={handleInvite}
            className="w-full mt-2 bg-black/20 hover:bg-black/30 text-white font-medium py-2.5 px-4 rounded-lg transition-colors border border-white/10"
          >
            Invite to Session
          </button>
        </div>
      </div>
    </div>
  );
}
