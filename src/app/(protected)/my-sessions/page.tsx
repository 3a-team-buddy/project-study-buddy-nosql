import { JoinedSessions } from "./_components/JoinedSessions";
import { MoreSessions } from "./_components/MoreSessions";
import { SessionDetails } from "./_components/SessionDetails";

const MySessionPage = () => {
  return (
    <div className="w-full min-h-screen flex gap-8 px-10 py-10">
      {/* Left side session lists */}
      <div className="flex-1">
        <div className="flex flex-col gap-10">
          <JoinedSessions />
          <MoreSessions />
        </div>
      </div>

      {/* Right panel */}
      <SessionDetails />
    </div>
  );
};
export default MySessionPage;
