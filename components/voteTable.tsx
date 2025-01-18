"use client";
import Link from "next/link";
import { useEffect } from "react";
import { getBallotDetails,getBallotsAddresses } from "@/scripts/ContractInteract";
import { useVotes } from "@/components/VoteContext";
import * as dotenv from "dotenv";
dotenv.config();

export default function VoteTable() {
  const { votes, setVotes } = useVotes();

  useEffect(() => {
     const fetchVotes = async () => {
      try {
        const ballotAddesses = await getBallotsAddresses();
        const fetchedVotes = await getBallotDetails(ballotAddesses);
        setVotes(fetchedVotes);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, [setVotes]);

  return (
    <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-2xl overflow-hidden mt-5">
      <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 text-center mb-6">
        Votes List
      </h2>
      {!votes && <p className="text-center">Loading...</p>}
      {votes && votes.length === 0 && <p className="text-center">No votes found</p>}
      {votes && votes.length > 0 && (
        <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 text-blue-600">Address</th>
            <th className="px-4 py-2 text-blue-600">Voting Subject</th>
            <th className="px-4 py-2 text-blue-600">Status</th>
            <th className="px-4 py-2 text-blue-600">Start Date</th>
            <th className="px-4 py-2 text-blue-600">End Date</th>
            <th className="px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {votes.map((vote, index) => (
            <tr key={vote._id} className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
              <td className="px-4 py-2" title={vote._id}>
                {vote._id.slice(0, 6)}...{vote._id.slice(-4)}
              </td>
              <td className="px-4 py-2">{vote.title}</td>
              <td className="px-4 py-2">{vote.status}</td>
              <td className="px-4 py-2">{new Date(Number(vote.startDate) * 1000).toLocaleDateString()}</td>
              <td className="px-4 py-2">{new Date(Number(vote.endDate) * 1000).toLocaleDateString()}</td>
              <td className="px-4 py-2 text-blue-500">
                <Link href={`/vote-detail/${vote._id}`}>OPEN</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>)}
      
    </div>
  );
}