import React from "react";

const SpinnerLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-6 w-6 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default SpinnerLoader;
