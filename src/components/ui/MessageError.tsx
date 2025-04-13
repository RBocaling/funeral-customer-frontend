/* eslint-disable react/prop-types */
import React from "react";

const MessageError = ({ message }:{message:string}) => {
  return (
    <div className="w-full p-4 rounded-xl border border-red-500/10 bg-[rgba(70,37,37,0.3)] text-sm text-red-500 tracking-wider">
      {message}
    </div>
  );
};

export default MessageError;
