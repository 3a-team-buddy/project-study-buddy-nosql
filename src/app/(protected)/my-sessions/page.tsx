import { JoinedSessions } from "./_components/JoinedSession";
import { MoreSessions } from "./_components/MoreSession";
import { SessionDetails } from "./_components/SessionDetails";

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
