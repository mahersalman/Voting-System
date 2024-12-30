import React from 'react';



export default function Results({candidates} : {candidates: string[]}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">
        Results
      </h3>
      <div className="flex flex-col gap-4">
        {candidates.map((candidate, index) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">{candidate}</span>
              <span className="text-blue-600 font-bold">100 Votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}