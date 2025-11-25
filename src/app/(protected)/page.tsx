import {
  AcademicCalendar,
  Attendance,
  IgLeaderBoard,
  SeasonalStatistic,
  TierMapRewards,
} from "../_components-main-page";

const HomePage = () => {
  return (
    <div className="w-full h-screen flex gap-6">
      <div className="max-w-[435px] w-full h-full flex flex-col gap-6">
        <SeasonalStatistic />
        <IgLeaderBoard />
      </div>
      <div className="w-full flex flex-col gap-6">
        <Attendance />
        <TierMapRewards />
        <AcademicCalendar />
      </div>
    </div>
  );
};
export default HomePage;

// Bilguun 10:11 -> Decline -> 11:26
// Erka.    11:25
// Andy    11:21
// Bataa   11:20 -> Decline -> 11:26
