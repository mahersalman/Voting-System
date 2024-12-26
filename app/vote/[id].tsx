import { GetServerSideProps } from 'next';
import { getVoteData } from '@database/dbController';
import "@public/global.css";
import dynamic from 'next/dynamic';

const Results = dynamic(() => import('../../src/components/results'), { ssr: true });

interface Candidate {
  name: string;
  votes: number;
}

interface VoteData {
  title: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  candidates: Candidate[];
}

interface VoteDetailsProps {
  vote: VoteData | null;
}

export default function VoteDetails({ vote }: VoteDetailsProps) {
  if (!vote) return <div className="not-found">Vote not found.</div>;

  return (
    <div className="main">
      <div className="container details-container">
        <h1 className="vote-title">Vote Details</h1>

        <div className="vote-details">
          <p><strong>Voting Subject:</strong> {vote.title}</p>
          <p><strong>Description:</strong> {vote.description}</p>
          <p><strong>Status:</strong> {vote.status}</p>
          <p><strong>Start Date:</strong> {new Date(vote.startDate).toLocaleDateString()}</p>
          <p><strong>End Date:</strong> {new Date(vote.endDate).toLocaleDateString()}</p>
        </div>

        <form
          className="voting-form"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const selectedCandidate = (form.elements.namedItem('candidate') as HTMLSelectElement).value;
            alert(`You voted for: ${selectedCandidate}`);
          }}
        >
          <label htmlFor="candidate" className="form-label">
            <h3>Select Candidate:</h3>
          </label>
          <select id="candidate" name="candidate" className="form-select" required>
            {vote.candidates.map((candidate, index) => (
              <option key={index} value={candidate.name}>
                {candidate.name}
              </option>
            ))}
          </select>
          <button type="submit" className="form-button">
            Submit Vote
          </button>
        </form>
      </div>
      <div className="container results-container">
        <Results candidates={vote.candidates} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const vote = await getVoteData(id as string);
    if (vote) {
      return {
        props: {
          vote: {
            ...vote,
            _id: vote._id.toString(),
            startDate: new Date(vote.startDate).toISOString(),
            endDate: new Date(vote.endDate).toISOString(),
            candidates: vote.candidates.map((candidate: any) => ({
              name: candidate.name,
              votes: candidate.votes,
            })),
          },
        },
      };
    } else {
      return { props: { vote: null } };
    }
  } catch (error) {
    console.error('Error fetching vote data:', error);
    return { props: { vote: null } };
  }
};