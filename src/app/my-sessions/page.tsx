import {
  JoinedSessions,
  MoreSessions,
  SessionDetails,
} from "@/app/my-sessions/_components/Index";

const MySessionPage = () => {
  return (
    <div className="min-h-screen w-full flex gap-8 px-10 py-10">
      {/* Left side session lists */}
      <div className="flex-1">
        <JoinedSessions />
        <MoreSessions />
      </div>

      {/* Right panel */}
      <SessionDetails />
    </div>
  );
};
export default MySessionPage;
