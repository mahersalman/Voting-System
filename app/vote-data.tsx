import { useState } from 'react';

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

export default function VoteData() {
  // Example data for testing
  const voteData: VoteData = {
    title: 'Presidential Election 2024',
    description: 'Choose the next President of the country. Your vote matters!',
    status: 'Ongoing',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    candidates: [
      { name: 'Alice Johnson', votes: 1200 },
      { name: 'Bob Smith', votes: 980 },
      { name: 'Catherine Davis', votes: 870 },
      { name: 'Daniel Brown', votes: 1100 },
    ],
  };

  // State for the selected candidate
  const [selectedCandidate, setSelectedCandidate] = useState<string>('');

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedCandidate) {
      alert('Please select a candidate.');
      return;
    }

    // Perform form submission logic (e.g., API call)
    console.log(`You voted for: ${selectedCandidate}`);
    alert(`Vote submitted for: ${selectedCandidate}`);
  };

  return (
    <div className="main">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-title">
          <h1>Voting System</h1>
        </div>
        <div className="navbar-right">
          <button>Connect</button>
        </div>
      </nav>

      {/* Vote Details */}
      <div className="container">
        <h2>Vote Details</h2>
        <p>
          <strong>Voting Subject:</strong> {voteData.title}
        </p>
        <p>
          <strong>Description:</strong> {voteData.description}
        </p>
        <p>
          <strong>Status:</strong> {voteData.status}
        </p>
        <p>
          <strong>Start Date:</strong> {voteData.startDate}
        </p>
        <p>
          <strong>End Date:</strong> {voteData.endDate}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="candidate">Select Candidate:</label>
          <select
            id="candidate"
            name="candidate"
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            required
          >
            <option value="">-- Select a Candidate --</option>
            {voteData.candidates.map((candidate, index) => (
              <option key={index} value={candidate.name}>
                {candidate.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit Vote</button>
        </form>
      </div>
    </div>
  );
}