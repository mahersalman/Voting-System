import React from 'react';



export default function Results({results} : {results: any[]}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">
        Results
      </h3>
      <div className="flex flex-col gap-4">
        {results[0].map((candidate : string, index : number) => (
          <div
            key={index}
            className="p-4 bg-gray-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-transform transform hover:scale-105"
          >
            <div className="flex justify-between items-center gap-6">
              <span className="text-lg font-semibold text-gray-800">{candidate}</span>
              <span className="text-blue-600 font-bold">{results[1][index]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}