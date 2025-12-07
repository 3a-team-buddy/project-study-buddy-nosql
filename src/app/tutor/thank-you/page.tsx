import React from "react";

const TutorThankYouPage = () => {
  return (
    <div className="flex flex-col items-center text-white gap-2">
      <div className="text-3xl font-semibold">Thanks for responding!</div>
      <div className="text-2xl font-bold">You declined the session</div>
      <div className="text-lg">We notified the session creator</div>
    </div>
  );
};
export default TutorThankYouPage;
