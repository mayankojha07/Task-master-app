import React from "react";

const Notification = ({ data }) => {
  const { message, title } = data;

  return (
    <>
      <div
        className={`w-80 bg-white p-2 md:p-4 rounded-lg shadow-lg flex justify-between items-center max-w-md border-l-4 border-purple-600`}
      >
        <div className="flex flex-col justify-between w-full">
          <div className="text-xl font-semibold text-gray-900">{title}</div>
          <div className=" text-gray-600 text-base">{message}</div>
        </div>
      </div>
    </>
  );
};

export default Notification;
