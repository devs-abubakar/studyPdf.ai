import React from "react";

const ScrollToBottom = ({ onClick }) => {
  return (
    <div className="mb-2 w-full flex justify-center">
      <button
        onClick={onClick}
        className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-lg hover:scale-105 transition"
      >
        ↓
      </button>
    </div>
  );
};

export default ScrollToBottom;