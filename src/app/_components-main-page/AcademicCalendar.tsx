import React from "react";

export const AcademicCalendar = () => {
  return (
    <div className="p-6 relative h-[210px]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-primary-foreground">Академик Календар</p>
        <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 text-primary-foreground rounded-full py-2 px-6 -mr-3 hover:bg-[#FFFFFF14] hover:text-primary-foreground">
          View all
        </button>
      </div>
      <div className="h-1 w-full bg-secondary mt-16">
        <div
          className="h-1 bg-green-600"
          data-testid="progress-bar"
          style={{ width: "30%" }}
        ></div>
      </div>
      <div className="absolute bottom-4 flex justify-between w-[93%]">
        <div className="flex flex-col items-center w-[70px]">
          <p className="pb-3 text-xs text-primary-foreground">06.09</p>
          <div className="bg-[#18BA51] border-2 border-white w-9 h-9 flex items-center justify-center rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-flag-triangle-right "
            >
              <path d="M7 22V2l10 5-10 5"></path>
            </svg>
          </div>
          <div className="h-8 w-1 border border-dashed border-black"></div>
          <p className="text-[10px] text-primary-foreground">Хичээл эхлэх</p>
        </div>
        <div className="w-[60%] flex justify-end">
          <div className="flex flex-col items-center w-20">
            <p className="pb-3 text-xs text-primary-foreground">12.22</p>
            <div className="bg-[#18BA51] border-2 border-white w-9 h-9 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
              >
                <path
                  d="M14.5 9.25H16.25"
                  stroke="#FAFAFA"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M14.5 12.75H16.25"
                  stroke="#FAFAFA"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M5.89844 13.6255C6.07881 13.1127 6.4139 12.6686 6.85745 12.3545C7.30101 12.0403 7.83115 11.8716 8.37469 11.8716C8.91823 11.8716 9.44837 12.0403 9.89192 12.3545C10.3355 12.6686 10.6706 13.1127 10.8509 13.6255"
                  stroke="#FAFAFA"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M8.375 11.875C9.3415 11.875 10.125 11.0915 10.125 10.125C10.125 9.1585 9.3415 8.375 8.375 8.375C7.4085 8.375 6.625 9.1585 6.625 10.125C6.625 11.0915 7.4085 11.875 8.375 11.875Z"
                  stroke="#FAFAFA"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M18 4.875H4C3.0335 4.875 2.25 5.6585 2.25 6.625V15.375C2.25 16.3415 3.0335 17.125 4 17.125H18C18.9665 17.125 19.75 16.3415 19.75 15.375V6.625C19.75 5.6585 18.9665 4.875 18 4.875Z"
                  stroke="#FAFAFA"
                  stroke-width="1.3125"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <div className="h-8 w-1 border border-dashed border-black"></div>
            <p className="text-[10px] text-primary-foreground">Дадлага эхлэх</p>
          </div>
        </div>
        <div className="flex flex-col items-center w-20">
          <p className="pb-3 text-xs text-primary-foreground">02.20</p>
          <div className="flex items-center justify-center rounded-full w-9 h-9">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7719 31.2466C17.057 32.2511 14.9442 32.2511 13.2293 31.2466L4.37187 26.0582C2.65699 25.0537 1.60059 23.1973 1.60059 21.1883V10.8116C1.60059 8.80261 2.65699 6.9462 4.37187 5.94169L13.2293 0.753351C14.9442 -0.251157 17.057 -0.251158 18.7719 0.75335L27.6293 5.94169C29.3442 6.9462 30.4006 8.80261 30.4006 10.8116V21.1883C30.4006 23.1973 29.3442 25.0537 27.6293 26.0582L18.7719 31.2466Z"
                fill="#18181B"
              ></path>
              <path
                d="M18.2022 30.2741C16.8391 31.0725 15.162 31.0725 13.799 30.2741L4.94152 25.0857C3.57652 24.2862 2.72764 22.8026 2.72764 21.1883V10.8116C2.72764 9.19736 3.57652 7.71376 4.94152 6.91419L13.799 1.72585C15.162 0.927417 16.8391 0.927417 18.2022 1.72585L27.0597 6.91419C28.4247 7.71376 29.2735 9.19736 29.2735 10.8116V21.1883C29.2735 22.8026 28.4247 24.2862 27.0596 25.0857L18.2022 30.2741Z"
                stroke="black"
                stroke-opacity="0.2"
                stroke-width="2.25411"
              ></path>
              <path
                d="M11.7327 11.6861L10.0865 14.7674C9.88102 15.153 9.77808 15.5762 9.77808 16C9.77808 16.4239 9.88102 16.847 10.0865 17.2327L11.7327 20.314C12.0361 20.8831 12.6295 21.2386 13.2752 21.2386H15.0238V20.3657H15.0233C14.7007 20.3657 14.404 20.1882 14.2522 19.9037L12.6066 16.8218C12.4691 16.5649 12.4006 16.2828 12.4006 16C12.4006 15.7172 12.4691 15.4351 12.6066 15.1783L14.2522 12.0964C14.404 11.8118 14.7007 11.6344 15.0233 11.6344H15.0238V10.7614H13.2752C12.6295 10.7614 12.0361 11.117 11.7327 11.6861Z"
                fill="white"
              ></path>
              <path
                d="M21.9142 14.7674L20.2681 11.6861C19.9646 11.1169 19.3712 10.7615 18.7255 10.7615H16.9768V11.6343H16.9775C17.3001 11.6343 17.5968 11.8118 17.7484 12.0964L19.394 15.1782C19.5316 15.4351 19.6 15.7173 19.6 16C19.6 16.2828 19.5316 16.5649 19.394 16.8218L17.7484 19.9036C17.5968 20.1882 17.3001 20.3657 16.9775 20.3657H16.9768V21.2386H18.7255C19.3712 21.2386 19.9646 20.8831 20.2681 20.3139L21.9142 17.2327C22.1196 16.847 22.2226 16.4238 22.2226 16C22.2226 15.5762 22.1196 15.153 21.9142 14.7674Z"
                fill="white"
              ></path>
            </svg>
          </div>
          <div className="h-8 w-1 border border-dashed border-black"></div>
          <p className="text-[10px] text-primary-foreground">Хичээл дуусах</p>
        </div>
      </div>
    </div>
  );
};
