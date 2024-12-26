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
            <div className="container">
                <h2>Votes List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Voting Subject</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {serializedVotes.map((vote) => (
                            <tr key={vote._id}>
                                <td title={vote._id}>{vote._id.toString().slice(0, 2)}..{vote._id.toString().slice(-2)}</td>
                                <td>{vote.title}</td>
                                <td>{vote.status}</td>
                                <td>{new Date(vote.startDate).toLocaleDateString()}</td>
                                <td>{new Date(vote.endDate).toLocaleDateString()}</td>
                                <td>
                                    <Link href={`/vote/${vote._id}`}>
                                        OPEN
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Link href="/create-vote">
                    <button>Add New Vote</button>
                </Link>
            </div>
        );
    } catch (error) {
        console.error("Error fetching votes:", error);
        return <div>Error loading votes</div>;
    }
}