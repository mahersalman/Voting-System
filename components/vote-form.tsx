'use client';

import { useAccount, useWriteContract } from 'wagmi';
import React, { useState } from 'react';
import { ballotAPI } from '../scripts/contractApi';

export default function VotingForm({ candidates, contractAddress }: { candidates: string[]; contractAddress: string }) {
  const { isConnected } = useAccount(); // Get wallet connection status
  const [vote, setVote] = useState<string>();

  // Use wagmi's useWriteContract for sending transactions
  const { writeContract } = useWriteContract();

  const sendTransaction = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }

    if (!vote) {
      alert('Please select a candidate');
      return;
    }
    try {
      // Call the smart contract's vote function using wagmi
      await writeContract({
        abi: ballotAPI, // Contract ABI
        address: contractAddress as `0x${string}`, // Contract address
        functionName: 'vote', // Function to call in the smart contract
        args: [vote], 
      });

      alert('Vote submitted successfully');
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed');
    }
  };

  return (
    <form
      className="bg-gray-50 p-6 rounded-lg shadow-lg mt-6 space-y-6 flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const selectedCandidate = (form.elements.namedItem('candidate') as HTMLSelectElement).value;
        setVote(selectedCandidate); // Set the selected candidate
        sendTransaction(); // Trigger the transaction
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
        <option value="" disabled selected>
          Select a candidate
        </option>
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