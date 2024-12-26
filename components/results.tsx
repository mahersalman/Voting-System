import React from 'react';

interface Candidate {
    name: string;
    votes: number;
}

interface ResultsProps {
    candidates: Candidate[];
}

export default function Results({ candidates }: ResultsProps) {
    return (
        <div className="container results-container">
            <h3 className="results-title">Results</h3>
            <div className="results-grid">
                {candidates.map((candidate, index) => (
                    <div key={index} className="results-card">
                        <div className="candidate-info">
                            <span className="candidate-name">{candidate.name}</span>
                            <span className="candidate-votes">{candidate.votes} Votes</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
