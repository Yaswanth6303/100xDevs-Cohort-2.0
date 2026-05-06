import React from "react";

export const RevenueCard = ({ title, amount, orderCount }) => {
  return (
    <div className="bg-white rounded pl-7 p-4 pt-5 border border-gray-200">
      <div className="text-gray-700 flex">
        <div className="text-gray-500">{title}</div>
        <div className="flex justify-center pt-1.5 pl-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
      </div>

      <div className="flex justify-between p-4">
        <div className="text-3xl font-bold font-sans -ml-4">₹ {amount}</div>
        {orderCount ? (
          <div className="flex cursor-pointer underline decoration-[#146EB4] font-medium flex-col justify-center">
            <div className="flex">
              <div className="text-[#146EB4]">{orderCount} order(s)</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6 text-blue-700"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m8.25 4.5 7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
