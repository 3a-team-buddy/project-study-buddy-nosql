import {
  AcademicCalendar,
  Attendance,
  IgLeaderBoard,
  SeasonalStatistic,
  TierMapRewards,
} from "./_components-main-page";
import { PagesLayout } from "./_components-main-page/PagesLayout";

const HomePage = () => {
  return (
    <PagesLayout>
      <div className="w-full h-screen bg-[#d4e1ef66] flex gap-6">
        <div className="w-[435px] h-fit flex flex-col gap-6">
          <SeasonalStatistic />
          <IgLeaderBoard />
        </div>
        <div className="w-[575px] h-fit flex flex-col gap-6">
          <Attendance />
          <TierMapRewards />
          <AcademicCalendar />
        </div>
      </div>
    </PagesLayout>
  );
};
export default HomePage;

// Bilguun 10:11 -> Decline -> 11:26
// Erka.    11:25
// Andy    11:21
// Bataa   11:20 -> Decline -> 11:26
