// LoadingDots.js
import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex space-x-2">
      <div className="bg-orange-600 w-3 h-3 rounded-full opacity-50 animate-loading-dot-1"></div>
      <div className="bg-orange-600 w-3 h-3 rounded-full opacity-50 animate-loading-dot-2"></div>
      <div className="bg-orange-600 w-3 h-3 rounded-full opacity-50 animate-loading-dot-3"></div>
      <div className="bg-orange-600 w-3 h-3 rounded-full opacity-50 animate-loading-dot-4"></div>
    </div>
  );
};

export default LoadingDots;
