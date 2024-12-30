'use client';

import React from 'react';



export default function VotingForm({ candidates }: { candidates: string[]}) {
  return (
    <form
      className="bg-gray-50 p-6 rounded-lg shadow-lg mt-6 space-y-6 flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedCandidate = (form.elements.namedItem('candidate') as HTMLSelectElement).value;
        alert(`You voted for: ${selectedCandidate}`);
      }}
    >
      <label htmlFor="candidate" className="block text-lg font-bold text-gray-700 text-center">
        <h3 className="text-xl font-semibold">Select Candidate:</h3>
      </label>
      <select
        id="candidate"
        name="candidate"
        className="w-1/2 max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-center"
        required
      >
        {candidates.map((candidate, index) => (
          <option key={index} value={candidate}>
            {candidate}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-1/2 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
      >
        Submit Vote
      </button>
    </form>
  );
}