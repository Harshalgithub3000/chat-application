import React from "react";

const Loader = ({alert}) => { 
  return (
    <div className="flex items-center justify-center h-screen gap-2  w-full">
      <div className="relative w-14 h-14">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute left-1/2 top-[30%] w-[8%] h-[24%] bg-gray-500 opacity-0 rounded-full shadow-md animate-fade"
            style={{
              transform: `rotate(${i * 30}deg) translate(0, -130%)`,
              animationDelay: `-${(1.2 - i * 0.1).toFixed(1)}s`,
            }}
          >.</div>
        ))}
        
      </div>
      <div className="font-bold text-xl text-gray-700 animate-pulse">{alert}</div> 
         </div>
  );
};

export default Loader