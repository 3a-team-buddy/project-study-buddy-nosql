import { Main } from "@/app/tutor/_components/Main";

const CanceledPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#F1F4F6] via-[#E8EBEF] to-[#F1F4F6] p-4">
      <Main
        title="Your session has been canceled."
        footerText="We've notified the students 🎄"
      />
    </div>
  );
};
export default CanceledPage;
