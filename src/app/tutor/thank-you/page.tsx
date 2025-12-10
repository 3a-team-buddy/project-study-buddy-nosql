import { Main } from "../_components/Main";

const TutorThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <Main
        title="Thanks for responding!"
        description="Your response was received successfully."
        footerText="The session creator has been notified 🎄"
      />
    </div>
  );
};
export default TutorThankYouPage;
