import Link from "next/link";
import { getVoteList } from '../database/dbController';

interface Vote {
    _id: string;
    title: string;
    status: string;
    startDate: string;
    endDate: string;
}

export default async function VoteTable() {
    try {
        // Fetch votes directly in the component
        const votes = await getVoteList();
        
        // Serialize ObjectId
        const serializedVotes = votes.map((vote) => ({
            ...vote,
            _id: vote._id.toString(),
        }));

        return (
            <div className="max-w-4xl mx-auto p-10 bg-white rounded-xl shadow-2xl overflow-hidden mt-5">
                <h2 className="text-2xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 text-center mb-6">
                    Votes List
                </h2>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-blue-100">
                            <th className="px-4 py-2 text-blue-600">ID</th>
                            <th className="px-4 py-2 text-blue-600">Voting Subject</th>
                            <th className="px-4 py-2 text-blue-600">Status</th>
                            <th className="px-4 py-2 text-blue-600">Start Date</th>
                            <th className="px-4 py-2 text-blue-600">End Date</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {serializedVotes.map((vote, index) => (
                            <tr key={vote._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                                <td className="px-4 py-2" title={vote._id}>
                                    {vote._id.toString().slice(0, 2)}..{vote._id.toString().slice(-2)}
                                </td>
                                <td className="px-4 py-2">{vote.title}</td>
                                <td className="px-4 py-2">{vote.status}</td>
                                <td className="px-4 py-2">{new Date(vote.startDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2">{new Date(vote.endDate).toLocaleDateString()}</td>
                                <td className="px-4 py-2 text-blue-500">
                                    <Link href={`/vote/${vote._id}`} className="hover:underline">
                                        OPEN
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link href="/create-vote">
                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-500 transition-transform transform hover:scale-105 mx-auto block">
                        Add New Vote
                    </button>
                </Link>
            </div>
        );
    } catch (error) {
        console.error("Error fetching votes:", error);
        return <div>Error loading votes</div>;
    }
}