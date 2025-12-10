import { Main } from "../components/Main";

const TutorAcceptedPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <Main
        title="Thank You!"
        description="You accepted the session."
        footerText="We notified the students 🎄"
      />
    </div>
  );
};
export default TutorAcceptedPage;
