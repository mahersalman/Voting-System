'use client';

import { useAccount, useWalletClient } from 'wagmi';
import React, { useState } from 'react';
import { ballot_voting } from "@/scripts/ContractInteract";

export default function VotingForm({ candidates, contractAddress }: { candidates: string[]; contractAddress: string }) {
  const { isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [vote, setVote] = useState<string>();


  const sendTransaction = async () => {
    if (!isConnected) {
      alert('Please connect your wallet');
      return;
    }
    if (!walletClient) {
      alert('Wallet client is not available');
      return;
    }
    try{
      if (vote) {
        await ballot_voting(walletClient, contractAddress, vote);
      } else {
        alert('Please select a candidate');
      }
      alert('Vote submitted successfully');
    } catch (error) {
      alert(`Transaction failed: ${error}`);
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