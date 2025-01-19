"use client";

import { useParams } from "next/navigation";
import { useVotes } from "@/components/VoteContext";
import VotingForm from "@/components/vote-form";
import BackButton from '@/components/backButton';
import Results from '@/components/results';
import Navbar from "@/components/navbar";

export default function VoteDetails() {
  const { votes } = useVotes();
  const params = useParams();
  const id = params?.id as string | undefined;
  const vote = votes.find((v) => v._id === id);

  if (!vote) {
    return <div className="text-red-600 text-center mt-10">Vote not found</div>;
  }
  
  return (
    <div className="bg-image w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center flex-row pt-16 gap-10">
      <Navbar />
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-blue-600 text-center mb-6 shadow-md border-b pb-3">
          Vote Details
        </h1>
        <div className="text-lg text-gray-700 space-y-4">
          <p>
            <strong className="text-blue-600">Voting Subject:</strong> {vote.title}
          </p>
          <p>
            <strong className="text-blue-600">Description:</strong> {vote.description}
          </p>
          <p>
            <strong className="text-blue-600">Status:</strong> {vote.status}
          </p>
          <p>
            <strong className="text-blue-600">Start Date:</strong>{" "}
            {new Date(Number(vote.startDate) * 1000).toLocaleDateString()}
          </p>
          <p>
            <strong className="text-blue-600">End Date:</strong>{" "}
            {new Date(Number(vote.endDate) * 1000).toLocaleDateString()}
          </p>
        </div>

        <VotingForm candidates={vote.results[0]} contractAddress = {vote._id}/>
        <BackButton />
      </div>
    
    <div>
      <Results results={vote.results} status={vote.status} />
    </div>

    </div>
  );
}