import React from "react";

const Activity = () => {
  const activity = [
    "Mohammad followed P&G Inc.",
    " Mohammad joined Helsinki’s Innovation Lab team as Consultant.",
    "Mohammad won the prize for P&G’s “Solutions for elongating food expiration dates for dairy products” challenge.",
  ];
  return (
    <div className="flex flex-col w-full md:px-10">
      {activity?.map((activity, index) => (
        <div
          key={index}
          className="border-l-4 border-brown relative py-3 px-4  max-w-60 "
        >
          <div className="h-3 w-3 bg-brown rounded-full absolute -left-2 top-0" />
          <p className="p-2 shadow bg-white rounded w-fit text-xs">
            {activity}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Activity;
