import { useSession } from "@/app/_hooks/use-session";
import { Button, Separator, Skeleton } from "@/components/ui";
import { CreateSessionType } from "@/lib/types";
import React, { useState } from "react";
import { FiCalendar, FiUser } from "react-icons/fi";
import { GoComment } from "react-icons/go";

import { MdClass } from "react-icons/md";

const SessionHistoryDetails = ({
  allSessions,
}: {
  allSessions: CreateSessionType[];
}) => {
  const [openSessionReview, setOpenSessionReview] = useState<string | null>(
    null
  );
  const { isLoading } = useSession();
  //   const [open, setOpen] = useState<boolean>(false);

  const handleReviewDetail = (sessionId: string) => {
    // setOpen((prev) => !prev);

    setOpenSessionReview((review) => (review === sessionId ? null : sessionId));
  };

  return (
    <div className="flex flex-col gap-7">
      <div className="text-2xl leading-7 font-semibold text-white">
        Өмнөх давтлагууд
      </div>
      <Separator className="bg-gray-800" />

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="max-w-232 h-9 rounded-xl opacity-10" />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {allSessions
            ?.filter((s) => s.isRated && s.status === "COMPLETED")
            .map((session) => {
              const isOpen = openSessionReview === session._id;

              return (
                <div className="flex flex-col" key={session._id}>
                  <Button
                    onClick={() => handleReviewDetail(session._id)}
                    className="justify-start cursor-pointer flex-1  items-start bg-linear-to-b from-[#171d36] to-[#0f1927]"
                  >
                    {session?.sessionTopicTitle}
                  </Button>
                  {isOpen && (
                    <div className="flex flex-col gap-3 mt-1 px-10 py-5 bg-linear-to-b from-[#161b30] to-[#23549e] rounded-xl text-sm">
                      <p className="flex items-center gap-2 ">
                        <FiCalendar />
                        Он сар өдөр цаг:
                        <span className="font-normal text-purple-300 hover:text-purple-200">
                          {session.value} {session.time}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <MdClass />
                        Давтлага үнэлгээ:
                        <span className="font-normal text-purple-300 hover:text-purple-200">
                          {session?.rating?.selectedSessionRating ===
                            "EXCELLENT" && <span>Сэтгэл хангалуун</span>}
                          {session?.rating?.selectedSessionRating ===
                            "GOOD" && <span>Таалагдсан</span>}
                          {session?.rating?.selectedSessionRating ===
                            "NORMAL" && <span>Сайн</span>}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <FiUser />
                        Ментор үнэлгээ:
                        <span className="font-normal text-purple-300 hover:text-purple-200">
                          {session?.rating?.selectedTutorRating ===
                            "EXCELLENT" && <span>Сэтгэл хангалуун</span>}
                          {session?.rating?.selectedTutorRating === "GOOD" && (
                            <span>Таалагдсан</span>
                          )}
                          {session?.rating?.selectedTutorRating ===
                            "NORMAL" && <span>Сайн</span>}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 ">
                        <GoComment />
                        Давтлагын сэтгэгдэл:
                        <span className="font-normal text-purple-300 hover:text-purple-200">
                          {session?.rating?.feedback}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SessionHistoryDetails;
