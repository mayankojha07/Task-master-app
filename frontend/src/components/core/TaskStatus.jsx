import React from "react";

const TaskStatus = ({ heading, number, Icon }) => {
  return (
    <>
      <div className="w-full md:w-[32%] rounded-lg p-4 md:p-6 bg-gradient-to-r from-blue-600 to-purple-500 flex justify-between items-center gap-4">
        <div>
          <p className="text-2xl font-semibold text-white/60">{heading}</p>
          <p className="text-xl text-white/80 text-left font-medium">
            {number}
          </p>
        </div>

        <Icon fontSize={40} className="text-white/70" />
      </div>
    </>
  );
};

export default TaskStatus;
