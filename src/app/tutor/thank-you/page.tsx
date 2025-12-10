import { Main } from "../components/Main";
const TutorThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <Main
        title="Thanks for responding!"
        description="You declined the session"
        footerText="We notifiedn the session creator 🎄"
      />
    </div>
  );
};
export default TutorThankYouPage;
