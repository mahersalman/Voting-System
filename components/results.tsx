import React from 'react';

export default function Results({ results, status }: { results: any[]; status: string }) {
  // Find the winner if the status is "finished"
  const winnerIndex = results[1].reduce((maxIndex: number, value: number, index: number, array: number[]) => (value > array[maxIndex] ? index : maxIndex), 0);
  const winner = results[0][winnerIndex];
  const winnerVotes = results[1][winnerIndex];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-blue-600 text-center mb-4">Results</h3>

      <div className="flex flex-col gap-4">
        {results[0].map((candidate: string, index: number) => (
          <div
            key={index}
            className={`p-4 rounded-lg border shadow-sm transition-transform transform hover:scale-105 ${
              index === winnerIndex && status === 'Finished'
                ? 'bg-yellow-100 border-yellow-500'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center gap-6">
              <span className="text-lg font-semibold text-gray-800">{candidate}</span>
              <span
                className={`font-bold ${
                  index === winnerIndex && status === 'Finished' ? 'text-yellow-600' : 'text-blue-600'
                }`}
              >
                {results[1][index]}
              </span>
            </div>
          </div>
        ))}
      </div>

      {status === 'Finished' && (
        <div className="mt-6 p-6 bg-yellow-100 rounded-lg border border-yellow-500 shadow-md">
          <h4 className="text-xl font-bold text-yellow-600 text-center">Winner</h4>
          <p className="text-center text-gray-800 mt-2">
            <span className="font-semibold">{winner}</span> with <span className="font-semibold">{winnerVotes}</span>{' '}
            votes.
          </p>
        </div>
      )}
    </div>
  );
}
