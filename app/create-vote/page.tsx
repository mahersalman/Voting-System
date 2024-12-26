'use client';

import React, { useState } from 'react';
import BackButton from '@components/backButton';
import { stat } from 'fs';

export default function CreateVote() {
  const [addresses, setAddresses] = useState<string[]>([]);

  const isValidEthereumAddress = (address: string) => {
    // Check if the address is 42 characters long, starts with '0x', and contains only hex characters
    const regex = /^0x[a-fA-F0-9]{40}$/;
    return regex.test(address);
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const lines = content.split('\n').map((line) => line.trim()); // Split file content by newlines

      const invalidAddresses = lines.filter((line) => !isValidEthereumAddress(line));
      if (invalidAddresses.length > 0) {
        alert(`Invalid address(es):\n${invalidAddresses.join('\n')}`);
        return;
      }
      alert('All addresses are valid!');
      setAddresses(lines); 
    };

    reader.readAsText(file);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Extract values from the form
    const title = (form.elements.namedItem('title') as HTMLInputElement).value;
    const start_date = (form.elements.namedItem('start_date') as HTMLInputElement).value;
    const end_date = (form.elements.namedItem('end_date') as HTMLInputElement).value;
    const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value;
    const candidates = (form.elements.namedItem('candidates') as HTMLInputElement).value;
    const fileInput = form.elements.namedItem('file-upload') as HTMLInputElement;

    // Validate all fields
    if (!title || !start_date || !end_date || !description || !candidates) {
      alert('Please fill out all fields.');
      return;
    }
    // Ensure at least one candidate is entered
    const candidateList = candidates.split(',').map((c) => c.trim());
    if (candidateList.length === 0) {
      alert('Please enter at least one candidate.');
      return;
    }

  // Ensure addresses are uploaded and valid
    if (!addresses || addresses.length === 0) {
      alert('Please upload a valid addresses file.');
      return;
    }
    // Construct the JSON object
    const formData = {
      title,
      startDate: start_date,
      endDate: end_date,
      description,
      candidates: candidateList,
      addresses, 
      status: 'Upcoming',
    };
    // Debugging - Log the JSON
    console.log('Form Data:', formData);

    // Example of submitting JSON to the server
    fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert('Form submitted successfully!');
          form.reset(); // Optional: Reset the form
        } else {
          alert('Failed to submit the form. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
      });
    };

  return (
    <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-col pt-16 gap-10">
      <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-2xl overflow-hidden mt-5 hover:scale-105 transition-transform">
        <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-6 text-center">
          New Vote
        </h2>
        <form id="new-vote-form" className="space-y-6" onSubmit={handleSubmit}>
          {/* Title Field */}
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
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

          {/* Start Date and End Date Fields */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1">
              <label
                htmlFor="start_date"
                className="block text-lg font-bold text-blue-600 mb-2"
              >
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
              <label
                htmlFor="end_date"
                className="block text-lg font-bold text-blue-600 mb-2"
              >
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

          {/* Description Field */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
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

          {/* Candidates Field */}
          <div>
            <label
              htmlFor="candidates"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
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

          {/* File Upload Field */}
          <div>
            <label
              htmlFor="file-upload"
              className="block text-lg font-bold text-blue-600 mb-2"
            >
              Upload Addresses File (.txt)
            </label>
            <input
              type="file"
              id="file-upload"
              name="file-upload"
              accept=".txt"
              required
              className="w-full max-w-lg p-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onChange={handleFileChange}
            />
          </div>

          {/* Submit Button */}
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