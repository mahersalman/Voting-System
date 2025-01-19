'use client';
import { useAccount, useWalletClient } from 'wagmi';
import React, { useState } from 'react';
import BackButton from '@components/backButton';
import Navbar from '@/components/navbar';
import { createNewBallot } from '@/scripts/ContractInteract';

export default function CreateVote() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [manualAddresses, setManualAddresses] = useState<string>("");

  const isValidEthereumAddress = (address: string) => {
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n').map((line) => line.trim());

      const invalidAddresses = lines.filter((line) => !isValidEthereumAddress(line));
      if (invalidAddresses.length > 0) {
        alert(`Invalid address(es):\n${invalidAddresses.join('\n')}`);
        return;
      }
      alert('All addresses are valid!');

      // Add file-uploaded addresses to the manual addresses textarea
      const newAddresses = [...new Set([...manualAddresses.split('\n').filter(Boolean), ...lines])];
      setManualAddresses(newAddresses.join('\n'));
    };

    reader.readAsText(file);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const start_date = (form.elements.namedItem('start_date') as HTMLInputElement).value;
    const end_date = (form.elements.namedItem('end_date') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const candidates = (form.elements.namedItem('candidates') as HTMLInputElement).value;

    if (!title || !start_date || !end_date || !description || !candidates) {
      alert('Please fill out all fields.');
      return;
    }

    const candidateList = candidates.split(',').map((c) => c.trim());
    if (candidateList.length === 0) {
      alert('Please enter at least one candidate.');
      return;
    }

    const manualAddressList = manualAddresses
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line !== "" && isValidEthereumAddress(line));

    if (manualAddressList.length === 0) {
      alert('Please provide valid addresses either via file upload or manual input.');
      return;
    }

    try {
      await createNewBallot(
        isConnected,
        walletClient,
        title,
        description,
        new Date(start_date).getTime() / 1000,
        new Date(end_date).getTime() / 1000,
        candidateList,
        manualAddressList
      );
      alert('Ballot created successfully!');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col pt-16 gap-10">
      <Navbar />
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-2xl overflow-hidden mt-5 hover:scale-105 transition-transform">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-6 text-center">
          New Vote
        </h2>
        <form id="new-vote-form" className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title" className="block text-lg font-bold text-blue-600 mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label htmlFor="start_date" className="block text-lg font-bold text-blue-600 mb-2">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                id="start_date"
                required
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="end_date" className="block text-lg font-bold text-blue-600 mb-2">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                id="end_date"
                required
                className="w-full p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-lg font-bold text-blue-600 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            ></textarea>
          </div>

          <div>
            <label htmlFor="candidates" className="block text-lg font-bold text-blue-600 mb-2">
              Candidates (Comma-separated)
            </label>
            <input
              type="text"
              name="candidates"
              id="candidates"
              placeholder="Enter candidates separated by commas"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="file-upload" className="block text-lg font-bold text-blue-600 mb-2">
              Upload Addresses File (.txt)
            </label>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              accept=".txt"
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label htmlFor="manual-addresses" className="block text-lg font-bold text-blue-600 mb-2">
              Addresses (One per line)
            </label>
            <textarea
              id="manual-addresses"
              name="manual-addresses"
              rows={6}
              placeholder="Enter addresses manually, one per line"
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={manualAddresses}
              onChange={(e) => setManualAddresses(e.target.value)}
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full max-w-sm px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
        <BackButton />
      </div>
    </div>
  );
}
