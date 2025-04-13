import React from 'react'

const BookingStatus = ({steps}:{steps:any}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0 mb-5">
      {steps.map((step:any, index:number) => (
        <div
          key={index}
          className="relative flex-1 flex flex-col items-center text-center"
        >
          {index !== 0 && (
            <div className="absolute -left-1/2 top-4 hidden sm:block w-full h-0.5 bg-gray-700 z-0" />
          )}

          <div
            className={`relative z-10 flex items-center justify-center w-9 h-9 rounded-full border-2 ${
              step.status === "completed"
                ? "bg-sky-500  border-sky-500 shadow-2xl shadow-sky-500 text-black"
                : step.status === "active"
                ? "bg-white border-white text-black animate-pulse"
                : "bg-transparent border-gray-600 text-gray-400"
            }`}
          >
            {step.icon}
          </div>

          <div className="mt-3">
            <h4 className="text-sm font-semibold text-white">{step.title}</h4>
            <p className="text-xs text-gray-400">{step.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookingStatus
