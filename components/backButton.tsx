'use client';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function BackButton() {
  const router = useRouter();

  return (
    <div className = "p-4">
      <button
        onClick={() => router.back()} // Go back to the previous page
        className="px-3 py-1 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-500 transition-transform transform hover:scale-105"
      >
        Back
      </button>
    </div>
  );
}