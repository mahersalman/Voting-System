'use client';

import React from 'react';

interface Candidate {
  name: string;
  votes: number;
}

export default function VotingForm({ candidates }: { candidates: Candidate[] }) {
  return (
    <form
      className="bg-gray-50 p-6 rounded-lg shadow-lg mt-6 space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedCandidate = (form.elements.namedItem('candidate') as HTMLSelectElement).value;
        alert(`You voted for: ${selectedCandidate}`);
      }}
    >
      <label htmlFor="candidate" className="block text-lg font-bold text-gray-700">
        <h3 className="text-xl font-semibold">Select Candidate:</h3>
      </label>
      <select
        id="candidate"
        name="candidate"
        className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        required
      >
        {candidates.map((candidate, index) => (
          <option key={index} value={candidate.name}>
            {candidate.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="w-full max-w-sm px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105 mx-auto"
      >
        Submit Vote
      </button>
    </form>
  );
}